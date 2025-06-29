"use strict";
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