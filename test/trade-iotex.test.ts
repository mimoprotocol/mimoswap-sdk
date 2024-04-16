import dotenv from 'dotenv';
dotenv.config();
import { ChainId, Token, TradeType, Percent, Currency } from '../src/sdk-core';
import { JsonRpcProvider } from '@ethersproject/providers';
import {
  AlphaRouter,
  ID_TO_CHAIN_ID,
  ID_TO_PROVIDER,
  NATIVE_NAMES_BY_ID,
  SwapType,
  nativeOnChain,
  parseAmount,
} from '../src';
import { Protocol } from '../src/router-sdk';
import _ from 'lodash';

describe('IOTEX Trade Test', () => {
  const chainId = ID_TO_CHAIN_ID(ChainId.IOTEX);
  const chainProvider = ID_TO_PROVIDER(chainId);
  const provider = new JsonRpcProvider(chainProvider, chainId);

  it(`trade-iotex-test`, async () => {
    // const t1 = new Token(
    //   chainId,
    //   '0xa00744882684c3e4747faefd68d283ea44099d03',
    //   18
    // );

    const tokenInStr = 'IOTX'; // 0xa00744882684c3e4747faefd68d283ea44099d03
    const t1: Currency = NATIVE_NAMES_BY_ID[chainId]!.includes(tokenInStr)
      ? nativeOnChain(chainId)
      : new Token(chainId, tokenInStr, 18);

    console.log('t1 =>', t1);

    const t2 = new Token(
      chainId,
      '0x599d33411af255250286c503d5145b61024bc176',
      18
    );
    const router = new AlphaRouter({
      chainId,
      provider,
    });
    const amountIn = parseAmount('0.00001', t1);
    const route = await router.route(
      amountIn,
      t2,
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
