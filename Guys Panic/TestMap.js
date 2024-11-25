
var screenW = 320;
var screenH = 240;

var currentScene;

var config = {
    type: Phaser.AUTO,
    width: screenW,
    height: screenH,
    backgroundColor: '#ff00ff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false,
            fixedStep: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    scale:{
        zoom: 2
    }
};

var game = new Phaser.Game(config);
var mapArray;
var backgroundArray;
const mapMaskArray = [];
var revealMask = [];
var intSpeed = 1;
var intervalTimer = intSpeed;
var layer;
var player;
var isMoving = false;

var silhouetteColor = 0; //black

var borderColor = 0; //black
var baseColor = 4; //transparent (were gonna do something different here)
var edgeColor = 2; //yellow
var drawColor = 3; //blue
var transColor = 1; //pink

var speed = 2;

let aPress;
let bPress;

var map;
let mapMask;
//let revealMask;

let tileIndex;
let tileIndexR;
let tileIndexD;
let tileIndexL;
let tileIndexU;

let playerState="";

let borderWidth = 6;

let imageWidth;
let imageHeight;

var drawTileset;
var finishedImage;

var imageUsed;

//let imageMask;

function preload ()
{

    currentScene = this;

    //replace with real tiles later
    //This is a 5x1 tileset
    this.load.image('baseTiles','assets/image/placeholderTiles.png');
    this.load.image('maskTiles','assets/image/maskTiles.png');
    this.load.image('bgTiles1','assets/image/bgTile1.png');

    //player
//    this.load.spritesheet('player','assets/image/cursor.png',{frameWidth:9,frameHeight:9});
    this.load.spritesheet('player','assets/image/cursor/cursorShiba.png',{frameWidth:31,frameHeight:41});

    //enemies
    this.load.spritesheet('testEnemy','assets/image/enemies/testEnemy.png',{frameWidth:24,frameHeight:24});
    this.load.spritesheet('bullEnemy','assets/image/enemies/bull.png',{frameWidth: 150, frameHeight: 180});
    this.load.spritesheet('bullBlob','assets/image/enemies/blobbert.png',{frameWidth: 60, frameHeight: 60});

    //silhouette
    this.load.image('backgroundSilhouette','assets/image/testImageMask.png');
    this.load.image('backgroundImage','assets/image/testImage.png');
//    this.load.image('backgroundSilhouette','assets/image/imageReveal/testVerticalMask.png');
//    this.load.image('backgroundImage','assets/image//imageReveal/testVertical.png');

    this.load.image('border','assets/image/border/border1.png');
//    borderImage.setScrollFactor(0,0);

    //preloading audio
    this.load.audio('success','assets/audio/placeholder/success.ogg')
    this.load.audio('success2','assets/audio/placeholder/success2.ogg')
    this.load.audio('roulette','assets/audio/placeholder/roulette.ogg')
    this.load.audio('explosion','assets/audio/placeholder/explosion.ogg')
    this.load.audio('explosion2','assets/audio/placeholder/explosion2.ogg')
    this.load.audio('explosion3','assets/audio/placeholder/explosion3.ogg')
    this.load.audio('explosion4','assets/audio/placeholder/explosion4.ogg')
    this.load.audio('explosion5','assets/audio/placeholder/explosion5.ogg')


    //bull audio
    this.load.audio('bullSwingGrunt','assets/audio/placeholder/bullSwingGrunt.ogg')


    //preloading fonts
    this.load.bitmapFont('score', 'assets/fonts/hardPixel_0.png', 'assets/fonts/hardPixel.fnt');

    
    //preloading particles
    this.load.spritesheet('sparkle','assets/image/particles/sparkle.png',{frameWidth:9,frameHeight:15});
    this.load.spritesheet('cleanSparkle','assets/image/particles/cleanSparkle.png',{frameWidth:9,frameHeight:15});
    this.load.spritesheet('rainbowstar','assets/image/particles/rainbowstar.png',{frameWidth:29,frameHeight:29});
    this.load.spritesheet('glow','assets/image/particles/glow.png',{frameWidth:18,frameHeight:18});
    this.load.spritesheet('explosion1','assets/image/particles/explosion1.png',{frameWidth:20,frameHeight:20});
    this.load.spritesheet('explosion3','assets/image/particles/explosion3.png',{frameWidth:40,frameHeight:44});
    this.load.spritesheet('musicNotes','assets/image/particles/music notes.png',{frameWidth:16,frameHeight:20});

    
}

var silhouetteMatrix = []
var totalSilhouette;
var scoreText;
var scoreTextRight;
var sparkleEmitter;
var sparkleEmitter2;
var drawSparkles;
var rainbowStarEmitter;
var rainbowStarEmitter2;
var explosionEmitter1;
var explosionEmitter2;
var explosionEmitter3;
var glowSprite;

var silhouetteHue;
var silhouetteHueValue;

var enemyArray = [];
var totalBlobs=0;

var cam;
var UICam;

var boxRoulette = true;
var boxTimer = 0;


//this.addScore;

function create ()
{


    //camera creation

    //audio creation

    sfxSuccess = this.sound.add('success');
    sfxSuccess2 = this.sound.add('success2');
    sfxExplosion = this.sound.add('explosion');
    sfxExplosion2 = this.sound.add('explosion2');
    sfxExplosion3 = this.sound.add('explosion3');
    sfxExplosion3.setLoop(true);
    sfxExplosion4 = this.sound.add('explosion4');
    sfxExplosion5 = this.sound.add('explosion5');
    sfxRoulette = this.sound.add('roulette');
    sfxBullSwingGrunt = this.sound.add('bullSwingGrunt');



    //the rest lol

    var image = this.textures.get('backgroundImage').getSourceImage();
    imageWidth = image.width;
    imageHeight = image.height;

    if (imageWidth%2 != 0 || imageHeight%2 != 0){
        console.log("ERROR: Image dimensions not divisible by 2.")
    }

/*     bgArray = [...Array(imageHeight)].map(e => Array(imageWidth).fill(1));

    for(i=0;i<imageHeight;i++){
        for(j=0;j<imageWidth;j++){
            if(i%64 ==0 && j%64 == 0){
                bgArray[i][j] = 0;
            }
        }
    }
 */

    map = this.make.tilemap({tileWidth:1,tileHeight:1,width:imageWidth,height:imageHeight});
//    bgMap = this.make.tilemap({tileWidth:64,tileHeight:64,width:6,height:4});
    drawTileset = map.addTilesetImage('baseTiles',null,1,1);
//    bgTileset = map.addTilesetImage('bgTiles1',null,64,64);

//    bgLayer = bgMap.createBlankLayer('bgLayer',bgTileset);
//    bgLayer.putTilesAt(bgArray,0,0,64,64);

//    bgLayer = map.createBlankLayer('bgLayer',bgTileset);
//    bgLayer.randomize(0,0,imageWidth,imageHeight,[0])
//    bgLayer.putTilesAt(bgArray,0,0,64,64);
//    bgLayer.putTileAt(0,64,0);

//    bgLayer.putTileAt(0,2,2);


//    this.addScore = this.add.bitmapText(0,0,'score','')
//    this.addScore.text = `+$IODASJIODJDSOJDIOJIOJSIDO%`
//    this.addScore.depth = 1
//    console.log("depth: " + this.addScore.depth);


    percentageRevealed = 0;
    numRevealed = 0;
    //adding background image

    imageSilh = this.add.image(0,0,'backgroundSilhouette').setOrigin(0,0);


    totalSilhouette = 0;

    console.log("Width: " + imageWidth);
    console.log("Height: " + imageHeight)


    //manually make the data matrices for each image if performance becomes an issue
    var pixel = new Phaser.Display.Color();
    
    silhouetteMatrix = [...Array(imageHeight)].map(e => Array(imageWidth).fill(0));
    //silhouetteMatrix.length

//    console.log(silhouetteMatrix)

    for (i=borderWidth+1;i<imageWidth-borderWidth;i++){
        for (j=borderWidth+1;j<imageHeight-borderWidth;j++){
            pixel = this.textures.getPixel(i, j, 'backgroundSilhouette');
            if(pixel.a == 255){
                silhouetteMatrix[j][i] = 1;
                totalSilhouette++;
                
            }
        }
    }


    silhouetteHue = imageSilh.postFX.addColorMatrix();
//    const silhouetteGlow = imageUsed.preFX.addGlow(0x3793ff, 2);
//    const silhouetteBloom = imageUsed.preFX.addBloom();


    const tween = this.tweens.addCounter({
        from: 0,
        to: 360,
        duration: 10000,
        loop: -1,
        onUpdate: (tween) => {
            //silhouetteHueValue = tween.getValue();
            silhouetteHue.hue(tween.getValue());
//            silhouetteGlow.glcolor(tween.getValue());
        }
    });


    this.anims.create({
        key: 'idle',
        frames: [{key:'player',frame:0},{key:'player',frame:1}],
        frameRate:4,
        repeat: -1
    })

    this.anims.create({
        key: 'drawingLeft',
        frames: this.anims.generateFrameNumbers('player',{start:0, end:1}),
        frameRate: 4,
        repeat: -1
    })
    this.anims.create({
        key: 'drawingRight',
        frames: this.anims.generateFrameNumbers('player',{start:0, end:1}),
        frameRate: 4,
        repeat: -1
    })
    this.anims.create({
        key: 'drawingUp',
        frames: this.anims.generateFrameNumbers('player',{start:0, end:1}),
        frameRate: 4,
        repeat: -1
    })
    this.anims.create({
        key: 'drawingDown',
        frames: this.anims.generateFrameNumbers('player',{start:0, end:1}),
        frameRate: 4,
        repeat: -1
    })


    this.anims.create({
        key: 'erasing',
        frames: this.anims.generateFrameNumbers('player',{start:0, end:1}),
        frameRate: 4,
        repeat: -1
    })


        //enemy animations
        this.anims.create({
            key: 'enemyAnim1',
            frames: this.anims.generateFrameNumbers('testEnemy',{start:0,end:2}),
            frameRate: 6,
            repeat: -1,
            yoyo: true,
        });
        this.anims.create({
            key: 'enemyDie1',
            frames: this.anims.generateFrameNumbers('testEnemy',{start:4,end:5}),
            frameRate: 12,
            repeat: -1,
            yoyo: true,
        });
        this.anims.create({
            key: 'enemyLaugh1',
            frames: [{key:'testEnemy',frame:1},{key:'testEnemy',frame:3}],
            frameRate: 8,
            repeat: -1,
            yoyo: true,
        });
    
        this.anims.create({
            key: 'enemyAnim2',
            frames: this.anims.generateFrameNumbers('testEnemy',{start:6,end:8}),
            frameRate: 6,
            repeat: -1,
            yoyo: true,
        });
        this.anims.create({
            key: 'enemyDie2',
            frames: this.anims.generateFrameNumbers('testEnemy',{start:10,end:11}),
            frameRate: 12,
            repeat: -1,
            yoyo: true,
        });
        this.anims.create({
            key: 'enemyLaugh2',
            frames: [{key:'testEnemy',frame:7},{key:'testEnemy',frame:9}],
            frameRate: 8,
            repeat: -1,
            yoyo: true,
        });
    
        this.anims.create({
            key: 'enemyAnim3',
            frames: this.anims.generateFrameNumbers('testEnemy',{start:12,end:14}),
            frameRate: 6,
            repeat: -1,
            yoyo: true,
        });
        this.anims.create({
            key: 'enemyDie3',
            frames: this.anims.generateFrameNumbers('testEnemy',{start:16,end:17}),
            frameRate: 12,
            repeat: -1,
            yoyo: true,
        });
        this.anims.create({
            key: 'enemyLaugh3',
            frames: [{key:'testEnemy',frame:13},{key:'testEnemy',frame:15}],
            frameRate: 8,
            repeat: -1,
            yoyo: true,
        });

        //bull
        this.anims.create({
            key: 'bullMove',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:15,end:16}),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: 'bullLaugh',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:0,end:1}),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: 'bullSwing1',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:3,end:3}),
            frameRate: 8,
//            repeat: -1,
        });
        this.anims.create({
            key: 'bullSwing2',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:4,end:5}),
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: 'bullSwing3',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:6,end:6}),
            frameRate: 4,
//            repeat: -1,
        });
        this.anims.create({
            key: 'bullSwing4',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:7,end:9}),
            frameRate: 24,
        });
        this.anims.create({
            key: 'bullSing1',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:11,end:11}),
            frameRate: 8,
        });
        this.anims.create({
            key: 'bullSing2',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:12,end:13}),
            frameRate: 12,
            repeat: -1,
        });


        //bull blobbert

        this.anims.create({
            key: 'bullBlobMove',
            frames: this.anims.generateFrameNumbers('bullBlob',{start:0,end:3}),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: 'bullBlobSing',
            frames: this.anims.generateFrameNumbers('bullBlob',{start:5,end:7}),
            frameRate: 15,
            repeat: -1,
            yoyo: true,
        });

        
    //double checking to see if the tileset loads
    //this.add.image(0,0,'baseTiles');
    


    if(boxRoulette){
        //maybe this should be handled in the update part
        playerState = "pick"
        isMoving = true;
    }else{
        var initSquareX = (Math.floor(imageWidth/16)+Math.floor(((Math.random()*imageWidth/2))/2))*2;
        var initSquareY = (Math.floor(imageHeight/16)+Math.floor(((Math.random()*imageHeight/2))/2))*2;
        var initSquareW = Math.floor((((Math.random()*Math.floor(imageWidth/4))+1))/2)*2;
        var initSquareH = Math.floor((((Math.random()*Math.floor(imageHeight/4))+1))/2)*2;
    
        if (initSquareX + initSquareW > imageWidth-borderWidth){
            initSquareW = initSquareX + initSquareW - imageWidth - borderWidth;
        }
        if (initSquareY + initSquareH > imageHeight-borderWidth){
            initSquareH = initSquareY + initSquareH - imageHeight - borderWidth;
        }
    
        if (initSquareW <=8){
            initSquareW = 10;
        }
        if (initSquareH <=8){
            initSquareH = 10;
        }
    
        mapArray = [...Array(imageHeight)].map(e => Array(imageWidth).fill(0));
    
        for (i=0;i<imageWidth;i++){
            for (j=0;j<imageHeight;j++){
                if(i >= initSquareX+1 && i <= (initSquareX + initSquareW)-1 && j >= initSquareY+1 && j <= (initSquareY + initSquareH)-1){
                    mapArray[j][i] = transColor;
                }else if(i<borderWidth || j<borderWidth || i>imageWidth-borderWidth || j>imageHeight-borderWidth){
                    mapArray[j][i] = borderColor;
                }else if(i >= initSquareX && i <= (initSquareX + initSquareW) && j >= initSquareY && j <= (initSquareY + initSquareH)){
                    mapArray[j][i] = edgeColor
                }else{
                    mapArray[j][i] = baseColor;
                }
            }
        }
    
        var edgeArray = [];

        for(i=0;i<mapArray.length;i+=2){
            for(j=0;j<mapArray[0].length;j+=2){
                if (mapArray[i][j]==edgeColor){
                    edgeArray.push([i,j]);
                }
            }
        }

        var initPos = edgeArray[Math.floor(Math.random()*edgeArray.length)]
        var initX = initPos[1];
        var initY = initPos[0];

        console.log(initX)
        console.log(initY)    

        player = this.add.sprite(initX,initY,'player');
        player.depth = 2;

        layer = map.createBlankLayer('mainDraw',drawTileset);
        layer.putTilesAt(mapArray,0,0,imageWidth,imageHeight);
        
    }
    //fill with color 2 (yellow)


//    console.log("MapArray[319][239]: " + mapArray[319][239])

    //create mask from bw image
    //surely theres a more efficient way with just 0s and 1s instead of getPixel

//    console.log("image MASK: " + imageMask);
//    console.log("imageMAsk get pixel: " + getPixel(1,1,imageMask))

/*    for (i=0;i<imageHeight;i++){
        mapMaskArray[i] = [];
        for (j=0;j<imageWidth;j++){
            if(this.textures.getPixel(j,i,'backgroundImageMask').red == 0 && i >= borderWidth && i <= imageHeight - borderWidth && j >= borderWidth && j <= imageWidth - borderWidth){
                mapMaskArray[i][j] = 0; //color
            }else{
                mapMaskArray[i][j] = 1; //trans
            }
        }
    }
*/
//    console.log(mapMaskArray)
    





    




    
//    layerMask = mapMask.createLayer(0,'maskTiles',0,0);

//    layer = map.createLayer(0,'baseTiles',0,0);

/*
    for (i=0;i<mapMaskArray.length;i++){
        for (j=0;j<mapArray[0].length;j++){
            
        }
    }
*/



    if(!boxRoulette){
        finishedImage = this.add.image(0,0,'backgroundImage').setOrigin(0,0);
        revealImage();
    }


  //test enemies  
//    enemy1 = this.add.sprite(Math.random()*(imageWidth-(2*borderWidth))+borderWidth,Math.random()*(imageHeight-(2*borderWidth))+borderWidth,'testEnemy').play('enemyAnim1')
//    enemy2 = this.add.sprite(Math.random()*(imageWidth-(2*borderWidth))+borderWidth,Math.random()*(imageHeight-(2*borderWidth))+borderWidth,'testEnemy').play('enemyAnim2')
//    enemy3 = this.add.sprite(Math.random()*(imageWidth-(2*borderWidth))+borderWidth,Math.random()*(imageHeight-(2*borderWidth))+borderWidth,'testEnemy').play('enemyAnim3')
/*
    enemy1._enemyType = "redGuy";
    enemy1._state = "move"
    enemy1._dying = 0;
    enemy1._movingUp = true;

    enemy2._enemyType = "yellowGuy";
    enemy2._state = "move"
    enemy2._dying = 0;
    enemy2._movingRight = true;

    enemy3._enemyType = "blueGuy";
    enemy3._state = "move"
    enemy3._dying = 0;
    */


    if(!boxRoulette){
        addBullBoss();
        makeReviveGems();

    }

//    this.physics.add.existing(bullEnemy);
//    bullEnemy.body.velocity.x = 25;
//    bullEnemy.body.velocity.y = 25;
    


//        console.log(enemyArray)



    if(showDebug){
        debugBoss = this.add.rectangle(0,0,48,68);
        debugBoss.setStrokeStyle(1,0xff0000);
        debugBoss2 = this.add.rectangle(0,0,60,50);
        debugBoss2.setStrokeStyle(1,0xffff00);
    }

//    player.setAlpha(0.4)

    cursors = this.input.keyboard.createCursorKeys();
    //A = 65
    keyA = this.input.keyboard.addKey(65);
    //B = 66
    keyB = this.input.keyboard.addKey(66);

    keySpace = this.input.keyboard.addKey(32);
    




    //particle & animation sprites
    this.anims.create({
        key: 'sparkleShine',
        frames: this.anims.generateFrameNumbers('sparkle',{start:0,end:1}),
        frameRate: 24,
        repeat: -1
    });
    this.anims.create({
        key: 'sparkleShine2',
        frames: [{key:'sparkle',frame:1},{key:'sparkle',frame:0}],
        frameRate: 24,
        repeat: -1
    });

    this.anims.create({
        key: 'cleanSparkle1',
        frames: [{key:'cleanSparkle',frame:0},{key:'cleanSparkle',frame:1}],
        frameRate: 24,
        repeat: -1
    });
    this.anims.create({
        key: 'cleanSparkle2',
        frames: [{key:'cleanSparkle',frame:1},{key:'cleanSparkle',frame:0}],
        frameRate: 24,
        repeat: -1
    });

    this.anims.create({
        key: 'rainbowStarAnim',
        frames: this.anims.generateFrameNumbers('rainbowstar',{start:0, end:5}),
        frameRate: 24,
        repeat: -1
    });

    this.anims.create({
        key: 'glowAnim',
        frames: this.anims.generateFrameNumbers('glow',{start:0, end:11}),
        frameRate: 18,
    })

    this.anims.create({
        key: 'explosionAnim1',
        frames: this.anims.generateFrameNumbers('explosion1',{start:0,end:9}),
        frameRate: 18,
    });

    this.anims.create({
        key: 'explosionAnim3',
        frames: this.anims.generateFrameNumbers('explosion3',{start:1,end:6}),
        frameRate: 18,
    });


    this.anims.create({
        key: 'musicNotes1',
        frames: [{key:'musicNotes',frame:0}],
        frameRate: 2,
    });
    this.anims.create({
        key: 'musicNotes2',
        frames: [{key:'musicNotes',frame:1}],
        frameRate: 2,
    });


    //animations

    glowSprite = this.add.sprite(0,0,'glow').setVisible(false);
    glowSprite.depth = 3;
    //emitters

    sparkleEmitter = this.add.particles(0,0,'sparkle',{
        anim: ['sparkleShine','sparkleShine2'],
        speed: {min: 30, max: 50},
        angle: {min: 0, max: 360},
        lifespan: {min: 600, max: 1000},
        emitting: false,
        scale: {start: 2.0, end: 0.5, ease: "Quad.easeOut"}
    });

    sparkleEmitter2 = this.add.particles(0,0,'sparkle',{
        anim: ['sparkleShine','sparkleShine2'],
        speed: {min: 10, max: 20},
        angle: {min: 0, max: 360},
        lifespan: {min: 200, max: 400},
        emitting: false,
        scale: {start: 1, end: 0.5, ease: "Quad.easeOut"}


    });

    drawSparkles = this.add.particles(0,0,'cleanSparkle',{
        anim: ['cleanSparkle1','cleanSparkle2'],
        speed: {min: 20, max: 30},
        angle: {min: 0, max: 360},
        lifespan: {min: 200, max: 400},
        emitting: false,
        scale: {start: 0.75, end: 0.2, ease: "Quad.easeOut"}
    });

    drawSparkles.depth = 0

//    drawSparkles.setDepth(1);

rainbowStarEmitter = this.add.particles(0,0,'rainbowstar',{
    anim: 'rainbowStarAnim',
    speed: 300,
    gravityY: 800,
    angle: {start: 240, end: 320, steps: 4},
    quantity: 4,
    lifespan: 2000,
    emitting: false,
    scale: 0.75,
});

rainbowStarEmitter2 = this.add.particles(0,0,'rainbowstar',{
    anim: 'rainbowStarAnim',
    speed: 400,
    gravityY: 1000,
    angle: {start: 240, end: 320, steps: 5},
    quantity: 5,
    lifespan: 2000,
    emitting: false,
    scale: 1,
});


    explosionEmitter3 = this.add.particles(0,0,'explosion3',{
        anim: 'explosionAnim3',
        emitting: false,
        rotate: {min: 0, max: 360},
        stopAfter: 6,
//        scaleX: [1,-1],
        frequency: 32,
        scale: [0.8,0.5],
    });

    explosionEmitter1 = this.add.particles(0,0,'explosion1',{
        anim: 'explosionAnim1',
        emitting: false,
        stopAfter: 6,
        frequency: 32,
        speedY: {min: -20, max: -70},
    });

    explosionEmitter2 = this.add.particles(0,0,'explosion1',{
        anim: 'explosionAnim1',
        emitting: false,
        stopAfter: 6,
        frequency: 32,
        scale: 0.5,
        speedY: {min: -20, max: -70},
    });

    explosionEmitter1.addEmitZone({
        type: 'random',
        source: new Phaser.Geom.Circle(0, 0, 8),
//        quantity: 8,
    })
    explosionEmitter2.addEmitZone({
        type: 'random',
        source: new Phaser.Geom.Circle(0, 0, 20),
//        quantity: 8,
    })
    explosionEmitter3.addEmitZone({
        type: 'edge',
        source: new Phaser.Geom.Circle(0, 0, 4),
//        quantity: 8,
    })

    //revive gems
    //reviveGems.setVisible(false);


    //UI
    cam = this.cameras.main;

//    console.log("roundPixels? : " + cam.roundPixels)

    borderImage = this.add.image(0,0,'border').setOrigin(0,0);
    borderImage.x = -30;
    borderImage.y = -20;

//    scoreText = this.add.bitmapText(0,0,'score','0.0%').setOrigin(1,0.5);
    scoreText = this.add.bitmapText(0,0,'score','0').setOrigin(1,0.5);
    scoreTextRight = this.add.bitmapText(0,0,'score','.0%',20).setOrigin(0,0.5);
    scoreText.x = 60;
    scoreText.y = screenH-30;
    scoreTextRight.x = 62;
    scoreTextRight.y = screenH-34;
//    var bulgeEffect = scoreText.preFX.addBarrel(1);






    UICam = this.cameras.add(0, 0, 320, 240);



    cam.setBounds(0,0,imageWidth,imageHeight);
//    this.physics.world.setBounds(0,0,imageWidth,imageHeight);
    if(!boxRoulette){
        cam.startFollow(player,true,0.1,0.1);
        UICam.ignore([player,layer,finishedImage]);
        percPopup();
    }
    cam.ignore([scoreText, scoreTextRight, borderImage])
    //this camera should ignore everything but the UI (border, text popups, score)
    //wtf it works
    rouletteRect = currentScene.add.rectangle(0,0,0,0,0xffffff,0.5);
    UICam.ignore(rouletteRect);

    UICam.ignore([map, image, imageSilh, drawTileset,
        sparkleEmitter,sparkleEmitter2, rainbowStarEmitter, rainbowStarEmitter2, drawSparkles, explosionEmitter1, explosionEmitter2,explosionEmitter3, explosionArray,
        glowSprite, enemyArray]);

    if(showDebug){
        UICam.ignore([debugBoss,debugBoss2])
    }



//cam.addToRenderList(imageSilh);

//this.events.on('prerender', this.preRender, this);

}


function addBullBoss(){
    bullEnemy = currentScene.add.sprite(Math.random()*(imageWidth-(2*borderWidth))+borderWidth,Math.random()*(imageHeight-(2*borderWidth))+borderWidth,'bullEnemy').play('bullMove')
    bullEnemy._enemyType = "bull";
    bullEnemy._state = "move";
    bullEnemy._dying = 0;
    bullEnemy._isBoss = true;
    bullEnemy._startSwing = false;
    bullEnemy._xVel = (Math.floor(Math.random())*2-1)/4;
    bullEnemy._yVel = (Math.floor(Math.random())*2-1)/4;
    bullEnemy._swingDir = -1;
    bullEnemy._singTimer = 0;
    bullEnemy._singCooldown = 2000;
    bullEnemy._singRNG = 200;
    bullEnemy.depth = 1;

    enemyArray.push(bullEnemy);


    for(i=1;i<=3;i++){

        var bullBlobEnemy = currentScene.add.sprite(bullEnemy.x,bullEnemy.y,'bullBlob').play({key: 'bullBlobMove',startFrame: Math.floor(Math.random()*4)});

        var randDeg = Math.random()*2*Math.PI;

        bullBlobEnemy._enemyType = "bullBlob";
        bullBlobEnemy._state = "start";
        bullBlobEnemy._startTimer = 0;
        bullBlobEnemy._maxTimer = 100;
        bullBlobEnemy._dying = 0;
        bullBlobEnemy._xVel = Math.cos(randDeg);
        bullBlobEnemy._yVel = Math.sin(randDeg);
        bullBlobEnemy._startedTween = false;

        enemyArray.push(bullBlobEnemy);
        totalBlobs++;
    }


    bullSingTimeline = currentScene.add.timeline([
        {
            at: 0,
            run: () => {
                bullEnemy.anims.play('bullSing1',true);
                bullEnemy.flipX = false;
            },
            tween:{
                targets: bullEnemy,
                y: '-=10',
                ease: 'power3',
                duration: 1000,
            }
        },
        {
            from: 800,
            run: () => {
                bullEnemy.anims.play('bullSing2',true);
                blobSing = true;
            },
            tween:{
                targets: bullEnemy,
                y: '+=4',
                ease: 'Quad.easeInOut',
                duration: 300,
                yoyo: true,
                repeat: 5,
//                repeat: 5
            }
        },
        {
            from: 3000,
            run: () => {
                bullEnemy.anims.play('bullSing1',true);
                blobSing = false;
            },
            tween:{
                targets: bullEnemy,
                y: '+=10',
                ease: 'power3',
                duration: 1000,
            }
        },
        {
            from: 500,
            run: () => {
                isSinging = false;
                bullEnemy._state = "move"
                bullEnemy._singTimer = 0;
            }
        }
    ]);



    bullSwingTimelineLeft = currentScene.add.timeline([
        {
            at: 0,
            run: () => {
                bullEnemy.anims.play('bullSwing1',true);
            },
            tween:{
                targets: bullEnemy,
                x: '+=10*bullEnemy._swingDir',
                ease: 'power3',
                duration: 600,
            }
        },
        {
            from: 400,
            run: () => {
                bullEnemy.anims.play('bullSwing2',true);
            },
            tween:{
                targets: bullEnemy,
                y: '+=4*bullEnemy._swingDir',
                ease: 'power2',
                duration: 500,
                yoyo: true,
//                repeat: 5
            }
        },
        {
            from: 1000,
            run: () => {
                bullEnemy.anims.play('bullSwing3',true);
            },
            tween:{
                targets: bullEnemy,
                x: '+=3*bullEnemy._swingDir',
                duration: 3,
                yoyo: true,
                repeat: 5
            }
        },
        {
            from: 600,
            run: () => {
                bullEnemy.anims.play('bullSwing3',true);
            },
            tween:{
                targets: bullEnemy,
                x: '+=10*bullEnemy._swingDir',
                duration: 100,
            }
        },
        {
            from: 100,
            run: () => {
                bullEnemy.anims.play('bullSwing4',true);
//                sfxBullSwingGrunt.play();
            },
            tween:{
                targets: bullEnemy,
                x: '-=20*bullEnemy._swingDir',
                ease: 'power3',
                duration: 100,
            }
        },
        {
            from: 1000, 
            run: () => {
                bullEnemy.anims.play('bullSwing1',true);
            }
        },
        {
            from: 500,
            run: () => {
                if(bullEnemy._state != "laugh")
                    bullEnemy._state = "move";
            }
        },
    ]);



    bullSwingTimelineRight = currentScene.add.timeline([
        {
            at: 0,
            run: () => {
                bullEnemy.anims.play('bullSwing1',true);
            },
            tween:{
                targets: bullEnemy,
                x: '-=10*bullEnemy._swingDir',
                ease: 'power3',
                duration: 600,
            }
        },
        {
            from: 400,
            run: () => {
                bullEnemy.anims.play('bullSwing2',true);
            },
            tween:{
                targets: bullEnemy,
                y: '+=4*bullEnemy._swingDir',
                ease: 'power2',
                duration: 500,
                yoyo: true,
//                repeat: 5
            }
        },
        {
            from: 1000,
            run: () => {
                bullEnemy.anims.play('bullSwing3',true);
            },
            tween:{
                targets: bullEnemy,
                x: '-=3*bullEnemy._swingDir',
                duration: 3,
                yoyo: true,
                repeat: 5
            }
        },
        {
            from: 600,
            run: () => {
                bullEnemy.anims.play('bullSwing3',true);
            },
            tween:{
                targets: bullEnemy,
                x: '-=10*bullEnemy._swingDir',
                duration: 100,
            }
        },
        {
            from: 100,
            run: () => {
                bullEnemy.anims.play('bullSwing4',true);
                //sfxBullSwingGrunt.play();
            },
            tween:{
                targets: bullEnemy,
                x: '+=20*bullEnemy._swingDir',
                ease: 'power3',
                duration: 100,
            }
        },
        {
            from: 1000, 
            run: () => {
                bullEnemy.anims.play('bullSwing1',true);
            }
        },
        {
            from: 500,
            run: () => {
                if(bullEnemy._state != "laugh")
                    bullEnemy._state = "move";
            }
        },
    ]);

}

var oldPosX;
var oldPosY;

var rouletteRect

function spawnPlayer(){

    mapArray = [...Array(imageHeight)].map(e => Array(imageWidth).fill(0));
    
    for (i=0;i<imageWidth;i++){
        for (j=0;j<imageHeight;j++){
            if(i >= initSquareX+1 && i <= (initSquareX + initSquareW)-1 && j >= initSquareY+1 && j <= (initSquareY + initSquareH)-1){
                mapArray[j][i] = transColor;
            }else if(i<borderWidth || j<borderWidth || i>imageWidth-borderWidth || j>imageHeight-borderWidth){
                mapArray[j][i] = borderColor;
            }else if(i >= initSquareX && i <= (initSquareX + initSquareW) && j >= initSquareY && j <= (initSquareY + initSquareH)){
                mapArray[j][i] = edgeColor
            }else{
                mapArray[j][i] = baseColor;
            }
        }
    }

    var edgeArray = [];

    for(i=0;i<mapArray.length;i+=2){
        for(j=0;j<mapArray[0].length;j+=2){
            if (mapArray[i][j]==edgeColor){
//                console.log("ASDJIOJDOAIS")
                edgeArray.push([i,j]);
            }
        }
    }

//    console.log(mapArray);
    var initPos = edgeArray[Math.floor(Math.random()*edgeArray.length)]
//    console.log(initPos)
    var initX = initPos[1];
    var initY = initPos[0];
    initPixel[0] = initX;
    initPixel[1] = initY;

    console.log(initX)
    console.log(initY)    

    player = currentScene.add.sprite(initX,initY,'player');
    player.depth = 2;
    player.setVisible(false)
//    player.setAlpha(0);


    layer = map.createBlankLayer('mainDraw',drawTileset);
    layer.putTilesAt(mapArray,0,0,imageWidth,imageHeight);


    finishedImage = currentScene.add.image(0,0,'backgroundImage').setOrigin(0,0);

    revealImage();
    addBullBoss();
    percPopup();
    makeReviveGems();

    UICam.ignore([player,layer,finishedImage]);


    playerState = "revive";
    reviveDuration = 0;

    const reviveTween12 = currentScene.tweens.addCounter({

        from: startReviveLength,
        to: startReviveLength*lengthStop1,
        duration: 3*reviveDurationMax/5,
        ease: "Sine.easeOut",
        onStart: () =>{
            currentScene.time.delayedCall(400, () => {
                cam.pan(initX,initY,1500,'Power2')
            }
            );
        },
        onUpdate: () => {
            distCenter = reviveTween12.getValue();
                },
        onComplete: () => {
            reviveTween22.play();
        }
    }).pause();
    
    const reviveTween22 = currentScene.tweens.addCounter({

        from: startReviveLength*lengthStop1,
        to: startReviveLength*lengthStop2,
        duration: 1*reviveDurationMax/4,
        ease: "Sine.easeInOut",
        onStart: () => {
        },
        onUpdate: () => {
            distCenter = reviveTween22.getValue();
                },
        onComplete: () => {
            reviveTween32.play();
        }
    }).pause();

    const reviveTween32 = currentScene.tweens.addCounter({

        from: startReviveLength*lengthStop2,
        to: endReviveLength,
        duration: 1*reviveDurationMax/4,
        ease: "Sine.easeIn",
        onUpdate: () => {
            distCenter = reviveTween32.getValue();
            console.log("AM I EVEN PLAYING")
//            console.log("distCenter: " + distCenter)
                },
        onComplete: () => {
            playerState = "NoDraw";
//            player.x = initX;
//            player.y = initY;
            //reviveGems.setVisible(false);
//            console.log("HIIII")
//            allExploded = false;
            addSparkles(10);
            player.setVisible(true);
            glowSprite.x = player.x;
            glowSprite.y = player.y;
            glowSprite.setVisible(true);
            glowSprite.play({key: 'glowAnim'});
            isMoving = false;
            cam.startFollow(player,true,0.1,0.1);
            for (i=0;i<numReviveGems;i++){
                reviveGems[i].setVisible(false);
            }
        }
    }).pause();

    reviveTween12.play();


}

var initSquareX;
var initSquareY;
var initSquareW;
var initSquareH;

function update ()
{


    
    var leftPress = cursors.left.isDown;
    var rightPress = cursors.right.isDown;
    var upPress = cursors.up.isDown;
    var downPress = cursors.down.isDown;
    aPress = keyA.isDown;
    bPress = keyB.isDown;
    spacePress = keySpace.isDown;


    //1 = base color
    //2 = edge color
    //4 = trans color

    if (spacePress){
        console.log("Checking sides by order of 2")
        console.log("._._._.")
        console.log("|" + parseInt(layer.getTileAtWorldXY(player.x-2,player.y-2).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x,player.y-2).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x+2,player.y-2).index))
        console.log("|" + parseInt(layer.getTileAtWorldXY(player.x-2,player.y).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x,player.y).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x+2,player.y).index))
        console.log("|" + parseInt(layer.getTileAtWorldXY(player.x-2,player.y+2).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x,player.y+2).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x+2,player.y+2).index))
        console.log("._._._.")
        console.log("****************************")

        console.log("Checking sides by order of 1")
        console.log("._._._.")
        console.log("|" + parseInt(layer.getTileAtWorldXY(player.x-1,player.y-1).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x,player.y-1).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x+1,player.y-1).index))
        console.log("|" + parseInt(layer.getTileAtWorldXY(player.x-1,player.y).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x,player.y).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x+1,player.y).index))
        console.log("|" + parseInt(layer.getTileAtWorldXY(player.x-1,player.y+1).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x,player.y+1).index) + "|" + parseInt(layer.getTileAtWorldXY(player.x+1,player.y+1).index))
        console.log("._._._.")

        console.log("1 = base color")
        console.log("2 = edge color")
        console.log("4 = trans color")
    }




    if (boxRoulette){
//        console.log('hi')
        if(aPress || boxTimer > 1000){

            boxTimer = 1111
            boxRoulette = false;

            spawnPlayer();

        }else if(boxTimer == 0 || boxTimer == 20 || (boxTimer > 40 && boxTimer%4 == 0)){
//            if(boxTimer%10 == 0){
                sfxRoulette.play();

                initSquareX = (Math.floor(imageWidth/16)+Math.floor(((Math.random()*imageWidth/2))/2))*2;
                initSquareY = (Math.floor(imageHeight/16)+Math.floor(((Math.random()*imageHeight/2))/2))*2;
                initSquareW = Math.floor((((Math.random()*Math.floor(imageWidth/4))+1))/2)*2;
                initSquareH = Math.floor((((Math.random()*Math.floor(imageHeight/4))+1))/2)*2;
            
                if (initSquareX + initSquareW > imageWidth-borderWidth){
                    initSquareW = initSquareX + initSquareW - imageWidth - borderWidth;
                }
                if (initSquareY + initSquareH > imageHeight-borderWidth){
                    initSquareH = initSquareY + initSquareH - imageHeight - borderWidth;
                }
            
                if (initSquareW <=8){
                    initSquareW = 10;
                }
                if (initSquareH <=8){
                    initSquareH = 10;
                }
    
                rouletteRect.x = initSquareX;
                rouletteRect.y = initSquareY;
                rouletteRect.width = initSquareW;
                rouletteRect.height = initSquareH;
    
//            }
        }

        boxTimer++;
    }else{

//        if(isMoving){
  //          updateRevive();
    //      }

    if (!isMoving){
//        console.log("player.x: " + player.x)
//        console.log("player.y: " + player.y)
        oldPosX = player.x;
        oldPosY = player.y;


        if(player.x < imageWidth && player.x > 0 && player.y > 0 && player.y < imageHeight){

            tileIndexC = parseInt(layer.getTileAtWorldXY(player.x,player.y).index); 

            if (!upPress && !downPress){
                if (rightPress && player.x+2 < imageWidth && !leftPress){
                    //right
                    tileIndex = parseInt(layer.getTileAtWorldXY(player.x+2,player.y).index);
                    tileIndex1 = parseInt(layer.getTileAtWorldXY(player.x+1,player.y).index);
                    tileIndexU = parseInt(layer.getTileAtWorldXY(player.x,player.y-2).index);
                    tileIndexD = parseInt(layer.getTileAtWorldXY(player.x,player.y+2).index);
                    tileIndexRR = parseInt(layer.getTileAtWorldXY(player.x+4,player.y).index);
                    tileIndexUR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y-2).index);
                    tileIndexDR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y+2).index);
                    tileIndexURR = parseInt(layer.getTileAtWorldXY(player.x+4,player.y-2).index);
                    tileIndexDRR = parseInt(layer.getTileAtWorldXY(player.x+4,player.y+2).index);
                    if (tileIndex==edgeColor && tileIndex1==drawColor && tileIndexC == drawColor && aPress) {
                        player.x+=speed;
                        for (j=oldPosX; j <= player.x-1;j++){
                            map.putTileAt(baseColor,j,oldPosY,undefined,'mainDraw');
                        }
                    }else if(tileIndex == edgeColor && tileIndexC == drawColor && aPress){
                        player.x+=speed;
                        for (j=oldPosX; j <= player.x-1;j++){
                            map.putTileAt(drawColor,j,player.y,undefined,'mainDraw');
                        }
                        fillTiles();
                    }else if(tileIndex == edgeColor && tileIndexC == edgeColor && aPress){
                        player.x+=speed;
                    }else if (tileIndex==drawColor && tileIndex1==drawColor && aPress) {
                        player.x+=speed;
                        for (j=oldPosX; j <= player.x-1;j++){
                            map.putTileAt(baseColor,j,player.y,undefined,'mainDraw');
                        }
                    }else if(tileIndex == baseColor && aPress){
                        player.x+=speed;
                        for (i=oldPosX+1; i <= player.x;i++){
                            map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                        }
                    }else if(tileIndexUR == baseColor && tileIndexU == baseColor && aPress){
                        player.x+=speed;
                        player.y-=speed;
                        for (i=oldPosX; i <= player.x;i++){
                            map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                        }
                        for (j=player.y; j <= oldPosY;j++){
                            map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                        }
                    }else if(tileIndexDR == baseColor && tileIndexD == baseColor && aPress){
                        player.x+=speed;
                        player.y+=speed;
                        for (i=oldPosX; i <= player.x;i++){
                            map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                        }
                        for (j=oldPosY; j <= player.y;j++){
                            map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                        }
                }else if (tileIndexDR == edgeColor && !aPress && (tileIndex == edgeColor || tileIndexD == edgeColor) && tileIndexDRR != baseColor){
                    player.x+=speed;
                    player.y+=speed;
                }else if (tileIndexUR == edgeColor && !aPress && (tileIndex == edgeColor || tileIndexU == edgeColor) && tileIndexURR != baseColor){
                    player.x+=speed;
                    player.y-=speed;
                }else if (tileIndex1 == edgeColor){
                        player.x+=speed;
                    }
                }else if(leftPress && player.x-2 > 0 && !rightPress){
                    //left
                    tileIndex = parseInt(layer.getTileAtWorldXY(player.x-2,player.y).index);
                    tileIndex1 = parseInt(layer.getTileAtWorldXY(player.x-1,player.y).index);
                    tileIndexU = parseInt(layer.getTileAtWorldXY(player.x,player.y-2).index);
                    tileIndexD = parseInt(layer.getTileAtWorldXY(player.x,player.y+2).index);
                    tileIndexLL = parseInt(layer.getTileAtWorldXY(player.x-4,player.y).index);
                    tileIndexUL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y-2).index);
                    tileIndexDL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y+2).index);
                    tileIndexULL = parseInt(layer.getTileAtWorldXY(player.x-4,player.y-2).index);
                    tileIndexDLL = parseInt(layer.getTileAtWorldXY(player.x-4,player.y+2).index);
                    if (tileIndex==edgeColor && tileIndex1==drawColor && tileIndexC == drawColor && aPress) {
                        player.x-=speed;
                        for (j=player.x+1; j <= oldPosX;j++){
                            map.putTileAt(baseColor,j,oldPosY,undefined,'mainDraw');
                        }
                    }else if(tileIndex == edgeColor && tileIndexC == drawColor && aPress){
                        player.x-=speed;
                        for (j=player.x+1; j <= oldPosX;j++){
                            map.putTileAt(drawColor,j,player.y,undefined,'mainDraw');
                        }
                        fillTiles();
                    }else if(tileIndex == edgeColor && tileIndexC == edgeColor && aPress){
                        player.x-=speed;
                    }else if (tileIndex==drawColor && tileIndex1==drawColor && aPress) {
                        player.x-=speed;
                        for (j=player.x+1; j <= oldPosX;j++){
                            map.putTileAt(baseColor,j,player.y,undefined,'mainDraw');
                        }
                    }else if(tileIndex == baseColor && aPress){
                        player.x-=speed;
                        for (i=player.x; i <= oldPosX-1;i++){
                            map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                        }
                    }else if(tileIndexUL == baseColor && tileIndexU == baseColor && aPress){
                        player.x-=speed;
                        player.y-=speed;
                        for (i=player.x; i <= oldPosX;i++){
                            map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                        }
                        for (j=player.y; j <= oldPosY;j++){
                            map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                        }
                    }else if(tileIndexDL == baseColor && tileIndexD == baseColor && aPress){
                        player.x-=speed;
                        player.y+=speed;
                        for (i=player.x; i <= oldPosX;i++){
                            map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                        }
                        for (j=oldPosY; j <= player.y;j++){
                            map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                        }
                    }else if (tileIndexDL == edgeColor && !aPress && (tileIndex == edgeColor || tileIndexD == edgeColor) && tileIndexDLL != baseColor){
                        player.x-=speed;
                        player.y+=speed;
                    }else if (tileIndexUL == edgeColor && !aPress && (tileIndex == edgeColor || tileIndexU == edgeColor) && tileIndexULL != baseColor){
                        player.x-=speed;
                        player.y-=speed;
                    }else if (tileIndex1 == edgeColor){
                        player.x-=speed;
                    }                        
                }
            }else{ //diagonals
                if(upPress && !downPress){
                    if(rightPress && player.x+2 < imageWidth && player.y-2 > 0 && !leftPress){
                        //up right
                        //
                        // _
                        //|
                        tileIndex = parseInt(layer.getTileAtWorldXY(player.x+2,player.y-2).index);
                        tileIndexC = parseInt(layer.getTileAtWorldXY(player.x,player.y).index);
                        tileIndex2 = parseInt(layer.getTileAtWorldXY(player.x+1,player.y-1).index);
                        tileIndexR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y).index);
                        tileIndexR1 = parseInt(layer.getTileAtWorldXY(player.x+1,player.y).index);
                        tileIndexU = parseInt(layer.getTileAtWorldXY(player.x,player.y-2).index);
                        tileIndexU1 = parseInt(layer.getTileAtWorldXY(player.x,player.y-1).index);
                        tileIndexUU = parseInt(layer.getTileAtWorldXY(player.x,player.y-4).index);

//if(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexR1 == edgeColor && tileIndexR == edgeColor && tileIndex2 == baseColor && aPress){

                        if(tileIndex == drawColor || (tileIndex == baseColor && tileIndexU != baseColor && tileIndexC == drawColor)){
                            //do nothing
                        }else if(tileIndex == borderColor && tileIndexU == baseColor && aPress){
                            player.y-=speed;
                            for (i=player.y;i<oldPosY;i++){
                                map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                            }
                        }else if(tileIndex == borderColor && tileIndexR == baseColor && tileIndexC == edgeColor && aPress){
                            player.x+=speed;
                            for (i=oldPosX+1;i<player.x+1;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                        }else if(tileIndex == borderColor && tileIndexR == baseColor && aPress){
                            player.x+=speed;
                            for (i=oldPosX;i<player.x+1;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                        }else if(tileIndex == borderColor && tileIndexU == edgeColor && tileIndexC == drawColor && aPress){
                            player.y-=speed;
                            for (i=player.y+1;i<oldPosY;i++){
                                map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                            }
                            fillTiles();
                        }else if(tileIndex == borderColor && tileIndexR == edgeColor && tileIndexC == drawColor && aPress){
                            player.x+=speed;
                            for (i=oldPosX;i<player.x;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            fillTiles();
                        }else if(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexR1 == edgeColor && tileIndexR == edgeColor && tileIndex2 == baseColor && aPress){
                            player.x+=speed;
                            player.y-=speed;
                            for (i=oldPosX; i <= player.x-1;i++){
                                map.putTileAt(edgeColor,i,player.y,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY-1;j++){
                                map.putTileAt(edgeColor,oldPosX,j,undefined,'mainDraw');
                            }
//                            fillTiles();
                            map.putTileAt(transColor,oldPosX+1,oldPosY,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+2,oldPosY,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+1,oldPosY-1,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+2,oldPosY-1,undefined,'mainDraw');

                            revealImage();


                        }else if(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexU1 == edgeColor && tileIndexU == edgeColor && tileIndex2 == baseColor && aPress){
                            player.x+=speed;
                            player.y-=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(edgeColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY-1;j++){
                                map.putTileAt(edgeColor,player.x,j,undefined,'mainDraw');
                            }
//                            fillTiles();
                            map.putTileAt(transColor,oldPosX,oldPosY-1,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+1,oldPosY-1,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX,oldPosY-2,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+1,oldPosY-2,undefined,'mainDraw');

                            revealImage();

                        }else if(tileIndex == edgeColor && tileIndexC == drawColor && aPress){
                            if(tileIndexU==edgeColor){
//                                player.x+=speed;
                                player.y-=speed;
                                for (j=player.y+1; j <= oldPosY;j++){
                                    map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                                }
                                fillTiles();
                            }else if(tileIndexR==edgeColor){
                                player.x+=speed;
                                player.y-=speed;
                                for (i=oldPosX; i <= player.x-1;i++){
                                    map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                                }
                                for (j=player.y+1; j <= oldPosY;j++){
                                    map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                                }
                                fillTiles();
                            }else if(tileIndexU==baseColor && tileIndexR==baseColor){ ///CHECK THIS FOR UPRIGHT TO PERPENDICULAR DIAGONAL
                                player.x+=speed;
                                player.y-=speed;
                                for (i=oldPosX; i <= player.x-1;i++){
                                    map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                                }
                                for (j=player.y+1; j <= oldPosY;j++){
                                    map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                                }
                                fillTiles();
                            }
                        }else if (tileIndexC == drawColor && tileIndexU == drawColor && tileIndex == baseColor && aPress){
                            player.x+=speed;    //_
                            player.y-=speed;   //| *  subtractive Y
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            for (k=player.y+1; k <= oldPosY;k++){
                                map.putTileAt(baseColor,oldPosX,k,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == edgeColor && tileIndexU == baseColor && aPress){
                            player.x+=speed;
                            player.y-=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            for (k=oldPosY-1; k <= oldPosY-1;k++){
                                map.putTileAt(drawColor,oldPosX,k,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == edgeColor && tileIndexR == baseColor && aPress){
                            player.x+=speed;
//                            player.y-=speed;
                            for (i=oldPosX+1; i <= player.x;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
//                            for (i=oldPosY; i <= player.y;i++){
//                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
//                            }
                        }else if (tileIndex == baseColor && tileIndexR == drawColor && tileIndexUU == drawColor && aPress){
                            player.x+=speed;
                            player.y-=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if (tileIndex == baseColor && tileIndexUU == drawColor && aPress){
                            player.x+=speed;
                            player.y-=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if(tileIndex == baseColor && tileIndexC != edgeColor && aPress){
//                            console.log("AYAYAYAYA3")
                            player.x+=speed;
                            player.y-=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                            }
                        }else if(tileIndexR == baseColor && aPress){
                            player.x+=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                        }else if(tileIndexU == baseColor && aPress){
                            player.y-=speed;
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                            }
                        }else if (tileIndex == edgeColor){
                            player.x+=speed;
                            player.y-=speed;
                        }else if (tileIndexR == edgeColor){
                            player.x+=speed;
                        }else if(tileIndexU == edgeColor){
                            player.y-=speed;
                        }

                    }else if(leftPress && player.x-2 > 0 && player.y-2 > 0 && !rightPress){
                        //up left
                        //|_
                        //                _
                        //or sohuld it be  |
                        //'-. if already up right
                        //or sohuld it be '''|__
                        tileIndex = parseInt(layer.getTileAtWorldXY(player.x-2,player.y-2).index);
                        tileIndex2 = parseInt(layer.getTileAtWorldXY(player.x-1,player.y-1).index);
                        tileIndexC = parseInt(layer.getTileAtWorldXY(player.x,player.y).index);
                        tileIndexL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y).index);
                        tileIndexR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y).index);
                        tileIndexR1 = parseInt(layer.getTileAtWorldXY(player.x+1,player.y).index);
                        tileIndexL1 = parseInt(layer.getTileAtWorldXY(player.x-1,player.y).index);
                        tileIndexL3 = parseInt(layer.getTileAtWorldXY(player.x-3,player.y).index);
                        tileIndexSuper = parseInt(layer.getTileAtWorldXY(player.x-2,player.y-4).index);
                        tileIndexU = parseInt(layer.getTileAtWorldXY(player.x,player.y-2).index);
                        tileIndexU1 = parseInt(layer.getTileAtWorldXY(player.x,player.y-1).index);
                        tileIndexD = parseInt(layer.getTileAtWorldXY(player.x,player.y+2).index);
//if(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexR1 == edgeColor && tileIndexR == edgeColor && tileIndex2 == baseColor && aPress){
                        if(tileIndex == drawColor){
                            //do nothing
                        }else if(tileIndex == borderColor && tileIndexU == baseColor && aPress){
                            player.y-=speed;
                            for (i=player.y;i<oldPosY;i++){
                                map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                            }
                        }else if(tileIndex == borderColor && tileIndexL == baseColor && tileIndexC == edgeColor && aPress){
                            player.x-=speed;
                            for (i=player.x;i<oldPosX-1;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                        }else if(tileIndex == borderColor && tileIndexU == edgeColor && tileIndexC == drawColor && aPress){
                            player.y-=speed;
                            for (i=player.y+1;i<oldPosY;i++){
                                map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                            }
                            fillTiles();
                        }else if(tileIndex == borderColor && tileIndexL == edgeColor && tileIndexC == drawColor && aPress){
                            player.x-=speed;
                            for (i=player.x+1;i<oldPosX;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            fillTiles();
                        }else if(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexL1 == edgeColor && tileIndexL == edgeColor && tileIndex2 == baseColor && aPress){
                            player.x-=speed;
                            player.y-=speed;
                            for (i=player.x+1; i <= oldPosX;i++){
                                map.putTileAt(edgeColor,i,player.y,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY-1;j++){
                                map.putTileAt(edgeColor,oldPosX,j,undefined,'mainDraw');
                            }
//                            fillTiles();
                            map.putTileAt(transColor,oldPosX-1,oldPosY,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX-2,oldPosY,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX-1,oldPosY-1,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX-2,oldPosY-1,undefined,'mainDraw');

                            revealImage();

                        }else if(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexU1 == edgeColor && tileIndexU == edgeColor && tileIndex2 == baseColor && aPress){
                            //WHY IS THIS NOT WORKING
                            player.x-=speed;
                            player.y-=speed;
//                            console.log("NNNNNNNNNNNNN")
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(edgeColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY-1;j++){
                                map.putTileAt(edgeColor,player.x,j,undefined,'mainDraw');
                            }
//                            fillTiles();
                            map.putTileAt(transColor,oldPosX,oldPosY-1,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX-1,oldPosY-1,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX,oldPosY-2,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX-1,oldPosY-2,undefined,'mainDraw');

                            revealImage();

                        }else if(tileIndex == baseColor && tileIndexC == drawColor && tileIndexU1 == baseColor && tileIndexU == edgeColor && tileIndex2 == baseColor && aPress){
//                            player.x-=speed;
                            player.y-=speed;
                            for (i=player.x; i <= player.x+speed;i++){
                                map.putTileAt(edgeColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY-1;j++){
                                map.putTileAt(edgeColor,player.x,j,undefined,'mainDraw');
                            }
//                            fillTiles();
                            map.putTileAt(transColor,player.x+1,oldPosY-1,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x+2,oldPosY-1,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x+1,oldPosY-2,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x+2,oldPosY-2,undefined,'mainDraw');

                            revealImage();

                        }else if(tileIndexC == drawColor && tileIndexU == edgeColor && tileIndex == edgeColor && aPress){
                            player.y-=speed;
//                            console.log("ASDOIJASOJDIS")
                                for (k=player.y+1; k <= oldPosY-1;k++){
                                    map.putTileAt(drawColor,oldPosX,k,undefined,'mainDraw');
                                }
                                fillTiles();
                        }else if(tileIndex == edgeColor && tileIndexC == drawColor && aPress){
                            if (tileIndexU == edgeColor){
                                player.x-=speed;
                                player.y-=speed;
                                for (i=player.x; i <= oldPosX;i++){
                                    map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                                }
                                for (j=player.y+1; j <= oldPosY;j++){
                                    map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                                }
                                fillTiles();
                            }else if(tileIndexL == edgeColor){
                                player.x-=speed;
                                player.y-=speed;
                                for (i=player.x+1; i <= oldPosX;i++){
                                    map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                                }
                                for (j=player.y+1; j <= oldPosY;j++){
                                    map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                                }
                                fillTiles();
//                                console.log("FOUR!!!")
                            }
                        }else if(tileIndexC == drawColor && tileIndexL == drawColor && tileIndexU == drawColor && tileIndexU1 == drawColor && tileIndex == baseColor && aPress){
                            player.x-=speed;  //_
                            player.y-=speed;// * |   subtractive Y
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                                for (k=player.y+1; k <= oldPosY;k++){
                                    map.putTileAt(baseColor,oldPosX,k,undefined,'mainDraw');
                                }
                        }else if(tileIndexC == drawColor && tileIndexL == drawColor && tileIndexU == drawColor && tileIndex == baseColor && aPress){
                            player.x-=speed;
                            player.y-=speed;// *|_   subtractive X
                            for (i=player.x+1; i <= oldPosX;i++){
                                map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                            }
                                for (k=player.y; k <= oldPosY;k++){
                                    map.putTileAt(drawColor,player.x,k,undefined,'mainDraw');
                                }
                        }else if(tileIndexC == edgeColor && tileIndexD == edgeColor && tileIndexU == edgeColor && tileIndex == baseColor && aPress){
                            player.x-=speed;
//                            console.log("AM I FIXE DYET")
                            for (i=player.x; i <= oldPosX-1;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
//                                for (k=oldPosY-1; k <= oldPosY-1;k++){
//                                    map.putTileAt(drawColor,oldPosX,k);
//                                }
                        }else if(tileIndexC == drawColor && tileIndexU == drawColor && tileIndex == baseColor && tileIndexL == baseColor && tileIndex == baseColor && aPress){
                            player.x-=speed;
                            player.y-=speed;// *|_ up left
                            for (i=player.x; i <= oldPosX-1;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                                for (k=player.y; k <= oldPosY-1;k++){
                                    map.putTileAt(drawColor,player.x,k,undefined,'mainDraw');
                                }
//                                console.log("ASDJOIJASDOJASIOASJDOIASJOIDS")
                        }else if (tileIndexC == edgeColor && tileIndexU == baseColor && aPress){
                            if(tileIndexD == edgeColor){
                                player.x-=speed;
                                player.y-=speed;
                                for (i=player.x; i <= oldPosX;i++){
                                    map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                                }
                                for (k=oldPosY-1; k <= oldPosY-1;k++){
                                    map.putTileAt(drawColor,oldPosX,k,undefined,'mainDraw');
                                }
                            }else{
                                player.x-=speed;
                                player.y-=speed;
                                for (i=player.x; i <= oldPosX;i++){
                                    map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                                }
                                for (k=oldPosY-1; k <= oldPosY-1;k++){
                                    map.putTileAt(drawColor,oldPosX,k,undefined,'mainDraw');
                                }
                            }
                        }else if (tileIndexC == edgeColor && tileIndexL == drawColor && tileIndex == baseColor && aPress){
                            player.x-=speed;
                            player.y-=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            for (j=player.y+1; j <= oldPosY;j++){
                                map.putTileAt(baseColor,oldPosX,j,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == edgeColor && tileIndexL == baseColor && aPress){
                            player.x-=speed;
                            player.y-=speed;
                            for (i=player.x; i <= oldPosX-1;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == drawColor && tileIndex == baseColor && tileIndexU == drawColor && tileIndexL3 != drawColor && tileIndexSuper != drawColor && aPress){
                            player.x-=speed;
                            player.y-=speed;
                            for (i=player.x; i <= oldPosX-1;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == drawColor && tileIndex == baseColor && tileIndexU == drawColor && tileIndexL3 == drawColor && aPress){
                            player.x-=speed;
                            player.y-=speed;
                            for (i=player.x; i <= oldPosX;i++){ //killing the previously drawn base tiles
                                map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if(tileIndex == baseColor && tileIndexL == drawColor && aPress){
                            player.x-=speed;
                            player.y-=speed*2;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,player.y+speed,undefined,'mainDraw');//here
                            }
                            for (j=player.y+speed; j <= oldPosY;j++){ //.
                                map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                            }
                            for (k=player.y; k <= oldPosY-speed;k++){ //' //and there
                                map.putTileAt(drawColor,player.x,k,undefined,'mainDraw');
                            }
                        }else if(tileIndex == baseColor && aPress){
                            player.x-=speed;
                            player.y-=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                            }
                        }else if(tileIndexL == baseColor && aPress){
                            player.x-=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                        }else if(tileIndexU == baseColor && aPress){
                            player.y-=speed;
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                            }
                        }else if (tileIndex == edgeColor){
                            player.x-=speed;
                            player.y-=speed;
                        }else if (tileIndexL == edgeColor){
                            player.x-=speed;
                        }else if(tileIndexU == edgeColor){
                            player.y-=speed;
                        }
                    }
                }else if(!upPress && downPress){
                    if(rightPress && player.x+2 < imageWidth && player.y+2 < imageHeight && !leftPress){
                        //down right
                        tileIndex = parseInt(layer.getTileAtWorldXY(player.x+2,player.y+2).index);
                        tileIndexC = parseInt(layer.getTileAtWorldXY(player.x,player.y).index);
                        tileIndexR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y).index);
                        tileIndexL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y).index);
                        tileIndexR1 = parseInt(layer.getTileAtWorldXY(player.x+1,player.y).index);
                        tileIndexL1 = parseInt(layer.getTileAtWorldXY(player.x-1,player.y).index);
                        tileIndexD = parseInt(layer.getTileAtWorldXY(player.x,player.y+2).index);
                        tileIndexU = parseInt(layer.getTileAtWorldXY(player.x,player.y-2).index);
                        tileIndexD1 = parseInt(layer.getTileAtWorldXY(player.x,player.y+1).index);
                        tileIndexD3 = parseInt(layer.getTileAtWorldXY(player.x,player.y+3).index);
                        tileIndex2 = parseInt(layer.getTileAtWorldXY(player.x+1,player.y+1).index)
                        //  |_

                        //           __
                        //shoudl be    |

//                        console.log(tileIndex == edgeColor && tileIndexC == drawColor && aPress)
//                        console.log(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexR1 == edgeColor && tileIndexR == edgeColor && tileIndex2 == baseColor && aPress);
//console.log("tileIndexR: " + tileIndexR)
//console.log("tileIndexR1: " + tileIndexR1)
                        if(tileIndex == drawColor){
                            //do nothing
                        }else if(tileIndex == borderColor && tileIndexC == drawColor && aPress){
                            if(tileIndexR == baseColor){
                                player.x+=speed;
                                for (i=oldPosX;i<player.x;i++){
                                    map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                                }
                            }else if(tileIndexR == edgeColor){
                                player.x+=speed;
                                for (i=oldPosX;i<player.x-1;i++){
                                    map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                                }
                                fillTiles();
                            }else if(tileIndexD == baseColor){
                                player.y += speed;
                                for(i=oldPosY;i<player.y;i++){
                                    map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                                }
                            }else if(tileIndexD == edgeColor){
                                player.y += speed;
//                                console.log("HIIII")
                                for(i=oldPosY;i<player.y-1;i++){
                                    map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                                }
                                fillTiles();
                            }
                        }else if(tileIndex == borderColor && tileIndexC == edgeColor && aPress){
                            if(tileIndexR == baseColor){
                                player.x+=speed;
                                for (i=oldPosX;i<player.x;i++){
                                    map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                                }
                            }else if(tileIndexD == baseColor){
                                player.y += speed;
                                for(i=oldPosY;i<player.y;i++){
                                    map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                                }
                            }
                        }else if(tileIndex == baseColor && tileIndexC == drawColor && tileIndexR == edgeColor && tileIndexR1 == baseColor && tileIndexU == drawColor && aPress){
                            player.x+=speed;
//                            player.y+=speed;
//                            console.log("HI")
//                            for (i=oldPosY;i<player.y;i++){
//                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
//                            }
                            for (i=oldPosX;i<player.x-1;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            fillTiles();
                        }else if(tileIndex == baseColor && tileIndexC == drawColor && tileIndexR == drawColor && aPress){
                            player.x+=speed;
                            player.y+=speed;
//                            console.log("HI")
                            for (i=oldPosY;i<player.y;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                            for (i=oldPosX;i<player.x;i++){
                                map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                            }
                        }else if(tileIndex == borderColor && tileIndexD == baseColor && aPress){
                            player.y+=speed;
                            for (i=oldPosY;i<player.y;i++){
                                map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                            }
                        }else if(tileIndex == borderColor && tileIndexR == edgeColor && tileIndexC == drawColor && aPress){
                            player.x+=speed;
                            for (i=oldPosX;i<player.x-1;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            fillTiles();
                        }else if(tileIndex == borderColor && tileIndexD == edgeColor && tileIndexC == drawColor && aPress){
                            player.y+=speed;
                            for (i=player.y+1;i<oldPosY;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                            fillTiles();
                        }else if(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexD1 == edgeColor && tileIndexD == edgeColor && tileIndex2 == baseColor && aPress){
                            player.x+=speed;
                            player.y+=speed;
                            for (i=oldPosX+1; i <= player.x;i++){
                                map.putTileAt(edgeColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y-1;j++){
                                map.putTileAt(edgeColor,player.x,j,undefined,'mainDraw');
                            }
//                            fillTiles();
                            map.putTileAt(transColor,oldPosX,oldPosY+1,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX,oldPosY+2,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+1,oldPosY+1,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+1,oldPosY+2,undefined,'mainDraw');
//                            console.log("or is it me?dsaodas")
                            revealImage();

                        }else if(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexR1 == edgeColor && tileIndexR == edgeColor && tileIndex2 == baseColor && aPress){
                            player.x+=speed;
                            player.y+=speed;   //  |_.
//                            console.log("IS THIS BEING CALLED??")
                            for (i=oldPosX+1; i <= player.x;i++){
                                map.putTileAt(edgeColor,i,player.y,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(edgeColor,oldPosX,j,undefined,'mainDraw');
                            }
//                            fillTiles();
                            map.putTileAt(transColor,oldPosX+1,oldPosY,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+1,oldPosY+1,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+2,oldPosY,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+2,oldPosY+1,undefined,'mainDraw');
                            
                            revealImage();

                        }else if(tileIndex == baseColor && tileIndexU == edgeColor && tileIndexC == drawColor && tileIndexR1 == baseColor && tileIndexR == edgeColor && aPress){
                            player.x+=speed;
//                            player.y+=speed;   //  |_.
//                            console.log("OR IS IT ME??")
                            for (i=oldPosX+1; i <= player.x;i++){
                                map.putTileAt(edgeColor,i,player.y,undefined,'mainDraw');
                            }
                            map.putTileAt(edgeColor,oldPosX,player.y,undefined,'mainDraw');
                            map.putTileAt(edgeColor,oldPosX,player.y-1,undefined,'mainDraw');
//                            map.putTileAt(edgeColor,oldPosX,oldPosY);
                            //                            for (j=oldPosY; j <= player.y-1;j++){
//                                map.putTileAt(edgeColor,player.y,j);
//                            }
//                            fillTiles();
                            map.putTileAt(transColor,oldPosX+1,oldPosY-2,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+1,oldPosY-1,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+2,oldPosY-2,undefined,'mainDraw');
                            map.putTileAt(transColor,oldPosX+2,oldPosY-1,undefined,'mainDraw');

                            revealImage();

                        }else if(tileIndex == edgeColor && tileIndexC == drawColor && aPress){
                            //console.log("AM I EVER BEING CALLED???")
                            if (tileIndexD == edgeColor){
//                                player.x+=speed;
                                player.y+=speed;
//                                for (i=player.x; i <= oldPosX;i++){
//                                    map.putTileAt(drawColor,i,oldPosY);
//                                }
                                for (j=oldPosY; j <= player.y-1;j++){
                                    map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                                }
                                fillTiles();
                            }else if(tileIndexR == edgeColor){
                                player.x+=speed;
//                                player.y+=speed;
                                for (i=oldPosX; i <= player.x-1;i++){
                                    map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                                }
//                                for (j=oldPosY; j <= player.y;j++){
//                                    map.putTileAt(drawColor,player.x,j);
//                                }
                                fillTiles();
                            }else{
                                player.x+=speed;
                                player.y+=speed;
                                for (i=oldPosX; i <= player.x-1;i++){
                                    map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                                }
                                for (j=oldPosY; j <= player.y;j++){
                                    map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                                }
                                fillTiles();
                            }
                        }else if (tileIndex == baseColor && tileIndexC == drawColor && tileIndexR == drawColor && tileIndexD == drawColor && aPress){
                            player.x+=speed;
                            player.y+=speed;
                            for (i=oldPosX; i <= player.x-1;i++){
                                map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                            }
//                            for (k=oldPosX; k <= player.x;k++){
//                                map.putTileAt(drawColor,k,oldPosY);
//                            }
                            for (i=oldPosY;i<=player.y;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == edgeColor && tileIndexR == edgeColor && tileIndexD == baseColor && aPress){
//                            player.x+=speed;
                            player.y+=speed;
//                            console.log("ASDASIDJOIDASJOSI")
//                            for (i=player.x; i <= oldPosX;i++){
//                                map.putTileAt(drawColor,i,player.y);
//                            }
//                            for (k=oldPosX; k <= player.x;k++){
//                                map.putTileAt(drawColor,k,oldPosY);
//                            }
                            for (i=oldPosY+1;i<=player.y;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == edgeColor && tileIndexR == baseColor && aPress){
                            player.x+=speed;
                            player.y+=speed;
                            for (i=oldPosX+1; i <= player.x;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (i=oldPosY; i <= player.y;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                       }else if (tileIndex==baseColor && tileIndexR==drawColor && tileIndexR1 == baseColor && aPress) {
                        player.x+=speed;
                        player.y+=speed;
                        for (i=oldPosX; i <= player.x-1;i++){
                            map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                        }
                        for (j=oldPosY; j <= player.y;j++){
                            map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                        }
                    }else if (tileIndex==drawColor && tileIndexD1==drawColor && aPress) {
                        player.x+=speed;
                        player.y+=speed;
                        for (i=oldPosX; i <= player.x-1;i++){
                            map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                        }
                        for (j=oldPosY; j <= player.y;j++){
                            map.putTileAt(baseColor,player.x,j,undefined,'mainDraw');
                        }
                    }else if(tileIndex == baseColor && tileIndexR == drawColor && tileIndexD3 == drawColor && aPress){
                            player.x+=speed;
                            player.y+=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if(tileIndex == baseColor && tileIndexD3 == drawColor && aPress){
                            player.x+=speed;
                            player.y+=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if(tileIndex == baseColor && aPress){
                            player.x+=speed;
                            player.y+=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if(tileIndexR == baseColor && aPress){
                            //console.log("is... this the one?")
                            player.x+=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                        }else if(tileIndexD == baseColor && aPress){
                            player.y+=speed;
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if (tileIndex == edgeColor){
                            player.x+=speed;
                            player.y+=speed;
                        }else if (tileIndexR == edgeColor){
                            player.x+=speed;
                        }else if(tileIndexD == edgeColor){
                            player.y+=speed;
                        }else if(tileIndex == drawColor){
                            //nothing
                        }
                    }else if(leftPress && player.x-2 > 0 && player.y+2 < imageHeight && !rightPress){
                        //down left
                        tileIndex = parseInt(layer.getTileAtWorldXY(player.x-2,player.y+2).index);
                        tileIndexL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y).index);
                        tileIndexR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y).index);
                        tileIndexD = parseInt(layer.getTileAtWorldXY(player.x,player.y+2).index);
                        tileIndex1 = parseInt(layer.getTileAtWorldXY(player.x-1,player.y+1).index);
                        tileIndexL1 = parseInt(layer.getTileAtWorldXY(player.x-1,player.y).index);
                        tileIndexR3 = parseInt(layer.getTileAtWorldXY(player.x+3,player.y).index);
                        tileIndexD1 = parseInt(layer.getTileAtWorldXY(player.x,player.y+1).index);
                        tileIndexD3 = parseInt(layer.getTileAtWorldXY(player.x,player.y+3).index);
                        tileIndex2 = parseInt(layer.getTileAtWorldXY(player.x-1,player.y+1).index)
                        //  _|
                        //
                        //           __
                        //should be |     honestly (new pos Y, old pos X)
                        //  _
                        //_'   if up left drawn  _||_
                        if(tileIndex == drawColor){
                            //do nothing
                        }else if(tileIndex == borderColor && tileIndexD == baseColor && aPress){
                            player.y+=speed;
                            for (i=oldPosY;i<player.y;i++){
                                map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                            }
                        }else if(tileIndex == borderColor && tileIndexL == edgeColor && tileIndexC == drawColor && aPress){
                            player.x-=speed;
                            for (i=player.x+1;i<oldPosX;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            fillTiles();
                        }else if(tileIndex == borderColor && tileIndexD == edgeColor && tileIndexC == drawColor && aPress){
                            player.y+=speed;
                            for (i=player.y+1;i<oldPosY;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                            fillTiles();
                        }else if(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexL1 == edgeColor && tileIndexL == edgeColor && tileIndex2 == baseColor && aPress){
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(edgeColor,i,player.y,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y-1;j++){
                                map.putTileAt(edgeColor,oldPosX,j,undefined,'mainDraw');
                            }
                            map.putTileAt(transColor,player.x,player.y-1,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x+1,player.y-1,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x,player.y-2,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x+1,player.y-2,undefined,'mainDraw');

                            revealImage();

                        }else if(tileIndex == baseColor && tileIndexC == drawColor && tileIndexL1 == baseColor && tileIndexL == edgeColor && tileIndex2 == baseColor && aPress){
                            player.x-=speed;
//                            player.y+=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(edgeColor,i,player.y,undefined,'mainDraw');
                            }
//                            for (j=oldPosY; j <= player.y-1;j++){
//                                map.putTileAt(edgeColor,oldPosX,j);
//                            }
                            map.putTileAt(edgeColor,player.x+speed,player.y-1,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x,player.y-1,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x+1,player.y-1,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x,player.y-2,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x+1,player.y-2,undefined,'mainDraw');

                            revealImage();

                        }else if(tileIndex == edgeColor && tileIndexC == edgeColor && tileIndexD1 == edgeColor && tileIndexD == edgeColor && tileIndex2 == baseColor && aPress){
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(edgeColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y-1;j++){
                                map.putTileAt(edgeColor,player.x,j,undefined,'mainDraw');
                            }
                            map.putTileAt(transColor,player.x+1,player.y,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x+2,player.y,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x+1,player.y-1,undefined,'mainDraw');
                            map.putTileAt(transColor,player.x+2,player.y-1,undefined,'mainDraw');

                            revealImage();


                        }else if(tileIndex == edgeColor && tileIndexC == drawColor && tileIndexL1 == edgeColor && tileIndexL == edgeColor && tileIndex2 == baseColor && aPress){
                                player.y+=speed;
                                for (j=oldPosY; j <= player.y-1;j++){
                                    map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                                }
                                fillTiles();
                        }else if(tileIndex == edgeColor && tileIndexC == drawColor && aPress){
                            if (tileIndexD == edgeColor){
                                player.y+=speed;
                                for (j=oldPosY; j <= player.y-1;j++){
                                    map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                                }
                                fillTiles();
                            }else if(tileIndexL == edgeColor){
                                player.x-=speed;
//                                player.y+=speed;
                                for (i=player.x+1; i <= oldPosX;i++){
                                    map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                                }
//                                for (j=oldPosY; j <= player.y;j++){
//                                    map.putTileAt(drawColor,player.x,j);
//                                }
                                fillTiles();
                            }else if(tileIndexD == baseColor){
                                player.x-=speed;
                                player.y+=speed;
                                for (i=player.x+1; i <= oldPosX;i++){
                                    map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                                }
                                for (j=oldPosY; j <= player.y;j++){
                                    map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                                }
                                fillTiles();
                            }
                        }else if(tileIndexC == drawColor && tileIndexL == drawColor && tileIndexD == drawColor && tileIndex == baseColor && aPress){
                            player.x-=speed;
                            player.y+=speed;// ._|   subtractive X
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                                for (k=oldPosY; k <= player.y-1;k++){
                                    map.putTileAt(baseColor,oldPosX,k,undefined,'mainDraw');
                                }
//                                console.log("HELLOOOOO")
                        }else if (tileIndex == baseColor && tileIndexC == drawColor && tileIndexL == drawColor && tileIndexD == drawColor && aPress){
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x+1; i <= oldPosX;i++){
                                map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                            }
//                            for (k=oldPosX; k <= player.x;k++){
//                                map.putTileAt(drawColor,k,oldPosY);
//                            }
                            for (i=oldPosY;i<=player.y;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == edgeColor && tileIndexD == edgeColor && tileIndexD1 == edgeColor && tileIndex == baseColor && aPress){
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x; i <= oldPosX-1;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (i=oldPosY;i<=player.y;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == edgeColor && tileIndexL == edgeColor && tileIndexD == baseColor && aPress){
//                            player.x-=speed;
                            player.y+=speed;
//                            for (i=player.x; i <= oldPosX;i++){
//                                map.putTileAt(drawColor,i,player.y);
//                            }
                            for (i=oldPosY+1;i<=player.y;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == edgeColor && tileIndexL == baseColor && tileIndexR == edgeColor && tileIndexD == baseColor && aPress){
                            player.x-=speed;
                            player.y+=speed;
//                            for (i=player.x; i <= oldPosX;i++){
//                                map.putTileAt(drawColor,i,player.y);
//                            }
                            for (k=player.x; k <= oldPosX-1;k++){
                                map.putTileAt(drawColor,k,oldPosY,undefined,'mainDraw');
                            }
                            for (i=oldPosY+1;i<=player.y;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == edgeColor && tileIndexL == baseColor && aPress){
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x; i <= oldPosX-1;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
//                            console.log("IS IT ME")
                        }else if(tileIndex == baseColor && tileIndexD == drawColor && aPress){
                            player.x-=speed*2;
                            player.y+=speed;
                            for (i=player.x+speed; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=player.x; j <= oldPosX-speed;j++){ //.
                                map.putTileAt(drawColor,j,player.y,undefined,'mainDraw');
                            }
                            for (k=oldPosY; k <= player.y;k++){ //'
                                map.putTileAt(drawColor,player.x+speed,k,undefined,'mainDraw');
                            }
                        }else if (tileIndexC == drawColor && tileIndex == baseColor && tileIndexL == drawColor && aPress){
                            // _|
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,player.y,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                            }
//                            console.log("Hello")
//                        }else if (tileIndexC == drawColor && tileIndex == baseColor && tileIndexL == drawColor && tileIndexR3 == drawColor && aPress){
//                            player.x-=speed;
//                            player.y+=speed;
//                            for (i=player.x; i <= oldPosX;i++){ //killing the previously drawn base tiles
//                                map.putTileAt(baseColor,i,player.y);
//                            }
//                            for (j=oldPosY; j <= player.y;j++){
//                                map.putTileAt(drawColor,oldPosX,j);
//                            }
//                            console.log("hi")
                        }else if (tileIndexC==drawColor && tileIndex == baseColor && tileIndexL1==drawColor && aPress) {  //um whatever, hope it doesnt bite me back
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x+1; i <= oldPosX;i++){
                                map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }                         
                            console.log("ASDLIASJIOJADASJDIOSJDIO")                                         //  __
                        }else if (tileIndex==drawColor && tileIndexD1==drawColor && aPress) {   // _|
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x+1; i <= oldPosX;i++){
                                map.putTileAt(baseColor,i,player.y,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(baseColor,oldPosX,j,undefined,'mainDraw');
                            }                                                                  //  __
                        }else if (tileIndex==drawColor && tileIndexL1==drawColor && aPress) {  // |
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y-1;j++){
                                map.putTileAt(baseColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if(tileIndex == baseColor && tileIndexD3 == drawColor && aPress){
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if(tileIndex == baseColor && aPress){
                            player.x-=speed;
                            player.y+=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if(tileIndexL == baseColor && aPress){
                            player.x-=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
//                            console.log("OR IS IT ME")
                        }else if(tileIndexD == baseColor && aPress){
                            player.y+=speed;
                            for (j=oldPosY; j <= player.y;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if (tileIndex == edgeColor){
                            player.x-=speed;
                            player.y+=speed;
                        }else if (tileIndexL == edgeColor){
                            player.x-=speed;
                        }else if(tileIndexD == edgeColor){
                            player.y+=speed;
                        }else if(tileIndex == drawColor){
                            //nothing
                        }
                    }
                }
            }

            if (!leftPress && !rightPress){
                if (upPress && player.y-2 > 0 && !downPress){
                    //up
                    tileIndex = parseInt(layer.getTileAtWorldXY(player.x,player.y-2).index);
                    tileIndex1 = parseInt(layer.getTileAtWorldXY(player.x,player.y-1).index);
                    tileIndexR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y).index);
                    tileIndexR3 = parseInt(layer.getTileAtWorldXY(player.x+3,player.y).index);
                    tileIndexL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y).index);
                    tileIndexL3 = parseInt(layer.getTileAtWorldXY(player.x-3,player.y).index);
                    tileIndexUU = parseInt(layer.getTileAtWorldXY(player.x,player.y-4).index);
                    tileIndexUR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y-2).index);
                    tileIndexUL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y-2).index);
                    tileIndexUUR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y-4).index);
                    tileIndexUUL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y-4).index);
                    
                    if (tileIndex==drawColor && tileIndex1!=drawColor && tileIndexC == drawColor && aPress) {
                        //do nothing
                    }else if (tileIndex==edgeColor && tileIndex1==drawColor && tileIndexC == drawColor && aPress) {
                        player.y-=speed;
                        for (j=player.y+1; j <= oldPosY;j++){
                            map.putTileAt(baseColor,oldPosX,j,undefined,'mainDraw');
                        }
                    }else if(tileIndex == drawColor && tileIndex1==drawColor && tileIndexC == drawColor && aPress){
                        player.y-=speed;
                        for (j=player.y+1; j <= oldPosY;j++){
                            map.putTileAt(baseColor,oldPosX,j,undefined,'mainDraw');
                        }
                    }else if(tileIndex == edgeColor && tileIndexC == drawColor && aPress){
                        player.y-=speed;
                        for (j=player.y+1; j <= oldPosY;j++){
                            map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                        }
                        fillTiles();
                    }else if(tileIndex == edgeColor && tileIndexC == edgeColor && aPress){
                        player.y-=speed;
                    }else if (tileIndex==edgeColor && tileIndex1==drawColor && tileIndexC == drawColor && aPress) {
                        player.y-=speed;
                        for (j=player.y+1; j <= oldPosY;j++){
                            map.putTileAt(baseColor,oldPosX,j,undefined,'mainDraw');
                        }
                    }else if(tileIndex == baseColor && aPress){
                            player.y-=speed;
                            for (i=player.y; i <= oldPosY-1;i++){
                                map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                            }
                        }else if(tileIndexUR == baseColor && tileIndexR == baseColor && aPress){
                            player.x+=speed;
                            player.y-=speed;
                            for (i=oldPosX; i <= player.x;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if(tileIndexUL == baseColor && tileIndexL == baseColor && aPress){
                            player.x-=speed;
                            player.y-=speed;
                            for (i=player.x; i <= oldPosX;i++){
                                map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                            }
                            for (j=player.y; j <= oldPosY;j++){
                                map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                            }
                        }else if (tileIndexUR == edgeColor && !aPress && (tileIndex == edgeColor || tileIndexR == edgeColor) && tileIndexUUR != baseColor){
                            player.x+=speed;
                            player.y-=speed;
                        }else if (tileIndexUL == edgeColor && !aPress && (tileIndex == edgeColor || tileIndexL == edgeColor) && tileIndexUUL != baseColor){
                            player.x-=speed;
                            player.y-=speed;
                        }else if (tileIndex1 == edgeColor){
                            player.y-=speed;
                        }

                }else if(downPress && player.y+2 < imageHeight && !upPress){
                    //down
                    tileIndex = parseInt(layer.getTileAtWorldXY(player.x,player.y+2).index);
                    tileIndex1 = parseInt(layer.getTileAtWorldXY(player.x,player.y+1).index);
                    tileIndexR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y).index);
                    tileIndexL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y).index);
                    tileIndexDD = parseInt(layer.getTileAtWorldXY(player.x,player.y+4).index);
                    tileIndexDR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y+2).index);
                    tileIndexDL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y+2).index);
                    tileIndexDLL = parseInt(layer.getTileAtWorldXY(player.x-4,player.y+2).index);
                    tileIndexDRR = parseInt(layer.getTileAtWorldXY(player.x+4,player.y+2).index);
                    tileIndexDDL = parseInt(layer.getTileAtWorldXY(player.x-2,player.y+4).index);
                    tileIndexDDR = parseInt(layer.getTileAtWorldXY(player.x+2,player.y+4).index);
                    if (tileIndex==edgeColor && tileIndex1==drawColor && tileIndexC == drawColor && aPress) {
                        player.y+=speed;
                        for (j=oldPosY; j <= player.y-1;j++){
                            map.putTileAt(baseColor,oldPosX,j,undefined,'mainDraw');
                        }
                    }else if(tileIndex == edgeColor && tileIndexC == drawColor && aPress){
                        player.y+=speed;
                        for (j=oldPosY; j <= player.y-1;j++){
                            map.putTileAt(drawColor,oldPosX,j,undefined,'mainDraw');
                        }
                        fillTiles();
                    }else if(tileIndex == edgeColor && tileIndexC == edgeColor && aPress){
                        player.y+=speed;
                    }else if (tileIndex==drawColor && tileIndex1==drawColor && aPress) {
                        player.y+=speed;
                        for (j=oldPosY; j <= player.y-1;j++){
                            map.putTileAt(baseColor,oldPosX,j,undefined,'mainDraw');
                        }
                    }else if(tileIndex == baseColor && tileIndexC == edgeColor && aPress){
                        player.y+=speed;
                        for (i=oldPosY+1; i <= player.y;i++){
                            map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                        }
                    }else if(tileIndex == baseColor && aPress){
                        player.y+=speed;
                        for (i=oldPosY; i <= player.y;i++){
                            map.putTileAt(drawColor,player.x,i,undefined,'mainDraw');
                        }
                    }else if(tileIndexDR == baseColor && tileIndexR == baseColor && aPress){
                        player.x+=speed;
                        player.y+=speed;
                        for (i=oldPosX; i <= player.x;i++){
                            map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                        }
                        for (j=oldPosY; j <= player.y;j++){
                            map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                        }
                    }else if(tileIndexDL == baseColor && tileIndexL == baseColor && aPress){
                        player.x-=speed;
                        player.y+=speed;
                        for (i=player.x; i <= oldPosX;i++){
                            map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                        }
                        for (j=oldPosY; j <= player.y;j++){
                            map.putTileAt(drawColor,player.x,j,undefined,'mainDraw');
                        }
                }else if (tileIndexDR == edgeColor && !aPress && (tileIndex == edgeColor || tileIndexR == edgeColor) && tileIndexDDR != baseColor){
                    player.x+=speed;
                    player.y+=speed;
                }else if (tileIndexDL == edgeColor && !aPress && (tileIndex == edgeColor || tileIndexL == edgeColor) && tileIndexDDL != baseColor){
                    player.x-=speed;
                    player.y+=speed;
                }else if (tileIndex1 == edgeColor){
                        player.y+=speed;
                    }                            
                }
                
            }


            //erase when not pressing anything
            if(!leftPress && !rightPress && !upPress && !downPress && !aPress){
                tileIndex = parseInt(layer.getTileAtWorldXY(player.x,player.y).index);
                tileIndexR = parseInt(layer.getTileAtWorldXY(player.x+1,player.y).index);
                tileIndexL = parseInt(layer.getTileAtWorldXY(player.x-1,player.y).index);
                tileIndexU = parseInt(layer.getTileAtWorldXY(player.x,player.y-1).index);
                tileIndexD = parseInt(layer.getTileAtWorldXY(player.x,player.y+1).index);
                if(tileIndex == drawColor){
                    if (tileIndexR == drawColor){
                        player.x+=speed;
                        for (i=oldPosX; i <= player.x-1;i++){
                            map.putTileAt(baseColor,i,player.y,undefined,'mainDraw');
                        }
                    }else if (tileIndexL == drawColor){
                        player.x-=speed;
                        for (i=player.x+1; i <= oldPosX;i++){
                            map.putTileAt(baseColor,i,player.y,undefined,'mainDraw');
                        }
                    }else if (tileIndexU == drawColor){
                        player.y-=speed;
                        for (i=player.y+1; i <= oldPosY;i++){
                            map.putTileAt(baseColor,player.x,i,undefined,'mainDraw');
                        }
                    }else if (tileIndexD == drawColor){
                        player.y+=speed;
                        for (i=oldPosY; i <= player.y-1;i++){
                            map.putTileAt(baseColor,player.x,i,undefined,'mainDraw');
                        }
                    }else{
//                        map.putTileAt(baseColor,player.x,player.y);
                    }

                }             
            }

            tileIndexC = parseInt(layer.getTileAtWorldXY(player.x,player.y).index); 

            if(tileIndexC == edgeColor){
                playerState = "NoDraw";
            }else if(tileIndexC == drawColor && aPress){
                if(playerState != "YesDraw" && playerState != "Erase"){
                    initPixel = [oldPosX,oldPosY];
                    console.log("initPixel: " + initPixel)
                }
                playerState = "YesDraw";
                if(rightPress || leftPress || upPress || downPress){
//                    addSparkles(1);
                drawSparkles.emitParticleAt(oldPosX,oldPosY,1);

                }
            }else if(tileIndexC == drawColor && !aPress){
                playerState = "Erase";
            }

        }
        
    }

    updateAnimation();

    updateEnemy();

    updateKill();

    updateRevive();

//    updateCamera();
}
}
var reviveGems = [];
var numReviveGems = 12;
//degrees, not rads
var startAngularVel = 2;
var endAngularVel = 9;
var reviveDuration = 0; //set to 0 every death
var reviveDurationMax = 1800;
var startReviveLength = screenW*4;
var endReviveLength = 1

function makeReviveGems(){
    for(i=0;i<numReviveGems;i++){
        var currentAngle = (i*360/numReviveGems);
        var reviveGem = currentScene.add.sprite(initPixel[0] + startReviveLength*Math.cos(currentAngle*Math.PI/180),initPixel[1] + startReviveLength*Math.sin(currentAngle*Math.PI/180),'sparkle');
        reviveGem._currentAngle = currentAngle;
        if(i%2==0){
            reviveGem.play('sparkleShine',true)
        }else{
            reviveGem.play('sparkleShine2',true)
        }
//        reviveGem.setVisible(false);
        UICam.ignore([reviveGem])
        reviveGems.push(reviveGem);
    }

}

var distCenter = screenW*4;
var lengthStop1 = 2/100;
var lengthStop2 = 3/100;
var reviveTween1;

function updateRevive(){


    
    //add tweening to revive length, same for angle?
    if(playerState == "revive" && reviveDuration < reviveDurationMax*1.1/17){ //dont ask, turns out tween duration is different from this
        
        for (i=0;i<numReviveGems;i++){
            if (reviveDuration > (reviveDurationMax*1.08/20)){
                reviveGems[i]._currentAngle += endAngularVel;



            }else{

                    reviveGems[i]._currentAngle += startAngularVel;
            }
//            if (i==0){
//                console.log("rD: " + reviveDuration)
//                console.log("rDM: " + reviveDurationMax)
//            }
            reviveGems[i].x = initPixel[0] + distCenter*Math.cos(reviveGems[i]._currentAngle*Math.PI/180);
            reviveGems[i].y = initPixel[1] + distCenter*Math.sin(reviveGems[i]._currentAngle*Math.PI/180);
            reviveGems[i].setVisible(true);
//            console.log(reviveGems[i]._currentAngle)
//            reviveGems[i].depth = 4;
        }
        reviveDuration++;
    }
}

var isKillPlayer = false;
var initPixel = [];
var isPixelExploding = false;
var allExploded = false;
//steps before adding explosion
var alternateExplodeMax = 9;
var alternateExplodeCounter = 0;

var explodePixelX;
var explodePixelY;

//maybe have it every 2 steps, with a global alternating var?
function explodePixelChain(pixelX, pixelY){
//     console.log("pixelX: " + pixelX);
//     console.log("pixelY: " + pixelY)
//     console.log("layerX: " + layer.getTileAtWorldXY(pixelX,pixelY).x);
//     console.log("layerY: " + layer.getTileAtWorldXY(pixelX,pixelY).y);
// console.log("Is it draw tile? " + (parseInt(layer.getTileAtWorldXY(pixelX,pixelY).index) == drawColor));
// console.log("Is it draw tile Left? " + (parseInt(layer.getTileAtWorldXY(pixelX-1,pixelY).index) == drawColor));
// console.log("Is it draw tile Right? " + (parseInt(layer.getTileAtWorldXY(pixelX+1,pixelY).index) == drawColor));
// console.log("Is it draw tile Up? " + (parseInt(layer.getTileAtWorldXY(pixelX,pixelY-1).index) == drawColor));
// console.log("Is it draw tile Down? " + (parseInt(layer.getTileAtWorldXY(pixelX,pixelY+1).index) == drawColor));
//    console.log()

//    console.log("Tile XY: " + layer.getTileAtWorldXY(pixelX,pixelY))
explodePixelX = Math.floor(pixelX);
explodePixelY = Math.floor(pixelY);

//    map.putTileAt(baseColor,explodePixelX,explodePixelY);
    
        while(alternateExplodeCounter < alternateExplodeMax){
//            console.log("ASDJIOSDJIOASDOASDJOIDIOSADJIASOJO")

        var pixelLeft = parseInt(layer.getTileAtWorldXY(explodePixelX-1,explodePixelY).index) == drawColor;
        var pixelRight = parseInt(layer.getTileAtWorldXY(explodePixelX+1,explodePixelY).index) == drawColor;
        var pixelUp = parseInt(layer.getTileAtWorldXY(explodePixelX,explodePixelY-1).index) == drawColor;
        var pixelDown = parseInt(layer.getTileAtWorldXY(explodePixelX,explodePixelY+1).index) == drawColor;
            
        if(pixelLeft){
            explodePixelX--;
        }else if(pixelRight){
            explodePixelX++;
        }else if(pixelUp){
            explodePixelY--;
        }else if(pixelDown){
            explodePixelY++;
        }else{
            allExploded = true;
            isPixelExploding = false;
            break;
        }

        map.putTileAt(baseColor,explodePixelX,explodePixelY);


        alternateExplodeCounter++;


        }

        alternateExplodeCounter=0;



//                        alternateExplodeCounter = 0;
    var pixelLeft = parseInt(layer.getTileAtWorldXY(explodePixelX-1,explodePixelY).index) == drawColor;
    var pixelRight = parseInt(layer.getTileAtWorldXY(explodePixelX+1,explodePixelY).index) == drawColor;
    var pixelUp = parseInt(layer.getTileAtWorldXY(explodePixelX,explodePixelY-1).index) == drawColor;
    var pixelDown = parseInt(layer.getTileAtWorldXY(explodePixelX,explodePixelY+1).index) == drawColor;


    

//    if(pixelLeft || pixelRight || pixelUp || pixelDown){
//        explodePixelChain(explodePixelX,explodePixelY);
//    }

            
}


var freezeFrame = false;
var enemyKillXY = [];

function killPlayer(enemyX,enemyY){
    isKillPlayer = true;
    enemyKillXY[0] = enemyX;
    enemyKillXY[1] = enemyY;
    cam.stopFollow();
    cam.pan(enemyX,enemyY,750,'Power2')
}

function updateKill(){

    if(isKillPlayer){


        if (!isPixelExploding && !allExploded){
            currentScene.anims.pauseAll();
            if(enemyArray != [] && enemyArray[0]._state != "laugh"){
                for (var enemy of enemyArray){
                    enemy._state = "laugh"
                }
            }

            //replace with some kind of slash animation
            addSparkles(undefined,enemyKillXY[0],enemyKillXY[1])
            cam.flash(100);
            //explosionEmitter3.emitParticleAt(enemyKillXY[0],enemyKillXY[1]);
//            sfxExplosion3.play();
            freezeFrame = true;
            isMoving = true;
            isPixelExploding = true;
            // for(i=0;i<imageWidth;i++){
            //     for(j=0;j<imageHeight;j++){
            //         if(parseInt(layer.getTileAtWorldXY(i,j).index) == drawColor)
            //             layer.getTileAtWorldXY(i,j)._toExplode = true;
            //     }
            // }
            reviveDuration = 0;
            alternateExplodeCounter = 0;

            var camPixelate = cam.postFX.addPixelate(5)

            var freezeBeforeKill = currentScene.tweens.addCounter({
                from: 0,
                to: 750,
                duration: 750,
                onStart: () => {
                    sfxExplosion2.play();
                    cam.shake(300,0.05);
                    UICam.shake(300,0.05);
                    currentScene.add.tween({
                        targets: camPixelate,
                        duration: 150,
                        amount: -1,
                        onComplete: () => {
                            cam.clearFX();
                        }
                    });
//                    camPixelate.amount = 20
                    },
                onUpdate: () => {

                    //

                },
                onComplete: () => {
                    currentScene.anims.resumeAll();
                            explodePixelChain(initPixel[0],initPixel[1]);
                    freezeFrame = false;
                }
            })


        }else if(isPixelExploding && !freezeFrame){
            sfxExplosion3.play();
            cam.shake(100,0.03);
            UICam.shake(100,0.03);
            cam.pan(explodePixelX,explodePixelY,300,undefined,true)
            addExplosions(explodePixelX,explodePixelY)
//            explosionEmitter1.emitParticleAt(explodePixelX,explodePixelY)
            //            console.log("explodePixelX: " + explodePixelX)
//            console.log("explodePixelY: " + explodePixelY)
//            console.log("is drawcolor?: " + parseInt(layer.getTileAtWorldXY(explodePixelX,explodePixelY).index) == drawColor);
            explodePixelChain(explodePixelX,explodePixelY);
        }

        if(allExploded && playerState != "kill"){
            //console.log("WTFFFFFFFFFFFF")
            sfxExplosion3.stop();
            sfxExplosion4.play();
            cam.shake(300,0.15,true);
            UICam.shake(300,0.15,true);
            cam.flash(100);
            addSparkles(15);
            addExplosions(player.x,player.y,20,3);
            glowSprite.x = player.x;
            glowSprite.y = player.y;
            glowSprite.setVisible(true);
            glowSprite.play({key: 'glowAnim'});
            player.setVisible(false);
            distCenter = screenW*4;
            playerState = "kill";
            isKillPlayer = false;
            respawnTime = 0;
//            console.log("WTFFFFF")
        }
    }

    if(playerState == "kill"){
        if(respawnTime < respawnTimeMax){
//            console.log("???")
            respawnTime++;
        }else{
            playerState = "revive";

            reviveTween1 = currentScene.tweens.addCounter({

                from: startReviveLength,
                to: startReviveLength*lengthStop1,
                duration: 3*reviveDurationMax/5,
                ease: "Sine.easeOut",
                onStart: () =>{
                    currentScene.time.delayedCall(400, () => {
                        cam.pan(initPixel[0],initPixel[1],1500,'Power2')
                    }
                    );
                },
                onUpdate: () => {
                    distCenter = reviveTween1.getValue();
                        },
                onComplete: () => {
                    reviveTween2.play();
                }
            }).pause();
            
            const reviveTween2 = currentScene.tweens.addCounter({
        
                from: startReviveLength*lengthStop1,
                to: startReviveLength*lengthStop2,
                duration: 1*reviveDurationMax/4,
                ease: "Sine.easeInOut",
                onStart: () => {
                },
                onUpdate: () => {
                    distCenter = reviveTween2.getValue();
                        },
                onComplete: () => {
                    reviveTween3.play();
                }
            }).pause();
        
            const reviveTween3 = currentScene.tweens.addCounter({
        
                from: startReviveLength*lengthStop2,
                to: endReviveLength,
                duration: 1*reviveDurationMax/4,
                ease: "Sine.easeIn",
                onUpdate: () => {
                    distCenter = reviveTween3.getValue();
        //            console.log("distCenter: " + distCenter)
                        },
                onComplete: () => {
                    playerState = "NoDraw";
                    player.x = initPixel[0];
                    player.y = initPixel[1];
                    //reviveGems.setVisible(false);
                    allExploded = false;
                    addSparkles(10);
                    player.setVisible(true);
                    glowSprite.x = player.x;
                    glowSprite.y = player.y;
                    glowSprite.setVisible(true);
                    glowSprite.play({key: 'glowAnim'});
                    isMoving = false;
                    cam.startFollow(player,true,0.1,0.1);
                    for (i=0;i<numReviveGems;i++){
                        reviveGems[i].setVisible(false);
                    }
                    if (enemyArray != []){
                        for (i=0;i<enemyArray.length;i++){
                            enemyArray[i]._state = "move";
                        }
                    }
                }
            }).pause();
        
            reviveTween1.play();

            
        }
    }
    
}

var respawnTime = 0;
var respawnTimeMax = 120;
var bossLeft;
var bossRight;
var bossUp;
var bossDown;
var bossLeftHit;
var bossRightHit;
var bossUpHit;
var bossDownHit;
var containsDraw = false;
var leftBorderOrEdge = false;

var isSinging = false;
var blobSing = false;

var singCounter = 0;

var showDebug = false;

function updateEnemy(){
    if(enemyArray != []){
        for (var enemy of enemyArray){

            if(!enemy._isBoss){
//                console.log(enemy.x)
//                console.log(enemy.y)

                //8x8, checked within 7x7
                //ugh
                enemy._enemyTileIndexL = map.getTilesWithin(Math.floor(enemy.x)-8,Math.floor(enemy.y-7),3,7,undefined, 'mainDraw');
                enemy._enemyTileIndexR = map.getTilesWithin(Math.floor(enemy.x)+5,Math.floor(enemy.y-7),3,7,undefined, 'mainDraw');
                enemy._enemyTileIndexU = map.getTilesWithin(Math.floor(enemy.x)-7,Math.floor(enemy.y-8),7,3,undefined, 'mainDraw');
                enemy._enemyTileIndexD = map.getTilesWithin(Math.floor(enemy.x)-7,Math.floor(enemy.y+5),7,3,undefined, 'mainDraw');

//                enemy._enemyTileIndexL = parseInt(layer.getTileAtWorldXY(enemy.x-1,enemy.y).index);
//                enemy._enemyTileIndexR = parseInt(layer.getTileAtWorldXY(enemy.x+1,enemy.y).index);
//                enemy._enemyTileIndexU = parseInt(layer.getTileAtWorldXY(enemy.x,enemy.y-1).index);
//                enemy._enemyTileIndexD = parseInt(layer.getTileAtWorldXY(enemy.x,enemy.y+1).index);

            }else{
                //bull: 68 by 136
                bossLeft = map.getTilesWithin(Math.floor(enemy.x)-24,Math.floor(enemy.y-34),1,68,undefined, 'mainDraw')
                bossRight = map.getTilesWithin(Math.floor(enemy.x)+24,Math.floor(enemy.y-34),1,68,undefined, 'mainDraw')
                bossUp = map.getTilesWithin(Math.floor(enemy.x)-24,Math.floor(enemy.y-36),48,1,undefined, 'mainDraw')
                bossDown = map.getTilesWithin(Math.floor(enemy.x)-24,Math.floor(enemy.y+34),48,1,undefined, 'mainDraw')

                bossLeftHit = map.getTilesWithin(Math.floor(enemy.x)-30,Math.floor(enemy.y-25),1,50,undefined, 'mainDraw')
                bossRightHit = map.getTilesWithin(Math.floor(enemy.x)+30,Math.floor(enemy.y-25),1,50,undefined, 'mainDraw')
                bossUpHit = map.getTilesWithin(Math.floor(enemy.x)-30,Math.floor(enemy.y-27),60,1,undefined, 'mainDraw')
                bossDownHit = map.getTilesWithin(Math.floor(enemy.x)-30,Math.floor(enemy.y+25),60,1,undefined, 'mainDraw')

//                console.log(bossLeft)

                //.filter(tile => parseInt(tile.index) == drawColor);
//                console.log(bossHitbox);
            }


            if(enemy._enemyType == 'redGuy'){
                
                if(enemy._state == "move"){

                    enemy.anims.play('enemyAnim1',true);

                    if(enemy._enemyTileIndex == transColor){
                        enemy._state = "die";
                    }

                    if(enemy._enemyTileIndex == drawColor){
                        killPlayer(enemy.x,enemy.y);
                        //isKillPlayer = true;
                        //initPixel = [enemy.x,enemy.y];
                    }

                    if(enemy._enemyTileIndex==edgeColor || enemy._enemyTileIndex == borderColor){
                        enemy._movingUp = !enemy._movingUp;
                    }

                    if(enemy._movingUp){
                        enemy.y--;
                    }else{
                        enemy.y++;
                    }
                }

                if(enemy._state == "laugh" && !currentScene.anims.paused){
                    enemy.anims.play('enemyLaugh1',true);
                    //have code that changes state back to move when respawn
                }

                if(enemy._state == "die"){

                    enemy.anims.play('enemyDie1',true);
                    startKill(enemy,enemyArray);
                }

            }

            if(enemy._enemyType == 'yellowGuy'){
                if(enemy._state == "move"){
                    enemy.anims.play('enemyAnim2',true);

                if(enemy._enemyTileIndex == transColor){
                    enemy._state = "die";
                }
            
                if(enemy._enemyTileIndex == drawColor){
                    killPlayer(enemy.x,enemy.y);
                    //isKillPlayer = true;
                    //initPixel = [enemy.x,enemy.y];
                }

                if(enemy._enemyTileIndex==edgeColor || enemy._enemyTileIndex == borderColor){
                enemy._movingRight = !enemy._movingRight;
                }


                if(enemy._movingRight){
                    enemy.x++;
                }else{
                    enemy.x--;
                }
            }

            if(enemy._state == "die"){

                enemy.anims.play('enemyDie2',true);
                startKill(enemy,enemyArray);
            }

            if(enemy._state == "laugh" && !currentScene.anims.paused){
                enemy.anims.play('enemyLaugh2',true);
                //have code that changes state back to move when respawn
            }

        }

        if(enemy._enemyType == 'blueGuy'){
            if(enemy._state == "move"){
                enemy.anims.play('enemyAnim3',true);
            if(enemy._enemyTileIndex == transColor){
                enemy._state = "die";
            }
            }
            if(enemy._state == "die"){
                enemy.anims.play('enemyDie3',true);
                startKill(enemy,enemyArray);
            }
            if(enemy._state == "laugh" && !currentScene.anims.paused){
                enemy.anims.play('enemyLaugh3',true);
                //have code that changes state back to move when respawn
            }
        }


        if(enemy._enemyType == 'bull'){


            //should this be for all general cases?
            if (bossLeft.filter(tile => parseInt(tile.index) == drawColor).length != 0)
                {
                    killPlayer(enemy.x,enemy.y)
                }else if(bossRight.filter(tile => parseInt(tile.index) == drawColor).length != 0){
                    killPlayer(enemy.x,enemy.y)
                }else if(bossUp.filter(tile => parseInt(tile.index) == drawColor).length != 0){
                    killPlayer(enemy.x,enemy.y)
                }else if(bossDown.filter(tile => parseInt(tile.index) == drawColor).length != 0){
                    killPlayer(enemy.x,enemy.y)
                }

                
            if(enemy._state == "move"){


                enemy.anims.play('bullMove',true);

//                if(bossHitbox.includes(transColor)){
//                    enemy._state = "die";
  //              }

//                console.log(bossUp.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length)
                if (bossLeft.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0 && enemy._xVel < 0)
                {
                    enemy._xVel *= -1;
                    console.log("bouncing right!")
                }else if(bossRight.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0 && enemy._xVel > 0){
                    enemy._xVel *= -1;
                    console.log("bouncing left!")
                }else if(bossUp.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0 && enemy._yVel < 0){
                    enemy._yVel *= -1;
                    console.log("bouncing down!")
                }else if(bossDown.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0   && enemy._yVel > 0){
                    enemy._yVel *= -1;
                    console.log("bouncing up!")
                }

                
    
    
                if(enemy._xVel > 0){
                    enemy.flipX = true;
                }else{
                    enemy.flipX = false;
                }

                enemy.x += enemy._xVel;
                enemy.y += enemy._yVel;


                //check singing rng
                if(enemy._singTimer > enemy._singCooldown){
                    if(Math.floor(Math.random()*enemy._singRNG) == 0){
                        enemy._state = "sing";
//                        console.log("HELLO IM SINGING")
                    }
                }else{
                    enemy._singTimer++;
                }

                //for debugging the singing
                if(bPress){
                    enemy._state = "sing";
                    console.log("debug sing press")
                }

                //swing left
                if(bossLeftHit.filter(tile => parseInt(tile.index) == drawColor).length != 0 && enemy._startSwing == false){
                    enemy._state = "swing";
                    enemy._startSwing = true;
                    enemy.flipX = false;
                }
                //swing right
                else if(bossRightHit.filter(tile => parseInt(tile.index) == drawColor).length != 0 && enemy._startSwing == false){
                    enemy._state = "swing";
                    enemy._startSwing = true;
                    enemy.flipX = true;
                }
            }


            if(enemy._state == "swing"){
                if(enemy._startSwing == true){
                    enemy._startSwing = false;
                    enemy.flipX ? bullSwingTimelineRight.play(true) : bullSwingTimelineLeft.play(true);
//                    bullSwingTimelineLeft.play(true);
                }else if(bullSwingTimelineLeft.completed && bullSwingTimelineRight.completed){
                    bullSwingTimelineLeft.stop();
                    bullSwingTimelineRight.stop();
                    enemy._state = "move";
                }else if(bullSwingTimelineLeft.isPlaying() || bullSwingTimelineRight.isPlaying()){
                    if (enemy.anims.currentAnim.key == "bullSwing4" && enemy.anims.currentFrame.index == 1){
                        if(!enemy.flipX && layer.getTilesWithin(Math.floor(enemy.x)-35,Math.floor(enemy.y-35),20,55,undefined, 'mainDraw')
                            .filter(tile => parseInt(tile.index) == drawColor).length != 0){
                            killPlayer(enemy.x,enemy.y);
                        }else if(enemy.flipX && layer.getTilesWithin(Math.floor(enemy.x)+35,Math.floor(enemy.y-35),20,55,undefined, 'mainDraw')
                            .filter(tile => parseInt(tile.index) == drawColor).length != 0){
                            killPlayer(enemy.x,enemy.y);
                        }
                    }
                }
    
            }

            if(enemy._state == "sing" && !isSinging){
                isSinging = true;
                singCounter = 0;
                bullSingTimeline.play(true)
//                enemy.anims.play('bullSing1',true);
            }else if(enemy._state == "sing" && isSinging){
                singCounter++;
//                console.log(singCounter);
                if(blobSing){
                    if (singCounter%10 == 0){
                        var noteEnemy = currentScene.add.sprite(enemy.x,enemy.y-20,'musicNotes').play('musicNotes1',true)
//                        noteEnemy.scale = 0.5;
                
                        noteEnemy._randDeg = Math.random()*2*Math.PI;
                
                        noteEnemy._enemyType = "musicNote";
                        noteEnemy._state = "move";
                        noteEnemy._totalVel = 20;
                        noteEnemy._currentVel = noteEnemy._totalVel;
                        noteEnemy._totalTimer = 13;
                        noteEnemy._currentTimer = 0;
                        noteEnemy._xVel = Math.cos(noteEnemy._randDeg)*noteEnemy._totalVel;
                        noteEnemy._yVel = Math.sin(noteEnemy._randDeg)*noteEnemy._totalVel;
                
                        enemyArray.push(noteEnemy);
                
                        UICam.ignore([noteEnemy]);
                
                    }
    
                }
            }


            if(enemy._state == "laugh" && !currentScene.anims.paused){
//                console.log("HIII")
                enemy.flipX = false;
                bullSwingTimelineLeft.timeScale = 1;
                bullSwingTimelineRight.timeScale = 1;
                bullSwingTimelineLeft.stop();
                bullSwingTimelineRight.stop();
                bullSingTimeline.stop()
                enemy.anims.play('bullLaugh',true);
            }else if(enemy._state == "laugh" && currentScene.anims.paused){
                bullSwingTimelineLeft.timeScale = 0.1;
                bullSwingTimelineRight.timeScale = 0.1;
            }

            if(enemy._state == "die"){

//                enemy.anims.play('enemyDie1',true);
                startKill(enemy,enemyArray);
            }

            if(showDebug){
                debugBoss.x = enemy.x;
                debugBoss.y = enemy.y;    
                debugBoss2.x = enemy.x;
                debugBoss2.y = enemy.y;    
            }



        }


        if(enemy._enemyType == 'bullBlob'){


            
            //should this be for all cases?
            if(enemy._enemyTileIndexL.filter(tile => parseInt(tile.index) == drawColor).length != 0 || enemy._enemyTileIndexR.filter(tile => parseInt(tile.index) == drawColor).length != 0
            || enemy._enemyTileIndexU.filter(tile => parseInt(tile.index) == drawColor).length != 0 || enemy._enemyTileIndexD.filter(tile => parseInt(tile.index) == drawColor).length != 0){
               killPlayer(enemy.x,enemy.y);
               //isKillPlayer = true;
               //initPixel = [enemy.x,enemy.y];
           }


            if(enemy._state == "start"){
//                enemy._startedTween = true;
/*                const tweenBlob = currentScene.tweens.addCounter({
                    from: 2,
                    to: 0,
                    duration: 2000,
                    ease: 'Cubic.easeOut',
                    onStart: (tween) => {
                        randDegStart = Math.random()*2*Math.PI;
                    },
                    onUpdate: (tween) => {
                        enemy._xVel = tween.getValue()*Math.cos(randDegStart)/8;
                        enemy._yVel = tween.getValue()*Math.sin(randDegStart)/8;

                        if(enemy._enemyTileIndexL == edgeColor || enemy._enemyTileIndexL == borderColor){
                            enemy._xVel *= -1;
                        }else if(enemy._enemyTileIndexR == edgeColor || enemy._enemyTileIndexR == borderColor){
                            enemy._xVel *= -1;
                        }else if(enemy._enemyTileIndexU == edgeColor || enemy._enemyTileIndexU == borderColor){
                            enemy._yVel *= -1;
                        }else if(enemy._enemyTileIndexD == edgeColor || enemy._enemyTileIndexD == borderColor){
                            enemy._yVel *= -1;
                        }
        
                        enemy.x += enemy._xVel;
                        enemy.y += enemy._yVel;
                    },
                    onComplete: (tween) => {
                        enemy._xVel = Math.cos(randDegStart)/8;
                        enemy._yVel = Math.sin(randDegStart)/8;
                        enemy._state = "move"
                    },
                })*/


                if(enemy._enemyTileIndexL.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0){
                    enemy._xVel *= -1;
                }else if(enemy._enemyTileIndexR.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0){
                    enemy._xVel *= -1;
                }else if(enemy._enemyTileIndexU.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0){
                    enemy._yVel *= -1;
                }else if(enemy._enemyTileIndexD.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0){
                    enemy._yVel *= -1;
                }

//                console.log(enemy._startTimer)
                if(enemy._startTimer > enemy._maxTimer){
                    enemy.x += -1*enemy._xVel*(((enemy._maxTimer-enemy._startTimer)/enemy._maxTimer)**3);
                    enemy.y += -1*enemy._yVel*(((enemy._maxTimer-enemy._startTimer)/enemy._maxTimer)**3);    
                }else{
                    enemy.x += enemy._xVel*(((enemy._maxTimer-enemy._startTimer)/enemy._maxTimer)**3)*2;
                    enemy.y += enemy._yVel*(((enemy._maxTimer-enemy._startTimer)/enemy._maxTimer)**3)*2;    
                }

                if(enemy._startTimer == 0){
                    enemy.anims.play({key: 'bullBlobMove',startFrame: Math.floor(Math.random()*4)});
                }

                if(enemy._xVel > 0){
                    enemy.flipX = false;
                }else{
                    enemy.flipX = true;
                }

                enemy._startTimer++

//                console.log(enemy.anims.msPerFrame);

                if(enemy._startTimer > enemy._maxTimer){
                    enemy.anims.msPerFrame = 350-(150*(((enemy._maxTimer-enemy._startTimer)/enemy._maxTimer)**2));
                }else{
                    enemy.anims.msPerFrame = 250-(255*(((enemy._maxTimer-enemy._startTimer)/enemy._maxTimer)**2));
//                    console.log(enemy.anims.msPerFrame)
                }
//                console.log(enemy.anims.msPerFrame);

                if(enemy._startTimer > enemy._maxTimer*2){
                    enemy._state = "move";
                }

            }
                
            if(enemy._state == "move"){

                enemy.anims.play('bullBlobMove',true);

                if(enemy._enemyTileIndexL.filter(tile => parseInt(tile.index) == transColor).length != 0 && enemy._enemyTileIndexR.filter(tile => parseInt(tile.index) == transColor).length != 0
                 && enemy._enemyTileIndexU.filter(tile => parseInt(tile.index) == transColor).length != 0 && enemy._enemyTileIndexD.filter(tile => parseInt(tile.index) == transColor).length != 0){
                    enemy._state = "die";
                    totalBlobs--;
                }


                if(enemy._enemyTileIndexL.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0){
                    var randDegHalf = Math.random()*Math.PI/2; //actually a quarter
                    enemy._xVel = Math.cos(randDegHalf - Math.PI/2)
                    if(enemy._yVel > 0){
                        enemy._yVel = Math.sin(randDegHalf - Math.PI/2)*-1
                    }else{
                        enemy._yVel = Math.sin(randDegHalf - Math.PI/2)
                    }
                }else if(enemy._enemyTileIndexR.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0){
                    var randDegHalf = Math.random()*Math.PI/2;
                    enemy._xVel = Math.cos(randDegHalf + Math.PI/2)
                    if(enemy._yVel > 0){
                        enemy._yVel = Math.sin(randDegHalf + Math.PI/2)
                    }else{
                        enemy._yVel = Math.sin(randDegHalf + Math.PI)*-1
                    }
                }else if(enemy._enemyTileIndexU.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0){
                    var randDegHalf = Math.random()*Math.PI/2;
                    if(enemy._xVel > 0){
                        enemy._xVel = Math.cos(randDegHalf)
                    }else{
                        enemy._xVel = Math.cos(randDegHalf)*-1
                    }
                    enemy._yVel = Math.sin(randDegHalf)
                }else if(enemy._enemyTileIndexD.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0){
                    var randDegHalf = Math.random()*Math.PI/2;
                    if(enemy._xVel > 0){
                        enemy._xVel = Math.cos(randDegHalf+Math.PI)*-1
                    }else{
                        enemy._xVel = Math.cos(randDegHalf+Math.PI)
                    }
                    enemy._yVel = Math.sin(randDegHalf+Math.PI)
                }

                if(enemy._xVel > 0){
                    enemy.flipX = false;
                }else{
                    enemy.flipX = true;
                }

                enemy.x += enemy._xVel;
                enemy.y += enemy._yVel;

                if(isSinging){
                    enemy._state = "sing";
                }
            }

            if(enemy._state == "sing"){
                if(blobSing){
                    enemy.anims.play('bullBlobSing',true);

                    if (singCounter%10 == 0){
                        var noteEnemy = currentScene.add.sprite(enemy.x,enemy.y-3,'musicNotes').play('musicNotes2',true)
//                        noteEnemy.scale = 0.5;

                        noteEnemy._randDeg = Math.random()*2*Math.PI;
                
                        noteEnemy._enemyType = "musicNote";
                        noteEnemy._state = "move";
                        noteEnemy._totalVel = 10;
                        noteEnemy._currentVel = noteEnemy._totalVel;
                        noteEnemy._totalTimer = 13;
                        noteEnemy._currentTimer = 0;
                        noteEnemy._xVel = Math.cos(noteEnemy._randDeg)*noteEnemy._totalVel;
                        noteEnemy._yVel = Math.sin(noteEnemy._randDeg)*noteEnemy._totalVel;
                
                        enemyArray.push(noteEnemy);

                        UICam.ignore([noteEnemy]);
                
                    }
//                    currentScene.add.sprite(enemy.x,enemy.y,'musicNotes').play('musicNotes1',true);
                }else{
                    enemy.anims.play('bullBlobMove',true);
                }
                if(!isSinging){
                    enemy._state = "move";
                }
            }

            if(enemy._state == "laugh" && !currentScene.anims.paused){
                enemy.anims.play('enemyLaugh1',true);
                isSinging = false;
                blobSing = false;
            }

            if(enemy._state == "die"){

                enemy.anims.play('enemyDie1',true);
                startKill(enemy,enemyArray);
            }

        }

        if(enemy._enemyType == 'musicNote'){

            if(enemy._state == "laugh"){
                enemyArray.splice(enemyArray.indexOf(enemy),1);
                enemy.destroy()
            }

            if(enemy._state == "move"){
                
                enemy._currentVel = enemy._totalVel*(((enemy._totalTimer - enemy._currentTimer)/enemy._totalTimer)**4)

                enemy._xVel = Math.cos(enemy._randDeg)*enemy._currentVel;
                enemy._yVel = Math.sin(enemy._randDeg)*enemy._currentVel;
                enemy.x += enemy._xVel;
                enemy.y += enemy._yVel;

                enemy._currentTimer++;
                
                if(enemy._currentTimer > enemy._totalTimer*1.5){
                    enemyArray.splice(enemyArray.indexOf(enemy),1);
                    enemy.destroy();
                }

                if(enemy.x > borderWidth && enemy.x < screenW - borderWidth && enemy.y > borderWidth && enemy.y < screenH - borderWidth){
                    if(parseInt(layer.getTileAtWorldXY(enemy.x,enemy.y).index)==drawColor){
                        killPlayer(enemy.x,enemy.y);
                    }    
                }
            }
        }
}
    }
}

function startKill(enemy, enemyArray){
    if(enemy._dying == 0){
        enemy.x++;
    }

    enemy._dying++;

    if(enemy._dying <= 50){
        if(enemy._dying%10 == 0){
            enemy.x += (((enemy._dying%20)*2/5)-2);
        }
    }else{
        if(enemy._dying%2 == 0){
            enemy.x += ((((enemy._dying%4))*2)-2)*3.5;
        }
    }

    if(enemy._dying > 80){
//                        console.log(enemyArray.indexOf(enemy))
            enemyArray.splice(enemyArray.indexOf(enemy),1);
//            addSparkles(10,enemy.x,enemy.y);
            addExplosions(enemy.x,enemy.y,8,4);
            cam.shake(200,0.02);
            UICam.shake(200,0.02);
                enemy.destroy();
            sfxExplosion2.play();
        }
}

function updateCamera(){
    if (imageWidth > screenW || imageHeight > screenH){
//        console.log("hi")
//console.log("player.y: " + player.y)
//console.log("cam.y: " + cam.y)
//console.log("imageHeight - cam.y: " + (imageHeight - cam.y))

if (player.y > screenH/2 && imageHeight - cam.y > screenH){
  //          console.log("AAAAAAA")
            cam.y = -1*(player.y-screenH/2);
        }else if (player.y < screenH/2 && cam.y > 0){
            cam.y = -1*(player.y-screenH/2);
        }
    }
}

function updateAnimation(){
    if(playerState=="NoDraw"){
        player.anims.play('idle',true);
    }else if(playerState=="YesDraw"){
        if(player.y > oldPosY){
            player.anims.play('drawingDown',true);
        }else if(player.y < oldPosY){
            player.anims.play('drawingUp',true);
        }else if(player.x > oldPosX){
            player.anims.play('drawingRight',true);
        }else if(player.x < oldPosX){
            player.anims.play('drawingLeft',true);
        }
    }else if(playerState=="Erase"){
        player.anims.play('erasing',true);
    }
}

var checkFillCounter = 0;
var trueCheck = false;


var leftMax;
var rightMax;
var upMax;
var downMax;


function fillTiles(){

//    hasDrawn = map.findByIndex(drawColor);

//    console.log("Has drawn?: ");
//    console.log(hasDrawn);


    //check which corner is smaller

    leftMax = imageWidth/2;
    rightMax = imageWidth/2;
    upMax = imageHeight/2;
    downMax = imageHeight/2;

    trueCheck = true;


    makeEverythingYellow();

    var floodIndexUR = parseInt(layer.getTileAtWorldXY(player.x+1,player.y-1).index)==baseColor;
    var floodIndexDR = parseInt(layer.getTileAtWorldXY(player.x+1,player.y+1).index)==baseColor;
    var floodIndexDL = parseInt(layer.getTileAtWorldXY(player.x-1,player.y+1).index)==baseColor;
    var floodIndexUL = parseInt(layer.getTileAtWorldXY(player.x-1,player.y-1).index)==baseColor;

    console.log("Can check top right?: " + floodIndexUR);
    console.log("Can check bottom right?: " + floodIndexDR);
    console.log("Can check bottom left?: " + floodIndexDL);
    console.log("Can check top left?: " + floodIndexUL);


    cornerCheck = (floodIndexUR ? 1 : 0) + (floodIndexDR ? 1 : 0) + (floodIndexDL ? 1 : 0) + (floodIndexUL ? 1 : 0);

    isCorner = false;

    if (cornerCheck >=3){
        console.log("This is a corner!");
        isCorner = true;

        var floodIndexL = parseInt(layer.getTileAtWorldXY(player.x-1,player.y).index)==baseColor;
        var floodIndexR = parseInt(layer.getTileAtWorldXY(player.x+1,player.y).index)==baseColor;
        var floodIndexD = parseInt(layer.getTileAtWorldXY(player.x,player.y+1).index)==baseColor;
        var floodIndexU = parseInt(layer.getTileAtWorldXY(player.x,player.y-1).index)==baseColor;
    
        console.log("Can check left?: " + floodIndexL);
        console.log("Can check right?: " + floodIndexR);
        console.log("Can check bottom?: " + floodIndexD);
        console.log("Can check top?: " + floodIndexU);
    
    }else{
        console.log("Not a corner!")
    }

    if(!isCorner)
    {
    clearFillCheck();
    if(floodIndexUR) checkFill(player.x+1,player.y-1,false,false,"both");
    URCounter = checkFillCounter;
    clearFillCheck();

    if(floodIndexDR) checkFill(player.x+1,player.y+1,false,false,"both");
    DRCounter = checkFillCounter;
    clearFillCheck();

    if(floodIndexDL) checkFill(player.x-1,player.y+1,false,false,"both");
    DLCounter = checkFillCounter;
    clearFillCheck();

    if(floodIndexUL) checkFill(player.x-1,player.y-1,false,false,"both");
    ULCounter = checkFillCounter;
    clearFillCheck();
    }else{
        clearFillCheck();
        if(floodIndexUR) checkFill(player.x+1,player.y-1,false,false,"both");
        URCounter = checkFillCounter;
        clearFillCheck();
    
        if(floodIndexDR) checkFill(player.x+1,player.y+1,false,false,"both");
        DRCounter = checkFillCounter;
        clearFillCheck();
    
        if(floodIndexDL) checkFill(player.x-1,player.y+1,false,false,"both");
        DLCounter = checkFillCounter;
        clearFillCheck();
    
        if(floodIndexUL) checkFill(player.x-1,player.y-1,false,false,"both");
        ULCounter = checkFillCounter;
        clearFillCheck();

        if(floodIndexL) checkFill(player.x-1,player.y-1,false,false,"both");
        LCounter = checkFillCounter;
        clearFillCheck();

        if(floodIndexR) checkFill(player.x+1,player.y-1,false,false,"both");
        RCounter = checkFillCounter;
        clearFillCheck();

        if(floodIndexD) checkFill(player.x,player.y+1,false,false,"both");
        DCounter = checkFillCounter;
        clearFillCheck();

        if(floodIndexU) checkFill(player.x,player.y-1,false,false,"both");
        UCounter = checkFillCounter;
        clearFillCheck();


        console.log("L: " + LCounter)
        console.log("R: " + RCounter)
        console.log("D: " + DCounter)
        console.log("U: " + UCounter)

    }

    console.log("UR: " + URCounter)
    console.log("DR: " + DRCounter)
    console.log("DL: " + DLCounter)
    console.log("UL: " + ULCounter)



    if(!isCorner){
        var findMin = {
            'UR': URCounter,
            'DR': DRCounter,
            'DL': DLCounter,
            'UL': ULCounter
        }
    }else{
        var findMin = {
            'UR': URCounter,
            'DR': DRCounter,
            'DL': DLCounter,
            'UL': ULCounter,
            'L': LCounter,
            'R': RCounter,
            'D': DCounter,
            'U': UCounter
        }        
    }

    var min;
    for (var h in findMin) {
    if ((!min || (findMin[h] < findMin[min])) && findMin[h] > 0) {
        min = h;
    }
    }

    console.log("min numebr: " + min)

    console.log(findMin[min]);


    trueCheck = true;

//    console.log("current Color: " + layer.getTileAtWorldXY(player.x+1,player.y-1).index);
    
if(!isCorner)
{
    if(min == 'UR')
    {
        checkFill(player.x+1,player.y-1,false,false,"both");
    }else if(min=='DR'){
        checkFill(player.x+1,player.y+1,false,false,"both");
    }else if(min=='DL'){
        checkFill(player.x-1,player.y+1,false,false,"both");
    }else if(min=='UL'){
        checkFill(player.x-1,player.y-1,false,false,"both");
    }
}else{
    if(min == 'UR')
    {
        checkFill(player.x+1,player.y-1,false,false,"both");
    }else if(min=='DR'){
        checkFill(player.x+1,player.y+1,false,false,"both");
    }else if(min=='DL'){
        checkFill(player.x-1,player.y+1,false,false,"both");
    }else if(min=='UL'){
        checkFill(player.x-1,player.y-1,false,false,"both");
    }else if(min == 'L'){
        checkFill(player.x-1,player.y,false,false,"both");
    }else if(min=='R'){
        checkFill(player.x+1,player.y,false,false,"both");
    }else if(min=='D'){
        checkFill(player.x,player.y+1,false,false,"both");
    }else if(min=='U'){
        checkFill(player.x,player.y-1,false,false,"both");
    }
    
}

/*    console.log("leftMax: " + leftMax)
    console.log("rightMax: " + rightMax)
    console.log("upMax: " + upMax)
    console.log("downMax: " + downMax)
*/
//    checkFillRest();


    console.log("FULL CHECK PERFORMED")

    performFill();

    console.log("FILL PERFORMED")

    checkAdjacentTrans();

    revealImage();

    percPopup();

    flashSilh();



    //lol
//    checkAdjacentTrans();

}

var flashBrightness;


function flashSilh(){
    currentScene.tweens.addCounter({
        from: flashBrightness,
        to: 1,
        duration: 300,
        onUpdate: function (tween)
        {
//            const value = Math.floor(tween.getValue());
silhouetteHue.brightness(tween.getValue(),true);
silhouetteHue.saturate(tween.getValue()-0.8,true);
//            image.setTint(Phaser.Display.Color.GetColor(value, value, value));
        }
    });
}



var explosionArray = [];

function addExplosions(xPos = player.x, yPos = player.y, num = 1,circleScale = 2){


    var tempExplosion3 = currentScene.add.particles(0,0,'explosion3',{
        anim: 'explosionAnim3',
        emitting: false,
        stopAfter: num,
        frequency: 16,
        rotate: {min: 0, max: 200},
        scale: [0.75,0.25,0.5],
    }).stop();
    tempExplosion3.addEmitZone({
        type: 'random',
        source: new Phaser.Geom.Circle(0, 0, circleScale*5), //8, 20, 4
    })
    UICam.ignore(tempExplosion3)
    explosionArray.push(tempExplosion3);
    tempExplosion3.on('complete', () => {
        explosionArray.splice(explosionArray.indexOf(tempExplosion3),1);
        tempExplosion3.destroy();
    });
    tempExplosion3.x = xPos;
    tempExplosion3.y = yPos;
    tempExplosion3.start();

    

    var tempExplosion = currentScene.add.particles(0,0,'explosion1',{
        anim: 'explosionAnim1',
        emitting: false,
        stopAfter: num*2,
        frequency: 16,
        scale: [1],
        speedY: {min: 0, max: -30},
    }).stop();
    tempExplosion.addEmitZone({
        type: 'random',
        source: new Phaser.Geom.Circle(0, 0, circleScale*4), //8, 20, 4
    })
    UICam.ignore(tempExplosion)
    explosionArray.push(tempExplosion);
    tempExplosion.on('complete', () => {
        explosionArray.splice(explosionArray.indexOf(tempExplosion),1);
        tempExplosion.destroy();
    });
    tempExplosion.x = xPos;
    tempExplosion.y = yPos;
    tempExplosion.start();

    var tempExplosion2 = currentScene.add.particles(0,0,'explosion1',{
        anim: 'explosionAnim1',
        emitting: false,
        stopAfter: num*2,
        frequency: 16,
        scale: [0.5],
        speedY: {min: 0, max: -30},
    }).stop();
    tempExplosion2.addEmitZone({
        type: 'random',
        source: new Phaser.Geom.Circle(0, 0, circleScale*8), //8, 20, 4
    })
    UICam.ignore(tempExplosion2)
    explosionArray.push(tempExplosion2);
    tempExplosion2.on('complete', () => {
        explosionArray.splice(explosionArray.indexOf(tempExplosion2),1);
        tempExplosion2.destroy();
    });
    tempExplosion2.x = xPos;
    tempExplosion2.y = yPos;
    tempExplosion2.start();

//    explosionEmitter2.emitParticleAt(xPos,yPos,num);


//    explosionEmitter3.emitParticleAt(xPos,yPos,num);
}

function addExplosions2(xPos = player.x, yPos = player.y, num = undefined){
    explosionEmitter1.emitParticleAt(xPos,yPos,num);
    explosionEmitter2.emitParticleAt(xPos,yPos,num);
    explosionEmitter3.emitParticleAt(xPos,yPos,num);
}


function addSparkles(num = 5, xPos = player.x, yPos = player.y){
    sparkleEmitter.emitParticleAt(xPos,yPos,num);
    sparkleEmitter2.emitParticleAt(xPos,yPos,num);

}


function addRainbowstars(xPos = player.x,yPos = player.y){
    rainbowStarEmitter.emitParticleAt(xPos,yPos)

}


function addRainbowstars2(xPos = player.x,yPos = player.y){
    rainbowStarEmitter2.emitParticleAt(xPos,yPos)
}

var scoreTint = 0xffffff;



function percPopup(){



    var oldPercentage = percentageRevealed;
    percentageRevealed = Math.floor(10*(100*numRevealed/(totalSilhouette)))/10;
    
    percentageDelta = Math.floor(10*(percentageRevealed-oldPercentage))/10;
    
    console.log("+" + percentageDelta + "%!")
    console.log(percentageRevealed + "% cleared!")


    var flavorText = currentScene.add.bitmapText(0,0,'score','').setOrigin(0.5,0.5);
    var addScore = currentScene.add.bitmapText(0,0,'score','').setOrigin(1,0.5);
    var addScoreRight = currentScene.add.bitmapText(0,0,'score','').setOrigin(0,0.5);

    var flavorTextColor = flavorText.postFX.addColorMatrix();

    const flavorColor = currentScene.tweens.addCounter({
        from: 0,
        to: 360,
        duration: percentageDelta > 10 ? 150 : 500,
        repeat: -1,
        onUpdate: (flavorColor) => {
            //silhouetteHueValue = tween.getValue();
            flavorTextColor.hue(flavorColor.getValue());
//            silhouetteGlow.glcolor(tween.getValue());
        }
    });



    cam.ignore([addScore,addScoreRight,flavorText]);
//    addScore.text = `+${percentageDelta.toFixed(1)}%`;
    addScore.text = `+${Math.floor(percentageDelta)}`;
    addScoreRight.text = `.${percentageDelta*10-(Math.floor(percentageDelta)*10)}%`;
    addScore.x = player.x-cam.scrollX;
    addScore.y = player.y-cam.scrollY;
    addScoreRight.x = player.x+1-cam.scrollX;
    addScoreRight.y = player.y-2-cam.scrollY;
    flavorText.x = player.x-cam.scrollX;
    flavorText.y = player.y-cam.scrollY-10;
//    console.log("cam.scrollY: " + cam.scrollY)
    addScore.fontSize = 0;
    addScoreRight.fontSize = 0;
    flavorText.fontSize = 0;
//    addScore.setStroke('0x000000',2)
//    addScore.postFX.addGlow(0x000000,3);
addScore.setTintFill(scoreTint);
addScoreRight.setTintFill(scoreTint);
flavorText.setTintFill(scoreTint);

    var getTime = currentScene.time.now;
    var startTime = getTime;


    if (percentageDelta >= 5){
        sfxSuccess2.play();
        sfxExplosion2.play();
        cam.shake(400);
        UICam.shake(400);
        addSparkles(15);
        if(percentageDelta >= 8){
            addRainbowstars2();
        }else{
            addRainbowstars();
        }
        flashBrightness = 1.7
        glowSprite.x = player.x;
        glowSprite.y = player.y;
        glowSprite.setVisible(true);
        glowSprite.play({key: 'glowAnim'});
        }else{
        sfxSuccess.play();
        sfxExplosion.play();
        cam.shake(100,0.02);
        UICam.shake(100,0.02);
        addSparkles();
        flashBrightness = 1.2
        glowSprite.x = player.x;
        glowSprite.y = player.y;
        glowSprite.setVisible(true);
        glowSprite.play({key: 'glowAnim'});
    }




    const spriteFlash = currentScene.tweens.addCounter({
        from: 0,
        to: 1,
        duration: 200,
        onStart: () => {
            player.setTintFill(0xffffff);
        },
        onComplete: () => {
            player.clearTint();
        }
    })

const flash = currentScene.tweens.addCounter({
    from: 0,
    to: 100,
    duration: 500,
    onUpdate: () => {
        var value = Math.floor(flash.getValue());

        if (value > 98){
            addScore.clearTint();
            addScoreRight.clearTint();
            flavorText.clearTint();
        }else if(value > 70){
            addScore.setTintFill(scoreTint);
            addScoreRight.setTintFill(scoreTint);
            flavorText.setTintFill(scoreTint);
        }else if(value > 44){
            addScore.clearTint();
            addScoreRight.clearTint();
            flavorText.clearTint();
        }
    }
})

const flashMain = currentScene.tweens.addCounter({
    from: 0,
    to: 100,
    duration: 150,
    onUpdate: () => {
        var value = Math.floor(flashMain.getValue());
        
        if (value > 98){
            scoreText.clearTint();
            scoreTextRight.clearTint();
            flavorText.clearTint();
        }
    }
}).pause()

/*
const bulgeText = currentScene.tweens.add({
    targets: scoreText,
    duration: 300,
    yoyo: true,
    hold: 150,
    fontSize: 40 + ((1.3*percentageDelta)),
    ease: 'Cubic.easeOut'




}).pause()
*/
const bulgeText = currentScene.tweens.add({
    targets: scoreText,
    duration: 300,
    delay: 600,
//    yoyo: true,
//    hold: 150,
    fontSize: 32,
    ease: 'Cubic.easeIn'




}).pause()

const bulgeTextRight = currentScene.tweens.add({
    targets: scoreTextRight,
    duration: 300,
    delay: 600,
//    yoyo: true,
//    hold: 150,
    fontSize: 20,
    ease: 'Cubic.easeIn'




}).pause()


    const moveLeft = currentScene.tweens.add({
        targets: [addScore,addScoreRight],
        delay: 1100,
        duration: 450,
//        x: 60,
        y: screenH-25,
        ease: 'Quart.easeIn'
    })


    //work on the below for addScoreRight
    const incrementDelta = currentScene.tweens.addCounter({
        from:0,
        to:100,
        duration: 400,
        ease: 'Cubic.easeOut',
        onUpdate: () => {
            addScore.text = `+${(Math.floor(percentageDelta*incrementDelta.getValue()/100))}`;
//            console.log((Math.floor(10*percentageDelta*incrementDelta.getValue()/100))%10)
            addScoreRight.text = `.${((Math.floor(10*percentageDelta*incrementDelta.getValue()/100))%10)}%`;
        },
        onComplete: () => {
            addScore.text = `+${Math.floor(percentageDelta)}`;
            addScoreRight.text = `.${Math.floor(10*(percentageDelta-Math.floor(percentageDelta)))}%`;
        }
})

const flavorTextMove = currentScene.tweens.chain({
    targets: flavorText,
    tweens:[
        {
            duration: 300,
            y: player.y < 80 ? '+= 60' : '-= 45',
            ease: 'power4',        
            fontSize: percentageDelta >= 8 ? 32 : 24, //change depending on text above
            hold: 800,
            onStart: () => {
                if(percentageDelta >= 8){
                    flavorText.text = `WONDERFUL`;
                }else if(percentageDelta >= 5){
                    flavorText.text = `GREAT`;
                }
            
            }
        },
        {
            duration: 150,
            fontSize: 0,
            ease: 'Cubic.easeIn',
            onComplete: () => {
                flavorText.destroy();
                flavorColor.destroy();
            }
        }
    ]
})

const chain = currentScene.tweens.chain({

    targets: addScore,
    //persist: true, //if true, will not destroy tween after its run, allowing for playback
    tweens:[
        {
            y: player.y < 80 ? '+=25' : '-=25',
            ease: 'power4',
            fontSize: percentageDelta >= 5 ? 24+(9*percentageDelta/10) : 24,
            duration: 300,
            hold: 0,
        },
        {
            x: 55,
//                y: screenH-20,
            fontSize: 16,
            ease: 'Quint.easeIn',
            delay: 200,
            duration: 900,
        }
    ]


});

const chain2 = currentScene.tweens.chain({
//for the smaller number
    targets: addScoreRight,
    //persist: true, //if true, will not destroy tween after its run, allowing for playback
    tweens:[
        {
            y: player.y < 80 ? '+=25' : '-=25',
            ease: 'power4',
            fontSize: percentageDelta >= 5 ? 12+(9*percentageDelta/10) : 18,
            duration: 300,
            hold: 0,
        },
        {
            x: 55,
//                y: screenH-20,
            fontSize: 12,
            ease: 'Quint.easeIn',
            delay: 200,
            duration: 900,
        }
    ]


});

    chain.setCallback('onComplete',()=>{
        scoreCounter.play();
        scoreText.setTintFill(scoreTint);
        scoreTextRight.setTintFill(scoreTint);
        scoreText.fontSize = 38 + ((1.2*percentageDelta));
        scoreTextRight.fontSize = scoreTextRight.fontSize * (scoreText.fontSize/36);
        bulgeText.play();
        bulgeTextRight.play();
        flashMain.play();
        addScore.destroy();
        addScoreRight.destroy();
//        scoreText.text = `${percentageRevealed.toFixed(1)}%`
    })

    var scoreCounter = currentScene.tweens.addCounter({
        from: 0,
        to: Math.floor((percentageRevealed - oldPercentage)*10),
        duration: 400,
        ease: 'Cubic.easeOut',
        onUpdate: () => {
            var scoreTextUnsplit = Math.floor(10*(oldPercentage+(scoreCounter.getValue()/10)));
//            console.log("scoreTextUnsplit: " + scoreTextUnsplit)
            scoreText.text = `${(Math.floor(scoreTextUnsplit/10))}`
            scoreTextRight.text = `.${Math.floor(10*(scoreTextUnsplit/10 - Math.floor(scoreTextUnsplit/10)))}%`
        },
        onComplete: () => {
            scoreText.text = `${Math.floor(percentageRevealed)}`;
            scoreTextRight.text = `.${Math.floor(10*(percentageRevealed-Math.floor(percentageRevealed)))}%`;
        }
    }).pause()
    
//play sfx here


}

function makeEverythingYellow()
{
    for (i=0;i<imageWidth;i++){
        for (j=0;j<imageHeight;j++){
            if(parseInt(layer.getTileAtWorldXY(i,j).index)==drawColor){
                map.putTileAt(edgeColor,i,j,undefined,'mainDraw');
            }
        }
    }
}

function clearFillCheck(){
    checkFillCounter = 0;
    for(i=0;i<imageWidth;i++){
        for(j=0;j<imageHeight;j++){
            layer.getTileAtWorldXY(i,j)._isChecked = false;
        }
    }
}

function performFill(){
    for(i=0;i<imageWidth;i++){
        for(j=0;j<imageHeight;j++){
            if(layer.getTileAtWorldXY(i,j)._isChecked){
                map.putTileAt(transColor,i,j,undefined,'mainDraw');
            }
        }
    }
}

/*function checkFill(xPos,yPos){
//    console.log(layer.getTileAtWorldXY(xPos,yPos)._isChecked)
    if (parseInt(layer.getTileAtWorldXY(xPos,yPos).index)==baseColor && !layer.getTileAtWorldXY(xPos,yPos)._isChecked)
    {
        checkFillCounter++;
        layer.getTileAtWorldXY(xPos,yPos)._isChecked = true;
        checkFill(xPos+1,yPos);
        checkFill(xPos-1,yPos);
        checkFill(xPos,yPos+1);
        checkFill(xPos,yPos-1);
    }
}*/

function checkFill(xPos,yPos,checkedLeft = false,checkedRight = false,dir)
{
    if(xPos>borderWidth-1 && xPos<imageWidth-borderWidth+1 && yPos>borderWidth-1 && yPos<imageHeight-borderWidth+1 && checkFillCounter < 99999){
        if(parseInt(layer.getTileAtWorldXY(xPos,yPos).index)==baseColor && layer.getTileAtWorldXY(xPos,yPos)._isChecked == false){

            layer.getTileAtWorldXY(xPos,yPos)._isChecked = true;
            checkFillCounter++;

            if(!checkedLeft && parseInt(layer.getTileAtWorldXY(xPos-1,yPos).index)==baseColor && layer.getTileAtWorldXY(xPos-1,yPos)._isChecked==false){
                checkFill(xPos-1,yPos,false,true,"both");
                checkedLeft = true;
            }else if(checkedLeft && parseInt(layer.getTileAtWorldXY(xPos-1,yPos).index)==edgeColor){
                checkedLeft = false;
            }

            if(!checkedRight && parseInt(layer.getTileAtWorldXY(xPos+1,yPos).index)==baseColor && layer.getTileAtWorldXY(xPos+1,yPos)._isChecked==false){
                checkFill(xPos+1,yPos,true,false,"both");
                checkedRight = true;
            }else if(checkedRight && parseInt(layer.getTileAtWorldXY(xPos+1,yPos).index)==edgeColor){
                checkedRight = false;
            }

            if(dir=="up"){
                checkFill(xPos,yPos-1,checkedLeft,checkedRight,"up");
            }else if(dir=="down"){
                checkFill(xPos,yPos+1,checkedLeft,checkedRight,"down");
            }else if(dir=="both"){
                checkFill(xPos,yPos-1,checkedLeft,checkedRight,"up");
                checkFill(xPos,yPos+1,checkedLeft,checkedRight,"down");
            }



        }
    }else{
        checkFillCounter=99999
    }

}

var percentageRevealed;
var percentageDelta;
var numRevealed;

function revealImage(){

//    console.log("imageWidth: " + imageWidth)
//    console.log("imageHeight: " + imageWidth)
//    console.log(that)
//    currentScene
    const rt = currentScene.make.renderTexture({x: 0, y: 0, width: imageWidth, height: imageHeight, add: false}).setOrigin(0.0);

    numRevealed = 0;

    revealMask = [...Array(imageHeight)].map(e => Array(imageWidth).fill(4));

//    console.log(map)
//    console.log("Index: " + parseInt(layer.getTileAtWorldXY(300,200).index))
//    console.log(imageWidth-borderWidth)
    for (i=borderWidth;i<imageWidth-borderWidth;i++){
        for (j=borderWidth;j<imageHeight-borderWidth;j++){
//            if(layer.getTileAtWorldXY(i,j) == null){
//                console.log("i: " + i + "; j: " + j)
//            }
            if(parseInt(layer.getTileAtWorldXY(i,j).index)==transColor){
                revealMask[j][i] = 0;
                if (silhouetteMatrix[j][i] == 1){
                    numRevealed++;
                }
            }
        }
    }

    

    layer2 = map.createBlankLayer('maskDraw',drawTileset);
    layer2.putTilesAt(revealMask,0,0);

    finishedImage.mask = new Phaser.Display.Masks.BitmapMask(this,rt);
    rt.draw(layer2,0,0)

    map.destroyLayer(layer2)

}


function checkFill2(xPos,yPos,checkedRight = false,checkedLeft=false,dir="both")
{  
    var topCheck = yPos;
//    var topMax = 0;
//    var botMax = 0;
/*if (leftMax > xPos){
    leftMax = xPos;
}
if (rightMax< xPos){
    rightMax = xPos;
}

if (upMax > yPos){ //?????
    upMax = yPos;
}

if (downMax < yPos){ ///NOT reliable
    downMax = yPos;
}*/

    while(parseInt(layer.getTileAtWorldXY(xPos,topCheck).index)==baseColor){
        if(parseInt(layer.getTileAtWorldXY(xPos,topCheck).index)==baseColor){
    
            layer.getTileAtWorldXY(xPos,topCheck)._isChecked = true;


    
            if(checkedLeft && (parseInt(layer.getTileAtWorldXY(xPos-1,topCheck).index)==edgeColor || parseInt(layer.getTileAtWorldXY(xPos-1,topCheck).index)==drawColor))
                {
                    checkedLeft = false;
                }
                else if(!checkedLeft && parseInt(layer.getTileAtWorldXY(xPos-1,topCheck).index)==baseColor)
                {
                    if(parseInt(layer.getTileAtWorldXY(xPos-1,topCheck-1).index)==baseColor && parseInt(layer.getTileAtWorldXY(xPos-1,topCheck+1).index)==baseColor){
                        checkFill(xPos-1,topCheck,true,false,"both");
                    }else if(parseInt(layer.getTileAtWorldXY(xPos-1,topCheck-1).index)==baseColor){
                        checkFill(xPos-1,topCheck,true,false,"up");
                    }else if(parseInt(layer.getTileAtWorldXY(xPos-1,topCheck+1).index)==baseColor){
                        checkFill(xPos-1,topCheck,true,false,"down");
                    }
                    checkedLeft=true;
                }
            if(checkedRight && (parseInt(layer.getTileAtWorldXY(xPos+1,topCheck).index)==edgeColor || parseInt(layer.getTileAtWorldXY(xPos+1,topCheck).index)==drawColor))
                {
                    checkedRight = false;
                }
                else if(!checkedRight && parseInt(layer.getTileAtWorldXY(xPos+1,topCheck).index)==baseColor)
                {
                    if(parseInt(layer.getTileAtWorldXY(xPos+1,topCheck-1).index)==baseColor && parseInt(layer.getTileAtWorldXY(xPos+1,topCheck+1).index)==baseColor){
                        checkFill(xPos+1,topCheck,false,true,"both");
                    }else if(parseInt(layer.getTileAtWorldXY(xPos-1,topCheck-1).index)==baseColor){
                        checkFill(xPos+1,topCheck,false,true,"up");
                    }else if(parseInt(layer.getTileAtWorldXY(xPos-1,topCheck+1).index)==baseColor){
                        checkFill(xPos+1,topCheck,false,true,"down");
                    }
                    checkedRight=true;
                }

                if(dir=="up")
                {
                    if(parseInt(layer.getTileAtWorldXY(xPos,topCheck-1).index)==baseColor){
                        checkFill(xPos,topCheck-1,true,true,"up");
                    }
                }else if(dir=="down"){
                    if(parseInt(layer.getTileAtWorldXY(xPos,topCheck+1).index)==baseColor){
                        checkFill(xPos,topCheck+1,true,true,"down");
                    }
                }else if(dir=="both"){
                    if(parseInt(layer.getTileAtWorldXY(xPos,topCheck-1).index)==baseColor){
                        checkFill(xPos,topCheck-1,true,true,"up");
                    }
                    if(parseInt(layer.getTileAtWorldXY(xPos,topCheck+1).index)==baseColor){
                        checkFill(xPos,topCheck+1,true,true,"down");
                    }
                }

        
                checkFillCounter++;
    
                if(topCheck<4 || xPos < 4 || xPos > imageWidth-4){
                    checkFillCounter=999999999;
                }
    
            }

        }




/*         for (i=topMax;i<yPos;i++){
            layer.getTileAtWorldXY(xPos,i)._isChecked = true;
            checkFillCounter++;
        } */
}


function checkFillBottom(xPos,yPos,checkedRight = false,checkedLeft=false)
{
    var botCheck= yPos;

            if(parseInt(layer.getTileAtWorldXY(xPos,botCheck-1).index)!=edgeColor && parseInt(layer.getTileAtWorldXY(xPos,botCheck-1).index)!=drawColor){
        
                layer.getTileAtWorldXY(xPos,botCheck)._isChecked = true;
        
        
                if(checkedLeft && (parseInt(layer.getTileAtWorldXY(xPos-1,botCheck).index)==edgeColor || parseInt(layer.getTileAtWorldXY(xPos-1,botCheck).index)==drawColor))
                    {
                        checkedLeft = false;
                    }
                    else if(!checkedLeft && parseInt(layer.getTileAtWorldXY(xPos-1,botCheck).index)==baseColor)
                    {
                        checkFill(xPos-1,botCheck,true,false);
                        checkedLeft=true;
                    }
                if(checkedRight && (parseInt(layer.getTileAtWorldXY(xPos+1,botCheck).index)==edgeColor || parseInt(layer.getTileAtWorldXY(xPos+1,botCheck).index)==drawColor))
                    {
                        checkedRight = false;
                    }
                    else if(!checkedRight && parseInt(layer.getTileAtWorldXY(xPos+1,botCheck).index)==baseColor)
                    {
                        checkFill(xPos+1,botCheck,false,true);
                        checkedRight=true;
                    }
                    botCheck++;
                    checkFillCounter++;
        
                    if(botCheck>imageHeight-4 || xPos < 4 || xPos > imageWidth-4){
                        checkFillCounter=999999999;
                    }
        
    }


}




/*
    if(parseInt(layer.getTileAtWorldXY(i,k+1).index)==drawColor){
        while(((parseInt(layer.getTileAtWorldXY(i,k+1).index))==drawColor || (parseInt(layer.getTileAtWorldXY(i,k+1).index))==edgeColor) && k+1<screenH){
            k++;
        }
    }
*/

    //check topdown
//    i=0;

/*
var j=0;
    var k=0;
    for(i=0;i<screenW;i++){
        j=0;
        var altDraw = false;
        while(j<screenH){


            currentColor = parseInt(layer.getTileAtWorldXY(i,j).index);
            belowColor = parseInt(layer.getTileAtWorldXY(i,j+1).index);


            if(currentColor==drawColor){
                if(belowColor == baseColor){
                    k=j+2;
                    while(k<screenH && layer.getTileAtWorldXY(i,k).index==baseColor){
                        k+=2;
                    }
                    if(k!=j+2 && k<screenH-5 && !altDraw){
                        for(m=j+1;m<k;m++){
                            map.putTileAt(transColor,i,m);
                            altDraw = true;
                        }
                        j=k;
                    }else if(k==j+2 && !altDraw){
                        map.putTileAt(transColor,i,k);
                        altDraw = true;
                    }
                } 
            }
            j+=2;
*/
/*            if (parseInt(layer.getTileAtWorldXY(i,j).index)==drawColor && parseInt(layer.getTileAtWorldXY(i,j+1).index)==drawColor){
                k = j+1;
                while(k<screenH && !((parseInt(layer.getTileAtWorldXY(i,k).index))==drawColor) && !((parseInt(layer.getTileAtWorldXY(i,k).index))==edgeColor) && !((parseInt(layer.getTileAtWorldXY(i,k).index))==transColor)){
                    k++;
                }
                if(k<screenH && k > j+1){
                    for(m=j+1;m<k;m++){
                        map.putTileAt(transColor,i,m);
                    }
                    j = k;
                }
            }else if(j+1<screenH && ((parseInt(layer.getTileAtWorldXY(i,j+1).index)==edgeColor) || (parseInt(layer.getTileAtWorldXY(i,j+1).index)==drawColor))){
                j++;
            }else{
                j++;
            }*/
//            console.log("J: " + j)
/*
            if (parseInt(layer.getTileAtWorldXY(i,j).index)==edgeColor){
                k = j+1
                while(k<screenH && !((parseInt(layer.getTileAtWorldXY(i,k).index))==transColor) && !((parseInt(layer.getTileAtWorldXY(i,k).index))==drawColor) && !((parseInt(layer.getTileAtWorldXY(i,k).index))==edgeColor)){
                    k++;
                }
                if(k<screenH && k > j+1){
                    for(m=j+1;m<k;m++){
                        map.putTileAt(transColor,i,m);
                    }
                }
                j = k;
            }

*/

//            j++
/*        }
    }
    checkAdjacentTrans();
}
*/

function checkAdjacentTrans(){
    for (i=1;i<imageWidth-1;i++){
        for(j=1;j<imageHeight-1;j++){
            if(parseInt(layer.getTileAtWorldXY(i,j).index)==drawColor){
                map.putTileAt(edgeColor,i,j,undefined,'mainDraw');
            }
            if(parseInt(layer.getTileAtWorldXY(i,j).index)==edgeColor && parseInt(layer.getTileAtWorldXY(i-1,j).index)==transColor && parseInt(layer.getTileAtWorldXY(i+1,j).index)==transColor){
                map.putTileAt(transColor,i,j,undefined,'mainDraw');
            }
            if(parseInt(layer.getTileAtWorldXY(i,j).index)==edgeColor && parseInt(layer.getTileAtWorldXY(i,j+1).index)==transColor && parseInt(layer.getTileAtWorldXY(i,j-1).index)==transColor){
                map.putTileAt(transColor,i,j,undefined,'mainDraw');
            }
            if(parseInt(layer.getTileAtWorldXY(i,j).index)==edgeColor && parseInt(layer.getTileAtWorldXY(i-1,j).index)==transColor && parseInt(layer.getTileAtWorldXY(i-1,j-1).index)==transColor && parseInt(layer.getTileAtWorldXY(i,j-1).index)==transColor && parseInt(layer.getTileAtWorldXY(i+1,j+1).index)==transColor){
                map.putTileAt(transColor,i,j,undefined,'mainDraw');
            }

        }
    }
}

function checkFillRest() {
//    console.log("ADSLKJSAOIASJDIJASD")
    for (i=3;i<=imageWidth-3;i++)
    {
        for(j=3;j<imageHeight-3;j++){
            if(layer.getTileAtWorldXY(i,j)._isChecked && !(layer.getTileAtWorldXY(i,j+1)._isChecked) && parseInt(layer.getTileAtWorldXY(i,j+1).index)==baseColor)
            {
//                layer.getTileAtWorldXY(i,j+1)._isChecked = true;
//                checkFillCounter++;
            }
            if(layer.getTileAtWorldXY(i,j)._isChecked && parseInt(layer.getTileAtWorldXY(i,j+1).index)==borderColor)
            {
                checkFillCounter=9999999;
            }
        }
    }
}