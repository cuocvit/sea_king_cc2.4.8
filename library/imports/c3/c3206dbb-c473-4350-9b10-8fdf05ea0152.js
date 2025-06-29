"use strict";
cc._RF.push(module, 'c320627xHNDUJsQj98F6gFS', 'FlyNotice');
// start-scene/scripts/FlyNotice.ts

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
exports.FlyNotice = void 0;
// +-+
var GameModule_1 = require("./GameModule");
var GameManager_1 = require("./GameManager");
var FlyNoticeItem_1 = require("./FlyNoticeItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FlyNotice = /** @class */ (function (_super) {
    __extends(FlyNotice, _super);
    function FlyNotice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fly_notice_item_prefab = null;
        return _this;
    }
    FlyNotice.prototype.onLoad = function () {
        GameManager_1.gm.pool.init(GameManager_1.gm.const.FlyNoticeItem.bundle_name, GameManager_1.gm.const.FlyNoticeItem.load_url, FlyNoticeItem_1.FlyNoticeItem);
    };
    FlyNotice.prototype.show_fly_notice = function (message, duration, position) {
        var _this = this;
        GameManager_1.gm.pool.async_get(GameManager_1.gm.const.FlyNoticeItem.bundle_name, GameManager_1.gm.const.FlyNoticeItem.load_url, FlyNoticeItem_1.FlyNoticeItem, function (item) {
            if (!item)
                return;
            _this.node.addChild(item.node);
            item.node.position = _this.node.convertToNodeSpaceAR(position);
            var flyNoticeItem = item;
            flyNoticeItem.set_data(message, duration);
        });
    };
    __decorate([
        property(cc.Prefab)
    ], FlyNotice.prototype, "fly_notice_item_prefab", void 0);
    FlyNotice = __decorate([
        ccclass
    ], FlyNotice);
    return FlyNotice;
}(GameModule_1.GameModule));
exports.FlyNotice = FlyNotice;

cc._RF.pop();