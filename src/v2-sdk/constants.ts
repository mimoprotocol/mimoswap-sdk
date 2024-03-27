import { Percent, V2_FACTORY_ADDRESSES, V2_INIT_CODE_HASH } from '../sdk-core';
import JSBI from 'jsbi';

/**
 * @deprecated use FACTORY_ADDRESS_MAP instead
 */
export const FACTORY_ADDRESS = '0xda257cBe968202Dea212bBB65aB49f174Da58b9D';
export const FACTORY_ADDRESS_MAP: { [chainId: number]: string } =
  V2_FACTORY_ADDRESSES;

export const INIT_CODE_HASH =
  '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f';
export const INIT_CODE_MAP: { [chainId: number]: string } = V2_INIT_CODE_HASH;

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
