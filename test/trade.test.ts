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
    const fet = new Token(
      chainId,
      '0x6fbcdc1169b5130c59e72e51ed68a84841c98cd1',
      18
    );
    const ciotx = new Token(
      chainId,
      '0x6c0bf4b53696b5434a0d21c7d13aa3cbf754913e',
      18
    );
    const router = new AlphaRouter({
      chainId,
      provider,
    });
    const route = await router.route(
      CurrencyAmount.fromRawAmount(fet, parseUnits('1', 8).toString()),
      ciotx,
      TradeType.EXACT_INPUT,
      {
        recipient: '0x0000000000000000000000000000000000000000',
        slippageTolerance: new Percent(50, 10_000),

        // deadline: Math.floor(Date.now() / 1000 + 1800),

        type: SwapType.UNIVERSAL_ROUTER,
      },
      {
        protocols: [Protocol.V2],
      }
    );
    console.log('route=>', route);
  });
});
