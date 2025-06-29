
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/login/scripts/Login.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '19b05uz0pxFDrDwNcD29ik4', 'Login');
// login/scripts/Login.ts

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
exports.Login = void 0;
// qg ??????
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var Constants_1 = require("../../start-scene/scripts/Constants");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nickname = null;
        _this.password = null;
        _this.login = null;
        _this.creat = null;
        _this.error = null;
        return _this;
    }
    Login.prototype.Login = function () {
        this.error.string = "";
        console.log(this.nickname.string, this.password.string);
        if (this.nickname.string == "") {
            this.error.string = "Chưa nhập tài khoản";
        }
        else if (this.password.string == "") {
            this.error.string = "Chưa nhập mật khẩu";
        }
        else {
            GameManager_1.gm.ui.Login = true;
            cc.director.loadScene("game");
        }
    };
    // @property(cc.Label)
    // private prompt_lbl: cc.Label | null = null;
    // @property(cc.ProgressBar)
    // private bar_node: cc.ProgressBar | null = null;
    // @property(cc.ProgressBar)
    // private bar_node_2: cc.ProgressBar | null = null;
    // @property(cc.Node)
    // private start_node: cc.Node | null = null;
    // @property(cc.Node)
    // private start_full_node: cc.Node | null = null;
    // @property(cc.Node)
    // private caves_node: cc.Node | null = null;
    // @property(cc.Node)
    // private reward_node: cc.Node | null = null;
    // @property(cc.Node)
    // private boat_node: cc.Node | null = null;
    // @property(cc.Animation)
    // private boat_anim: cc.Animation | null = null;
    // @property([cc.Node])
    // private hero_node_array: cc.Node[] = [];
    // @property(cc.Sprite)
    // private people_spr: cc.Sprite | null = null;
    // @property(cc.Sprite)
    // private people_text_spr: cc.Sprite | null = null;
    // private _low_speed: number = 20;
    // private _low_speed_2: number = 100;
    // private _total_len: number = 0;
    // private _total_len_2: number = 0;
    // private _high_speed: number = 500;
    // private _count: number = 0;
    // private _state: LoadingState;
    // private _last_state: LoadingState;
    // get state(): LoadingState {
    //     return this._state;
    // }
    // set state(value: LoadingState) {
    //     if (this._state != value) {
    //         this._last_state = this._state;
    //         this._state = value;
    //         if (this._state !== LoadingState.COMPLETE) {
    //             this.start_load();
    //         } else if (this._state === LoadingState.COMPLETE) {
    //             this.complete_load();
    //         }
    //     }
    // }
    Login.prototype.update = function (deltaTime) {
        // if (this._state == LoadingState.COMPLETE) {
        //     this._total_len += deltaTime * this._high_speed;
        //     this._total_len_2 += deltaTime * this._high_speed;
        //     this.bar_node!.progress = Math.floor(this._total_len) / 100;
        //     this.bar_node_2!.progress = (this._total_len_2 % 100) / 100;
        //     if (this._total_len >= 100) {
        //         this.node.active = false;
        //     }
        //     if (cc.sys.platform == cc.sys.OPPO_GAME) {
        //         qg.setLoadingProgress({ progress: this._total_len });
        //     }
        // } else {
        //     if (this._total_len < 90) {
        //         this._total_len += deltaTime * this._low_speed;
        //         this.bar_node!.progress = Math.floor(this._total_len) / 100;
        //     }
        //     this._total_len_2 += deltaTime * this._low_speed_2;
        //     this.bar_node_2!.progress = (this._total_len_2 % 100) / 100;
        // }
    };
    Login.prototype.start_load = function () {
        // this.node.active = true;
        // this.start_node!.active = this._state == LoadingState.START;
        // this.start_full_node!.active = this._state == LoadingState.START_FULL;
        // this.caves_node!.active = this._state == LoadingState.CAVES_FULL;
        // this.reward_node!.active = this._state == LoadingState.REWARD_FULL;
        // this.boat_node!.active =
        //     this._state == LoadingState.BOAT_IN ||
        //     this._state == LoadingState.BOAT_OUT;
        // if (this._state == LoadingState.BOAT_IN) {
        //     this.people_spr!.node.active = false;
        //     this.people_text_spr!.node.active = false;
        // } else if (this._state == LoadingState.BOAT_OUT) {
        //     const t: number = (this._count % 2) + 1;
        //     this.people_spr!.node.active = true;
        //     this.people_text_spr!.node.active = true;
        //     Utils.async_set_sprite_frame(
        //         this.people_spr!,
        //         BundleName.LOADING,
        //         `res/people_${t}`
        //     );
        //     Utils.async_set_sprite_frame(
        //         this.people_text_spr!,
        //         BundleName.LOADING,
        //         `res/people_text_${t}`
        //     );
        //     this._count++;
        // }
        // this._total_len = 0;
        // this._total_len_2 = 0;
        // if (this._state == LoadingState.BOAT_IN) {
        //     this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
        //         this.boat_anim!.play("loding_ship_innormal");
        //     });
        //     this.boat_anim!.play("loding_ship_inopen");
        //     const aliveHeroDataArray =
        //         gm.data.fight_temp_data.fight_result_data.alive_hero_data_array;
        //     for (let i = 0; i < this.hero_node_array.length; i++) {
        //         const heroData = aliveHeroDataArray[i];
        //         const heroNode = this.hero_node_array[i];
        //         this.load_hero_model(
        //             heroNode,
        //             heroData ? heroData.id : 0,
        //             i,
        //             aliveHeroDataArray.length
        //         );
        //     }
        // } else if (this._state == LoadingState.BOAT_OUT) {
        //     this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
        //         this.boat_anim!.play("loding_ship_outnormal");
        //     });
        //     this.boat_anim!.play("loding_ship_outopen");
        //     const battleHeroArray = gm.data.fight_temp_data.battle_hero_array;
        //     for (let i = 0; i < this.hero_node_array.length; i++) {
        //         const heroData = battleHeroArray[i];
        //         const heroNode = this.hero_node_array[i];
        //         this.load_hero_model(
        //             heroNode,
        //             heroData ? heroData.itemID : 0,
        //             i,
        //             battleHeroArray.length
        //         );
        //     }
        // }
    };
    Login.prototype.load_hero_model = function (heroNode, heroId, index, total) {
        if (heroId > 0) {
            if (heroNode.childrenCount == 0) {
                if (index < total) {
                    heroNode.active = true;
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + heroId, NodePoolItem_1.NodePoolItem, function (item) {
                        if (!item)
                            return;
                        if (heroNode.childrenCount == 0) {
                            heroNode.addChild(item.node);
                            var skeleton = item.getComponent(sp.Skeleton);
                            if (skeleton) {
                                skeleton.setSkin("front");
                                skeleton.setAnimation(0, "stay", true);
                            }
                        }
                        else {
                            GameManager_1.gm.pool.put(item.node);
                        }
                    });
                }
            }
            else {
                heroNode.active = false;
                GameManager_1.gm.pool.put_children(heroNode);
            }
        }
    };
    Login.prototype.complete_load = function () {
        // if (this._last_state == LoadingState.BOAT_IN) {
        //     this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
        //         this.do_complete_load();
        //     });
        //     this.boat_anim!.play("loding_ship_inclose");
        // } else if (this._last_state == LoadingState.BOAT_OUT) {
        //     this.boat_anim!.once(cc.Animation.EventType.FINISHED, () => {
        //         this.do_complete_load();
        //     });
        //     this.boat_anim!.play("loding_ship_outclose");
        // } else {
        //     this.do_complete_load();
        // }
    };
    Login.prototype.do_complete_load = function () {
        // for (let i = 0; i < this.hero_node_array.length; i++) {
        //     const heroNode = this.hero_node_array[i];
        //     heroNode.active = false;
        //     gm.pool.put_children(heroNode);
        // }
        // this.start_node!.active = false;
        // this.start_full_node!.active = false;
        // this.caves_node!.active = false;
        // this.reward_node!.active = false;
        // this.boat_node!.active = false;
        // this.node.active = false;
    };
    Login.prototype.onDisable = function () {
        // this.start_node!.active = false;
        // this.start_full_node!.active = false;
        // this.caves_node!.active = false;
        // this.reward_node!.active = false;
        // this.boat_node!.active = false;
        // if (cc.sys.platform == cc.sys.OPPO_GAME) {
        //     qg.loadingComplete({});
        // }
    };
    __decorate([
        property(cc.EditBox)
    ], Login.prototype, "nickname", void 0);
    __decorate([
        property(cc.EditBox)
    ], Login.prototype, "password", void 0);
    __decorate([
        property(cc.Button)
    ], Login.prototype, "login", void 0);
    __decorate([
        property(cc.Button)
    ], Login.prototype, "creat", void 0);
    __decorate([
        property(cc.Label)
    ], Login.prototype, "error", void 0);
    Login = __decorate([
        ccclass
    ], Login);
    return Login;
}(GameModule_1.GameModule));
exports.Login = Login;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbG9naW5cXHNjcmlwdHNcXExvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxZQUFZO0FBQ1osbUVBQWtFO0FBQ2xFLGlFQUFpRTtBQUNqRSx1RUFBc0U7QUFFdEUscUVBQTJEO0FBR3JELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW9CLHlCQUFVO0lBQTlCO1FBQUEscUVBOFBDO1FBNVBHLGNBQVEsR0FBZSxJQUFJLENBQUM7UUFHNUIsY0FBUSxHQUFlLElBQUksQ0FBQztRQUc1QixXQUFLLEdBQWMsSUFBSSxDQUFDO1FBR3hCLFdBQUssR0FBYyxJQUFJLENBQUM7UUFHeEIsV0FBSyxHQUFhLElBQUksQ0FBQzs7SUFnUDNCLENBQUM7SUE5T1UscUJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUM7U0FDN0M7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztTQUM1QzthQUFNO1lBRUgsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNuQixFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQztJ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QixJQUFJO0lBQ1IsQ0FBQztJQUVPLGdDQUFnQixHQUF4QjtRQUNJLDBEQUEwRDtRQUMxRCxnREFBZ0Q7UUFDaEQsK0JBQStCO1FBQy9CLHNDQUFzQztRQUN0QyxJQUFJO1FBQ0osbUNBQW1DO1FBQ25DLHdDQUF3QztRQUN4QyxtQ0FBbUM7UUFDbkMsb0NBQW9DO1FBQ3BDLGtDQUFrQztRQUNsQyw0QkFBNEI7SUFDaEMsQ0FBQztJQUVTLHlCQUFTLEdBQW5CO1FBQ0ksbUNBQW1DO1FBQ25DLHdDQUF3QztRQUN4QyxtQ0FBbUM7UUFDbkMsb0NBQW9DO1FBQ3BDLGtDQUFrQztRQUNsQyw2Q0FBNkM7UUFDN0MsOEJBQThCO1FBQzlCLElBQUk7SUFDUixDQUFDO0lBM1BEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7MkNBQ087SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzsyQ0FDTztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dDQUNJO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0NBQ0k7SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3Q0FDSTtJQWRyQixLQUFLO1FBRFYsT0FBTztPQUNGLEtBQUssQ0E4UFY7SUFBRCxZQUFDO0NBOVBELEFBOFBDLENBOVBtQix1QkFBVSxHQThQN0I7QUFFUSxzQkFBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHFnID8/Pz8/P1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1vZHVsZVwiO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSBcIi4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL05vZGVQb29sSXRlbVwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzXCI7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSBcIi4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTG9hZGluZ1N0YXRlIH0gZnJvbSBcIi4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGF1bmNoXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTG9naW4gZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxyXG4gICAgbmlja25hbWU6IGNjLkVkaXRCb3ggPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxyXG4gICAgcGFzc3dvcmQ6IGNjLkVkaXRCb3ggPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBsb2dpbjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgY3JlYXQ6IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgZXJyb3I6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgTG9naW4oKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvci5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmlja25hbWUuc3RyaW5nLCB0aGlzLnBhc3N3b3JkLnN0cmluZyk7XHJcbiAgICAgICAgaWYgKHRoaXMubmlja25hbWUuc3RyaW5nID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvci5zdHJpbmcgPSBcIkNoxrBhIG5o4bqtcCB0w6BpIGtob+G6o25cIjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFzc3dvcmQuc3RyaW5nID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvci5zdHJpbmcgPSBcIkNoxrBhIG5o4bqtcCBt4bqtdCBraOG6qXVcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZ20udWkuTG9naW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIC8vIHByaXZhdGUgcHJvbXB0X2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICAvLyBwcml2YXRlIGJhcl9ub2RlOiBjYy5Qcm9ncmVzc0JhciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcclxuICAgIC8vIHByaXZhdGUgYmFyX25vZGVfMjogY2MuUHJvZ3Jlc3NCYXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIC8vIHByaXZhdGUgc3RhcnRfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgLy8gcHJpdmF0ZSBzdGFydF9mdWxsX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIC8vIHByaXZhdGUgY2F2ZXNfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgLy8gcHJpdmF0ZSByZXdhcmRfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgLy8gcHJpdmF0ZSBib2F0X25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuQW5pbWF0aW9uKVxyXG4gICAgLy8gcHJpdmF0ZSBib2F0X2FuaW06IGNjLkFuaW1hdGlvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICAvLyBwcml2YXRlIGhlcm9fbm9kZV9hcnJheTogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIC8vIHByaXZhdGUgcGVvcGxlX3NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIC8vIHByaXZhdGUgcGVvcGxlX3RleHRfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAvLyBwcml2YXRlIF9sb3dfc3BlZWQ6IG51bWJlciA9IDIwO1xyXG4gICAgLy8gcHJpdmF0ZSBfbG93X3NwZWVkXzI6IG51bWJlciA9IDEwMDtcclxuICAgIC8vIHByaXZhdGUgX3RvdGFsX2xlbjogbnVtYmVyID0gMDtcclxuICAgIC8vIHByaXZhdGUgX3RvdGFsX2xlbl8yOiBudW1iZXIgPSAwO1xyXG4gICAgLy8gcHJpdmF0ZSBfaGlnaF9zcGVlZDogbnVtYmVyID0gNTAwO1xyXG4gICAgLy8gcHJpdmF0ZSBfY291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAvLyBwcml2YXRlIF9zdGF0ZTogTG9hZGluZ1N0YXRlO1xyXG4gICAgLy8gcHJpdmF0ZSBfbGFzdF9zdGF0ZTogTG9hZGluZ1N0YXRlO1xyXG5cclxuICAgIC8vIGdldCBzdGF0ZSgpOiBMb2FkaW5nU3RhdGUge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzZXQgc3RhdGUodmFsdWU6IExvYWRpbmdTdGF0ZSkge1xyXG4gICAgLy8gICAgIGlmICh0aGlzLl9zdGF0ZSAhPSB2YWx1ZSkge1xyXG4gICAgLy8gICAgICAgICB0aGlzLl9sYXN0X3N0YXRlID0gdGhpcy5fc3RhdGU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuX3N0YXRlID0gdmFsdWU7XHJcbiAgICAvLyAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSAhPT0gTG9hZGluZ1N0YXRlLkNPTVBMRVRFKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnN0YXJ0X2xvYWQoKTtcclxuICAgIC8vICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zdGF0ZSA9PT0gTG9hZGluZ1N0YXRlLkNPTVBMRVRFKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlX2xvYWQoKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3N0YXRlID09IExvYWRpbmdTdGF0ZS5DT01QTEVURSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLl90b3RhbF9sZW4gKz0gZGVsdGFUaW1lICogdGhpcy5faGlnaF9zcGVlZDtcclxuICAgICAgICAvLyAgICAgdGhpcy5fdG90YWxfbGVuXzIgKz0gZGVsdGFUaW1lICogdGhpcy5faGlnaF9zcGVlZDtcclxuICAgICAgICAvLyAgICAgdGhpcy5iYXJfbm9kZSEucHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHRoaXMuX3RvdGFsX2xlbikgLyAxMDA7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYmFyX25vZGVfMiEucHJvZ3Jlc3MgPSAodGhpcy5fdG90YWxfbGVuXzIgJSAxMDApIC8gMTAwO1xyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5fdG90YWxfbGVuID49IDEwMCkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLk9QUE9fR0FNRSkge1xyXG4gICAgICAgIC8vICAgICAgICAgcWcuc2V0TG9hZGluZ1Byb2dyZXNzKHsgcHJvZ3Jlc3M6IHRoaXMuX3RvdGFsX2xlbiB9KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLl90b3RhbF9sZW4gPCA5MCkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fdG90YWxfbGVuICs9IGRlbHRhVGltZSAqIHRoaXMuX2xvd19zcGVlZDtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuYmFyX25vZGUhLnByb2dyZXNzID0gTWF0aC5mbG9vcih0aGlzLl90b3RhbF9sZW4pIC8gMTAwO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX3RvdGFsX2xlbl8yICs9IGRlbHRhVGltZSAqIHRoaXMuX2xvd19zcGVlZF8yO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmJhcl9ub2RlXzIhLnByb2dyZXNzID0gKHRoaXMuX3RvdGFsX2xlbl8yICUgMTAwKSAvIDEwMDtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydF9sb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuc3RhcnRfbm9kZSEuYWN0aXZlID0gdGhpcy5fc3RhdGUgPT0gTG9hZGluZ1N0YXRlLlNUQVJUO1xyXG4gICAgICAgIC8vIHRoaXMuc3RhcnRfZnVsbF9ub2RlIS5hY3RpdmUgPSB0aGlzLl9zdGF0ZSA9PSBMb2FkaW5nU3RhdGUuU1RBUlRfRlVMTDtcclxuICAgICAgICAvLyB0aGlzLmNhdmVzX25vZGUhLmFjdGl2ZSA9IHRoaXMuX3N0YXRlID09IExvYWRpbmdTdGF0ZS5DQVZFU19GVUxMO1xyXG4gICAgICAgIC8vIHRoaXMucmV3YXJkX25vZGUhLmFjdGl2ZSA9IHRoaXMuX3N0YXRlID09IExvYWRpbmdTdGF0ZS5SRVdBUkRfRlVMTDtcclxuICAgICAgICAvLyB0aGlzLmJvYXRfbm9kZSEuYWN0aXZlID1cclxuICAgICAgICAvLyAgICAgdGhpcy5fc3RhdGUgPT0gTG9hZGluZ1N0YXRlLkJPQVRfSU4gfHxcclxuICAgICAgICAvLyAgICAgdGhpcy5fc3RhdGUgPT0gTG9hZGluZ1N0YXRlLkJPQVRfT1VUO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLl9zdGF0ZSA9PSBMb2FkaW5nU3RhdGUuQk9BVF9JTikge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnBlb3BsZV9zcHIhLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucGVvcGxlX3RleHRfc3ByIS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH0gZWxzZSBpZiAodGhpcy5fc3RhdGUgPT0gTG9hZGluZ1N0YXRlLkJPQVRfT1VUKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHQ6IG51bWJlciA9ICh0aGlzLl9jb3VudCAlIDIpICsgMTtcclxuICAgICAgICAvLyAgICAgdGhpcy5wZW9wbGVfc3ByIS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucGVvcGxlX3RleHRfc3ByIS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUoXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnBlb3BsZV9zcHIhLFxyXG4gICAgICAgIC8vICAgICAgICAgQnVuZGxlTmFtZS5MT0FESU5HLFxyXG4gICAgICAgIC8vICAgICAgICAgYHJlcy9wZW9wbGVfJHt0fWBcclxuICAgICAgICAvLyAgICAgKTtcclxuICAgICAgICAvLyAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZShcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucGVvcGxlX3RleHRfc3ByISxcclxuICAgICAgICAvLyAgICAgICAgIEJ1bmRsZU5hbWUuTE9BRElORyxcclxuICAgICAgICAvLyAgICAgICAgIGByZXMvcGVvcGxlX3RleHRfJHt0fWBcclxuICAgICAgICAvLyAgICAgKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fY291bnQrKztcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5fdG90YWxfbGVuID0gMDtcclxuICAgICAgICAvLyB0aGlzLl90b3RhbF9sZW5fMiA9IDA7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX3N0YXRlID09IExvYWRpbmdTdGF0ZS5CT0FUX0lOKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYm9hdF9hbmltIS5vbmNlKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsICgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuYm9hdF9hbmltIS5wbGF5KFwibG9kaW5nX3NoaXBfaW5ub3JtYWxcIik7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmJvYXRfYW5pbSEucGxheShcImxvZGluZ19zaGlwX2lub3BlblwiKTtcclxuICAgICAgICAvLyAgICAgY29uc3QgYWxpdmVIZXJvRGF0YUFycmF5ID1cclxuICAgICAgICAvLyAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmZpZ2h0X3Jlc3VsdF9kYXRhLmFsaXZlX2hlcm9fZGF0YV9hcnJheTtcclxuICAgICAgICAvLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhlcm9fbm9kZV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBhbGl2ZUhlcm9EYXRhQXJyYXlbaV07XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBoZXJvTm9kZSA9IHRoaXMuaGVyb19ub2RlX2FycmF5W2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5sb2FkX2hlcm9fbW9kZWwoXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb05vZGUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaGVyb0RhdGEgPyBoZXJvRGF0YS5pZCA6IDAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaSxcclxuICAgICAgICAvLyAgICAgICAgICAgICBhbGl2ZUhlcm9EYXRhQXJyYXkubGVuZ3RoXHJcbiAgICAgICAgLy8gICAgICAgICApO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLl9zdGF0ZSA9PSBMb2FkaW5nU3RhdGUuQk9BVF9PVVQpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5ib2F0X2FuaW0hLm9uY2UoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ib2F0X2FuaW0hLnBsYXkoXCJsb2Rpbmdfc2hpcF9vdXRub3JtYWxcIik7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmJvYXRfYW5pbSEucGxheShcImxvZGluZ19zaGlwX291dG9wZW5cIik7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGJhdHRsZUhlcm9BcnJheSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJhdHRsZV9oZXJvX2FycmF5O1xyXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGVyb19ub2RlX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBoZXJvRGF0YSA9IGJhdHRsZUhlcm9BcnJheVtpXTtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnN0IGhlcm9Ob2RlID0gdGhpcy5oZXJvX25vZGVfYXJyYXlbaV07XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmxvYWRfaGVyb19tb2RlbChcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZXJvTm9kZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICBoZXJvRGF0YSA/IGhlcm9EYXRhLml0ZW1JRCA6IDAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaSxcclxuICAgICAgICAvLyAgICAgICAgICAgICBiYXR0bGVIZXJvQXJyYXkubGVuZ3RoXHJcbiAgICAgICAgLy8gICAgICAgICApO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZF9oZXJvX21vZGVsKFxyXG4gICAgICAgIGhlcm9Ob2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIGhlcm9JZDogbnVtYmVyLFxyXG4gICAgICAgIGluZGV4OiBudW1iZXIsXHJcbiAgICAgICAgdG90YWw6IG51bWJlclxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGhlcm9JZCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGhlcm9Ob2RlLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgdG90YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCdW5kbGVOYW1lLkNPTU1PTixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYHByZWZhYnMvbW9kZWwvJHtoZXJvSWR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTm9kZVBvb2xJdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb05vZGUuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb05vZGUuYWRkQ2hpbGQoaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBza2VsZXRvbiA9IGl0ZW0uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tlbGV0b24uc2V0U2tpbihcImZyb250XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2VsZXRvbi5zZXRBbmltYXRpb24oMCwgXCJzdGF5XCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoZXJvTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKGhlcm9Ob2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbXBsZXRlX2xvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuX2xhc3Rfc3RhdGUgPT0gTG9hZGluZ1N0YXRlLkJPQVRfSU4pIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5ib2F0X2FuaW0hLm9uY2UoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5kb19jb21wbGV0ZV9sb2FkKCk7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmJvYXRfYW5pbSEucGxheShcImxvZGluZ19zaGlwX2luY2xvc2VcIik7XHJcbiAgICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLl9sYXN0X3N0YXRlID09IExvYWRpbmdTdGF0ZS5CT0FUX09VVCkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmJvYXRfYW5pbSEub25jZShjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmRvX2NvbXBsZXRlX2xvYWQoKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYm9hdF9hbmltIS5wbGF5KFwibG9kaW5nX3NoaXBfb3V0Y2xvc2VcIik7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5kb19jb21wbGV0ZV9sb2FkKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZG9fY29tcGxldGVfbG9hZCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGVyb19ub2RlX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGhlcm9Ob2RlID0gdGhpcy5oZXJvX25vZGVfYXJyYXlbaV07XHJcbiAgICAgICAgLy8gICAgIGhlcm9Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICBnbS5wb29sLnB1dF9jaGlsZHJlbihoZXJvTm9kZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMuc3RhcnRfbm9kZSEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5zdGFydF9mdWxsX25vZGUhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuY2F2ZXNfbm9kZSEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5yZXdhcmRfbm9kZSEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5ib2F0X25vZGUhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRoaXMuc3RhcnRfbm9kZSEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5zdGFydF9mdWxsX25vZGUhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuY2F2ZXNfbm9kZSEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5yZXdhcmRfbm9kZSEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5ib2F0X25vZGUhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLk9QUE9fR0FNRSkge1xyXG4gICAgICAgIC8vICAgICBxZy5sb2FkaW5nQ29tcGxldGUoe30pO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgTG9naW4gfTtcclxuIl19