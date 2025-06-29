export interface Build {
    buildID: number;
    buildType: number;
    buildName: string;
    model: number;
    anim_name: string;
    nextBuildID: number;
    buildLv: number;
    hp: number;
    defense: number;
    attack: number;
    attack_range: number;
    attack_interval: number;
    fly_weapon_name: string;
    call: number;
    rate: number[];
    currency: number;
    capacity: number;
    consume: number[];
    num: number[];
    star: number;
    coin: number;
    material: number;
    quantity: number;
    lock: number;
    cellID: number;
    showAreaID: number | number[];
    lockAreaID: number;
    activeCellID: number;
    xoffset: number;
    offset: number;
    reward: number | number[];
    amount: number | number[];

}