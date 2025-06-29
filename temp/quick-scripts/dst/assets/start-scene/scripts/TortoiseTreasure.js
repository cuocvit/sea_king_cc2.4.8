
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TortoiseTreasure.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0d7baihqs1PLqeCypw1hJxQ', 'TortoiseTreasure');
// start-scene/scripts/TortoiseTreasure.ts

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
exports.TortoiseTreasure = void 0;
// *-*
var GameModule_1 = require("./GameModule");
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
var TaskData_1 = require("./TaskData");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TortoiseTreasure = /** @class */ (function (_super) {
    __extends(TortoiseTreasure, _super);
    function TortoiseTreasure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tipLbl = null;
        _this.lockNode = null;
        _this.funCellID = 235;
        return _this;
    }
    TortoiseTreasure.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("open_special_fun", this.openSpecialFun, this);
        this.node.getComponent(sp.Skeleton).setAnimation(0, "stay2", true);
        this.initTortoise();
    };
    TortoiseTreasure.prototype.openSpecialFun = function (eventID) {
        if (eventID === this.funCellID) {
            GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.UNLOCK_TURTLE);
            GameManager_1.gm.channel.report_event("unlock_play", {
                event_desc: "解锁玩法",
                desc: cc.js.formatStr("解锁玩法%s", "神龟")
            });
            NetUtils_1.ReportData.instance.report_once_point(10601);
            this.initTortoise();
        }
    };
    TortoiseTreasure.prototype.initTortoise = function () {
        var _this = this;
        this.lockNode.active = false;
        var randomTipIndex;
        var specialData = GameManager_1.gm.data.config_data.getSpecialByID(Constants_1.SpecialEnum.TORTOISE_TYPE);
        if (specialData) {
            var roleData = GameManager_1.gm.data.mapCell_data.role_map_data[specialData.unlock];
            if (roleData && roleData.itemState === 2) {
                var tips_1 = [
                    "Đây toàn là bảo vật đấy, ai dùng rồi mới biết giá trị của nó!",
                    "Kho báu ở đây đều là của ta, muốn cướp à? Không có cửa đâu!",
                    "Ta chỉ còn chút tài sản này thôi, hãy xem xét mà cho hợp lý.",
                    "Cái gì?! Hết tiền à?! Đừng làm phiền ta nghỉ ngơi!"
                ];
                randomTipIndex = Math.floor(Math.random() * tips_1.length);
                this.tipLbl.string = tips_1[randomTipIndex];
                this.node.stopAllActions();
                this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(8), cc.callFunc(function () {
                    randomTipIndex = Math.floor(Math.random() * tips_1.length);
                    _this.tipLbl.string = tips_1[randomTipIndex];
                }))));
            }
            else {
                this.tipLbl.string = "解锁需打通岛屿的陆地连接！";
                this.lockNode.active = true;
            }
        }
    };
    TortoiseTreasure.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("open_special_fun", this.openSpecialFun, this);
        this.node.stopAllActions();
    };
    TortoiseTreasure.prototype.onClickTurtleExchange = function () {
        var specialData = GameManager_1.gm.data.config_data.getSpecialByID(Constants_1.SpecialEnum.TORTOISE_TYPE);
        if (!(specialData && !GameManager_1.gm.data.mapCell_data.role_map_data[specialData.unlock])) {
            GameManager_1.gm.ui.mapMainUI.handAnim.active = false;
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.SuperRecruit);
        }
    };
    __decorate([
        property(cc.Label)
    ], TortoiseTreasure.prototype, "tipLbl", void 0);
    __decorate([
        property(cc.Node)
    ], TortoiseTreasure.prototype, "lockNode", void 0);
    TortoiseTreasure = __decorate([
        ccclass
    ], TortoiseTreasure);
    return TortoiseTreasure;
}(GameModule_1.GameModule));
exports.TortoiseTreasure = TortoiseTreasure;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFRvcnRvaXNlVHJlYXN1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiwyQ0FBMEM7QUFDMUMsNkNBQW1DO0FBQ25DLHlDQUEwQztBQUMxQyx1Q0FBK0M7QUFDL0MsdUNBQXdDO0FBRWxDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLG9DQUFVO0lBQWhEO1FBQUEscUVBa0VDO1FBaEVXLFlBQU0sR0FBb0IsSUFBSSxDQUFDO1FBRy9CLGNBQVEsR0FBbUIsSUFBSSxDQUFDO1FBRWhDLGVBQVMsR0FBVyxHQUFHLENBQUM7O0lBMkRwQyxDQUFDO0lBekRhLG1DQUFRLEdBQWxCO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8seUNBQWMsR0FBdEIsVUFBdUIsT0FBZTtRQUNsQyxJQUFJLE9BQU8sS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVCLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyw0QkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RSxnQkFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO2dCQUNuQyxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxF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UUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ3NCO0lBTC9CLGdCQUFnQjtRQUQ1QixPQUFPO09BQ0ssZ0JBQWdCLENBa0U1QjtJQUFELHVCQUFDO0NBbEVELEFBa0VDLENBbEVxQyx1QkFBVSxHQWtFL0M7QUFsRVksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKi0qXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBTcGVjaWFsRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgVGFza0NvbmRpdGlvblR5cGUgfSBmcm9tICcuL1Rhc2tEYXRhJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4vTmV0VXRpbHMnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBUb3J0b2lzZVRyZWFzdXJlIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHRpcExibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbG9ja05vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGZ1bkNlbGxJRDogbnVtYmVyID0gMjM1O1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vbihcIm9wZW5fc3BlY2lhbF9mdW5cIiwgdGhpcy5vcGVuU3BlY2lhbEZ1biwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0QW5pbWF0aW9uKDAsIFwic3RheTJcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5pbml0VG9ydG9pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW5TcGVjaWFsRnVuKGV2ZW50SUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudElEID09PSB0aGlzLmZ1bkNlbGxJRCkge1xyXG4gICAgICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS51cGRhdGVfdGFza19wcm9ncmVzcyhUYXNrQ29uZGl0aW9uVHlwZS5VTkxPQ0tfVFVSVExFKTtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJ1bmxvY2tfcGxheVwiLCB7XHJcbiAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIuino+mUgeeOqeazlVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogY2MuanMuZm9ybWF0U3RyKFwi6Kej6ZSB546p5rOVJXNcIiwgXCLnpZ7pvp9cIilcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA2MDEpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRUb3J0b2lzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUb3J0b2lzZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvY2tOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCByYW5kb21UaXBJbmRleDogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0IHNwZWNpYWxEYXRhID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRTcGVjaWFsQnlJRChTcGVjaWFsRW51bS5UT1JUT0lTRV9UWVBFKTtcclxuICAgICAgICBpZiAoc3BlY2lhbERhdGEpIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZURhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX21hcF9kYXRhW3NwZWNpYWxEYXRhLnVubG9ja107XHJcbiAgICAgICAgICAgIGlmIChyb2xlRGF0YSAmJiByb2xlRGF0YS5pdGVtU3RhdGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpcHM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIFwixJDDonkgdG/DoG4gbMOgIGLhuqNvIHbhuq10IMSR4bqleSwgYWkgZMO5bmcgcuG7k2kgbeG7m2kgYmnhur90IGdpw6EgdHLhu4sgY+G7p2EgbsOzIVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiS2hvIGLDoXUg4bufIMSRw6J5IMSR4buBdSBsw6AgY+G7p2EgdGEsIG114buRbiBjxrDhu5twIMOgPyBLaMO0bmcgY8OzIGPhu61hIMSRw6J1IVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVGEgY2jhu4kgY8OybiBjaMO6dCB0w6BpIHPhuqNuIG7DoHkgdGjDtGksIGjDo3kgeGVtIHjDqXQgbcOgIGNobyBo4bujcCBsw70uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJDw6FpIGfDrD8hIEjhur90IHRp4buBbiDDoD8hIMSQ4burbmcgbMOgbSBwaGnhu4FuIHRhIG5naOG7iSBuZ8ahaSFcIlxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVRpcEluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGlwcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBMYmwuc3RyaW5nID0gdGlwc1tyYW5kb21UaXBJbmRleF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoOCksIGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByYW5kb21UaXBJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRpcHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcExibC5zdHJpbmcgPSB0aXBzW3JhbmRvbVRpcEluZGV4XTtcclxuICAgICAgICAgICAgICAgIH0pKSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBMYmwuc3RyaW5nID0gXCLop6PplIHpnIDmiZPpgJrlspvlsb/nmoTpmYblnLDov57mjqXvvIFcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ja05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLm9mZihcIm9wZW5fc3BlY2lhbF9mdW5cIiwgdGhpcy5vcGVuU3BlY2lhbEZ1biwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrVHVydGxlRXhjaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3BlY2lhbERhdGEgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldFNwZWNpYWxCeUlEKFNwZWNpYWxFbnVtLlRPUlRPSVNFX1RZUEUpO1xyXG4gICAgICAgIGlmICghKHNwZWNpYWxEYXRhICYmICFnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlX21hcF9kYXRhW3NwZWNpYWxEYXRhLnVubG9ja10pKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLm1hcE1haW5VSS5oYW5kQW5pbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5TdXBlclJlY3J1aXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==