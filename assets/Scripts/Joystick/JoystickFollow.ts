import { _decorator, Component, Node, Vec2, UITransform, Input, input, EventTouch, UIOpacity, v3, v2, Camera } from 'cc';
import CharacterController from '../Character/CharacterController';
import GamePlayInstance from '../Common/GamePlayInstance';
import Global from '../Common/Global';
const { ccclass, property } = _decorator;

@ccclass('JoystickFollow')
export class JoystickFollow extends Component {

    @property(Node)
    joyRing: Node = null;

    @property(Node)
    joyDot: Node = null;

    @property(Camera)
    CameraUI: Camera = null;


    stickPos: Vec2 = null;
    touchLocation: Vec2 = null;
    radius: number = 0;
    gameplayInstance: GamePlayInstance;


    onLoad() {
        this.radius = this.joyRing.getComponent(UITransform).contentSize.width / 2;
    }

    start() {
        this.gameplayInstance = GamePlayInstance.Instance(GamePlayInstance);
        input.on(Input.EventType.TOUCH_START, this.touchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);
        input.on(Input.EventType.TOUCH_END, this.touchCancel, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.touchCancel, this);
    }

    touchStart(event: EventTouch) {

        Global.boolEnemyStartMove = true;
        var mousePos = event.getLocation();
        console.log(mousePos);
        // let localMousePos = this.CameraUI.screenToWorld(new Vec3(mousePos.x, mousePos.y, 0))

        let localMousePos = this.node.getComponent(UITransform).convertToNodeSpaceAR(v3(mousePos.x, mousePos.y, 0));
        // let localMousePos = v3(mousePos.x - screen.width/2, mousePos.y - 480, 0);
        // localMousePos = v3(localMousePos.x * (480 / 375) + 120, localMousePos.y * (480 / 375) + 200 , 0);
        console.log(localMousePos);
        this.node.getComponent(UIOpacity).opacity = 255;
        this.stickPos = v2(localMousePos.x, localMousePos.y);
        this.touchLocation = event.getLocation();
        this.joyRing.setPosition(localMousePos);
        this.joyDot.setPosition(localMousePos);
        console.log(this.joyDot.position);
        // this.gameplayInstance.gameplay.Guide.active = false;
        // this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).ArrowDirection.active = true;
    }

    touchMove(event: EventTouch) {
        this.node.getComponent(UIOpacity).opacity = 255;
        Global.boolEnemyStartMove = true;
        Global.boolEnableTouch = true;
        if (!Global.boolFirstTouchJoyStick) {
            Global.boolFirstTouchJoyStick = true;
            this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).setAnimRun();
            
        }
        if (this.touchLocation === event.getLocation()) {
            return false;
        }

        // this.gameplayInstance.gameplay.Guide.active = false;
        let touchPos = this.joyRing.getComponent(UITransform).convertToNodeSpaceAR(v3(event.getLocation().x, event.getLocation().y, 0));
        let distance = v2(touchPos.x, touchPos.y).length();
        let posX = this.stickPos.x + touchPos.x;
        let posY = this.stickPos.y + touchPos.y;
        let p = v2(posX, posY).subtract(v2(this.joyRing.getPosition().x, this.joyRing.getPosition().y)).normalize();
        Global.touchPos = p;
        if (this.radius > distance) {
            this.joyDot.setPosition(v3(posX, posY, 0));
        } else {
            let x = this.stickPos.x + p.x * this.radius;
            let y = this.stickPos.y + p.y * this.radius;
            this.joyDot.setPosition(v3(x, y, 0));
        }



        // this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).ArrowDirection.active = true;
    }

    touchCancel() {
        Global.boolEnableTouch = false;
        this.joyDot.setPosition(this.joyRing.getPosition());
        if (!Global.boolCheckTele) {
            Global.enableAttack = false;
            this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).setAnimIdle();
        } else {
            Global.enableAttack = true;
            // this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).Attacking();
        }
        // this.gameplayInstance.gameplay.MyCharacter.getComponent(CharacterController).Attacking();
        this.node.getComponent(UIOpacity).opacity = 255;
        Global.boolFirstTouchJoyStick = false;
    }

    update(deltaTime: number) {

    }
}


