export interface LadderBuildding {
    lv: number;
    iconId: number
    ranking_a: number;
    ranking_b: number;
    reward_array: rewardArr[];

}
export interface rewardArr {
    reward_id: number;
    reward_num: number;
}