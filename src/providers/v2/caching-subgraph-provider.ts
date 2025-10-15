import { ChainId } from '../../sdk-core';

import { IV2SubgraphProvider, V2SubgraphPool } from './subgraph-provider';
import { BentoCache } from 'bentocache';

/**
 * Provider for getting V2 pools, with functionality for caching the results.
 *
 * @export
 * @class CachingV2SubgraphProvider
 */
export class CachingV2SubgraphProvider implements IV2SubgraphProvider {
  private SUBGRAPH_KEY = (chainId: ChainId) => `subgraph-pools-v2-${chainId}`;

  /**
   * Creates an instance of CachingV2SubgraphProvider.
   * @param chainId The chain id to use.
   * @param subgraphProvider The provider to use to get the subgraph pools when not in the cache.
   * @param cache Cache instance to hold cached pools.
   */
  constructor(
    private chainId: ChainId,
    protected subgraphProvider: IV2SubgraphProvider,
    private cache: BentoCache<any>
  ) { }

  public async getPools(): Promise<V2SubgraphPool[]> {
    const result = await this.cache.getOrSet({
      key: this.SUBGRAPH_KEY(this.chainId),
      factory: async () => this.subgraphProvider.getPools(),
      ttl: '30s'
    });
    return result
  }
}
