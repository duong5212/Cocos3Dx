import { Vec2, _decorator } from "cc";
import Singleton from "./Singleton";

const { ccclass, property } = _decorator;

@ccclass
export default class Utility extends Singleton<Utility> {
    constructor() {
        super();
        Utility._instance = this;
    }
    RandomRange(lower: number, upper: number) {
        return Math.random() * (upper - lower) + lower;
        //return Math.floor(Math.random() * (lower - lower)) + lower;
    }
    Distance(vec1: Vec2, vec2: Vec2) {
        let Distance = Math.sqrt(Math.pow(vec1.x - vec2.x, 2) +
            Math.pow(vec1.y - vec2.y, 2));
        return Distance;
    }
}
