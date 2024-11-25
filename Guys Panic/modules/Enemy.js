//import Phaser from 'phaser'
//guess you only need that for typescript's typing?

export default class Enemy extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene,x,y,texture,frame)
    }
}
