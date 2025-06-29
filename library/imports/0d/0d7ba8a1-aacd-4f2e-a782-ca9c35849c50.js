"use strict";
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