import { ethers } from 'ethers';

const toBytes32 = (text: string): string => ethers.encodeBytes32String(text);

export { toBytes32 };
