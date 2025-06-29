"use strict";
cc._RF.push(module, 'e7828C03EZKPrvD2K55cmmL', 'Notice');
// start-scene/scripts/Notice.ts

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
exports.Notice = void 0;
// +-+
var GameManager_1 = require("./GameManager");
var NoticeItem_1 = require("./NoticeItem");
var GameModule_1 = require("./GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Notice = /** @class */ (function (_super) {
    __extends(Notice, _super);
    function Notice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.notice_item_prefab = null;
        _this.window_node = null;
        return _this;
    }
    Notice.prototype.onLoad = function () {
        GameManager_1.gm.pool.init(GameManager_1.gm.const.NoticeItem.bundle_name, GameManager_1.gm.const.NoticeItem.load_url, NoticeItem_1.NoticeItem);
    };
    Notice.prototype.show_notice = function (data) {
        var _this = this;
        GameManager_1.gm.pool.async_get(GameManager_1.gm.const.NoticeItem.bundle_name, GameManager_1.gm.const.NoticeItem.load_url, NoticeItem_1.NoticeItem, function (item) {
            if (!item)
                return;
            _this.window_node.addChild(item.node);
            var notItem = item;
            notItem.data = data;
        });
    };
    __decorate([
        property(cc.Prefab)
    ], Notice.prototype, "notice_item_prefab", void 0);
    __decorate([
        property(cc.Node)
    ], Notice.prototype, "window_node", void 0);
    Notice = __decorate([
        ccclass
    ], Notice);
    return Notice;
}(GameModule_1.GameModule));
exports.Notice = Notice;

cc._RF.pop();