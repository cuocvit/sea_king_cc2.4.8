// import { saveAs } from 'file-saver';
// import { FileSaver } from './FileSaver';
import { saveAs } from './FileSaver';
//
import { EventEmitter } from './EventEmitter';
import { ServerData } from './ServerData';
import { MainData } from './MainData';
import { ConfigData } from './ConfigData';
import { RecordData } from './RecordData';
import { FightData } from './FightData';
import { FightTempData } from './FightTempData';
import { LadderData } from './LadderData';
import { LadderTempData } from './LadderTempData';
import { TurtleExchangeData } from './TurtleExchangeData';
import { SuperHeroTimer } from './SuperHeroTimer';
import { BundleName, BuildTypeEnum } from './Constants';
import { SignData } from './SignData';
import { MailTempData, MailLogItemData, MailInboxItemData } from './MailTempData';
import { Utils } from './Utils';
import { LuckyWheelData } from './LuckyWheelData';
import { WeakGuide, Direction } from './WeakGuide';
import { HeroStarData } from './HeroStarData';
import { gm } from './GameManager';
import { BuildData, MapCellCfgData, RoleItemDataVO } from './MapCellCfgData';
import { TaskData } from './TaskData';
import { StartData } from './StartData';
import { StoreData } from './StoreData';
import { SettingsData } from './SettingsData';
import { NetUtils, ReportData } from './NetUtils';
import { SignConfig } from '../../common/configs/sign';
import { HeroConfig } from '../../common/configs/hero';
import { LadderLVConfig } from '../../common/configs/ladder_lv';
import { ItemConfig } from '../../common/configs/item';
import { LadderRewardConfig } from '../../common/configs/ladder_reward';
import { LadderBuildding } from '../../common/configs/ladder_building';
import { StorageBase } from './StorageBase';
import { PoolConfig } from '../../common/configs/pool';
// import { StorageManager } from './StorageManager';

// @
interface fightTempData {
  play_type: number;
  map_id: number;
  map_data_id: number;
  boat_id: number;
  name: string;
}

interface mapReportItem {
  cell_id: number;
  skill_lv: number;
  star_lv: number;
  item_type: number;
  item_id: number;
  unique_id: number;
  hero_id?: number;
}

interface heroDefense {
  unique_id: number;
  hero_id: number;
  skill_lv: number;
  star_lv: number;
};

export enum FightState {
  NONE = 0,
  RUN = 1,
  PAUSE = 2,
  SUCCESS = 3,
  FAIL = 4
};



export interface request {
  uid: string;
  token: string;
  op_type?: string;
  star?: number;
  data?: string;
  arch_data?: string;
  arch_score?: number;
  target_uid?: string;
  nickname?: string;
  change_star?,
  target_nickname?,
  target_star?,
  target_change_star?,
  op_result?,
  op_reward?: string,
  op_loss_reward?: string,
  op_battle?: string,
  target_op_battle?: string;
  replay_id?: number
  is_deduct_loss_reward?: number;
}
// !!!

//
export class DataManager {
  // @
  private static _instance: DataManager | null = null;
  // @ private
  private init_callback: () => void;
  private total_num: number;
  private current_num: number;
  private last_error_content: string;
  private error_content: string;

  // @ public
  public is_init: boolean; // (not use)
  public event_emitter: EventEmitter;
  public server_data: ServerData;
  public main_data: MainData;
  public config_data: ConfigData;
  public record_data: RecordData;
  public start_data: StartData;
  public fight_data: FightData;
  public fight_temp_data: FightTempData;
  public mapCell_data: MapCellCfgData;
  public store_data: StoreData;
  public task_data: TaskData;
  public turtle_exchange_data: TurtleExchangeData;
  public ladder_data: LadderData;
  public ladder_temp_data: LadderTempData;
  public sign_data: SignData;
  public settings_data: SettingsData;
  public mail_temp_data: MailTempData;
  public lucky_wheel_data: LuckyWheelData;
  public hero_star_data: HeroStarData;
  public design_resolution: cc.Vec2;

  // @
  constructor() {
    this.is_init = false;
    this.event_emitter = new EventEmitter();
    this.total_num = 0;
    this.current_num = 0;
    this.last_error_content = "";
    this.error_content = "";
  }

  // @
  public static get instance(): DataManager {
    if (!this._instance) {
      this._instance = new DataManager();
    }
    return this._instance;
  }

  // @
  public priority_init(callback: () => void): void {
    this.server_data = ServerData.get_instance() as ServerData;
    this.main_data = MainData.get_instance() as MainData;
    this.main_data.async_read_data(() => {
      callback();
    });
  }

  // @
  public init(callback: () => void): void {
    this.config_data = new ConfigData();
    this.config_data.initAllCfg();
    this.init_callback = callback;
    this.record_data = RecordData.get_instance();
    this.total_num++;
    this.start_data = StartData.get_instance<StartData>();
    this.total_num++;
    this.fight_data = FightData.get_instance();
    this.fight_temp_data = FightTempData.get_instance();
    this.total_num++;
    this.mapCell_data = MapCellCfgData.get_instance();
    this.total_num++;
    this.store_data = StoreData.get_instance();
    this.total_num++;
    this.task_data = TaskData.get_instance();
    this.total_num++;
    this.turtle_exchange_data = TurtleExchangeData.get_instance();
    this.total_num++;
    this.ladder_data = LadderData.get_instance();
    this.ladder_temp_data = LadderTempData.get_instance();
    this.total_num++;
    this.sign_data = SignData.get_instance();
    this.total_num++;
    this.settings_data = SettingsData.get_instance();
    this.total_num++;
    this.mail_temp_data = MailTempData.get_instance();
    this.lucky_wheel_data = LuckyWheelData.get_instance();
    this.total_num++;
    this.hero_star_data = HeroStarData.get_instance();
    this.total_num++;
    //
    this.record_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.start_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.fight_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.mapCell_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.store_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.ladder_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.task_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.turtle_exchange_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.sign_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.settings_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.lucky_wheel_data.async_read_data(() => {
      this.check_read_all_data_complete();
    });
    this.hero_star_data.async_read_data((t) => {
      this.check_read_all_data_complete();
    });
    //
    new SuperHeroTimer().init();
  } // end: init

  // @
  public clear_store_data(): void {
    console.log("MainData---------", MainData.get_instance<MainData>().STORAGE_KEY);
    console.log("StartData--------", StartData.get_instance<StartData>().STORAGE_KEY);
    MainData.get_instance<MainData>().async_delete_data();
    StartData.get_instance<StartData>().async_delete_data();
    RecordData.get_instance<RecordData>().async_delete_data();
    StoreData.get_instance<StoreData>().async_delete_data();
    LadderData.get_instance<LadderData>().async_delete_data();
    TaskData.get_instance<TaskData>().async_delete_data();
    TurtleExchangeData.get_instance<TurtleExchangeData>().async_delete_data();
    MapCellCfgData.get_instance<MapCellCfgData>().async_delete_data();
    FightData.get_instance<FightData>().async_delete_data();
    SignData.get_instance<SignData>().async_delete_data();
    SettingsData.get_instance<SettingsData>().async_delete_data();
    LuckyWheelData.get_instance<LuckyWheelData>().async_delete_data();
    HeroStarData.get_instance<HeroStarData>().async_delete_data();
    ReportData.instance.clear_data();
    NetUtils.remove_uuid();
    gm.ui.show_notice(gm.const.TEXT_1);
  }

  // @ (used for debugging)
  public export_data(): void {
    const data = {
      error_log: this.export_error_log(),
      store_data: this.export_store_data(),
      fight_data: this.export_fight_data()
    };

    if (cc.sys.isBrowser) {
      const jsonData = JSON.stringify(data);
      const blob = new Blob([jsonData], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'debugging-data.txt');
    } else {
      const jsonStoreData = JSON.stringify(data.store_data);
      for (let i = 0; i < jsonStoreData.length; i += 1000) {
        console.log(jsonStoreData.substr(i, Math.min(1000, jsonStoreData.length - i)));
      }
      console.error('Non-browser platforms cannot export data');
    }
  }

  // @
  public catch_error_log(isEnabled: boolean = false): void {
    if (window.onerror) return;
    if (!isEnabled) {
      window.onerror = function () { };
      return;
    }
    const self = this;
    window.onerror = function (message: string, source: string, lineno: number, colno: number, error: Error) {
      let errorMessage = message + ">>" + source + ":" + lineno;
      if (arguments.length > 3) {
        errorMessage += " " + colno + " stack:";
        errorMessage += error.stack.substr(0, Math.max(Math.min(10240 - errorMessage.length, error.stack.length), 0));
      }
      if (self.error_content === errorMessage) return true;
      self.last_error_content = self.error_content;
      self.error_content = errorMessage;
      return false;
    }.bind(self);
  }

  // @
  private export_error_log(): { error_content: string; last_error_content: string } {
    return {
      error_content: this.error_content,
      last_error_content: this.last_error_content
    };
  }

  // @
  public export_store_data(): { [key: string]: StorageBase | string } {
    const data: { [key: string]: StorageBase | string } = {};
    data[this.main_data.PREFIX + this.main_data.STORAGE_KEY] = this.main_data;
    data[this.start_data.PREFIX + this.start_data.STORAGE_KEY] = this.start_data;
    data[this.record_data.PREFIX + this.record_data.STORAGE_KEY] = this.record_data;
    data[this.store_data.PREFIX + this.store_data.STORAGE_KEY] = this.store_data;
    data[this.ladder_data.PREFIX + this.ladder_data.STORAGE_KEY] = this.ladder_data;
    data[this.task_data.PREFIX + this.task_data.STORAGE_KEY] = this.task_data;
    data[this.turtle_exchange_data.PREFIX + this.turtle_exchange_data.STORAGE_KEY] = this.turtle_exchange_data;
    data[this.mapCell_data.PREFIX + this.mapCell_data.STORAGE_KEY] = this.mapCell_data;
    data[this.fight_data.PREFIX + this.fight_data.STORAGE_KEY] = this.fight_data;
    data[this.settings_data.PREFIX + this.settings_data.STORAGE_KEY] = this.settings_data;
    data[NetUtils.PREFIX + NetUtils.STORAGE_KEY] = gm.channel.get_device_id();
    data.P2_UID = gm.data.server_data.uid;
    data.P2_ReportData = cc.sys.localStorage.getItem("P2_ReportData");
    return data;
  }

  // @, type !!!
  private export_fight_data(): fightTempData {
    const fightTempData = gm.data.fight_temp_data;
    return {
      play_type: fightTempData.play_type,
      map_id: fightTempData.map_id,
      map_data_id: fightTempData.map_data_id,
      boat_id: fightTempData.boat_id,
      name: fightTempData.name
    };
  }

  // @
  private check_read_all_data_complete(): void {
    this.current_num++;
    if (this.current_num >= this.total_num) {
      this.check_reset_data();
      this.is_init = true;
      if (this.init_callback) this.init_callback();
    }
  }

  // @
  private check_reset_data(): void {
    const currentDate = new Date();
    let currentTime = Math.floor(currentDate.getTime() / 1000);
    currentTime = currentTime - (currentTime - 60 * currentDate.getTimezoneOffset()) % 86400;
    if (currentTime < this.sign_data.next_day_time) return;
    //
    const daysPassed = Math.ceil((currentTime - this.sign_data.next_day_time) / 86400) + 1;
    this.sign_data.sign_day += daysPassed;
    this.sign_data.next_day_time = 86400 + currentTime;
    this.sign_data.sign_state = 0;
    //
    if (this.sign_data.sign_day > 0) {
      for (let i = 0; i < SignData.SIGN_LOOP_DAY; i++) {
        const signDataItem = this.sign_data.sign_data_array[i];
        signDataItem.array_index = i;
        signDataItem.day = (this.sign_data.sign_day + i + 1) % SignData.MAX_DAY_COUNT;
        signDataItem.state = i === 0 ? 1 : 0;
        const configData = gm.config.get_row_data("SignConfigData", signDataItem.day.toString()) as SignConfig;
        if (configData) signDataItem.reward_array = configData.reward_array;
      }
      //
      for (let i = 0; i < SignData.MAX_BUY_COUNT; i++) {
        const signBuyDataItem = this.sign_data.sign_buy_data_array[i];
        signBuyDataItem.array_index = i;
        signBuyDataItem.state = 1;
        const configData = gm.config.get_row_data("SignConfigData", (this.sign_data.sign_day + 1).toString()) as SignConfig;
        if (configData) signBuyDataItem.reward_data = configData.other_reward_array[i];
      }
    }
    //
    this.sign_data.async_write_data();
    this.lucky_wheel_data.left_lucky_wheel_free_count = gm.const.MAX_LUCKY_WHEEL_FREE_COUNT;
    this.lucky_wheel_data.left_lucky_wheel_video_count = gm.const.MAX_LUCKY_WHEEL_VIDEO_COUNT;
    this.lucky_wheel_data.last_reward_index = 0;
    this.lucky_wheel_data.free_timestamp = Date.now() + gm.const.FREE_DRAW_TIME_INTERVAL;
    this.lucky_wheel_data.async_write_data();
    this.record_data.share_record_count = 0;
    this.record_data.left_push_share_count = gm.const.MAX_PUSH_SHARE_COUNT;
    this.record_data.async_write_data();
    this.main_data.left_share_count = gm.const.MAX_VIDEO_FAIL_SHARE_COUNT;
    this.main_data.is_today_no_ad = false;
    this.main_data.left_free_super_recruit_count = gm.const.MAX_FREE_SUPER_RECRUIT_COUNT;
    this.main_data.async_write_data();
  }

  // @ (not use)
  // public reset_daily_data(): void {}

  // @ (not use)
  /* public print_debug_info(): void {
      StorageManager.instance.print_debug_info();
  } */

  // @, type !!!
  public show_weak_guide(target: cc.Node, position: cc.Vec3, content: string, disappearTime: number, callback: (() => void) | null = null): void {
    if (target.getChildByName("weak_guide")) return;
    gm.pool.async_get(BundleName.COMMON, "prefabs/weak_guide", WeakGuide, (instance) => {
      if (target.getChildByName("weak_guide")) return;
      instance.node.position = position;
      instance.data = {
        tip_content: content,
        tip_offset: cc.v3(-50, 23),
        dir: Direction.RIGHT,
        disappear_time: disappearTime,
        target: target,
        callback: callback
      };
      target.addChild(instance.node);
    });
  }

  // @, type !!!! items: { prop: number; weight: number }[]
  public setRandomReward(items: PoolConfig[], rewards: RoleItemDataVO[], count: number = 1): void {
    let totalWeight: number = 0;
    const cumulativeWeights: [number, number][] = [];
    for (const item of items) {
      totalWeight += item.weight;
      cumulativeWeights.push([item.prop, totalWeight]);
    }
    while (rewards.length < count) {
      const randomWeight = Math.floor(Math.random() * totalWeight);
      for (let [prop, weight] of cumulativeWeights) {
        if (randomWeight <= weight) {
          const rewardItem = new RoleItemDataVO();
          rewardItem.itemType = prop < 30000 ? 1 : 3;
          rewardItem.itemID = prop;
          rewards.push(rewardItem);
          break;
        }
      }
    }
  }

  // @, type!!!
  public update_player_data_request(callback?: () => void): void {
    const garrisonData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
    if (!garrisonData || garrisonData.buildLvl < 1) return;
    const mapCellData = gm.data.mapCell_data;
    const mapReportData = mapCellData.role_map_report_data;
    //
    const mapReportItems: mapReportItem[] = [];
    const mapReportMap: Record<number, mapReportItem> = {};
    const heroDataArray: heroDefense[] = [];
    const seagoingBoatData = mapCellData.getBuildDataByType(BuildTypeEnum.SEAGOINGBOAT_TYPE);
    const boatId = seagoingBoatData ? seagoingBoatData.buildID : 60001;
    const itemDataMap: Record<number, { item_id: number, item_num: number }> = {};
    const emptyCells: number[] = [];
    const specialCells: number[] = [224, 233, 234, 210, 211, 212, 222, 223, 189];
    const normalCells: number[] = [208, 209, 200, 201, 187, 188];

    // for1
    for (let i = 0; i < mapReportData.length; i++) {
      const cellId = mapReportData[i];
      if (specialCells.indexOf(cellId) > -1) continue;
      const cellData = mapCellData.role_map_data[cellId];
      const mapReport_Item: mapReportItem = {
        cell_id: cellId,
        skill_lv: 0,
        star_lv: 0,
        item_type: 0,
        item_id: 0,
        unique_id: 0
      };
      //
      if (cellData) {
        if (cellData.cellState === 2) {
          if (cellData.itemType === 3 && cellData.itemID > 0) {
            const heroConfig = gm.config.get_row_data("HeroConfigData", cellData.itemID.toString()) as HeroConfig;
            if (heroConfig.occupation > 0) {
              const heroStarData = gm.data.hero_star_data.getHeroStarData(heroConfig.arms);
              mapReport_Item.star_lv = heroStarData ? heroStarData.star : 0;
              if (heroConfig.occupation === 10) {
                mapReport_Item.item_type = cellData.itemType,
                  mapReport_Item.item_id = cellData.itemID,
                  mapReport_Item.skill_lv = gm.data.mapCell_data.getRoleSkillData(heroConfig.skill_id).lvl,
                  mapReport_Item.unique_id = cellData.heroUID;
              } else if (heroConfig.occupation === 12) {
                mapReport_Item.item_type = cellData.itemType,
                  mapReport_Item.item_id = cellData.itemID,
                  mapReport_Item.skill_lv = heroConfig.lv,
                  mapReport_Item.unique_id = cellData.heroUID;
              } else if (gm.data.mapCell_data.getHeroDefanseDataByHeroUID(cellData.heroUID)) {
                const skill_lv = heroConfig.hero_type === 1 ? heroConfig.lv : gm.data.mapCell_data.getRoleSkillData(heroConfig.skill_id).lvl;
                const heroDefenseData: heroDefense = {
                  unique_id: cellData.heroUID,
                  hero_id: cellData.itemID,
                  skill_lv: skill_lv,
                  star_lv: mapReport_Item.star_lv
                }; //  as { unique_id: string; hero_id: string; skill_lv: number; star_lv: number }
                heroDataArray.push(heroDefenseData);
                //
                mapReport_Item.item_type = cellData.itemType;
                mapReport_Item.item_id = cellData.itemID;
                mapReport_Item.skill_lv = skill_lv;
                mapReport_Item.unique_id = cellData.heroUID;
              }
            }
          } else if (cellData.itemType === 2 && cellData.itemID > 0) {
            const buildConfig = gm.data.config_data.getBuildCfgByID(cellData.itemID);
            if ((cellData.itemID < 57000 || cellData.itemID >= 58000) && buildConfig && buildConfig.buildLv > 0) {
              mapReport_Item.item_type = cellData.itemType;
              mapReport_Item.item_id = cellData.itemID;
            } else {
              mapReport_Item.item_type = 0;
              mapReport_Item.item_id = 0;
              emptyCells.push(cellId);
            }
          } else { // phần này AI luôn sai
            if (cellData.itemType === 1) {
              if ((cellData.itemID >= 12001 && cellData.itemID <= 18011) || (cellData.itemID >= 25001 && cellData.itemID <= 25008)) {
                const lowLevelProp = this.high_to_low_level_prop(cellData.itemID, 1);
                if (lowLevelProp.item_id > 0 && lowLevelProp.item_num > 0) {
                  const itemData = itemDataMap[lowLevelProp.item_id] || { item_id: lowLevelProp.item_id, item_num: 0 }
                  itemData.item_num += lowLevelProp.item_num;
                  itemDataMap[lowLevelProp.item_id] = itemData;
                }
              } else {
                mapReport_Item.item_type = 0;
                mapReport_Item.item_id = 0;
              }
            }
            emptyCells.push(cellId);
          }
        }
      } else {
        const mapCellConfig = gm.data.config_data.getMapCellCfgByID(cellId);
        mapReport_Item.item_type = mapCellConfig.itemType;
        mapReport_Item.item_id = mapCellConfig.itemID;
      }
      mapReportItems.push(mapReport_Item);
      mapReportMap[mapReport_Item.cell_id] = mapReport_Item;
    } // end: for1

    // @ for2
    for (let i = 0; i < normalCells.length; i++) {
      const cellId = normalCells[i];
      const mapReport_Item = mapReportMap[cellId];
      if (mapReport_Item && emptyCells.length > 0) {
        const randomIndex = Utils.math_random(true, 0, emptyCells.length);
        const emptyCellId = emptyCells.splice(randomIndex, 1)[0];
        const emptyCellReportItem = mapReportMap[emptyCellId];
        if (emptyCellReportItem) {
          emptyCellReportItem.item_type = mapReport_Item.item_type;
          emptyCellReportItem.item_id = mapReport_Item.item_id;
        }
        delete mapReportMap[emptyCellId];
      }
    } // end: for2

    // @
    const ladderLevel = gm.data.ladder_temp_data.convert_rank_to_lv(gm.data.ladder_temp_data.rank);
    const ladderLv = gm.config.get_row_data("LadderLvConfigData", ladderLevel.toString()) as LadderLVConfig
    const propRatio = ladderLv.prop_ratio;

    // @ for3
    for (const itemId in itemDataMap) {
      const itemData = itemDataMap[itemId];
      const propMap = gm.const.MAP_REPORT_PROP_MAP[itemData.item_id];
      if (propMap) {
        itemData.item_num = Math.min(propMap.max_num, Math.ceil(itemData.item_num * propRatio));
      } else {
        itemData.item_num = 1;
        // 出现了未设置最大上限值的道具,道具数量强制改为1
        console.error("There is an item without a maximum limit, the item quantity is forcibly changed to 1");
      }
      console.log("Before conversion:", JSON.stringify(itemData));
      const highLevelProps = this.low_level_to_high_prop(itemData.item_id, itemData.item_num);
      console.log("After conversion:", JSON.stringify(highLevelProps));
      for (let i = 0; i < highLevelProps.length; i++) {
        const highLevelProp = highLevelProps[i];
        for (let j = 0; j < highLevelProp.item_num; j++) {
          if (emptyCells.length > 0) {
            const randomIndex = Utils.math_random(true, 0, emptyCells.length);
            const emptyCellId = emptyCells.splice(randomIndex, 1)[0];
            const emptyCellReportItem = mapReportMap[emptyCellId];
            if (emptyCellReportItem) {
              emptyCellReportItem.item_type = 1;
              emptyCellReportItem.item_id = highLevelProp.item_id;
            }
          }
        }
      }
    } // end: for3

    // @
    const playerData = {
      uid: gm.data.server_data.uid,
      nickname: gm.data.server_data.nickname,
      star: gm.data.ladder_temp_data.total_star,
      hero_data_array: heroDataArray,
      map_data_array: mapReportItems,
      boat_id: boatId
    };

    // @
    const requestParams = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token
    };
    // @
    const requestData: request = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token,
      op_type: "defensive_data",
      star: gm.data.ladder_temp_data.total_star,
      data: JSON.stringify(playerData)
    };
    // @
    this.server_data.update_player_data_request((result) => {
      if (result.ResultCode === 0) {
        console.log("Player data updated successfully"); // 更新玩家数据成功
        if (callback) callback();
      }
    }, requestParams, requestData);
  } // end: update_player_data_request

  // @, type!!!
  public low_level_to_high_prop(itemId: number, itemNum: number): { item_id: number, item_num: number }[] {
    const result: { item_id: number, item_num: number }[] = [];
    const itemConfig: ItemConfig | undefined = gm.config.get_row_data("ItemConfigData", itemId.toString()) as ItemConfig;
    //
    if (itemConfig) {
      if (itemConfig.lv > 0) {
        let remainingNum = itemNum;
        for (let level = 4; level >= 1; level--) {
          const highLevelItemId = itemId + level - 1;
          const highLevelItemConfig = gm.config.get_row_data("ItemConfigData", highLevelItemId.toString()) as ItemConfig;
          if (highLevelItemConfig) {
            const maxNum = Math.max(1, highLevelItemConfig.number);
            const count = Math.floor(remainingNum / maxNum);
            remainingNum %= maxNum;
            if (count > 0) {
              result.push({ item_id: highLevelItemId, item_num: count });
            }
          }
        }
      } else {
        result.push({ item_id: itemId, item_num: itemNum });
      }
    }
    return result;
  } // end: low_level_to_high_prop

  // @
  public high_to_low_level_prop(itemId: number, itemNum: number): { item_id: number, item_num: number } {
    const result = { item_id: 0, item_num: 0 };
    const itemConfig: ItemConfig | undefined = gm.config.get_row_data("ItemConfigData", itemId.toString()) as ItemConfig;
    //
    if (itemConfig) {
      if (itemConfig.lv > 0) {
        const maxNum = Math.max(1, itemConfig.lv);
        result.item_id = itemConfig.id - maxNum + 1;
        result.item_num = Math.max(1, itemConfig.number) * itemNum;
      } else {
        result.item_id = itemId;
        result.item_num = itemNum;
      }
    }
    return result;
  } // end: high_to_low_level_prop

  // @, type !!!!
  public update_player_fight_data(
    change_star: number,
    target_uid: string,
    target_nickname: string,
    target_star: number,
    target_change_star: number,
    op_result: number,
    op_reward: { id: number, num: number }[],
    op_loss_reward: { id: number, num: number }[],
    op_battle: { unique_id: number, id: number, hp: number }[],
    target_op_battle: { unique_id: number, id: number, hp: number }[]
  ): void {
    const params: request = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token
    };
    //
    const data: request = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token,
      nickname: gm.data.server_data.nickname,
      star: gm.data.ladder_temp_data.total_star,
      change_star,
      target_uid,
      target_nickname,
      target_star,
      target_change_star,
      op_type: "2",
      op_result,
      op_reward: JSON.stringify(op_reward),
      op_loss_reward: JSON.stringify(op_loss_reward),
      op_battle: JSON.stringify(op_battle),
      target_op_battle: JSON.stringify(target_op_battle)
    };
    //
    this.server_data.update_player_fight_data((response) => {
      if (response.ResultCode === 0) {
        console.log("Report combat data successfully");
      }
    }, params, data);
  } // end: update_player_fight_data

  // @ (not use)
  /* public get_player_data_request(): void {
    const requestData = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token,
      op_type: "defensive_data"
    };
    //
    this.server_data.get_player_data_request((response) => {
      if (response.ResultCode === 0 && response.data) {
        try {
          const data = JSON.parse(response.data.defensive_data);
          console.log(data);
          console.log("Get data successfully"); // 获取数据成功
        } catch (error) {
          console.error(error);
        }
      }
    }, requestData);
  } */

  // @, type!!!
  public get_player_score_data_request(callback?: () => void): void {
    const requestData: request = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token,
      op_type: "score"
    };
    //
    this.server_data.get_player_data_request((response) => {
      if (response.ResultCode === 0 && response.data) {
        try {
          const data = JSON.parse(response.data);
          gm.data.ladder_temp_data.total_star = data.scores;
          gm.data.ladder_temp_data.rank = data.rank || 0;
          gm.data.ladder_temp_data.arch_rank = data.arch_rank || 0;
          gm.data.ladder_temp_data.castle_level = data.castle_level || 0;
          gm.data.event_emitter.emit(ServerData.EVENT_DATA_CHANGE);
          // gm.data.event_emitter <=> this.event_emitter.emit(ServerData.EVENT_DATA_CHANGE);
          console.log("Get data successfully"); // 获取数据成功
          if (callback) callback();
        } catch (error) {
          console.error(error);
        }
      }
    }, requestData);
  } // end: get_player_score_data_request

  // @, type!!!
  public update_player_score_data_request(star: number, callback?: () => void): void {
    const garrisonData: BuildData | undefined = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
    if (!garrisonData || garrisonData.buildLvl < 1) return;
    //
    let totalBuildLevel = 0;
    let towerLevel = 0;
    let barracksLevel = 0;
    let garrisonLevel = 0;
    let seagoingBoatLevel = 0;
    let wharfTaxLevel = 0;
    let privateHousingLevel = 0;
    //
    const buildData = gm.data.mapCell_data.buildData;
    for (const buildType in buildData) {
      const build = buildData[buildType];
      if (!build) continue;
      totalBuildLevel += build.buildLvl;
      if (buildType == BuildTypeEnum.TOWER_TYPE.toString()) {
        towerLevel = build.buildLvl;
      } else if (buildType == BuildTypeEnum.BARRACKS_TYPE.toString()) {
        barracksLevel = build.buildLvl;
      } else if (buildType == BuildTypeEnum.GARRISION_TYPE.toString()) {
        garrisonLevel = build.buildLvl;
      } else if (buildType == BuildTypeEnum.SEAGOINGBOAT_TYPE.toString()) {
        seagoingBoatLevel = build.buildLvl;
      } else if (buildType == BuildTypeEnum.WHARFTAX_TYPE.toString()) {
        wharfTaxLevel = build.buildLvl;
      } else if (buildType == BuildTypeEnum.PRIVATEHOUSING_TYPE.toString()) {
        privateHousingLevel = build.buildLvl;
      }
    }
    //
    const requestParams = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token
    };
    //
    const requestData: request = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token,
      op_type: "score",
      star: star,
      data: JSON.stringify({
        level: 0,
        scores: star
      }),
      arch_data: JSON.stringify({
        castle: towerLevel,
        camp: barracksLevel,
        defense: garrisonLevel,
        boat: seagoingBoatLevel,
        tower: wharfTaxLevel,
        house: privateHousingLevel
      }),
      arch_score: totalBuildLevel
    };
    //
    this.server_data.update_player_data_request((response) => {
      if (response.ResultCode === 0) {
        console.log("Player star data updated successfully"); // 更新玩家星星数据成功
        if (callback) callback();
      }
    }, requestParams, requestData);
  } // end: update_player_score_data_request

  // @, type!!!
  public match_player(targetUid: string = ""): void {
    const params: request = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token,
      star: gm.data.ladder_temp_data.total_star,
      target_uid: targetUid
    };
    //
    gm.data.server_data.match_players((response: any) => {
      const fightTempData = gm.data.fight_temp_data;
      if (response.ResultCode === 0) {
        console.log("Player matched successfully"); // 匹配玩家成功
        fightTempData.goal_uid = response.data.goal_uid;
        console.log("target_uid:" + fightTempData.goal_uid);
        //
        try {
          fightTempData.defensive_data = JSON.parse(response.data.player_data.defensive_data);
          if (!fightTempData.defensive_data.hasOwnProperty("uid") || !fightTempData.defensive_data.hasOwnProperty("map_data_array")) {
            fightTempData.defensive_data = {
              uid: "",
              nickname: "",
              star: 0,
              boat_id: 0,
              map_data_array: [],
              hero_data_array: []
            };
            cc.error("Matching player data exception"); // 匹配玩家数据异常
            fightTempData.goal_uid = "";
            fightTempData.match_map_by_ladder_lv();
          }
        } catch (error) {
          cc.error("Match player data parsing failed"); // 匹配玩家数据解析失败
          fightTempData.defensive_data = {
            uid: "",
            nickname: "",
            star: 0,
            boat_id: 0,
            map_data_array: [],
            hero_data_array: []
          };
          fightTempData.goal_uid = "";
          fightTempData.match_map_by_ladder_lv();
        }
        //
        fightTempData.play_type = 0;
        gm.ui.show_fight();
        gm.channel.report_event("fight", {
          event_desc: "Raid", // 突袭
          desc: "start" // 开始
        });
        ReportData.instance.report_once_point(10821);
        ReportData.instance.report_point(10822);
      } else if (response.ResultCode === -2) {
        // 该玩家今日被攻击次数已经达到上限，不能复仇
        gm.ui.show_notice("Bạn đã đạt giới hạn tấn công người này và không thể trả đũa!!!");
      } else {
        console.log("Player match failed, matching NPC map"); // 匹配玩家失败,匹配NPC地图
        fightTempData.goal_uid = "";
        fightTempData.match_map_by_ladder_lv();
        gm.ui.show_fight();
        gm.channel.report_event("fight", {
          event_desc: "Raid", // 突袭
          desc: "start" // 开始
        });
        ReportData.instance.report_once_point(10821);
        ReportData.instance.report_point(10822);
      }
    }, params);
  } // end: match_player

  // @ (not use)
  /* public get_player_fight_replay_data(replayId: string, callback?: () => void): void {
    const params: PlayerFightReplayDataParams = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token,
      replay_id: replayId
    };
    //
    this.server_data.get_player_fight_replay_data((response: any) => {
      if (response.ResultCode === 0) {
        console.log("Obtaining battle replay data successfully"); // 获取战斗回放数据成功
        if (callback) callback();
      }
    }, params);
  } // end: get_player_fight_replay_data */

  // @
  public get_player_notice(callback?: () => void): void {
    const params: request = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token
    };
    //
    this.server_data.get_player_notice((response: any) => {
      if (response.ResultCode === 0) {
        console.log("Get notification data successfully"); // 获取通知数据成功
        if (response.data) {
          for (const key in response.data) {
            this.server_data.server_notice_data[key] = response.data[key];
            if (this.main_data.server_notice_data) {
              if (this.server_data.server_notice_data[key] > this.main_data.server_notice_data[key]) {
                this.main_data.server_notice_data[key] = this.server_data.server_notice_data[key];
                this.event_emitter.emit(key + "_change");
              }
            }
          }
          this.main_data.async_write_data();
        }
        if (callback) callback();
      }
    }, params);
  } // end: get_player_notice

  // @, type!!!
  public get_player_fight_log_data(opType: string, callback: () => void): void {
    const params: request = {
      uid: this.server_data.uid,
      token: this.server_data.token,
      op_type: opType
    };
    //
    this.server_data.get_player_fight_data((response: any) => {
      if (!response.data || response.ResultCode !== 0) return;
      try {
        this.server_data.mail_log_data_array = response.data;
        if (opType === "1") {
          gm.data.mail_temp_data.mail_defense_log_data_array = [];
        } else {
          gm.data.mail_temp_data.mail_attack_log_data_array = [];
        }
        //
        for (let i = this.server_data.mail_log_data_array.length - 1; i >= 0; i--) {
          const logData = this.server_data.mail_log_data_array[i];
          const mailLogItem = new MailLogItemData();
          mailLogItem.replay_id = logData.replay_id;
          mailLogItem.uid = logData.uid;
          mailLogItem.star = logData.star;
          mailLogItem.target_star = logData.target_star;
          mailLogItem.change_star = logData.change_star;
          mailLogItem.target_change_star = logData.target_change_star;
          mailLogItem.op_type = opType;
          mailLogItem.target_uid = logData.target_uid;
          mailLogItem.target_nickname = logData.target_nickname;
          mailLogItem.op_result = logData.op_result;
          mailLogItem.op_reward = logData.op_reward;
          mailLogItem.op_loss_reward = logData.op_loss_reward;
          mailLogItem.is_deduct_loss_reward = logData.is_deduct_loss_reward;
          mailLogItem.op_battle = logData.op_battle;
          mailLogItem.target_op_battle = logData.target_op_battle;
          //
          if (opType === "1") {
            gm.data.mail_temp_data.mail_defense_log_data_array.push(mailLogItem);
          } else {
            gm.data.mail_temp_data.mail_attack_log_data_array.push(mailLogItem);
          }
        }
        if (callback) callback();
      } catch (error) {
        console.error(error);
      }
    }, params);
  } // end: get_player_fight_log_data

  // @, type!!!
  public get_player_email_data(callback: () => void): void {
    const params: request = {
      uid: this.server_data.uid,
      token: this.server_data.token
    };
    //
    this.server_data.get_player_email_data((response: any) => {
      if (!response.data || response.ResultCode !== 0) return;
      try {
        this.server_data.mail_inbox_data_array = response.data;
        gm.data.mail_temp_data.mail_inbox_data_array = [];
        for (let i = this.server_data.mail_inbox_data_array.length - 1; i >= 0; i--) {
          const inboxData = this.server_data.mail_inbox_data_array[i];
          const mailInboxItem = new MailInboxItemData();
          mailInboxItem.mail_id = inboxData.mail_id;
          mailInboxItem.mail_type = inboxData.mail_type;
          mailInboxItem.mail_sender = inboxData.mail_sender;
          mailInboxItem.mail_title = inboxData.mail_title;
          mailInboxItem.mail_text = inboxData.mail_text;
          mailInboxItem.reward = inboxData.reward;
          mailInboxItem.op_status = inboxData.op_status;
          mailInboxItem.reward_status = inboxData.reward_status;
          mailInboxItem.send_time = inboxData.send_time;
          mailInboxItem.reward_array = [];
          //
          if (mailInboxItem.mail_type === 1) {
            const rank = mailInboxItem.reward.rank;
            const level = gm.data.ladder_temp_data.convert_rank_to_lv(rank);
            const configData = gm.config.get_row_data("LadderRewardConfigData", level.toString()) as LadderRewardConfig;
            if (configData) {
              mailInboxItem.reward_array = configData.reward_array;
            }
          } else if (mailInboxItem.mail_type === 2) {
            const level = gm.data.ladder_temp_data.convert_building_rank_to_lv(mailInboxItem.reward.rank);
            const configData = gm.config.get_row_data("LadderBuildingConfigData", level.toString()) as LadderBuildding;
            if (configData) {
              mailInboxItem.reward_array = configData.reward_array;
            }
          }
          gm.data.mail_temp_data.mail_inbox_data_array.push(mailInboxItem);
        }
        if (callback) callback();
      } catch (error) {
        console.error(error);
      }
    }, params);
  } // end: get_player_email_data

  // @
  public get_rob_record(targetUid: string, callback?: () => void): void {
    const params: request = {
      uid: gm.data.server_data.uid,
      token: gm.data.server_data.token,
      target_uid: targetUid
    };
    //
    this.server_data.get_rob_record((response: any) => {
      if (response.ResultCode === 0) {
        if (callback && response.data && response.data.left_nums > 0) callback();
      } else if (response.ResultCode === -1) {
        // 该玩家今日被攻击次数已经达到上限，不能复仇
        gm.ui.show_notice("Đã đạt giới hạn tấn công người này và không thể trả đũa.");
      }
    }, params);
  } // end: get_rob_record

  // @ (not use)
  /* public test_score(score: number): void {
    const buildData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
    if (!buildData || buildData.buildLvl < 1) return;
    gm.data.ladder_temp_data.total_star = score;
    const previousScore = gm.data.ladder_temp_data.total_star;
    gm.data.update_player_data_request(() => {
      gm.data.get_player_score_data_request(() => {
        console.log("1.update before:" + previousScore + " update after:" + gm.data.ladder_temp_data.total_star);
        gm.data.update_player_score_data_request(previousScore, () => {
          gm.data.get_player_score_data_request(() => {
            console.log("2.update before:" + previousScore + " update after:" + gm.data.ladder_temp_data.total_star);
          });
        });
      });
    });
  } // end: test_score */

  // @ (not use)
  /* public test_loss_reward(): void {
    const data = {
      op_battle: [] as interDataOpBattle[],
      op_loss_reward: [] as interOpLossReward[]
    };
    //
    for (let i = 0; i < data.op_battle.length; i++) {
      const battle = data.op_battle[i];
      if (battle.hp <= 0) {
        gm.data.mapCell_data.delete_hero(battle.unique_id, battle.id);
      }
    }
    //
    for (let i = 0; i < data.op_loss_reward.length; i++) {
      const lossReward = data.op_loss_reward[i];
      if (lossReward.id > 0 && lossReward.num > 0) {
        gm.data.mapCell_data.delCellItem(lossReward.id, lossReward.num);
      }
    }
  } // end: test_loss_reward */
}
