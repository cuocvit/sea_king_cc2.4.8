// @
import { StarConfig } from '../../common/configs/star';
import { gm } from './GameManager';
import { StorageBase } from './StorageBase';

//
export class HeroStarData extends StorageBase {
    // @
    public static readonly EVENT_DATA_CHANGE: string = "heroStar_data_change";
    //
    public hero_star_data: Record<number, number> = {};

    // @
    constructor() {
        super();
        this.STORAGE_KEY = "HeroStarData"; // (extends super)
        this.hero_star_data = {};
    }

    // @ !!!
    public async_read_data<T>(callback?: (data: T) => void): void {
        super.async_read_data((data: T) => {
            if (!this.is_init) {
                this.initHeroStarData();
                this.is_init = true;
                this.async_write_data();
            }
            if (callback) callback(data);
        });
    }

    // @ !!!
    private initHeroStarData(): void {
        if (Object.keys(this.hero_star_data).length === 0) {
            const starConfigList = gm.data.config_data.getStarCfgList();
            for (const key in starConfigList) {
                if (starConfigList.hasOwnProperty(key)) {
                    this.hero_star_data[parseInt(key)] = starConfigList[key][0].star;
                }
            }
        }
    }

    // @ !!!
    public upgradeHeroStar(heroId: number): void {
        if (this.hero_star_data[heroId] != undefined) {
            this.hero_star_data[heroId] += 1;
        }
        this.async_write_data();
    }

    // @ !!!
    public getHeroStarData(heroId: number): StarConfig | null {
        const heroStar = this.hero_star_data[heroId];
        const starCfg = gm.data.config_data.getStarCfgByID(heroId, heroStar);
        if (undefined !== heroStar && starCfg) {
            return starCfg;
        } else {
            return null;
        }
    }

    // @ (public mode not used)
    public async_write_data(callback?: () => void): void {
        gm.data.event_emitter.emit(HeroStarData.EVENT_DATA_CHANGE);
        super.async_write_data(callback);
    }
}
