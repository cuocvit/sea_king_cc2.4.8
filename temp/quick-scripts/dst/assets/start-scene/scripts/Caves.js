
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/Caves.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '73dfc3WqjdM0pOF81uHaeqV', 'Caves');
// start-scene/scripts/Caves.ts

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
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Caves = /** @class */ (function (_super) {
    __extends(Caves, _super);
    function Caves() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblTips = null;
        _this.lockNode = null;
        _this.funCellID = 143;
        return _this;
    }
    Caves.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("open_special_fun", this.openSpecialFun, this);
        this.initCavesNode();
    };
    Caves.prototype.openSpecialFun = function (cellID) {
        if (cellID == this.funCellID) {
            this.initCavesNode();
        }
    };
    Caves.prototype.initCavesNode = function () {
        var _this = this;
        var SpecialByID = GameManager_1.gm.data.config_data.getSpecialByID(Constants_1.SpecialEnum.CAVES_TYPE);
        if (SpecialByID) {
            if (GameManager_1.gm.data.mapCell_data.role_map_data[SpecialByID.unlock]) {
                var special = GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.CAVES_TYPE];
                if (1 == special.state) {
                    this.lblTips.string = "Kho báu tổ tiên truyền đời! Mau lên đảo khám phá ngay!";
                    this.lockNode.active = true;
                }
                else if (2 == special.state) {
                    this.lockNode.active = false;
                    var tipsList_1 = ["Chiến đấu vì sự sinh tồn, chiến đấu vì bộ lạc!", "Chúng ta là những chiến binh tự do!", "Hãy cân nhắc sức mạnh của mình trước khi cướp bóc!"];
                    this.lblTips.string = "Chiến đấu vì sự sinh tồn, chiến đấu vì bộ lạc!";
                    this.node.stopAllActions();
                    this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(5), cc.callFunc(function () {
                        var randomIndex = Math.floor(Math.random() * tipsList_1.length);
                        _this.lblTips.string = tipsList_1[randomIndex];
                    }))));
                }
            }
            else {
                this.lblTips.string = "Mở khóa yêu cầu kết nối đảo với đất liền!!!";
                this.lockNode.active = true;
            }
        }
    };
    Caves.prototype.onClick = function () {
        var specialByID = GameManager_1.gm.data.config_data.getSpecialByID(Constants_1.SpecialEnum.CAVES_TYPE);
        if (!(specialByID && !GameManager_1.gm.data.mapCell_data.role_map_data[specialByID.unlock])) {
            GameManager_1.gm.ui.mapMainUI.handAnim.active = false;
            GameManager_1.gm.ui.mapMainUI.handAnim.active = false;
            var special = GameManager_1.gm.data.mapCell_data.specialList[Constants_1.SpecialEnum.CAVES_TYPE];
            if (1 == special.state) {
                GameManager_1.gm.ui.mapMainUI.showCavesLock();
            }
            else if (2 == special.state) {
                if (GameManager_1.gm.data.fight_temp_data.match_caves_map()) {
                    (GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GOBATTLE.key, 2),
                        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GOBATTLE));
                }
                else {
                    GameManager_1.gm.ui.show_notice("Đã đạt cấp độ cao nhất, hãy chờ cấp độ tiếp theo!!!");
                }
            }
        }
    };
    Caves.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("open_special_fun", this.openSpecialFun, this);
    };
    __decorate([
        property(cc.Label)
    ], Caves.prototype, "lblTips", void 0);
    __decorate([
        property(cc.Node)
    ], Caves.prototype, "lockNode", void 0);
    Caves = __decorate([
        ccclass
    ], Caves);
    return Caves;
}(cc.Component));
// export default Caves;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXENhdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFtQztBQUNuQyx5Q0FBMEM7QUFFcEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0IseUJBQVk7SUFBaEM7UUFBQSxxRUFtRUM7UUFqRVcsYUFBTyxHQUFhLElBQUksQ0FBQztRQUd6QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGVBQVMsR0FBVyxHQUFHLENBQUM7O0lBNERwQyxDQUFDO0lBMURhLHdCQUFRLEdBQWxCO1FBQ0ksZ0JBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyw4QkFBYyxHQUF0QixVQUF1QixNQUFjO1FBQ2pDLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVPLDZCQUFhLEdBQXJCO1FBQUEsaUJBdUJDO1FBdEJHLElBQU0sV0FBVyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsdUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRSxJQUFJLFdBQVcsRUFBRTtZQUNiLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3hELElBQU0sT0FBTyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsdUJBQVcsQ0FBQyxVQUFVLENB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QUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBaEVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MENBQ2M7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDZTtJQUwvQixLQUFLO1FBRFYsT0FBTztPQUNGLEtBQUssQ0FtRVY7SUFBRCxZQUFDO0NBbkVELEFBbUVDLENBbkVtQixFQUFFLENBQUMsU0FBUyxHQW1FL0I7QUFFRCx3QkFBd0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBTcGVjaWFsRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBDYXZlcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibFRpcHM6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbG9ja05vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgZnVuQ2VsbElEOiBudW1iZXIgPSAxNDM7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnVpLm9uKFwib3Blbl9zcGVjaWFsX2Z1blwiLCB0aGlzLm9wZW5TcGVjaWFsRnVuLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmluaXRDYXZlc05vZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW5TcGVjaWFsRnVuKGNlbGxJRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNlbGxJRCA9PSB0aGlzLmZ1bkNlbGxJRCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRDYXZlc05vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0Q2F2ZXNOb2RlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IFNwZWNpYWxCeUlEID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRTcGVjaWFsQnlJRChTcGVjaWFsRW51bS5DQVZFU19UWVBFKTtcclxuICAgICAgICBpZiAoU3BlY2lhbEJ5SUQpIHtcclxuICAgICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfbWFwX2RhdGFbU3BlY2lhbEJ5SUQudW5sb2NrXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlY2lhbCA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNwZWNpYWxMaXN0W1NwZWNpYWxFbnVtLkNBVkVTX1RZUEVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKDEgPT0gc3BlY2lhbC5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGJsVGlwcy5zdHJpbmcgPSBcIktobyBiw6F1IHThu5UgdGnDqm4gdHJ1eeG7gW4gxJHhu51pISBNYXUgbMOqbiDEkeG6o28ga2jDoW0gcGjDoSBuZ2F5IVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9ja05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoMiA9PSBzcGVjaWFsLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NrTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aXBzTGlzdCA9IFtcIkNoaeG6v24gxJHhuqV1IHbDrCBz4buxIHNpbmggdOG7k24sIGNoaeG6v24gxJHhuqV1IHbDrCBi4buZIGzhuqFjIVwiLCBcIkNow7puZyB0YSBsw6Agbmjhu69uZyBjaGnhur9uIGJpbmggdOG7sSBkbyFcIiwgXCJIw6N5IGPDom4gbmjhuq9jIHPhu6ljIG3huqFuaCBj4bunYSBtw6xuaCB0csaw4bubYyBraGkgY8aw4bubcCBiw7NjIVwiXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxibFRpcHMuc3RyaW5nID0gXCJDaGnhur9uIMSR4bqldSB2w6wgc+G7sSBzaW5oIHThu5NuLCBjaGnhur9uIMSR4bqldSB2w6wgYuG7mSBs4bqhYyFcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDUpLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGlwc0xpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYmxUaXBzLnN0cmluZyA9IHRpcHNMaXN0W3JhbmRvbUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICB9KSkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGJsVGlwcy5zdHJpbmcgPSBcIk3hu58ga2jDs2EgecOqdSBj4bqndSBr4bq/dCBu4buRaSDEkeG6o28gduG7m2kgxJHhuqV0IGxp4buBbiEhIVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGljaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzcGVjaWFsQnlJRCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0U3BlY2lhbEJ5SUQoU3BlY2lhbEVudW0uQ0FWRVNfVFlQRSk7XHJcbiAgICAgICAgaWYgKCEoc3BlY2lhbEJ5SUQgJiYgIWdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfbWFwX2RhdGFbc3BlY2lhbEJ5SUQudW5sb2NrXSkpIHtcclxuICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLmhhbmRBbmltLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBnbS51aS5tYXBNYWluVUkuaGFuZEFuaW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWNpYWwgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5zcGVjaWFsTGlzdFtTcGVjaWFsRW51bS5DQVZFU19UWVBFXTtcclxuICAgICAgICAgICAgaWYgKDEgPT0gc3BlY2lhbC5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnNob3dDYXZlc0xvY2soKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgyID09IHNwZWNpYWwuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5tYXRjaF9jYXZlc19tYXAoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIChnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR09CQVRUTEUua2V5LCAyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR09CQVRUTEUpKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIsSQw6MgxJHhuqF0IGPhuqVwIMSR4buZIGNhbyBuaOG6pXQsIGjDo3kgY2jhu50gY+G6pXAgxJHhu5kgdGnhur9wIHRoZW8hISFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vZmYoXCJvcGVuX3NwZWNpYWxfZnVuXCIsIHRoaXMub3BlblNwZWNpYWxGdW4sIHRoaXMpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IENhdmVzOyJdfQ==