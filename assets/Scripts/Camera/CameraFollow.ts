

import { Component, _decorator, Node, misc, v3, Vec3, lerp } from "cc";
import CharacterController from "../Character/CharacterController";
import GamePlayInstance from "../Common/GamePlayInstance";
import Global from "../Common/Global";

const { ccclass, property } = _decorator;

@ccclass
export default class CameraFollow extends Component {
    gameplayInstance: GamePlayInstance = null;
    cameraOffsetX: number = 0;
    cameraOffsetY: number = 0;
    cameraOffsetZ: number = 0;
    Target: Node = null;
    //9,12
    plusY: number = 0;
    plusZ: number = 0;
    start() {
        this.gameplayInstance = GamePlayInstance.Instance(GamePlayInstance);
        this.cameraOffsetX = this.node.position.x - 0;
        this.cameraOffsetY = this.node.position.y + 0;
        this.cameraOffsetZ = this.node.position.z;
    }
    update() {
        // if (Global.boolStartPlay && !Global.boolendG) {
        if (this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).level == 0) {
            // this.node.position.x = lerp(this.node.position.x, this.gameplayInstance.gameplay.MyCharacter.position.x + this.cameraOffsetX, 0.2);
            // this.node.position.y = lerp(this.node.position.y, this.gameplayInstance.gameplay.MyCharacter.position.y + this.cameraOffsetY, 0.2);
            // this.node.position.z = lerp(this.node.position.z, this.gameplayInstance.gameplay.MyCharacter.position.z + this.cameraOffsetZ, 0.2);
            // lerp(this.node.position.x, this.gameplayInstance.gameplay.MyCharacter.position.x + this.cameraOffsetX, 0.2);
            // lerp(this.node.position.y, this.gameplayInstance.gameplay.MyCharacter.position.y + this.cameraOffsetY, 0.2);
            // lerp(this.node.position.z, this.gameplayInstance.gameplay.MyCharacter.position.z + this.cameraOffsetZ, 0.2);
            this.node.setPosition(lerp(this.node.position.x, this.gameplayInstance.gameplay.MyCharacter.position.x + this.cameraOffsetX, 0.2),
            lerp(this.node.position.y, this.gameplayInstance.gameplay.MyCharacter.position.y + this.cameraOffsetY, 0.2),
            lerp(this.node.position.z, this.gameplayInstance.gameplay.MyCharacter.position.z + this.cameraOffsetZ, 0.2))

        }
        // else if (this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).level == 1) {
        //     this.node.position.x = lerp(this.node.position.x, this.gameplayInstance.gameplay.MyCharacter.position.x + this.cameraOffsetX, 0.2);
        //     this.node.position.y = lerp(this.node.position.y, this.gameplayInstance.gameplay.MyCharacter.position.y + this.cameraOffsetY - 15, 0.2);
        //     this.node.position.z = lerp(this.node.position.z, this.gameplayInstance.gameplay.MyCharacter.position.z + this.cameraOffsetZ + 12, 0.2);
        // }
        // else if (this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).level == 2) {
        //     this.node.position.x = lerp(this.node.position.x, this.gameplayInstance.gameplay.MyCharacter.position.x + this.cameraOffsetX, 0.2);
        //     this.node.position.y = lerp(this.node.position.y, this.gameplayInstance.gameplay.MyCharacter.position.y + this.cameraOffsetY - 30, 0.2);
        //     this.node.position.z = lerp(this.node.position.z, this.gameplayInstance.gameplay.MyCharacter.position.z + this.cameraOffsetZ + 24, 0.2);
        // }
        // else if (this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).level == 3) {
        //     this.node.position.x = lerp(this.node.position.x, this.gameplayInstance.gameplay.MyCharacter.position.x + this.cameraOffsetX, 0.2);
        //     this.node.position.y = lerp(this.node.position.y, this.gameplayInstance.gameplay.MyCharacter.position.y + this.cameraOffsetY - 45, 0.2);
        //     this.node.position.z = lerp(this.node.position.z, this.gameplayInstance.gameplay.MyCharacter.position.z + this.cameraOffsetZ + 36, 0.2);
        // }
        // else if (this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).level == 4) {
        //     this.node.position.x = lerp(this.node.position.x, this.gameplayInstance.gameplay.MyCharacter.position.x + this.cameraOffsetX, 0.2);
        //     this.node.position.y = lerp(this.node.position.y, this.gameplayInstance.gameplay.MyCharacter.position.y + this.cameraOffsetY - 48, 0.2);
        //     this.node.position.z = lerp(this.node.position.z, this.gameplayInstance.gameplay.MyCharacter.position.z + this.cameraOffsetZ + 36, 0.2);
        // }
        // }
        // else if (Global.boolendG) {
        // this.node.position.x = 0;
        // this.node.position.y = -186;
        // this.node.position.z = 94;
        // this.node.eulerAngles = new Vec3(57.8,0,0);

        // this.node.position.x = lerp(this.node.position.x, this.gameplayInstance.gameplay.MyCharacter.position.x + this.cameraOffsetX, 0.2);
        // this.node.position.y = lerp(this.node.position.y, this.gameplayInstance.gameplay.MyCharacter.position.y + this.cameraOffsetY - 30, 0.2);
        // this.node.position.z = lerp(this.node.position.z, this.gameplayInstance.gameplay.MyCharacter.position.z + this.cameraOffsetZ + 40, 0.2);
        // }
        // else if (!Global.teleport) {
        //     Global.boolCheckTele = true;
        //     this.node.position.x = lerp(this.node.position.x, this.gameplayInstance.gameplay.MyCharacter.position.x + this.cameraOffsetX + 30, 0.2);
        //     this.node.position.y = lerp(this.node.position.y, this.gameplayInstance.gameplay.MyCharacter.position.y + this.cameraOffsetY , 0.2);
        //     this.node.position.z = lerp(this.node.position.z, this.gameplayInstance.gameplay.MyCharacter.position.z + this.cameraOffsetZ + 5, 0.2);
        //     // this.node.position.x = -87;
        //     // this.node.position.y = 60;
        //     // this.node.position.z = 76.5;
        //     this.node.eulerAngles = new Vec3(46, -2, 22);
        // }
        // else {
        //     for (let i = 0; i < this.gameplayInstance.gameplay.enemyParent.childrenCount; i++) {
        //         this.Target = this.gameplayInstance.gameplay.enemyParent.children[i];
        //     }
        //     this.resetOffset();
        //     this.node.position.x = lerp(this.node.position.x, this.Target.x / 2, 0.2);
        //     this.node.position.y = lerp(this.node.position.y, this.Target.y + this.cameraOffsetY, 0.2);
        //     this.node.position.z = lerp(this.node.position.z, this.Target.z + this.cameraOffsetZ, 0.2);
        //}
        //}
    }
    // resetOffset(x: number, y: number, z: number) {
    //     this.cameraOffsetX = this.cameraOffsetX - x;
    //     this.cameraOffsetY = this.cameraOffsetY - y;
    //     this.cameraOffsetZ = this.cameraOffsetZ + z;
    // }
    PlusYZ() {
        this.plusY += 12;
        this.plusZ += 9;
    }

    ChangePosMerge() {
        this.node.setPosition(v3(0, -66.5, 127));
        this.node.eulerAngles = new Vec3(50, 0, 0);
    }
}
