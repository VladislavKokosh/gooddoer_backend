"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdByToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET;
const createToken = (userId, publicAddress) => {
    if (!SECRET) {
        throw new Error('Secret key not defined');
    }
    return jsonwebtoken_1.default.sign({
        userId,
        publicAddress,
    }, SECRET, { expiresIn: '1h' });
};
exports.createToken = createToken;
const getUserIdByToken = (headers) => {
    if (!headers.authorization) {
        return undefined;
    }
    const token = headers.authorization;
    const jwtToken = token === null || token === void 0 ? void 0 : token.slice(7);
    if (!SECRET) {
        throw new Error('Secret key not defined');
    }
    const decoded = jwtToken && jsonwebtoken_1.default.verify(jwtToken, SECRET);
    return decoded;
};
exports.getUserIdByToken = getUserIdByToken;
//# sourceMappingURL=service.js.map