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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./src/middleware");
const index_1 = __importDefault(require("./src/routes/index"));
const listeners_1 = require("./src/listeners");
dotenv_1.default.config();
const PORT = process.env.PORT && process.env.PORT;
const URL = process.env.MONGO_URI && process.env.MONGO_URI;
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
// eslint-disable-next-line @typescript-eslint/no-floating-promises
(0, middleware_1.passportStrategy)(passport_1.default);
app.use((0, morgan_1.default)('tiny'));
app.use('/', index_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(URL);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        (0, listeners_1.listenGooddoerFactory)();
    }
    catch (error) {
        console.log(error);
    }
});
// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
exports.default = app;
//# sourceMappingURL=index.js.map