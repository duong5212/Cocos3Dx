import { _decorator } from "cc";
import Singleton from "./Singleton";
const { ccclass, property } = _decorator;

@ccclass
export default class Random extends Singleton<Random> {
    constructor() {
        super();
        Random._instance = this;
    }
    RandomRange(lower: number, upper: number) {
        return Math.random() * (upper - lower) + lower;
        //return Math.floor(Math.random() * (lower - lower)) + lower;
    }
}
