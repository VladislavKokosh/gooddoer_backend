import { ethers } from 'ethers';

const isValidEthAddress = (address: string | undefined): boolean => ethers.isAddress(address);

export { isValidEthAddress };
