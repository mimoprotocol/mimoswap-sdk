import { Pool as V4Pool } from '@uniswap/v4-sdk';
import { Pair } from '../../v2-sdk';
import { Pool as V3Pool } from '../../v3-sdk';

export type TPool = Pair | V3Pool | V4Pool;
