
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GetReel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f092eu08ohCvbTTwWE35n8r', 'GetReel');
// start-scene/scripts/GetReel.ts

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
exports.GetReel = void 0;
// +-+
var GameModule_1 = require("./GameModule");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var MainMapItem_1 = require("./MainMapItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetReel = /** @class */ (function (_super) {
    __extends(GetReel, _super);
    function GetReel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reel_anim = null;
        _this.reel_node = null;
        _this.isShowBarrackList = true;
        return _this;
    }
    GetReel.prototype.onEnable = function () {
        this.isShowBarrackList = !!GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.GetReel.key);
        this.reel_anim.on(cc.Animation.EventType.FINISHED, this.on_anim_finished, this);
        this.reel_anim.play();
    };
    GetReel.prototype.onDisable = function () { };
    GetReel.prototype.on_anim_finished = function () {
        var _a, _b;
        var self = this;
        (_a = this.reel_anim) === null || _a === void 0 ? void 0 : _a.off(cc.Animation.EventType.FINISHED, this.on_anim_finished, this);
        var reelInstance = cc.instantiate(this.reel_node);
        reelInstance.active = true;
        reelInstance.scale = 1;
        reelInstance.angle = 0;
        var isHidden = !(reelInstance.opacity = 255);
        var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.BARRACKS_TYPE);
        if (buildData) {
            var mapChild = GameManager_1.gm.ui.mapMainUI.mapContent.getChildByName(buildData.cellID.toString());
            if (mapChild) {
                var mapBuildNode = (_b = mapChild.getComponent(MainMapItem_1.default)) === null || _b === void 0 ? void 0 : _b.mapBuildNode;
                if (mapBuildNode) {
                    var worldPosition = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
                    worldPosition = GameManager_1.gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(worldPosition);
                    reelInstance.position = cc.v3(worldPosition);
                    GameManager_1.gm.ui.mapMainUI.mapContent.addChild(reelInstance, 10000);
                    isHidden = true;
                    var buildWorldPosition = mapBuildNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
                    buildWorldPosition = GameManager_1.gm.ui.mapMainUI.mapContent.convertToNodeSpaceAR(buildWorldPosition);
                    cc.tween(reelInstance)
                        .bezierTo(1, worldPosition, cc.v2(worldPosition.x, worldPosition.y + 100), cc.v2(buildWorldPosition))
                        .call(function () {
                        reelInstance === null || reelInstance === void 0 ? void 0 : reelInstance.destroy();
                        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GetReel);
                        self.isShowBarrackList;
                    })
                        .start();
                }
            }
        }
        if (!isHidden) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GetReel);
        }
    };
    __decorate([
        property(cc.Animation)
    ], GetReel.prototype, "reel_anim", void 0);
    __decorate([
        property(cc.Node)
    ], GetReel.prototype, "reel_node", void 0);
    GetReel = __decorate([
        ccclass
    ], GetReel);
    return GetReel;
}(GameModule_1.GameModule));
exports.GetReel = GetReel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdldFJlZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiwyQ0FBMEM7QUFDMUMseUNBQTRDO0FBQzVDLDZDQUFtQztBQUNuQyw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkIsMkJBQVU7SUFBdkM7UUFBQSxxRUFzREM7UUFwRFcsZUFBUyxHQUF3QixJQUFJLENBQUM7UUFHdEMsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFFakMsdUJBQWlCLEdBQVksSUFBSSxDQUFDOztJQStDOUMsQ0FBQztJQTdDYSwwQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVTLDJCQUFTLEdBQW5CLGNBQThCLENBQUM7SUFFdkIsa0NBQWdCLEdBQXhCOztRQUNJLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixNQUFBLElBQUksQ0FBQyxTQUFTLDBDQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRTtRQUNsRixJQUFNLFlBQVksR0FBRyxF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b3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBCdWlsZFR5cGVFbnVtIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgTWFpbk1hcEl0ZW0gZnJvbSAnLi9NYWluTWFwSXRlbSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIEdldFJlZWwgZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICAgIEBwcm9wZXJ0eShjYy5BbmltYXRpb24pXHJcbiAgICBwcml2YXRlIHJlZWxfYW5pbTogY2MuQW5pbWF0aW9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJlZWxfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaXNTaG93QmFycmFja0xpc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzU2hvd0JhcnJhY2tMaXN0ID0gISFnbS51aS5nZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR2V0UmVlbC5rZXkpO1xyXG4gICAgICAgIHRoaXMucmVlbF9hbmltLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsIHRoaXMub25fYW5pbV9maW5pc2hlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWVsX2FuaW0ucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7IH1cclxuXHJcbiAgICBwcml2YXRlIG9uX2FuaW1fZmluaXNoZWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5yZWVsX2FuaW0/Lm9mZihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCB0aGlzLm9uX2FuaW1fZmluaXNoZWQsIHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IHJlZWxJbnN0YW5jZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmVlbF9ub2RlKTtcclxuICAgICAgICByZWVsSW5zdGFuY2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICByZWVsSW5zdGFuY2Uuc2NhbGUgPSAxO1xyXG4gICAgICAgIHJlZWxJbnN0YW5jZS5hbmdsZSA9IDA7XHJcbiAgICAgICAgbGV0IGlzSGlkZGVuOiBib29sZWFuID0gIShyZWVsSW5zdGFuY2Uub3BhY2l0eSA9IDI1NSk7XHJcbiAgICAgICAgY29uc3QgYnVpbGREYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uQkFSUkFDS1NfVFlQRSk7XHJcblxyXG4gICAgICAgIGlmIChidWlsZERhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgbWFwQ2hpbGQgPSBnbS51aS5tYXBNYWluVUkubWFwQ29udGVudC5nZXRDaGlsZEJ5TmFtZShidWlsZERhdGEuY2VsbElELnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBpZiAobWFwQ2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcEJ1aWxkTm9kZSA9IG1hcENoaWxkLmdldENvbXBvbmVudChNYWluTWFwSXRlbSk/Lm1hcEJ1aWxkTm9kZTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXBCdWlsZE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd29ybGRQb3NpdGlvbiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMi5aRVJPKTtcclxuICAgICAgICAgICAgICAgICAgICB3b3JsZFBvc2l0aW9uID0gZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVlbEluc3RhbmNlLnBvc2l0aW9uID0gY2MudjMod29ybGRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuYWRkQ2hpbGQocmVlbEluc3RhbmNlLCAxMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWlsZFdvcmxkUG9zaXRpb24gPSBtYXBCdWlsZE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIuWkVSTyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRXb3JsZFBvc2l0aW9uID0gZ20udWkubWFwTWFpblVJLm1hcENvbnRlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoYnVpbGRXb3JsZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihyZWVsSW5zdGFuY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5iZXppZXJUbygxLCB3b3JsZFBvc2l0aW9uLCBjYy52Mih3b3JsZFBvc2l0aW9uLngsIHdvcmxkUG9zaXRpb24ueSArIDEwMCksIGNjLnYyKGJ1aWxkV29ybGRQb3NpdGlvbikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZWxJbnN0YW5jZT8uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuR2V0UmVlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlzU2hvd0JhcnJhY2tMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzSGlkZGVuKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkdldFJlZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==