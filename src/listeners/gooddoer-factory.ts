import dotenv from 'dotenv';
import { ethers } from 'ethers';
import factoryArtifact from '../artifacts/GooddoerFactory.json';
import { writeNewFundraiser } from '../controllers/fundraisers';
dotenv.config();

const listenGooddoerFactory = (): void => {
  const contractFactoryAddress = process.env.GOODDOER_FACTORY_ADDRESS;
  const provider = new ethers.WebSocketProvider(`wss://eth-goerli.g.alchemy.com/v2/${process.env.WEBSOCKET_TOKEN}`);

  const contractFactory = new ethers.Contract(contractFactoryAddress, factoryArtifact.abi, provider);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  contractFactory.on(
    'FundraiserCreated',
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (
      fundraiserAddress: string,
      fundraisingAmount: string,
      beneficiary: string,
      documentName: string,
      documentUri: string,
      documentHash: string
    ) => {
      await writeNewFundraiser(
        fundraiserAddress,
        fundraisingAmount,
        beneficiary,
        documentName,
        documentUri,
        documentHash
      );
    }
  );
};

export { listenGooddoerFactory };
