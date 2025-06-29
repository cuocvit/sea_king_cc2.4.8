"use strict";
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