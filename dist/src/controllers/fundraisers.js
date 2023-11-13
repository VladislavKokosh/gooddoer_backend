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
exports.writeNewFundraiser = exports.getFundraisers = void 0;
const Fundraiser_1 = require("../models/Fundraiser");
const getFundraisers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fundraisers = yield Fundraiser_1.Fundraiser.find();
        res.status(200).json(fundraisers);
    }
    catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
});
exports.getFundraisers = getFundraisers;
const writeNewFundraiser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.file, req.body);
        const { name, description, fundraiserAddress, fundraisingAmount, beneficiary, category, docs } = req.body;
        const file = req.file;
        console.log(name, description, fundraiserAddress, fundraisingAmount, beneficiary, category, docs, file);
        if (!name ||
            !description ||
            !fundraiserAddress ||
            !fundraisingAmount ||
            !beneficiary ||
            !category ||
            !docs ||
            !file) {
            res.status(400).send({
                error: 'Request should have name, description, fundraiserAddress, fundraisingAmount, beneficiary, docs, image',
            });
            return;
        }
        const finalImage = {
            data: file.buffer,
            contentType: file.mimetype,
        };
        const newFundraiser = new Fundraiser_1.Fundraiser({
            name,
            description,
            fundraiserAddress,
            fundraisingAmount,
            beneficiary,
            category,
            docs,
            image: finalImage,
        });
        yield newFundraiser.save();
        res.send().status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.writeNewFundraiser = writeNewFundraiser;
//# sourceMappingURL=fundraisers.js.map