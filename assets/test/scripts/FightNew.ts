const { ccclass, property } = cc._decorator;

@ccclass
export default class Fight extends cc.Component {
    protected onLoad(): void {
        let t = new UnitData();
        let e = new UnitPropertyData(0, "attack", "攻击力", 10, 0, 1000);
        let o = new UnitPropertyData(1, "hp", "血量值", 100, 0, 100);
        let i = new UnitPropertyData(2, "defense", "防御值", 10, 0, 100);

        t.addProperty(e);
        t.addProperty(o);

        new Pipeline(
            new Pipe(Handler.addFixedValue, Handler, 1),
            new Pipe(Handler.addRatio, Handler, 0.1)
        ).run(e);

        let n = new PassiveSkillEffectData(1, "被动技能：防御增加10，攻击增加10", [e, o, i]);

        let skillPipeline = new Pipeline();
        skillPipeline.push(new Pipe(Handler.passiveSkill, Handler, n));
        skillPipeline.run(t);
    }
}

class PassiveSkillEffectData {
    public id: number;
    public name: string;
    public properties: UnitPropertyData[];

    constructor(id: number, name: string, properties: UnitPropertyData[]) {
        this.id = id;
        this.name = name;
        this.properties = properties;
    }
}

class ContentBase { }

class Handler {
    public static addFixedValue(prop: UnitPropertyData, value: number): UnitPropertyData {
        prop.value += value;
        return prop;
    }

    public static addRatio(prop: UnitPropertyData, ratio: number): UnitPropertyData {
        prop.value += prop.value * ratio;
        return prop;
    }

    public static passiveSkill(skill: PassiveSkillEffectData): PassiveSkillEffectData {
        return skill;
    }
}

class Pipe {
    private _func: Function;
    private _target: Handler;
    private _args: any[];

    constructor(func: Function, target: Handler, ...args: any[]) {
        this._func = func;
        this._target = target;
        this._args = args;
    }

    public execute(input: any) {
        return this._func.apply(this._target, [input, ...this._args]);
    }
}

class Pipeline {
    private _pipeArray: Pipe[];

    constructor(...pipes: Pipe[]) {
        this._pipeArray = pipes || [];
    }

    public push(pipe: Pipe): void {
        this._pipeArray.push(pipe);
    }

    public run(input: any) {
        console.log("Pipeline input:", JSON.stringify(input));
        input = this._pipeArray.reduce((acc, pipe) => pipe.execute(acc), input);
        console.log("Pipeline result:", JSON.stringify(input));
        return input;
    }
}

class UnitPropertyData {
    public key: number;
    public name: string;
    public nameZh: string;
    public value: number;
    public minValue: number;
    public maxValue: number;

    constructor(
        key: number,
        name: string,
        nameZh: string,
        value: number,
        minValue: number,
        maxValue: number
    ) {
        this.key = key;
        this.name = name;
        this.nameZh = nameZh;
        this.value = value;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}

export class UnitData {
    private propertyMap: { [key: number]: UnitPropertyData } = {};

    private getPropertyValue(key: number): number {
        return this.propertyMap[key]?.value ?? 0;
    }

    private setPropertyValue(key: number, value: number): void {
        if (this.propertyMap[key]) {
            this.propertyMap[key].value = value;
        }
    }

    private getProperty(key: number): UnitPropertyData | undefined {
        return this.propertyMap[key];
    }

    public addProperty(property: UnitPropertyData): void {
        if (!this.propertyMap[property.key]) {
            this.propertyMap[property.key] = property;
        }
    }

    private removeProperty(key: number): void {
        if (this.propertyMap[key]) {
            delete this.propertyMap[key];
        }
    }
}
