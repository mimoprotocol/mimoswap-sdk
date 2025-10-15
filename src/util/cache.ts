import Redis from 'ioredis';
import { BentoCache, bentostore } from 'bentocache';
import { memoryDriver } from 'bentocache/drivers/memory';
import { redisDriver } from 'bentocache/drivers/redis';

const { REDIS_URL } = process.env;

const bentoGlobal = global as typeof global & {
    bento?: BentoCache<any>;
};
export const bento =
    bentoGlobal.bento ||
    new BentoCache({
        prefix: 'mimoswap-sdk',
        default: 'multitier',
        stores: {
            multitier: bentostore()
                .useL1Layer(memoryDriver({ maxItems: 3000, maxSize: 10_000_000 }))
                .useL2Layer(
                    redisDriver({
                        connection: new Redis(REDIS_URL!),
                    }),
                ),
        },
        timeout: '100ms',
        hardTimeout: '30s',
        ttl: "30s",
        grace: '24h',
        graceBackoff: '5m',

    });

if (!bentoGlobal.bento) {
    bentoGlobal.bento = bento;
}
