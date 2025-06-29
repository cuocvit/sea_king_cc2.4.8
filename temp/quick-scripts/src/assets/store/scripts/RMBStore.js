"use strict";
cc._RF.push(module, '50953esjIVPcJrQvE3cnVmt', 'RMBStore');
// store/scripts/RMBStore.ts

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
var RMBStoreItem_1 = require("./RMBStoreItem");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoreComponent = /** @class */ (function (_super) {
    __extends(StoreComponent, _super);
    function StoreComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.barrelDiamList = null;
        _this.diamList = null;
        _this.barrelList = null;
        return _this;
    }
    StoreComponent.prototype.onEnable = function () {
        var _this = this;
        var storeList = GameManager_1.gm.data.config_data.getStoreList();
        var addStoreItem = function (index) {
            var _loop_1 = function (itemIndex) {
                var item = storeList[index][itemIndex];
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.STORE, "prefabs/store_item", RMBStoreItem_1.default, function (storeItem) {
                    var _a, _b, _c;
                    storeItem.data = item;
                    if (item.shop_type == 1) {
                        (_a = _this.barrelDiamList) === null || _a === void 0 ? void 0 : _a.addChild(storeItem.node);
                    }
                    else if (item.shop_type == 3) {
                        (_b = _this.barrelList) === null || _b === void 0 ? void 0 : _b.addChild(storeItem.node);
                    }
                    else if (item.shop_type == 2) {
                        (_c = _this.diamList) === null || _c === void 0 ? void 0 : _c.addChild(storeItem.node);
                    }
                });
            };
            for (var itemIndex = 0; itemIndex < storeList[index].length; itemIndex++) {
                _loop_1(itemIndex);
            }
        };
        GameManager_1.gm.pool.put_children(this.barrelDiamList);
        GameManager_1.gm.pool.put_children(this.diamList);
        GameManager_1.gm.pool.put_children(this.barrelList);
        for (var index in GameManager_1.gm.data.config_data.getStoreList()) {
            addStoreItem(Number(index));
        }
    };
    StoreComponent.prototype.onClickClose = function () {
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.RMBSTORE);
    };
    StoreComponent.prototype.onDisable = function () {
        GameManager_1.gm.pool.put_children(this.barrelDiamList);
        GameManager_1.gm.pool.put_children(this.diamList);
        GameManager_1.gm.pool.put_children(this.barrelList);
    };
    __decorate([
        property(cc.Node)
    ], StoreComponent.prototype, "barrelDiamList", void 0);
    __decorate([
        property(cc.Node)
    ], StoreComponent.prototype, "diamList", void 0);
    __decorate([
        property(cc.Node)
    ], StoreComponent.prototype, "barrelList", void 0);
    StoreComponent = __decorate([
        ccclass
    ], StoreComponent);
    return StoreComponent;
}(cc.Component));

cc._RF.pop();