"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subValidations = void 0;
var express_validator_1 = require("express-validator");
exports.subValidations = [
    (0, express_validator_1.body)('name').not().isEmpty().trim().escape().withMessage('name is required'),
    (0, express_validator_1.body)('description').not().isEmpty().trim().escape().withMessage('description is required'),
    (0, express_validator_1.body)('title').not().isEmpty().escape().withMessage('title is required'),
];
//# sourceMappingURL=subValidations.js.map