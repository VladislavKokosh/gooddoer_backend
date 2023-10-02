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
exports.storeFiles = exports.fileFromPath = exports.makeFileObjects = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const web3_storage_1 = require("web3.storage");
const file_1 = require("@web-std/file");
dotenv_1.default.config();
const getAccessToken = () => process.env.WEB3STORAGE_TOKEN;
const makeStorageClient = () => new web3_storage_1.Web3Storage({ token: getAccessToken() });
const makeFileObjects = (name, image) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = { name, image };
    const buffer = Buffer.from(JSON.stringify(obj));
    const files = [new file_1.File(['contents-of-file-1'], 'plain-utf8.txt'), new file_1.File([buffer], 'metadata.json')];
    return files;
});
exports.makeFileObjects = makeFileObjects;
const fileFromPath = (file, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const mimeType = file.mimetype;
    const files = [new file_1.File(['contents-of-file'], mimeType), new file_1.File([file.buffer], fileName)];
    return files;
});
exports.fileFromPath = fileFromPath;
const storeFiles = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const client = makeStorageClient();
    const cid = yield client.put(file);
    return cid;
});
exports.storeFiles = storeFiles;
//# sourceMappingURL=web3.storage.js.map