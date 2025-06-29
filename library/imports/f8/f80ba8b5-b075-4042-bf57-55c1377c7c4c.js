"use strict";
cc._RF.push(module, 'f80bai1sHVAQr9XVcE3fHxM', 'GameObject');
// start-scene/scripts/GameObject.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObject = void 0;
var GameObjectManager_1 = require("./GameObjectManager");
var ccclass = cc._decorator.ccclass;
var GameObject = /** @class */ (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        _this.__unique_id = GameObjectManager_1.GameObjectManager.unique_id;
        _this.__create_time = Date.now();
        GameObjectManager_1.GameObjectManager.instance.add(_this);
        return _this;
    }
    GameObject.prototype.onDestroy = function () {
        this.__destroy_time = Date.now();
        GameObjectManager_1.GameObjectManager.instance.remove(this);
    };
    GameObject = __decorate([
        ccclass
    ], GameObject);
    return GameObject;
}(cc.Component));
exports.GameObject = GameObject;

cc._RF.pop();