import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestPos')
export class TestPos extends Component {
    start() {
        console.log(this.node.getComponent(UITransform).convertToNodeSpaceAR(this.node.parent,this.node.position))
    }

    update(deltaTime: number) {
        
    }
}


