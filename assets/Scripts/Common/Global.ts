import { _decorator, Vec2 } from 'cc';

interface Global {
    touchPos: Vec2,
    boolEnableTouch: boolean,
    boolFirstTouchJoyStick: boolean,
    boolStartPlay: boolean,
    boolStartAttacking: boolean,
    boolCheckAttacking: boolean,
    boolCheckAttacked: boolean,
    boolEnemyStartMove: boolean,
    boolendG: boolean,
    teleport: boolean,
    enableAttack: boolean,
    boolCheckTele: boolean,
};

let Global: Global ={
    touchPos: null,
    boolEnableTouch: false,
    boolFirstTouchJoyStick: false,
    boolStartPlay: false,
    boolStartAttacking: false,
    boolCheckAttacking: false,
    boolCheckAttacked: false,
    boolEnemyStartMove: false,
    boolendG: false,
    teleport: false,
    enableAttack: false,
    boolCheckTele: false,
};

export default Global;