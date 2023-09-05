"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBytes32 = void 0;
const ethers_1 = require("ethers");
const toBytes32 = (text) => ethers_1.ethers.encodeBytes32String(text);
exports.toBytes32 = toBytes32;
//# sourceMappingURL=bytes32.js.map