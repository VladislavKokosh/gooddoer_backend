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
exports.uploadFile = exports.downloadFile = void 0;
const path_1 = __importDefault(require("path"));
const downloadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = req.params;
    if (!filename) {
        res.status(400).json({ message: 'Request should have filename in params' });
    }
    const filePath = path_1.default.join(__dirname, '../../uploads', filename);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});
exports.downloadFile = downloadFile;
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.file.filename;
    res.status(200).json({ fileName });
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=files.js.map