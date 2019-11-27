"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var reflectConst_1 = require("./reflectConst");
var createRouteParamsDecorator = function (type, prop) { return function (target, key, paramIdx) {
    var preMetaData = Reflect.getMetadata(reflectConst_1.REFLECT_PARAM, target, key) || [];
    Reflect.defineMetadata(reflectConst_1.REFLECT_PARAM, __spreadArrays(preMetaData, [
        __assign({ type: type, index: paramIdx }, (prop ? { prop: prop } : {}))
    ]), target, key);
}; };
exports.Param = function (key) {
    return createRouteParamsDecorator("PARAM", key);
};
exports.Query = function (key) {
    return createRouteParamsDecorator("QUERY", key);
};
exports.Body = createRouteParamsDecorator("BODY");
exports.Req = createRouteParamsDecorator("REQ");
exports.Res = createRouteParamsDecorator("REQ");
exports.Next = createRouteParamsDecorator("NEXT");
exports.mapRouteParams = function (paramsDecorator, req, res, next) {
    if (!paramsDecorator || !paramsDecorator.length)
        return [req, res, next];
    var args = [];
    args.length = paramsDecorator.length;
    paramsDecorator.forEach(function (paramDecorator) {
        var type = paramDecorator.type, index = paramDecorator.index, prop = paramDecorator.prop;
        switch (type) {
            case "PARAM":
                args[index] = prop ? req.params[prop] : req.params;
                break;
            case "QUERY":
                args[index] = prop ? req.query[prop] : req.query;
                break;
            case "BODY":
                args[index] = req.body;
                break;
            case "REQ":
                args[index] = req;
                break;
            case "RES":
                args[index] = res;
                break;
            case "NEXT":
                args[index] = next;
                break;
            default:
                args[index] = undefined;
        }
    });
    return args;
};
