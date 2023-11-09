"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const utils_1 = require("../../utils");
const userSchema = new mongoose_1.Schema({
    nonce: {
        type: String,
        required: [true, 'A nonce is required'],
        unique: true,
        default: () => (0, uuid_1.v4)(),
    },
    publicAddress: {
        type: String,
        required: [true, 'A publicAddress is required'],
        unique: true,
        validate: {
            validator: (address) => {
                return (0, utils_1.isValidEthAddress)(address);
            },
            message: 'Address is not valid!',
        },
    },
    username: {
        type: String,
        required: [true, 'A username is required'],
        unique: true,
        validate: {
            validator: (username) => {
                return username.length > 3;
            },
            message: 'Username is not valid!',
        },
    },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map