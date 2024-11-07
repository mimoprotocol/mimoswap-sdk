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

describe('IOTEX Trade Test', () => {
  const chainId = ID_TO_CHAIN_ID(ChainId.IOTEX);
  const chainProvider = ID_TO_PROVIDER(chainId);
  const provider = new JsonRpcProvider(chainProvider, chainId);

  const usdt = '0x6fbcdc1169b5130c59e72e51ed68a84841c98cd1';
  const wen = '0x6c0bf4b53696b5434a0d21c7d13aa3cbf754913e';

  // const usdt = '0x6fbcdc1169b5130c59e72e51ed68a84841c98cd1';
  // const usdc = '0xcdf79194c6c285077a58da47641d4dbe51f63542';

  it(`trade-iotex-test`, async () => {
    const t1 = new Token(chainId, usdt, 6);
    const t2 = new Token(chainId, wen, 6);
    const router = new AlphaRouter({
      chainId,
      provider,
    });
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
    console.log('route=>', route);
  });
});
