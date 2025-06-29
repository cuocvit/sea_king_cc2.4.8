import { QQMiniGame } from './QQMiniGame';
import { TTMiniGame } from './TTMiniGame';
import { WXMiniGame } from './WXMiniGame';
import { DWMiniGame } from './DWMiniGame ';
import { gm } from './GameManager';
import { NetUtils, ReportData } from './NetUtils';
import { VIVOMiniGame } from './VIVOMiniGame';
import { OPPOMiniGame } from './OPPOMiniGame';
import { SDKManager } from './SDKManager';

interface Type {
  title: string;
  url: string;
}
interface shareConfig {
  share_id_array: string[];
  share_array: Type[];
}

interface LevelConfig {
  level_array: string[];
}

export interface position {
  ad_position: string;
  ad_position_type: string;
}


export enum BANNER_AD_TYPE {
  ALL = 0
}

export enum REWARD_VIDEO_AD_TYPE {
  ALL = 0,
  LONG = 1,
  SHORT = 2
}

// export class ChannelManager implements Channelmanager {
export class ChannelManager {
  private static _instance: ChannelManager | null = null;
  private static WX_GAME: string = "wechat-game";
  private static QQ_GAME: string = "qq-game";
  private static DW_GAME: string = "dw-game";
  private static HW_GAME: string = "hw-game";
  private static VIVO_GAME: string = "vivo-game";
  private static OPPO_GAME: string = "oppo-game";
  private static KKMH_GAME: string = "kkmh-game";
  private static MZ_GAME: string = "mz-game";
  private static APP_TOU_TIAO: string = "Toutiao";
  private static APP_NEWS_ARTICLE_LITE: string = "news_article_lite";
  private static APP_DOU_YIN: string = "Douyin";
  private static APP_DOU_YIN_LITE: string = "Douyin_lite";
  private static APP_XI_GUA: string = "XiGua";
  private static APP_TAP_TAP: string = "tap-tap";
  private static APP_KE_SHENG: string = "ke-sheng";
  private static APP_MOMOYU: string = "momoyu";
  private static APP_OHAYOO: string = "ohayoo";
  private static APP_UNKNOWN: string = "unknown";
  private static APP_DS_MAP: number = 0;

  public static APP_QQ: string = "qq";
  public static APP_WE_CHAT: string = "wechat";
  public static APP_DW: string = "DreamWorks";
  public static TAP_TAP_GAME: string = "tap-tap-game";
  public static KE_SHENG_GAME: string = "ke-sheng-game";
  public static MOMOYU_GAME: string = "momoyu-game";
  public static OHAYOO_GAME: string = "ohayoo-game";
  public static UNKNOWN: string = "unknown";
  public static TT_GAME: string = "tt-game";
  public static SHARE_CONFIG: shareConfig = {
    share_id_array: ["2ip9crt1fbw93ouomc"],
    share_array: [
      { title: "亿万疆尸，全新塔防式枪战游戏", url: "https://cdnres.qszhg.6hwan.com/tower_shoot/share/1.jpg?v=1" },
      { title: "正义，永不缺席，加入正义联盟，拯救人类！", url: "https://cdnres.qszhg.6hwan.com/tower_shoot/share/2.jpg?v=1" },
      { title: "血战疆尸，劲爆塔防", url: "https://cdnres.qszhg.6hwan.com/tower_shoot/share/3.jpg?v=1" }
    ]
  };
  public static LEVEL_CONFIG: LevelConfig = {
    level_array: ["2-1", "2-2", "2-3", "3-1", "3-2", "3-3", "4-1"]
  };


  private constructor() { }

  static get instance(): ChannelManager {
    if (!this._instance) {
      this._instance = new ChannelManager();
    }
    return this._instance;
  }

  public init(): void {
    const channelName: string = this.get_channel_name();
    console.log("Channel:" + channelName);
    if (channelName == ChannelManager.TT_GAME) {
      if (TTMiniGame.ad_enable) {
        TTMiniGame.instance.load_channel_env(() => { });
        TTMiniGame.instance.load_sub_packages_env(() => { });
      }
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.load_channel_env(() => { });
      QQMiniGame.instance.load_sub_packages_env(() => { });
      if (QQMiniGame.ad_enable) {
        QQMiniGame.instance.create_video_ad();
        QQMiniGame.instance.create_app_box_ad();
      }
    } else if (channelName == ChannelManager.WX_GAME) {
      if (ChannelManager.APP_DS_MAP == 0) {
        WXMiniGame.instance.load_channel_env(() => { });
        WXMiniGame.instance.load_sub_packages_env(() => { });
        if (WXMiniGame.ad_enable) {
          WXMiniGame.instance.create_banner_ad();
          WXMiniGame.instance.create_video_ad();
        }
      }
    } else if (channelName == ChannelManager.DW_GAME) {
      DWMiniGame.instance.load_channel_env(() => { });
      DWMiniGame.instance.load_sub_packages_env(() => { });
      DWMiniGame.instance.create_banner_ad();
      DWMiniGame.instance.create_video_ad();
    } else if (channelName == ChannelManager.HW_GAME || channelName == ChannelManager.VIVO_GAME) {
      VIVOMiniGame.instance.load_channel_env(() => { });
      VIVOMiniGame.instance.load_sub_packages_env(() => { });
      VIVOMiniGame.instance.create_video_ad();
    } else if (channelName == ChannelManager.OPPO_GAME) {
      OPPOMiniGame.instance.load_channel_env(() => { });
      OPPOMiniGame.instance.load_sub_packages_env(() => { });
      OPPOMiniGame.instance.create_video_ad();
    }
  }

  public get_channel_name(): string {
    let channelName: string = ChannelManager.UNKNOWN;
    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      if (window.tt != null) {
        channelName = ChannelManager.TT_GAME;
      } else if (window.qq != null) {
        channelName = ChannelManager.QQ_GAME;
      } else if (window.wx != null) {
        channelName = ChannelManager.APP_DS_MAP == 0 ? ChannelManager.WX_GAME : ChannelManager.DW_GAME;
      }
    } else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      channelName = ChannelManager.TT_GAME;
    } else if (cc.sys.platform == cc.sys.HUAWEI_GAME) {
      channelName = ChannelManager.HW_GAME;
    } else if (cc.sys.platform == cc.sys.VIVO_GAME) {
      channelName = ChannelManager.VIVO_GAME;
    } else if (cc.sys.platform == cc.sys.OPPO_GAME) {
      channelName = ChannelManager.OPPO_GAME;
    } else if (cc.sys.isBrowser) {
      channelName = typeof kkH5sdk != "undefined" ? ChannelManager.KKMH_GAME : typeof mz_jsb != "undefined" ? ChannelManager.MZ_GAME : ChannelManager.UNKNOWN;
    } else if (cc.sys.isNative && cc.sys.platform == cc.sys.ANDROID) {
      channelName = SDKManager.instance.getChannelName();
    }
    return channelName;
  }

  private get_app_name(): string | undefined {
    const channelName = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      return c.TTMiniGame.instance.get_app_name();
    } else if (channelName == ChannelManager.QQ_GAME) {
      return QQMiniGame.instance.get_app_name();
    } else if (channelName != ChannelManager.WX_GAME) {
      if (channelName == ChannelManager.DW_GAME) {
        return DWMiniGame.instance.get_app_name();
      } else if (channelName != ChannelManager.HW_GAME) {
        if (channelName == ChannelManager.VIVO_GAME) {
          return VIVOMiniGame.instance.get_app_name();
        } else if (channelName == ChannelManager.OPPO_GAME) {
          return OPPOMiniGame.instance.get_app_name();
        } else if (channelName != ChannelManager.KKMH_GAME && channelName != ChannelManager.MZ_GAME) {
          if (channelName == ChannelManager.TAP_TAP_GAME || channelName == ChannelManager.KE_SHENG_GAME || channelName == ChannelManager.OHAYOO_GAME || channelName == ChannelManager.MOMOYU_GAME) {
            return SDKManager.instance.getHostAppName();
          } else {
            return ChannelManager.APP_UNKNOWN;
          }
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } else if (0 == ChannelManager.APP_DS_MAP) {
      return WXMiniGame.instance.get_app_name();
    } else {
      return undefined;
    }
  }

  private vibrate_short(): void {
    const channelName = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.vibrate_short();
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.vibrate_short();
    } else if (channelName == ChannelManager.WX_GAME) {
      if (0 == ChannelManager.APP_DS_MAP) {
        WXMiniGame.instance.vibrate_short();
      }
    } else if (channelName == ChannelManager.DW_GAME) {
      DWMiniGame.instance.vibrate_short();
    } else if (!(channelName == ChannelManager.HW_GAME)) {
      if (channelName == ChannelManager.VIVO_GAME) {
        VIVOMiniGame.instance.vibrate_short();
      } else if (channelName == ChannelManager.OPPO_GAME) {
        OPPOMiniGame.instance.vibrate_short();
      }
    }
  }

  private vibrate_long(): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.vibrate_long();
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.vibrate_long();
    } else if (channelName == ChannelManager.WX_GAME) {
      if (ChannelManager.APP_DS_MAP == 0) {
        WXMiniGame.instance.vibrate_long();
      }
    } else if (channelName == ChannelManager.DW_GAME) {
      DWMiniGame.instance.vibrate_long();
    } else if (channelName == ChannelManager.HW_GAME || channelName == ChannelManager.VIVO_GAME) {
      VIVOMiniGame.instance.vibrate_long();
    } else if (channelName == ChannelManager.OPPO_GAME) {
      OPPOMiniGame.instance.vibrate_long();
    }
  }

  private get is_support_more_game(): boolean {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      return TTMiniGame.instance.is_support_more_game;
    } else if (channelName == ChannelManager.QQ_GAME) {
      return QQMiniGame.instance.is_support_more_game;
    } else if (channelName == ChannelManager.WX_GAME) {
      return ChannelManager.APP_DS_MAP == 0 ? WXMiniGame.instance.is_support_more_game : false;
    } else if (channelName == ChannelManager.DW_GAME) {
      return DWMiniGame.instance.is_support_more_game;
    } else if (channelName == ChannelManager.HW_GAME) {
      return false;
    } else if (channelName == ChannelManager.VIVO_GAME) {
      return VIVOMiniGame.instance.is_support_more_game;
    } else if (channelName == ChannelManager.OPPO_GAME) {
      return OPPOMiniGame.instance.is_support_more_game;
    }
    return false;
  }

  private show_more_game(callback: Function | null, context: any | null): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.show_more_game(callback, context);
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.show_more_game(callback, context);
    } else if (channelName == ChannelManager.WX_GAME) {
      if (ChannelManager.APP_DS_MAP == 0) {
        WXMiniGame.instance.show_more_game(callback, context);
      }
    } else if (channelName == ChannelManager.DW_GAME) {
      console.error("梦工厂不支持更多游戏，所以不作处理！");
    } else if ([ChannelManager.HW_GAME, ChannelManager.VIVO_GAME, ChannelManager.OPPO_GAME, ChannelManager.KKMH_GAME, ChannelManager.MZ_GAME].includes(channelName)) {
      if (callback && context) {
        callback.call(context);
      }
    }
  }

  private set_rank_value(): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.set_rank_value();
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.set_rank_value();
    } else if (channelName == ChannelManager.WX_GAME) {
      if (ChannelManager.APP_DS_MAP == 0) {
        WXMiniGame.instance.set_rank_value();
      }
    } else if (channelName == ChannelManager.DW_GAME) {
      console.error("梦工厂不支持排行榜！");
    } else if (channelName == ChannelManager.OPPO_GAME) {
      OPPOMiniGame.instance.set_rank_value();
    }
  }

  private DouYinFollowBS(): string {
    return this.get_channel_name() == ChannelManager.TT_GAME ? TTMiniGame.instance.DouYinFollowBS() : "0";
  }

  private get is_support_app_box(): boolean {
    return this.get_channel_name() == ChannelManager.QQ_GAME && QQMiniGame.instance.is_support_app_box;
  }

  private show_app_box_ad(): void {
    if (this.get_channel_name() == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.show_app_box_ad();
    }
  }

  private get is_support_interstitial_ad(): boolean {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.QQ_GAME) {
      return QQMiniGame.instance.is_support_interstitial_ad;
    } else if (channelName == ChannelManager.WX_GAME) {
      return ChannelManager.APP_DS_MAP == 0 ? WXMiniGame.instance.is_support_interstitial_ad : false;
    } else if (channelName == ChannelManager.TT_GAME) {
      return TTMiniGame.instance.is_support_interstitial_ad;
    } else if (channelName == ChannelManager.DW_GAME) {
      return DWMiniGame.instance.is_support_interstitial_ad;
    } else if (channelName == ChannelManager.HW_GAME) {
      return false;
    } else if (channelName == ChannelManager.VIVO_GAME) {
      return VIVOMiniGame.instance.is_support_interstitial_ad;
    } else if (channelName == ChannelManager.OPPO_GAME) {
      return OPPOMiniGame.instance.is_support_interstitial_ad;
    }
    return false;
  }

  private get is_rank(): boolean {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      return TTMiniGame.instance.is_rank;
    } else if (channelName == ChannelManager.QQ_GAME) {
      return QQMiniGame.instance.is_rank;
    } else if (channelName == ChannelManager.WX_GAME) {
      return ChannelManager.APP_DS_MAP == 0 ? WXMiniGame.instance.is_rank : false;
    } else if (channelName == ChannelManager.DW_GAME) {
      console.error("梦工厂不支持排行榜！");
      return DWMiniGame.instance.is_rank;
    } else if (channelName == ChannelManager.HW_GAME) {
      return false;
    } else if (channelName == ChannelManager.VIVO_GAME) {
      return VIVOMiniGame.instance.is_rank;
    } else if (channelName == ChannelManager.OPPO_GAME) {
      return OPPOMiniGame.instance.is_rank;
    }
    return false;
  }

  private get is_share(): boolean {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.QQ_GAME) {
      return QQMiniGame.instance.is_share;
    } else if (channelName == ChannelManager.WX_GAME) {
      return ChannelManager.APP_DS_MAP == 0 ? WXMiniGame.instance.is_share : false;
    } else if (channelName == ChannelManager.DW_GAME) {
      return DWMiniGame.instance.is_share;
    } else if (channelName == ChannelManager.TT_GAME) {
      return TTMiniGame.instance.is_share;
    } else if (channelName == ChannelManager.HW_GAME) {
      return false;
    } else if (channelName == ChannelManager.VIVO_GAME) {
      return VIVOMiniGame.instance.is_share;
    } else if (channelName == ChannelManager.OPPO_GAME) {
      return OPPOMiniGame.instance.is_share;
    }
    return false;
  }

  public get is_video_share(): boolean {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.QQ_GAME) {
      return QQMiniGame.instance.is_video_share;
    } else if (channelName == ChannelManager.WX_GAME) {
      return ChannelManager.APP_DS_MAP == 0 ? WXMiniGame.instance.is_video_share : false;
    } else if (channelName == ChannelManager.DW_GAME) {
      return DWMiniGame.instance.is_video_share;
    } else if (channelName == ChannelManager.TT_GAME) {
      return TTMiniGame.instance.is_video_share;
    } else if (channelName == ChannelManager.HW_GAME) {
      return false;
    } else if (channelName == ChannelManager.VIVO_GAME) {
      return VIVOMiniGame.instance.is_video_share;
    } else if (channelName == ChannelManager.OPPO_GAME) {
      return OPPOMiniGame.instance.is_video_share;
    }
    return false;
  }

  private show_interstitial_ad(t: any, e: any): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.QQ_GAME) {
      if (QQMiniGame.ad_enable) {
        QQMiniGame.instance.show_interstitial_ad(t, e);
      }
    } else if (channelName == ChannelManager.WX_GAME) {
      if (ChannelManager.APP_DS_MAP == 0 && WXMiniGame.ad_enable) {
        WXMiniGame.instance.show_interstitial_ad(t, e);
      }
    } else if (channelName == ChannelManager.DW_GAME) {
      console.error("梦工厂不支持插屏广告！");
    } else if (channelName == ChannelManager.TT_GAME) {
      if (TTMiniGame.ad_enable) {
        TTMiniGame.instance.show_interstitial_ad(t, e);
      }
    } else if (channelName == ChannelManager.HW_GAME) {
      // No action for HW_GAME
    } else if (channelName == ChannelManager.VIVO_GAME) {
      VIVOMiniGame.instance.show_interstitial_ad(t, e);
    } else if (channelName == ChannelManager.OPPO_GAME) {
      OPPOMiniGame.instance.show_interstitial_ad(t, e);
    }
  }

  public show_video_ad(callback: { call: (context: cc.Component | number) => void },
    context?: cc.Component | number,
    options?: position,
    onSuccess?: Function,
    onFailure?: Function): void {
    ReportData.instance.report_once_point(10691);
    ReportData.instance.report_point(10693);
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      if (TTMiniGame.ad_enable) {
        TTMiniGame.instance.show_video_ad((result: number) => {
          if (result == 0) {
            ReportData.instance.report_once_point(10692);
            ReportData.instance.report_point(10694);
            callback.call(context);
          }
        }, this, REWARD_VIDEO_AD_TYPE.ALL, () => {
          if (onSuccess && onFailure) {
            onSuccess.call(onFailure);
          }
        }, this);
      } else {
        callback.call(context);
      }
    } else if (channelName == ChannelManager.QQ_GAME) {
      if (QQMiniGame.ad_enable) {
        QQMiniGame.instance.show_video_ad(() => {
          ReportData.instance.report_once_point(10692);
          ReportData.instance.report_point(10694);
          callback.call(context);
        }, this);
      } else {
        callback.call(context);
      }
    } else if (channelName == ChannelManager.WX_GAME) {
      if (ChannelManager.APP_DS_MAP == 0) {
        if (WXMiniGame.ad_enable) {
          WXMiniGame.instance.show_video_ad((result: number) => {
            ReportData.instance.report_once_point(10692);
            ReportData.instance.report_point(10694);
            callback.call(context);
          }, this, REWARD_VIDEO_AD_TYPE.ALL);
        } else {
          callback.call(context);
        }
      } else if (ChannelManager.APP_DS_MAP == 1) {
        DWMiniGame.instance.show_video_ad((result: number) => {
          ReportData.instance.report_once_point(10692);
          ReportData.instance.report_point(10694);
          callback.call(context);
        }, this);
      }
    } else if (channelName == ChannelManager.DW_GAME) {
      DWMiniGame.instance.show_video_ad((result: number) => {
        ReportData.instance.report_once_point(10692);
        ReportData.instance.report_point(10694);
        callback.call(context);
      }, this);
    } else if (channelName == ChannelManager.VIVO_GAME) {
      VIVOMiniGame.instance.show_video_ad((result: number) => {
        ReportData.instance.report_once_point(10692);
        ReportData.instance.report_point(10694);
        callback.call(context);
      }, this);
    } else if (channelName == ChannelManager.OPPO_GAME) {
      OPPOMiniGame.instance.show_video_ad((result: number) => {
        ReportData.instance.report_once_point(10692);
        ReportData.instance.report_point(10694);
        callback.call(context);
      }, this);
    } else {
      if (!(channelName == ChannelManager.KKMH_GAME || channelName == ChannelManager.MZ_GAME)) {
        if (channelName == ChannelManager.TAP_TAP_GAME || channelName == ChannelManager.KE_SHENG_GAME || channelName == ChannelManager.MOMOYU_GAME || channelName == ChannelManager.OHAYOO_GAME) {
          SDKManager.instance.showRewardVideoAd(() => {
            ReportData.instance.report_once_point(10692);
            ReportData.instance.report_point(10694), callback.call(context);
          }, options);
        } else {
          cc.log(gm.const.TEXT_7), callback.call(context);
        }
      }
    }
  }

  public share_req(callback: () => void | { call: (context: TTMiniGame | WXMiniGame) => void }, context: TTMiniGame | WXMiniGame): void {
    let startTime: number;
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.share_req(callback, context);
    } else if (channelName == ChannelManager.QQ_GAME) {
      startTime = Date.now();
      cc.game.once(cc.game.EVENT_SHOW, () => {
        const elapsedTime: number = Date.now() - startTime;
        if (elapsedTime > 3000) {
          gm.ui.show_notice(gm.const.TEXT_9);
          console.log("share cost time:" + elapsedTime + "ms");
          callback.call(context);
        } else {
          gm.ui.show_notice(gm.const.TEXT_18);
        }
      });
      QQMiniGame.instance.share_req(() => { }, this);
    } else if (channelName == ChannelManager.WX_GAME) {
      if (ChannelManager.APP_DS_MAP == 0) {
        startTime = Date.now();
        cc.game.once(cc.game.EVENT_SHOW, () => {
          const elapsedTime: number = Date.now() - startTime;
          if (elapsedTime > 3000) {
            gm.ui.show_notice(gm.const.TEXT_9);
            console.log("share cost time:" + elapsedTime + "ms");
            callback.call(context);
          } else {
            gm.ui.show_notice(gm.const.TEXT_18);
          }
        });
        WXMiniGame.instance.share_req(callback, context);
      }
    } else {
      console.log("false share success");
      callback();
    }
  }

  public show_banner_ad(param: BANNER_AD_TYPE): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      if (TTMiniGame.ad_enable) {
        TTMiniGame.instance.show_banner_ad(param);
      }
    } else if (channelName == ChannelManager.QQ_GAME) {
      if (QQMiniGame.ad_enable) {
        QQMiniGame.instance.show_banner_ad();
      }
    } else if (channelName == ChannelManager.WX_GAME) {
      if (ChannelManager.APP_DS_MAP == 0 && WXMiniGame.ad_enable) {
        WXMiniGame.instance.show_banner_ad(param);
      }
    } else if (channelName == ChannelManager.DW_GAME) {
      DWMiniGame.instance.show_banner_ad(param);
    } else if (channelName == ChannelManager.VIVO_GAME) {
      VIVOMiniGame.instance.show_banner_ad(param);
    } else if (channelName == ChannelManager.OPPO_GAME) {
      OPPOMiniGame.instance.show_banner_ad(param);
    }
  }

  public hide_banner_ad(param: BANNER_AD_TYPE): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      if (TTMiniGame.ad_enable) {
        TTMiniGame.instance.hide_banner_ad(param);
      }
    } else if (channelName == ChannelManager.QQ_GAME) {
      if (QQMiniGame.ad_enable) {
        QQMiniGame.instance.hide_banner_ad();
      }
    } else if (channelName == ChannelManager.WX_GAME) {
      if (ChannelManager.APP_DS_MAP == 0 && WXMiniGame.ad_enable) {
        WXMiniGame.instance.hide_banner_ad(param);
      }
    } else if (channelName == ChannelManager.DW_GAME) {
      DWMiniGame.instance.hide_banner_ad(param);
    } else if (channelName == ChannelManager.VIVO_GAME) {
      VIVOMiniGame.instance.hide_banner_ad(param);
    } else if (channelName == ChannelManager.OPPO_GAME) {
      OPPOMiniGame.instance.hide_banner_ad(param);
    }
  }

  public record_start(): void {
    if (this.get_channel_name() == ChannelManager.TT_GAME) {
      TTMiniGame.instance.record_start();
    }
  }

  public record_stop(param: boolean): void {
    if (this.get_channel_name() == ChannelManager.TT_GAME) {
      TTMiniGame.instance.record_stop(param);
    }
  }

  private share_video(param1: any, param2: any): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.share_video(param1, param2);
    } else {
      if ([ChannelManager.QQ_GAME, ChannelManager.WX_GAME, ChannelManager.DW_GAME, ChannelManager.HW_GAME, ChannelManager.VIVO_GAME, ChannelManager.OPPO_GAME, ChannelManager.KKMH_GAME, ChannelManager.MZ_GAME].includes(channelName)) {
        if (param2) {
          param2(0);
        }
      }
    }
  }

  public viedo_share(param1: boolean, param2: (num: number) => void): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.viedo_share(param1, param2);
    } else {
      if ([ChannelManager.QQ_GAME, ChannelManager.WX_GAME].includes(channelName)) {
        if (param2) {
          param2(0);
        }
      }
    }
  }

  public get_rank_data(): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.get_rank_data();
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.get_rank_data();
    } else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
      WXMiniGame.instance.get_rank_data();
    }
  }

  public set_rank_close(): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.set_rank_close();
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.set_rank_close();
    } else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
      WXMiniGame.instance.set_rank_close();
    }
  }

  private on_rank_pre_page_click(): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.on_rank_pre_page_click();
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.on_rank_pre_page_click();
    } else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
      WXMiniGame.instance.on_rank_pre_page_click();
    }
  }

  private on_rank_next_page_click(): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.on_rank_next_page_click();
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.on_rank_next_page_click();
    } else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
      WXMiniGame.instance.on_rank_next_page_click();
    }
  }

  private get_self_rank_data(): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.get_self_rank_data();
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.get_self_rank_data();
    } else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
      WXMiniGame.instance.get_self_rank_data();
    }
  }

  private set_self_rank_close(): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.set_self_rank_close();
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.set_self_rank_close();
    } else if (channelName == ChannelManager.WX_GAME && ChannelManager.APP_DS_MAP == 0) {
      WXMiniGame.instance.set_self_rank_close();
    }
  }

  private clear_cache(): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.TT_GAME) {
      TTMiniGame.instance.clear_cache();
    } else if (channelName == ChannelManager.QQ_GAME) {
      QQMiniGame.instance.clear_cache();
    } else if (channelName == ChannelManager.WX_GAME) {
      if (ChannelManager.APP_DS_MAP == 0) {
        WXMiniGame.instance.clear_cache();
      }
    } else if (channelName == ChannelManager.DW_GAME && ChannelManager.APP_DS_MAP == 1) {
      DWMiniGame.instance.clear_cache();
    }
  }

  public compare_version(version1: string, version2: string): number {
    const v1 = version1.split(".");
    const v2 = version2.split(".");
    const maxLength = Math.max(v1.length, v2.length);
    while (v1.length < maxLength) v1.push("0");
    while (v2.length < maxLength) v2.push("0");
    for (let i = 0; i < maxLength; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i]);
      if (num2 < num1) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  }

  private markScene(): void {
    if (window.wx && window.wx.markScene) {
      window.wx.markScene({ sceneId: 0 });
    }
  }

  private follow(callback: { call: (context: any, num?: number) => any }, context: any): void {
    if (this.get_channel_name() == ChannelManager.TT_GAME) {
      TTMiniGame.instance.follow(callback, context);
    }
  }

  private hide_follow_btn(): void {
    if (this.get_channel_name() == ChannelManager.TT_GAME) {
      TTMiniGame.instance.hide_follow_btn();
    }
  }

  private show_follow_btn(): void {
    if (this.get_channel_name() == ChannelManager.TT_GAME) {
      TTMiniGame.instance.show_follow_btn();
    }
  }

  private follow_douyin(param1: { call: (callback: any, context: any) => void }, param2: any): void {
    if (this.get_app_name() == ChannelManager.APP_DOU_YIN) {
      TTMiniGame.instance.douYinFollow(param1, param2);
    }
  }

  private follow_btn_stat(): any {
    if (this.get_channel_name() == ChannelManager.TT_GAME) {
      return TTMiniGame.instance.follow_btn_stat();
    }
  }

  private user_subscribe_message(): void {
    if (this.get_channel_name() == ChannelManager.TT_GAME) {
      TTMiniGame.instance.user_subscribe_message(() => { });
    }
  }

  private showBannerNative(node: cc.Node): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.OPPO_GAME) {
      OPPOMiniGame.instance.showBannerNative(node);
    } else if (channelName == ChannelManager.VIVO_GAME) {
      VIVOMiniGame.instance.showBannerNative(node);
    } else if (channelName == ChannelManager.WX_GAME) {
      this.show_Banner_Native(node);
    }
  }

  private showBigJpgNative(node: cc.Node): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.OPPO_GAME) {
      OPPOMiniGame.instance.showBigJpgNative(node);
    } else if (channelName == ChannelManager.VIVO_GAME) {
      VIVOMiniGame.instance.showBigJpgNative(node);
    } else if (channelName == ChannelManager.WX_GAME) {
      this.show_BigJpg_Native(node);
    }
  }

  private show_ico_native(node: cc.Node): void {
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.OPPO_GAME) {
      OPPOMiniGame.instance.showIcoNative(node);
    } else if (channelName == ChannelManager.VIVO_GAME) {
      VIVOMiniGame.instance.showIcoNative(node);
    } else if (channelName == ChannelManager.WX_GAME) {
      this.showIcoNative(node);
    }
  }

  private showIcoNative(node: cc.Node): void {
    const imageUrls: string[] = ["http://imgwsdl.vivo.com.cn/appstore/ad/apk/icon/20201023/2020102323335239964.png"];
    const adImg: any = node.getChildByName("adImg");
    const adLogo: any = node.getChildByName("adLogo");
    adImg.active = false;
    if (imageUrls.length > 0) {
      cc.loader.load(imageUrls[0], (error: any, texture: any) => {
        adImg.active = true;
        adImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        console.log("adImg load >>>>>>>>")
      });
    }
    adLogo.active = false;
    if (!adImg.getComponent(cc.Button)) {
      adImg.addComponent(cc.Button);
    }
    adImg.on("click", () => {
      console.log("nativeIcoAd  Click Ico AdShow ")
    }, this);
    console.log("nativeIcoAd  reportIcoAdShow adId:, this.bannerNativeData.adId");
  }

  private show_BigJpg_Native(node: cc.Node): void {
    const imageUrls: string[] = ["http://images.pinduoduo.com/marketing_api/2020-09-30/a064a4e2-057d-407d-b21b-7fa818bb4c06.jpeg"];
    const adImg: any = node.getChildByName("adImg");
    const adLogo: any = node.getChildByName("adLogo");
    adImg.active = false;
    if (imageUrls.length > 0) {
      cc.loader.load(imageUrls[0], (error: any, texture: any) => {
        adImg.active = true;
        adImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
      });
    }
    adLogo.active = false;
    if (!adImg.getComponent(cc.Button)) {
      adImg.addComponent(cc.Button);
    }
    adImg.on("click", () => {
      console.log("adImg.on('click', () => {")
    }, this);
    console.log("nativeIcoAd  reportIcoAdShow adId:, this.bigJpgNativeData.adId");
  }

  private show_Banner_Native(node: any): void {
    const imageUrls: string[] = ["http://imgwsdl.vivo.com.cn/appstore/ad/apk/icon/20201023/2020102323335239964.png"];
    const adImg: any = node.getChildByName("adImg");
    const adDesc: any = node.getChildByName("adDesc");
    const adTitle: any = node.getChildByName("adTitle");
    const adButton: any = node.getChildByName("adButton");
    const adLogo: any = node.getChildByName("adLogo");
    adImg.active = false;
    if (imageUrls.length > 0) {
      cc.loader.load(imageUrls[0], (error: any, texture: any) => {
        adImg.active = true;
        adImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
      });
    }
    adTitle.active = true;
    adTitle.getComponent(cc.Label).string = "用了这个口罩，兄弟们都找我要链接！太值！";
    adDesc.active = true;
    adDesc.getComponent(cc.Label).string = "活动真实有效";
    adLogo.active = false;
    if (!adButton.getComponent(cc.Button)) {
      adButton.addComponent(cc.Button);
    }
    adButton.on("click", () => {
      console.log("nativeIcoAd  Click IcoAdShow ")
    }, this);
    console.log("nativeIcoAd  reportIcoAdShow adId:, this.bannerNativeData.adId");
  }

  public checkShortcut(callback: (result: number) => void): void {
    if (this.get_channel_name() == ChannelManager.TT_GAME) {
      TTMiniGame.instance.checkShortcut(callback);
    } else {
      callback(0);
    }
  }

  public addShortcut(callback: () => void): void {
    if (this.get_channel_name() == ChannelManager.TT_GAME) {
      TTMiniGame.instance.addShortcut(callback);
    }
  }

  public report_event(event: string, data: Record<string, any> = {}): void {
    if (event == "ohayoo_game_guide") {
      ReportData.instance.report_once_point(data.guideid);
      console.log(event + JSON.stringify(data));
    }
    const channelName: string = this.get_channel_name();
    if (channelName == ChannelManager.OHAYOO_GAME) {
      SDKManager.instance.reportEvent(event, data);
    }
  }

  public copy_to_clipboard(text: string): void {
    const channelName: string = this.get_channel_name();
    if (![ChannelManager.OHAYOO_GAME, ChannelManager.TAP_TAP_GAME, ChannelManager.KE_SHENG_GAME, ChannelManager.MOMOYU_GAME].includes(channelName)) {
      SDKManager.instance.copyToClipboard(text);
    }
  }

  public get_device_id(): string {
    const channelName: string = this.get_channel_name();
    if ([ChannelManager.OHAYOO_GAME, ChannelManager.TAP_TAP_GAME, ChannelManager.KE_SHENG_GAME, ChannelManager.MOMOYU_GAME].includes(channelName)) {
      return SDKManager.instance.getDeviceID();
    } else if (channelName == ChannelManager.TT_GAME) {
      return TTMiniGame.instance.code;
    }
    return NetUtils.game_uuid;
  }

  public get_version_name(): string {
    const channelName: string = this.get_channel_name();
    if ([ChannelManager.OHAYOO_GAME, ChannelManager.TAP_TAP_GAME, ChannelManager.KE_SHENG_GAME, ChannelManager.MOMOYU_GAME].includes(channelName)) {
      return SDKManager.instance.getVersionName();
    }
    return "1.0.0";
  }

  public get_version_code(): number {
    const channelName = this.get_channel_name();
    if ([ChannelManager.OHAYOO_GAME, ChannelManager.TAP_TAP_GAME, ChannelManager.KE_SHENG_GAME, ChannelManager.MOMOYU_GAME].includes(channelName)) {
      return SDKManager.instance.getVersionCode();
    }
    return 1;
  }

  public get_network_state_name(): string {
    const channelName = this.get_channel_name();
    if ([ChannelManager.OHAYOO_GAME, ChannelManager.TAP_TAP_GAME, ChannelManager.KE_SHENG_GAME, ChannelManager.MOMOYU_GAME].includes(channelName)) {
      return SDKManager.instance.getNetworkStateName();
    }
    return "unknown";
  }

  public login(callback: () => void): void {
    const channelName = this.get_channel_name();
    let loginData: { code: string; anonymous: number; channel_id: string };

    switch (channelName) {
      case ChannelManager.OHAYOO_GAME:
        loginData = {
          code: gm.channel.get_device_id(),
          anonymous: 0,
          channel_id: "1",
        };
        gm.data.server_data.login_request((result: any) => {
          if (result.ResultCode == 0 && result.data) {
            Object.assign(gm.data.server_data, result.data);
            callback();
          } else {
            gm.ui.show_notice(result.msg);
          }
        }, loginData);
        break;

      case ChannelManager.TAP_TAP_GAME:
        loginData = {
          code: gm.channel.get_device_id(),
          anonymous: 0,
          channel_id: "3",
        };
        gm.data.server_data.login_request((result: any) => {
          if (result.ResultCode == 0 && result.data) {
            Object.assign(gm.data.server_data, result.data);
            callback();
          } else {
            gm.ui.show_notice(result.msg);
          }
        }, loginData);
        break;

      case ChannelManager.MOMOYU_GAME:
        loginData = {
          code: gm.channel.get_device_id(),
          anonymous: 0,
          channel_id: "4",
        };
        gm.data.server_data.login_request((result: any) => {
          if (result.ResultCode == 0 && result.data) {
            Object.assign(gm.data.server_data, result.data);
            callback();
          } else {
            gm.ui.show_notice(result.msg);
          }
        }, loginData);
        break;

      case ChannelManager.KE_SHENG_GAME:
        loginData = {
          code: gm.channel.get_device_id(),
          anonymous: 0,
          channel_id: "5",
        };
        gm.data.server_data.login_request((result: any) => {
          if (result.ResultCode == 0 && result.data) {
            Object.assign(gm.data.server_data, result.data);
            callback();
          } else {
            gm.ui.show_notice(result.msg);
          }
        }, loginData);
        break;

      case ChannelManager.TT_GAME:
        TTMiniGame.instance.get_code((code: string, anonymous: number) => {
          gm.data.server_data.login_request((result: any) => {
            if (result.ResultCode == 0 && result.data) {
              Object.assign(gm.data.server_data, result.data);
              callback();
            } else {
              gm.ui.show_notice(result.msg);
            }
          }, {
            code: code,
            anonymous: anonymous,
            channel_id: "2",
          });
        });
        break;

      default:
        // Default case for other channels
        loginData = {
          code: gm.channel.get_device_id(),
          anonymous: 0,
          channel_id: "1",
        };
        gm.data.server_data.login_request((result: any) => {
          if (result.ResultCode == 0 && result.data) {
            Object.assign(gm.data.server_data, result.data);
            callback();
          } else {
            gm.ui.show_notice(result.msg);
          }
        }, loginData);
        break;
    }
  }

  get_remote_config(callback: Function): void {
    // Logic for getting remote config
    const config = {
      level_array: ["2-1", "2-2", "2-3", "3-1", "3-2", "3-3", "4-1"]
    };
    if (Array.isArray(config.level_array) && config.level_array.length > 0) {
      ChannelManager.LEVEL_CONFIG = config;
    }
    callback();
  }
}

// export const ChannelManagerImpl = ChannelManagerImpl.instance;