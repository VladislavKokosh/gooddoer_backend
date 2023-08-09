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
exports.changeUsername = exports.authentication = exports.getNonceByAddress = exports.getUserById = void 0;
const uuid_1 = require("uuid");
const eth_sig_util_1 = require("eth-sig-util");
const service_1 = require("../passport/service");
const user_1 = require("../models/User/user");
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = (0, service_1.getUserIdByToken)(req.headers);
    if (!decodedToken) {
        res.status(401).json({ message: 'Request should have Authorization in headers' });
        return;
    }
    const userId = decodedToken && typeof decodedToken !== 'string' && decodedToken.userId;
    const user = yield user_1.User.findById(userId);
    if (user) {
        res.status(200).json({ user });
    }
    else {
        res.status(404).json({ message: 'User is not found' });
    }
});
exports.getUserById = getUserById;
const getNonceByAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicAddress } = req.params;
    if (!publicAddress) {
        res.status(400).json({ message: 'Request should have publicAddress in params' });
    }
    const user = yield user_1.User.findOne({ publicAddress });
    if (user) {
        res.status(200).json(user.nonce);
    }
    else {
        const newUser = new user_1.User({
            publicAddress,
        });
        yield newUser
            .save()
            .then((user) => res.status(200).json(user.nonce))
            .catch((error) => {
            res.status(500).send({
                message: error.message,
            });
            res.status(500).json(error);
        });
    }
});
exports.getNonceByAddress = getNonceByAddress;
const authentication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { signature, publicAddress } = req.body;
        if (!signature || !publicAddress) {
            res.status(400).send({ error: 'Request should have signature and publicAddress' });
            return;
        }
        const user = yield user_1.User.findOne({ publicAddress });
        if (user) {
            console.log(user.nonce);
            const message = `I am signing my one-time nonce: ${user.nonce}`;
            const messageBufferHex = `0x${Buffer.from(message, 'utf8').toString('hex')}`;
            console.log(messageBufferHex);
            const address = (0, eth_sig_util_1.recoverPersonalSignature)({
                data: messageBufferHex,
                sig: signature,
            });
            console.log(address, publicAddress);
            if (address.toLowerCase() === publicAddress.toLowerCase()) {
                user.nonce = (0, uuid_1.v4)();
                yield user.save();
                const token = `Bearer ${(0, service_1.createToken)(user._id, publicAddress)}`;
                res.status(200).json({ accessToken: token });
            }
            else {
                res.status(401).json({
                    error: 'Signature verification failed',
                });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: `Error ${err}` });
    }
});
exports.authentication = authentication;
const changeUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        if (!username) {
            res.status(401).json({ message: 'Request should have username in body' });
        }
        const decodedToken = (0, service_1.getUserIdByToken)(req.headers);
        if (!decodedToken) {
            res.status(401).json({ message: 'Request should have Authorization in headers' });
            return;
        }
        const userId = decodedToken && typeof decodedToken !== 'string' && decodedToken.userId;
        const user = yield user_1.User.findById(userId);
        if (!user) {
            res.status(500).json({ error: 'User is not found.' });
            return;
        }
        user.username = username;
        yield user.save();
        res.status(200).json({ username });
    }
    catch (e) {
        console.log(e);
    }
});
exports.changeUsername = changeUsername;
//# sourceMappingURL=user.js.map