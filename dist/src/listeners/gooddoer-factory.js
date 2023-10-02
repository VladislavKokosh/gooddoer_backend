"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenGooddoerFactory = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
const GooddoerFactory_json_1 = __importDefault(require("../artifacts/GooddoerFactory.json"));
const fundraisers_1 = require("../controllers/fundraisers");
dotenv_1.default.config();
const listenGooddoerFactory = () => {
    const contractFactoryAddress = process.env.GOODDOER_FACTORY_ADDRESS;
    const provider = new ethers_1.ethers.WebSocketProvider(`wss://eth-goerli.g.alchemy.com/v2/${process.env.WEBSOCKET_TOKEN}`);
    const contractFactory = new ethers_1.ethers.Contract(contractFactoryAddress, GooddoerFactory_json_1.default.abi, provider);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    contractFactory.on('FundraiserCreated', 
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    (fundraiserAddress, fundraisingAmount, beneficiary, documentName, documentUri, documentHash) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, fundraisers_1.writeNewFundraiser)(fundraiserAddress, fundraisingAmount, beneficiary, documentName, documentUri, documentHash);
    }));
};
exports.listenGooddoerFactory = listenGooddoerFactory;
//# sourceMappingURL=gooddoer-factory.js.map