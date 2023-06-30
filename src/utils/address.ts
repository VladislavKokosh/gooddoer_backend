import { ethers } from 'ethers';

const isValidEthAddress = (address: string | undefined): boolean => {
  console.log(address);
  console.log(ethers.isAddress(address));
  return ethers.isAddress(address);
};

export { isValidEthAddress };
