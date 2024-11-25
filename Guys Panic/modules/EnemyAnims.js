

const createRedGuyAnims = (anims) => {
    anims.create({
        key: 'enemyAnim1',
        frames: anims.generateFrameNumbers('testEnemy',{start:0,end:2}),
        frameRate: 6,
        repeat: -1,
        yoyo: true,
    });



}

const createYellowGuyAnims = (anims) => {

    anims.create({
        key: 'enemyAnim2',
        frames: anims.generateFrameNumbers('testEnemy',{start:3,end:5}),
        frameRate: 6,
        repeat: -1,
        yoyo: true,
    });

}

const createBlueGuyAnims = (anims) => {

    anims.create({
        key: 'enemyAnim3',
        frames: anims.generateFrameNumbers('testEnemy',{start:6,end:8}),
        frameRate: 6,
        repeat: -1,
        yoyo: true,
    });

}

export {
    createRedGuyAnims,
    createYellowGuyAnims,
    createBlueGuyAnims
}