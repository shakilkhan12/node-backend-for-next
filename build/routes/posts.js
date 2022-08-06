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
var auth_1 = __importDefault(require("../middleware/auth"));
var postValidations_1 = require("../validations/postValidations");
var Post_1 = __importDefault(require("../models/Post"));
var Comment_1 = __importDefault(require("../models/Comment"));
var helpers_1 = require("../utils/helpers");
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, body, sub, errors, user, post, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, body = _a.body, sub = _a.sub;
                errors = (0, express_validator_1.validationResult)(req);
                user = res.locals.user;
                console.log(user);
                if (!errors.isEmpty())
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                post = new Post_1.default({ title: title, body: body, user: user, sub: sub, identifier: (0, helpers_1.makeId)(7), slug: (0, helpers_1.slugify)(title) });
                return [4 /*yield*/, post.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json(post)];
            case 3:
                error_1 = _b.sent();
                console.log(error_1.message);
                return [2 /*return*/, res.status(500).json({ error: error_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getPosts = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("getPosts");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.find().populate("user", '-password').populate("sub")];
            case 2:
                posts = _a.sent();
                return [2 /*return*/, res.json(posts)];
            case 3:
                error_2 = _a.sent();
                console.log(error_2.message);
                return [2 /*return*/, res.status(500).json({ error: error_2.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, slug, post, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, identifier = _a.identifier, slug = _a.slug;
                console.log(identifier, slug);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Post_1.default.findOne({ identifier: identifier, slug: slug }).populate("sub")];
            case 2:
                post = _b.sent();
                return [2 /*return*/, res.json(post)];
            case 3:
                err_1 = _b.sent();
                console.log(err_1.message);
                return [2 /*return*/, res.status(500).json({ error: err_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var commentOnPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, slug, body, user, post, comment, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, identifier = _a.identifier, slug = _a.slug;
                body = req.body.body;
                user = res.locals.user;
                return [4 /*yield*/, Post_1.default.findOne({ identifier: identifier, slug: slug })];
            case 1:
                post = _b.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).json({ error: "Post not found" })];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                comment = new Comment_1.default({ identifier: (0, helpers_1.makeId)(8), user: user, body: body, posts: post._id });
                return [4 /*yield*/, comment.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.json(comment)];
            case 4:
                error_3 = _b.sent();
                console.log(error_3.message);
                return [2 /*return*/, res.status(500).json({ error: error_3.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var router = (0, express_1.Router)();
router.post('/', auth_1.default, postValidations_1.postValidations, createPost);
router.get('/', getPosts);
router.get('/:identifier/:slug', getPost);
router.post('/:identifier/:slug/comment', auth_1.default, commentOnPost);
exports.default = router;
//# sourceMappingURL=posts.js.map