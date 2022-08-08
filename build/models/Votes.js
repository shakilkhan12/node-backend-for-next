"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var voteSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, required: true, auto: true },
    username: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    value: { type: Number, default: 0 },
    commentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "comment" },
    postsId: { type: mongoose_1.Schema.Types.ObjectId, ref: "post" }
}, {
    timestamps: true
});
var VoteModel = (0, mongoose_1.model)("vote", voteSchema);
exports.default = VoteModel;
//# sourceMappingURL=Votes.js.map