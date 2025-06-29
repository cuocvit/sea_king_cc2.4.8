
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/add_desktop/scripts/AddDesktop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ca6721ZGMtIaKiFnif98nJ2', 'AddDesktop');
// add_desktop/scripts/AddDesktop.ts

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
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AddDesktop = /** @class */ (function (_super) {
    __extends(AddDesktop, _super);
    function AddDesktop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.add_desktop_btn = null;
        _this.left_node = null;
        _this.right_node = null;
        _this.left_lbl = null;
        _this.right_lbl = null;
        return _this;
    }
    AddDesktop.prototype.onEnable = function () {
        var self = this;
        if (this.left_node.childrenCount === 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + GameManager_1.gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID, NodePoolItem_1.NodePoolItem, function (item) {
                if (self.left_node.childrenCount === 0) {
                    self.left_node.addChild(item.node);
                }
                else {
                    GameManager_1.gm.pool.put(item.node);
                }
            });
        }
        var leftHeroData = GameManager_1.gm.config.get_row_data("HeroConfigData", GameManager_1.gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID + "");
        if (leftHeroData)
            this.left_lbl.string = leftHeroData.name;
        if (this.right_node.childrenCount === 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + GameManager_1.gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID, NodePoolItem_1.NodePoolItem, function (item) {
                if (self.right_node.childrenCount === 0) {
                    self.right_node.addChild(item.node);
                }
                else {
                    GameManager_1.gm.pool.put(item.node);
                }
            });
        }
        var rightHeroData = GameManager_1.gm.config.get_row_data("HeroConfigData", GameManager_1.gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID + "");
        if (rightHeroData)
            this.right_lbl.string = rightHeroData.name;
    };
    AddDesktop.prototype.onDisable = function () {
        GameManager_1.gm.pool.put_children(this.left_node);
        GameManager_1.gm.pool.put_children(this.right_node);
    };
    AddDesktop.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AddDesktop);
        }
        else if (event.target == this.add_desktop_btn.node) {
            GameManager_1.gm.channel.addShortcut(function () {
                if (GameManager_1.gm.data.main_data.is_receive_shortcut_reward) {
                    GameManager_1.gm.ui.show_notice("Đã nhận được phần thưởng thêm vào máy tính để bàn!");
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AddDesktop);
                }
                else {
                    GameManager_1.gm.data.main_data.is_receive_shortcut_reward = true;
                    GameManager_1.gm.data.main_data.async_write_data();
                    GameManager_1.gm.data.mapCell_data.addWareHouseList([GameManager_1.gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID, GameManager_1.gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID]);
                    GameManager_1.gm.data.mapCell_data.async_write_data();
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                        idList: [GameManager_1.gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID, GameManager_1.gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID],
                        numList: [1, 1]
                    });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AddDesktop);
                    NetUtils_1.ReportData.instance.report_once_point(10639);
                }
            });
        }
    };
    __decorate([
        property(cc.Button)
    ], AddDesktop.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], AddDesktop.prototype, "add_desktop_btn", void 0);
    __decorate([
        property(cc.Node)
    ], AddDesktop.prototype, "left_node", void 0);
    __decorate([
        property(cc.Node)
    ], AddDesktop.prototype, "right_node", void 0);
    __decorate([
        property(cc.Label)
    ], AddDesktop.prototype, "left_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], AddDesktop.prototype, "right_lbl", void 0);
    AddDesktop = __decorate([
        ccclass
    ], AddDesktop);
    return AddDesktop;
}(GameModule_1.GameModule));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYWRkX2Rlc2t0b3BcXHNjcmlwdHNcXEFkZERlc2t0b3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUVBQTJEO0FBQzNELG1FQUFrRTtBQUNsRSx1RUFBc0U7QUFDdEUsK0RBQWdFO0FBQ2hFLGlFQUFpRTtBQUczRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5Qiw4QkFBVTtJQUFuQztRQUFBLHFFQTRFQztRQTFFVyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixlQUFTLEdBQWEsSUFBSSxDQUFDOztJQTJEdkMsQ0FBQztJQXpEYSw2QkFBUSxHQUFsQjtRQUNJLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxLQUFLLENBQUMsRUFBRTtZQUNwQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEdBQUcsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsK0JBQStCLEVBQUUsMkJBQVksRUFBRSxVQUFDLElBQUk7Z0JBQ2pILElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEtBQUssQ0FBQyxFQUFFO29CQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3RDO3FCQUFNO29CQUNILGdCQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzFCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELElBQU0sWUFBWSxHQUFHLGdCQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBRSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsR0FBRyxFQUFFLENBQWUsQ0FBQztRQUMzSCxJQUFJLFlBQVk7WUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBRTNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBVSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsR0FBRyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsRUFBRSwyQkFBWSxFQUFFLFVBQUMsSUFBSTtnQkFDbEgsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsS0FBSyxDQUFDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0gsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDMUI7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBTSxhQUFhLEdBQUcsZ0JBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLGdCQUFFLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxHQUFHLEVBQUUsQ0FBZSxDQUFDO1FBQzdILElBQUksYUFBYTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFFbEUsQ0FBQztJQUVTLDhCQUFTLEdBQW5CO1FBQ0ksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFUyxtREFBOEIsR0FBeEMsVUFBeUMsS0FBZTtRQUNwRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDckMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUU7WUFDbEQsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQUNuQixJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsRUFBRTtvQkFDOUMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7b0JBQ3hFLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNoRDtxQkFBTTtvQkFDSCxnQkFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO29CQUNwRCxnQkFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDckMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsK0JBQStCLEVBQUUsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO29CQUM3SCxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7d0JBQzVDLE1BQU0sRUFBRSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLCtCQUErQixFQUFFLGdCQUFFLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDO3dCQUM3RixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNsQixDQUFDLENBQUM7b0JBQ0gsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzlDLGdCQUFFLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM3QyxxQkFBVSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEQ7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQXpFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNnQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNzQjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNnQjtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNpQjtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNlO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ2dCO0lBakJqQyxVQUFVO1FBRGYsT0FBTztPQUNGLFVBQVUsQ0E0RWY7SUFBRCxpQkFBQztDQTVFRCxBQTRFQyxDQTVFd0IsdUJBQVUsR0E0RWxDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1vZHVsZSc7XHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTm9kZVBvb2xJdGVtJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBIZXJvQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvaGVybyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgQWRkRGVza3RvcCBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgY2xvc2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGFkZF9kZXNrdG9wX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbGVmdF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcmlnaHRfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsZWZ0X2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgcmlnaHRfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmxlZnRfbm9kZS5jaGlsZHJlbkNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQ09NTU9OLCBcInByZWZhYnMvbW9kZWwvXCIgKyBnbS5jb25zdC5BRERfREVTS1RPUF9SRVdBUkRfTEVGVF9IRVJPX0lELCBOb2RlUG9vbEl0ZW0sIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5sZWZ0X25vZGUuY2hpbGRyZW5Db3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGVmdF9ub2RlLmFkZENoaWxkKGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsZWZ0SGVyb0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSGVyb0NvbmZpZ0RhdGFcIiwgZ20uY29uc3QuQUREX0RFU0tUT1BfUkVXQVJEX0xFRlRfSEVST19JRCArIFwiXCIpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgaWYgKGxlZnRIZXJvRGF0YSkgdGhpcy5sZWZ0X2xibC5zdHJpbmcgPSBsZWZ0SGVyb0RhdGEubmFtZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmlnaHRfbm9kZS5jaGlsZHJlbkNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQ09NTU9OLCBcInByZWZhYnMvbW9kZWwvXCIgKyBnbS5jb25zdC5BRERfREVTS1RPUF9SRVdBUkRfUklHSFRfSEVST19JRCwgTm9kZVBvb2xJdGVtLCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYucmlnaHRfbm9kZS5jaGlsZHJlbkNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yaWdodF9ub2RlLmFkZENoaWxkKGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByaWdodEhlcm9EYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkhlcm9Db25maWdEYXRhXCIsIGdtLmNvbnN0LkFERF9ERVNLVE9QX1JFV0FSRF9SSUdIVF9IRVJPX0lEICsgXCJcIikgYXMgSGVyb0NvbmZpZztcclxuICAgICAgICBpZiAocmlnaHRIZXJvRGF0YSkgdGhpcy5yaWdodF9sYmwuc3RyaW5nID0gcmlnaHRIZXJvRGF0YS5uYW1lO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMubGVmdF9ub2RlKTtcclxuICAgICAgICBnbS5wb29sLnB1dF9jaGlsZHJlbih0aGlzLnJpZ2h0X25vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLmNsb3NlX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkFkZERlc2t0b3ApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuYWRkX2Rlc2t0b3BfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5hZGRTaG9ydGN1dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYWluX2RhdGEuaXNfcmVjZWl2ZV9zaG9ydGN1dF9yZXdhcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIsSQw6Mgbmjhuq1uIMSRxrDhu6NjIHBo4bqnbiB0aMaw4bufbmcgdGjDqm0gdsOgbyBtw6F5IHTDrW5oIMSR4buDIGLDoG4hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkFkZERlc2t0b3ApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1haW5fZGF0YS5pc19yZWNlaXZlX3Nob3J0Y3V0X3Jld2FyZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYWluX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFdhcmVIb3VzZUxpc3QoW2dtLmNvbnN0LkFERF9ERVNLVE9QX1JFV0FSRF9MRUZUX0hFUk9fSUQsIGdtLmNvbnN0LkFERF9ERVNLVE9QX1JFV0FSRF9SSUdIVF9IRVJPX0lEXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRSRVdBUkRPUC5rZXksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRMaXN0OiBbZ20uY29uc3QuQUREX0RFU0tUT1BfUkVXQVJEX0xFRlRfSEVST19JRCwgZ20uY29uc3QuQUREX0RFU0tUT1BfUkVXQVJEX1JJR0hUX0hFUk9fSURdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1MaXN0OiBbMSwgMV1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5HRVRSRVdBUkRPUCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuQWRkRGVza3RvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDYzOSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==