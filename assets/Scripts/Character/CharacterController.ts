import { CCFloat, CCInteger, Component, director, Enum, misc, Prefab, RigidBody, SkeletalAnimation, v2, Vec3, _decorator, Node, AnimationClip } from "cc";
import { ActionType } from "../Common/EnumDefine";
import GamePlayInstance, { instance } from "../Common/GamePlayInstance";
import Global from "../Common/Global";
// import KeyEvent from "../Common/KeyEvent";
// import MapController from "../Common/MapController";

const { ccclass, property } = _decorator;

@ccclass
export default class CharacterController extends Component {

    @property(Node)
    ArrowDirection: Node = null;

    @property(Node)
    JoystickFollow: Node = null;

    @property({ type: Enum(ActionType) })
    actionType: ActionType = ActionType.IDLE;

    @property(CCInteger)
    speed: number = 250;

    @property(Node)
    Hand: Node = null;

    @property(Node)
    Weapon: Node = null;

    @property(CCFloat)
    timeAnim: number = 0;

    @property(Node)
    placeBua: Node = null;

    @property(Prefab)
    effectSmoke: Prefab = null;

    @property(CCInteger)
    clampLeft: number = 0;

    @property(CCInteger)
    clampRight: number = 0;

    @property(CCInteger)
    clampBottom: number = 0;

    @property(CCInteger)
    clampTop: number = 0;

    @property(CCInteger)
    level: number = 0;

    @property(CCInteger)
    scale: number = 0;

    // @property(MapController)
    // mapController: MapController = null;

    @property(CCFloat)
    speedMove: number = 0;

    originalSpeed: number = 0;
    attack: boolean = false;

    gameplayInstance: GamePlayInstance = null;
    boolPlaySoundFoot: boolean = false;
    rigidbody: RigidBody = null;

    animation: SkeletalAnimation = null;

    // onLoad () {}

    start() {
        // director
        // this.gameplayInstance = GamePlayInstance.Instance(GamePlayInstance);
        Global.touchPos = v2(0, 0);
        this.originalSpeed = this.speed;
        this.rigidbody = this.node.getComponent(RigidBody);
        this.animation = this.node.getComponent(SkeletalAnimation);
        // console.log(director.getScene().children[1].name)
    }

    update() {
        if (Global.boolEnableTouch && !Global.boolStartAttacking) {
            // this.node.position.x = misc.clampf(this.node.position.x, this.clampLeft, this.clampRight);
            // this.node.y = misc.clampf(this.node.y, this.clampBottom, this.clampTop);
            // this.Move();

            // this.mapController.ListSquareObjects.forEach(element => {
            //     if(element.OnTheLeft(this.node))
            //         {            
            //             this.node.position.x = misc.clampf(this.node.position.x, this.clampLeft, element.positionLeft.x - 1);
            //             this.node.y = misc.clampf(this.node.y, this.clampBottom, this.clampTop);
            //         }
            //     else if(element.OnTheRight(this.node))
            //         {
            //             this.node.position.x = misc.clampf(this.node.position.x, element.positionRight.x + 1, this.clampRight);
            //             this.node.y = misc.clampf(this.node.y, this.clampBottom, this.clampTop);
            //         }
            //     else if(element.OnTheTop(this.node))
            //         {
            //             this.node.position.x = misc.clampf(this.node.position.x, this.clampLeft, this.clampRight);
            //             this.node.y = misc.clampf(this.node.y, element.positionTop.y + 1, this.clampTop);
            //         }
            //     else if(element.OnTheBottom(this.node))
            //         {
            //             this.node.position.x = misc.clampf(this.node.position.x, this.clampLeft, this.clampRight);
            //             this.node.y = misc.clampf(this.node.y, this.clampBottom,  element.positionBottom.y - 1);
            //         }
            //         else
            //         {
            //             this.node.position.x = misc.clampf(this.node.position.x, this.clampLeft, this.clampRight);
            //             this.node.y = misc.clampf(this.node.y, this.clampBottom, this.clampTop);
            //         }
            // });

            let PosForX = this.node.getPosition();
            PosForX.add3f(Global.touchPos.x * (this.speed / 100), 2.559, -Global.touchPos.y * (this.speed / 100));
            this.node.position.set(PosForX.x, this.node.position.y, PosForX.z)
            if (!this.boolPlaySoundFoot) {
                this.boolPlaySoundFoot = true;
                // audioEngine.playEffect(Global.soundFootStep, false);
                this.scheduleOnce(() => {
                    this.boolPlaySoundFoot = false;
                }, 0.3);
            }
            var r = Math.atan2(-Global.touchPos.y, Global.touchPos.x);
            var degree = r * 180 / (Math.PI);
            degree = 360 - degree + 90;
            this.node.eulerAngles = new Vec3(0, degree, 0);
        }
    }

    // Move() {
    //     if (!this.boolPlaySoundFoot) {
    //         this.boolPlaySoundFoot = true;
    //         // audioEngine.playEffect(Global.soundFootStep, false);
    //         this.scheduleOnce(() => {
    //             this.boolPlaySoundFoot = false;
    //         }, 0.3);
    //     }
    //     var r = Math.atan2(Global.touchPos.y, Global.touchPos.x);
    //     var degree = r * 180 / (Math.PI);
    //     degree = 360 - degree + 90;
    //     // this.node.is3DNode = true;
    //     this.node.eulerAngles = new Vec3(-90, 180, degree);
    //     this.rigidbody.setLinearVelocity(new Vec3(this.speedMove * Global.touchPos.x, this.speedMove * Global.touchPos.y, 0));
    // }

    // Attacking() {
    //     Global.boolStartAttacking = true;
    //     Global.boolCheckAttacking = false;
    //     // this.Hand.active = true;
    //     // this.Weapon.active = true;

    //     // if (this.node.name == "MyDeadpool") {
    //     //     this.node.getComponent(SkeletonAnimation).play("Katana-Attack");
    //     // }
    //     // else {
    //     //     this.node.getComponent(SkeletonAnimation).play("Hammer Attack");
    //     // }

    //     this.setAnimAttack();
    //     // if(!Global.teleport) {
    //     //     log('=======' , this.attack)
    //     //     this.attack = true;
    //     // } else {
    //     //     this.attack = false;
    //     // }

    //     //Delay anim
    //     this.scheduleOnce(() => {
    //         Global.boolCheckAttacking = true;
    //         Global.boolCheckAttacked = true;
    //         this.spawnEffectSmoke(this.effectSmoke);
    //         if (this.node.name == "MyDeadpool") {
    //             audioEngine.playEffect(Global.katanaAttack, false);
    //         } else {
    //             audioEngine.playEffect(Global.soundAttack, false);
    //         }
    //     }, 0.25);

    //     // if(Global.teleport) {
    //     //     this.node.getComponent(SkeletonAnimation).play("Among_US_idle");
    //     // }

    //     //Final anim
    //     this.scheduleOnce(() => {
    //         this.setAnimIdle();
    //         instance.emit(KeyEvent.activeGuide);
    //         Global.boolStartAttacking = false;
    //         // this.Hand.active = false;
    //         // this.Weapon.active = false
    //     }, this.timeAnim);
    // }

    // LevelUpPlayer() {
    //     var tween = new Tween().to(0.5, { scale: this.node.scale + this.scale });
    //     tween.target(this.node).start();
    //     if (this.level < 4)
    //         this.level++;
    // }

    // spawnEffectSmoke(smoke: Prefab) {
    //     let smk = instantiate(smoke);
    //     smk.parent = Canvas.instance.node;
    //     let pos = this.node.convertToWorldSpaceAR(this.placeBua.getPosition());
    //     pos = Canvas.instance.node.convertToNodeSpaceAR(pos);
    //     smk.x = pos.x;
    //     smk.y = pos.y;
    //     smk.z = 0;
    // }

    // moveEnd(){
    //     this.setAnimRun();
    //     this.node.runAction(sequence(spawn(moveTo(1, v2(0, 20)), rotate3DTo(0.5, v3(90, 0, 180))), callFunc(()=>{
    //         this.setAnimIdle();
    //         this.gameplayInstance.gameplay.doScaleBridge();
    //     })))
    // }

    setAnimIdle() {
        // if(this.gameplayInstance.gameplay.changeSkin){
        //     if(this.gameplayInstance.gameplay.isHuggy){
        //         this.node.children[7].getComponent(SkeletonAnimation).play("Armature|idle");
        //     } else{
        //         this.node.children[6].getComponent(SkeletonAnimation).play("bone_blue|idle");
        //     }
        // } else {
        this.animation.play("Among_US_idle");
        // }
    }

    setAnimRun() {
        // if(this.gameplayInstance.gameplay.changeSkin){
        //     if(this.gameplayInstance.gameplay.isHuggy){
        //         this.node.children[7].getComponent(SkeletonAnimation).play("Armature|run");
        //     } else{
        //         this.node.children[6].getComponent(SkeletonAnimation).play("bone_blue|run");
        //     }
        // } else {
        this.animation.play("Run");

        // }
    }

    // setAnimAttack() {
    //     if(this.gameplayInstance.gameplay.changeSkin){
    //         if(this.gameplayInstance.gameplay.isHuggy){
    //             this.node.children[7].getComponent(SkeletonAnimation).play("Armature|attack_1");
    //         } else{
    //             this.node.children[6].getComponent(SkeletonAnimation).play("bone_blue|attack");
    //         }
    //     } else {
    //         this.animation.play("character_bones|attack_sword");
    //     }
    // }
}
