"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "post" }]
}, { timestamps: true });
var User = (0, mongoose_1.model)("User", schema);
exports.default = User;
//# sourceMappingURL=User.js.map