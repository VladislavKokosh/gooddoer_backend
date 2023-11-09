"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fundraiser = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../utils");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'A name project is required'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'A description project is required'],
    },
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
    category: {
        type: String,
        require: [true, 'A category is required'],
    },
    docs: {
        type: String,
        require: [true, 'A docs is required'],
    },
    image: {
        type: String,
        required: [true, 'An image is required'],
    },
});
exports.Fundraiser = (0, mongoose_1.model)('Fundraiser', userSchema);
//# sourceMappingURL=fundraiser.js.map