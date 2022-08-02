"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidations = exports.registerValidations = void 0;
var express_validator_1 = require("express-validator");
exports.registerValidations = [
    (0, express_validator_1.body)('username').not().isEmpty().trim().escape().withMessage('username is required'),
    (0, express_validator_1.body)('email').not().isEmpty().trim().escape().withMessage('Email is required'),
    (0, express_validator_1.body)('password').isLength({ min: 5 }).escape().withMessage('password should be 5 characters long'),
];
exports.loginValidations = [
    (0, express_validator_1.body)('username').not().isEmpty().trim().escape().withMessage('username is required'),
    (0, express_validator_1.body)('password').not().isEmpty().escape().withMessage('password is required'),
];
//# sourceMappingURL=userValidations.js.map