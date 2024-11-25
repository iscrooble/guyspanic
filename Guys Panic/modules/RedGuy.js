

export default class RedGuy extends Enemy
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene,x,y,texture,frame)

        this.anims.play('enemyAnim1');
    }

}