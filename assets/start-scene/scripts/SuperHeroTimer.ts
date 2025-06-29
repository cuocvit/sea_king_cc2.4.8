//
import { gm } from './GameManager';
import { Timer } from './Timer';

const { ccclass } = cc._decorator;

// @
@ccclass
class SuperHeroTimer extends cc.Component {
    private _timer: Timer | null = null;
    private _updataTimer: number = 0;

    // @
    public init(): void {
        this._updataTimer = 0;
        if (!this._timer) this._timer = new Timer();
        this.initBarrelData();
        this.initSuperHeroTime();
        if (!this._timer.is_running) {
            this._timer.start(() => {
                this.refreshSuperHeroTime();
            }, 1000, 0);
        }
    }

    // @
    private initSuperHeroTime(): void {
        const superHeroData = gm.data.mapCell_data.getAllSuperHeroData();
        for (let i = 0; i < superHeroData.length; i++) {
            if (superHeroData[i].heroState === 1) {
                if (superHeroData[i].curReliveTime === 0) {
                    superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
                    superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + gm.const.SUPERHERORELIVETIME;
                } else if (superHeroData[i].curReliveTime >= superHeroData[i].nextReliveTime) {
                    superHeroData[i].heroState = 0;
                    superHeroData[i].hp = Math.floor(0.5 * superHeroData[i].maxHp);
                    superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
                    superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + gm.const.SUPERHERORECIVETIME;
                } else {
                    superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + (superHeroData[i].nextReliveTime - superHeroData[i].curReliveTime);
                    superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
                }
            } else if (superHeroData[i].hp >= superHeroData[i].maxHp) {
                superHeroData[i].curReliveTime = 0;
                superHeroData[i].nextReliveTime = 0;
            } else if (superHeroData[i].curReliveTime >= superHeroData[i].nextReliveTime) {
                superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
                superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + gm.const.SUPERHERORECIVETIME;
            } else {
                superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + (superHeroData[i].nextReliveTime - superHeroData[i].curReliveTime);
                superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
            }
        }
    }

    // @
    private refreshSuperHeroTime(): void {
        this._updataTimer++;
        if (this._updataTimer >= 600) {
            this._updataTimer = 0;
            gm.data.mapCell_data.checkLocalData();
        }
        const superHeroData = gm.data.mapCell_data.getAllSuperHeroData();
        //
        for (let i = 0; i < superHeroData.length; i++) {
            if (superHeroData[i].nextReliveTime > 0) {
                superHeroData[i].curReliveTime++;
                if (superHeroData[i].curReliveTime >= superHeroData[i].nextReliveTime) {
                    if (superHeroData[i].heroState === 1) {
                        superHeroData[i].heroState = 0;
                        superHeroData[i].hp = Math.floor(0.5 * superHeroData[i].maxHp);
                        superHeroData[i].curReliveTime = Math.floor(Date.now() / 1000);
                        superHeroData[i].nextReliveTime = Math.floor(Date.now() / 1000) + gm.const.SUPERHERORECIVETIME;
                        gm.ui.emit("refresh_super_hero_color", superHeroData[i].cellID, superHeroData[i].heroid);
                    } else {
                        superHeroData[i].hp = Math.min(superHeroData[i].maxHp, superHeroData[i].hp + gm.const.SUPERHERORECIVEHP);
                        superHeroData[i].curReliveTime = superHeroData[i].maxHp <= superHeroData[i].hp ? 0 : Math.floor(Date.now() / 1000);
                        superHeroData[i].nextReliveTime = superHeroData[i].maxHp <= superHeroData[i].hp ? 0 : Math.floor(Date.now() / 1000) + gm.const.SUPERHERORECIVETIME;
                    }
                }
            }
        }
        this.refreshBarrelTime();
    }

    // @
    private initBarrelData(): void {
        gm.data.mapCell_data.initBarrelTime();
    }

    // @
    private refreshBarrelTime(): void {
        if (!gm.data.mapCell_data.isGuide && gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime > 0) {
            gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime++;
            if (gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime >= gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime) {
                gm.data.mapCell_data.roleBarrelData.curBarrelNum = Math.min(gm.data.mapCell_data.roleBarrelData.maxBarrelNum, gm.data.mapCell_data.roleBarrelData.curBarrelNum + gm.data.mapCell_data.roleBarrelData.nextFreeBarrelNum);
                if (gm.data.mapCell_data.roleBarrelData.curBarrelNum >= gm.data.mapCell_data.roleBarrelData.maxBarrelNum) {
                    gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime = 0;
                    gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime = 0;
                } else {
                    gm.data.mapCell_data.roleBarrelData.curFreeBarrelTime = Math.floor(Date.now() / 1000);
                    gm.data.mapCell_data.roleBarrelData.nextFreeBarrelTime = Math.floor(Date.now() / 1000) + gm.data.mapCell_data.roleBarrelData.freeBarrelCd;
                }
                gm.data.mapCell_data.async_write_data();
            }
        }
    } 
}

export { SuperHeroTimer };
