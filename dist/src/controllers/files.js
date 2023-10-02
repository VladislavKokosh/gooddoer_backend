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
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3StorageUpload = void 0;
const storage_1 = require("../storage");
const utils_1 = require("../utils");
const web3StorageUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqFile = req.file;
    console.log(`Uploading image: [${reqFile.originalname}] to ipfs.`);
    if (!reqFile) {
        res.status(401).send({ message: 'invalid input' });
    }
    const imageName = `${(0, utils_1.toBytes32)(new Date().getTime().toString() + '_' + reqFile.originalname)}`;
    const file = yield (0, storage_1.fileFromPath)(reqFile, imageName);
    const imageCid = yield (0, storage_1.storeFiles)(file);
    const files = yield (0, storage_1.makeFileObjects)(imageName, `https://${imageCid}.ipfs.w3s.link/${imageName}`);
    const metaDataCid = yield (0, storage_1.storeFiles)(files);
    const metadataUrl = `https://${metaDataCid}.ipfs.w3s.link/metadata.json`;
    const ipfsTierInfo = {
        name: reqFile.originalname.slice(0, reqFile.originalname.indexOf('.')),
        ipfsUrl: metadataUrl,
    };
    res.status(200).send(ipfsTierInfo);
});
exports.web3StorageUpload = web3StorageUpload;
//# sourceMappingURL=files.js.map