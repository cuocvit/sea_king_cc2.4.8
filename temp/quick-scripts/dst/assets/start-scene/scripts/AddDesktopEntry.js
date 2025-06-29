
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/AddDesktopEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '18a13uE78tFtr6UixVCghRw', 'AddDesktopEntry');
// start-scene/scripts/AddDesktopEntry.ts

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
exports.AddDesktopEntry = void 0;
//
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var MainData_1 = require("./MainData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AddDesktopEntry = /** @class */ (function (_super) {
    __extends(AddDesktopEntry, _super);
    function AddDesktopEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.add_desktop_btn = null;
        _this.red_point_node = null;
        return _this;
    }
    // @
    AddDesktopEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(MainData_1.MainData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    // @
    AddDesktopEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(MainData_1.MainData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    // @
    AddDesktopEntry.prototype.update_view = function () {
        this.node.active = !GameManager_1.gm.data.main_data.is_receive_shortcut_reward;
        this.red_point_node.active = !GameManager_1.gm.data.main_data.is_receive_shortcut_reward;
    };
    // @
    AddDesktopEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target === this.add_desktop_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.AddDesktop);
        }
    };
    __decorate([
        property(cc.Button)
    ], AddDesktopEntry.prototype, "add_desktop_btn", void 0);
    __decorate([
        property(cc.Node)
    ], AddDesktopEntry.prototype, "red_point_node", void 0);
    AddDesktopEntry = __decorate([
        ccclass
    ], AddDesktopEntry);
    return AddDesktopEntry;
}(NodePoolItem_1.NodePoolItem));
exports.AddDesktopEntry = AddDesktopEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEFkZERlc2t0b3BFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsRUFBRTtBQUNGLDZDQUFtQztBQUNuQywrQ0FBOEM7QUFDOUMsdUNBQXNDO0FBRWhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThCLG1DQUFZO0lBQTFDO1FBQUEscUVBOEJDO1FBNUJXLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLG9CQUFjLEdBQVksSUFBSSxDQUFDOztJQXlCM0MsQ0FBQztJQXZCRyxJQUFJO0lBQ0ksa0NBQVEsR0FBaEI7UUFDSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLG1CQUFRLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUk7SUFDRyxtQ0FBUyxHQUFoQjtRQUNJLGdCQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxJQUFJO0lBQ0sscUNBQVcsR0FBcEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQztRQUNqRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQztJQUMvRSxDQUFDO0lBRUQsSUFBSTtJQUNJLHdEQUE4QixHQUF0QyxVQUF1QyxLQUFlO1FBQ2xELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRTtZQUM1QyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBM0JEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NERBQ3NCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkRBQ3FCO0lBTHJDLGVBQWU7UUFEcEIsT0FBTztPQUNGLGVBQWUsQ0E4QnBCO0lBQUQsc0JBQUM7Q0E5QkQsQUE4QkMsQ0E5QjZCLDJCQUFZLEdBOEJ6QztBQUVRLDBDQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9cclxuaW1wb3J0IHsgZ20gfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tIFwiLi9Ob2RlUG9vbEl0ZW1cIjtcclxuaW1wb3J0IHsgTWFpbkRhdGEgfSBmcm9tIFwiLi9NYWluRGF0YVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEFkZERlc2t0b3BFbnRyeSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBhZGRfZGVza3RvcF9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJlZF9wb2ludF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vbihNYWluRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9mZihNYWluRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSAgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9ICFnbS5kYXRhLm1haW5fZGF0YS5pc19yZWNlaXZlX3Nob3J0Y3V0X3Jld2FyZDtcclxuICAgICAgICB0aGlzLnJlZF9wb2ludF9ub2RlLmFjdGl2ZSA9ICFnbS5kYXRhLm1haW5fZGF0YS5pc19yZWNlaXZlX3Nob3J0Y3V0X3Jld2FyZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLmFkZF9kZXNrdG9wX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuQWRkRGVza3RvcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBBZGREZXNrdG9wRW50cnkgfTtcclxuIl19