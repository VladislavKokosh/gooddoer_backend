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
// export const downloadFile = async (req: Request, res: Response): Promise<void> => {
//   const { filename } = req.params;
//   if (!filename) {
//     res.status(400).json({ message: 'Request should have filename in params' });
//   }
//   const filePath = path.join(__dirname, '../../uploads', filename);
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// };
const web3StorageUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqFile = req.file;
    console.log(reqFile);
    console.log(`Uploading image: [${reqFile.originalname}] to ipfs.`);
    if (!reqFile) {
        res.status(401).send({ message: 'invalid input' });
    }
    const imageName = `${(0, utils_1.toBytes32)(new Date().getTime().toString() + '_' + reqFile.originalname)}`;
    console.log(imageName);
    const file = yield (0, storage_1.fileFromPath)(reqFile, imageName);
    console.log(file);
    const imageCid = yield (0, storage_1.storeFiles)(file);
    console.log(imageCid);
    const files = yield (0, storage_1.makeFileObjects)(imageName, `https://${imageCid}.ipfs.w3s.link/${imageName}`);
    console.log(files);
    const metaDataCid = yield (0, storage_1.storeFiles)(files);
    console.log(metaDataCid);
    const metadataUrl = `https://${metaDataCid}.ipfs.w3s.link/metadata.json`;
    const ipfsTierInfo = {
        name: reqFile.originalname.slice(0, reqFile.originalname.indexOf('.')),
        ipfsUrl: metadataUrl,
    };
    res.status(200).send(ipfsTierInfo);
});
exports.web3StorageUpload = web3StorageUpload;
//# sourceMappingURL=files.js.map