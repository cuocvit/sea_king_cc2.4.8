// @@
import { ConstantsData } from "./ConstantsData";
import { CsvReader } from "./CsvReader";
import { MapCell } from "../../common/configs/mapcell";
import { Build } from "../../common/configs/build";
import { ItemConfig } from "../../common/configs/item";
import { lvRandomConfig } from "../../common/configs/lv_random";
import { HeroConfig } from "../../common/configs/hero";
import { CaskConfig } from "../../common/configs/cask";
import { ShopConfig } from "../../common/configs/shop";
import { GuideConfig } from "../../common/configs/guide";
import { Special } from "../../common/configs/special";
import { SkillConfig } from "../../common/configs/skill";
import { StarConfig } from "../../common/configs/star";

import { PlayMap } from "../../common/configs/playmap";
import { PlayData } from "../../common/configs/playdata";
import { PlayCaves } from "../../common/configs/playcaves";
import { NamePool } from "../../common/configs/name_pool";
import { LadderBuildding } from "../../common/configs/ladder_building";
import { PoolConfig } from "../../common/configs/pool";
import { TaskConfig } from "../../common/configs/task";
import { BookConfig } from "../../common/configs/books";
import { FightMapItem } from "../../fight/scripts/FightMapItem";
import { DecorateConfig } from "../../common/configs/decorate";
import { LadderLVConfig } from "../../common/configs/ladder_lv";
import { LadderRewardConfig } from "../../common/configs/ladder_reward";
import { LadderAchievementConfig } from "../../common/configs/ladder_achievement";
import { SignConfig } from "../../common/configs/sign";
import { CavesLevel } from "../../common/configs/caveslevel";
import { RandomName } from "../../common/configs/random_name";
import { ConstantsConfig } from "../../common/configs/constants";
// export class ConfigListConfig {};

// @@
type CsvDataTypeBase = "string" | "integer" | "number" | "float";
type CsvDataTypeFull = CsvDataTypeBase | "array";

// @@
interface IConfigHead {
    field: string;
    comment: string;
    type: CsvDataTypeFull;
    is_key: boolean;
}

// @@
type ConfigDataTypeBase = string | number; // bổ sung boolean nếu các file csv có dữ liệu boolean.
type ConfigDataTypeObj = Record<string, ConfigDataTypeBase>;
type ConfigDataTypeArray = Array<ConfigDataTypeBase | ConfigDataTypeObj>;

// @
export type TConfigDataObject = Record<string, ConfigDataTypeBase | ConfigDataTypeArray>;
export interface RowDataArray {
    id: number;
    prop: number;
    section_a: number;
    section_b: number;
    weight: number;
}
export class Config {
    head: IConfigHead[] = [];
    data: MapCell | Record<string, Build> | Record<string, ItemConfig> | lvRandomConfig | HeroConfig | CaskConfig | Record<number, ShopConfig> | GuideConfig | Special | SkillConfig | StarConfig | ConstantsConfig;
    data_set: Record<string, ConfigDataObject[]> = {};
    primary_key_array: number[] = [];
}

export type ConfigDataObject = PlayMap | PlayData | PlayCaves | NamePool | LadderBuildding | PoolConfig | TaskConfig
export type ConfigData = HeroConfig | BookConfig | StarConfig | SkillConfig | Build | FightMapItem | DecorateConfig | ItemConfig | LadderLVConfig | LadderBuildding | LadderRewardConfig | LadderAchievementConfig | ShopConfig | SignConfig | CavesLevel | RandomName | TaskConfig
// @@ !!! type of cases
export class ConfigManager {
    // @@
    private static _instance: ConfigManager = null;
    private static readonly config_list_name: string = "config_list";
    private static readonly config_list_url: string = "configs/config_list";
    private static readonly constants_name: string = "constants";
    private static readonly constants_url: string = "configs/constants";

    // @@
    private readonly BUNDLE_NAME: string = "common";
    private readonly _config: Record<string, Config> = {};
    private _init_state: (0 | 1 | 2) = 0;

    // @@
    public static get instance(): ConfigManager {
        if (!this._instance) this._instance = new ConfigManager();
        return this._instance;
    }

    // @@
    public async_init(callback: () => void): void {
        if (this._init_state > 0) return;
        this._init_state = 1;
        this.async_get_bundle(this.BUNDLE_NAME, (loadedBundle: cc.AssetManager.Bundle) => {
            loadedBundle.load(ConfigManager.constants_url, cc.TextAsset, (error: Error, loadedTextAsset: cc.TextAsset) => {
                if (error) {
                    cc.error(`AssetManager.Bundle: load [${this.BUNDLE_NAME}/${ConfigManager.constants_url}] assets failed,`, error.message);
                    return;
                }
                // console.log("ConfigManager->async_ini: loadedTextAsset:", loadedTextAsset);
                this.parse_config(ConfigManager.constants_name, loadedTextAsset.text);
                this.parse_constants_config();
                //
                this.async_get_bundle(this.BUNDLE_NAME, (loadedBundle: cc.AssetManager.Bundle) => {
                    loadedBundle.load(ConfigManager.config_list_url, cc.TextAsset, (error: Error, loadedTextAsset: cc.TextAsset) => {
                        if (error) {
                            cc.error(`AssetManager.Bundle: load [${this.BUNDLE_NAME}/${ConfigManager.config_list_url}] assets failed,`, error.message);
                            return;
                        }
                        // console.log("ConfigManager->async_ini: config_list_url:", loadedTextAsset);
                        this.parse_config(ConfigManager.config_list_name, loadedTextAsset.text);
                        this._init_state = 2;
                        if (typeof callback === "function") callback();
                    });
                });
            });
        });
    } // end: async_init

    // @@
    private parse_constants_config(): void {
        const configData: Config = this.get_config_data(ConfigManager.constants_name);
        for (const key in configData.data) {
            const item = configData.data[key] as ConstantsConfig;
            if (typeof item.value !== "string") continue;
            let value: ConfigDataTypeBase;
            if (item.type === "integer") {
                value = parseInt(item.value);
            } else if (item.type === "float") {
                value = parseInt(item.value) / 10000;
            } else if (item.type === "string") {
                value = item.value;
            }
            ConstantsData.instance[key] = value;
        }
        // cc.log("parse_constants_config: ConstantsData.instance:", ConstantsData.instance);
    } // end: parse_constants_config

    // @@
    public load_all_config(callback: () => void): void {
        const keys: string[] = [];
        const loadUrls: string[] = [];
        const configList = this._config[ConfigManager.config_list_name].data;
        //
        for (const key in configList) {
            if (configList.hasOwnProperty(key)) {
                const item: TConfigDataObject = configList[key];
                if (typeof item.load_url !== "string") continue;
                loadUrls.push(item.load_url);
                keys.push(key);
            }
        }
        /* console.log("ConfigManager->load_all_config:keys:", keys, keys.length);
        console.log("ConfigManager->load_all_config:loadUrls:", loadUrls, loadUrls.length);
        console.log("ConfigManager->load_all_config:configList:", configList); */
        //
        this.async_get_bundle(this.BUNDLE_NAME, (loadedBundle: cc.AssetManager.Bundle) => {
            loadedBundle.load(loadUrls, cc.TextAsset, (error: Error, loadedTextAssets: cc.TextAsset[]) => {
                console.log("ConfigManager->load_all_config:loadedTextAssets:", loadedTextAssets);
                if (error) {
                    cc.error(`ConfigManager->load_all_config->AssetManager.Bundle: load assets failed,`, error.message);
                    return;
                }
                let assetArray: cc.TextAsset[] = [];
                if (Array.isArray(loadedTextAssets)) assetArray = assetArray.concat(loadedTextAssets);
                // console.log("ConfigManager->load_all_config:assetArray:", assetArray);
                for (let i = 0; i < loadUrls.length; i++) {
                    if (typeof assetArray[i] !== "object") continue;
                    // if (keys[i] !== "HeroConfigData") continue; // test
                    const content: string = assetArray[i].text;
                    this.parse_config(keys[i], content);
                }
                if (typeof callback === "function") callback();
            });
        });
    } // end: load_all_config

    // @@ (chuyển csv content string sang Config object)
    private parse_config(name: string, content: string): void {
        // console.log("ConfigManager->parse_config:11111:", name);
        if (!name || !content || typeof name !== "string" || typeof content !== "string") return;
        // create config object
        const config: Config = {
            head: [],
            data: {},
            data_set: {},
            primary_key_array: []
        };
        // create CsvReader
        const reader = new CsvReader();
        reader.init(content);
        // read headers
        reader.next();
        const fields: string[] = reader.rs.fieldsCopy();
        const headers: string[] = [];
        for (let i = 0; i < fields.length && fields[i] !== ""; i++) {
            headers.push(fields[i]);
            // nếu field (dòng đầu tiên) có 1 cột để trống sẽ gây ra lỗi sai vị trí cột các dòng tiếp theo.
        }
        // read comments
        reader.next();
        const comments: string[] = reader.rs.fieldsCopy();
        // read types
        reader.next();
        const types: string[] = reader.rs.fieldsCopy();
        // read keys
        reader.next();
        const keys: string[] = reader.rs.fieldsCopy();
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === "key") {
                config.primary_key_array.push(i);
            }
        }
        //
        for (let i = 0; i < headers.length; i++) {
            config.head[i] = {
                field: headers[i],
                comment: comments[i],
                type: types[i] as CsvDataTypeFull,
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
            const rowData: TConfigDataObject = {};
            for (let index = 0; index < headers.length; index++) {
                const header: IConfigHead = config.head[index];
                const value: string = reader.rs.field(index).trim();
                // console.log("config rowData[field, type, value]----:", header.field, header.type, value);
                if (header.type === "array") {
                    // console.log("ConfigManager->parse_config:array--------------:", name, header.field);
                    const parts = value.split("|"); // e.g: "0|1|2", "2|1|2"
                    if (parts.length !== 3) {
                        cc.error("ConfigManager->parse_config: array type field must have three values");
                    }
                    const rows: number = parseInt(parts[0].trim());
                    const cols: number = parseInt(parts[1].trim());
                    const depth: number = parseInt(parts[2].trim());
                    const array: ConfigDataTypeArray = [];
                    // if (cols > 1) console.log("ConfigManager->parse_config:array:cols:", value);
                    index++;
                    for (let j = 0; j < rows; j++) {
                        let item: ConfigDataTypeBase | ConfigDataTypeObj = {};
                        for (let k = 0; k < cols; k++) {
                            const field: IConfigHead = config.head[index];
                            const fieldValue = reader.rs.field(index).trim();
                            const parsedValue: ConfigDataTypeBase = this.parse_simple_field(field.type as CsvDataTypeBase, fieldValue);
                            if (cols > 1) {
                                item[field.field] = parsedValue;
                            } else {
                                item = parsedValue;
                            }
                            array[j] = item;
                            index++;
                        }
                    }
                    rowData[header.field] = array;
                    index += (depth - rows) * cols;
                    index--;
                } else {
                    if (!["string", "integer", "number", "float"].includes(header.type)) {
                        console.error(`ConfigManager->parse_config: [${header.type}] unsupported field types!`);
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
            let dataKey = "";
            for (let i = 0; i < config.primary_key_array.length; i++) {
                const keyIndex = config.primary_key_array[i]; // e.g: 0
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
        if (name === "GuideConfigData") console.log("ConfigManager->parse_config:2222:", name, config);
    } // end: parse_config


    // @@ (nếu type là "number|integer|float" value rỗng sẽ trả về NaN)
    private parse_simple_field(type: CsvDataTypeBase, value: string): ConfigDataTypeBase {
        if (type === "number") {
            return parseInt(value);
        } else if (type === "integer") {
            return Math.floor(parseInt(value));
        } else if (type === "float") {
            return Math.floor(parseInt(value)) / 10000;
        } else { // type === "string";
            return value;
        }
    } // end: parse_simple_field

    // @@
    public get_row_data(name: string, ...keys: string[]): ConfigData | null {
        if (!name || typeof name !== "string" || keys.length <= 0) return null;
        const config: Config = this._config[name];
        if (!config) {
            cc.error(`ConfigManager->get_row_data: not find [${name}] config`);
            return null;
        }
        let dataKey = "";
        for (let i = 0; i < keys.length; i++) {
            dataKey += keys[i];
            if (i < keys.length - 1) dataKey += "@";
        }
        if (config.data[dataKey]) return config.data[dataKey];
        cc.error(`ConfigManager->get_row_data: not find data from [${name}] config which primary key is "${dataKey}"`);
        return null;
    }

    // @@ !!! type of cases
    public get_random_case(cases: Array<{ weight: number; prop: number }>): number {
        if (!Array.isArray(cases) || cases.length <= 0) return 0;
        let totalWeight = 0;
        const cumulativeWeights: number[] = [];
        for (let i = 0; i < cases.length; i++) {
            totalWeight += cases[i].weight;
            cumulativeWeights.push(totalWeight);
        }
        const randomValue = Math.random() * totalWeight;
        for (let i = 0; i < cumulativeWeights.length; i++) {
            if (randomValue < cumulativeWeights[i]) {
                return cases[i].prop;
            }
        }
        return cases[0].prop;
    } // end: get_random_case

    // @@ !!! type of cases
    public get_random_case_data(cases: PoolConfig[]): PoolConfig {
        // public get_random_case_data(cases: TConfigDataObject[]): any {
        if (!Array.isArray(cases) || cases.length <= 0) return null;
        let totalWeight = 0;
        const cumulativeWeights: number[] = [];
        for (let i = 0; i < cases.length; i++) {
            totalWeight += cases[i].weight;
            cumulativeWeights.push(totalWeight);
        }
        const randomValue = Math.random() * totalWeight;
        for (let i = 0; i < cumulativeWeights.length; i++) {
            if (randomValue < cumulativeWeights[i]) {
                return cases[i];
            }
        }
        return cases[0];
    } // end: get_random_case_data

    public get_row_data_array(name: string, ...keys: string[]): ConfigDataObject[] {
        const config: Config = this._config[name];

        if (!config) {
            cc.error(`ConfigManager->get_row_data_array: not find ${name} config`);
            return [];
        }
        let dataKey: string = "";
        for (let i = 0; i < keys.length; i++) {
            dataKey += keys[i] + "@";
        }
        let dataArray: ConfigDataObject[] = config.data_set[dataKey];
        if (!dataArray) {
            config.data_set[dataKey] = dataArray = [];
            for (const key in config.data) {
                if (key.indexOf(dataKey) === 0) { // or key.startsWith(dataKey)
                    dataArray.push(config.data[key]);
                } else if (dataArray.length > 0) {
                    break;
                }
            }
        }
        return dataArray;
    }

    // @@
    public get_config_data(name: string): Config {
        if (this._config[name]) {
            return this._config[name];
        }
        cc.error(`ConfigManager->get_config_data: not find [${name}] config`);
        return {} as Config;
    }

    // @@ (giống Utils.async_get_bundle)
    private async_get_bundle(bundleName: string, callback: (bundle: cc.AssetManager.Bundle) => void): void {
        if (!bundleName || typeof bundleName !== "string") return;
        // cc.assetManager.getBundle: Lấy gói đã được tải.
        const bundle: cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName);
        if (bundle) {
            if (typeof callback === "function") callback(bundle);
            return;
        }
        // tải gói (bundle) từ một URL hoặc một thư mục.
        cc.assetManager.loadBundle(bundleName, (error: Error, loadedBundle: cc.AssetManager.Bundle) => {
            if (error) {
                cc.error(`ConfigManager->async_get_bundle: load [${bundleName}] bundle failed,`, error.message);
            } else {
                cc.log(`ConfigManager->async_get_bundle: load [${bundleName}] bundle successfully.`);
                if (typeof callback === "function") callback(loadedBundle);
            }
        });
    } // end: async_get_bundle
}
