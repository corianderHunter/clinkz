"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("../lib/express");
var reflectConst_1 = require("./reflectConst");
var bodyParser = require("body-parser");
var control_1 = require("./control");
function createApplication(modules) {
    if (!modules.length)
        throw new Error("modules can not be empty!");
    for (var i = 0; i < modules.length; i++) {
        if (Reflect.getMetadata(reflectConst_1.REFLECT_CLASS_TYPE, modules[i]) !==
            reflectConst_1.REFLECT_CLASS_MODULE_TYPE)
            throw new Error(modules[i] + " is not a Module");
    }
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    modules.forEach(function (_module) {
        var controls = Reflect.getMetadata(reflectConst_1.REFLECT_CONTROL, _module);
        var services = Reflect.getMetadata(reflectConst_1.REFLECT_SERVICE, _module);
        var routers = controls.map(function (control) {
            return control_1.mapControl(control, services);
        });
        routers.forEach(function (_a) {
            var path = _a.path, router = _a.router;
            return app.use(path, router);
        });
    });
    return app;
}
exports.default = createApplication;
