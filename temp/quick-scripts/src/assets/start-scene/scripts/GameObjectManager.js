"use strict";
cc._RF.push(module, '80ddeM5f3pBzZjKo52xhMEo', 'GameObjectManager');
// start-scene/scripts/GameObjectManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObjectManager = void 0;
var GameObjectManager = /** @class */ (function () {
    function GameObjectManager() {
        this._object_list = {};
    }
    Object.defineProperty(GameObjectManager, "instance", {
        get: function () {
            this._instance || (this._instance = new GameObjectManager());
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameObjectManager, "unique_id", {
        get: function () {
            return this._unique_id++;
        },
        enumerable: false,
        configurable: true
    });
    GameObjectManager.prototype.add = function (gObj) {
        if (gObj != null) {
            var className = cc.js.getClassName(gObj);
            var entry = this._object_list[className];
            if (!entry) {
                entry = { map: {}, count: 0 };
                this._object_list[className] = entry;
            }
            entry.map[gObj.__unique_id] = gObj;
            entry.count++;
        }
    };
    GameObjectManager.prototype.remove = function (gObj) {
        if (gObj != null) {
            var className = cc.js.getClassName(gObj);
            var entry = this._object_list[className];
            if (entry) {
                var object = entry.map[gObj.__unique_id];
                if (object) {
                    object.__destroy_time = Date.now();
                    delete entry.map[gObj.__unique_id];
                    entry.count--;
                }
            }
        }
    };
    GameObjectManager.prototype.count = function (gObj) {
        if (gObj == null) {
            return 0;
        }
        var className = cc.js.getClassName(gObj);
        var entry = this._object_list[className];
        return entry ? entry.count : 0;
    };
    GameObjectManager.prototype.info = function () {
        var totalCount = 0;
        var log = "%c\n============== Game Object Info ==================";
        for (var className in this._object_list) {
            var entry = this._object_list[className];
            totalCount += entry.count;
            log += "\n" + className + " count is " + entry.count;
        }
        log += "\n\nTotal count is " + totalCount;
        log += "\n\n============== Game Object Info ==================\n";
        console.log(log, "font-weight:bold;");
    };
    GameObjectManager._instance = null;
    GameObjectManager._unique_id = 0;
    return GameObjectManager;
}());
exports.GameObjectManager = GameObjectManager;

cc._RF.pop();