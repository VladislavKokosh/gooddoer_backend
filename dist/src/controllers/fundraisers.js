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
const fundraiser_1 = require("../models/Fundraiser/fundraiser");
const getFundraisers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fundraisers = yield fundraiser_1.Fundraiser.find();
        res.status(200).json(fundraisers);
    }
    catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
});
exports.getFundraisers = getFundraisers;
const writeNewFundraiser = (fundraiserAddress, fundraisingAmount, beneficiary, documentName, documentUri, documentHash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newFundraiser = new fundraiser_1.Fundraiser({
            fundraiserAddress,
            fundraisingAmount,
            beneficiary,
            documentName,
            documentUri,
            documentHash,
        });
        yield newFundraiser.save().catch((error) => {
            console.log(error);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.writeNewFundraiser = writeNewFundraiser;
//# sourceMappingURL=fundraisers.js.map