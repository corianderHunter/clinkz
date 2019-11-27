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
exports.injectContainer = new Map();
exports.Injectable = function (name) { return function (target) {
    if (exports.injectContainer.has(name)) {
        throw new Error(exports.injectContainer.get(name) + ("has injected with \"" + name + "\""));
    }
    else {
        exports.injectContainer.set(name, Reflect.construct(target, []));
    }
}; };
exports.Inject = function (name) { return function (target, key) {
    var injected = Reflect.getMetadata(reflectConst_1.REFLECT_INJECTS, target) || [];
    Reflect.defineMetadata(reflectConst_1.REFLECT_INJECTS, __spreadArrays(injected, [
        {
            key: key,
            injectName: name
        }
    ]), target);
}; };
exports.mapInject = function (target, instance) {
    var injected = Reflect.getMetadata(reflectConst_1.REFLECT_INJECTS, target) || [];
    if (!injected.length)
        return instance;
    injected.forEach(function (_a) {
        var key = _a.key, injectName = _a.injectName;
        var injectedSource = exports.injectContainer.get(injectName);
        if (injectedSource === undefined)
            throw new Error("can not find Injectable target that named " + injectName);
        instance[key] = injectedSource;
    });
    return instance;
};
