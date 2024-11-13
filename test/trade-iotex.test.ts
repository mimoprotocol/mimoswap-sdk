import dotenv from 'dotenv';
dotenv.config();
import { parseUnits } from 'viem';
import {
  ChainId,
  Token,
  CurrencyAmount,
  TradeType,
  Percent,
} from '../src/sdk-core';
import { JsonRpcProvider } from '@ethersproject/providers';
import {
  AlphaRouter,
  ID_TO_CHAIN_ID,
  ID_TO_PROVIDER,
  NATIVE_NAMES_BY_ID,
  nativeOnChain,
  SwapType,
} from '../src';
import { Protocol } from '../src/router-sdk';
import _ from 'lodash';

const getCurrency = ({
  chainId,
  tokenStr,
  decimals,
}: {
  chainId: number;
  tokenStr: string;
  decimals: number;
}) => {
  const currency = NATIVE_NAMES_BY_ID[chainId]!.includes(tokenStr)
    ? nativeOnChain(chainId)
    : new Token(chainId, tokenStr, decimals);
  return currency;
};

describe('IOTEX Trade Test', () => {
  const chainId = ID_TO_CHAIN_ID(ChainId.IOTEX);
  const chainProvider = ID_TO_PROVIDER(chainId);
  const provider = new JsonRpcProvider(chainProvider, chainId);

  // it(`trade-wiotx-vita-v3`, async () => {
  //   const t1 = new Token(
  //     chainId,
  //     '0xa00744882684c3e4747faefd68d283ea44099d03',
  //     18
  //   );
  //   const t2 = new Token(
  //     chainId,
  //     '0xb8744ae4032be5e5ef9fab94ee9c3bf38d5d2ae0',
  //     18
  //   );
  //   const router = new AlphaRouter({
  //     chainId,
  //     provider,
  //   });
  //   const route = await router.route(
  //     CurrencyAmount.fromRawAmount(t1, parseUnits('10', 18).toString()),
  //     t2,
  //     TradeType.EXACT_INPUT,
  //     {
  //       recipient: '0x0000000000000000000000000000000000000000',
  //       slippageTolerance: new Percent(1000, 10_000),
  //       deadline: Math.floor(Date.now() / 1000 + 1800),
  //       type: SwapType.SWAP_ROUTER_02,
  //     },
  //     {
  //       protocols: [Protocol.V3],
  //     }
  //   );
  //   console.log('route=>', route);
  //   expect(route.swapRoute).not.toBeNull();
  // });

  // it(`trade-wiotx-usdc.e`, async () => {
  //   const t1 = new Token(
  //     chainId,
  //     '0xa00744882684c3e4747faefd68d283ea44099d03',
  //     18
  //   );
  //   const t2 = new Token(
  //     chainId,
  //     '0xcdf79194c6c285077a58da47641d4dbe51f63542',
  //     6
  //   );
  //   const router = new AlphaRouter({
  //     chainId,
  //     provider,
  //   });
  //   const route = await router.route(
  //     CurrencyAmount.fromRawAmount(t1, parseUnits('1', 18).toString()),
  //     t2,
  //     TradeType.EXACT_INPUT,
  //     {
  //       recipient: '0x0000000000000000000000000000000000000000',
  //       slippageTolerance: new Percent(1000, 10_000),
  //       deadline: Math.floor(Date.now() / 1000 + 1800),
  //       type: SwapType.SWAP_ROUTER_02,
  //     },
  //     {
  //       protocols: [Protocol.V3],
  //     }
  //   );
  //   console.log('route=>', route);
  //   expect(route.swapRoute).not.toBeNull();
  // });

  // it(`trade-usdt-wen-mixed`, async () => {
  //   const t1 = new Token(
  //     chainId,
  //     '0x6fbcdc1169b5130c59e72e51ed68a84841c98cd1',
  //     6
  //   );
  //   const t2 = new Token(
  //     chainId,
  //     '0x6c0bf4b53696b5434a0d21c7d13aa3cbf754913e',
  //     6
  //   );
  //   const router = new AlphaRouter({
  //     chainId,
  //     provider,
  //   });
  //   const route = await router.route(
  //     CurrencyAmount.fromRawAmount(t1, parseUnits('1', 6).toString()),
  //     t2,
  //     TradeType.EXACT_INPUT,
  //     {
  //       recipient: '0x0000000000000000000000000000000000000000',
  //       slippageTolerance: new Percent(1000, 10_000),
  //       // deadline: Math.floor(Date.now() / 1000 + 1800),
  //       type: SwapType.UNIVERSAL_ROUTER,
  //     },
  //     {
  //       protocols: [Protocol.MIXED],
  //     }
  //   );
  //   console.log('route=>', route);
  //   console.log(
  //     'tokenPath=>',
  //     JSON.stringify(route?.swapRoute?.route?.[0]?.tokenPath, null, 2)
  //   );
  //   expect(route.swapRoute).not.toBeNull();
  // });

  it(`trade-iotx-ioUSD-v3`, async () => {
    const t1 = getCurrency({
      chainId,
      tokenStr: 'IOTX',
      decimals: 18,
    });
    const t2 = new Token(
      chainId,
      '0xa1a1531f6ae90192edcc32e9f38e98f303708144',
      18
    );
    const router = new AlphaRouter({
      chainId,
      provider,
    });
    const route = await router.route(
      CurrencyAmount.fromRawAmount(t1, parseUnits('100000', 18).toString()),
      t2,
      TradeType.EXACT_INPUT,
      {
        recipient: '0x0000000000000000000000000000000000000000',
        slippageTolerance: new Percent(1000, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
      },
      {
        protocols: [Protocol.V3],
      }
    );
    console.log('route=>', route);
    console.log('tokenPath=>', JSON.stringify(route?.swapRoute?.route));
    expect(route.swapRoute).not.toBeNull();
  });

  it(`trade-wiotx-wen-EXACT_OUTPUT`, async () => {
    const tokenIn = new Token(
      chainId,
      '0xa00744882684c3e4747faefd68d283ea44099d03',
      18
    );
    const tokenOut = new Token(
      chainId,
      '0x6c0bf4b53696b5434a0d21c7d13aa3cbf754913e',
      18
    );

    const router = new AlphaRouter({
      chainId,
      provider,
    });

    const route = await router.route(
      CurrencyAmount.fromRawAmount(tokenOut, '10000000000000000000'),
      tokenIn,
      TradeType.EXACT_OUTPUT,
      {
        recipient: '0x0000000000000000000000000000000000000000',
        slippageTolerance: new Percent(1000, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
      },
      {
        protocols: [Protocol.V3],
      }
    );
    console.log('route=>', route);
    // expect(route.swapRoute).not.toBeNull();
  });
});
