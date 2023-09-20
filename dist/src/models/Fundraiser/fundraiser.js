"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fundraiser = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../utils");
const userSchema = new mongoose_1.Schema({
    fundraiserAddress: {
        type: String,
        required: [true, 'A fundraiserAddress is required'],
        unique: true,
        validate: {
            validator: (address) => {
                return (0, utils_1.isValidEthAddress)(address);
            },
            message: 'Address is not valid!',
        },
    },
    fundraisingAmount: {
        type: String,
        require: [true, 'A fundraisingAmount is required'],
    },
    beneficiary: {
        type: String,
        require: [true, 'A beneficiary is required'],
        validate: {
            validator: (address) => {
                return (0, utils_1.isValidEthAddress)(address);
            },
            message: 'Address is not valid!',
        },
    },
    documentName: {
        type: String,
        require: [true, 'A documentName is required'],
    },
    documentUri: {
        type: String,
        require: [true, 'A documentUri is required'],
    },
    documentHash: {
        type: String,
        require: [true, 'A documentHash is required'],
    },
});
exports.Fundraiser = (0, mongoose_1.model)('Fundraiser', userSchema);
//# sourceMappingURL=fundraiser.js.map