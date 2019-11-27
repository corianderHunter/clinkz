"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var reflectConst_1 = require("./reflectConst");
function Middleware(middleware) {
    return function (target) {
        var middlewares = Reflect.getMetadata(reflectConst_1.REFLECT_MIDDLEWARE, target) || [];
        Reflect.defineMetadata(reflectConst_1.REFLECT_MIDDLEWARE, __spreadArrays(middlewares, [middleware]), target);
    };
}
exports.Middleware = Middleware;
