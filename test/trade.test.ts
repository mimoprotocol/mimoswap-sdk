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
import { AlphaRouter, ID_TO_CHAIN_ID, ID_TO_PROVIDER, SwapType } from '../src';
import { Protocol } from '../src/router-sdk';
import _ from 'lodash';

describe('MAINNET Trade Test', () => {
  const chainId = ID_TO_CHAIN_ID(ChainId.MAINNET);
  const chainProvider = ID_TO_PROVIDER(chainId);
  const provider = new JsonRpcProvider(chainProvider, chainId);

  it(`trade-test`, async () => {
    const wbtc = new Token(
      chainId,
      '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      8
    );
    const weth = new Token(
      chainId,
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      18
    );
    const router = new AlphaRouter({
      chainId,
      provider,
    });
    const route = await router.route(
      CurrencyAmount.fromRawAmount(wbtc, parseUnits('1', 8).toString()),
      weth,
      TradeType.EXACT_INPUT,
      {
        recipient: '0x0000000000000000000000000000000000000000',
        slippageTolerance: new Percent(50, 10_000),

        deadline: Math.floor(Date.now() / 1000 + 1800),

        type: SwapType.SWAP_ROUTER_02,
      },
      {
        protocols: [Protocol.V2, Protocol.V3],
      }
    );
    console.log('route=>', route);
  });
});
