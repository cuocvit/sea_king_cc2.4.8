import { SingletonBase } from './SingletonBase';
import { gm } from './GameManager';
import { BuildTypeEnum } from './Constants';
import { LadderBuildding } from "../../common/configs/ladder_building";
import { LadderLVConfig } from '../../common/configs/ladder_lv';
import { request } from './DataManager';

// @
class LadderMyItemData {
    public lv: number = 0;
    public config: LadderLVConfig = null;
}
/* 
// cũng có thể viết ES5 Constructor Function như bên dưới để tạo ra mã giống phiên bản
// gốc nhưng cần phải tạo thêm interface, không thuận tiện bằng sử dụng ES6 Classes.
interface LadderMyItemData {
    lv: number;
    config: any;
}
export const LadderMyItemData = function () {
    this.lv = 0 as number,
    this.config = null as any;
}; */

// @
export class LadderRankItemData {
    public lv: number = 0;
    public rank: number = 0;
    public name: string = "";
    public star: number = 0;
    public uid: string = "";
}

// @
export class LadderBuildingRankItemData {
    public lv: number = 0;
    public rank: number = 0;
    public name: string = "";
    public castle_level: number = 0;
    public uid: string = "";
}

// @
export class LadderAchievementItemData {
    public id: number = 0;
    public star: number = 0;
    public state: number = 0;
    public reward_array: LadderRewardData[] = [];
}

// @
export class LadderRankRewardItemData {
    public lv: number = 0;
    public rank_a: number = 0;
    public rank_b: number = 0;
    public reward_array: LadderRewardData[] = [];
}

//
export class LadderRewardData {
    public reward_id: number = 0;
    public reward_num: number = 0;
}

// @
export class LadderTempData extends SingletonBase {
    private _ladder_achievement_data_array: LadderAchievementItemData[] = [];
    private _ladder_reward_data_array: LadderRankRewardItemData[] = [];
    private _total_star: number = 0;
    public rank: number = 0;
    public arch_rank: number = 0;
    public castle_level: number = 0;
    private _ladder_my_item_data_array: LadderMyItemData[] = [];
    public ladder_rank_item_data_array: LadderRankItemData[] = [];
    public ladder_building_rank_item_data_array: LadderBuildingRankItemData[] = [];
    public self_rank_item_data: LadderRankItemData | null = null;
    public self_building_rank_item_data: LadderBuildingRankItemData | null = null;

    // @
    get total_star(): number {
        const buildData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
        return !buildData || buildData.buildLvl < 1 ? gm.data.ladder_data.ladder_star : this._total_star;
    }

    // @
    set total_star(value: number) {
        this._total_star = value;
    }

    // @
    public change_star_num(value: number): void {
        if (value > 0) {
            gm.data.ladder_data.add_ladder_achievement_star(value);
            this._total_star += value;
        } else {
            this._total_star = Math.max(0, this._total_star + value);
        }
        gm.data.event_emitter.emit("ladder_star_change");
    }

    // @
    get ladder_my_item_data_array(): LadderMyItemData[] {
        if (this._ladder_my_item_data_array.length === 0) {
            this.build_ladder_my_item_data_array();
        }
        return this._ladder_my_item_data_array;
    }

    // @
    get ladder_achievement_data_array(): LadderAchievementItemData[] {
        if (this._ladder_achievement_data_array.length === 0) {
            this.build_ladder_achievement_data_array();
        }
        return this._ladder_achievement_data_array;
    }

    // @
    private build_ladder_achievement_data_array(): void {
        this._ladder_achievement_data_array = [];
        const configData = gm.config.get_config_data("LadderAchievementConfigData");
        for (const key in configData.data) {
            const achievementData = configData.data[key] as LadderAchievementItemData;
            const achievementItem = new LadderAchievementItemData();
            achievementItem.id = achievementData.id;
            achievementItem.star = achievementData.star;
            achievementItem.state = 0;
            achievementItem.reward_array = [];

            for (const reward of achievementData.reward_array) {
                if (reward.reward_id > 0 && reward.reward_num > 0) {
                    const rewardItem = new LadderRewardData();
                    rewardItem.reward_id = reward.reward_id;
                    rewardItem.reward_num = reward.reward_num;
                    achievementItem.reward_array.push(rewardItem);
                }
            }
            this._ladder_achievement_data_array[achievementItem.id - 1] = achievementItem;
        }
    }

    // @
    private build_ladder_my_item_data_array(): void {
        this._ladder_my_item_data_array = [];
        const configData = gm.config.get_config_data("LadderLvConfigData");
        const totalItems = Object.keys(configData.data).length;

        for (const key in configData.data) {
            const itemData = configData.data[key] as LadderLVConfig;
            const myItem = new LadderMyItemData();
            myItem.lv = itemData.lv;
            myItem.config = itemData;
            this._ladder_my_item_data_array[totalItems - myItem.lv] = myItem;
        }
    }

    // @
    public async_get_ladder_rank_item_data_array(callback: () => void): void {
        const requestData: request = {
            uid: gm.data.server_data.uid,
            token: gm.data.server_data.token,
            op_type: "1"
        };

        gm.data.server_data.get_score_rank((response) => {
            if (response.ResultCode === 0 && response.data != null) {
                this.ladder_rank_item_data_array = [];
                this.self_rank_item_data = null;

                for (const rankData of response.data) {
                    const rankItem = new LadderRankItemData();
                    rankItem.lv = this.convert_rank_to_lv(rankData.rank);
                    rankItem.rank = rankData.rank;
                    rankItem.name = rankData.nickname;
                    rankItem.star = rankData.scores;
                    rankItem.uid = rankData.uid.toString();

                    if (rankItem.uid === gm.data.server_data.uid) {
                        this.self_rank_item_data = rankItem;
                    }
                    this.ladder_rank_item_data_array.push(rankItem);
                }

                if (!this.self_rank_item_data) {
                    this.self_rank_item_data = new LadderRankItemData();
                    this.self_rank_item_data.lv = this.convert_rank_to_lv(this.rank);
                    this.self_rank_item_data.name = gm.data.server_data.nickname;
                    this.self_rank_item_data.star = this.total_star;
                    this.self_rank_item_data.rank = this.rank;
                }
                callback();
            }
        }, requestData);
    } // end: async_get_ladder_rank_item_data_array

    // @
    public async_get_building_rank_item_data_array(callback: () => void): void {
        const requestData = {
            uid: gm.data.server_data.uid,
            token: gm.data.server_data.token
        };

        gm.data.server_data.get_arch_rank((response) => {
            if (response.ResultCode === 0 && response.data != null) {
                this.ladder_building_rank_item_data_array = [];
                this.self_building_rank_item_data = null;

                for (const buildingRankData of response.data) {
                    const buildingRankItem = new LadderBuildingRankItemData();
                    buildingRankItem.lv = this.convert_building_rank_to_lv(buildingRankData.rank);
                    buildingRankItem.rank = buildingRankData.rank;
                    buildingRankItem.name = buildingRankData.nickname;
                    buildingRankItem.castle_level = buildingRankData.castle_level;
                    buildingRankItem.uid = buildingRankData.uid.toString();

                    if (buildingRankItem.uid === gm.data.server_data.uid) {
                        this.self_building_rank_item_data = buildingRankItem;
                    }
                    this.ladder_building_rank_item_data_array.push(buildingRankItem);
                }

                if (!this.self_building_rank_item_data) {
                    this.self_building_rank_item_data = new LadderBuildingRankItemData();
                    this.self_building_rank_item_data.lv = this.convert_building_rank_to_lv(this.arch_rank);
                    this.self_building_rank_item_data.name = gm.data.server_data.nickname;
                    this.self_building_rank_item_data.castle_level = this.castle_level;
                    this.self_building_rank_item_data.rank = this.arch_rank;
                }
                callback();
            }
        }, requestData);
    } // end: async_get_building_rank_item_data_array

    // @
    public convert_rank_to_lv(rank: number): number {
        const configData = gm.config.get_config_data("LadderLvConfigData");
        for (const key in configData.data) {
            const levelData = configData.data[key] as LadderLVConfig;
            if (rank >= levelData.ranking_a && rank <= levelData.ranking_b) {
                return levelData.lv;
            }
        }
        return 1;
    }

    // @
    public convert_building_rank_to_lv(rank: number): number {
        const configData = gm.config.get_config_data("LadderBuildingConfigData");
        for (const key in configData.data) {
            const levelData = configData.data[key] as LadderBuildding;
            if (rank >= levelData.ranking_a && rank <= levelData.ranking_b) {
                return levelData.lv;
            }
        }
        return 1;
    }

    // @
    public get_ladder_reward_data_array(index: number): LadderRankRewardItemData[] {
        this._ladder_reward_data_array = [];
        const rowData = gm.config.get_row_data_array("LadderRewardConfigData", index.toString()) as LadderBuildding[];
        console.log("rowData", rowData);
        for (const rewardData of rowData) {
            const rewardItem = new LadderRankRewardItemData();
            rewardItem.lv = rewardData.lv;
            rewardItem.rank_a = rewardData.ranking_a;
            rewardItem.rank_b = rewardData.ranking_b;
            rewardItem.reward_array = [];

            for (const reward of rewardData.reward_array) {
                if (reward.reward_id > 0 && reward.reward_num > 0) {
                    const rewardDetail = new LadderRewardData();
                    rewardDetail.reward_id = reward.reward_id;
                    rewardDetail.reward_num = reward.reward_num;
                    rewardItem.reward_array.push(rewardDetail);
                }
            }
            this._ladder_reward_data_array[rewardItem.lv - 1] = rewardItem;
        }
        return this._ladder_reward_data_array;
    }
}
