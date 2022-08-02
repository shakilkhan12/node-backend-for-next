"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsConversion = void 0;
var errorsConversion = function (errors) {
    var errorsObj = {};
    errors.forEach(function (err) {
        var key = err.param;
        errorsObj[key] = err.msg;
    });
    return errorsObj;
};
exports.errorsConversion = errorsConversion;
//# sourceMappingURL=coversion.js.map