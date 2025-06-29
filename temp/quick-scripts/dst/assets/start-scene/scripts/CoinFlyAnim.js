
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/CoinFlyAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXENvaW5GbHlBbmltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04seUNBQWtFO0FBQ2xFLDZDQUFtQztBQUNuQywrQ0FBOEM7QUFDOUMsaUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBCLCtCQUFZO0lBQXRDO1FBQUEscUVBdUVDO1FBckVXLG9CQUFjLEdBQWdCLEVBQUUsQ0FBQztRQUVqQyxlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFVLEdBQVksSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxpQkFBVyxHQUFZLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxpQkFBVyxHQUFXLENBQUMsQ0FBQzs7SUFnRXBDLENBQUM7SUE5RGEsOEJBQVEsR0FBbEI7UUFDSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM5QztRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FB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QUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUosSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQ3RELENBQUM7UUFDRixJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzFFLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQzFFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFwRUQ7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7dURBQ21CO0lBRnZDLFdBQVc7UUFEaEIsT0FBTztPQUNGLFdBQVcsQ0F1RWhCO0lBQUQsa0JBQUM7Q0F2RUQsQUF1RUMsQ0F2RXlCLDJCQUFZLEdBdUVyQztBQUVRLGtDQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IExheWVyVHlwZSwgUmV3YXJkSWRFbnVtLCBCdW5kbGVOYW1lIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgQ29pbkZseUFuaW0gZXh0ZW5kcyBOb2RlUG9vbEl0ZW0ge1xyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVdKVxyXG4gICAgcHJpdmF0ZSBjb2luX3Nwcl9hcnJheTogY2MuU3ByaXRlW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF9jb2luX251bTogbnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgX3N0YXJ0X3BvczogY2MuVmVjMyA9IG5ldyBjYy5WZWMzKDAsIDApO1xyXG4gICAgcHJpdmF0ZSBfdGFyZ2V0X3BvczogY2MuVmVjMyA9IG5ldyBjYy5WZWMzKC0zMDAsIDUwMCk7XHJcbiAgICBwcml2YXRlIF9leGlzdF90aW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29pbl9zcHJfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb2luX3Nwcl9hcnJheVtpXS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fZXhpc3RfdGltZSA9IDA7IGkgPCB0aGlzLl9jb2luX251bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9fbm9kZV9hbmltKHRoaXMuY29pbl9zcHJfYXJyYXlbaV0ubm9kZSwgMC4wMSAqIGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZXhpc3RfdGltZSArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2V4aXN0X3RpbWUgPj0gNSkge1xyXG4gICAgICAgICAgICBnbS5wb29sLnB1dCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdF9mbHlfYW5pbShyZXdhcmRJZDogUmV3YXJkSWRFbnVtLCBzdGFydFBvczogY2MuVmVjMywgdGFyZ2V0UG9zPzogY2MuVmVjMyB8IG51bGwsIGNvaW5OdW06IG51bWJlciA9IDEpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29pbl9zcHJfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmNvaW5fc3ByX2FycmF5W2ldLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaXRlbS9cIiArIHJld2FyZElkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGF5ZXJOb2RlID0gZ20udWkuZ2V0X2xheWVyX25vZGUoTGF5ZXJUeXBlLlRPUCk7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRfcG9zID0gbGF5ZXJOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHN0YXJ0UG9zKTtcclxuICAgICAgICBpZiAodGFyZ2V0UG9zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0X3BvcyA9IGdtLnVpLm1hcE1haW5VSS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHN0YXJ0UG9zKTtcclxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0X3BvcyA9IGdtLnVpLm1hcE1haW5VSS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnbS51aS5tYXBNYWluVUkgJiYgZ20udWkubWFwTWFpblVJLm5vZGUuYWN0aXZlSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChyZXdhcmRJZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBSZXdhcmRJZEVudW0uRElBTU9ORDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRfcG9zID0gbGF5ZXJOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGdtLnVpLm1hcE1haW5VSS5kaWFtb25kX2ljb25fbm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFJld2FyZElkRW51bS5HT0xEOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldF9wb3MgPSBsYXllck5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZ20udWkubWFwTWFpblVJLmdvbGRfaWNvbl9ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUmV3YXJkSWRFbnVtLlNUQVI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0X3BvcyA9IGxheWVyTm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihnbS51aS5tYXBNYWluVUkubGFkZGVyX25vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKG5ldyBjYy5WZWMzKC0yNSwgLTI4KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBSZXdhcmRJZEVudW0uQkFSUkVMOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldF9wb3MgPSBsYXllck5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZ20udWkubWFwTWFpblVJLmJhcnJlbE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKG5ldyBjYy5WZWMzKC0yNSwgLTI4KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvaW5fbnVtID0gTWF0aC5taW4oY29pbk51bSwgdGhpcy5jb2luX3Nwcl9hcnJheS5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZG9fbm9kZV9hbmltKG5vZGU6IGNjLk5vZGUsIGRlbGF5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihuZXcgY2MuVmVjMih0aGlzLl9zdGFydF9wb3MueCwgdGhpcy5fc3RhcnRfcG9zLnkpKTtcclxuICAgICAgICBub2RlLnNjYWxlID0gMTtcclxuICAgICAgICBjb25zdCBhbmdsZSA9IDIgKiBNYXRoLlBJICogZGVsYXkgKiAxMDtcclxuICAgICAgICBjb25zdCB0YXJnZXRQb3MgPSBuZXcgY2MuVmVjMih0aGlzLl9zdGFydF9wb3MueCArIDEwMCAqIE1hdGguY29zKGFuZ2xlKSwgdGhpcy5fc3RhcnRfcG9zLnkgKyAxMDAgKiBNYXRoLnNpbihhbmdsZSkgKyAyMDApO1xyXG4gICAgICAgIGNvbnN0IG1vdmVBY3Rpb24gPSBjYy5tb3ZlVG8oMC4yICsgMC4xICogTWF0aC5yYW5kb20oKSwgdGFyZ2V0UG9zLngsIHRhcmdldFBvcy55KTtcclxuICAgICAgICBjb25zdCBiZXppZXJQb2ludHMgPSBbXHJcbiAgICAgICAgICAgIHRhcmdldFBvcyxcclxuICAgICAgICAgICAgbmV3IGNjLlZlYzIoKHRoaXMuX3RhcmdldF9wb3MueCArIHRhcmdldFBvcy54KSAvIDIgKyAodGhpcy5fdGFyZ2V0X3Bvcy54IC0gdGFyZ2V0UG9zLngpICogKE1hdGgucmFuZG9tKCkgLSAwLjUpIC8gMiwgKHRoaXMuX3RhcmdldF9wb3MueSArIHRhcmdldFBvcy55KSAvIDIpLFxyXG4gICAgICAgICAgICBuZXcgY2MuVmVjMih0aGlzLl90YXJnZXRfcG9zLngsIHRoaXMuX3RhcmdldF9wb3MueSlcclxuICAgICAgICBdO1xyXG4gICAgICAgIGNvbnN0IGJlemllckFjdGlvbiA9IGNjLmJlemllclRvKDAuNCArIDAuMyAqIE1hdGgucmFuZG9tKCksIGJlemllclBvaW50cyk7XHJcbiAgICAgICAgY29uc3Qgc2NhbGVBY3Rpb24gPSBjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMDEsIDEuMiwgMS4yKSwgY2Muc2NhbGVUbygwLjA1LCAwLCAwKSk7XHJcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UobW92ZUFjdGlvbiwgYmV6aWVyQWN0aW9uLCBzY2FsZUFjdGlvbiwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IENvaW5GbHlBbmltIH07Il19