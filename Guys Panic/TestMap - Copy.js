
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
let cPress;
let qPress;
let wPress;

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


    //plugins
    this.load.plugin('rexquadimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexquadimageplugin.min.js', true);


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
    this.load.image('bullComb','assets/image/enemies/bullComb.png');

    //images
//    this.load.image('backgroundImageBackground','assets/image/testImageBackground.png');
//    this.load.image('backgroundSilhouette','assets/image/testImageMask.png');
//    this.load.image('backgroundImage','assets/image/testImage.png');
//    this.load.image('backgroundSilhouette','assets/image/imageReveal/testVerticalMask.png');
//    this.load.image('backgroundImage','assets/image/imageReveal/testVertical.png');
    this.load.image('backgroundImageBackground','assets/image/imageReveal/testHorizontalBackground.png');
    this.load.image('backgroundSilhouette','assets/image/imageReveal/testHorizontalMask.png');
    this.load.image('backgroundImage','assets/image/imageReveal/testHorizontal.png');

    //gag
    this.load.image('gagImage','assets/image/imageReveal/testHorizontalGag.png');
    this.load.image('gagImageSilhouette','assets/image/imageReveal/testHorizontalGagMask.png');
    this.load.image('gagImageBackground','assets/image/imageReveal/testHorizontalBackgroundGag.png');

//    borderImage.setScrollFactor(0,0);

    //collectibles
    this.load.spritesheet('food','assets/image/food/food.png',{frameWidth: 20, frameHeight: 20});
    this.load.spritesheet('powerups','assets/image/powerup/powerups.png',{frameWidth: 16, frameHeight: 16});

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

    //HUD
    this.load.image('border','assets/image/border/border1.png');
    this.load.spritesheet('healthHUD','assets/image/HUD/healthHUD.png',{frameWidth:36,frameHeight:36});
    this.load.spritesheet('popupText','assets/image/HUD/popupText.png',{frameWidth:127,frameHeight:70});

    
    //preloading particles
    this.load.spritesheet('sparkle','assets/image/particles/sparkle.png',{frameWidth:9,frameHeight:15});
    this.load.spritesheet('cleanSparkle','assets/image/particles/cleanSparkle.png',{frameWidth:9,frameHeight:15});
    this.load.spritesheet('rainbowstar','assets/image/particles/rainbowstar.png',{frameWidth:29,frameHeight:29});
    this.load.spritesheet('glow','assets/image/particles/glow.png',{frameWidth:18,frameHeight:18});
    this.load.spritesheet('glow2','assets/image/particles/glow2.png',{frameWidth:96,frameHeight:96});
    this.load.spritesheet('explosion1','assets/image/particles/explosion1.png',{frameWidth:20,frameHeight:20});
    this.load.spritesheet('explosion3','assets/image/particles/explosion3.png',{frameWidth:40,frameHeight:44});
    this.load.spritesheet('musicNotes','assets/image/particles/music notes.png',{frameWidth:16,frameHeight:20});
    this.load.image('rubble','assets/image/particles/rubble.png');
    this.load.spritesheet('gagBlitter','assets/image/particles/gagBlitter.png',{frameWidth:48,frameHeight:48});

    
}

var silhouetteMatrix = []
var gagSilhouetteMatrix = []
var totalSilhouette;
var gagTotalSilhouette;
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
var rubbleEmitter;
var glowSprite;

var silhouetteHue;
var silhouetteHueValue;

var enemyArray = [];
var totalBlobs=0;
var totalBlobsMax = 6;

var cam;
var UICam;


//change this whenver u wanna add the roulette thingy
var boxRoulette = true;
var boxTimer = 0;

//var hideHealth;


//this.addScore;

var gagBlitter

function create ()
{


    //blitter
    gagBlitter = this.add.blitter(0, 0, 'gagBlitter');
    gagBlitter.setDepth(2)

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

    imageBackground = this.add.image(0,0,'backgroundImageBackground').setOrigin(0,0);
    silhImageBackground = this.add.image(0,0,'gagImageBackground').setOrigin(0,0).setVisible(false);

    imageBackground.depth = -1;
    silhImageBackground.depth = -1;


    imageSilh = this.add.image(0,0,'backgroundSilhouette').setOrigin(0,0);
    gagImageSilh = this.add.image(0,0,'gagImageSilhouette').setOrigin(0,0).setVisible(false);


    totalSilhouette = 0;

    gagTotalSilhouette = 0;

    console.log("Width: " + imageWidth);
    console.log("Height: " + imageHeight)


    //manually make the data matrices for each image if performance becomes an issue
    var pixel = new Phaser.Display.Color();
    
    silhouetteMatrix = [...Array(imageHeight)].map(e => Array(imageWidth).fill(0));

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



    gagSilhouetteMatrix = [...Array(imageHeight)].map(e => Array(imageWidth).fill(0));

    for (i=borderWidth+1;i<imageWidth-borderWidth;i++){
        for (j=borderWidth+1;j<imageHeight-borderWidth;j++){
            pixel = this.textures.getPixel(i, j, 'gagImageSilhouette');
            if(pixel.a == 255){
                gagSilhouetteMatrix[j][i] = 1;
                gagTotalSilhouette++;
                
            }
        }
    }

    gagSilhouetteHue = gagImageSilh.postFX.addColorMatrix();


    const tween = this.tweens.addCounter({
        from: 0,
        to: 360,
        duration: 10000,
        loop: -1,
        onUpdate: (tween) => {
            //silhouetteHueValue = tween.getValue();
            if(imageSilh.visible){
                silhouetteHue.hue(tween.getValue());
            }else if(gagImageSilh.visible){
                gagSilhouetteHue.hue(tween.getValue());
            }

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
        key: 'die',
        frames: [{key:'player',frame:8},{key:'player',frame:8}],
        frameRate:4,
    })

    this.anims.create({
        key: 'drawingLeft',
        frames: this.anims.generateFrameNumbers('player',{start:2, end:3}),
        frameRate: 4,
        repeat: -1
    })
    this.anims.create({
        key: 'drawingRight',
        frames: this.anims.generateFrameNumbers('player',{start:4, end:5}),
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
        key: 'jackhammer',
        frames: this.anims.generateFrameNumbers('player',{start:9, end:10}),
        frameRate: 2,
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
        this.anims.create({
            key: 'bullEntrance1',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:18,end:19}),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: 'bullEntrance2',
            frames: [{key:'bullEnemy',frame:21},{key:'bullEnemy',frame:20}],
            frameRate: 8,
            repeat: 1,
        });
        this.anims.create({
            key: 'bullEntrance3',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:22,end:24}),
            frameRate: 12,
        });
        this.anims.create({
            key: 'bullEntrance4',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:25,end:25}),
            frameRate: 12,
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
        player.depth = 5;

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
//        spawnBullBoss();

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
    //C = 67
    keyC = this.input.keyboard.addKey(67);
    //Q = 81
    keyQ = this.input.keyboard.addKey(81);
    //W = 87
    keyW = this.input.keyboard.addKey(87);

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
        key: 'glowAnim2',
        frames: this.anims.generateFrameNumbers('glow2',{start:0, end:10}),
        frameRate: 18,
//        delay: 900,
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

    sparkleEmitter.depth = 3;
    sparkleEmitter2.depth = 3;

    drawSparkles = this.add.particles(0,0,'cleanSparkle',{
        anim: ['cleanSparkle1','cleanSparkle2'],
        speed: {min: 20, max: 30},
        angle: {min: 0, max: 360},
        lifespan: {min: 200, max: 400},
        emitting: false,
        scale: {start: 0.75, end: 0.2, ease: "Quad.easeOut"}
    });

    drawSparkles.depth = 0

    itemSparkles = this.add.particles(0,0,'cleanSparkle',{
        anim: 'cleanSparkle1',
        speedY: 10,
        quantity: 5,
        lifespan: 600,
        emitting: false,
        scale: {start: 1, end: 0, ease: "Quad.easeIn"}
    });

    itemSparkles.addEmitZone({
        type: 'random',
        source: new Phaser.Geom.Circle(0, -2, 12),
    })

    itemSparkles.depth = 1

    rubbleEmitter = this.add.particles(0,0,'rubble',{
        speedX: {min:-30,max:30},
        speedY: {min: -20, max: -80},
        angle: {min: 0, max: 360},
        gravityY: 300,
        lifespan: {min: 200, max: 400},
        quantity: 1,
        emitting: false,
        scale: {start: 0.5, end: 0.1, ease: "Quad.easeOut"}
    });

    rubbleEmitter.addEmitZone({
        type: 'random',
        source: new Phaser.Geom.Rectangle(-6, 0, 12,6),
    })


    rubbleEmitter.depth = 3;

    //    drawSparkles.setDepth(1);

rainbowStarEmitter = this.add.particles(0,0,'rainbowstar',{
    anim: 'rainbowStarAnim',
    speed: 150,
//    gravityY: 800,
//    angle: {start: 240, end: 320, steps: 4},
    angle: {start: 0, end: 360, steps: 5},
    quantity: 5,
    lifespan: 2000,
    emitting: false,
    scale: {
        onEmit: () => 1,
        onUpdate: (p, k, t) => 1 * CubicIn(1 - (t-0.4)/0.6)*(t>0.4)+(t<=0.4)
      },
});

rainbowStarEmitter.addParticleProcessor(spinFaster1);

rainbowStarEmitter2 = this.add.particles(0,0,'rainbowstar',{
    anim: 'rainbowStarAnim',
    speed: 200,
//    gravityY: 1000,
//    angle: {start: 240, end: 320, steps: 5},
    angle: {start: 0, end: 360, steps: 7},
    quantity: 7,
    lifespan: 2000,
    emitting: false,
    scale: {
        onEmit: () => 1,
        onUpdate: (p, k, t) => 1 * CubicIn(1 - (t-0.4)/0.6)*(t>0.4)+(t<=0.4)
      },
});

rainbowStarEmitter2.addParticleProcessor(spinFaster2);


//rainbowStarEmitter.depth = 3;
//rainbowStarEmitter2.depth = 3;

rainbowContainer = this.add.container(0,0)
rainbowContainer2 = this.add.container(0,0)

rainbowContainer.add(rainbowStarEmitter)
rainbowContainer2.add(rainbowStarEmitter2)

rainbowContainer.depth = 3;
rainbowContainer2.depth = 3;


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

    explosionEmitter1.depth = 3;
    explosionEmitter2.depth = 3;
    explosionEmitter3.depth = 3;
    

    //UI
    cam = this.cameras.main;




//    console.log("roundPixels? : " + cam.roundPixels)
healthContainer = this.add.container(screenW/2,28);



for(i=0;i<totalHealth;i+=2){
    var healthSprite = this.add.sprite(-40+(20*i),0,'healthHUD');
    healthArray.push(healthSprite);
    healthContainer.add(healthSprite)
}

healthContainer.y = -60;

healthImage = currentScene.add.image(0,0,'healthHUD').setFrame(0).setVisible(false);


    borderImage = this.add.image(0,0,'border').setOrigin(0,0);
    borderImage.x = -30;
    borderImage.y = -20;
    borderImage.setDepth(3);

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
        UICam.ignore([player,layer,finishedImage, gagFinishedImage]);
        makeReviveGems();
        percPopup();
    }
    cam.ignore([scoreText, scoreTextRight, borderImage,healthContainer,healthImage])
    //this camera should ignore everything but the UI (border, text popups, score)
    //wtf it works
    rouletteRect = currentScene.add.rectangle(0,0,0,0,0xffffff,0.5);
    UICam.ignore(rouletteRect);

    UICam.ignore([map, image, imageSilh, drawTileset, gagImageSilh,
        sparkleEmitter,sparkleEmitter2, rainbowStarEmitter, rainbowStarEmitter2, drawSparkles, itemSparkles, explosionEmitter1, 
        explosionEmitter2,explosionEmitter3, explosionArray,
        glowSprite, enemyArray, imageBackground, silhImageBackground, rubbleEmitter, rainbowContainer, rainbowContainer2]);

    if(showDebug){
        UICam.ignore([debugBoss,debugBoss2])
    }



//cam.addToRenderList(imageSilh);

//this.events.on('prerender', this.preRender, this);

}


function spawnBullBlobs(num = 1){
    for(i=1;i<=num;i++){

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

        UICam.ignore([bullBlobEnemy])

        enemyArray.push(bullBlobEnemy);
        totalBlobs++;
    }

}

var bullComb;

function spawnBullBoss(){



    //bull is 50x70

    var spawnArray = [];

    for(i=30;i<mapArray[0].length-50;i+=8){
        for(j=40;j<mapArray.length-80;j+=8){
            if (map.getTilesWithin(i,j,50,70,undefined, 'mainDraw').filter(tile => parseInt(tile.index) == edgeColor).length == 0
        && map.getTilesWithin(i,j,50,70,undefined, 'mainDraw').filter(tile => parseInt(tile.index) == transColor).length == 0){
                spawnArray.push([i,j]);
            }
        }
    }

    bullInitPos = spawnArray[Math.floor(Math.random()*spawnArray.length)];

    var bullSpawnX = bullInitPos[0];
    var bullSpawnY = bullInitPos[1];

    bullEnemy = currentScene.add.sprite(bullSpawnX,bullSpawnY,'bullEnemy').play('bullEntrance1').setAlpha(0)
    bullEnemyTint = currentScene.add.sprite(bullSpawnX,bullSpawnY,'bullEnemy').play('bullEntrance1').setAlpha(0);


    UICam.ignore([bullEnemy,bullEnemyTint]);

    bullIntroTimeline = currentScene.add.timeline([
        {
            at: 0,
            run: () => {

//                bullEnemy.anims.pause();
                bullEnemy._enemyType = "bull";
                bullEnemy._state = "start";
                bullEnemy._dying = 0;
                bullEnemy._isBoss = true;
                bullEnemy._startSwing = false;
                bullEnemy._xVel = (Math.floor(Math.random())*2-1)/4;
                bullEnemy._yVel = (Math.floor(Math.random())*2-1)/4;
                bullEnemy._swingDir = -1;
                bullEnemy._singTimer = 0;
                bullEnemy._blobSpawnTimer = 0;
                bullEnemy._blobSpawnTimerMax = 500;
                bullEnemy._singCooldown = 2000;
                bullEnemy._singRNG = 200;
                bullEnemy.depth = 1;

                bullEnemyTint.x = bullEnemy.x;
                bullEnemyTint.y = bullEnemy.y;
                bullEnemyTint.depth = 2;
                bullEnemyTint.setTintFill(0x000000);
//                bullEnemy.setAlpha(0);
//                bullEnemyTint.setAlpha(0);

            
                enemyArray.push(bullEnemy);
            },
            tween: {
                targets: [bullEnemyTint],
                alpha: 1,
                duration: 1300,
            }

        },
        {
            //maybe have it be a sharp spotlight entrance with sparkles instead of a fade from black
            from: 1500,
            run: () => {
                bullEnemyTint.setTintFill(0xffffff)
                bullEnemy.setAlpha(1);
            },
            tween: {
                targets: bullEnemyTint,
                alpha: 0,
                duration: 200,
                delay: 100,
                ease: 'Cubic.easeIn',
            }
        },
        {
            from: 1500,
            run: () => {
                bullEnemyTint.destroy();
                bullEnemy.anims.play('bullEntrance2')
                spawnBullBlobs(3);
            }
        },
        {
            from: 1300,
            run: () => {
                bullEnemy.anims.play('bullEntrance3');
                var throwComb = currentScene.time.delayedCall(100, () =>
                    {
                        bullComb = currentScene.add.sprite(bullEnemy.x-45,bullEnemy.y-20,'bullComb');
                        bullComb._yVel = 3;
                        bullComb._hasHit = false;
                        UICam.ignore([bullComb])
                
                    });
            }
        },
        {
            from: 800,
            run: () => {
                bullEnemy.anims.play('bullEntrance4');
            }
        },
        {
            from: 200,
            run: () => {
                bullEnemy._state = "move"
            }
        }
    ]).play(true);


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

var origLayer;

function spawnPlayer(){

    mapArray = [...Array(imageHeight)].map(e => Array(imageWidth).fill(0));
    
    for (i=0;i<imageWidth;i++){
        for (j=0;j<imageHeight;j++){
            if(i >= initSquareX+1 && i <= (initSquareW)-1 && j >= initSquareY+1 && j <= (initSquareH)-1){
                mapArray[j][i] = transColor;
            }else if(i<borderWidth || j<borderWidth || i>imageWidth-borderWidth || j>imageHeight-borderWidth){
                mapArray[j][i] = borderColor;
            }else if(i >= initSquareX && i <= (initSquareW) && j >= initSquareY && j <= (initSquareH)){
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

//    console.log(mapArray);
    var initPos = edgeArray[Math.floor(Math.random()*edgeArray.length)]
//    console.log(initPos)
    var initX = initPos[1];
    var initY = initPos[0];
    initPixel[0] = initX;
    initPixel[1] = initY;

    console.log(initX)
    console.log(initY)    


    playerAfter1 = currentScene.add.sprite(0,0,'player').setAlpha(0).setOrigin(0.5,1);
    playerAfter1.anims.play('jackhammer');
    playerAfter1.depth = 2;

    playerAfter2 = currentScene.add.sprite(0,0,'player').setAlpha(0).setOrigin(0.5,1);
    playerAfter2.anims.play('jackhammer');
    playerAfter2.depth = 2;

    playerAfter3 = currentScene.add.sprite(0,0,'player').setAlpha(0).setOrigin(0.5,1);
    playerAfter3.anims.play('jackhammer');
    playerAfter3.depth = 2;


    player = currentScene.add.sprite(initX,initY,'player');
    player.depth = 2;
    player.setVisible(false)
//    player.setAlpha(0);


    layer = map.createBlankLayer('mainDraw',drawTileset);
    layer.putTilesAt(mapArray,0,0,imageWidth,imageHeight);


    finishedImage = currentScene.add.image(0,0,'backgroundImage').setOrigin(0,0);
    gagFinishedImage = currentScene.add.image(0,0,'gagImage').setOrigin(0,0).setVisible(false);

    revealImage();
    //this is where you uhhhhhh spawn the boss
    spawnBullBoss();
    percPopup();
    makeReviveGems();
    cam.pan(initX,initY,1500,'Power2')

    
    UICam.ignore([player,layer,finishedImage, gagFinishedImage, playerAfter1, playerAfter2,playerAfter3]);



    const reviveTween12 = currentScene.tweens.addCounter({

        from: startReviveLength,
        to: startReviveLength*lengthStop1,
        duration: 3*reviveDurationMax/5,
        ease: "Sine.easeOut",
        onStart: () =>{
            currentScene.time.delayedCall(400, () => {
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
//            console.log("AM I EVEN PLAYING")
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
//            glowSprite.x = player.x;
//            glowSprite.y = player.y;
//            glowSprite.setVisible(true);
//            glowSprite.play({key: 'glowAnim'});
            glowShine();
            isMoving = false;
            cam.startFollow(player,true,0.1,0.1);
            for (i=0;i<numReviveGems;i++){
                reviveGems[i].destroy();
            }
            reviveGems = [];
        }
    }).pause();


    currentScene.time.delayedCall(1500, () =>
        {
            playerState = "revive";
            reviveDuration = 0;        
            reviveTween12.play();
        });

}

var initSquareX;
var initSquareY;
var initSquareW;
var initSquareH;

function moveRight(){
    while(((parseInt(layer.getTileAtWorldXY(player.x+moveDist+1,player.y).index) == drawColor && (aPress || isErasing))
        || (parseInt(layer.getTileAtWorldXY(player.x+moveDist+1,player.y).index) == baseColor 
        && parseInt(layer.getTileAtWorldXY(player.x+moveDist+2,player.y).index) != drawColor && aPress)
        || parseInt(layer.getTileAtWorldXY(player.x+moveDist+1,player.y).index) == edgeColor) && moveDist < speed){
            moveDist++;
        }
        player.x += moveDist;
        if(aPress){
            if(parseInt(layer.getTileAtWorldXY(player.x,player.y).index) == baseColor){
                for(i=oldPosX+1;i<=player.x;i++){
                    if(parseInt(layer.getTileAtWorldXY(i,oldPosY).index) == baseColor){
                        map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                        if(startBaseColor.length == 0 && parseInt(layer.getTileAtWorldXY(i-1,oldPosY).index) == edgeColor){
                            startBaseColor = [i-1,oldPosY];
                            initPixel = startBaseColor
                        }
                    }
                }    
            }else if(parseInt(layer.getTileAtWorldXY(player.x-1,player.y).index) == drawColor){
                for(i=oldPosX;i<=player.x-1;i++){
                    if(parseInt(layer.getTileAtWorldXY(i,oldPosY).index) == drawColor){
                        map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                    }
                }    
            }else if(parseInt(layer.getTileAtWorldXY(player.x,player.y).index) == edgeColor && tileIndexC == drawColor){
                for(i=oldPosX+1;i<=player.x-1;i++){
                    if(parseInt(layer.getTileAtWorldXY(i,oldPosY).index) == baseColor){
                        map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                    }else if(parseInt(layer.getTileAtWorldXY(i,oldPosY).index) == edgeColor){
                        player.x--;
                    }
                }
                fillTiles();
            }
                
        }else if(isErasing){
            for(i=oldPosX;i<=player.x-1;i++){
                if(parseInt(layer.getTileAtWorldXY(i,oldPosY).index) == drawColor){
                    map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                }
            }    

        }

}

var isErasing;

var startBaseColor = [];

function moveLeft(){

//    moveDist = 0;

    while(((parseInt(layer.getTileAtWorldXY(player.x-moveDist-1,player.y).index) == drawColor && (aPress || isErasing))
        || (parseInt(layer.getTileAtWorldXY(player.x-moveDist-1,player.y).index) == baseColor && 
        parseInt(layer.getTileAtWorldXY(player.x-moveDist-2,player.y).index) != drawColor && aPress)
        || parseInt(layer.getTileAtWorldXY(player.x-moveDist-1,player.y).index) == edgeColor) && moveDist < speed){
            moveDist++;
        }
        player.x -= moveDist;
        if(aPress){
            if(parseInt(layer.getTileAtWorldXY(player.x,player.y).index) == baseColor){
                for(i=player.x;i<=oldPosX-1;i++){
                    if(parseInt(layer.getTileAtWorldXY(i,oldPosY).index) == baseColor){
                        map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                        if(startBaseColor.length == 0 && parseInt(layer.getTileAtWorldXY(i+1,oldPosY).index) == edgeColor){
                            startBaseColor = [i+1,oldPosY];
                            initPixel = startBaseColor
                        }
                    }
                }
            }else if(parseInt(layer.getTileAtWorldXY(player.x+1,player.y).index) == drawColor){
                for(i=player.x+1;i<=oldPosX;i++){
                    if(parseInt(layer.getTileAtWorldXY(i,oldPosY).index) == drawColor){
                        map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                    }
                }    
            }else if(parseInt(layer.getTileAtWorldXY(player.x,player.y).index) == edgeColor && tileIndexC == drawColor){
                for(i=player.x+1;i<=oldPosX-1;i++){
                    if(parseInt(layer.getTileAtWorldXY(i,oldPosY).index) == baseColor){
                        map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                    }else if(parseInt(layer.getTileAtWorldXY(i,oldPosY).index) == edgeColor){
                        player.x++;
                    }
                }    
                fillTiles();
            }
                
        }else if(isErasing){
            for(i=player.x+1;i<=oldPosX;i++){
                if(parseInt(layer.getTileAtWorldXY(i,oldPosY).index) == drawColor){
                    map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                }
            }    

        }

}


function moveUp(){
    while(((parseInt(layer.getTileAtWorldXY(player.x,player.y-moveDist-1).index) == drawColor && (aPress || isErasing))
        || (parseInt(layer.getTileAtWorldXY(player.x,player.y-moveDist-1).index) == baseColor && 
        parseInt(layer.getTileAtWorldXY(player.x,player.y-moveDist-2).index) != drawColor && aPress)
        || parseInt(layer.getTileAtWorldXY(player.x,player.y-moveDist-1).index) == edgeColor) && moveDist < speed){
            moveDist++;
        }
        player.y -= moveDist;
        if(aPress){
            if(parseInt(layer.getTileAtWorldXY(player.x,player.y).index) == baseColor){
                for(i=player.y;i<=oldPosY-1;i++){
                    if(parseInt(layer.getTileAtWorldXY(oldPosX,i).index) == baseColor){
                        map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                        if(startBaseColor.length == 0 && parseInt(layer.getTileAtWorldXY(oldPosX,i+1).index) == edgeColor){
                            startBaseColor = [oldPosX,i+1];
                            initPixel = startBaseColor;
                        }
                    }
                }    
            }else if(parseInt(layer.getTileAtWorldXY(player.x,player.y+1).index) == drawColor){
                for(i=player.y+1;i<=oldPosY;i++){
                    if(parseInt(layer.getTileAtWorldXY(oldPosX,i).index) == drawColor){
                        map.putTileAt(baseColor,oldPosX,i,undefined,'mainDraw');
                    }
                }    
            }else if(parseInt(layer.getTileAtWorldXY(player.x,player.y).index) == edgeColor && tileIndexC == drawColor){
                for(i=player.y+1;i<=oldPosY-1;i++){
                    if(parseInt(layer.getTileAtWorldXY(oldPosX,i).index) == baseColor){
                        map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                    }else if(parseInt(layer.getTileAtWorldXY(oldPosX,i).index) == edgeColor){
                        player.y++;
                    }
                }    
                fillTiles();
            }
                
        }else if(isErasing){
            for(i=player.y+1;i<=oldPosY;i++){
                if(parseInt(layer.getTileAtWorldXY(oldPosX,i).index) == drawColor){
                    map.putTileAt(baseColor,oldPosX,i,undefined,'mainDraw');
                }
            }    

        }

}


function moveDown(){
    while(((parseInt(layer.getTileAtWorldXY(player.x,player.y+moveDist+1).index) == drawColor && (aPress || isErasing))
        || (parseInt(layer.getTileAtWorldXY(player.x,player.y+moveDist+1).index) == baseColor && 
        parseInt(layer.getTileAtWorldXY(player.x,player.y+moveDist+2).index) != drawColor && aPress)
        || parseInt(layer.getTileAtWorldXY(player.x,player.y+moveDist+1).index) == edgeColor) && moveDist < speed){
            moveDist++;
        }
        player.y += moveDist;
        if(aPress){
            if(parseInt(layer.getTileAtWorldXY(player.x,player.y).index) == baseColor){
                for(i=oldPosY+1;i<=player.y;i++){
                    if(parseInt(layer.getTileAtWorldXY(oldPosX,i).index) == baseColor){
                        map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
//                        console.log(parseInt(layer.getTileAtWorldXY(oldPosX,i-1).index) == edgeColor)
                        //console.log(startBaseColor);
                        if(startBaseColor.length == 0 && parseInt(layer.getTileAtWorldXY(oldPosX,i-1).index) == edgeColor){
                            startBaseColor = [oldPosX,i-1];
                            initPixel = startBaseColor;
//                            console.log("initPixel: " + initPixel);
                        }
                    }
                }    
            }else if(parseInt(layer.getTileAtWorldXY(player.x,player.y-1).index) == drawColor){
                for(i=oldPosY;i<=player.y-1;i++){
                    if(parseInt(layer.getTileAtWorldXY(oldPosX,i).index) == drawColor){
                        map.putTileAt(baseColor,oldPosX,i,undefined,'mainDraw');
                    }
                }    
            }else if(parseInt(layer.getTileAtWorldXY(player.x,player.y).index) == edgeColor && tileIndexC == drawColor){
                for(i=oldPosY+1;i<=player.y-1;i++){
                    if(parseInt(layer.getTileAtWorldXY(oldPosX,i).index) == baseColor){
                        map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                    }else if(parseInt(layer.getTileAtWorldXY(oldPosX,i).index) == edgeColor){
                        player.y--;
                    }
                }    
                fillTiles();
            }
                
        }else if(isErasing){
            for(i=oldPosY;i<=player.y-1;i++){
                if(parseInt(layer.getTileAtWorldXY(oldPosX,i).index) == drawColor){
                    map.putTileAt(baseColor,oldPosX,i,undefined,'mainDraw');
                }
            }    

        }

}

var leftPress;
var rightPress;
var upPress;
var downPress;

var totalHealth = 6;
var currentHealth = totalHealth;
var oldHealth = currentHealth;
var healthContainer;

var gagMode = false;

var totalGagHealth = 3;
var currentGagHealth = totalGagHealth;


var rainbowContainer;
var rainbowContainer2;
var healthImage;
var healthArray=[];


function update ()
{


    
    leftPress = cursors.left.isDown;
    rightPress = cursors.right.isDown;
    upPress = cursors.up.isDown;
    downPress = cursors.down.isDown;
    aPress = keyA.isDown;
    bPress = keyB.isDown;
    cPress = keyC.isDown;
    qPress = keyQ.isDown;
    wPress = keyW.isDown;
    spacePress = keySpace.isDown;


    if(bullComb != null){
        if(bullComb.x > borderWidth + cam.scrollX && !bullComb._hasHit){
            bullComb.x-=20;
        }else if(bullComb.x < borderWidth + cam.scrollX && !bullComb._hasHit){
            sfxExplosion5.play();
            addSparkles(4,bullComb.x + cam.scrollX,bullComb.y);
            cam.shake(200,0.03);
            UICam.shake(200,0.03);
            bullComb.x += 25;
            bullComb._hasHit = true
        }else{
            if(Math.abs(bullComb._yVel > 1)){
                bullComb.x -= 0.8;
                bullComb.angle += 30;
                bullComb._yVel -= 0.1;
            }else if(bullComb._yVel > -10){
//                bullComb.angle += 60;
                bullComb._yVel -= 0.3;
            }
            bullComb.x += 1.2;
            bullComb.y -= bullComb._yVel;
            bullComb.angle += 30;
            if(bullComb.y > imageHeight){
                bullComb.destroy();
            }
        }

    }

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

        }else if(boxTimer == 0 || boxTimer == 20 || (boxTimer > 40 && boxTimer%3 == 0)){
//            if(boxTimer%10 == 0){
                    sfxRoulette.play();

                    //change it so it starts at center o fmap
            
                initSquareX = Math.floor(((imageWidth/4) + Math.random()*(imageWidth/4))/2)*2;
                initSquareY =  Math.floor(((imageHeight/4) + Math.random()*(imageHeight/4))/2)*2;
                initSquareW = Math.floor(((imageWidth/4) + Math.random()*(imageWidth/4))*1.3/2)*2;
                initSquareH = Math.floor(((imageHeight/4) + Math.random()*(imageHeight/4))*1.3/2)*2;
            

                if (initSquareW < initSquareX + 8){
                    initSquareW = initSquareX + 8;
                }

                if (initSquareH < initSquareY + 8){
                    initSquareH = initSquareY + 8;
                }

    
                rouletteRect.x = initSquareX;
                rouletteRect.y = initSquareY;
                rouletteRect.width = initSquareW - initSquareX;
                rouletteRect.height = initSquareH - initSquareY;
    
//            }
        }

        if(boxTimer==0){
            cam.pan(imageWidth/2,imageHeight/2,600,'Power3')
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
        oldHealth = currentHealth;

        moveDist = 0;
        fillArray = [];


        if(qPress){
            decreaseHealth();
        }
        if(wPress){
            increaseHealth();
        }


        if(player.x < imageWidth && player.x > 0 && player.y > 0 && player.y < imageHeight){

            tileIndexC = parseInt(layer.getTileAtWorldXY(player.x,player.y).index);
            tileIndexL = parseInt(layer.getTileAtWorldXY(player.x-1,player.y).index);
            tileIndexR = parseInt(layer.getTileAtWorldXY(player.x+1,player.y).index);
            tileIndexU = parseInt(layer.getTileAtWorldXY(player.x,player.y-1).index);
            tileIndexD = parseInt(layer.getTileAtWorldXY(player.x,player.y+1).index);
            

            if(aPress){
                isErasing = false;
                startBaseColor = [];
            }
            
            if (!upPress && !downPress){
                if (rightPress && !leftPress){
                    //right
                    if(tileIndexR == edgeColor){
                        moveRight();
                    }else if(tileIndexU == edgeColor && parseInt(layer.getTileAtWorldXY(player.x,player.y-3).index) != edgeColor 
                    && parseInt(layer.getTileAtWorldXY(player.x+2,player.y-2).index) == edgeColor && !aPress){
                        moveUp();
                    }else if(tileIndexD == edgeColor && parseInt(layer.getTileAtWorldXY(player.x,player.y+3).index) != edgeColor 
                    && parseInt(layer.getTileAtWorldXY(player.x+2,player.y+2).index) == edgeColor && !aPress){
                        moveDown();
                    }else{
                        moveRight();
                    }
                }else if(leftPress && !rightPress){
                    //left
                    if(tileIndexL == edgeColor){
                        moveLeft();
                    }else if(tileIndexU == edgeColor && parseInt(layer.getTileAtWorldXY(player.x,player.y-3).index) != edgeColor 
                    && parseInt(layer.getTileAtWorldXY(player.x-2,player.y-2).index) == edgeColor && !aPress){
                        moveUp();
                    }else if(tileIndexD == edgeColor && parseInt(layer.getTileAtWorldXY(player.x,player.y+3).index) != edgeColor 
                    && parseInt(layer.getTileAtWorldXY(player.x-2,player.y+2).index) == edgeColor && !aPress){
                        moveDown();
                    }else{
                        moveLeft();
                    }
                }
            }else{ //diagonals
                if(upPress && !downPress){
                    if(rightPress && !leftPress){
                        //up right

                            if(aPress){
                                if((tileIndexR == baseColor 
                                && (tileIndexD == drawColor || tileIndexU == drawColor || tileIndexU == edgeColor))
                                    || tileIndexU == transColor || tileIndexU == borderColor){
                                    moveRight();
                                }else if((tileIndexU == baseColor 
                                && (tileIndexL == drawColor || tileIndexR == drawColor || tileIndexR == edgeColor)) 
                                    || tileIndexR == transColor || tileIndexR == borderColor){
                                    moveUp();
                                }else if(tileIndexC == edgeColor && tileIndexU == baseColor && tileIndexR == baseColor){
                                    moveUp();
                                }
                            }else{
                                if(tileIndexR == edgeColor){
                                    moveRight();
                                }else if(tileIndexU == edgeColor){
                                    moveUp();
                                }
                            }

                    }else if(leftPress && !rightPress){
                        //up left

                        
                        if(aPress){
                            if((tileIndexL == baseColor 
                            && (tileIndexD == drawColor || tileIndexU == drawColor || tileIndexU == edgeColor))
                                || tileIndexU == transColor || tileIndexU == borderColor){
                                moveLeft();
                            }else if((tileIndexU == baseColor 
                            && (tileIndexR == drawColor || tileIndexL == drawColor || tileIndexL == edgeColor)) 
                                || tileIndexL == transColor || tileIndexL == borderColor){
                                moveUp();
                            }else if(tileIndexC == edgeColor && tileIndexU == baseColor && tileIndexL == baseColor){
                                moveUp();
                            }
                        }else{
                            if(tileIndexL == edgeColor){
                                moveLeft();
                            }else if(tileIndexU == edgeColor){
                                moveUp();
                            }
                        }


                    }
                }else if(!upPress && downPress){
                    if(rightPress && !leftPress){
                        //down right

                        if(aPress){
                            if((tileIndexR == baseColor 
                            && (tileIndexU == drawColor || tileIndexD == drawColor || tileIndexD == edgeColor))
                                || tileIndexD == transColor || tileIndexD == borderColor){
                                moveRight();
                            }else if((tileIndexD == baseColor 
                            && (tileIndexL == drawColor || tileIndexR == drawColor || tileIndexR == edgeColor)) 
                                || tileIndexR == transColor || tileIndexR == borderColor){
                                moveDown();
                            }else if(tileIndexC == edgeColor && tileIndexD == baseColor && tileIndexR == baseColor){
                                moveDown();
                            }
                        }else{
                            if(tileIndexR == edgeColor){
                                moveRight();
                            }else if(tileIndexD == edgeColor){
                                moveDown();
                            }
                        }


                    }else if(leftPress && !rightPress){
                        //down left

                        if(aPress){
                            if((tileIndexL == baseColor 
                            && (tileIndexU == drawColor || tileIndexD == drawColor || tileIndexD == edgeColor))
                                || tileIndexD == transColor || tileIndexD == borderColor){
                                moveLeft();
                            }else if((tileIndexD == baseColor 
                            && (tileIndexR == drawColor || tileIndexL == drawColor || tileIndexL == edgeColor)) 
                                || tileIndexL == transColor || tileIndexL == borderColor){
                                moveDown();
                            }else if(tileIndexC == edgeColor && tileIndexD == baseColor && tileIndexL == baseColor){
                                moveDown();
                            }
                        }else{
                            if(tileIndexL == edgeColor){
                                moveLeft();
                            }else if(tileIndexD == edgeColor){
                                moveDown();
                            }
                        }

                    }
                }
            }
             if (!leftPress && !rightPress){
                if (upPress && !downPress){
                    //up
                    if(tileIndexU == edgeColor){
                        moveUp();
                    }else if(tileIndexL == edgeColor && parseInt(layer.getTileAtWorldXY(player.x-3,player.y).index) != edgeColor 
                    && parseInt(layer.getTileAtWorldXY(player.x-2,player.y-2).index) == edgeColor && !aPress){
                        moveLeft();
                    }else if(tileIndexR == edgeColor && parseInt(layer.getTileAtWorldXY(player.x+3,player.y).index) != edgeColor 
                    && parseInt(layer.getTileAtWorldXY(player.x+2,player.y-2).index) == edgeColor && !aPress){
                        moveRight();
                    }else{
                        moveUp();
                    }
                }else if(downPress && !upPress){
                    //down
                    if(tileIndexD == edgeColor){
                        moveDown();
                    }else if(tileIndexL == edgeColor && parseInt(layer.getTileAtWorldXY(player.x-3,player.y).index) != edgeColor 
                    && parseInt(layer.getTileAtWorldXY(player.x-2,player.y+2).index) == edgeColor && !aPress){
                        moveLeft();
                    }else if(tileIndexR == edgeColor && parseInt(layer.getTileAtWorldXY(player.x+3,player.y).index) != edgeColor 
                    && parseInt(layer.getTileAtWorldXY(player.x+2,player.y+2).index) == edgeColor && !aPress){
                        moveRight();
                    }else{
                        moveDown();
                    }
                }
                
            }


            //erase when not pressing anything
//            if(!leftPress && !rightPress && !upPress && !downPress && !aPress && tileIndexC == drawColor){
            if(!aPress && tileIndexC == drawColor){
                isErasing = true;
                moveDist = 0;
                if(tileIndexL == drawColor){
                    moveLeft();
                }else if(tileIndexR == drawColor){
                    moveRight();
                }else if(tileIndexU == drawColor){
                    moveUp();
                }else if(tileIndexD == drawColor){
                    moveDown();
                }


            }

            //handling states
            if(player._speedUp){
                if(playerState != "SpeedUp"){
                    playerState = "SpeedUp"
                    player.setOrigin(0.5,1);
                    playerAfter1.setAlpha(0.5);
                    playerAfter1.x = player.x;
                    playerAfter1.y = player.y;
                    playerAfter2.setAlpha(0.3);
                    playerAfter2.x = player.x;
                    playerAfter2.y = player.y;
                    playerAfter3.setAlpha(0.5);
                    playerAfter3.x = player.x;
                    playerAfter3.y = player.y;

                }
                if(player._speedTimer > 0){
                    speed = 4;
                    player.angle = (Math.random()*20) - 10;
                    player.setOrigin(0.5,(Math.random()*0.05)+0.9);
                    player._speedTimer--;
                    rubbleEmitter.emitParticleAt(player.x,player.y);

                    playerAfter1.angle = (Math.random()*30) - 15;
                    playerAfter1.setOrigin(0.5,(Math.random()*0.05)+0.95);

                    playerAfter1.x -= (playerAfter1.x-player.x)*0.3;
                    playerAfter1.y -= (playerAfter1.y-player.y)*0.3;


                    playerAfter2.angle = (Math.random()*30) - 15;
                    playerAfter2.setOrigin(0.5,(Math.random()*0.05)+0.95);

                    playerAfter2.x -= (playerAfter2.x-player.x)*0.16;
                    playerAfter2.y -= (playerAfter2.y-player.y)*0.16;


                    playerAfter3.angle = (Math.random()*30) - 15;
                    playerAfter3.setOrigin(0.5,(Math.random()*0.05)+0.95);

                    playerAfter3.x -= (playerAfter3.x-player.x)*0.4;
                    playerAfter3.y -= (playerAfter3.y-player.y)*0.4;
                }else{
                    speed = 2;
                    player._speedUp = false;
                    player.setOrigin(0.5,0.5);
                    player.angle = 0;
                    playerAfter1.setAlpha(0);
                    playerAfter2.setAlpha(0);
                    playerAfter3.setAlpha(0);
//                    playerAfter1.destroy()
                }
                if(tileIndexC == edgeColor){
                    //if(parseInt(layer.getTileAtWorldXY(player.x,player.y).index) == drawColor){
                        //initPixel = [oldPosX,oldPosY];
                        //console.log("initPixel: " + initPixel)
//                        console.log("HELLOOOOOO")
                    //}
                }
            }else if(tileIndexC == edgeColor){
                playerState = "NoDraw";
                //if(parseInt(layer.getTileAtWorldXY(player.x,player.y).index) == drawColor){
                    //initPixel = [oldPosX,oldPosY];
                    //console.log("initPixel: " + initPixel)
                //}
            }else if(tileIndexC == drawColor && aPress){
                playerState = "YesDraw";
                if(rightPress || leftPress || upPress || downPress){
//                    addSparkles(1);
                drawSparkles.emitParticleAt(oldPosX,oldPosY,1);

                }
            }else if(tileIndexC == drawColor && !aPress){
                playerState = "Erase";
            }

        }

        spawnItem();
        
        
        if(percentageRevealed > 80 || cPress){
            console.log('yeah you win!!!!')
            isMoving = true;
            winRound();
        }

    
    }


    updateItem();

    updateAnimation();

    updateEnemy();

    updateKill();

    updateRevive();

    updateHealth();

//    updateCamera();
}
}



function glowShine(xPos = player.x,yPos = player.y,delayT = 56){


    currentScene.time.addEvent({
        delay: delayT,
        callback: () => {
            var glowShineSprite = currentScene.add.sprite(xPos,yPos,'glow2').play('glowAnim2');
            glowShineSprite.setDepth(3);
//            glowShineSprite.scale = 0.6;
            UICam.ignore([glowShineSprite]);
            glowShineSprite.on('animationcomplete', () => {
                glowShineSprite.destroy();
                console.log("DESTROYED SPRITE")
              });
        }
    });

}



var blitterIndex = 0;


function spawnGagBlitter(){
    for(i=-20;i<screenW+30;i+=Phaser.Math.Between(15,30)){
        var bob = gagBlitter.create(i,-60-Math.random()*300,Phaser.Math.Between(0 + 8*gagMode,7 + 8*gagMode),undefined,blitterIndex--)

        bob.setTint(GetRandom(tints))

        currentScene.tweens.add({
            targets: bob,
            y: screenH+29,
            duration: Phaser.Math.Between(1000, 1500),
            ease: 'Cubic.easeIn',
        });



    }



}


function speedupPopup(){

    var textYPos;

    if(player.y > screenH/2){
        textYPos = 80;
    }else{
        textYPos = 200;
    }
    var speedUpText = currentScene.add.rexSkewImage(screenW*1.5,textYPos,'popupText',0);
    speedUpText.depth = 4;
    speedUpText.skewX = 0.8;

    cam.ignore([speedUpText]);


    var speedUpTextTween = currentScene.tweens.chain({
            targets: speedUpText,
            tweens:[
                {
                skewX: 1,
                x: -30+screenW/2,
                duration: 150,
                ease: 'Sine.easeOut',
                },
                {
                    skewX: -0.7,
                    x: 15+screenW/2,
                    duration: 150,
                    ease: 'Sine.easeInOut'
                },
                {
                    skewX: 0,
                    x: screenW/2,
                    duration: 200,
                    ease: 'Sine.easeInOut'
                },
                {
                    delay: 500,
                    skewX: 1.4,
                    x: screenW*-0.5,
                    duration: 600,
                    ease: 'Back.easeIn'
                }
                ]
            });

            speedUpTextTween.setCallback('onComplete',()=>{
                speedUpText.destroy();
            });

}


function zapPopup(){

    var textYPos;

    if(player.y > screenH/2){
        textYPos = 80;
    }else{
        textYPos = 200;
    }
    var speedUpText = currentScene.add.image(screenW/2,textYPos,'popupText',1).setOrigin(0.5,0.25);
    speedUpText.scale = 0;
    speedUpText.depth = 4;
    cam.ignore([speedUpText]);


    var speedUpTextTween = currentScene.tweens.chain({
            targets: speedUpText,
            tweens:[
                {
                    scale: 1,
                    duration: 300,
                    ease: 'Bounce.easeOut',
                },
                {
                    delay: 500,
                    scale: 0,
                    duration: 500,
                    ease: 'Quad.easeIn'
                }
                ]
            });

            speedUpTextTween.setCallback('onComplete',()=>{
                speedUpText.destroy();
            });

}



var firstI;

function decreaseHealth(num = 1){

//    if(!gagMode){
        currentHealth -= num;
//    }

    if(currentHealth < 0){
        currentHealth = 0;
        console.log("YOU DIED")
    }
    console.log("Current health: " + currentHealth)


    firstI = -1;
    delayHealthCall();


//    healthImage = currentScene.add.image(healthContainer.x,healthContainer.y,'healthHUD').setFrame(0);


}

function increaseHealth(num = 1){

    currentHealth += num;
    if(currentHealth > totalHealth){
        currentHealth = totalHealth;
    }
    console.log("Current health: " + currentHealth)

    delayHealthCall();

    if(currentHealth >= 6 && gagMode){
            gagMode = false;
            isMoving = true;

            currentScene.time.addEvent({
                delay: 10,
                repeat: 200,
                callback: () => {
                    spawnGagBlitter();
                }
            });
            currentScene.time.addEvent({
                delay: 3501,
                callback: () => {
                    gagBlitter.clear();
                }
            });
            //delay revive
            currentScene.time.addEvent({
                delay: 4200,
                callback: () => {
                    isMoving = false;
                }
            })

            //change image
            currentScene.time.addEvent({
                delay: 1500,
                callback: () => {
                    //change image here
                    imageBackground.setVisible(true);
                    silhImageBackground.setVisible(false);
                    imageSilh.setVisible(true);
                    gagImageSilh.setVisible(false);
                    finishedImage.setVisible(true);
                    gagFinishedImage.setVisible(false);
                    revealImage();
                    transScoreChange();
                    delayHealthCall();

                    healthChange = true;

                    healthImage.setFrame(0);

//                    currentHealth = 7;

                }
            })


        
    }
}

var healthTimer = 0;

function delayHealthCall(){

//    healthContainer.iterate(function (child){
//        child.setTintFill(0xffffff);
//    });
//    healthContainer.y = 0;
    healthTimer = 200;

}


function updateHealth(){

//0 -> 2 -> 4
//LEFT TO RIGHT
    if(oldHealth != currentHealth){

        var tempHealth = currentHealth;

        if(oldHealth > currentHealth){
            var isLower = true;
        }else{
            var isLower = false;
        }

        
        if(gagImageSilh.visible){
            for(i=0;i<Math.floor(totalHealth/2);i++){
                if(tempHealth > 0){                
                    healthArray[i].setFrame(3);
                    tempHealth-=2;
                }else{
                    healthArray[i].setFrame(4);
                    if(firstI == -1){
                        firstI = i;
                    }
                }
            }    
        }else if(imageSilh.visible){
            for(i=0;i<Math.floor(totalHealth/2);i++){
                if(tempHealth > 1){                
                    healthArray[i].setFrame(0);
                    tempHealth-=2;
                }else if(tempHealth == 1){
                    healthArray[i].setFrame(1);
                    tempHealth--;
                    if(firstI == -1){
                        firstI = i;
                    }
                }else{
                    healthArray[i].setFrame(2);
                    if(firstI == -1){
                        firstI = i;
                    }
                }
            }    
        }



    }



    if(healthTimer >= 200){
        if (player.y > screenH/2){
            healthContainer.y = 30;
            healthContainer._isBelow = false;
        }else{
            healthContainer.y = screenH-30;
            healthContainer._isBelow = true;
        }
        for(i=0;i<healthArray.length;i++){
            healthArray[i].setTintFill(0xffffff);
        }

        if(isLower){
            healthImage.scale = 1;
            healthImage.x = healthArray[firstI].x + healthContainer.x;
            healthImage.y = healthContainer.y;
            healthImage.angle = 0;
            healthImage.setVisible(true);    
        }

        
    }else if(healthTimer < -30){
        if(healthContainer._isBelow){
            healthContainer.y+=2.5;
        }else{
            healthContainer.y-=2.5;
        }
    }

    if(healthTimer == 180){
        for(i=0;i<healthArray.length;i++){
            healthArray[i].clearTint();
        }
    }


    if(healthTimer < 200 && healthTimer > 140 && healthImage.visible == true){
//        console.log("X: " + healthImage.x)
//        console.log("Y: " + healthImage.y)
//        console.log("Angle: " + healthImage.angle);
//        console.log("Visible? : " + healthImage.visible);
//        console.log("Scale: " + healthImage.scale)
//        console.log(healthTimer-140/40
        healthImage.angle += 25;
                if(!healthContainer._isBelow){
                    healthImage.y += 3*(((healthTimer-140)/60)**4);
                }else{
                    healthImage.y -= 3*(((healthTimer-140)/60)**4);
                }
                healthImage.x += 1*(Math.pow((healthTimer-140)/60),1);
                healthImage.scale = 1*(((healthTimer-140)/60)**0.7);
            }else if(healthTimer == 140 && healthImage.visible == true){
//                drawSparkles.emitParticleAt(healthImage.x,healthImage.y,20)
                //addSparkles(15,healthImage.x,healthImage.y);
                sparkleEmitter2.emitParticleAt(healthImage.x+cam.scrollX,healthImage.y+cam.scrollY,10);
//                addExplosions(healthImage.x,healthImage.y,2,0.5)
                healthImage.setVisible(false);
            }

            
    if(healthTimer > -80){
        healthTimer--;
    }


    

}

//var spinFasterDelta = 1;
const spinFaster = {
    active: true,
    update: function (particle, deltaMs, deltaUs) {
      vel.set(particle.velocityX, particle.velocityY);
      vel.scale(Math.pow(0.01, deltaUs));
//      vel.rotate(20*Math.PI/180)
//      vel.rotate(10*Math.PI/180);
//      spinFasterDelta += 1;
//console.log(particle.angle)
  
      particle.velocityX = vel.x;
      particle.velocityY = vel.y;
//      particle.angle = particle.angle*1.04 + 5*Math.PI/180;
//      console.log(particle.angle)
    }
  };
  

const vel = new Phaser.Math.Vector2();

const drag = {
    active: true,
    update: function (particle, deltaMs, deltaUs) {
      vel.set(particle.velocityX, particle.velocityY);
      vel.scale(Math.pow(0.01, 0.016));
  
      particle.velocityX = vel.x;
      particle.velocityY = vel.y;
    }
  };
  
const drag1 = Object.create(drag);
const drag2 = Object.create(drag);
const drag3 = Object.create(drag);

const spinFaster1 = Object.create(spinFaster);
const spinFaster2 = Object.create(spinFaster);

const emitterFireworksConfig = {
    anim: 'cleanSparkle1',
    alpha: {
        onEmit: () => 1,
    //    onUpdate: (p, k, t) => 0.8 * CubicIn(1 - t)
      },
      angle: { min: 0, max: 360 },
//  blendMode: "SCREEN",
  emitting: false,
  frequency: -1,
  gravityY: 128,
  lifespan: { min: 1000, max: 2000 },
  quantity: 100,
  reserve: 100,
//  rotate: 45,
scale: {
    onEmit: () => 1,
    onUpdate: (p, k, t) => 1 * CubicIn(1 - t)
  },
  speed: { onEmit: () => FloatBetween(0, 18) ** 2 }
};

function winRound(){
    if(enemyArray.length > 0){
        for(i=0;i<enemyArray.length;i++){
            enemyArray[i]._state = "die";
        }    
    }

    if(itemArray.length > 0){
        for(i=0;i<itemArray.length;i++){
                itemArray[i].setTintFill(0xffffff);
                itemArray[i].setAlpha(1);
                itemArray[i]._itemDestroy.paused = false;

        }
    }

    player.setAlpha(0);
    playerAfter1.setVisible(false);
    playerAfter2.setVisible(false);
    playerAfter3.setVisible(false);

    scoreText.setVisible(false);
    scoreTextRight.setVisible(false);


    cam.flash(200);

    var fillScreen = [...Array(imageHeight)].map(e => Array(imageWidth).fill(transColor));
    layer.putTilesAt(fillScreen,0,0,imageWidth,imageHeight);
    revealImage();

    console.log("cam scrollX: " + cam.scrollX)

    var biggerHoriz = false;

    if(imageWidth > 320){
        biggerHoriz = true;
        var initialScroll = cam.scrollX*10;
    }else if(imageHeight > 240){
        var initialScroll = cam.scrollY*10;
    }

    var totalPan = biggerHoriz*10*(imageWidth-screenW) + (1-biggerHoriz)*10*(imageHeight-screenH);

    console.log("totalPan: " + totalPan)

    cam.stopFollow();

    var winTimeline = currentScene.add.timeline([
        {
            at: 0,
            run: () => {
                console.log("HII")
                cam.pan(0,0,initialScroll);
            },
        },
        {
            from: initialScroll+1+100,
            run: () => {
                console.log("HII2")
                if(biggerHoriz){
                    cam.pan(imageWidth,0,totalPan);
                }else{
                    cam.pan(0,imageHeight,totalPan);
                }
            },
        },
        {
            from: totalPan+1+100,
            run: () => {
                console.log("HII3")
                cam.pan(0,0,totalPan*2)
            }
        }
    ]);

    winTimeline.play(true);



    var fireworks1 = currentScene.add.particles(0,0,'fireworks',emitterFireworksConfig);
    var fireworks2 = currentScene.add.particles(0,0,'fireworks',emitterFireworksConfig);
    var fireworks3 = currentScene.add.particles(0,0,'fireworks',emitterFireworksConfig);

    fireworks1.addParticleProcessor(drag1);
    fireworks2.addParticleProcessor(drag2);
    fireworks3.addParticleProcessor(drag3);


    cam.ignore([fireworks1,fireworks2,fireworks3]);
  
    currentScene.time.addEvent({
        delay: 1000,
        startAt: Between(0, 1000),
        repeat: -1,
        callback: () => {
          updateEmitter(fireworks1);
        }
      });
    
      currentScene.time.addEvent({
        delay: 2000,
        startAt: Between(0, 2000),
        repeat: -1,
        callback: () => {
          updateEmitter(fireworks2);
        }
      });
    
      currentScene.time.addEvent({
        delay: 3000,
        startAt: Between(0, 3000),
        repeat: -1,
        callback: () => {
          updateEmitter(fireworks3);
        }
      });
    

      var winScoreText = currentScene.add.bitmapText(screenW/2,screenH/2-10,'score','').setOrigin(0.25,0.5);
      winScoreText.text = `${Math.floor(percentageRevealed)}%`;
      winScoreText.fontSize = 0;

      currentScene.tweens.add({
        targets: winScoreText,
        fontSize: 64,
        ease: 'power4'
      });

      cam.ignore([winScoreText])

}

//oh god this is cancerous

const aqua = 0x7fdbff;
//const black = 0x111111;
//const blue = 0x0074d9;
const fuchsia = 0xf012be;
//const green = 0x2ecc40;
const lime = 0x01ff70;
//const maroon = 0x85144b;
//const navy = 0x001f3f;
//const olive = 0x3d9970;
const orange = 0xff851b;
const purple = 0xb10dc9;
const red = 0xff4136;
//const teal = 0x39cccc;
//const white = 0xffffff;
const yellow = 0xffdc00;

//const tints = [red, orange, yellow, lime, green, teal, aqua, blue, fuchsia];
const tints = [red, orange, yellow, lime, aqua, fuchsia];

const { Between, FloatBetween } = Phaser.Math;

const CubicIn = Phaser.Math.Easing.Cubic.In;

const { GetRandom } = Phaser.Utils.Array;

const itemTypes = ["speed","zap","slow","stop"];

function updateEmitter(emitter) {
    emitter.particleX = screenW * FloatBetween(0.2, 0.8);
    emitter.particleY = screenH * FloatBetween(0.2, 0.6);
    emitter.setParticleTint(GetRandom(tints));
    emitter.explode();
  }
  
var spawnItemRNG = 50;
var foodRNG = 50; // (1/foodRNG) of occurring
var foodSpecialRNG = 10; //1/10th out of all the food rngs, can be varied as player dies more?
var powerRNG = 50;
var itemArray = []
var itemSelection = [];

function spawnItem(){
    if (Math.floor(Math.random()*spawnItemRNG)==0){

        var itemX = Math.floor(Math.random()*(imageWidth - 60)) + 30;
        var itemY = Math.floor(Math.random()*(imageHeight - 60)) + 30;

        while(map.getTilesWithin(itemX-15,itemY-15,30,30,undefined, 'mainDraw').filter(tile => parseInt(tile.index) == edgeColor).length != 0
        || parseInt(layer.getTileAtWorldXY(itemX,itemY).index) != baseColor){
            itemX = Math.floor(Math.random()*(imageWidth - 60)) + 30;
            itemY = Math.floor(Math.random()*(imageHeight - 60)) + 30;
        }



        if(Phaser.Math.Between(0,foodRNG+powerRNG) < foodRNG){
            //add additional rng spawn for the special foods?
            var itemIndex = Phaser.Math.Between(0,2);
            var item = currentScene.add.image(itemX,itemY,'food',itemIndex);
            item._type = "food"
        }else{
            var itemType = Phaser.Math.Between(0,3)
            var itemIndex = itemType;
            var item = currentScene.add.image(itemX,itemY,'powerups',itemIndex);
            item._type = itemTypes[itemType];
        }
            item._index = itemIndex; //in case each item does somethig different
            item._shineTimer = 290;
            item._lifeSpan = 0;
            UICam.ignore([item])
            itemArray.push(item);

            item._itemDestroy = currentScene.time.delayedCall(350, () =>
                {
                    addSparkles(10,item.x,item.y);
                    item.destroy();
                    itemArray.splice(itemArray.indexOf(item),1);
                });
            item._itemDestroy.paused = true;

            itemSparkles.emitParticleAt(itemX,itemY);
    }
}

function updateItem(){
    if(itemArray != []){

        for(i=0;i<itemArray.length;i++){
            if(itemArray[i]._itemDestroy.paused){
                if(itemArray[i]._shineTimer > 305){
                    itemArray[i].clearTint();
                    itemArray[i]._shineTimer = 0;
                }else if(itemArray[i]._shineTimer == 300 || itemArray[i]._shineTimer == 290){
                    itemArray[i].setTintFill(scoreTint)
                }else if(itemArray[i]._shineTimer == 295){
                    itemArray[i].clearTint();
                }

                itemArray[i]._shineTimer++;
                itemArray[i]._lifeSpan++;
                if(itemArray[i]._lifeSpan >= 600){
                    itemArray[i].destroy();
                    itemArray.splice(i,1);
                }else if(itemArray[i]._lifeSpan > 500){
                    if(itemArray[i]._lifeSpan%2 == 0){
                        itemArray[i].setAlpha(Math.abs(itemArray[i].alpha-1));
                    }
                }

            }

        }
    }
}




var reviveGems = [];
var numReviveGems = 8;
//degrees, not rads
var startAngularVel = 0;
var endAngularVel = 2;
var reviveDuration = 0; //set to 0 every death
var reviveDurationMax = 1800;
var startReviveLength = screenW*4;
var endReviveLength = 1

function makeReviveGems(){
    for(i=0;i<numReviveGems;i++){
        var currentAngle = (i*360/numReviveGems);
        var reviveGem = currentScene.add.sprite(initPixel[0] + startReviveLength*Math.cos(currentAngle*Math.PI/180),initPixel[1] + startReviveLength*Math.sin(currentAngle*Math.PI/180),'rainbowstar');
        reviveGem.scale = 3.5
        reviveGem._currentAngle = currentAngle;
        reviveGem.play('rainbowStarAnim')
//        if(i%2==0){
//            reviveGem.play('sparkleShine',true)
//        }else{
//            reviveGem.play('sparkleShine2',true)
//        }

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

                if(endAngularVel < startAngularVel){
                    endAngularVel = startAngularVel
                }
                reviveGems[i]._currentAngle += endAngularVel;
                endAngularVel*=1.025;
                reviveGems[i].scale *= 0.95



            }else{

                    reviveGems[i]._currentAngle += startAngularVel;
                    startAngularVel = 0.002 + startAngularVel*1.003;
                    if(reviveDuration < (reviveDurationMax*1.08/40) && reviveDuration > reviveDurationMax*.98/40){
                        reviveGems[i].scale *= 0.7
//                        console.log("ASOIDJASOIJSDIOJOS")
                    }
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

var gagRevive = false;

function killPlayer(enemyX,enemyY){
    isKillPlayer = true;
    enemyKillXY[0] = enemyX;
    enemyKillXY[1] = enemyY;
    cam.stopFollow();
    cam.pan(enemyX,enemyY,750,'Power2')
    makeReviveGems()
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

            decreaseHealth(2);

            //replace with some kind of slash animation
            addSparkles(undefined,enemyKillXY[0],enemyKillXY[1])
            cam.flash(100);
            //explosionEmitter3.emitParticleAt(enemyKillXY[0],enemyKillXY[1]);
//            sfxExplosion3.play();
            freezeFrame = true;
            isMoving = true;
            isPixelExploding = true;

            player.anims.play('die');
            // for(i=0;i<imageWidth;i++){
            //     for(j=0;j<imageHeight;j++){
            //         if(parseInt(layer.getTileAtWorldXY(i,j).index) == drawColor)
            //             layer.getTileAtWorldXY(i,j)._toExplode = true;
            //     }
            // }
            reviveDuration = 0;
            endAngularVel = 2;
            startAngularVel = 0;
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
            addExplosions(explodePixelX,explodePixelY,undefined,3)
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
//            glowSprite.x = player.x;
//            glowSprite.y = player.y;
//            glowSprite.setVisible(true);
//            glowSprite.play({key: 'glowAnim'});
            glowShine(undefined,undefined,1000);
            playerAfter1.setAlpha(0);
            playerAfter2.setAlpha(0);
            playerAfter3.setAlpha(0);
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
            if(respawnTime == respawnTimeMax-1){
                if(currentHealth <= 2 && !gagMode){
                    gagMode = true;
                    gagRevive = true;
                    currentHealth = 2;
                    currentScene.time.addEvent({
                        delay: 10,
                        repeat: 200,
                        callback: () => {
                            spawnGagBlitter();
                        }
                    });
                    currentScene.time.addEvent({
                        delay: 3501,
                        callback: () => {
                            gagBlitter.clear();
                        }
                    });
                    //delay revive
                    currentScene.time.addEvent({
                        delay: 4200,
                        callback: () => {
                            gagRevive = false;
                        }
                    })

                    //change image
                    currentScene.time.addEvent({
                        delay: 1500,
                        callback: () => {
                            //change image here
                            imageBackground.setVisible(false);
                            silhImageBackground.setVisible(true);
                            imageSilh.setVisible(false);
                            gagImageSilh.setVisible(true);
                            finishedImage.setVisible(false);
                            gagFinishedImage.setVisible(true);
                            revealImage();
                            transScoreChange();
                            delayHealthCall();

                            healthImage.setFrame(3);

                            healthArray[0].setFrame(3)


                        }
                    })


                }
                
            }

//            if(respawnTime == 25){
//                decreaseHealth(2);
//            }
        }else if(!gagRevive){
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
//                    glowSprite.x = player.x;
//                    glowSprite.y = player.y;
//                    glowSprite.setVisible(true);
//                    glowSprite.play({key: 'glowAnim'});
                    glowShine();
                    isMoving = false;
                    speed = 2;
                    player._speedUp = false;
                    player.setOrigin(0.5,0.5);
                    player.angle = 0;
                    cam.startFollow(player,true,0.1,0.1);
                    for (i=0;i<numReviveGems;i++){
//                        reviveGems[i].setVisible(false);
//                        reviveGems[i].scale = 3.5;
                        reviveGems[i].destroy();
                    }
                    reviveGems = [];
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
//                    console.log("bouncing right!")
                }else if(bossRight.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0 && enemy._xVel > 0){
                    enemy._xVel *= -1;
//                    console.log("bouncing left!")
                }else if(bossUp.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0 && enemy._yVel < 0){
                    enemy._yVel *= -1;
//                    console.log("bouncing down!")
                }else if(bossDown.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length != 0   && enemy._yVel > 0){
                    enemy._yVel *= -1;
 //                   console.log("bouncing up!")
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

                //blob spawn mechanism
                //maybe spawnrate changes with difficulty
                if(totalBlobs < totalBlobsMax){
                    if(enemy._blobSpawnTimer > enemy._blobSpawnTimerMax){
                        spawnBullBlobs();
                        console.log("spawning blob!")
                        enemy._blobSpawnTimer = 0;
                    }else{
                        enemy._blobSpawnTimer++;
                    }    
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
                        noteEnemy._noDie = true;
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

//                if(enemy._enemyTileIndexL.filter(tile => parseInt(tile.index) == transColor).length != 0 && enemy._enemyTileIndexR.filter(tile => parseInt(tile.index) == transColor).length != 0
//                 && enemy._enemyTileIndexU.filter(tile => parseInt(tile.index) == transColor).length != 0 && enemy._enemyTileIndexD.filter(tile => parseInt(tile.index) == transColor).length != 0){
//                    enemy._state = "die";
//                    totalBlobs--;
//                }


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
                        noteEnemy._noDie = true;
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

            if(enemy._state == "laugh" && !currentScene.anims.paused){
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

                enemy._hitLine = new Phaser.Geom.Line(enemy.x, enemy.y, enemy.x - enemy._xVel, enemy.y - enemy._yVel);


                if(enemy.x > borderWidth && enemy.x < screenW - borderWidth && enemy.y > borderWidth && enemy.y < screenH - borderWidth){
//                    if(parseInt(layer.getTileAtWorldXY(enemy.x,enemy.y).index)==drawColor){
//                        killPlayer(enemy.x,enemy.y);
//                    }
                    var overlappingTiles = map.getTilesWithinShape(enemy._hitLine);
                    if(overlappingTiles.filter(tile => parseInt(tile.index) == drawColor).length != 0){
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
        if(downPress){
            player.anims.play('drawingDown',true);
        }else if(upPress){
            player.anims.play('drawingUp',true);
        }else if(rightPress){
            player.anims.play('drawingRight',true);
        }else if(leftPress){
            player.anims.play('drawingLeft',true);
        }
    }else if(playerState=="Erase"){
        player.anims.play('erasing',true);
    }else if(playerState == "SpeedUp"){
        player.anims.play('jackhammer',true);
//        player.setOrigin(0.5,1);
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

    if(enemyArray.length > 0){
        for(i=0;i<enemyArray.length;i++){
            if(enemyArray[i].x > borderWidth && enemyArray[i].x < screenW - borderWidth 
                && enemyArray[i].y > borderWidth && enemyArray[i].y < screenH - borderWidth)
            if(parseInt(layer.getTileAtWorldXY(enemyArray[i].x,enemyArray[i].y).index)==transColor){
                if(!enemyArray[i]._noDie){
                    enemyArray[i]._state = "die";
                }
            }
        }    
    }

    if(itemArray.length > 0){
        for(i=0;i<itemArray.length;i++){
            if(parseInt(layer.getTileAtWorldXY(itemArray[i].x,itemArray[i].y).index) == transColor){
                itemArray[i].setTintFill(0xffffff);
                itemArray[i].setAlpha(1);
                itemArray[i]._itemDestroy.paused = false;
                if(itemArray[i]._type == "food"){
                    if(gagMode){
                        increaseHealth(2);
                    }else{
                        increaseHealth();
                    }
                }else if(itemArray[i]._type == "speed"){
                    player._speedUp = true;
                    player._speedTimer = 500;
                    speedupPopup();
                }else if(itemArray[i]._type == "zap"){
                    //ZAP!! jk its probably more of an explosion
                    for(i=0;i<enemyArray.length;i++){
                        if(!enemyArray[i]._isBoss){
                            enemyArray[i]._state = "die";
                        }
                    }
                    cam.flash(100);
                    zapPopup();
                }else if(itemArray[i]._type == "slow"){
                    console.log("SLOW!!")                    
                }else if(itemArray[i]._type == "stop"){
                    console.log("STOP!!")                    
                }

            }    
        }
    }




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
            if(imageSilh.visible){
                silhouetteHue.brightness(tween.getValue(),true);
                silhouetteHue.saturate(tween.getValue()-0.7,true);                
            }else if(gagImageSilh.visible){
                gagSilhouetteHue.brightness(tween.getValue(),true);
                gagSilhouetteHue.saturate(tween.getValue()-0.7,true);
            }
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
//    rainbowStarEmitter.emitParticleAt(xPos,yPos)
//    spinFasterDelta = 1;
    rainbowContainer.x = xPos;
    rainbowContainer.y = yPos;
//    rainbowContainer.angle = 0;
    rainbowStarEmitter.particleX = 0;
    rainbowStarEmitter.particleY = 0;
    rainbowStarEmitter.explode();
    rainbowContainer.angle = 0;

    currentScene.tweens.add({
        targets: rainbowContainer,
        delay: 700,
        angle: { value: -1000, duration: 1000 },
        ease: "Quad.easeIn",
    });



}


function addRainbowstars2(xPos = player.x,yPos = player.y){
//    spinFasterDelta = 1;
rainbowContainer2.x = xPos;
rainbowContainer2.y = yPos;
    rainbowStarEmitter2.particleX = 0;
    rainbowStarEmitter2.particleY = 0;
    rainbowStarEmitter2.explode();
rainbowContainer2.angle = 0;

    currentScene.tweens.add({
        targets: rainbowContainer2,
        delay: 700,
        angle: { value: -1000, duration: 1000 },
        ease: "Quad.easeIn",
    });

}

var scoreTint = 0xffffdd;



function percPopup(){



    var oldPercentage = percentageRevealed;
    if(gagMode){
        percentageRevealed = Math.floor(10*(100*numRevealed/(gagTotalSilhouette)))/10;
    }else{
        percentageRevealed = Math.floor(10*(100*numRevealed/(totalSilhouette)))/10;
    }
    
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
if(percentageDelta > 0){
    addScore.text = `+${Math.floor(percentageDelta)}`;
}else{
    addScore.text = `${Math.floor(percentageDelta)}`;
}
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
//        glowSprite.x = player.x;
//        glowSprite.y = player.y;
//        glowSprite.setVisible(true);
//        glowSprite.play({key: 'glowAnim'});
        glowShine();
        }else{
        sfxSuccess.play();
        sfxExplosion.play();
        cam.shake(100,0.02);
        UICam.shake(100,0.02);
        addSparkles();
        flashBrightness = 1.2
//        glowSprite.x = player.x;
//        glowSprite.y = player.y;
//        glowSprite.setVisible(true);
//        glowSprite.play({key: 'glowAnim'});
        glowShine();
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
            if(percentageDelta > 0){
                addScore.text = `+${(Math.floor(percentageDelta*incrementDelta.getValue()/100))}`;
            }else{
                addScore.text = `${(Math.floor(percentageDelta*incrementDelta.getValue()/100))}`;
            }
//            console.log((Math.floor(10*percentageDelta*incrementDelta.getValue()/100))%10)
            addScoreRight.text = `.${((Math.floor(10*percentageDelta*incrementDelta.getValue()/100))%10)}%`;
        },
        onComplete: () => {
            if(percentageDelta > 0){
                addScore.text = `+${Math.floor(percentageDelta)}`;
            }else{
                addScore.text = `${Math.floor(percentageDelta)}`;
            }
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


function transScoreChange(){

    var oldPercentage = percentageRevealed;
    if(gagMode){
        percentageRevealed = Math.floor(10*(100*numRevealed/(gagTotalSilhouette)))/10;
    }else{
        percentageRevealed = Math.floor(10*(100*numRevealed/(totalSilhouette)))/10;
    }
    
    percentageDelta = Math.floor(10*(percentageRevealed-oldPercentage))/10;

    scoreText.text = `${Math.floor(percentageRevealed)}`;
    scoreTextRight.text = `.${Math.floor(10*(percentageRevealed-Math.floor(percentageRevealed)))}%`;

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

    const rt = currentScene.make.renderTexture({x: 0, y: 0, width: imageWidth, height: imageHeight, add: false}).setOrigin(0.0);

    numRevealed = 0;

    revealMask = [...Array(imageHeight)].map(e => Array(imageWidth).fill(4));

    
    for (i=borderWidth;i<imageWidth-borderWidth+1;i++){
        for (j=borderWidth;j<imageHeight-borderWidth+1;j++){
            if(parseInt(layer.getTileAtWorldXY(i,j).index)==transColor){
                revealMask[j][i] = 0;
                if (silhouetteMatrix[j][i] == 1 && imageSilh.visible){
                    numRevealed++;
                }else if (gagSilhouetteMatrix[j][i] == 1 && gagImageSilh.visible){
                    numRevealed++;
                }
            }
        }
    }

    

    layer2 = map.createBlankLayer('maskDraw',drawTileset);
    layer2.putTilesAt(revealMask,0,0);

    if(imageSilh.visible){
        finishedImage.mask = new Phaser.Display.Masks.BitmapMask(this,rt);
    }else if(gagImageSilh.visible){
        gagFinishedImage.mask = new Phaser.Display.Masks.BitmapMask(this,rt);
    }
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