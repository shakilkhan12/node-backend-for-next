"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    identifier: {
        required: true,
        type: String,
        index: true
    },
    body: {
        required: true,
        type: String
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    posts: { type: mongoose_1.Schema.Types.ObjectId, ref: "post" }
}, {
    timestamps: true
});
// commentSchema.pre("save", function (next) {
//     this.identifier = makeId(8);
//     next();
// });
var CommentModel = (0, mongoose_1.model)("comment", commentSchema);
exports.default = CommentModel;
//# sourceMappingURL=Comment.js.map