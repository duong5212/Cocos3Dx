import { _decorator, Component, Node, Game } from 'cc';
import { GamePlay1 } from '../GamePlay/1/GamePlay1';
import Singleton from './Singleton';


const { ccclass, property } = _decorator;
export const instance = new EventTarget();
@ccclass('GamePlayInstance')
export default class GamePlayInstance extends Singleton<GamePlayInstance> {



    gameplay: GamePlay1 = GamePlay1.Instance(GamePlay1);
    constructor(){
        super();
        GamePlayInstance._instance = this;
    }
}


