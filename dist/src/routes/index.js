"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const files_1 = __importDefault(require("./files"));
const fundraisers_1 = __importDefault(require("./fundraisers"));
const router = (0, express_1.Router)();
router.use('/user', user_1.default);
router.use('/upload', files_1.default);
router.use('/fundraisers', fundraisers_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map