"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    identifier: {
        required: true,
        type: String,
        // index: true
    },
    title: {
        required: true,
        type: String
    },
    slug: {
        required: true,
        type: String
    },
    body: {
        required: true,
        type: String
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    sub: { type: mongoose_1.Schema.Types.ObjectId, ref: "sub" },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "comment" }],
    votes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "vote", }]
}, {
    timestamps: true
});
var PostModel = (0, mongoose_1.model)("post", PostSchema);
exports.default = PostModel;
//# sourceMappingURL=Post.js.map