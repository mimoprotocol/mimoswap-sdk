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


  it(`trade-wiotx-vita-v3`, async () => {
    const t1 = new Token(chainId, "0xa00744882684c3e4747faefd68d283ea44099d03", 18);
    const t2 = new Token(chainId, "0xb8744ae4032be5e5ef9fab94ee9c3bf38d5d2ae0", 18);
    const router = new AlphaRouter({
      chainId,
      provider,
    });
    const route = await router.route(
      CurrencyAmount.fromRawAmount(t1, parseUnits('1', 18).toString()),
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
    expect(route.swapRoute).not.toBeNull();
  });

  // it(`trade-wiotx-usdc.e`, async () => {
  //   const t1 = new Token(chainId, "0xa00744882684c3e4747faefd68d283ea44099d03", 18);
  //   const t2 = new Token(chainId, "0xcdf79194c6c285077a58da47641d4dbe51f63542", 6);
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

  // it(`trade-vita-usdc.e-mixed`, async () => {
  //   const t1 = new Token(chainId, "0xb8744ae4032be5e5ef9fab94ee9c3bf38d5d2ae0", 18);
  //   const t2 = new Token(chainId, "0xcdf79194c6c285077a58da47641d4dbe51f63542", 6);
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
  //       // deadline: Math.floor(Date.now() / 1000 + 1800),
  //       type: SwapType.UNIVERSAL_ROUTER,
  //     },
  //     {
  //       protocols: [Protocol.MIXED],
  //     }
  //   );
  //   console.log('route=>', route);
  //   expect(route.swapRoute).not.toBeNull();
  // })
});
