import { rewardArr } from "./ladder_building";
export interface SignConfig {
    day: number;
    other_reward_array: OtherReward[];
    reward_array: rewardArr[];
    video_times: number;
}

export interface OtherReward {
    reward_id: number;
    reward_num: number;
    money: number;
}
