"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reflectConst_1 = require("./reflectConst");
var express = require("../lib/express");
var httpVerbs_1 = require("./httpVerbs");
var inject_1 = require("./inject");
function Control(name) {
    if (name === void 0) { name = "/"; }
    return function (target) {
        Reflect.defineMetadata(reflectConst_1.REFLECT_CLASS_TYPE, reflectConst_1.REFLECT_CLASS_CONTROL_TYPE, target);
        Reflect.defineMetadata(reflectConst_1.REFLECT_PATH, name, target);
    };
}
exports.Control = Control;
exports.mapControl = function (control, services) {
    if (services === void 0) { services = []; }
    if (Reflect.getMetadata(reflectConst_1.REFLECT_CLASS_TYPE, control) !==
        reflectConst_1.REFLECT_CLASS_CONTROL_TYPE)
        throw new Error(control + "is not a Control");
    var controlConstructorParams;
    if (services.length) {
        controlConstructorParams = services.map(function (service) {
            return inject_1.mapInject(service.prototype, Reflect.construct(service, []));
        });
    }
    else {
        controlConstructorParams = [];
    }
    var controlInstance = Reflect.construct(control, controlConstructorParams);
    inject_1.mapInject(control.prototype, controlInstance);
    var path = Reflect.getMetadata(reflectConst_1.REFLECT_PATH, control);
    var router = express.Router();
    var httpVerbMethods = Reflect.ownKeys(control.prototype)
        .filter(function (key) {
        return key !== "constructor" &&
            Reflect.hasMetadata(reflectConst_1.REFLECT_METHOD, control["prototype"][key]);
    })
        .map(function (key) {
        return { method: control["prototype"][key], key: key };
    });
    httpVerbs_1.mapHttpVerbs(router, control, httpVerbMethods, controlInstance);
    return { path: path, router: router };
};
