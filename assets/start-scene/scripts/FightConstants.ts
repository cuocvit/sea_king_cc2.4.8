// @
export enum HeroType {
  FREEDOM = 0,
  ATTACK = 1,
  DEFENSE = 2,
}

// @
export enum HeroState {
  ALIVE = 0,
  ATTACKING = 1,
  DEATH = 2,
}

// @
export enum HeroFightState {
  WAITING = 0,
  MOVING = 1,
  ATTACKING = 2,
}

// @
export enum HeroInBattleState {
  NOT_IN_BATTLE = 0,
  WILL_IN_BATTLE = 1,
  HAS_IN_BATTLE = 2,
}

// @
export enum FightDynamicNodeLayer {
  DESTROY_EFFECT = 0,
  DECORATION = 1,
  BUILDING = 2,
  PROP = 3,
  FIRE_EFFECT = 4,
  MOVE = 5,
  MAX = 10,
}

// @
export class FightConstants {
  private static readonly HP_RED_COLOR: cc.Color = cc.color().fromHEX("#B22921");
  private static readonly HP_GREEN_COLOR: cc.Color = cc.color().fromHEX("#42FE8D");
  private static readonly ATTACK_RANGE: number = 80;
  private static readonly SEARCH_RANGE: number = 160;
  private static readonly MAX_CAVES_LAYERS: number = 3;
  public static readonly FLY_WEAPON_SPEED: number = 400;
  public static readonly HP_RED_COLOR_LIGHT: cc.Color = cc.color().fromHEX("#FD4B41");
  public static readonly HP_GREEN_COLOR_LIGHT: cc.Color = cc.color().fromHEX("#1BC05A");
  public static readonly SKILL_INTERVAL_NORMAL_ATTACK_COUNT: number = 3;

  public static readonly HERO_OFFSET_ARRAY: cc.Vec3[] = [
    cc.v3(0, 0), cc.v3(8, 15), cc.v3(23, -6), cc.v3(-8, -15),
    cc.v3(-22, 6), cc.v3(-14, 21), cc.v3(31, 9), cc.v3(15, -21),
    cc.v3(-30, -9)
  ];

  public static readonly SEA_AREA_COLOR_ARRAY: cc.Color[] = [
    cc.color().fromHEX("#06B4F3"),
    cc.color().fromHEX("#3c0a79"),
    cc.color().fromHEX("#2f2027")
  ];

  public static readonly WAVE_START_COLOR_ARRAY: cc.Color[] = [
    cc.color().fromHEX("#63FFFE2E"),
    cc.color().fromHEX("#E063FF2E")
  ];

  public static readonly WAVE_END_COLOR_ARRAY: cc.Color[] = [
    cc.color().fromHEX("#63FFFE00"),
    cc.color().fromHEX("#E063FF00")
  ];
}


