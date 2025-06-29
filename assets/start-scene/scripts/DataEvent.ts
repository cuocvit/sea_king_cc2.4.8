// +-+
import { Event } from './Event';

export class DataEvent extends Event {
  public static DATA = "data";
  public static GUIDENEWERGUIDE = "guide-newerGuide";
  public static NEWERGUIDEOPHIDE = "hideGuideOp";
  public static NEWERGUIDEOPSHOW = "showGuideOp";
  public static GUIDE_CLICK_BUILD_UPGRAE_POS = "guide-clickBuildBtnPos";
  public static GUIDE_CLICK_BUILD_UPGRAE_POS_SUC = "guide-clickBuildBtnPosSucc";
  public static GUIDE_CLICK_BARREL_POS = "guide-clickBarrelBtnPos";
  public static GUIDE_CLICK_BARREL_POS_SUC = "guide-clickBarrelBtnPosSucc";
  public static GUIDE_CLICK_BUILD_UP_POS = "guide-clickBuildUpBtnPos";
  public static GUIDE_CLICK_BUILD_UP_POS_SUC = "guide-clickBuildUpBtnPosSucc";
  public static GUIDE_CLICK_BEGIN_FIGHT_POS = "guide-clickBeginFightBtnPos";
  public static GUIDE_CLICK_BEGIN_FIGHT_POS_SUC = "guide-clickBeginFightBtnPosSucc";

  private static GUIDEATFEROPENNEWERGUIDEPANEL = "showGuideOp";
  private static GUIDE_OPEN_MERGE_SWORD_POS = "guide-getOpenSwordBtnPos";
  private static GUIDE_OPEN_MERGE_SWORD_POS_SUC = "guide-getOpenSwordBtnSucc";
  private static GUIDE_OPEN_BACK_MAIN_POS = "guide-clickBackMainBtnPos";
  private static GUIDE_OPEN_BACK_MAIN_POS_SUC = "guide-clickBackMainBtnSucc";
  private static GUIDE_OPEN_EQUIP_POS = "guide-clickOpenEquipBtnPos";
  private static GUIDE_OPEN_EQUIP_POS_SUC = "guide-clickOpenEquipBtnSucc";
  private static GUIDE_EQUIP_UP_POS = "guide-clickEquipUpBtnPos";
  private static GUIDE_EQUIP_UP_POSS_SUC = "guide-clickEquipUpBtnSucc";
  private static GUIDE_CLOSE_EQUIP_POS = "guide-clickCloseEquipBtnPos";
  private static GUIDE_CLOSE_EQUIP_POS_SUC = "guide-clickCloseEquipBtnSucc";
  private static GUIDE_CLICK_WHITE_POS = "guide-clickWhiteBtnPos";
  private static GUIDE_CLICK_WHITE_SUC = "guide-clickWhiteBtnSucc";
  private static GUIDE_GET_CREATE_SWORD_POS = "guide-getCreateSwordBtnPos";
  private static GUIDE_GET_CREATE_SWORD_POS_SUC = "guide-getCreateSwordBtnSucc";
  private static GUIDE_GET_FIX_SWORD_POS = "guide-getSwordBtnPos";
  private static GUIDE_GET_FIX_SWORD_POS_SUC = "guide-getSwordBtnSucc";
  private static GUIDE_GET_NEW_SWORD_POS = "guide-clickNewSwordBtnPos";
  private static GUIDE_GET_NEW_SWORD_POS_SUC = "guide-clickNewSwordBtnSucc";
  private static GUIDE_GET_FIGHT_POS = "guide-getFightBtnPos";
  private static GUIDE_GET_FIGHT_POS_SUC = "guide-getFightBtnSucc";
  private static GUIDE_GET_CHAPTER_POS = "guide-getChapterBtnPos";
  private static GUIDE_GET_CHAPTER_SUC = "guide-getChapterBtnSucc";
  private static GUIDE_GET_SWORD_STRENG_POS = "guide-getSwordStrengBtnPos";
  private static GUIDE_GET_SWORD_STRENG_SUC = "guide-getSwordStrengBtnSucc";
  private static GUIDE_GET_STRENG_DAMAGE_POS = "guide-getStreng1BtnPos";
  private static GUIDE_GET_STRENG_DAMAGE_SUC = "guide-getStreng1BtnSucc";
  private static GUIDE_GET_STRENG_SPEED_POS = "guide-getStreng2BtnPos";
  private static GUIDE_GET_STRENG_SPEED_SUC = "guide-getStreng2BtnSucc";
  private static GUIDE_GET_STRENG_COUNT_POS = "guide-getStreng3BtnPos";
  private static GUIDE_GET_STRENG_COUNT_SUC = "guide-getStreng3BtnSucc";
  private static GUIDE_GET_STRENG_CLOSE_POS = "guide-getStreng4BtnPos";
  private static GUIDE_GET_STRENG_CLOSE_SUC = "guide-getStreng4BtnSucc";
  private static GUIDE_GET_MAGIC_POS = "guide-getMagicBtnPos";
  private static GUIDE_GET_MAGIC_SUC = "guide-getMagicBtnSucc";
  private static GUIDE_GET_FIGHT_UP_POS = "guide-getFightUpBtnPos";
  private static GUIDE_GET_FIGHT_UP_SUC = "guide-getFightUpBtnSucc";
  private static GUIDE_GET_HP_POS = "guide-getHpBtnPos";
  private static GUIDE_GET_HP_SUC = "guide-getHpBtnSucc";
  private static GUIDE_GET_MAGIC_CHOOSE_POS = "guide-getChooseMagicBtnPos";
  private static GUIDE_GET_MAGIC_CHOOSE_SUC = "guide-getChooseMagicBtnSucc";
  private _data: cc.Node;
  private _data2: Function;

  constructor(type: string, data: cc.Node = null, data2: Function = null) {
    super(type);
    this._data = data;
    this._data2 = data2;
  }

  public get data(): cc.Node {
    return this._data;
  }

  public set data(value: cc.Node) {
    this._data = value;
  }

  public get data2(): Function {
    return this._data2;
  }

  public set data2(value: Function) {
    this._data2 = value;
  }
}