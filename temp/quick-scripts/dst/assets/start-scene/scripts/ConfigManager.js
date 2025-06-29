
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ConfigManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'adc57P4msZBvrEUaM0mk3+5', 'ConfigManager');
// start-scene/scripts/ConfigManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = exports.Config = void 0;
// @@
var ConstantsData_1 = require("./ConstantsData");
var CsvReader_1 = require("./CsvReader");
var Config = /** @class */ (function () {
    function Config() {
        this.head = [];
        this.data_set = {};
        this.primary_key_array = [];
    }
    return Config;
}());
exports.Config = Config;
// @@ !!! type of cases
var ConfigManager = /** @class */ (function () {
    function ConfigManager() {
        // @@
        this.BUNDLE_NAME = "common";
        this._config = {};
        this._init_state = 0;
    }
    Object.defineProperty(ConfigManager, "instance", {
        // @@
        get: function () {
            if (!this._instance)
                this._instance = new ConfigManager();
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    // @@
    ConfigManager.prototype.async_init = function (callback) {
        var _this = this;
        if (this._init_state > 0)
            return;
        this._init_state = 1;
        this.async_get_bundle(this.BUNDLE_NAME, function (loadedBundle) {
            loadedBundle.load(ConfigManager.constants_url, cc.TextAsset, function (error, loadedTextAsset) {
                if (error) {
                    cc.error("AssetManager.Bundle: load [" + _this.BUNDLE_NAME + "/" + ConfigManager.constants_url + "] assets failed,", error.message);
                    return;
                }
                // console.log("ConfigManager->async_ini: loadedTextAsset:", loadedTextAsset);
                _this.parse_config(ConfigManager.constants_name, loadedTextAsset.text);
                _this.parse_constants_config();
                //
                _this.async_get_bundle(_this.BUNDLE_NAME, function (loadedBundle) {
                    loadedBundle.load(ConfigManager.config_list_url, cc.TextAsset, function (error, loadedTextAsset) {
                        if (error) {
                            cc.error("AssetManager.Bundle: load [" + _this.BUNDLE_NAME + "/" + ConfigManager.config_list_url + "] assets failed,", error.message);
                            return;
                        }
                        // console.log("ConfigManager->async_ini: config_list_url:", loadedTextAsset);
                        _this.parse_config(ConfigManager.config_list_name, loadedTextAsset.text);
                        _this._init_state = 2;
                        if (typeof callback === "function")
                            callback();
                    });
                });
            });
        });
    }; // end: async_init
    // @@
    ConfigManager.prototype.parse_constants_config = function () {
        var configData = this.get_config_data(ConfigManager.constants_name);
        for (var key in configData.data) {
            var item = configData.data[key];
            if (typeof item.value !== "string")
                continue;
            var value = void 0;
            if (item.type === "integer") {
                value = parseInt(item.value);
            }
            else if (item.type === "float") {
                value = parseInt(item.value) / 10000;
            }
            else if (item.type === "string") {
                value = item.value;
            }
            ConstantsData_1.ConstantsData.instance[key] = value;
        }
        // cc.log("parse_constants_config: ConstantsData.instance:", ConstantsData.instance);
    }; // end: parse_constants_config
    // @@
    ConfigManager.prototype.load_all_config = function (callback) {
        var _this = this;
        var keys = [];
        var loadUrls = [];
        var configList = this._config[ConfigManager.config_list_name].data;
        //
        for (var key in configList) {
            if (configList.hasOwnProperty(key)) {
                var item = configList[key];
                if (typeof item.load_url !== "string")
                    continue;
                loadUrls.push(item.load_url);
                keys.push(key);
            }
        }
        /* console.log("ConfigManager->load_all_config:keys:", keys, keys.length);
        console.log("ConfigManager->load_all_config:loadUrls:", loadUrls, loadUrls.length);
        console.log("ConfigManager->load_all_config:configList:", configList); */
        //
        this.async_get_bundle(this.BUNDLE_NAME, function (loadedBundle) {
            loadedBundle.load(loadUrls, cc.TextAsset, function (error, loadedTextAssets) {
                console.log("ConfigManager->load_all_config:loadedTextAssets:", loadedTextAssets);
                if (error) {
                    cc.error("ConfigManager->load_all_config->AssetManager.Bundle: load assets failed,", error.message);
                    return;
                }
                var assetArray = [];
                if (Array.isArray(loadedTextAssets))
                    assetArray = assetArray.concat(loadedTextAssets);
                // console.log("ConfigManager->load_all_config:assetArray:", assetArray);
                for (var i = 0; i < loadUrls.length; i++) {
                    if (typeof assetArray[i] !== "object")
                        continue;
                    // if (keys[i] !== "HeroConfigData") continue; // test
                    var content = assetArray[i].text;
                    _this.parse_config(keys[i], content);
                }
                if (typeof callback === "function")
                    callback();
            });
        });
    }; // end: load_all_config
    // @@ (chuyển csv content string sang Config object)
    ConfigManager.prototype.parse_config = function (name, content) {
        // console.log("ConfigManager->parse_config:11111:", name);
        if (!name || !content || typeof name !== "string" || typeof content !== "string")
            return;
        // create config object
        var config = {
            head: [],
            data: {},
            data_set: {},
            primary_key_array: []
        };
        // create CsvReader
        var reader = new CsvReader_1.CsvReader();
        reader.init(content);
        // read headers
        reader.next();
        var fields = reader.rs.fieldsCopy();
        var headers = [];
        for (var i = 0; i < fields.length && fields[i] !== ""; i++) {
            headers.push(fields[i]);
            // nếu field (dòng đầu tiên) có 1 cột để trống sẽ gây ra lỗi sai vị trí cột các dòng tiếp theo.
        }
        // read comments
        reader.next();
        var comments = reader.rs.fieldsCopy();
        // read types
        reader.next();
        var types = reader.rs.fieldsCopy();
        // read keys
        reader.next();
        var keys = reader.rs.fieldsCopy();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === "key") {
                config.primary_key_array.push(i);
            }
        }
        //
        for (var i = 0; i < headers.length; i++) {
            config.head[i] = {
                field: headers[i],
                comment: comments[i],
                type: types[i],
                is_key: keys[i] === "key"
            };
        }
        //  console.log("ConfigManager->parse_config:fields:", fields);
        // console.log("ConfigManager->parse_config:headers:", headers);
        // console.log("ConfigManager->parse_config:comments:", comments);
        // console.log("ConfigManager->parse_config:types:", types);
        // console.log("ConfigManager->parse_config:keys:", keys);
        // console.log("ConfigManager->parse_config:config:", config); 
        // xử lý các hàng dữ liệu tiếp theo [sau keys] trong csv.
        while (reader.next()) {
            var rowData = {};
            for (var index = 0; index < headers.length; index++) {
                var header = config.head[index];
                var value = reader.rs.field(index).trim();
                // console.log("config rowData[field, type, value]----:", header.field, header.type, value);
                if (header.type === "array") {
                    // console.log("ConfigManager->parse_config:array--------------:", name, header.field);
                    var parts = value.split("|"); // e.g: "0|1|2", "2|1|2"
                    if (parts.length !== 3) {
                        cc.error("ConfigManager->parse_config: array type field must have three values");
                    }
                    var rows = parseInt(parts[0].trim());
                    var cols = parseInt(parts[1].trim());
                    var depth = parseInt(parts[2].trim());
                    var array = [];
                    // if (cols > 1) console.log("ConfigManager->parse_config:array:cols:", value);
                    index++;
                    for (var j = 0; j < rows; j++) {
                        var item = {};
                        for (var k = 0; k < cols; k++) {
                            var field = config.head[index];
                            var fieldValue = reader.rs.field(index).trim();
                            var parsedValue = this.parse_simple_field(field.type, fieldValue);
                            if (cols > 1) {
                                item[field.field] = parsedValue;
                            }
                            else {
                                item = parsedValue;
                            }
                            array[j] = item;
                            index++;
                        }
                    }
                    rowData[header.field] = array;
                    index += (depth - rows) * cols;
                    index--;
                }
                else {
                    if (!["string", "integer", "number", "float"].includes(header.type)) {
                        console.error("ConfigManager->parse_config: [" + header.type + "] unsupported field types!");
                        return;
                    }
                    rowData[header.field] = this.parse_simple_field(header.type, value);
                    /* if (name === "HeroConfigData" && header.field === "attack_anim_time") {
                        console.log("test111111-------------------------:", rowData[header.field], value);
                        if (Number.isNaN(rowData[header.field])) {
                            console.log("test2222-------------------------:", rowData[header.field], value);
                        }
                    } */
                }
            }
            // check dataKey, primary key
            var dataKey = "";
            for (var i = 0; i < config.primary_key_array.length; i++) {
                var keyIndex = config.primary_key_array[i]; // e.g: 0
                // config.head[keyIndex].field e.g: "name"
                // rowData[config.head[keyIndex].field] e.g: "CLOSE_BTN_DELAY_TIME"
                dataKey += rowData[config.head[keyIndex].field];
                if (i < config.primary_key_array.length - 1) {
                    dataKey += "@";
                }
            }
            // tối thiểu phải có 1 primary key: e.g: "CLOSE_BTN_DELAY_TIME", 2 primary key: e.g: "CLOSE_BTN_DELAY_TIME@1"
            // if (name === "HeroConfigData") console.log("dataKey----:", name, dataKey);
            config.data[dataKey] = rowData; // dataKey e.g: "CLOSE_BTN_DELAY_TIME"
        } // end: while
        this._config[name] = config;
        if (name === "GuideConfigData")
            console.log("ConfigManager->parse_config:2222:", name, config);
    }; // end: parse_config
    // @@ (nếu type là "number|integer|float" value rỗng sẽ trả về NaN)
    ConfigManager.prototype.parse_simple_field = function (type, value) {
        if (type === "number") {
            return parseInt(value);
        }
        else if (type === "integer") {
            return Math.floor(parseInt(value));
        }
        else if (type === "float") {
            return Math.floor(parseInt(value)) / 10000;
        }
        else { // type === "string";
            return value;
        }
    }; // end: parse_simple_field
    // @@
    ConfigManager.prototype.get_row_data = function (name) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        if (!name || typeof name !== "string" || keys.length <= 0)
            return null;
        var config = this._config[name];
        if (!config) {
            cc.error("ConfigManager->get_row_data: not find [" + name + "] config");
            return null;
        }
        var dataKey = "";
        for (var i = 0; i < keys.length; i++) {
            dataKey += keys[i];
            if (i < keys.length - 1)
                dataKey += "@";
        }
        if (config.data[dataKey])
            return config.data[dataKey];
        cc.error("ConfigManager->get_row_data: not find data from [" + name + "] config which primary key is \"" + dataKey + "\"");
        return null;
    };
    // @@ !!! type of cases
    ConfigManager.prototype.get_random_case = function (cases) {
        if (!Array.isArray(cases) || cases.length <= 0)
            return 0;
        var totalWeight = 0;
        var cumulativeWeights = [];
        for (var i = 0; i < cases.length; i++) {
            totalWeight += cases[i].weight;
            cumulativeWeights.push(totalWeight);
        }
        var randomValue = Math.random() * totalWeight;
        for (var i = 0; i < cumulativeWeights.length; i++) {
            if (randomValue < cumulativeWeights[i]) {
                return cases[i].prop;
            }
        }
        return cases[0].prop;
    }; // end: get_random_case
    // @@ !!! type of cases
    ConfigManager.prototype.get_random_case_data = function (cases) {
        // public get_random_case_data(cases: TConfigDataObject[]): any {
        if (!Array.isArray(cases) || cases.length <= 0)
            return null;
        var totalWeight = 0;
        var cumulativeWeights = [];
        for (var i = 0; i < cases.length; i++) {
            totalWeight += cases[i].weight;
            cumulativeWeights.push(totalWeight);
        }
        var randomValue = Math.random() * totalWeight;
        for (var i = 0; i < cumulativeWeights.length; i++) {
            if (randomValue < cumulativeWeights[i]) {
                return cases[i];
            }
        }
        return cases[0];
    }; // end: get_random_case_data
    ConfigManager.prototype.get_row_data_array = function (name) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var config = this._config[name];
        if (!config) {
            cc.error("ConfigManager->get_row_data_array: not find " + name + " config");
            return [];
        }
        var dataKey = "";
        for (var i = 0; i < keys.length; i++) {
            dataKey += keys[i] + "@";
        }
        var dataArray = config.data_set[dataKey];
        if (!dataArray) {
            config.data_set[dataKey] = dataArray = [];
            for (var key in config.data) {
                if (key.indexOf(dataKey) === 0) { // or key.startsWith(dataKey)
                    dataArray.push(config.data[key]);
                }
                else if (dataArray.length > 0) {
                    break;
                }
            }
        }
        return dataArray;
    };
    // @@
    ConfigManager.prototype.get_config_data = function (name) {
        if (this._config[name]) {
            return this._config[name];
        }
        cc.error("ConfigManager->get_config_data: not find [" + name + "] config");
        return {};
    };
    // @@ (giống Utils.async_get_bundle)
    ConfigManager.prototype.async_get_bundle = function (bundleName, callback) {
        if (!bundleName || typeof bundleName !== "string")
            return;
        // cc.assetManager.getBundle: Lấy gói đã được tải.
        var bundle = cc.assetManager.getBundle(bundleName);
        if (bundle) {
            if (typeof callback === "function")
                callback(bundle);
            return;
        }
        // tải gói (bundle) từ một URL hoặc một thư mục.
        cc.assetManager.loadBundle(bundleName, function (error, loadedBundle) {
            if (error) {
                cc.error("ConfigManager->async_get_bundle: load [" + bundleName + "] bundle failed,", error.message);
            }
            else {
                cc.log("ConfigManager->async_get_bundle: load [" + bundleName + "] bundle successfully.");
                if (typeof callback === "function")
                    callback(loadedBundle);
            }
        });
    }; // end: async_get_bundle
    // @@
    ConfigManager._instance = null;
    ConfigManager.config_list_name = "config_list";
    ConfigManager.config_list_url = "configs/config_list";
    ConfigManager.constants_name = "constants";
    ConfigManager.constants_url = "configs/constants";
    return ConfigManager;
}());
exports.ConfigManager = ConfigManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXENvbmZpZ01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsS0FBSztBQUNMLGlEQUFnRDtBQUNoRCx5Q0FBd0M7QUEwRHhDO0lBQUE7UUFDSSxTQUFJLEdBQWtCLEVBQUUsQ0FBQztRQUV6QixhQUFRLEdBQXVDLEVBQUUsQ0FBQztRQUNsRCxzQkFBaUIsR0FBYSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUFELGFBQUM7QUFBRCxDQUxBLEFBS0MsSUFBQTtBQUxZLHdCQUFNO0FBU25CLHVCQUF1QjtBQUN2QjtJQUFBO1FBUUksS0FBSztRQUNZLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLFlBQU8sR0FBMkIsRUFBRSxDQUFDO1FBQzlDLGdCQUFXLEdBQWdCLENBQUMsQ0FBQztJQW1WekMsQ0FBQztJQWhWRyxzQkFBa0IseUJBQVE7UUFEMUIsS0FBSzthQUNMO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUMxRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxLQUFLO0lBQ0Usa0NBQVUsR0FBakIsVUFBa0IsUUFBb0I7UUFBdEMsaUJBMkJDO1FBMUJHLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDO1lBQUUsT0FBTztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFDLFlBQW9DO1lBQ3pFLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsS0FBWSxFQUFFLGVBQTZCO2dCQUNyRyxJQUFJLEtBQUssRUFBRTtvQkFDUCxFQUFFLENBQUMs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LE9BQU8sUUFBUSxLQUFLLFVBQVU7Z0JBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELE9BQU87U0FDVjtRQUNELGdEQUFnRDtRQUNoRCxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFZLEVBQUUsWUFBb0M7WUFDdEYsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsRUFBRSxDQUFDLEtBQUssQ0FBQyw0Q0FBMEMsVUFBVSxxQkFBa0IsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkc7aUJBQU07Z0JBQ0gsRUFBRSxDQUFDLEdBQUcsQ0FBQyw0Q0FBMEMsVUFBVSwyQkFBd0IsQ0FBQyxDQUFDO2dCQUNyRixJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVU7b0JBQUUsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzlEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLEVBQUMsd0JBQXdCO0lBNVYxQixLQUFLO0lBQ1UsdUJBQVMsR0FBa0IsSUFBSSxDQUFDO0lBQ3ZCLDhCQUFnQixHQUFXLGFBQWEsQ0FBQztJQUN6Qyw2QkFBZSxHQUFXLHFCQUFxQixDQUFDO0lBQ2hELDRCQUFjLEdBQVcsV0FBVyxDQUFDO0lBQ3JDLDJCQUFhLEdBQVcsbUJBQW1CLENBQUM7SUF3VnhFLG9CQUFDO0NBOVZELEFBOFZDLElBQUE7QUE5Vlksc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAQFxyXG5pbXBvcnQgeyBDb25zdGFudHNEYXRhIH0gZnJvbSBcIi4vQ29uc3RhbnRzRGF0YVwiO1xyXG5pbXBvcnQgeyBDc3ZSZWFkZXIgfSBmcm9tIFwiLi9Dc3ZSZWFkZXJcIjtcclxuaW1wb3J0IHsgTWFwQ2VsbCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9tYXBjZWxsXCI7XHJcbmltcG9ydCB7IEJ1aWxkIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL2J1aWxkXCI7XHJcbmltcG9ydCB7IEl0ZW1Db25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvaXRlbVwiO1xyXG5pbXBvcnQgeyBsdlJhbmRvbUNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9sdl9yYW5kb21cIjtcclxuaW1wb3J0IHsgSGVyb0NvbmZpZyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9oZXJvXCI7XHJcbmltcG9ydCB7IENhc2tDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvY2Fza1wiO1xyXG5pbXBvcnQgeyBTaG9wQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL3Nob3BcIjtcclxuaW1wb3J0IHsgR3VpZGVDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvZ3VpZGVcIjtcclxuaW1wb3J0IHsgU3BlY2lhbCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9zcGVjaWFsXCI7XHJcbmltcG9ydCB7IFNraWxsQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL3NraWxsXCI7XHJcbmltcG9ydCB7IFN0YXJDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3Mvc3RhclwiO1xyXG5cclxuaW1wb3J0IHsgUGxheU1hcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9wbGF5bWFwXCI7XHJcbmltcG9ydCB7IFBsYXlEYXRhIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL3BsYXlkYXRhXCI7XHJcbmltcG9ydCB7IFBsYXlDYXZlcyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9wbGF5Y2F2ZXNcIjtcclxuaW1wb3J0IHsgTmFtZVBvb2wgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvbmFtZV9wb29sXCI7XHJcbmltcG9ydCB7IExhZGRlckJ1aWxkZGluZyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9sYWRkZXJfYnVpbGRpbmdcIjtcclxuaW1wb3J0IHsgUG9vbENvbmZpZyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9wb29sXCI7XHJcbmltcG9ydCB7IFRhc2tDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvdGFza1wiO1xyXG5pbXBvcnQgeyBCb29rQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL2Jvb2tzXCI7XHJcbmltcG9ydCB7IEZpZ2h0TWFwSXRlbSB9IGZyb20gXCIuLi8uLi9maWdodC9zY3JpcHRzL0ZpZ2h0TWFwSXRlbVwiO1xyXG5pbXBvcnQgeyBEZWNvcmF0ZUNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9kZWNvcmF0ZVwiO1xyXG5pbXBvcnQgeyBMYWRkZXJMVkNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9sYWRkZXJfbHZcIjtcclxuaW1wb3J0IHsgTGFkZGVyUmV3YXJkQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL2xhZGRlcl9yZXdhcmRcIjtcclxuaW1wb3J0IHsgTGFkZGVyQWNoaWV2ZW1lbnRDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvbGFkZGVyX2FjaGlldmVtZW50XCI7XHJcbmltcG9ydCB7IFNpZ25Db25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3Mvc2lnblwiO1xyXG5pbXBvcnQgeyBDYXZlc0xldmVsIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL2NhdmVzbGV2ZWxcIjtcclxuaW1wb3J0IHsgUmFuZG9tTmFtZSB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9yYW5kb21fbmFtZVwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHNDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvY29uc3RhbnRzXCI7XHJcbi8vIGV4cG9ydCBjbGFzcyBDb25maWdMaXN0Q29uZmlnIHt9O1xyXG5cclxuLy8gQEBcclxudHlwZSBDc3ZEYXRhVHlwZUJhc2UgPSBcInN0cmluZ1wiIHwgXCJpbnRlZ2VyXCIgfCBcIm51bWJlclwiIHwgXCJmbG9hdFwiO1xyXG50eXBlIENzdkRhdGFUeXBlRnVsbCA9IENzdkRhdGFUeXBlQmFzZSB8IFwiYXJyYXlcIjtcclxuXHJcbi8vIEBAXHJcbmludGVyZmFjZSBJQ29uZmlnSGVhZCB7XHJcbiAgICBmaWVsZDogc3RyaW5nO1xyXG4gICAgY29tbWVudDogc3RyaW5nO1xyXG4gICAgdHlwZTogQ3N2RGF0YVR5cGVGdWxsO1xyXG4gICAgaXNfa2V5OiBib29sZWFuO1xyXG59XHJcblxyXG4vLyBAQFxyXG50eXBlIENvbmZpZ0RhdGFUeXBlQmFzZSA9IHN0cmluZyB8IG51bWJlcjsgLy8gYuG7lSBzdW5nIGJvb2xlYW4gbuG6v3UgY8OhYyBmaWxlIGNzdiBjw7MgZOG7ryBsaeG7h3UgYm9vbGVhbi5cclxudHlwZSBDb25maWdEYXRhVHlwZU9iaiA9IFJlY29yZDxzdHJpbmcsIENvbmZpZ0RhdGFUeXBlQmFzZT47XHJcbnR5cGUgQ29uZmlnRGF0YVR5cGVBcnJheSA9IEFycmF5PENvbmZpZ0RhdGFUeXBlQmFzZSB8IENvbmZpZ0RhdGFUeXBlT2JqPjtcclxuXHJcbi8vIEBcclxuZXhwb3J0IHR5cGUgVENvbmZpZ0RhdGFPYmplY3QgPSBSZWNvcmQ8c3RyaW5nLCBDb25maWdEYXRhVHlwZUJhc2UgfCBDb25maWdEYXRhVHlwZUFycmF5PjtcclxuZXhwb3J0IGludGVyZmFjZSBSb3dEYXRhQXJyYXkge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIHByb3A6IG51bWJlcjtcclxuICAgIHNlY3Rpb25fYTogbnVtYmVyO1xyXG4gICAgc2VjdGlvbl9iOiBudW1iZXI7XHJcbiAgICB3ZWlnaHQ6IG51bWJlcjtcclxufVxyXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuICAgIGhlYWQ6IElDb25maWdIZWFkW10gPSBbXTtcclxuICAgIGRhdGE6IE1hcENlbGwgfCBSZWNvcmQ8c3RyaW5nLCBCdWlsZD4gfCBSZWNvcmQ8c3RyaW5nLCBJdGVtQ29uZmlnPiB8IGx2UmFuZG9tQ29uZmlnIHwgSGVyb0NvbmZpZyB8IENhc2tDb25maWcgfCBSZWNvcmQ8bnVtYmVyLCBTaG9wQ29uZmlnPiB8IEd1aWRlQ29uZmlnIHwgU3BlY2lhbCB8IFNraWxsQ29uZmlnIHwgU3RhckNvbmZpZyB8IENvbnN0YW50c0NvbmZpZztcclxuICAgIGRhdGFfc2V0OiBSZWNvcmQ8c3RyaW5nLCBDb25maWdEYXRhT2JqZWN0W10+ID0ge307XHJcbiAgICBwcmltYXJ5X2tleV9hcnJheTogbnVtYmVyW10gPSBbXTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQ29uZmlnRGF0YU9iamVjdCA9IFBsYXlNYXAgfCBQbGF5RGF0YSB8IFBsYXlDYXZlcyB8IE5hbWVQb29sIHwgTGFkZGVyQnVpbGRkaW5nIHwgUG9vbENvbmZpZyB8IFRhc2tDb25maWdcclxuZXhwb3J0IHR5cGUgQ29uZmlnRGF0YSA9IEhlcm9Db25maWcgfCBCb29rQ29uZmlnIHwgU3RhckNvbmZpZyB8IFNraWxsQ29uZmlnIHwgQnVpbGQgfCBGaWdodE1hcEl0ZW0gfCBEZWNvcmF0ZUNvbmZpZyB8IEl0ZW1Db25maWcgfCBMYWRkZXJMVkNvbmZpZyB8IExhZGRlckJ1aWxkZGluZyB8IExhZGRlclJld2FyZENvbmZpZyB8IExhZGRlckFjaGlldmVtZW50Q29uZmlnIHwgU2hvcENvbmZpZyB8IFNpZ25Db25maWcgfCBDYXZlc0xldmVsIHwgUmFuZG9tTmFtZSB8IFRhc2tDb25maWdcclxuLy8gQEAgISEhIHR5cGUgb2YgY2FzZXNcclxuZXhwb3J0IGNsYXNzIENvbmZpZ01hbmFnZXIge1xyXG4gICAgLy8gQEBcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQ29uZmlnTWFuYWdlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjb25maWdfbGlzdF9uYW1lOiBzdHJpbmcgPSBcImNvbmZpZ19saXN0XCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjb25maWdfbGlzdF91cmw6IHN0cmluZyA9IFwiY29uZmlncy9jb25maWdfbGlzdFwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY29uc3RhbnRzX25hbWU6IHN0cmluZyA9IFwiY29uc3RhbnRzXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjb25zdGFudHNfdXJsOiBzdHJpbmcgPSBcImNvbmZpZ3MvY29uc3RhbnRzXCI7XHJcblxyXG4gICAgLy8gQEBcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgQlVORExFX05BTUU6IHN0cmluZyA9IFwiY29tbW9uXCI7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWc6IFJlY29yZDxzdHJpbmcsIENvbmZpZz4gPSB7fTtcclxuICAgIHByaXZhdGUgX2luaXRfc3RhdGU6ICgwIHwgMSB8IDIpID0gMDtcclxuXHJcbiAgICAvLyBAQFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKTogQ29uZmlnTWFuYWdlciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkgdGhpcy5faW5zdGFuY2UgPSBuZXcgQ29uZmlnTWFuYWdlcigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAQFxyXG4gICAgcHVibGljIGFzeW5jX2luaXQoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faW5pdF9zdGF0ZSA+IDApIHJldHVybjtcclxuICAgICAgICB0aGlzLl9pbml0X3N0YXRlID0gMTtcclxuICAgICAgICB0aGlzLmFzeW5jX2dldF9idW5kbGUodGhpcy5CVU5ETEVfTkFNRSwgKGxvYWRlZEJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkZWRCdW5kbGUubG9hZChDb25maWdNYW5hZ2VyLmNvbnN0YW50c191cmwsIGNjLlRleHRBc3NldCwgKGVycm9yOiBFcnJvciwgbG9hZGVkVGV4dEFzc2V0OiBjYy5UZXh0QXNzZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGBBc3NldE1hbmFnZXIuQnVuZGxlOiBsb2FkIFske3RoaXMuQlVORExFX05BTUV9LyR7Q29uZmlnTWFuYWdlci5jb25zdGFudHNfdXJsfV0gYXNzZXRzIGZhaWxlZCxgLCBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNvbmZpZ01hbmFnZXItPmFzeW5jX2luaTogbG9hZGVkVGV4dEFzc2V0OlwiLCBsb2FkZWRUZXh0QXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZV9jb25maWcoQ29uZmlnTWFuYWdlci5jb25zdGFudHNfbmFtZSwgbG9hZGVkVGV4dEFzc2V0LnRleHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZV9jb25zdGFudHNfY29uZmlnKCk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3luY19nZXRfYnVuZGxlKHRoaXMuQlVORExFX05BTUUsIChsb2FkZWRCdW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkZWRCdW5kbGUubG9hZChDb25maWdNYW5hZ2VyLmNvbmZpZ19saXN0X3VybCwgY2MuVGV4dEFzc2V0LCAoZXJyb3I6IEVycm9yLCBsb2FkZWRUZXh0QXNzZXQ6IGNjLlRleHRBc3NldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGBBc3NldE1hbmFnZXIuQnVuZGxlOiBsb2FkIFske3RoaXMuQlVORExFX05BTUV9LyR7Q29uZmlnTWFuYWdlci5jb25maWdfbGlzdF91cmx9XSBhc3NldHMgZmFpbGVkLGAsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ29uZmlnTWFuYWdlci0+YXN5bmNfaW5pOiBjb25maWdfbGlzdF91cmw6XCIsIGxvYWRlZFRleHRBc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VfY29uZmlnKENvbmZpZ01hbmFnZXIuY29uZmlnX2xpc3RfbmFtZSwgbG9hZGVkVGV4dEFzc2V0LnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0X3N0YXRlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSAvLyBlbmQ6IGFzeW5jX2luaXRcclxuXHJcbiAgICAvLyBAQFxyXG4gICAgcHJpdmF0ZSBwYXJzZV9jb25zdGFudHNfY29uZmlnKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZ0RhdGE6IENvbmZpZyA9IHRoaXMuZ2V0X2NvbmZpZ19kYXRhKENvbmZpZ01hbmFnZXIuY29uc3RhbnRzX25hbWUpO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbmZpZ0RhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gY29uZmlnRGF0YS5kYXRhW2tleV0gYXMgQ29uc3RhbnRzQ29uZmlnO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0udmFsdWUgIT09IFwic3RyaW5nXCIpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU6IENvbmZpZ0RhdGFUeXBlQmFzZTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gXCJpbnRlZ2VyXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQoaXRlbS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBcImZsb2F0XCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQoaXRlbS52YWx1ZSkgLyAxMDAwMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gaXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBDb25zdGFudHNEYXRhLmluc3RhbmNlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2MubG9nKFwicGFyc2VfY29uc3RhbnRzX2NvbmZpZzogQ29uc3RhbnRzRGF0YS5pbnN0YW5jZTpcIiwgQ29uc3RhbnRzRGF0YS5pbnN0YW5jZSk7XHJcbiAgICB9IC8vIGVuZDogcGFyc2VfY29uc3RhbnRzX2NvbmZpZ1xyXG5cclxuICAgIC8vIEBAXHJcbiAgICBwdWJsaWMgbG9hZF9hbGxfY29uZmlnKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qga2V5czogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBjb25zdCBsb2FkVXJsczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBjb25zdCBjb25maWdMaXN0ID0gdGhpcy5fY29uZmlnW0NvbmZpZ01hbmFnZXIuY29uZmlnX2xpc3RfbmFtZV0uZGF0YTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbmZpZ0xpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZ0xpc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVENvbmZpZ0RhdGFPYmplY3QgPSBjb25maWdMaXN0W2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0ubG9hZF91cmwgIT09IFwic3RyaW5nXCIpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgbG9hZFVybHMucHVzaChpdGVtLmxvYWRfdXJsKTtcclxuICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qIGNvbnNvbGUubG9nKFwiQ29uZmlnTWFuYWdlci0+bG9hZF9hbGxfY29uZmlnOmtleXM6XCIsIGtleXMsIGtleXMubGVuZ3RoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbmZpZ01hbmFnZXItPmxvYWRfYWxsX2NvbmZpZzpsb2FkVXJsczpcIiwgbG9hZFVybHMsIGxvYWRVcmxzLmxlbmd0aCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25maWdNYW5hZ2VyLT5sb2FkX2FsbF9jb25maWc6Y29uZmlnTGlzdDpcIiwgY29uZmlnTGlzdCk7ICovXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0aGlzLmFzeW5jX2dldF9idW5kbGUodGhpcy5CVU5ETEVfTkFNRSwgKGxvYWRlZEJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkZWRCdW5kbGUubG9hZChsb2FkVXJscywgY2MuVGV4dEFzc2V0LCAoZXJyb3I6IEVycm9yLCBsb2FkZWRUZXh0QXNzZXRzOiBjYy5UZXh0QXNzZXRbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25maWdNYW5hZ2VyLT5sb2FkX2FsbF9jb25maWc6bG9hZGVkVGV4dEFzc2V0czpcIiwgbG9hZGVkVGV4dEFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihgQ29uZmlnTWFuYWdlci0+bG9hZF9hbGxfY29uZmlnLT5Bc3NldE1hbmFnZXIuQnVuZGxlOiBsb2FkIGFzc2V0cyBmYWlsZWQsYCwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGFzc2V0QXJyYXk6IGNjLlRleHRBc3NldFtdID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsb2FkZWRUZXh0QXNzZXRzKSkgYXNzZXRBcnJheSA9IGFzc2V0QXJyYXkuY29uY2F0KGxvYWRlZFRleHRBc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDb25maWdNYW5hZ2VyLT5sb2FkX2FsbF9jb25maWc6YXNzZXRBcnJheTpcIiwgYXNzZXRBcnJheSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvYWRVcmxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhc3NldEFycmF5W2ldICE9PSBcIm9iamVjdFwiKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoa2V5c1tpXSAhPT0gXCJIZXJvQ29uZmlnRGF0YVwiKSBjb250aW51ZTsgLy8gdGVzdFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ6IHN0cmluZyA9IGFzc2V0QXJyYXlbaV0udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlX2NvbmZpZyhrZXlzW2ldLCBjb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IC8vIGVuZDogbG9hZF9hbGxfY29uZmlnXHJcblxyXG4gICAgLy8gQEAgKGNodXnhu4NuIGNzdiBjb250ZW50IHN0cmluZyBzYW5nIENvbmZpZyBvYmplY3QpXHJcbiAgICBwcml2YXRlIHBhcnNlX2NvbmZpZyhuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ29uZmlnTWFuYWdlci0+cGFyc2VfY29uZmlnOjExMTExOlwiLCBuYW1lKTtcclxuICAgICAgICBpZiAoIW5hbWUgfHwgIWNvbnRlbnQgfHwgdHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGNvbnRlbnQgIT09IFwic3RyaW5nXCIpIHJldHVybjtcclxuICAgICAgICAvLyBjcmVhdGUgY29uZmlnIG9iamVjdFxyXG4gICAgICAgIGNvbnN0IGNvbmZpZzogQ29uZmlnID0ge1xyXG4gICAgICAgICAgICBoZWFkOiBbXSxcclxuICAgICAgICAgICAgZGF0YToge30sXHJcbiAgICAgICAgICAgIGRhdGFfc2V0OiB7fSxcclxuICAgICAgICAgICAgcHJpbWFyeV9rZXlfYXJyYXk6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBjcmVhdGUgQ3N2UmVhZGVyXHJcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IENzdlJlYWRlcigpO1xyXG4gICAgICAgIHJlYWRlci5pbml0KGNvbnRlbnQpO1xyXG4gICAgICAgIC8vIHJlYWQgaGVhZGVyc1xyXG4gICAgICAgIHJlYWRlci5uZXh0KCk7XHJcbiAgICAgICAgY29uc3QgZmllbGRzOiBzdHJpbmdbXSA9IHJlYWRlci5ycy5maWVsZHNDb3B5KCk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGggJiYgZmllbGRzW2ldICE9PSBcIlwiOyBpKyspIHtcclxuICAgICAgICAgICAgaGVhZGVycy5wdXNoKGZpZWxkc1tpXSk7XHJcbiAgICAgICAgICAgIC8vIG7hur91IGZpZWxkIChkw7JuZyDEkeG6p3UgdGnDqm4pIGPDsyAxIGPhu5l0IMSR4buDIHRy4buRbmcgc+G6vSBnw6J5IHJhIGzhu5dpIHNhaSB24buLIHRyw60gY+G7mXQgY8OhYyBkw7JuZyB0aeG6v3AgdGhlby5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVhZCBjb21tZW50c1xyXG4gICAgICAgIHJlYWRlci5uZXh0KCk7XHJcbiAgICAgICAgY29uc3QgY29tbWVudHM6IHN0cmluZ1tdID0gcmVhZGVyLnJzLmZpZWxkc0NvcHkoKTtcclxuICAgICAgICAvLyByZWFkIHR5cGVzXHJcbiAgICAgICAgcmVhZGVyLm5leHQoKTtcclxuICAgICAgICBjb25zdCB0eXBlczogc3RyaW5nW10gPSByZWFkZXIucnMuZmllbGRzQ29weSgpO1xyXG4gICAgICAgIC8vIHJlYWQga2V5c1xyXG4gICAgICAgIHJlYWRlci5uZXh0KCk7XHJcbiAgICAgICAgY29uc3Qga2V5czogc3RyaW5nW10gPSByZWFkZXIucnMuZmllbGRzQ29weSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoa2V5c1tpXSA9PT0gXCJrZXlcIikge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLnByaW1hcnlfa2V5X2FycmF5LnB1c2goaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uZmlnLmhlYWRbaV0gPSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZDogaGVhZGVyc1tpXSxcclxuICAgICAgICAgICAgICAgIGNvbW1lbnQ6IGNvbW1lbnRzW2ldLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZXNbaV0gYXMgQ3N2RGF0YVR5cGVGdWxsLFxyXG4gICAgICAgICAgICAgICAgaXNfa2V5OiBrZXlzW2ldID09PSBcImtleVwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vICBjb25zb2xlLmxvZyhcIkNvbmZpZ01hbmFnZXItPnBhcnNlX2NvbmZpZzpmaWVsZHM6XCIsIGZpZWxkcyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDb25maWdNYW5hZ2VyLT5wYXJzZV9jb25maWc6aGVhZGVyczpcIiwgaGVhZGVycyk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDb25maWdNYW5hZ2VyLT5wYXJzZV9jb25maWc6Y29tbWVudHM6XCIsIGNvbW1lbnRzKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNvbmZpZ01hbmFnZXItPnBhcnNlX2NvbmZpZzp0eXBlczpcIiwgdHlwZXMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ29uZmlnTWFuYWdlci0+cGFyc2VfY29uZmlnOmtleXM6XCIsIGtleXMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ29uZmlnTWFuYWdlci0+cGFyc2VfY29uZmlnOmNvbmZpZzpcIiwgY29uZmlnKTsgXHJcbiAgICAgICAgLy8geOG7rSBsw70gY8OhYyBow6BuZyBk4buvIGxp4buHdSB0aeG6v3AgdGhlbyBbc2F1IGtleXNdIHRyb25nIGNzdi5cclxuICAgICAgICB3aGlsZSAocmVhZGVyLm5leHQoKSkge1xyXG4gICAgICAgICAgICBjb25zdCByb3dEYXRhOiBUQ29uZmlnRGF0YU9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaGVhZGVycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcjogSUNvbmZpZ0hlYWQgPSBjb25maWcuaGVhZFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gcmVhZGVyLnJzLmZpZWxkKGluZGV4KS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNvbmZpZyByb3dEYXRhW2ZpZWxkLCB0eXBlLCB2YWx1ZV0tLS0tOlwiLCBoZWFkZXIuZmllbGQsIGhlYWRlci50eXBlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVhZGVyLnR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ29uZmlnTWFuYWdlci0+cGFyc2VfY29uZmlnOmFycmF5LS0tLS0tLS0tLS0tLS06XCIsIG5hbWUsIGhlYWRlci5maWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdChcInxcIik7IC8vIGUuZzogXCIwfDF8MlwiLCBcIjJ8MXwyXCJcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoICE9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiQ29uZmlnTWFuYWdlci0+cGFyc2VfY29uZmlnOiBhcnJheSB0eXBlIGZpZWxkIG11c3QgaGF2ZSB0aHJlZSB2YWx1ZXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd3M6IG51bWJlciA9IHBhcnNlSW50KHBhcnRzWzBdLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sczogbnVtYmVyID0gcGFyc2VJbnQocGFydHNbMV0udHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXB0aDogbnVtYmVyID0gcGFyc2VJbnQocGFydHNbMl0udHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheTogQ29uZmlnRGF0YVR5cGVBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChjb2xzID4gMSkgY29uc29sZS5sb2coXCJDb25maWdNYW5hZ2VyLT5wYXJzZV9jb25maWc6YXJyYXk6Y29sczpcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW06IENvbmZpZ0RhdGFUeXBlQmFzZSB8IENvbmZpZ0RhdGFUeXBlT2JqID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY29sczsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZDogSUNvbmZpZ0hlYWQgPSBjb25maWcuaGVhZFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZFZhbHVlID0gcmVhZGVyLnJzLmZpZWxkKGluZGV4KS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZTogQ29uZmlnRGF0YVR5cGVCYXNlID0gdGhpcy5wYXJzZV9zaW1wbGVfZmllbGQoZmllbGQudHlwZSBhcyBDc3ZEYXRhVHlwZUJhc2UsIGZpZWxkVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHMgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVtmaWVsZC5maWVsZF0gPSBwYXJzZWRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHBhcnNlZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbal0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByb3dEYXRhW2hlYWRlci5maWVsZF0gPSBhcnJheTtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCArPSAoZGVwdGggLSByb3dzKSAqIGNvbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgtLTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFbXCJzdHJpbmdcIiwgXCJpbnRlZ2VyXCIsIFwibnVtYmVyXCIsIFwiZmxvYXRcIl0uaW5jbHVkZXMoaGVhZGVyLnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENvbmZpZ01hbmFnZXItPnBhcnNlX2NvbmZpZzogWyR7aGVhZGVyLnR5cGV9XSB1bnN1cHBvcnRlZCBmaWVsZCB0eXBlcyFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByb3dEYXRhW2hlYWRlci5maWVsZF0gPSB0aGlzLnBhcnNlX3NpbXBsZV9maWVsZChoZWFkZXIudHlwZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qIGlmIChuYW1lID09PSBcIkhlcm9Db25maWdEYXRhXCIgJiYgaGVhZGVyLmZpZWxkID09PSBcImF0dGFja19hbmltX3RpbWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRlc3QxMTExMTEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tOlwiLCByb3dEYXRhW2hlYWRlci5maWVsZF0sIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc05hTihyb3dEYXRhW2hlYWRlci5maWVsZF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRlc3QyMjIyLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTpcIiwgcm93RGF0YVtoZWFkZXIuZmllbGRdLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ICovXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2hlY2sgZGF0YUtleSwgcHJpbWFyeSBrZXlcclxuICAgICAgICAgICAgbGV0IGRhdGFLZXkgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5wcmltYXJ5X2tleV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5SW5kZXggPSBjb25maWcucHJpbWFyeV9rZXlfYXJyYXlbaV07IC8vIGUuZzogMFxyXG4gICAgICAgICAgICAgICAgLy8gY29uZmlnLmhlYWRba2V5SW5kZXhdLmZpZWxkIGUuZzogXCJuYW1lXCJcclxuICAgICAgICAgICAgICAgIC8vIHJvd0RhdGFbY29uZmlnLmhlYWRba2V5SW5kZXhdLmZpZWxkXSBlLmc6IFwiQ0xPU0VfQlROX0RFTEFZX1RJTUVcIlxyXG4gICAgICAgICAgICAgICAgZGF0YUtleSArPSByb3dEYXRhW2NvbmZpZy5oZWFkW2tleUluZGV4XS5maWVsZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IGNvbmZpZy5wcmltYXJ5X2tleV9hcnJheS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUtleSArPSBcIkBcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB04buRaSB0aGnhu4N1IHBo4bqjaSBjw7MgMSBwcmltYXJ5IGtleTogZS5nOiBcIkNMT1NFX0JUTl9ERUxBWV9USU1FXCIsIDIgcHJpbWFyeSBrZXk6IGUuZzogXCJDTE9TRV9CVE5fREVMQVlfVElNRUAxXCJcclxuICAgICAgICAgICAgLy8gaWYgKG5hbWUgPT09IFwiSGVyb0NvbmZpZ0RhdGFcIikgY29uc29sZS5sb2coXCJkYXRhS2V5LS0tLTpcIiwgbmFtZSwgZGF0YUtleSk7XHJcbiAgICAgICAgICAgIGNvbmZpZy5kYXRhW2RhdGFLZXldID0gcm93RGF0YTsgLy8gZGF0YUtleSBlLmc6IFwiQ0xPU0VfQlROX0RFTEFZX1RJTUVcIlxyXG4gICAgICAgIH0gLy8gZW5kOiB3aGlsZVxyXG4gICAgICAgIHRoaXMuX2NvbmZpZ1tuYW1lXSA9IGNvbmZpZztcclxuICAgICAgICBpZiAobmFtZSA9PT0gXCJHdWlkZUNvbmZpZ0RhdGFcIikgY29uc29sZS5sb2coXCJDb25maWdNYW5hZ2VyLT5wYXJzZV9jb25maWc6MjIyMjpcIiwgbmFtZSwgY29uZmlnKTtcclxuICAgIH0gLy8gZW5kOiBwYXJzZV9jb25maWdcclxuXHJcblxyXG4gICAgLy8gQEAgKG7hur91IHR5cGUgbMOgIFwibnVtYmVyfGludGVnZXJ8ZmxvYXRcIiB2YWx1ZSBy4buXbmcgc+G6vSB0cuG6oyB24buBIE5hTilcclxuICAgIHByaXZhdGUgcGFyc2Vfc2ltcGxlX2ZpZWxkKHR5cGU6IENzdkRhdGFUeXBlQmFzZSwgdmFsdWU6IHN0cmluZyk6IENvbmZpZ0RhdGFUeXBlQmFzZSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiaW50ZWdlclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKHBhcnNlSW50KHZhbHVlKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcImZsb2F0XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IocGFyc2VJbnQodmFsdWUpKSAvIDEwMDAwO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIHR5cGUgPT09IFwic3RyaW5nXCI7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9IC8vIGVuZDogcGFyc2Vfc2ltcGxlX2ZpZWxkXHJcblxyXG4gICAgLy8gQEBcclxuICAgIHB1YmxpYyBnZXRfcm93X2RhdGEobmFtZTogc3RyaW5nLCAuLi5rZXlzOiBzdHJpbmdbXSk6IENvbmZpZ0RhdGEgfCBudWxsIHtcclxuICAgICAgICBpZiAoIW5hbWUgfHwgdHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIgfHwga2V5cy5sZW5ndGggPD0gMCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgY29uc3QgY29uZmlnOiBDb25maWcgPSB0aGlzLl9jb25maWdbbmFtZV07XHJcbiAgICAgICAgaWYgKCFjb25maWcpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoYENvbmZpZ01hbmFnZXItPmdldF9yb3dfZGF0YTogbm90IGZpbmQgWyR7bmFtZX1dIGNvbmZpZ2ApO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGFLZXkgPSBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBkYXRhS2V5ICs9IGtleXNbaV07XHJcbiAgICAgICAgICAgIGlmIChpIDwga2V5cy5sZW5ndGggLSAxKSBkYXRhS2V5ICs9IFwiQFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlnLmRhdGFbZGF0YUtleV0pIHJldHVybiBjb25maWcuZGF0YVtkYXRhS2V5XTtcclxuICAgICAgICBjYy5lcnJvcihgQ29uZmlnTWFuYWdlci0+Z2V0X3Jvd19kYXRhOiBub3QgZmluZCBkYXRhIGZyb20gWyR7bmFtZX1dIGNvbmZpZyB3aGljaCBwcmltYXJ5IGtleSBpcyBcIiR7ZGF0YUtleX1cImApO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBAICEhISB0eXBlIG9mIGNhc2VzXHJcbiAgICBwdWJsaWMgZ2V0X3JhbmRvbV9jYXNlKGNhc2VzOiBBcnJheTx7IHdlaWdodDogbnVtYmVyOyBwcm9wOiBudW1iZXIgfT4pOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjYXNlcykgfHwgY2FzZXMubGVuZ3RoIDw9IDApIHJldHVybiAwO1xyXG4gICAgICAgIGxldCB0b3RhbFdlaWdodCA9IDA7XHJcbiAgICAgICAgY29uc3QgY3VtdWxhdGl2ZVdlaWdodHM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0b3RhbFdlaWdodCArPSBjYXNlc1tpXS53ZWlnaHQ7XHJcbiAgICAgICAgICAgIGN1bXVsYXRpdmVXZWlnaHRzLnB1c2godG90YWxXZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGgucmFuZG9tKCkgKiB0b3RhbFdlaWdodDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1bXVsYXRpdmVXZWlnaHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyYW5kb21WYWx1ZSA8IGN1bXVsYXRpdmVXZWlnaHRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FzZXNbaV0ucHJvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FzZXNbMF0ucHJvcDtcclxuICAgIH0gLy8gZW5kOiBnZXRfcmFuZG9tX2Nhc2VcclxuXHJcbiAgICAvLyBAQCAhISEgdHlwZSBvZiBjYXNlc1xyXG4gICAgcHVibGljIGdldF9yYW5kb21fY2FzZV9kYXRhKGNhc2VzOiBQb29sQ29uZmlnW10pOiBQb29sQ29uZmlnIHtcclxuICAgICAgICAvLyBwdWJsaWMgZ2V0X3JhbmRvbV9jYXNlX2RhdGEoY2FzZXM6IFRDb25maWdEYXRhT2JqZWN0W10pOiBhbnkge1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjYXNlcykgfHwgY2FzZXMubGVuZ3RoIDw9IDApIHJldHVybiBudWxsO1xyXG4gICAgICAgIGxldCB0b3RhbFdlaWdodCA9IDA7XHJcbiAgICAgICAgY29uc3QgY3VtdWxhdGl2ZVdlaWdodHM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0b3RhbFdlaWdodCArPSBjYXNlc1tpXS53ZWlnaHQ7XHJcbiAgICAgICAgICAgIGN1bXVsYXRpdmVXZWlnaHRzLnB1c2godG90YWxXZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGgucmFuZG9tKCkgKiB0b3RhbFdlaWdodDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1bXVsYXRpdmVXZWlnaHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyYW5kb21WYWx1ZSA8IGN1bXVsYXRpdmVXZWlnaHRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FzZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhc2VzWzBdO1xyXG4gICAgfSAvLyBlbmQ6IGdldF9yYW5kb21fY2FzZV9kYXRhXHJcblxyXG4gICAgcHVibGljIGdldF9yb3dfZGF0YV9hcnJheShuYW1lOiBzdHJpbmcsIC4uLmtleXM6IHN0cmluZ1tdKTogQ29uZmlnRGF0YU9iamVjdFtdIHtcclxuICAgICAgICBjb25zdCBjb25maWc6IENvbmZpZyA9IHRoaXMuX2NvbmZpZ1tuYW1lXTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoYENvbmZpZ01hbmFnZXItPmdldF9yb3dfZGF0YV9hcnJheTogbm90IGZpbmQgJHtuYW1lfSBjb25maWdgKTtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YUtleTogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGF0YUtleSArPSBrZXlzW2ldICsgXCJAXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhQXJyYXk6IENvbmZpZ0RhdGFPYmplY3RbXSA9IGNvbmZpZy5kYXRhX3NldFtkYXRhS2V5XTtcclxuICAgICAgICBpZiAoIWRhdGFBcnJheSkge1xyXG4gICAgICAgICAgICBjb25maWcuZGF0YV9zZXRbZGF0YUtleV0gPSBkYXRhQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29uZmlnLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZihkYXRhS2V5KSA9PT0gMCkgeyAvLyBvciBrZXkuc3RhcnRzV2l0aChkYXRhS2V5KVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheS5wdXNoKGNvbmZpZy5kYXRhW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQEBcclxuICAgIHB1YmxpYyBnZXRfY29uZmlnX2RhdGEobmFtZTogc3RyaW5nKTogQ29uZmlnIHtcclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb25maWdbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmVycm9yKGBDb25maWdNYW5hZ2VyLT5nZXRfY29uZmlnX2RhdGE6IG5vdCBmaW5kIFske25hbWV9XSBjb25maWdgKTtcclxuICAgICAgICByZXR1cm4ge30gYXMgQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBAIChnaeG7kW5nIFV0aWxzLmFzeW5jX2dldF9idW5kbGUpXHJcbiAgICBwcml2YXRlIGFzeW5jX2dldF9idW5kbGUoYnVuZGxlTmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghYnVuZGxlTmFtZSB8fCB0eXBlb2YgYnVuZGxlTmFtZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuO1xyXG4gICAgICAgIC8vIGNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGU6IEzhuqV5IGfDs2kgxJHDoyDEkcaw4bujYyB04bqjaS5cclxuICAgICAgICBjb25zdCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKGJ1bmRsZU5hbWUpO1xyXG4gICAgICAgIGlmIChidW5kbGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSBjYWxsYmFjayhidW5kbGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHThuqNpIGfDs2kgKGJ1bmRsZSkgdOG7qyBt4buZdCBVUkwgaG/hurdjIG3hu5l0IHRoxrAgbeG7pWMuXHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUoYnVuZGxlTmFtZSwgKGVycm9yOiBFcnJvciwgbG9hZGVkQnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoYENvbmZpZ01hbmFnZXItPmFzeW5jX2dldF9idW5kbGU6IGxvYWQgWyR7YnVuZGxlTmFtZX1dIGJ1bmRsZSBmYWlsZWQsYCwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coYENvbmZpZ01hbmFnZXItPmFzeW5jX2dldF9idW5kbGU6IGxvYWQgWyR7YnVuZGxlTmFtZX1dIGJ1bmRsZSBzdWNjZXNzZnVsbHkuYCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIGNhbGxiYWNrKGxvYWRlZEJ1bmRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0gLy8gZW5kOiBhc3luY19nZXRfYnVuZGxlXHJcbn1cclxuIl19