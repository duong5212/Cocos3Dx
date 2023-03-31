import { Canvas, CCFloat, CCInteger, Component, macro, misc, Prefab, SkeletalAnimation, UITransform, v2, Vec3, _decorator, Node, v3, UIOpacity, instantiate, Tween, director } from "cc";
import CharacterController from "../Character/CharacterController";
import GamePlayInstance, { instance } from "../Common/GamePlayInstance";
import Global from "../Common/Global";
import KeyEvent from "../Common/KeyEvent";
// import MapController from "../Common/MapController";
import Random from "../Common/Random";
import Utility from "../Common/Utility";

const { ccclass, property } = _decorator;
@ccclass
export default class EnemyController extends Component {

    @property(CCInteger)
    clampLeft: number = 0;

    @property(CCInteger)
    clampRight: number = 0;

    @property(CCInteger)
    clampTop: number = 0;

    @property(CCInteger)
    clampBottom: number = 0;

    @property(CCFloat)
    speed: number = 0;
    // @property(Node)
    // PointShoot: Node = null;

    @property(Node)
    bodyDeath: Node = null;

    @property(Prefab)
    effectBlood: Prefab = null;

    @property(Node)
    posBlood: Node = null;

  

    // @property(RigidBody3D)
    // rigidbody: RigidBody3D = null;

    moveX: number = 0;
    moveY: number = 0;
    moveZ: number = 0;
    degree: number = 0;
    boolCheckAttacking: boolean = false;
    boolCheckAttacked: boolean = false;
    boolEnemyDeath: boolean = false;
    checkFollowPlayer: boolean = false;
    checkDeath: boolean = false;
    canMove: boolean = false;
    boolCatch: boolean = false;
    animRun;
    animIdle
    //rigidbody: RigidBody3D = null;
    boolMoveDont: boolean = false;
    scene;

    start() {
        this.scene = director.getScene();
        this.animIdle = 'Among_US_idle';
        this.animRun = 'Run';
        // this.node.getComponent(BoxCollider3D).enabled = true;
        this.canMove = false;
        //this.rigidbody = this.node.getComponent(RigidBody3D);
        // let collider = this.node.getComponent(Collider3D);
        // collider.on('collision-enter', this.onCollision, this);
        this.StartMove();
    }

    // update() {
    //     // if (!this.boolCatch && Global.boolEnemyStartMove) {
    //     //     if (!this.boolMoveDont) {
    //     //         this.Move();
    //     //         this.boolMoveDont = true;
    //     //     }
    //     //     if (Utility.Instance(Utility).Distance(v2(this.node.position.x, this.node.position.y), v2(this.moveX, this.moveY)) <= 3) {
    //     //         this.rigidbody.setLinearVelocity(new Vec3(0, 0, 0));
    //     //         this.node.getComponent(SkeletalAnimation).play("character_bones|zombie_idle");
    //     //         this.Move();
    //     //     }
    //     //     //this.CheckBeingAttacked();
    //     // }       
    //     // else {
    //     //     this.rigidbody.setLinearVelocity(new Vec3(0, 0, 0));
    //     // }
    //     if (!this.checkDeath) {
    //         if (Global.boolStartAttacking && Global.boolCheckAttacking) {

    //             let pos1 = this.scene.children[0].convertToNodeSpaceAR(GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.getComponent(UITransform).convertToWorldSpaceAR(GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.children[0].getPosition()));
    //             let pos2 = this.scene.children[0].convertToNodeSpaceAR(GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.getComponent(UITransform).convertToWorldSpaceAR(GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.children[1].getPosition()));
    //             let pos3 = this.scene.children[0].convertToNodeSpaceAR(GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.getComponent(UITransform).convertToWorldSpaceAR(GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.children[2].getPosition()));
    //             let direction1 = v2(pos1.x - GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.x, pos1.y - GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.y);
    //             let direction2 = v2(pos2.x - GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.x, pos2.y - GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.y);
    //             let degree = direction1.signAngle(direction2);
    //             degree = misc.radiansToDegrees(degree);
    //             let posEnemy = v2(this.node.position.x - GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.x, this.node.position.y - GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.y);
    //             let degreeWithPos1 = posEnemy.signAngle(direction1);
    //             degreeWithPos1 = misc.radiansToDegrees(degreeWithPos1);
    //             let degreeWithPos2 = posEnemy.signAngle(direction2);
    //             degreeWithPos2 = misc.radiansToDegrees(degreeWithPos2);
    //             let realNeed = 0;
    //             degreeWithPos1 = Math.abs(degreeWithPos1);
    //             degreeWithPos2 = Math.abs(degreeWithPos2);
    //             if (degreeWithPos1 > degreeWithPos2) {
    //                 realNeed = degreeWithPos1;
    //             }
    //             else {
    //                 realNeed = degreeWithPos2;
    //             }
    //             let distance = Utility.Instance(Utility).Distance(v2(this.node.position.x, this.node.position.y), v2(GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.x, GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.y));
    //             let maxDistance = Utility.Instance(Utility).Distance(v2(GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.x, GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.y), v2(pos3.x, pos3.y));
    //             if (Math.abs(realNeed) < degree) {
    //                 if (distance < maxDistance) {
    //                     if (Global.boolCheckAttacked && !this.boolEnemyDeath) {
    //                         // GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.getComponent(CharacterController).LevelUpPlayer();
    //                         //this.DestroyByKatana();
    //                         this.scheduleOnce(() => {
    //                             this.DestroyByHammer();
    //                         }, 0.05);
    //                         this.checkDeath = true;
    //                         Global.boolCheckAttacked = false;
    //                         Global.boolCheckAttacking = false;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    StartMove() {
        this.schedule(() => {
            this.moveEnemy();
            //this.checkFollowPlayer = true;
        }, 6.5, macro.REPEAT_FOREVER, 0.1);
    }

    // DestroyByHammer() {
    //     this.boolEnemyDeath = true;
    //     // audioEngine.playEffect(Global.soundDie, false);
    //     instance.emit(KeyEvent.plusEnemy);
    //     instance.emit(KeyEvent.scale);
    //     this.node.stopAllActions();
    //     this.unscheduleAllCallbacks();
    //     this.node.getComponent(SkeletalAnimation).stop();
    //     //this.PointShoot.active = false;
    //     this.node.position = new Vec3(this.node.position.x, this.node.position.y + 0.5, this.node.position.z + 3);
    //     this.node.eulerAngles = new Vec3(180, 0, 0);
    //     //this.node.scaleZ = 100;
    //     //this.node.opacity = 0;
    //     //this.node.position.z = this.moveZ;
    //     this.checkDeath = true;
    //     //this.SpawnerBlood();
    //     this.SpawnerEffectBlood(this.node.position.x, this.node.position.y, this.node.position.z);
    //     this.node.children[2].active = true;
    // }

    // DestroyByKatana() {
    //     this.boolEnemyDeath = true;
    //     // audioEngine.playEffect(Global.soundScream, false);
    //     instance.emit(KeyEvent.plusEnemy);
    //     instance.emit(KeyEvent.scale);
    //     this.checkDeath = true;
    //     this.SpawnerBodyDeath(0.7);
    //     this.SpawnerEffectBlood(this.node.position.x, this.node.position.y, this.node.position.z);
    //     this.node.stopAllActions();
    //     // this.unscheduleAllCallbacks();
    //     this.node.getComponent(SkeletalAnimation).stop();
    // }

    SpawnerBlood() {
        this.bodyDeath.active = true;
        let pos = this.node.getComponent(UITransform).convertToWorldSpaceAR(this.posBlood.getPosition());
        pos = this.scene.children[0].convertToNodeSpaceAR(pos);
        this.bodyDeath.setPosition(pos.x, pos.y + 2, 0);
        this.bodyDeath.eulerAngles = v3(90, 0, this.node.eulerAngles.z);
    }

    SpawnerEffectBlood(x: number, y: number, z: number) {
        let EffectBlood = instantiate(this.effectBlood);
        EffectBlood.parent = this.scene.children[0];
        
    
        // EffectBlood.x = x;
        // EffectBlood.y = y + 2;
        // EffectBlood.z = z;
        EffectBlood.setPosition(x,y+2,z)
    }

    SpawnerBodyDeath(timing: number) {
        this.bodyDeath.active = true;
        this.bodyDeath.setPosition(this.node.position.x, this.node.position.y, this.node.position.z);
        this.bodyDeath.eulerAngles = v3(-90, 180, this.node.eulerAngles.z);
        this.node.getComponent(UIOpacity).opacity = 0;
        this.scheduleOnce(() => {
            this.bodyDeath.getComponent(SkeletalAnimation).stop();
            this.node.destroy();
        }, timing);
    }

    moveEnemy() {
        // this.node.getComponent(SkeletalAnimation).play("character_bones|zombie_run");
        this.node.getComponent(SkeletalAnimation).play(this.animRun);
        if (this.checkFollowPlayer) {
            let Distance = Utility.Instance(Utility).Distance(v2(this.node.position.x, this.node.position.y), v2(GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.x, GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.y));
            let duration = Distance / 21;
            this.moveX = GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.x;
            this.moveY = GamePlayInstance.Instance(GamePlayInstance).gameplay.MyCharacter.position.y;
            this.degree = this.betweenDegree(v2(this.node.position.x, this.node.position.y), v2(this.moveX, this.moveY)) - 90;
            var tween = new Tween().to(duration, { position: v3(this.moveX, this.moveY, this.moveZ) }).call(() => {
                this.EnemyAttack();
            });
            tween.target(this.node).start();
        }
        else {
            this.moveX = Random.Instance(Random).RandomRange(this.clampLeft, this.clampRight);
            this.moveY = Random.Instance(Random).RandomRange(this.clampBottom, this.clampTop);
            while (Utility.Instance(Utility).Distance(v2(this.node.position.x, this.node.position.y), v2(this.moveX, this.moveY)) < 10) {
                this.moveX = Random.Instance(Random).RandomRange(this.clampLeft, this.clampRight);
                this.moveY = Random.Instance(Random).RandomRange(this.clampBottom, this.clampTop);
            }
            this.degree = this.betweenDegree(v2(this.node.position.x, this.node.position.y), v2(this.moveX, this.moveY)) + 90;
            var tween = new Tween().to(4.5, { position: v3(this.moveX, this.node.position.y, this.moveY) }).call(() => {
                // this.node.getComponent(SkeletalAnimation).play("character_bones|zombie_idle");
                this.node.getComponent(SkeletalAnimation).play(this.animIdle);
            });
            tween.target(this.node).start();
        }
        // this.node.runAction(rotate3DTo(0.2, v3(-90, -180, -this.degree)));
        this.node.eulerAngles = new Vec3(0, -this.degree, 0);
    }

    // Move() {
    //     this.rigidbody.setLinearVelocity(new Vec3(0, 0, 0));
    //     this.node.getComponent(SkeletalAnimation).play("character_bones|zombie_run");
    //     this.moveX = Utility.Instance(Utility).RandomRange(this.clampLeft, this.clampRight);
    //     this.moveY = Utility.Instance(Utility).RandomRange(this.clampBottom, this.clampTop);
    //     let way = new Vec2(this.moveX - this.node.position.x, this.moveY - this.node.position.y).normalize();
    //     this.rigidbody.setLinearVelocity(new Vec3( way.x  * this.speed, way.y  * this.speed, 0) );
    //     //log("x: " + way.x * 6);
    //     var r = Math.atan2(way.y, way.x);
    //     var degree = r * 180 / Math.PI;
    //     degree = 360 - degree + 90;
    //     this.node.runAction(rotate3DTo(0.5, v3(-90, 180, degree)));
    // }

    betweenDegree(dirVec, comVec) {
        let angleDeg = Math.atan2(dirVec.y - comVec.y, dirVec.x - comVec.x) * 180 / Math.PI;
        return angleDeg;
    }

    EnemyAttack() {
        this.boolCheckAttacking = false;
        if (this.node.name == "MyVenom") {
            this.node.getComponent(SkeletalAnimation).play("AmongUs_Attack");
        }
        else {
            this.node.getComponent(SkeletalAnimation).play("character_bones|zombie_attack");
        }
        this.scheduleOnce(() => {
            this.boolCheckAttacking = true;
            this.boolCheckAttacked = true;
            // audioEngine.playEffect(Global.soundAttack, false);
        }, 0.5);
        this.scheduleOnce(() => {
        }, 0.6);
        this.scheduleOnce(() => {
            Global.boolStartAttacking = false;
            this.node.getComponent(SkeletalAnimation).play("character_bones|zombie_idle");
        }, 1);
    }

}