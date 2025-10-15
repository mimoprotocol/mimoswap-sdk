import dotenv from 'dotenv';
dotenv.config();
import { parseUnits } from 'viem';
import * as http from 'http';
import { URL } from 'url';
import {
    ChainId,
    Token,
    CurrencyAmount,
    TradeType,
    Percent,
} from './src/sdk-core';
import { JsonRpcProvider } from '@ethersproject/providers';
import {
    AlphaRouter,
    ID_TO_CHAIN_ID,
    ID_TO_PROVIDER,
    // NATIVE_NAMES_BY_ID,
    // nativeOnChain,
    SwapType,
} from './src';
import { Protocol } from './src/router-sdk';
import _ from 'lodash';

// const getCurrency = ({
//   chainId,
//   tokenStr,
//   decimals,
// }: {
//   chainId: number;
//   tokenStr: string;
//   decimals: number;
// }) => {
//   const currency = NATIVE_NAMES_BY_ID[chainId]!.includes(tokenStr)
//     ? nativeOnChain(chainId)
//     : new Token(chainId, tokenStr, decimals);
//   return currency;
// };
const chainId = ID_TO_CHAIN_ID(ChainId.IOTEX);
const chainProvider = ID_TO_PROVIDER(chainId);
const provider = new JsonRpcProvider(chainProvider, chainId);
const router = new AlphaRouter({
    chainId,
    provider,
});
async function test() {
    console.log('start')
    console.time('start')

    const t1 = new Token(
        chainId,
        '0xa7108637552cec7e8c2dd08a9cd995caff8b4280',
        18
    );
    const t2 = new Token(
        chainId,
        '0x61db9b084326d2251ccb0252c18fd9b0e887ca4f',
        18
    );

    const route = await router.route(
        CurrencyAmount.fromRawAmount(t1, parseUnits('1', 6).toString()),
        t2,
        TradeType.EXACT_INPUT,
        {
            recipient: '0x0000000000000000000000000000000000000000',
            slippageTolerance: new Percent(1000, 10_000),
            // deadline: Math.floor(Date.now() / 1000 + 1800),
            type: SwapType.UNIVERSAL_ROUTER,
        },
        {
            protocols: [Protocol.MIXED],
        }
    );
    console.timeEnd('start')
    console.log('route=>', route);
}








// 创建 HTTP 服务器
const server = http.createServer(async (req, res) => {
    // 解析 URL
    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    const path = url.pathname;

    // 设置 CORS 头，允许跨域请求
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理 OPTIONS 请求（预检请求）
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 路由处理
    try {
        if (path === '/test') {
            // 调用 main 函数
            const result = await test();

            // 返回 JSON 响应
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        } else if (path === '/') {
            // 首页
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Welcome to the API</h1><p>Use /test to call the main function</p>');
        } else {
            // 404 - 路径不存在
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    } catch (error) {
        // 处理错误
        console.error('Error handling request:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: 'Internal Server Error',
            message: error instanceof Error ? error.message : String(error)
        }));
    }
});

// 设置服务器监听的端口
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Test endpoint available at http://localhost:${PORT}/test`);
});