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

  const a1 = '0x6fbcdc1169b5130c59e72e51ed68a84841c98cd1';
  const a2 = '0x6c0bf4b53696b5434a0d21c7d13aa3cbf754913e';

  it(`trade-iotex-test`, async () => {
    const t1 = new Token(chainId, a1, 18);
    const t2 = new Token(chainId, a2, 18);
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
        type: SwapType.UNIVERSAL_ROUTER,
      },
      {
        protocols: [Protocol.MIXED],
      }
    );
    console.log('route=>', route);
  });
});
