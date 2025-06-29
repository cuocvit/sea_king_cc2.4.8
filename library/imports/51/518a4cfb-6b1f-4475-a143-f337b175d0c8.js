"use strict";
cc._RF.push(module, '518a4z7ax9EdaFD8zexddDI', 'ItemFly');
// start-scene/scripts/ItemFly.ts

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
exports.ItemFly = void 0;
// +-+
var NodePoolItem_1 = require("./NodePoolItem");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ItemFly = /** @class */ (function (_super) {
    __extends(ItemFly, _super);
    function ItemFly() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._start_pos = new cc.Vec3(0, 0);
        _this._target_pos = new cc.Vec3(-300, 500);
        return _this;
    }
    ItemFly.prototype.onEnable = function () {
        this.node.zIndex = GameManager_1.gm.const.MAX_CELL_NUM + 4;
        this.do_node_anim();
    };
    ItemFly.prototype.init_fly_anim = function (itemId, startPos, targetPos) {
        var _this = this;
        if (targetPos === void 0) { targetPos = null; }
        var itemType = 3e4 < itemId ? Constants_1.ItemTypeEnum.HERO_TYPE : Constants_1.ItemTypeEnum.ITEM_TYPE;
        if (itemType == Constants_1.ItemTypeEnum.HERO_TYPE) {
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(itemId);
            if (heroConfig) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + heroConfig.heroid, NodePoolItem_1.NodePoolItem, function (t) {
                    console.log("hero node", _this.node.childrenCount);
                    if (0 == _this.node.childrenCount) {
                        _this.node.addChild(t.node);
                        t.node.x = 0;
                        t.node.y = -15;
                        if (t.getComponent(sp.Skeleton)) {
                            t.getComponent(sp.Skeleton).setSkin("front");
                            t.getComponent(sp.Skeleton).setAnimation(0, "stay", true);
                        }
                    }
                    else {
                        GameManager_1.gm.pool.put(t.node);
                    }
                });
            }
        }
        else if (!(itemType != Constants_1.ItemTypeEnum.ITEM_TYPE)) {
            var itemConfig = GameManager_1.gm.data.config_data.getItemCfgByID(itemId);
            if (itemConfig) {
                Utils_1.Utils.async_set_sprite_frame(this.node.getComponent(cc.Sprite), Constants_1.BundleName.MAP, "res/" + itemConfig.icon);
            }
        }
        this._start_pos = GameManager_1.gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(startPos);
        this._target_pos = GameManager_1.gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(targetPos);
    };
    ItemFly.prototype.do_node_anim = function () {
        var _this = this;
        this.node.active = true;
        this.node.setPosition(cc.v2(this._start_pos.x, this._start_pos.y));
        this.node.scale = GameManager_1.gm.ui.mapMainUI.mapContent.scale;
        var moveAction = cc.moveTo(.3, this._target_pos.x, this._target_pos.y);
        this.node.runAction(cc.sequence(moveAction, cc.callFunc(function () {
            GameManager_1.gm.pool.put_children(_this.node);
            GameManager_1.gm.pool.put(_this.node);
        })));
    };
    ItemFly = __decorate([
        ccclass
    ], ItemFly);
    return ItemFly;
}(NodePoolItem_1.NodePoolItem));
exports.ItemFly = ItemFly;

cc._RF.pop();