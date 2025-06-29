
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GameManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8377eAyz41NpaMww16pHsbj', 'GameManager');
// start-scene/scripts/GameManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gm = exports.GameManager = void 0;
var NodePoolManager_1 = require("./NodePoolManager");
var DataManager_1 = require("./DataManager");
var GameObjectManager_1 = require("./GameObjectManager");
var Constants_1 = require("./Constants");
var AudioManager_1 = require("./AudioManager");
var UIManager_1 = require("./UIManager");
var ChannelManager_1 = require("./ChannelManager");
var ConfigManager_1 = require("./ConfigManager");
var EventScriptManager_1 = require("./EventScriptManager");
var GameManager = /** @class */ (function () {
    function GameManager() {
        this.physics = null;
        // Kiểm tra Constants trước khi gán instance
        if (Constants_1.Constants) {
            this.const = Constants_1.Constants.instance;
            this.obj = GameObjectManager_1.GameObjectManager.instance;
            this.data = DataManager_1.DataManager.instance;
            this.config = ConfigManager_1.ConfigManager.instance;
            this.pool = NodePoolManager_1.NodePoolManager.instance;
            this.audio = AudioManager_1.AudioManager.instance;
            this.ui = UIManager_1.UIManager.instance;
            this.channel = ChannelManager_1.ChannelManager.instance;
            this.newerGuideMgr = EventScriptManager_1.EventScriptManager.instance;
        }
    }
    Object.defineProperty(GameManager, "instance", {
        // Singleton Pattern để đảm bảo chỉ có một instance của GameManager
        get: function () {
            if (!this._instance) {
                this._instance = new GameManager();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    GameManager.prototype.init = function () {
        this.physics = cc.director.getPhysicsManager();
    };
    GameManager._instance = null;
    return GameManager;
}());
exports.GameManager = GameManager;
var gm = GameManager.instance;
exports.gm = gm;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdhbWVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFvRDtBQUNwRCw2Q0FBNEM7QUFDNUMseURBQXdEO0FBQ3hELHlDQUF3QztBQUN4QywrQ0FBOEM7QUFDOUMseUNBQXdDO0FBQ3hDLG1EQUFrRDtBQUNsRCxpREFBZ0Q7QUFDaEQsMkRBQTBEO0FBRTFEO0lBZUk7UUFaTyxZQUFPLEdBQTZCLElBQUksQ0FBQztRQWE1Qyw0Q0FBNEM7UUFDNUMsSUFBSSxxQkFBUyxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBUyxDQUFDLFFBQVEsQ0FBQztZQUNoQyxJQUFJLENBQUMsR0FBRyxHQUFHLHFDQUFpQixDQUFDLFFBQVEsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLHlCQUFXLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsNkJBQWEsQ0FBQyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxpQ0FBZSxDQUFDLFFBQVEsQ0FBQztZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUFZLENBQUMsUUFBUSxDQUFDO1lBQ25DLElBQUksQ0FBQyxFQUFFLEdBQUcscUJBQVMsQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRywrQkFBYyxDQUFDLFFBQVEsQ0FBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLHVDQUFrQixDQUFDLFFBQVEsQ0FBQztTQUNwRDtJQUNMLENBQUM7SUFHRCxzQkFBa0IsdUJBQVE7UUFEMUIsbUVBQW1FO2FBQ25FO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQzthQUN0QztZQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVNLDBCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBdkNjLHFCQUFTLEdBQXVCLElBQUksQ0FBQztJQXdDeEQsa0JBQUM7Q0F6Q0QsQUF5Q0MsSUFBQTtBQXpDWSxrQ0FBVztBQTJDeEIsSUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztBQUN2QixnQkFBRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vZGVQb29sTWFuYWdlciB9IGZyb20gJy4vTm9kZVBvb2xNYW5hZ2VyJztcclxuaW1wb3J0IHsgRGF0YU1hbmFnZXIgfSBmcm9tICcuL0RhdGFNYW5hZ2VyJztcclxuaW1wb3J0IHsgR2FtZU9iamVjdE1hbmFnZXIgfSBmcm9tICcuL0dhbWVPYmplY3RNYW5hZ2VyJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBBdWRpb01hbmFnZXIgfSBmcm9tICcuL0F1ZGlvTWFuYWdlcic7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gJy4vVUlNYW5hZ2VyJztcclxuaW1wb3J0IHsgQ2hhbm5lbE1hbmFnZXIgfSBmcm9tICcuL0NoYW5uZWxNYW5hZ2VyJztcclxuaW1wb3J0IHsgQ29uZmlnTWFuYWdlciB9IGZyb20gJy4vQ29uZmlnTWFuYWdlcic7XHJcbmltcG9ydCB7IEV2ZW50U2NyaXB0TWFuYWdlciB9IGZyb20gJy4vRXZlbnRTY3JpcHRNYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWVNYW5hZ2VyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHBoeXNpY3M6IGNjLlBoeXNpY3NNYW5hZ2VyIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwdWJsaWMgY29uc3Q6IENvbnN0YW50cztcclxuICAgIHB1YmxpYyBvYmo6IEdhbWVPYmplY3RNYW5hZ2VyO1xyXG4gICAgcHVibGljIGRhdGE6IERhdGFNYW5hZ2VyO1xyXG4gICAgcHVibGljIGNvbmZpZzogQ29uZmlnTWFuYWdlcjtcclxuICAgIHB1YmxpYyBwb29sOiBOb2RlUG9vbE1hbmFnZXI7XHJcbiAgICBwdWJsaWMgYXVkaW86IEF1ZGlvTWFuYWdlcjtcclxuICAgIHB1YmxpYyB1aTogVUlNYW5hZ2VyO1xyXG4gICAgcHVibGljIGNoYW5uZWw6IENoYW5uZWxNYW5hZ2VyO1xyXG4gICAgcHVibGljIG5ld2VyR3VpZGVNZ3I6IEV2ZW50U2NyaXB0TWFuYWdlcjtcclxuICAgIFxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gS2nhu4NtIHRyYSBDb25zdGFudHMgdHLGsOG7m2Mga2hpIGfDoW4gaW5zdGFuY2VcclxuICAgICAgICBpZiAoQ29uc3RhbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uc3QgPSBDb25zdGFudHMuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMub2JqID0gR2FtZU9iamVjdE1hbmFnZXIuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IERhdGFNYW5hZ2VyLmluc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZyA9IENvbmZpZ01hbmFnZXIuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMucG9vbCA9IE5vZGVQb29sTWFuYWdlci5pbnN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy5hdWRpbyA9IEF1ZGlvTWFuYWdlci5pbnN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy51aSA9IFVJTWFuYWdlci5pbnN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFubmVsID0gQ2hhbm5lbE1hbmFnZXIuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMubmV3ZXJHdWlkZU1nciA9IEV2ZW50U2NyaXB0TWFuYWdlci5pbnN0YW5jZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luZ2xldG9uIFBhdHRlcm4gxJHhu4MgxJHhuqNtIGLhuqNvIGNo4buJIGPDsyBt4buZdCBpbnN0YW5jZSBj4bunYSBHYW1lTWFuYWdlclxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogR2FtZU1hbmFnZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGh5c2ljcyA9IGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGdtID0gR2FtZU1hbmFnZXIuaW5zdGFuY2U7XHJcbmV4cG9ydCB7IGdtIH07Il19