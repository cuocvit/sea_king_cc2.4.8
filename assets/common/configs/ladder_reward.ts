import { rewardArr } from "./ladder_building";
export interface LadderRewardConfig {
    lv: number;
    iconId: number;
    ranking_a: number;
    ranking_b: number;
    reward_array: rewardArr[];
}
