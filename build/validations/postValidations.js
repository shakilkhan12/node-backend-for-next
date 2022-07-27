"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidations = void 0;
var express_validator_1 = require("express-validator");
exports.postValidations = [
    (0, express_validator_1.body)('title').not().isEmpty().trim().escape().withMessage('title is required'),
    (0, express_validator_1.body)('body').not().isEmpty().trim().escape().withMessage('body is required'),
    (0, express_validator_1.body)('sub').not().isEmpty().escape().withMessage('sub is required'),
];
//# sourceMappingURL=postValidations.js.map