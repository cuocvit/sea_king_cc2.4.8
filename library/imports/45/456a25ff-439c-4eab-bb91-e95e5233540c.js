"use strict";
cc._RF.push(module, '456a2X/Q5xOq7uR6V5SM1QM', 'CoinFlyAnim');
// start-scene/scripts/CoinFlyAnim.ts

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
exports.CoinFlyAnim = void 0;
// +-+
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CoinFlyAnim = /** @class */ (function (_super) {
    __extends(CoinFlyAnim, _super);
    function CoinFlyAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coin_spr_array = [];
        _this._coin_num = 1;
        _this._start_pos = new cc.Vec3(0, 0);
        _this._target_pos = new cc.Vec3(-300, 500);
        _this._exist_time = 0;
        return _this;
    }
    CoinFlyAnim.prototype.onEnable = function () {
        for (var i = 0; i < this.coin_spr_array.length; i++) {
            this.coin_spr_array[i].node.active = false;
        }
        for (var i = this._exist_time = 0; i < this._coin_num; i++) {
            this.do_node_anim(this.coin_spr_array[i].node, 0.01 * i);
        }
    };
    CoinFlyAnim.prototype.update = function (deltaTime) {
        this._exist_time += deltaTime;
        if (this._exist_time >= 5) {
            GameManager_1.gm.pool.put(this.node);
        }
    };
    CoinFlyAnim.prototype.init_fly_anim = function (rewardId, startPos, targetPos, coinNum) {
        if (coinNum === void 0) { coinNum = 1; }
        for (var i = 0; i < this.coin_spr_array.length; i++) {
            Utils_1.Utils.async_set_sprite_frame(this.coin_spr_array[i], Constants_1.BundleName.COMMON, "res/item/" + rewardId);
        }
        var layerNode = GameManager_1.gm.ui.get_layer_node(Constants_1.LayerType.TOP);
        this._start_pos = layerNode.convertToNodeSpaceAR(startPos);
        if (targetPos) {
            this._start_pos = GameManager_1.gm.ui.mapMainUI.node.convertToNodeSpaceAR(startPos);
            this._target_pos = GameManager_1.gm.ui.mapMainUI.node.convertToNodeSpaceAR(targetPos);
        }
        else if (GameManager_1.gm.ui.mapMainUI && GameManager_1.gm.ui.mapMainUI.node.activeInHierarchy) {
            switch (rewardId) {
                case Constants_1.RewardIdEnum.DIAMOND:
                    this._target_pos = layerNode.convertToNodeSpaceAR(GameManager_1.gm.ui.mapMainUI.diamond_icon_node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                    break;
                case Constants_1.RewardIdEnum.GOLD:
                    this._target_pos = layerNode.convertToNodeSpaceAR(GameManager_1.gm.ui.mapMainUI.gold_icon_node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                    break;
                case Constants_1.RewardIdEnum.STAR:
                    this._target_pos = layerNode.convertToNodeSpaceAR(GameManager_1.gm.ui.mapMainUI.ladder_node.convertToWorldSpaceAR(new cc.Vec3(-25, -28)));
                    break;
                case Constants_1.RewardIdEnum.BARREL:
                    this._target_pos = layerNode.convertToNodeSpaceAR(GameManager_1.gm.ui.mapMainUI.barrelNode.convertToWorldSpaceAR(new cc.Vec3(-25, -28)));
                    break;
            }
        }
        this._coin_num = Math.min(coinNum, this.coin_spr_array.length);
    };
    CoinFlyAnim.prototype.do_node_anim = function (node, delay) {
        node.active = true;
        node.setPosition(new cc.Vec2(this._start_pos.x, this._start_pos.y));
        node.scale = 1;
        var angle = 2 * Math.PI * delay * 10;
        var targetPos = new cc.Vec2(this._start_pos.x + 100 * Math.cos(angle), this._start_pos.y + 100 * Math.sin(angle) + 200);
        var moveAction = cc.moveTo(0.2 + 0.1 * Math.random(), targetPos.x, targetPos.y);
        var bezierPoints = [
            targetPos,
            new cc.Vec2((this._target_pos.x + targetPos.x) / 2 + (this._target_pos.x - targetPos.x) * (Math.random() - 0.5) / 2, (this._target_pos.y + targetPos.y) / 2),
            new cc.Vec2(this._target_pos.x, this._target_pos.y)
        ];
        var bezierAction = cc.bezierTo(0.4 + 0.3 * Math.random(), bezierPoints);
        var scaleAction = cc.sequence(cc.scaleTo(0.01, 1.2, 1.2), cc.scaleTo(0.05, 0, 0));
        node.runAction(cc.sequence(moveAction, bezierAction, scaleAction, cc.callFunc(function () {
            node.active = false;
        })));
    };
    __decorate([
        property([cc.Sprite])
    ], CoinFlyAnim.prototype, "coin_spr_array", void 0);
    CoinFlyAnim = __decorate([
        ccclass
    ], CoinFlyAnim);
    return CoinFlyAnim;
}(NodePoolItem_1.NodePoolItem));
exports.CoinFlyAnim = CoinFlyAnim;

cc._RF.pop();