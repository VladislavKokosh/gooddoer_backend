"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEthAddress = void 0;
const ethers_1 = require("ethers");
const isValidEthAddress = (address) => ethers_1.ethers.isAddress(address);
exports.isValidEthAddress = isValidEthAddress;
//# sourceMappingURL=address.js.map