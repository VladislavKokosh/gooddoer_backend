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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportStrategy = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../models/User");
dotenv_1.default.config();
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};
const passportStrategy = (passport) => __awaiter(void 0, void 0, void 0, function* () {
    passport.use(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findById(payload.userId).select('');
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (error) {
            console.log(error);
        }
    })));
});
exports.passportStrategy = passportStrategy;
//# sourceMappingURL=passport.js.map