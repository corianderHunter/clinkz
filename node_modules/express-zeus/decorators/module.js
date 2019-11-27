"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reflectConst_1 = require("./reflectConst");
exports.Module = function (_a) {
    var _b = _a.imports, imports = _b === void 0 ? [] : _b, _c = _a.controls, controls = _c === void 0 ? [] : _c, _d = _a.services, services = _d === void 0 ? [] : _d;
    return function (target) {
        if (!controls.length)
            throw new Error("controls can not be Empty!");
        console;
        Reflect.defineMetadata(reflectConst_1.REFLECT_CLASS_TYPE, reflectConst_1.REFLECT_CLASS_MODULE_TYPE, target);
        Reflect.defineMetadata(reflectConst_1.REFLECT_CONTROL, controls, target);
        Reflect.defineMetadata(reflectConst_1.REFLECT_IMPORT, imports, target);
        Reflect.defineMetadata(reflectConst_1.REFLECT_SERVICE, services, target);
    };
};
