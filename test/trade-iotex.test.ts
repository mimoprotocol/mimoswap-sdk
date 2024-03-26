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
  SwapType,
  TO_PROTOCOL,
} from '../src';
import { Protocol } from '../src/router-sdk';
import _ from 'lodash';

describe('IOTEX Trade Test', () => {
  const chainId = ID_TO_CHAIN_ID(ChainId.IOTEX);
  const chainProvider = ID_TO_PROVIDER(chainId);
  const provider = new JsonRpcProvider(chainProvider, chainId);
  const protocolsStr = 'v2,v3';
  let protocols: Protocol[] = [];
  if (protocolsStr) {
    try {
      protocols = _.map(protocolsStr.split(','), (protocolStr) =>
        TO_PROTOCOL(protocolStr)
      );
    } catch (err) {
      throw new Error(
        `Protocols invalid. Valid options: ${Object.values(Protocol)}`
      );
    }
  }

  it(`trade-iotex-test`, async () => {
    const t1 = new Token(
      chainId,
      '0xa00744882684c3e4747faefd68d283ea44099d03',
      18
    );
    const t2 = new Token(
      chainId,
      '0x6c0bf4b53696b5434a0d21c7d13aa3cbf754913e',
      18
    );
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
        slippageTolerance: new Percent(50, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
      },
      {
        protocols,
      }
    );
    console.log('route=>', route);
  });
});
