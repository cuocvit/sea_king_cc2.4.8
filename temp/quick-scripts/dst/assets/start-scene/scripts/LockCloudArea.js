
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/LockCloudArea.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4018bDdWGVKSLtNU0llnQ4B', 'LockCloudArea');
// start-scene/scripts/LockCloudArea.ts

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
// +-+
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LockCloudArea = /** @class */ (function (_super) {
    __extends(LockCloudArea, _super);
    function LockCloudArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.barNode = null;
        _this.buildTipsLbl = null;
        _this.lockNode = null;
        _this.rightNode = null;
        _this.curType = 0;
        _this.buildLvl = 0;
        return _this;
    }
    LockCloudArea.prototype.initType = function (type) {
        this.curType = type;
    };
    LockCloudArea.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("unlock_cloud_refresh", this.playAnim, this);
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
        this.node.position = GameManager_1.gm.const.localCloudAreaList[this.curType].pos;
        this.refreshPanel();
    };
    LockCloudArea.prototype.playAnim = function (type) {
        if (type == this.curType) {
            this.node.getComponent(cc.Animation).play();
        }
    };
    LockCloudArea.prototype.playAnimEnd = function () {
        GameManager_1.gm.pool.put(this.node);
    };
    LockCloudArea.prototype.refreshPanel = function () {
        this.buildLvl = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.TOWER_TYPE).buildLvl;
        this.barNode.width = Math.min(this.buildLvl / GameManager_1.gm.const.localCloudAreaList[this.curType].lvl * 130, 130);
        this.lockNode.active = true;
        this.rightNode.active = false;
        if (this.buildLvl >= GameManager_1.gm.const.localCloudAreaList[this.curType].lvl) {
            this.lockNode.active = false;
            this.rightNode.active = true;
        }
        this.buildTipsLbl.string = "L\u00E2u \u0111\u00E0i c\u1EA5p (" + this.buildLvl + "/" + GameManager_1.gm.const.localCloudAreaList[this.curType].lvl + ")";
    };
    LockCloudArea.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("unlock_cloud_refresh", this.playAnim, this);
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
    };
    LockCloudArea.prototype.onClickBuild = function () {
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.UNLOCKAREACLOUDOP.key, this.curType);
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.UNLOCKAREACLOUDOP);
    };
    __decorate([
        property(cc.Node)
    ], LockCloudArea.prototype, "barNode", void 0);
    __decorate([
        property(cc.Label)
    ], LockCloudArea.prototype, "buildTipsLbl", void 0);
    __decorate([
        property(cc.Node)
    ], LockCloudArea.prototype, "lockNode", void 0);
    __decorate([
        property(cc.Node)
    ], LockCloudArea.prototype, "rightNode", void 0);
    LockCloudArea = __decorate([
        ccclass
    ], LockCloudArea);
    return LockCloudArea;
}(NodePoolItem_1.NodePoolItem));
exports.default = LockCloudArea;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXExvY2tDbG91ZEFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLHlDQUE0QztBQUM1Qyw2Q0FBbUM7QUFDbkMsK0NBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRCLGlDQUFZO0lBQXhDO1FBQUEscUVBNERDO1FBMURXLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBRy9CLGtCQUFZLEdBQW9CLElBQUksQ0FBQztRQUdyQyxjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdoQyxlQUFTLEdBQW1CLElBQUksQ0FBQztRQUVqQyxhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLGNBQVEsR0FBVyxDQUFDLENBQUM7O0lBOENqQyxDQUFDO0lBNUNVLGdDQUFRLEdBQWYsVUFBZ0IsSUFBWTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRVMsZ0NBQVEsR0FBbEI7UUFDSSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbkUsSUFBSSxDQUFD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b250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBCdWlsZFR5cGVFbnVtIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTG9ja0Nsb3VkQXJlYSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYmFyTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgYnVpbGRUaXBzTGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsb2NrTm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByaWdodE5vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGN1clR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGJ1aWxkTHZsOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBpbml0VHlwZSh0eXBlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN1clR5cGUgPSB0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vbihcInVubG9ja19jbG91ZF9yZWZyZXNoXCIsIHRoaXMucGxheUFuaW0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCB0aGlzLnBsYXlBbmltRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSBnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3RbdGhpcy5jdXJUeXBlXS5wb3M7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBsYXlBbmltKHR5cGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlID09IHRoaXMuY3VyVHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBsYXlBbmltRW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnBvb2wucHV0KHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZnJlc2hQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJ1aWxkTHZsID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uVE9XRVJfVFlQRSkuYnVpbGRMdmw7XHJcbiAgICAgICAgdGhpcy5iYXJOb2RlLndpZHRoID0gTWF0aC5taW4odGhpcy5idWlsZEx2bCAvIGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdFt0aGlzLmN1clR5cGVdLmx2bCAqIDEzMCwgMTMwKTtcclxuICAgICAgICB0aGlzLmxvY2tOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yaWdodE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJ1aWxkTHZsID49IGdtLmNvbnN0LmxvY2FsQ2xvdWRBcmVhTGlzdFt0aGlzLmN1clR5cGVdLmx2bCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5idWlsZFRpcHNMYmwuc3RyaW5nID0gYEzDonUgxJHDoGkgY+G6pXAgKCR7dGhpcy5idWlsZEx2bH0vJHtnbS5jb25zdC5sb2NhbENsb3VkQXJlYUxpc3RbdGhpcy5jdXJUeXBlXS5sdmx9KWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vZmYoXCJ1bmxvY2tfY2xvdWRfcmVmcmVzaFwiLCB0aGlzLnBsYXlBbmltLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub2ZmKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsIHRoaXMucGxheUFuaW1FbmQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0J1aWxkKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5VTkxPQ0tBUkVBQ0xPVURPUC5rZXksIHRoaXMuY3VyVHlwZSk7XHJcbiAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuVU5MT0NLQVJFQUNMT1VET1ApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2NrQ2xvdWRBcmVhOyJdfQ==