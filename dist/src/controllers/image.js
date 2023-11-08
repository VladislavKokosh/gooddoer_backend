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
exports.uploadImage = exports.getImage = void 0;
const fs_1 = __importDefault(require("fs"));
const image_1 = require("../models/Image/image");
const getImage = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield image_1.Image.find();
        res.status(200).json(image);
    }
    catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
});
exports.getImage = getImage;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqFile = req.file;
        if (!reqFile) {
            res.status(401).send({ message: 'Invalid input' });
        }
        const image = fs_1.default.readFileSync(reqFile.path);
        const encodeImage = image.toString('base64');
        const finalImage = {
            data: Buffer.from(encodeImage, 'base64'),
            contentType: reqFile.mimetype,
        };
        const newImage = new image_1.Image({
            name: reqFile.originalname,
            image: finalImage,
        });
        yield newImage.save();
        res
            .send({
            message: 'Uploaded',
            id: newImage._id,
        })
            .status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=image.js.map