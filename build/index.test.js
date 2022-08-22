"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app = require("./index");
describe("Reddit API's", function () {
    it("POST /api/auth/register", function () {
        return (0, supertest_1.default)(app).post('/api/auth/register').expect(200).expect("Content-Type", /json/).then(function (res) {
            expect(res.body).toEqual(expect.objectContaining({
                username: expect.any(String),
                email: expect.any(String),
                password: expect.any(String)
            }));
        }).catch(function (err) {
            console.log(err);
        });
    });
});
//# sourceMappingURL=index.test.js.map