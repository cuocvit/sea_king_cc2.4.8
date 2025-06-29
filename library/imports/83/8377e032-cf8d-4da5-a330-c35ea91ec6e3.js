"use strict";
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