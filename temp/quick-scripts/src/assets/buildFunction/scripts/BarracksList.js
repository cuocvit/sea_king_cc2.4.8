"use strict";
cc._RF.push(module, '6fe18InwxpFGLl/IZjaLDhJ', 'BarracksList');
// buildFunction/scripts/BarracksList.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var BarracksItem_1 = require("./BarracksItem");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BraraclList = /** @class */ (function (_super) {
    __extends(BraraclList, _super);
    function BraraclList() {
        var _this = _super.call(this) || this;
        _this.heroItemList = [];
        _this.hero_list = null;
        _this.btn_close = null;
        _this.btn_book = null;
        _this.btn_back = null;
        _this.hp_lbl = null;
        _this.lvl_lbl = null;
        _this._mainbgStartRolation = 0;
        _this._endRotation = 0;
        _this._startX = 0;
        _this._endX = 0;
        _this._curIndex = 0;
        _this._max_list_count = 0;
        _this.ROTATION_PER_CARD = 15;
        _this._animation = null;
        _this._posArr = [
            cc.v3(-400, 1500), cc.v3(0, 1552), cc.v3(400, 1500),
            cc.v3(774, 1345), cc.v3(1100, 1096), cc.v3(1344, 776),
            cc.v3(1500, 404), cc.v3(1551, 2), cc.v3(1500, -403),
            cc.v3(1344, -776), cc.v3(1100, -1096), cc.v3(777, -1342),
            cc.v3(400, -1500), cc.v3(0, -1552), cc.v3(-400, -1500),
            cc.v3(-774, -1345), cc.v3(-1100, -1096), cc.v3(-1344, -776),
            cc.v3(-1500, -404), cc.v3(-1551, 2), cc.v3(-1500, 403),
            cc.v3(-1344, 776), cc.v3(-1100, 1096), cc.v3(-777, 1342)
        ];
        _this._maxHeroCount = 0;
        _this._moveX = 1;
        return _this;
    }
    BraraclList.prototype.onEnable = function () {
        this._maxHeroCount = GameManager_1.gm.data.mapCell_data.barracks_unlock_data.length;
        this._animation = this.node.getComponent(cc.Animation);
        this._animation.stop();
        this._animation.play("barracks_open");
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_2_BARRACK_OPEN);
        GameManager_1.gm.data.mapCell_data.sortTask(GameManager_1.gm.data.mapCell_data.barracks_unlock_data);
        this._curIndex = 0;
        var firstUnlockedIndex = -1;
        for (var index = 0; index < GameManager_1.gm.data.mapCell_data.barracks_unlock_data.length; ++index) {
            if (GameManager_1.gm.data.mapCell_data.barracks_unlock_data[index].ani_state == 0 && GameManager_1.gm.data.mapCell_data.barracks_unlock_data[index].state == 1 && firstUnlockedIndex == -1) {
                firstUnlockedIndex = index;
                this._curIndex = firstUnlockedIndex;
                break;
            }
        }
        var buildData = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.BARRACKS_TYPE];
        var buildConfigData = GameManager_1.gm.config.get_row_data("BuildConfigData", buildData.buildID.toString());
        this.hp_lbl.string = buildConfigData.hp + "";
        this.lvl_lbl.string = "Lv." + buildData.buildLvl;
        this.refreshPanel();
        this.hero_list.rotation = -this._curIndex * this.ROTATION_PER_CARD;
        this.hero_list.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.hero_list.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.hero_list.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.hero_list.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    };
    BraraclList.prototype.refreshPanel = function () {
        this._curIndex;
        var heroIdx;
        var curIndex = this._curIndex;
        for (var index = 0; index < this.heroItemList.length; index++) {
            if (this._curIndex != 0 || index != 0) {
                if (this._curIndex == this._maxHeroCount - 1) {
                    if (index == 3 || index == 2) {
                        this.heroItemList[index].active = false;
                        continue;
                    }
                }
                else if (this._curIndex == this._maxHeroCount - 2 && index == 3) {
                    this.heroItemList[index].active = false;
                    continue;
                }
                heroIdx = this._curIndex + index;
                this.heroItemList[index].zIndex = 1 == index ? 5 : 3 - index + 1;
                this.heroItemList[index].active = true;
                this.heroItemList[index].position = this._posArr[heroIdx % 24];
                this.heroItemList[index].rotation = 15 * (curIndex + index - 1);
                this.heroItemList[index].getComponent(BarracksItem_1.BarracksItem).update_view(GameManager_1.gm.data.mapCell_data.barracks_unlock_data[this._curIndex + index - 1].heroId, 1 == index, this._curIndex + index - 1);
            }
            else {
                this.heroItemList[index].active = false;
            }
        }
    };
    BraraclList.prototype.onDisable = function () {
        this.hero_list.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.hero_list.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.hero_list.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.hero_list.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    };
    BraraclList.prototype.onTouchStart = function (event) {
        if (this.hero_list.getNumberOfRunningActions() > 0) {
            this.hero_list.stopAllActions();
            this.hero_list.rotation = this._endRotation, this.checkEndPos();
        }
        this._mainbgStartRolation = this.hero_list.rotation;
        this._startX = event.touch.getLocation().x;
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_1_BARRACK_CARD_MOVE);
    };
    BraraclList.prototype.changeItemRolation = function () { };
    BraraclList.prototype.onTouchMove = function (event) {
        if (Math.abs(event.touch.getLocation().x - event.touch._startPoint.x) >= 15) {
            this.hero_list.rotation = this._mainbgStartRolation + Math.floor((event.touch.getLocation().x - event.touch._startPoint.x) / 56);
            this._endX = event.touch.getLocation().x;
            console.log(this.hero_list.rotation);
            if (this.hero_list.rotation <= this._mainbgStartRolation - this.ROTATION_PER_CARD) {
                this.hero_list.rotation = this._mainbgStartRolation - this.ROTATION_PER_CARD;
            }
            if (this.hero_list.rotation >= this._mainbgStartRolation + this.ROTATION_PER_CARD) {
                this.hero_list.rotation = this._mainbgStartRolation + this.ROTATION_PER_CARD;
            }
            this.checkEndPos();
        }
    };
    BraraclList.prototype.onTouchEnd = function (event) {
        if (!(Math.abs(event.touch.getLocation().x - event.touch._startPoint.x) < 14)) {
            if (Math.abs(this.hero_list.rotation - this._mainbgStartRolation) < 5) {
                this.setMapChangeAnma(this._mainbgStartRolation);
            }
            else if (this.hero_list.rotation < this._mainbgStartRolation) {
                this.setMapChangeAnma(this._mainbgStartRolation - this.ROTATION_PER_CARD);
            }
            else if (this.hero_list.rotation > this._mainbgStartRolation) {
                this.setMapChangeAnma(this._mainbgStartRolation + this.ROTATION_PER_CARD);
            }
            else {
                this.setMapChangeAnma(this._mainbgStartRolation);
            }
        }
    };
    BraraclList.prototype.setMapChangeAnma = function (num) {
        var _this = this;
        this.hero_list.stopAllActions();
        var positionRotation = this.hero_list.rotation > num ? -1 : 1;
        this._moveX = positionRotation;
        this._endRotation = num;
        if (this._endRotation == 0) {
            this.setCurIndex(0);
        }
        else if (this._mainbgStartRolation != num) {
            this.setCurIndex(positionRotation);
        }
        else {
            this.setCurIndex(99);
        }
        this.refreshPanel();
        this.hero_list.runAction(cc.sequence(cc.rotateTo(0.2, num + 2 * positionRotation).easing(cc.easeSineOut()), cc.rotateTo(0.21, num + -1 * positionRotation).easing(cc.easeSineOut()), cc.rotateTo(0.3, num).easing(cc.easeCubicActionOut()), cc.callFunc(function () {
            _this.hero_list.rotation = num;
            _this.checkEndPos();
        })));
    };
    BraraclList.prototype.checkEndPos = function () {
        this.hero_list.rotation = 0 < this.hero_list.rotation ? 0 : this.hero_list.rotation;
        this.hero_list.rotation = this.hero_list.rotation < -(this._maxHeroCount - 1) * this.ROTATION_PER_CARD ? -(this._maxHeroCount - 1) * this.ROTATION_PER_CARD : this.hero_list.rotation;
    };
    BraraclList.prototype.setCurIndex = function (index) {
        if (index != 0) {
            if (index != 99) {
                this._curIndex -= index;
                this._curIndex;
                this._maxHeroCount;
            }
        }
        else {
            this._curIndex = 0;
        }
    };
    BraraclList.prototype.onTouchCancel = function () {
        if (this.hero_list.rotation < 0 && this.hero_list.rotation > -(this._maxHeroCount - 1) * this.ROTATION_PER_CARD) {
            if (this._endX > this._startX) {
                this.hero_list.rotation = this._mainbgStartRolation + this.ROTATION_PER_CARD;
            }
            else {
                this._endX < this._startX && (this.hero_list.rotation = this._mainbgStartRolation - this.ROTATION_PER_CARD);
            }
        }
    };
    BraraclList.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.btn_close.node || event.target == this.btn_back.node) {
            this._animation.stop();
            this._animation.play("barracks_close");
            this._animation.on("finished", function () {
                if ("barracks_close" == _this._animation.currentClip.name) {
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.BARRACKS_LIST);
                }
            });
        }
        else {
            event.target;
            this.btn_book.node;
        }
    };
    __decorate([
        property([cc.Node])
    ], BraraclList.prototype, "heroItemList", void 0);
    __decorate([
        property(cc.Node)
    ], BraraclList.prototype, "hero_list", void 0);
    __decorate([
        property(cc.Button)
    ], BraraclList.prototype, "btn_close", void 0);
    __decorate([
        property(cc.Button)
    ], BraraclList.prototype, "btn_book", void 0);
    __decorate([
        property(cc.Button)
    ], BraraclList.prototype, "btn_back", void 0);
    __decorate([
        property(cc.Label)
    ], BraraclList.prototype, "hp_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], BraraclList.prototype, "lvl_lbl", void 0);
    BraraclList = __decorate([
        ccclass
    ], BraraclList);
    return BraraclList;
}(GameModule_1.GameModule));

cc._RF.pop();