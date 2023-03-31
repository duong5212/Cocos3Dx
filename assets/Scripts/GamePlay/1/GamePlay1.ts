import { _decorator, Component, Node, Game } from 'cc';
import Singleton from '../../Common/Singleton';
const { ccclass, property } = _decorator;

declare const window: any;

@ccclass('GamePlay1')
export class GamePlay1 extends Singleton<GamePlay1> {


    ironsource: boolean = false;
    mindworks: boolean = true;
    vungle: boolean = false;

    @property(Node)
    MyCharacter: Node = null;

    constructor() {
        super();
        GamePlay1._instance = this;
    }

    gameStart(){
        console.log('start')
    }

    gameClose(){
        console.log('close');
    }

    start() {
        if (this.mindworks)
            window.gameReady && window.gameReady();

        if (this.ironsource) {
            window.NUC.trigger.interaction();//luc click
        }
        this.gameStart();
        this.gameClose();
    }

    update(deltaTime: number) {

    }

    EventNetWork() {
        if (this.mindworks) {
            window.gameEnd && window.gameEnd();
        }
        if (this.ironsource) {
            window.NUC.trigger.endGame('win')
        }
        if (this.vungle) {
            parent.postMessage('complete', '*');
        }
    }
}


