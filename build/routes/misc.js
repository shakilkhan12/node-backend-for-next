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
var auth_1 = __importDefault(require("../middleware/auth"));
var Comment_1 = __importDefault(require("../models/Comment"));
var Post_1 = __importDefault(require("../models/Post"));
var Votes_1 = __importDefault(require("../models/Votes"));
var vote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, slug, commentIdentifier, value, user, post, vote_1, comment, commentRes, res_1, voteRes, voteResult, voteResult, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, identifier = _a.identifier, slug = _a.slug, commentIdentifier = _a.commentIdentifier, value = _a.value;
                // Validate vote value
                if (![-1, 0, 1].includes(value)) {
                    return [2 /*return*/, res.status(400).json({ value: 'Vote value must be -1, 0, or 1' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 15, , 16]);
                user = res.locals.user;
                return [4 /*yield*/, Post_1.default.findOne({ identifier: identifier, slug: slug })];
            case 2:
                post = _b.sent();
                comment = void 0;
                if (!commentIdentifier) return [3 /*break*/, 5];
                return [4 /*yield*/, Comment_1.default.findOne({ identifier: commentIdentifier })];
            case 3:
                commentRes = _b.sent();
                if (commentRes) {
                    comment = commentRes;
                }
                return [4 /*yield*/, Votes_1.default.findOne({ commentId: comment, username: user })];
            case 4:
                res_1 = _b.sent();
                if (res_1) {
                    vote_1 = res_1;
                }
                return [3 /*break*/, 13];
            case 5: return [4 /*yield*/, Votes_1.default.findOne({ postsId: post, username: user })];
            case 6:
                voteRes = _b.sent();
                if (voteRes) {
                    vote_1 = voteRes;
                }
                if (!(!vote_1 && value === 0)) return [3 /*break*/, 7];
                // If no vote and value is 0, retunr error;
                return [2 /*return*/, res.status(404).json({ message: 'Vote not found' })];
            case 7:
                if (!!vote_1) return [3 /*break*/, 9];
                voteResult = new Votes_1.default({
                    username: user,
                    value: value
                });
                if (comment)
                    voteResult.commentId = comment;
                if (post)
                    voteResult.postsId = post._id;
                return [4 /*yield*/, voteResult.save()];
            case 8:
                _b.sent();
                return [3 /*break*/, 13];
            case 9:
                if (!(value === 0)) return [3 /*break*/, 11];
                // If vote exists and value is 0, delete vote
                return [4 /*yield*/, Votes_1.default.deleteOne({ _id: vote_1._id })];
            case 10:
                // If vote exists and value is 0, delete vote
                _b.sent();
                return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, Votes_1.default.findOneAndUpdate({ _id: vote_1._id }, { value: value }, { new: true })];
            case 12:
                voteResult = _b.sent();
                _b.label = 13;
            case 13: return [4 /*yield*/, Post_1.default.findOne({ identifier: identifier, slug: slug }).populate('comments').populate('votes')];
            case 14:
                post = _b.sent();
                return [2 /*return*/, res.status(200).json(post)];
            case 15:
                error_1 = _b.sent();
                console.log(error_1.message);
                return [2 /*return*/, res.status(500).json("Server error")];
            case 16: return [2 /*return*/];
        }
    });
}); };
var postVote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, identifier, slug, value, status, username, post, comment, vote, postResponse, voteResponse, postUp, voteRes, postRes, voteResult, postUpdated;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, identifier = _a.identifier, slug = _a.slug, value = _a.value, status = _a.status;
                username = res.locals.user;
                if (!identifier || !slug || !status) {
                    return [2 /*return*/, res.status(400).json({ message: 'Identifier, status and slug are required' })];
                }
                // Validate vote value
                if (![-1, 0, 1].includes(value)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Vote value must be -1, 0 or 1' })];
                }
                if (!(status === 'post')) return [3 /*break*/, 16];
                return [4 /*yield*/, Post_1.default.findOne({ identifier: identifier, slug: slug })];
            case 1:
                postResponse = _b.sent();
                if (!postResponse) return [3 /*break*/, 14];
                post = postResponse;
                return [4 /*yield*/, Votes_1.default.findOne({ postsId: {
                            $in: [post._id]
                        }, username: username })];
            case 2:
                voteResponse = _b.sent();
                if (!voteResponse) return [3 /*break*/, 10];
                vote = voteResponse;
                if (!(vote.value === 0 && value === 1)) return [3 /*break*/, 6];
                // If vote is 0 and value is 1, update vote to 1
                return [4 /*yield*/, Votes_1.default.findOneAndUpdate({ _id: vote._id }, { value: value }, { new: true })];
            case 3:
                // If vote is 0 and value is 1, update vote to 1
                _b.sent();
                return [4 /*yield*/, Post_1.default.findOneAndUpdate({ _id: post._id }, { $push: { votes: vote._id } }, { new: true })];
            case 4:
                postUp = _b.sent();
                return [4 /*yield*/, post.save()];
            case 5:
                _b.sent();
                return [2 /*return*/, res.status(200).json(postUp)];
            case 6:
                if (!(vote.value === 1 && value === 0)) return [3 /*break*/, 9];
                return [4 /*yield*/, Votes_1.default.findOneAndUpdate({ _id: vote._id }, { value: value }, { new: true })];
            case 7:
                voteRes = _b.sent();
                return [4 /*yield*/, Post_1.default.findOneAndUpdate({ _id: post._id }, { $pull: { votes: vote._id } }, { new: true })];
            case 8:
                postRes = _b.sent();
                return [2 /*return*/, res.status(200).json({ postRes: postRes, voteRes: voteRes })];
            case 9: return [3 /*break*/, 13];
            case 10:
                console.log('vote is creating');
                voteResult = new Votes_1.default({
                    username: username,
                    value: value,
                    postsId: post._id
                });
                return [4 /*yield*/, voteResult.save()];
            case 11:
                _b.sent();
                return [4 /*yield*/, Post_1.default.findOneAndUpdate({ _id: post._id }, { $push: { votes: voteResult._id } }, { new: true })];
            case 12:
                postUpdated = _b.sent();
                return [2 /*return*/, res.status(200).json(postUpdated)];
            case 13: return [3 /*break*/, 15];
            case 14: return [2 /*return*/, res.status(404).json({ message: 'Post not found' })];
            case 15: return [3 /*break*/, 17];
            case 16:
                if (status === 'comment') {
                }
                _b.label = 17;
            case 17: return [2 /*return*/];
        }
    });
}); };
var router = (0, express_1.Router)();
router.post('/vote', auth_1.default, postVote);
exports.default = router;
//# sourceMappingURL=misc.js.map