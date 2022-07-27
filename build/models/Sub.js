"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SubSchema = new mongoose_1.Schema({
    title: {
        required: true,
        type: String,
        index: true
    },
    name: {
        required: true,
        type: String,
        unique: true,
    },
    description: {
        required: true,
        type: String
    },
    imageUrn: {
        // required: true,
        default: null,
        type: String
    },
    bannerUrn: {
        // required: true,
        default: null,
        type: String
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    posts: { type: mongoose_1.Schema.Types.ObjectId, ref: "post" },
    userDetails: Map
});
var SubModel = (0, mongoose_1.model)("sub", SubSchema);
exports.default = SubModel;
//# sourceMappingURL=Sub.js.map