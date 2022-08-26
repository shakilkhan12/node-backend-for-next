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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cookie_1 = __importDefault(require("cookie"));
var User_1 = __importDefault(require("../models/User"));
var auth_1 = __importDefault(require("../middleware/auth"));
var userValidations_1 = require("../validations/userValidations");
var coversion_1 = require("../utils/coversion");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, password, errors, errorsObj, errors_1, emailUser, usernameUser, user, _b, error_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, email = _a.email, username = _a.username, password = _a.password;
                errors = (0, express_validator_1.validationResult)(req);
                console.log(errors.array());
                if (!errors.isEmpty()) {
                    errorsObj = (0, coversion_1.errorsConversion)(errors.array());
                    return [2 /*return*/, res.status(400).json(errorsObj)];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, , 7]);
                errors_1 = {};
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                emailUser = _d.sent();
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 3:
                usernameUser = _d.sent();
                console.log(emailUser, usernameUser);
                if (emailUser)
                    errors_1.email = "Email is already in use";
                if (usernameUser)
                    errors_1.username = "Username is already in use";
                if (Object.keys(errors_1).length > 0) {
                    return [2 /*return*/, res.status(400).json(errors_1)];
                }
                _b = User_1.default.bind;
                _c = { email: email, username: username };
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 4:
                user = new (_b.apply(User_1.default, [void 0, (_c.password = _d.sent(), _c)]))();
                return [4 /*yield*/, user.save()];
            case 5:
                _d.sent();
                return [2 /*return*/, res.json(user)
                    // TODO: Return user
                ];
            case 6:
                error_1 = _d.sent();
                console.log(error_1.message);
                res.status(500).json({ error: error_1.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, errors, errorsObj, user, passwordMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    errorsObj = (0, coversion_1.errorsConversion)(errors.array());
                    return [2 /*return*/, res.status(400).json(errorsObj)];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 2:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ username: "User not found" })];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 3:
                passwordMatch = _b.sent();
                console.log(passwordMatch, user.password);
                if (!passwordMatch)
                    return [2 /*return*/, res.status(401).json({ password: 'Password is incorrect!' })];
                token = jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_SECRET);
                res.set("Set-Cookie", cookie_1.default.serialize("token", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "strict",
                    secure: process.env.NODE_ENV === "production",
                    path: "/"
                }));
                res.json({ user: user, token: token });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2.message);
                res.status(500).json({ error: error_2.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var me = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.json(res.locals.user)];
    });
}); };
var logout = function (_, res) {
    res.set('Set-Cookie', cookie_1.default.serialize('token', "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/"
    }));
    return res.status(200).json({ success: true });
};
var router = (0, express_1.Router)();
router.post('/register', userValidations_1.registerValidations, register);
router.post('/login', userValidations_1.loginValidations, login);
router.get('/me', auth_1.default, me);
router.get('/check', auth_1.default, function (req, res) {
    var token = req.cookies.token;
    return res.json({ auth: true, user: res.locals.user, token: token });
});
router.get('/logout', auth_1.default, logout);
exports.default = router;
//# sourceMappingURL=auth.js.map