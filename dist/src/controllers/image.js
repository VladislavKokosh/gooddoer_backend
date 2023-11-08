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
exports.uploadImage = exports.getImage = void 0;
const Image_1 = require("../models/Image");
const getImage = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = yield Image_1.Image.find();
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
        const finalImage = {
            data: reqFile.buffer,
            contentType: reqFile.mimetype,
        };
        const newImage = new Image_1.Image({
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