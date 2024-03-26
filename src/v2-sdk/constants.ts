import { Percent, V2_FACTORY_ADDRESSES } from '@/sdk-core';
import JSBI from 'jsbi';

/**
 * @deprecated use FACTORY_ADDRESS_MAP instead
 */
export const FACTORY_ADDRESS = '0xda257cBe968202Dea212bBB65aB49f174Da58b9D';

export const FACTORY_ADDRESS_MAP: { [chainId: number]: string } =
  V2_FACTORY_ADDRESSES;

export const INIT_CODE_HASH =
  '0x00d8258f07455ccf2a627e421c1b67a5235293aa73a2d17be60109e9200cb37f';

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

// exports for internal consumption
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const FIVE = JSBI.BigInt(5);
export const _997 = JSBI.BigInt(997);
export const _1000 = JSBI.BigInt(1000);
export const BASIS_POINTS = JSBI.BigInt(10000);

export const ZERO_PERCENT = new Percent(ZERO);
export const ONE_HUNDRED_PERCENT = new Percent(ONE);
