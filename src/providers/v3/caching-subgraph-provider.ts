import JSBI from 'jsbi';
import { ChainId } from '../../sdk-core';

import { IV3SubgraphProvider, V3SubgraphPool } from './subgraph-provider';
import { BentoCache } from 'bentocache';

/**
 * Provider for getting V3 pools, with functionality for caching the results.
 *
 * @export
 * @class CachingV3SubgraphProvider
 */
export class CachingV3SubgraphProvider implements IV3SubgraphProvider {
  private SUBGRAPH_KEY = (chainId: ChainId) => `subgraph-pools-${chainId}`;

  /**
   * Creates an instance of CachingV3SubgraphProvider.
   * @param chainId The chain id to use.
   * @param subgraphProvider The provider to use to get the subgraph pools when not in the cache.
   * @param cache Cache instance to hold cached pools.
   */
  constructor(
    private chainId: ChainId,
    protected subgraphProvider: IV3SubgraphProvider,
    private cache: BentoCache<any>
  ) { }

  public async getPools(): Promise<V3SubgraphPool[]> {
    const result = await this.cache.getOrSet({
      key: this.SUBGRAPH_KEY(this.chainId),
      factory: async () => {
        const pools = await this.subgraphProvider.getPools();
        const result = pools.map((i) => {
          const liquidity = Number(JSBI.BigInt(i.liquidity).toString());
          return {
            ...i,
            liquidity: liquidity.toString(),
            tvlETH: liquidity,
            tvlUSD: liquidity,
          };
        });
        return result
      },
      ttl: '30s'
    });
    return result
  }
}
