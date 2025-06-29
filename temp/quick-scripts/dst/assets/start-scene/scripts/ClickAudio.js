
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ClickAudio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8dfa0DbqvJBw6i0NthvGq7A', 'ClickAudio');
// start-scene/scripts/ClickAudio.ts

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
exports.ClickAudio = void 0;
// +-+
var GameManager_1 = require("./GameManager");
var GameObject_1 = require("./GameObject");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu;
var ClickAudio = /** @class */ (function (_super) {
    __extends(ClickAudio, _super);
    function ClickAudio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClickAudio.prototype.onLoad = function () {
        this.node.on("click", this.on_button_click_handler, this);
    };
    ClickAudio.prototype.on_button_click_handler = function () {
        GameManager_1.gm.audio.play_effect("click");
    };
    ClickAudio = __decorate([
        ccclass,
        menu("添加自定义组件/ClickAudio")
    ], ClickAudio);
    return ClickAudio;
}(GameObject_1.GameObject));
exports.ClickAudio = ClickAudio;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXENsaWNrQXVkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiw2Q0FBbUM7QUFDbkMsMkNBQTBDO0FBRXBDLElBQUEsS0FBb0IsRUFBRSxDQUFDLFVBQVUsRUFBL0IsT0FBTyxhQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBSXhDO0lBQWdDLDhCQUFVO0lBQTFDOztJQVFBLENBQUM7SUFQYSwyQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLDRDQUF1QixHQUEvQjtRQUNJLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBUFEsVUFBVTtRQUZ0QixPQUFPO1FBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDO09BQ2QsVUFBVSxDQVF0QjtJQUFELGlCQUFDO0NBUkQsQUFRQyxDQVIrQix1QkFBVSxHQVF6QztBQVJZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKy0rXHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEdhbWVPYmplY3QgfSBmcm9tICcuL0dhbWVPYmplY3QnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuQG1lbnUoXCLmt7vliqDoh6rlrprkuYnnu4Tku7YvQ2xpY2tBdWRpb1wiKVxyXG5leHBvcnQgY2xhc3MgQ2xpY2tBdWRpbyBleHRlbmRzIEdhbWVPYmplY3Qge1xyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oXCJjbGlja1wiLCB0aGlzLm9uX2J1dHRvbl9jbGlja19oYW5kbGVyLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX2J1dHRvbl9jbGlja19oYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KFwiY2xpY2tcIik7XHJcbiAgICB9XHJcbn0iXX0=