
//if you see this and you dont know me, add me on Discord (david4816)



var currentScene;


var mapArray;
var backgroundArray;
var revealMask = [];
var intSpeed = 1;
var intervalTimer = intSpeed;
var layer;
var player;
var isMoving = false;

const silhouetteColor = 0; //black

const borderColor = 0; //black
const baseColor = 4; //transparent (were gonna do something different here)
const edgeColor = 2; //yellow
const drawColor = 3; //blue
const transColor = 1; //pink

const checkColor = 5;

var speed = 2;

var aPress = false;
var bPress = false;
var cPress = false;
var dPress = false;
var qPress = false;
var wPress = false;
var spacePress = false;

var map;
let mapMask;
//let revealMask;

let tileIndex;
let tileIndexC;
let tileIndexR;
let tileIndexD;
let tileIndexL;
let tileIndexU;

let playerState="";

const borderWidth = 6;

let imageWidth;
let imageHeight;

var drawTileset;
var finishedImage;
var gagFinishedImage;

//var imageUsed;

//let imageMask;


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
var heartEmitter;
var glowSprite;

var silhouetteHue;
var silhouetteHueValue;

var gagSilhouetteHue;
var gagSilhouetteHueValue;


var enemyArray = [];
var totalBlobs=0;
var totalBlobsMax = 8;

var cam;
var UICam;


//change this whenver u wanna add the roulette thingy
var boxRoulette = true;
var boxTimer = 0;
var startingRound = true;

//var hideHealth;


var layerRT;
var drawRT;


//this.addScore;

var gagBlitter

var postFxPlugin;
var postFxPipeline;

var bullComb;

var oldPosX;
var oldPosY;

var rouletteRect

var origLayer;

var mapBlitter;

var roundTimer;
var roundTimerMax = 160; //THIS IS NOT THE ACTUAL INIT, CHECK BELOW W/ SAME NAME
var timerBar;

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var initSquareX;
var initSquareY;
var initSquareW;
var initSquareH;

var isErasing;

var startBaseColor = [];


var leftPress;
var rightPress;
var upPress;
var downPress;

const totalHealth = 6;
var currentHealth = totalHealth;
var oldHealth = currentHealth;
var healthContainer;

var gagMode = false;

const totalGagHealth = 3;
var currentGagHealth = totalGagHealth;


var rainbowContainer;
var rainbowContainer2;
var healthImage;
var healthArray=[];

const TAU = 2 * Math.PI;

var timeOut = false;

var drawTintTimer=0;
var tintIndex=0;
var regularDrawTween;
var rainbowDrawTween;

var blitterIndex = 0;

var firstI;

var healthTimer = 0;

const vel = new Phaser.Math.Vector2();

const drag = {
    active: true,
    update: function (particle, deltaMs, deltaUs) {
      vel.set(particle.velocityX, particle.velocityY);
      vel.scale(Math.pow(0.02, 0.016));
  
      particle.velocityX = vel.x;
      particle.velocityY = vel.y;
    }
  };

  
  const confettiProcessor = {
    active: true,
    update: function (particle, deltaMs, deltaUs) {
//        console.log(particle.lifeT)
      if(particle.lifeT >= 0.07){
//        console.log("HIII")
        particle.velocityX *= 0.98;
//        particle.velocityY = -10;
        particle.accelerationY = 300
      }else if(particle.lifeT >= 0.06){
        particle.accelerationY = 3000
        if(particle.velocityY < -10){
            particle.velocityY = -10;
        }
 
      }else{
//        particle.accelerationY = 1500
      }
    }
  };


  const confettiProcessor2 = {
    active: true,
    update: function (particle, deltaMs, deltaUs) {
        if(particle.lifeT <= 0.09){
//            particle.accelerationY = 350
        }else{
//            particle.accelerationY *= 0.9
            particle.velocityY = particle.velocityY*0.90 + 2*particle.lifeT
            particle.velocityX = particle.velocityX*0.90 + 1*particle.lifeT*Math.sign(particle.velocityX)
        }

        if(particle.lifeT >= 0.05){
        }
    }
  };


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


  const drag1 = Object.create(drag);
const drag2 = Object.create(drag);
const drag3 = Object.create(drag);

const spinFaster1 = Object.create(spinFaster);
const spinFaster2 = Object.create(spinFaster);


var roundWon = false;

//var spinFasterDelta = 1;



//oh god this is cancerous

const aqua = 0x3077f2;
const black = 0x000000;
//const blue = 0x0074d9;
const fuchsia = 0xc81aeb;
//const green = 0x2ecc40;
const lime = 0x17bd46;
//const maroon = 0x85144b;
//const navy = 0x001f3f;
//const olive = 0x3d9970;
const orange = 0xff851b;
const purple = 0xb10dc9;
const red = 0xff4136;
//const teal = 0x39cccc;
const white = 0xffffff;
const yellow = 0xffe600;

const tileTint = [
    black,
    red,
    orange,
    aqua,
    white
]

//const tints = [red, orange, yellow, lime, green, teal, aqua, blue, fuchsia];
var tints = [red, orange, yellow, lime, aqua];

const { Between, FloatBetween } = Phaser.Math;

const CubicIn = Phaser.Math.Easing.Cubic.In;

const { GetRandom } = Phaser.Utils.Array;

const itemTypes = ["speed","zap","slow","stop","shrink"];

var spawnItemRNG = 500;
var foodRNG = 50; // (1/foodRNG) of occurring
var favFoodRNG = 10; //1/10th out of all the food rngs, can be varied as player dies more?
var powerRNG = 50;
var itemArray = []
var itemSelection = [];

var reviveGems = [];
var numReviveGems = 8;
//degrees, not rads
var startAngularVel = 0;
var endAngularVel = 2;
var reviveDuration = 0; //set to 0 every death
var reviveDurationMax = 1800;
var endReviveLength = 1
var startReviveLength;
var distCenter;

var lengthStop1 = 2/100;
var lengthStop2 = 3/100;
var reviveTween1;

var freezeFrame = false;
var enemyKillXY = [];

var gagRevive = false;
var gameOver = false;

var isKillPlayer = false;
var initPixel = [];
var isPixelExploding = false;
var allExploded = false;
//steps before adding explosion
var alternateExplodeMax = 9;
var alternateExplodeCounter = 0;

var explodePixelX;
var explodePixelY;

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
var bossLeftShrink;
var bossRightShrink;
var bossUpShrink;
var bossDownShrink;
var containsDraw = false;
var leftBorderOrEdge = false;

var isSinging = false;
var blobSing = false;

var singCounter = 0;

var showDebug = false;

var hardMode = false;

var flipFlop = false;

var checkFillCounter = 0;
var trueCheck = false;


var leftMax;
var rightMax;
var upMax;
var downMax;



var stopTimerText;
var stopTimerTextRight;
var stopTimer;


var flashBrightness;

var explodeWaveInterval = 30
var explodeAngle = 0;
var explodeDist = 40;

var explosionArray = [];

const scoreTint = 0xffffdd;

var oldPercentage;

var actualFillCounter = 0;
var bossKill = false;
var bossKillStarted = false;

var percentageRevealed;
var percentageDelta;
var numRevealed;

var rtMask;
var rt;

var sfxSuccess;
var sfxSuccess2;
var sfxSuccess0;
var sfxExplosion;
var sfxExplosion2;
var sfxExplosion3;
var sfxExplosion4;
var sfxExplosion5;
var sfxExplosionLong;
var sfxRoulette;
var sfxBullSwingGrunt;
var sfxSwing;
var sfxSwingHit;
var sfxSkyGlint;
var sfxBurst;
var sfxShrink;
var sfxSpeedup;
var sfxFreeze;
var sfxSlow;
var sfxThunder;
var sfxLightning;
var sfxCloud;
var sfxSpawn;
var sfxFavFood;
var sfxCheer;
var sfxFirework;


var imageBackground;
var silhImageBackground;

var imageSilh;
var gagImageSilh;

var i;
var j;

var cursors;
var keyA;
var keyB;
var keyC;
var keyD;
var keyQ;
var keyW;
var keySpace;
    
var itemSparkles;
var confettiEmitter;
var confettiEmitter2;

var borderImage;

var playerAfter1;
var playerAfter2;
var playerAfter3;

var bullIntroTimeline;
var bullSingTimeline;
var bullSwingTimelineLeft;
var bullSwingTimelineRight;

var bullEnemy;

var moveDist;
var fillArray;

var fireworksZone;


var currentChar = "tiger";
var currentRound = 1;


var isFinishedLoading = false;

var totalScore = 0;
var timeElapsed = 0;
var totalDeaths = 0;

var bIsPressed = false;




class MainRound extends Phaser.Scene{

    constructor ()
    {
        super({ key: 'MainRoundScene', active: false });

//        this.rt;
//        this.gameOverImage;
    }


init(){

    

    this.buttonPressingSprite;
    this.startBlack;

    revealMask = [];
intSpeed = 1;
intervalTimer = intSpeed;
isMoving = false;
speed = 2;
playerState="";
silhouetteMatrix = []
gagSilhouetteMatrix = []
enemyArray = [];
totalBlobs=0;
totalBlobsMax = 8;
boxRoulette = true;
startingRound = true;
boxTimer = 0;
roundTimerMax = 160; //ITS THIS ONE
startBaseColor = [];
gagMode = false;
currentHealth = totalHealth;
oldHealth = currentHealth;
currentGagHealth = totalGagHealth;
healthArray=[];
timeOut = false;
drawTintTimer=0;
tintIndex=0;
blitterIndex = 0;
healthTimer = 0;
roundWon = false;
itemArray = []
itemSelection = [];
reviveGems = [];
startAngularVel = 0;
endAngularVel = 2;
reviveDuration = 0; //set to 0 every death
freezeFrame = false;
enemyKillXY = [];
gagRevive = false;
gameOver = false;
isKillPlayer = false;
initPixel = [];
isPixelExploding = false;
allExploded = false;
respawnTime = 0;
containsDraw = false;
leftBorderOrEdge = false;
isSinging = false;
blobSing = false;
singCounter = 0;
showDebug = false;
hardMode = false;
flipFlop = false;
checkFillCounter = 0;
trueCheck = false;
explosionArray = [];
actualFillCounter = 0;
bossKill = false;
bossKillStarted = false;
spawnItemRNG = 100;
this.startSing = false;


}

preload ()
{

    this.sound.setVolume(0.5)
    currentScene = this;

    //plugins
    this.load.plugin('rexquadimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexquadimageplugin.min.js', true);
    this.load.plugin('rexshockwavepipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexshockwavepipelineplugin.min.js', true);      
    this.load.plugin('rexroundrectangleprogressplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleprogressplugin.min.js', true);  
    this.load.plugin('rexbitmapzoneplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbitmapzoneplugin.min.js', true);
    this.load.plugin('rexcanvasplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcanvasplugin.min.js', true);
    this.load.plugin('rextextplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextextplayerplugin.min.js', true);

    //replace with real tiles later
    //This is a 5x1 tileset
    this.load.spritesheet('baseTiles','assets/image/placeholderTiles.png',{frameWidth:1,frameHeight:1});
    this.load.image('maskTiles','assets/image/maskTiles.png');
    this.load.image('bgTiles1','assets/image/bgTile1.png');

    //player
//    this.load.spritesheet('player','assets/image/cursor.png',{frameWidth:9,frameHeight:9});
    this.load.spritesheet('player','assets/image/cursor/cursorShiba.png',{frameWidth:31,frameHeight:41});

    //enemies
    this.load.spritesheet('testEnemy','assets/image/enemies/testEnemy.png',{frameWidth:24,frameHeight:24});
    this.load.spritesheet('bullEnemy','assets/image/enemies/bull.png',{frameWidth: 150, frameHeight: 180});
    this.load.spritesheet('cloudFront','assets/image/enemies/cloudFront.png',{frameWidth: 150, frameHeight: 180});
    this.load.spritesheet('cloudBack','assets/image/enemies/cloudBack.png',{frameWidth: 150, frameHeight: 180});
    this.load.spritesheet('bullBlob','assets/image/enemies/blobbert.png',{frameWidth: 60, frameHeight: 60});
    this.load.image('bullComb','assets/image/enemies/bullComb.png');
    this.load.spritesheet('thundercloud','assets/image/enemies/thundercloud.png',{frameWidth: 56, frameHeight: 40});
    this.load.spritesheet('lightning','assets/image/enemies/lightning.png',{frameWidth: 56, frameHeight: 120});
    this.load.spritesheet('lightning2','assets/image/enemies/lightning2.png',{frameWidth: 17, frameHeight: 45});
    this.load.image('soundwave','assets/image/enemies/soundwave.png');




    //images
//    this.load.image('backgroundImageBackground','assets/image/testImageBackground.png');
//    this.load.image('backgroundSilhouette','assets/image/testImageMask.png');
//    this.load.image('backgroundImage','assets/image/testImage.png');
//    this.load.image('backgroundSilhouette','assets/image/imageReveal/testVerticalMask.png');
//    this.load.image('backgroundImage','assets/image/imageReveal/testVertical.png');
//    this.load.image('backgroundImageBackground','assets/image/imageReveal/testHorizontalBackground.png');
//    this.load.image('backgroundSilhouette','assets/image/imageReveal/testHorizontalMask.png');
//    this.load.image('backgroundImage','assets/image/imageReveal/testHorizontal.png');

    console.log("Current Round: " + currentRound)
    this.textures.remove('backgroundImageBackground');
    this.textures.remove('backgroundSilhouette');
    this.textures.remove('backgroundImage');
    this.textures.remove('cgSprite');
    if(currentChar == "tiger"){
        tints = [red, orange, yellow, aqua]
        if(currentRound == 1){
//            this.load.image('backgroundImageBackground','assets/image/imageReveal/Tiger/Tiger1Background.png')
            this.load.image('backgroundImageBackground','assets/image/tilebackground/tigerTile2.png');
            this.load.image('backgroundSilhouette','assets/image/imageReveal/Tiger/Tiger1Mask.png');
            this.load.image('backgroundImage','assets/image/imageReveal/Tiger/Tiger1.png');

            this.load.image('cgSprite','assets/image/cgsprite/TigerCG1.png');
        }else if(currentRound == 2){
//            this.load.image('backgroundImageBackground','assets/image/imageReveal/Tiger/Tiger2Background.png')
            this.load.image('backgroundImageBackground','assets/image/tilebackground/tigerTile3.png');
            this.load.image('backgroundSilhouette','assets/image/imageReveal/Tiger/Tiger2Mask.png');
            this.load.image('backgroundImage','assets/image/imageReveal/Tiger/Tiger2.png');        

            this.load.image('cgSprite','assets/image/cgsprite/TigerCG2.png');
        }else{
            console.log("ERROR: currentRound outside scope")
        }
    }
    this.load.image('cgSpeechBubble','assets/image/cgsprite/SpeechBubble.png');

    //gag
//    this.load.image('gagImage','assets/image/imageReveal/testHorizontalGag.png');
//    this.load.image('gagImageSilhouette','assets/image/imageReveal/testHorizontalGagMask.png');
//    this.load.image('gagImageBackground','assets/image/imageReveal/testHorizontalBackgroundGag.png');
    this.load.image('gagImage','assets/image/imageReveal/Tiger/Tiger1Gag.png');
    this.load.image('gagImageSilhouette','assets/image/imageReveal/Tiger/Tiger1GagMask.png');
//    this.load.image('gagImageBackground','assets/image/tilebackground/unknownTile.png');
    this.load.image('gagImageBackground','assets/image/imageReveal/Tiger/Tiger1GagBackground.png');


//    borderImage.setScrollFactor(0,0);

    //collectibles
    this.load.spritesheet('food','assets/image/food/food.png',{frameWidth: 20, frameHeight: 20});
    this.load.spritesheet('favFood','assets/image/food/favFood.png',{frameWidth: 20, frameHeight: 20});
    this.load.spritesheet('powerups','assets/image/powerup/powerups.png',{frameWidth: 16, frameHeight: 16});

    //preloading audio
    this.load.audio('success','assets/audio/placeholder/success.ogg')
    this.load.audio('success2','assets/audio/placeholder/success2.ogg')
    this.load.audio('success0','assets/audio/placeholder/success0.ogg')
    this.load.audio('success25','assets/audio/placeholder/success25.ogg')
    this.load.audio('roulette','assets/audio/placeholder/roulette.ogg')
    this.load.audio('spawn','assets/audio/placeholder/spawn.ogg')
    this.load.audio('cheer','assets/audio/placeholder/cheer2.ogg')

    this.load.audio('scoreTicker','assets/audio/placeholder/scoreTicker.ogg')

    this.load.audio('explosion','assets/audio/placeholder/explosion.ogg')
    this.load.audio('explosion2','assets/audio/placeholder/explosion2.ogg')
    this.load.audio('explosion3','assets/audio/placeholder/explosion3.ogg')
    this.load.audio('explosion4','assets/audio/placeholder/explosion4.ogg')
    this.load.audio('explosion5','assets/audio/placeholder/explosion5.ogg')
    this.load.audio('explosionLong','assets/audio/placeholder/explosionLong.ogg')

    this.load.audio('skyglint','assets/audio/placeholder/skyglint.ogg')
    this.load.audio('burst','assets/audio/placeholder/burst.ogg')
    this.load.audio('swing','assets/audio/placeholder/swing.ogg')
    this.load.audio('swingHit','assets/audio/placeholder/swingHit.ogg')
    this.load.audio('bullSwingGrunt','assets/audio/placeholder/bullSwingGrunt.ogg')

    this.load.audio('thunder','assets/audio/placeholder/thunder.ogg')
    this.load.audio('lightning','assets/audio/placeholder/lightning.ogg')
    this.load.audio('cloud','assets/audio/placeholder/cloud.ogg')
    this.load.audio('lightningbolt1','assets/audio/placeholder/lightningbolt.ogg')
    this.load.audio('lightningbolt2','assets/audio/placeholder/lightning2.ogg')
    this.load.audio('soundwave1','assets/audio/placeholder/soundwave1.ogg')
    this.load.audio('soundwave2','assets/audio/placeholder/soundwave2.ogg')

    this.load.audio('speedup','assets/audio/placeholder/speedup.ogg')
    this.load.audio('shrink','assets/audio/placeholder/shrink.ogg')
    this.load.audio('freeze','assets/audio/placeholder/freeze.ogg')
    this.load.audio('slow','assets/audio/placeholder/slow.ogg')
    this.load.audio('favFood','assets/audio/placeholder/favFood.ogg')
    this.load.audio('heal','assets/audio/placeholder/heal.ogg')

    this.load.audio('fireworkSFX','assets/audio/placeholder/firework.ogg')
    this.load.audio('winTune','assets/audio/placeholder/win.ogg')
    this.load.audio('applause','assets/audio/placeholder/applause.ogg')
    this.load.audio('applauseLong','assets/audio/placeholder/applauseLong.ogg')
    this.load.audio('cheer2','assets/audio/placeholder/cheer2.ogg')

    this.load.audio('bubble','assets/audio/placeholder/bubble.ogg')
    this.load.audio('start','assets/audio/placeholder/start.ogg')

    this.load.audio('warningSFX','assets/audio/placeholder/warning.ogg')



    //preloading fonts
    this.load.bitmapFont('score', 'assets/fonts/Hardpixel_0.png', 'assets/fonts/Hardpixel.fnt');
    this.load.bitmapFont('speech', 'assets/fonts/TomorrowNight_0.png', 'assets/fonts/TomorrowNight.fnt');

    //HUD
    this.load.image('border','assets/image/border/border1.png');
    this.load.spritesheet('healthHUD','assets/image/HUD/healthHUD.png',{frameWidth:36,frameHeight:36});
    this.load.spritesheet('popupText','assets/image/HUD/popupText.png',{frameWidth:127,frameHeight:70});
    this.load.spritesheet('favBubble','assets/image/HUD/favBubble.png',{frameWidth:60,frameHeight:60});
    this.load.spritesheet('buttonPressing','assets/image/HUD/buttonPressing.png',{frameWidth:65,frameHeight:65});
    this.load.image('timerBorder','assets/image/HUD/timer.png');
    this.load.image('timerClock','assets/image/HUD/clock.png');
    this.load.image('scroll','assets/image/HUD/scroll.png');
    this.load.image('warning','assets/image/HUD/warning.png');
    



    
    //preloading particles
    this.load.spritesheet('sparkle','assets/image/particles/sparkle.png',{frameWidth:9,frameHeight:15});
    this.load.spritesheet('cleanSparkle','assets/image/particles/cleanSparkle.png',{frameWidth:9,frameHeight:15});
    this.load.spritesheet('rainbowstar','assets/image/particles/rainbowstar.png',{frameWidth:29,frameHeight:29});
    this.load.spritesheet('glow','assets/image/particles/glow.png',{frameWidth:18,frameHeight:18});
    this.load.spritesheet('glow2','assets/image/particles/glow2.png',{frameWidth:48,frameHeight:48});
    this.load.spritesheet('glow3','assets/image/particles/glow3.png',{frameWidth:48,frameHeight:48});
    this.load.spritesheet('explosion1','assets/image/particles/explosion1.png',{frameWidth:20,frameHeight:20});
    this.load.spritesheet('explosion3','assets/image/particles/explosion3.png',{frameWidth:40,frameHeight:44});
    this.load.spritesheet('musicNotes','assets/image/particles/music notes.png',{frameWidth:16,frameHeight:20});
    this.load.image('rubble','assets/image/particles/rubble.png');
    this.load.spritesheet('gagBlitter','assets/image/particles/gagBlitter.png',{frameWidth:48,frameHeight:48});
    this.load.spritesheet('confetti','assets/image/particles/confetti.png',{frameWidth:16,frameHeight:16});
    this.load.image('fireworksTest','assets/image/particles/fireworksTest.png');
    this.load.spritesheet('iceSmall','assets/image/particles/iceSmall.png',{frameWidth:36,frameHeight:36});
    this.load.spritesheet('iceBig','assets/image/particles/iceBig.png',{frameWidth:108,frameHeight:108});
    this.load.spritesheet('webSmall','assets/image/particles/webSmall.png',{frameWidth:37,frameHeight:37});
    this.load.spritesheet('webBig','assets/image/particles/webBig.png',{frameWidth:111,frameHeight:111});
    this.load.spritesheet('heart','assets/image/particles/heart.png',{frameWidth:24,frameHeight:24});
    this.load.image('health','assets/image/particles/health.png');


    //music

    this.cache.audio.remove('musicRound');
    this.cache.audio.remove('musicRoundIntro');

    if(bIsPressed){
        this.load.audio('musicRound','assets/audio/placeholder/wipsong.ogg');
        this.load.audio('musicRoundIntro','assets/audio/placeholder/wipsong.ogg');
        console.log("secret song activated!")
        console.log("its unfinished so theres no real loop or intro")
    }else{
        if(currentRound == 1){
            this.load.audio('musicRound','assets/audio/placeholder/liarparadox.ogg');
            this.load.audio('musicRoundIntro','assets/audio/placeholder/liarparadox_intro.ogg');        
        }else if(currentRound == 2){
            this.load.audio('musicRound','assets/audio/placeholder/dancer.ogg');
            this.load.audio('musicRoundIntro','assets/audio/placeholder/dancer_intro.ogg');    
        }
    }

    this.load.audio('hurryup','assets/audio/placeholder/hurryup.ogg');


    this.load.plugin('rexsoundfadeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsoundfadeplugin.min.js', true);


    
}



create ()
{


    this.attackDelay = (210*3*2);
    this.isScroll = false;
    roundTimer = undefined;
    //generate pixel texture
    this.textures.generate('pixel', { data: ['2'], pixelWidth: 1 });

    //blitter
    gagBlitter = this.add.blitter(0, 0, 'gagBlitter');
    gagBlitter.setDepth(2)

    //audio creation

    sfxSuccess = this.sound.add('success');
    sfxSuccess2 = this.sound.add('success2');
    this.sfxSuccess25 = this.sound.add('success25');
    sfxSuccess0 = this.sound.add('success0')
    sfxExplosion = this.sound.add('explosion');
    sfxExplosion2 = this.sound.add('explosion2');
    sfxExplosion3 = this.sound.add('explosion3');
    sfxExplosion3.setLoop(true);
    sfxExplosion4 = this.sound.add('explosion4');
    sfxExplosion5 = this.sound.add('explosion5');
    sfxExplosionLong = this.sound.add('explosionLong');
    sfxRoulette = this.sound.add('roulette');
    sfxBullSwingGrunt = this.sound.add('bullSwingGrunt');
    sfxSwing = this.sound.add('swing');
    sfxSwingHit = this.sound.add('swingHit');
    sfxSkyGlint = this.sound.add('skyglint');
    sfxBurst = this.sound.add('burst');
    sfxShrink = this.sound.add('shrink');
    sfxSpeedup = this.sound.add('speedup');
    sfxFreeze = this.sound.add('freeze');
    sfxSlow = this.sound.add('slow');
    sfxThunder = this.sound.add('thunder');
    sfxLightning = this.sound.add('lightning');
    sfxCloud = this.sound.add('cloud');
    sfxSpawn = this.sound.add('spawn');
    sfxFavFood = this.sound.add('favFood');
    sfxCheer = this.sound.add('cheer');
    sfxFirework = this.sound.add('fireworkSFX');
    this.sfxScoreTicker = this.sound.add('scoreTicker');
    this.sfxWinTune = this.sound.add('winTune');
    this.sfxApplause = this.sound.add('applause');
    this.sfxApplauseLong = this.sound.add('applauseLong');
    this.sfxBubble = this.sound.add('bubble')
    this.sfxStart = this.sound.add('start');
    this.sfxCheer2 = this.sound.add('cheer2');
    this.sfxWarning = this.sound.add('warningSFX');
    this.sfxHeal = this.sound.add('heal');
    this.sfxLightningbolt1 = this.sound.add('lightningbolt1');
    this.sfxLightningbolt2 = this.sound.add('lightningbolt2');
    this.sfxSoundwave1 = this.sound.add('soundwave1');
    this.sfxSoundwave2 = this.sound.add('soundwave2');
    this.sfxHurryUp = this.sound.add('hurryup');

    //plugin fx
    postFxPlugin = this.plugins.get('rexshockwavepipelineplugin');



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

//    map = this.make.tilemap({tileWidth:1,tileHeight:1,width:imageWidth,height:imageHeight});
//    bgMap = this.make.tilemap({tileWidth:64,tileHeight:64,width:6,height:4});
//    drawTileset = map.addTilesetImage('baseTiles',null,1,1);
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

//    imageBackground = this.add.image(0,0,'backgroundImageBackground').setOrigin(0,0)//.setScrollFactor(0.5);
    imageBackground = this.add.tileSprite(0, 0, imageWidth, imageHeight, 'backgroundImageBackground').setOrigin(0).setScrollFactor(0.3);
    silhImageBackground = this.add.image(0,0,'gagImageBackground').setOrigin(0,0).setVisible(false)//.setScrollFactor(0.5);
//    silhImageBackground = this.add.tileSprite(0, 0, imageWidth, imageHeight, 'gagImageBackground').setOrigin(0).setScrollFactor(0.3).setVisible(false);

    imageBackground.depth = -1;
    silhImageBackground.depth = -1;


    imageSilh = this.add.image(0,0,'backgroundSilhouette').setOrigin(0,0);
    gagImageSilh = this.add.image(0,0,'gagImageSilhouette').setOrigin(0,0).setVisible(false);


    totalSilhouette = 0;

    gagTotalSilhouette = 0;

    console.log("Width: " + imageWidth);
    console.log("Height: " + imageHeight);
    console.log("ScreenW: " + screenW);
    console.log("ScreenH: " + screenH);


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
        key: 'buttonPressingAnim',
        frames: this.anims.generateFrameNumbers('buttonPressing',{start:0, end:1}),
        frameRate:18,
        repeat: -1
    })


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
        this.anims.create({
            key: 'bullDie',
            frames: this.anims.generateFrameNumbers('bullEnemy',{start:26,end:26}),
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
    
        mapArray = [...Array(imageWidth)].map(e => Array(imageHeight).fill(0));
    
        for (i=0;i<imageWidth;i++){
            for (j=0;j<imageHeight;j++){
                if(i >= initSquareX+1 && i <= (initSquareX + initSquareW)-1 && j >= initSquareY+1 && j <= (initSquareY + initSquareH)-1){
                    mapArray[i][j] = transColor;
                }else if(i<borderWidth || j<borderWidth || i>imageWidth-borderWidth || j>imageHeight-borderWidth){
                    mapArray[i][j] = borderColor;
                }else if(i >= initSquareX && i <= (initSquareX + initSquareW) && j >= initSquareY && j <= (initSquareY + initSquareH)){
                    mapArray[i][j] = edgeColor
                }else{
                    mapArray[i][j] = baseColor;
                }
            }
        }
    
        var edgeArray = [];

        for(i=0;i<mapArray[0].length;i+=2){
            for(j=0;j<mapArray.length;j+=2){
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

//        layer = map.createBlankLayer('mainDraw',drawTileset);
//        layer.putTilesAt(mapArray,0,0,imageWidth,imageHeight);
        
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
    //D = 68
    keyD = this.input.keyboard.addKey(68);
    //E = 69
    this.keyE = this.input.keyboard.addKey(69);
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
        frames: this.anims.generateFrameNumbers('glow2',{start:1, end:11}),
        frameRate: 24,
    })

    this.anims.create({
        key: 'glowAnim3',
        frames: this.anims.generateFrameNumbers('glow3',{start:0, end:10}),
        frameRate: 24,
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

    this.anims.create({
        key: 'thundercloud1',
        frames: this.anims.generateFrameNumbers('thundercloud',{start:0,end:2}),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'thundercloud2',
        frames: this.anims.generateFrameNumbers('thundercloud',{start:3,end:5}),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'lightning1',
        frames: this.anims.generateFrameNumbers('lightning',{start:0,end:5}),
        frameRate: 24,
    });

    this.anims.create({
        key: 'lightning2Anim',
        frames: this.anims.generateFrameNumbers('lightning2',{start:0,end:1}),
        frameRate: 6,
        repeat: -1,
    });

    this.anims.create({
        key: 'iceSmallAnim',
        frames: this.anims.generateFrameNumbers('iceSmall',{start:0,end:4}),
        hold: 900,
        frameRate: 8,
        repeat: -1,
    });
    this.anims.create({
        key: 'iceBigAnim',
        frames: this.anims.generateFrameNumbers('iceBig',{start:0,end:4}),
        hold: 900,
        frameRate: 8,
        repeat: -1,
    });


    //animations

    glowSprite = this.add.sprite(0,0,'glow').setVisible(false);
    glowSprite.depth = 3;
    //emitters


    this.healthEmitter = this.add.particles(0,0,'health',{
        speedY: -10,
        gravityY: -100,
        frequency: 20,
        x: {min: -5,max: 5},
//        y: 20,
        scale: {min: 0.2, max: 0.5},
        blendMode: 'ADD',
        speedX: {
            onEmit: (p) => 3*p.x
        },
        stopAfter: 20,
        lifespan: {min: 600, max: 1000},
        alpha: {start: 1, end: 0},
        emitting: false,
    });

    this.healthEmitter.depth = 3;


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



    confettiEmitter = this.add.particles(0, 0, 'confetti', {
//        frequency: 1000 / 60,
        quantity: 1200,
        lifespan: {min: 500,max: 1600},
        speedX: {
            onEmit: (particle) => {
                return -1*Math.sign(particle.x - (screenW/2))*Math.random()*400
            }
        },
        speedY: {min: -1000, max: -10},
//        gravityY: 650,
        emitting: false,
        frame: [0, 2, 3,4,6],
        x: {
            onEmit: () => {
//                return (screenW/2) + ((Math.random())*(screenW/2) + (screenW/2))*(2*Math.round(Math.random())-1);
                return (screenW/2) + (-1+Math.round(Math.random())*2)*(screenW/1.8)
            }
        },
//        y: {min: screenH+200,max: screenH+400},
        y: {min: screenH,max: screenH},
        tint: tints,
        scaleX: {
          onEmit: (particle) => {
            return -1+Math.random()*2;
          },
          onUpdate: (particle,k,t) => {
            // 4 cycles per lifespan
            return 1.5*Math.cos(TAU * 32 * particle.lifeT)* (CubicIn(1 - t)**0.2);
          }
        },
        scaleY: {
            onUpdate: (p,k,t) => {
                return 1.5 * (CubicIn(1 - t)**0.2)
            }
        },
        rotate: {
          onEmit: (particle) => {
            return Math.random()*360;
          },
          onUpdate: (particle) => {
            // 2 cycles per lifespan
            return 8 * 360 * Math.sign(particle.velocityX) * particle.lifeT + particle.rotation;
          }
        },
        emitZone: {
            type: 'random',
            source: new Phaser.Geom.Circle(0, 0, 100)
        }
      });
  

//      confettiEmitter.addParticleProcessor(confettiProcessor);
        confettiEmitter.addParticleProcessor(confettiProcessor2);

      confettiEmitter2 = this.add.particles(0, 0, 'confetti', {
                frequency: 1000 / 60,
//                quantity: 200,
                lifespan: {min: 3000,max: 6000},
                speedX: {
                    onEmit: (particle) => {
                        return -50 + (100*particle.x/screenW)
                    }
        },
                speedY: {min: 0, max: -100},
                gravityY: 200,
//                emitting: false,
                frame: [0, 2, 3,4,6],
                x: { min: 0, max: screenW},
                y: {min: 0,max: 0},
                tint: tints,
                scaleX: {
                  onEmit: (particle) => {
                    return -1+Math.random()*2;
                  },
                  onUpdate: (particle) => {
                    // 4 cycles per lifespan
                    return Math.cos(TAU * 32 * particle.lifeT);
                  }
                },
                rotate: {
                  onEmit: (particle) => {
                    return Math.random()*360;
                  },
                  onUpdate: (particle) => {
                    // 2 cycles per lifespan
                    return 8 * 360 * Math.sign(particle.velocityX) * particle.lifeT + particle.rotation;
                  }
                }
              }).pause();
        
//      confettiEmitter.setParticleTint(GetRandom(tints));
//      confettiEmitter.explode();
  

//    console.log("roundPixels? : " + cam.roundPixels)


heartEmitter = this.add.particles(0,0,'heart',{
//    speedX: {min:-200,max:200},
//    speedY: {min: -300, max: 0},
    speed: 200,
//    angle: {min: 0, max: 360},
    scaleX: {
        onUpdate: (particle,k,t) => {
        // 4 cycles per lifespan
        return Math.cos(TAU * 10 * ((CubicIn(1 - t)**3)) );
        }
    },
    gravityY: 400,
    lifespan: 4000,
    angle: {start: 0, end: 360, steps: 6},
    quantity: 6,
//    radial: true,
    emitting: false,
//    scale: {start: 0.5, end: 0.1, ease: "Quad.easeOut"}

});

heartEmitter.setDepth(3);


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
    scoreText = this.add.bitmapText(0,0,'score','0').setOrigin(1,0.5).setVisible(false);
    scoreTextRight = this.add.bitmapText(0,0,'score','.0%',20).setOrigin(0,0.5).setVisible(false);
    scoreText.x = 60;
    scoreText.y = screenH-30;
    scoreTextRight.x = 62;
    scoreTextRight.y = screenH-34;
//    var bulgeEffect = scoreText.preFX.addBarrel(1);



    

    UICam = this.cameras.add(0, 0, 320, 240);
    UICam.stopFollow();



    cam.setBounds(0,0,screenW,screenH);
//    this.physics.world.setBounds(0,0,imageWidth,imageHeight);
    if(!boxRoulette){
        cam.startFollow(player,true,0.1,0.1);
        UICam.ignore([player,layer,finishedImage, gagFinishedImage]);
        makeReviveGems();
        calculateScore();
        percPopup();
    }
    cam.ignore([scoreText, scoreTextRight, borderImage,healthContainer,healthImage,confettiEmitter])
    //this camera should ignore everything but the UI (border, text popups, score)
    //wtf it works
    rouletteRect = currentScene.add.rectangle(0,0,0,0,0xffffff,0.5);
    UICam.ignore(rouletteRect);

    UICam.ignore([image, imageSilh, gagImageSilh,
        sparkleEmitter,sparkleEmitter2, rainbowStarEmitter, rainbowStarEmitter2, drawSparkles, itemSparkles, explosionEmitter1, 
        explosionEmitter2,explosionEmitter3, explosionArray, this.healthEmitter,
        glowSprite, enemyArray, imageBackground, silhImageBackground, rubbleEmitter, rainbowContainer, rainbowContainer2, heartEmitter]);

    if(showDebug){
        UICam.ignore([debugBoss,debugBoss2])
    }


    this.startBlack = this.add.rectangle(0,0,screenW,screenH,0x000000).setOrigin(0,0);
    this.startBlack.depth = 6;
    this.time.addEvent({
        delay: 1000,
        callback: () => {
            this.startBlack.destroy();
            this.startCG();
        }
    })
            
        

//cam.addToRenderList(imageSilh);

//this.events.on('prerender', this.preRender, this);

this.time.addEvent({
    delay: 700,
    callback: () => {
        this.scene.stop('LoadingScene')
    }
})


this.time.addEvent({
    delay: 500,
    callback: () => {
        this.musicVolume = 1;
        this.sfxMusic = this.sound.add('musicRound');
        this.sfxMusic.setLoop(true);
        this.sfxMusic.setVolume(this.musicVolume)
        this.sfxMusicIntro = this.sound.add('musicRoundIntro');
        this.sfxMusicIntro.play();
        this.sfxMusicIntro.on('complete',() => this.sfxMusic.play());

    }
}) //kill the music for now


}


startCG(startRound = true){
        //cut-in cg
    //should cgBackground be an actual background?
    var cgBackground = this.add.rectangle(0,0,screenW,screenH,0x000000).setOrigin(0,0);
    var cgRect1 = this.add.rectangle(0,0,screenW,screenH/2,0x000000).setOrigin(0,0);
    var cgRect2 = this.add.rectangle(0,screenH/2,screenW,screenH/2,0x000000).setOrigin(0,0);
    var cgSprite = this.add.image(-90,screenH,'cgSprite').setOrigin(0.5,1);
    var cgSpeechBubble = this.add.image(150,80,'cgSpeechBubble').setOrigin(0,0.5).setAlpha(0);
    var cgName = this.add.text(screenW*0.59,screenH-30,'Tiger Guy',{fontSize: 16, color: '#ffffff'});
    cgName.alpha = 0;
    cgSpeechBubble.angle = -10;

    cgBackground.depth = 6;
    cgRect1.depth = 6;
    cgRect2.depth = 6;
    cgSprite.depth = 6;
    cgSpeechBubble.depth = 6;
    cgName.depth = 6;



    if(startRound){
        cgBackground.setAlpha(1);
    }else{
        cgBackground.setAlpha(0);
        cgRect1.y = -screenH/2;
        cgRect2.y = screenH;
    }

    //oh boy here we go

    if(startRound){
        var chain1 = this.tweens.chain({
            targets: cgName,
            tweens:[
                {
                    duration: 150,
                    delay: 700,
                    ease: 'Back.easeOut',
    //                x: screenW*0.61,
                    y: screenH-50,
                    alpha: 1,
                    onComplete: () => {
                        if(!startingRound){
                            chain1.pause();
                        }
                    }
                },
                {
                    delay: 4100-1000,
                    duration: 300,
                    ease: 'Back.easeIn',
    //                x: screenW*1.2,
                    y: screenH-30,
                    alpha: 0,
                    onComplete: () => {
                        cgName.destroy();
                    }
                }
            ]
        });
    
    }else{
        cgName.destroy();
    }




    if(startRound){

        var roundText = this.add.bitmapText(screenW/2,screenH/4,'score','').setOrigin(0.5,1).setAlpha(0);
        roundText.text = `Round ${currentRound}`;
    
        //could also just be an image
        var startText = this.add.bitmapText(screenW/2,60+screenH/4,'score','START').setOrigin(0.5,0.5);
        startText.scale = 0;
    
        this.tweens.chain({
            targets: roundText,
            tweens:[
                {
                    duration: 120,
                    y: '+= 20',
                    delay: 5000+300,
                    alpha: 1,     
                    ease: 'Back.easeOut',
                },
                {
                    duration: 700,
                    delay: 7500-5000-120-800,
                    alpha: 0,
                    scale: 5,
                    y: '-= 30',
                    ease: 'Cubic.easeOut',
                },
                
            ]
        })
    
        this.tweens.chain({
            targets: startText,
            tweens:[
                {
                    duration: 130,
    //                y: '+= 20',
                    delay: 5000+800+300+300,
                    scale: 2.5,
                    ease: 'Back.easeOut',
                    onStart: () => {
                        this.sfxStart.play();
                    }
                },
                {
                    duration: 700,
                    delay: 1500-800+70-300,
                    alpha: 0,
                    scale: 10,
                    y: '+= 30',
                    ease: 'Cubic.easeOut',
                },
                
            ]
        })
    
    }


    if(startRound){
        this.tweens.add({
            targets: cgBackground,
            duration: 200,
            alpha: 0.5,
        })    
    }else{
        this.tweens.add({
            targets: cgBackground,
            duration: 200,
            alpha: 0.5,
            onStart: () => {
                cgBackground.setAlpha(0)
            }
        })
    
    }

    if(startRound){
        this.time.addEvent({
            delay: 5000+800+300+300+130+1500-800+70-300-300,
            callback: () => {
                startingRound = false;
            }
        })    

    this.tweens.add({
        targets: cgBackground,
        duration: 500,
        delay: 4500,
        alpha: 0,
        onComplete: () => {
            cgBackground.destroy();
        }
    })
    }

    if(startRound){
        this.tweens.chain({
            targets: cgRect1,
            tweens:[
                {
                    duration: 800,
                    ease: 'Cubic.easeOut',
                    y: -2*screenH/8,        
                },
                {
                    delay: 4100-1000,
                    duration: 700,
                    ease: 'Back.easeIn',
                    y: -screenH/2,
                    onComplete: () => {
                        cgRect1.destroy();
                    }
                }
            ]
        });
        this.tweens.chain({
            targets: cgRect2,
            tweens:[
                {
                    duration: 800,
                    ease: 'Cubic.easeOut',
                    y: 6*screenH/8,        
                },
                {
                    delay: 4100-1000,
                    duration: 700,
                    ease: 'Back.easeIn',
                    y: screenH,
                    onComplete: () => {
                        cgRect2.destroy();
                    }
                }
            ]
        });
    
    }else{
        this.tweens.chain({
            targets: cgRect1,
            tweens:[
                {
                    duration: 800,
                    ease: 'Cubic.easeOut',
                    y: -2*screenH/8,
                    onStart: () => {
                        cgRect1.y = -screenH/2;
                    }
                },
            ]
        });
        this.tweens.chain({
            targets: cgRect2,
            tweens:[
                {
                    duration: 800,
                    ease: 'Cubic.easeOut',
                    y: 6*screenH/8,
                    onStart: () => {
                        cgRect2.y = screenH;
                    }
                },
            ]
        });
    
    }


    var cgSpriteColor = cgSprite.postFX.addColorMatrix();
    cgSpriteColor.brightness(0.2)

    var cgSpeechBubbleColor = cgSpeechBubble.postFX.addColorMatrix();

    this.tweens.addCounter({
        from: 0.2,
        to: 1,
        delay: 600+250+400,
        duration: 200,
        onUpdate: (tween) => {
            cgSpriteColor.brightness(tween.getValue())
        }
    })

    if(startRound){
        this.tweens.addCounter({
            from: 1,
            to: 0.2,
            delay: 600+250+(110*4)+3000-200-250+200+250-400,
            duration: 200,
            onUpdate: (tween) => {
                cgSpriteColor.brightness(tween.getValue())
            },
            onComplete: () => {
            }
        })    
    }

    var chain2 = this.tweens.chain({
        targets: cgSprite,
        tweens:[
            {
                duration: 600,
                ease: 'Cubic.easeOut',
                delay: 250,
                x: 110,
            },
            {
                duration: 130,
                delay: 400,
                ease: 'Circ.easeOut',
                yoyo: true,
//                repeat: 1,
//                repeatDelay: 50,
                y: '-=6',
                onStart: () => {
                    this.sfxBubble.play();
                },
                onComplete: () => {
//                    if(!startRound){
//                        chain2.pause();
//                    }
                }
            },
            {
                duration: 80,
//                delay: 400,
                ease: 'Circ.easeOut',
                yoyo: true,
//                repeat: 1,
//                repeatDelay: 50,
                y: '-=3',
                onStart: () => {
//                    this.sfxBubble.play();
                },
                onComplete: () => {
                    if(!startRound){
                        chain2.pause();
                    }
                }
            },
            {
                duration: 3000-200-250+300-400,
                x: 110,
            },
            {
                duration: 650,
                ease: 'Back.easeIn',
                x: 400,
                onComplete: () => {
                    cgSprite.destroy();
                }
            },
        ]
    });


    this.bitmapLabel = this.add.bitmapText(186, 60, 'speech', '')
			.setMaxWidth(85)

            this.bitmapLabel.depth = 6;

//            this.bitmapLabel.fontSize = 16;


            this.time.addEvent({
                delay: 900+400+75,
                callback: () => {
                    var speechText;
                    if(startRound){
                        if(currentChar == "tiger"){
                            if(currentRound == 1){
                                speechText = "    Let\'s\n  get this\n fired up!";//the spaces are important
                            }else if(currentRound == 2){
                                speechText = "Volleyball? Erm, if you insist..."
                            }
                        }    
                    }else{
                        if(currentChar == "tiger"){
                            if(currentRound == 1){
                                if(percentageRevealed == 100){
                                    speechText = "Wha-?! Seared to perfection!";
                                }else if(percentageRevealed >= 90){
                                    speechText = "This one\'s on the house!";
                                }else{
                                    speechText = "    What?\n    Can\'t\n appreciate\ngood meat?"
                                }
                            }else if(currentRound == 2){
                                speechText = "    S-stop\n    staring\n   there!"
                            }
                        }    

                    }
                    this.typewriteBitmapText(speechText);
                }
            })

            this.tweens.addCounter({
                from: 0.2,
                to: 1,
                duration: 120,
//                delay: 800+200,
                delay: 900+400,
                onUpdate: (tween) => {
                    cgSpeechBubbleColor.brightness(tween.getValue())
                }
            })



            if(startingRound){
                this.tweens.addCounter({
                    from: 1,
                    to: 0.2,
                    duration: 120,
                    delay: 4100-800-60-60+800+60+60,
                    onUpdate: (tween) => {
                        cgSpeechBubbleColor.brightness(tween.getValue())
                    }
                })
                }

            var chain3 = this.tweens.chain({
                targets: [cgSpeechBubble,this.bitmapLabel],
                tweens:[
                    {
                    delay: 900+400,
                    duration: 60,
                    ease: 'Sine.easeOut',
                    angle: 7,
                    alpha: 1,
                    },
                    {
                        duration: 60,
                        ease: 'Sine.easeIn',
                        angle: 0,
                        onComplete: () => {
                            if(!startRound){
                                chain3.pause();
                            }
                        }
                    },
                    {
                        delay: 4100-800-60-60-200-200,
                        duration: 60,
                        ease: 'Sine.easeOut',
                        angle: 7,
                    },
                    {
                        duration: 60,
                        ease: 'Sine.easeIn',
                        angle: -30,
                        alpha: 0,
                        onComplete: () => {
                            cgSpeechBubble.destroy();
                            this.bitmapLabel.destroy();
                            
                        }
                    }
                ]
        
            })

}

typewriteBitmapText(text)
{
	this.bitmapLabel.setText(text)

	const bounds = this.bitmapLabel.getTextBounds(false)
	const wrappedText = bounds['wrappedText'] || text

	this.bitmapLabel.setText('')

	const length = wrappedText.length
	let i = 0
	this.time.addEvent({
		callback: () => {
            if(this.bitmapLabel != undefined && text != undefined && wrappedText != undefined && wrappedText[i] != undefined){
                this.bitmapLabel.text += wrappedText[i]
                ++i    
            }
		},
		repeat: length - 1,
		delay: 40
	})
}


spawnShockwave(xPos = player.x-cam.scrollX, yPos = player.y-cam.scrollY){
    var shockwave = postFxPlugin.add(cam, { waveRadius: 0, powExponent: 0.3, waveWidth: 40 });
    shockwave.setCenter(xPos,yPos);

    //potential memory leak here, but this thing isnt recognizing postFxPlugin for some reason
    currentScene.tweens.add({
        targets: shockwave,
        duration: 1500,
        ease: 'Cubic.easeOut',
        waveRadius: screenW,
        waveWidth: 0,
    });
    
}

spawnBullBlobs(num = 1){
    if(num >= 1){
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
            bullBlobEnemy._vel = 1;
            bullBlobEnemy._startedTween = false;
            bullBlobEnemy._size = enemyArray[0]._size;
    
            UICam.ignore([bullBlobEnemy])
    
            enemyArray.push(bullBlobEnemy);
            totalBlobs++;
        }    
    }

}





spawnBullBoss(){



    //bull is 50x70

/*    var spawnArray = [];


    for(i=80;i<mapArray[0].length-80;i+=8){
        for(j=90;j<mapArray.length-90;j+=8){
            if (getTilesWithin(mapArray,i,j,50,70).includes(edgeColor) == false
        && getTilesWithin(mapArray,i,j,50,70).includes(transColor) == false){
                spawnArray.push([i,j]);
            }
        }
    }

    bullInitPos = spawnArray[Math.floor(Math.random()*spawnArray.length)];
    */

    var bullInitPos = [Phaser.Math.Between(60,screenH-60),Phaser.Math.Between(screenW*3/4,screenW-40)]

    var bullSpawnX = bullInitPos[1];
    var bullSpawnY = bullInitPos[0];

    this.bullCloudBack = currentScene.add.sprite(bullSpawnX,bullSpawnY,'cloudBack').setAlpha(0);
    bullEnemy = currentScene.add.sprite(bullSpawnX,bullSpawnY,'bullEnemy').play('bullEntrance1').setAlpha(0);
    this.bullCloudFront = currentScene.add.sprite(bullSpawnX,bullSpawnY,'cloudFront').setAlpha(0);

    var cloudBackTint = currentScene.add.sprite(bullSpawnX,bullSpawnY,'cloudBack').setAlpha(0);
    var bullEnemyTint = currentScene.add.sprite(bullSpawnX,bullSpawnY,'bullEnemy').play('bullEntrance1').setAlpha(0);
    var cloudFrontTint = currentScene.add.sprite(bullSpawnX,bullSpawnY,'cloudFront').setAlpha(0);

//    console.log("Bull position: (" + bullEnemy.x + "," + bullEnemy.y + ")")

    UICam.ignore([bullEnemy,bullEnemyTint,this.bullCloudBack,this.bullCloudFront,cloudBackTint,cloudFrontTint]);

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
                bullEnemy._vel = 2;
                bullEnemy._swingDir = -1;
                this.singTimer = 0;
                bullEnemy._blobSpawnTimer = 0;
                bullEnemy._blobSpawnTimerMax = 500;
                this._singCooldown = 200;
                bullEnemy._singRNG = 10;
                bullEnemy.depth = 1;
                bullEnemy._size = 1; //shrink down to 1/4
                bullEnemy._agoraCheck = 1;

                bullEnemyTint.x = cloudBackTint.x = cloudFrontTint.x = bullEnemy.x;
                bullEnemyTint.y = cloudBackTint.y = cloudFrontTint.y = bullEnemy.y;
                bullEnemyTint.depth = cloudBackTint.depth = cloudFrontTint.depth = 2;
                bullEnemyTint.setTintFill(0x000000);
                cloudBackTint.setTintFill(0x000000);
                cloudFrontTint.setTintFill(0x000000);
//                bullEnemy.setAlpha(0);
//                bullEnemyTint.setAlpha(0);

                this.bullCM = bullEnemy.postFX.addColorMatrix();
                this.cloudFCM = this.bullCloudFront.postFX.addColorMatrix();
                this.cloudBCM = this.bullCloudBack.postFX.addColorMatrix();

            
                enemyArray.push(bullEnemy);

//                this.debugSingTimer = this.add.bitmapText(10,10,'speech','');


            },
            tween: {
                targets: [bullEnemyTint,cloudBackTint,cloudFrontTint],
                alpha: 1,
                duration: 1300,
            }

        },
        {
            //maybe have it be a sharp spotlight entrance with sparkles instead of a fade from black
            from: 1500,
            run: () => {
                bullEnemyTint.setTintFill(0xffffff)
                cloudBackTint.setTintFill(0xffffff)
                cloudFrontTint.setTintFill(0xffffff)
                bullEnemy.setAlpha(1);
                this.bullCloudBack.setAlpha(1);
                this.bullCloudFront.setAlpha(1);
            },
            tween: {
                targets: [bullEnemyTint,cloudBackTint,cloudFrontTint],
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
                cloudBackTint.destroy();
                cloudFrontTint.destroy();
                bullEnemy.anims.play('bullEntrance2')
                this.spawnBullBlobs(3);
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
                this.resetSing();
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
                y: '+=2*bullEnemy._swingDir',
                ease: 'power2',
                duration: 300,
                yoyo: true,
//                repeat: 5
            }
        },
        {
            from: 600,
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
            from: 400,
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
                sfxSwing.play();
                sfxBullSwingGrunt.play();
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
                duration: 300,
                yoyo: true,
//                repeat: 5
            }
        },
        {
            from: 600,
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
            from: 400,
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
                sfxSwing.play();
                sfxBullSwingGrunt.play();
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


spawnPlayer(){


//    mapBlitter = currentScene.add.blitter(0,0,'baseTiles')
    layerRT = currentScene.add.renderTexture(0,0,imageWidth,imageHeight).setOrigin(0,0);
    drawRT = currentScene.add.renderTexture(0,0,imageWidth,imageHeight).setOrigin(0,0);

//    layerRT.postFX.addBloom(0xffffff,1,1,0.5,3,4)
    this.layerRTFX = layerRT.postFX.addGlow(0xfff194,0.2,0.2,false,0.3,2)

    currentScene.tweens.add({
        targets: this.layerRTFX,
        outerStrength: 1,
        innerStrength: 1,
        distance: 6,
        ease: 'Sine.easeInOut',
        duration: 1000,
        loop: -1,
        yoyo: true
    })

    this.updateDrawTexture();

//    layerRT.x = screenW/2
//    layerRT.y = screenH/2
//    layerRT.depth = 2;
    

    mapArray = [...Array(imageWidth)].map(e => Array(imageHeight).fill(0));

    layerRT.beginDraw();
    
    for (i=0;i<imageWidth;i++){
        for (j=0;j<imageHeight;j++){
            if(i >= initSquareX+1 && i <= (initSquareW)-1 && j >= initSquareY+1 && j <= (initSquareH)-1){
                mapArray[i][j] = transColor;
                layerRT.batchDrawFrame('baseTiles',transColor,i,j)
//                layerRT.batchDrawFrame('pixel', undefined, i, j, 1, tileTint[transColor]);
            }else if(i<borderWidth || j<borderWidth || i>imageWidth-borderWidth || j>imageHeight-borderWidth
                || i>screenW-borderWidth || j>screenH-borderWidth
            ){
                mapArray[i][j] = borderColor;
//                layerRT.batchDrawFrame('baseTiles',borderColor,i,j)
                layerRT.batchDrawFrame('baseTiles',baseColor,i,j)
//                layerRT.batchDrawFrame('pixel', undefined, i, j, 1, tileTint[borderColor]);
            }else if(i >= initSquareX && i <= (initSquareW) && j >= initSquareY && j <= (initSquareH)){
                mapArray[i][j] = edgeColor
                layerRT.batchDrawFrame('baseTiles',edgeColor,i,j)
//                layerRT.batchDrawFrame('pixel', undefined, i, j, 1, tileTint[edgeColor]);
            }else{
                mapArray[i][j] = baseColor;
                layerRT.batchDrawFrame('baseTiles',baseColor,i,j)
//                layerRT.batchDrawFrame('pixel', undefined, i, j, 1, tileTint[baseColor]);
            }
        }
    }

    layerRT.endDraw();



//    console.log(mapArray[0])
    var edgeArray = [];


    //somethings wrong here

    for(i=0;i<mapArray.length;i+=2){
        for(j=0;j<mapArray[0].length;j+=2){
//            console.log("(i, j): (" + i + ", " + j + ")")
            if (mapArray[i][j]==edgeColor){
                edgeArray.push([i,j]);
            }
        }
    }

//    console.log(mapArray);
    var initPos = edgeArray[Math.floor(Math.random()*edgeArray.length)]
//    console.log(initPos)
    var initX = initPos[0];
    var initY = initPos[1];
    initPixel[0] = initX;
    initPixel[1] = initY;

//    console.log(initX)
//    console.log(initY)    


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


//    layer = map.createBlankLayer('mainDraw',drawTileset);
//    layer.putTilesAt(mapArray,0,0,imageWidth,imageHeight);


//    map = currentScene.make.tilemap({data: mapArray,tileWidth: 1,tileHeight: 1});
//    drawTileset = map.addTilesetImage('baseTiles',null,1,1);
//    layer = map.createLayer(0,drawTileset,0,0).setVisible(false);
//    layerRT.draw(layer,0,0);




    rt = currentScene.add.renderTexture(0, 0, imageWidth, imageHeight).setOrigin(0.0);

    rtMask = rt.createBitmapMask();

        
    finishedImage = currentScene.add.image(0,0,'backgroundImage').setOrigin(0,0);
    gagFinishedImage = currentScene.add.image(0,0,'gagImage').setOrigin(0,0).setVisible(false);

    finishedImage.setMask(rtMask)
    gagFinishedImage.setMask(rtMask)

    this.imgBright = finishedImage.postFX.addColorMatrix();
    this.gagimgBright = gagFinishedImage.postFX.addColorMatrix();


    stopTimerText = currentScene.add.text(screenW/2,screenH/2,'',{fontSize: 48, color: "#ee1111"}).setOrigin(1,0.5);
    stopTimerTextRight = currentScene.add.text(-5+screenW/2,-8+screenH/2,'',{fontSize: 24, color: "#ee1111"}).setOrigin(0,0.5);
    stopTimerText.setVisible(false)
    stopTimerTextRight.setVisible(false)

    this.revealImage();



    //this is where you uhhhhhh spawn the boss

    this.spawnBullBoss();
    this.calculateScore();
    this.percPopup();
    this.makeReviveGems();
    cam.pan(initX,initY,500,'Power2')

    
    UICam.ignore([player,layerRT,rt,drawRT,finishedImage, gagFinishedImage, playerAfter1, playerAfter2,playerAfter3, reviveGems]);
    cam.ignore([stopTimerText,stopTimerTextRight])


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
            this.addSparkles(10);
            player.setVisible(true);
            sfxSpawn.play();
//            glowSprite.x = player.x;
//            glowSprite.y = player.y;
//            glowSprite.setVisible(true);
//            glowSprite.play({key: 'glowAnim'});
//            glowShine();
            this.glowShine2();
            isMoving = false;
            cam.startFollow(player,true,0.1,0.1);
            for (i=0;i<numReviveGems;i++){
                reviveGems[i].destroy();
            }
            reviveGems = [];

            this.showTimer();
        }
    }).pause();


    currentScene.time.delayedCall(1500, () =>
        {
            playerState = "revive";
            reviveDuration = 0;        
            reviveTween12.play();
        });

}


showTimer(){

    this.hurryUp = false;
    this.hurryUp2 = false;
                //140 seconds?
                timeOut = false;
                roundTimer = currentScene.time.delayedCall(roundTimerMax*1000, () =>
                    {
                        console.log("GEIM OBER")
                    });
    
    var radius = { tl: 5, tr: 5, bl: 5, br: 5 };

    this.timerBarBack = currentScene.add.rectangle(55,screenH-55,70,15,0x000000);

    timerBar = currentScene.add.rexRoundRectangleProgress({
        x: 55, y: screenH-55,
        width: 70, height: 15,
//        radius: radius,
        barColor: 0x8b6a9c,//COLOR_MAIN,
        trackColor: undefined,//COLOR_DARK,
        trackStrokeColor: undefined,//COLOR_LIGHT,
        trackStrokeThickness: 0,
        value: roundTimer/roundTimerMax,
    });


    //make mask here and replace progress bar with image?

    this.timerBarBorder = currentScene.add.image(55,screenH-55,'timerBorder');
    this.timerBarClock = currentScene.add.image(20,screenH-55-7,'timerClock');

    cam.ignore([timerBar, this.timerBarBorder, this.timerBarBack, this.timerBarClock]);
}

updateTimer(){
    if(!isMoving && roundTimer.paused){
        roundTimer.paused = false;
    }else if(isMoving && !roundTimer.paused){
        roundTimer.paused = true;
    }
    timerBar.value = 1-(roundTimer.getElapsedSeconds()/roundTimerMax);

    if(roundTimerMax-roundTimer.getElapsedSeconds() < 30 && !this.hurryUp){
        this.hurryUp = true;
        this.sfxHurryUp.play();

        //code here for muting music, then speeding it up
        this.sfxMusic.pause();
        this.sfxMusic.setRate(1.25);
        this.sfxHurryUp.on('complete',() => this.sfxMusic.resume());

        //code here for popup

        //code here for adding color tween on timer bar
    }

    if(roundTimerMax-roundTimer.getElapsedSeconds() < 11 && !this.hurryUp2){
        this.hurryUp2 = true;

        //that popup timer like in freeze
        //maybe a ticking sound, or a beeping one
        //and maybe the screen tints in and out

    }
}





moveRight(){
    while(((mapArray[player.x+moveDist+1][player.y] == drawColor && (aPress || isErasing))
        || (mapArray[player.x+moveDist+1][player.y] == baseColor 
        && mapArray[player.x+moveDist+2][player.y] != drawColor && aPress)
        || mapArray[player.x+moveDist+1][player.y] == edgeColor) && moveDist < speed){
            moveDist++;
        }
        player.x += moveDist;
        if(aPress){
            if(mapArray[player.x][player.y] == baseColor){
                for(i=oldPosX+1;i<=player.x;i++){
                    if(mapArray[i][oldPosY] == baseColor){
//                        map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                        drawRT.batchDrawFrame('baseTiles',drawColor,i,oldPosY);
                        mapArray[i][oldPosY] = drawColor
                        if(startBaseColor.length == 0 && mapArray[i-1][oldPosY] == edgeColor){
                            startBaseColor = [i-1,oldPosY];
//                            console.log(startBaseColor[0])
                            initPixel = startBaseColor
                        }
                    }
                }    
            }else if(mapArray[player.x-1][player.y] == drawColor){
                for(i=oldPosX;i<=player.x-1;i++){
                    if(mapArray[i][oldPosY] == drawColor){
//                        map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                        drawRT.erase('pixel',i,oldPosY);
                        mapArray[i][oldPosY] = baseColor
                    }
                }    
            }else if(mapArray[player.x][player.y] == edgeColor && tileIndexC == drawColor){
                for(i=oldPosX+1;i<=player.x-1;i++){
                    if(mapArray[i][oldPosY] == baseColor){
//                        map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                        drawRT.batchDrawFrame('baseTiles',drawColor,i,oldPosY);
                        mapArray[i][oldPosY] = drawColor
                    }else if(mapArray[i][oldPosY] == edgeColor){
                        player.x--;
                    }
                }
                this.fillTiles();
            }
                
        }else if(isErasing){
            for(i=oldPosX;i<=player.x-1;i++){
                if(mapArray[i][oldPosY] == drawColor){
//                    map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                    drawRT.erase('pixel',i,oldPosY);
                    mapArray[i][oldPosY] = baseColor
                }
            }    

        }

}


moveLeft(){

//    moveDist = 0;

    while(((mapArray[player.x-moveDist-1][player.y] == drawColor && (aPress || isErasing))
        || (mapArray[player.x-moveDist-1][player.y] == baseColor && 
        mapArray[player.x-moveDist-2][player.y] != drawColor && aPress)
        || mapArray[player.x-moveDist-1][player.y] == edgeColor) && moveDist < speed){
            moveDist++;
        }
        player.x -= moveDist;
        if(aPress){
            if(mapArray[player.x][player.y] == baseColor){
                for(i=player.x;i<=oldPosX-1;i++){
                    if(mapArray[i][oldPosY] == baseColor){
                        //map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                        drawRT.batchDrawFrame('baseTiles',drawColor,i,oldPosY);
                        mapArray[i][oldPosY] = drawColor;
                        if(startBaseColor.length == 0 && mapArray[i+1][oldPosY] == edgeColor){
                            startBaseColor = [i+1,oldPosY];
                            initPixel = startBaseColor
                        }
                    }
                }
            }else if(mapArray[player.x+1][player.y] == drawColor){
                for(i=player.x+1;i<=oldPosX;i++){
                    if(mapArray[i][oldPosY] == drawColor){
//                        map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                        drawRT.erase('pixel',i,oldPosY);
                        mapArray[i][oldPosY] = baseColor;
                    }
                }    
            }else if(mapArray[player.x][player.y] == edgeColor && tileIndexC == drawColor){
                for(i=player.x+1;i<=oldPosX-1;i++){
                    if(mapArray[i][oldPosY] == baseColor){
//                        map.putTileAt(drawColor,i,oldPosY,undefined,'mainDraw');
                        drawRT.batchDrawFrame('baseTiles',drawColor,i,oldPosY);
                        mapArray[i][oldPosY] = drawColor;
                    }else if(mapArray[i,oldPosY] == edgeColor){
                        player.x++;
                    }
                }    
                this.fillTiles();
            }
                
        }else if(isErasing){
            for(i=player.x+1;i<=oldPosX;i++){
                if(mapArray[i][oldPosY] == drawColor){
//                    map.putTileAt(baseColor,i,oldPosY,undefined,'mainDraw');
                    drawRT.erase('pixel',i,oldPosY);
                    mapArray[i][oldPosY] = baseColor;
                }
            }    

        }

}


moveUp(){
    while(((mapArray[player.x][player.y-moveDist-1] == drawColor && (aPress || isErasing))
        || (mapArray[player.x][player.y-moveDist-1] == baseColor && 
        mapArray[player.x][player.y-moveDist-2] != drawColor && aPress)
        || mapArray[player.x][player.y-moveDist-1] == edgeColor) && moveDist < speed){
            moveDist++;
        }
        player.y -= moveDist;
        if(aPress){
            if(mapArray[player.x][player.y] == baseColor){
                for(i=player.y;i<=oldPosY-1;i++){
                    if(mapArray[oldPosX][i] == baseColor){
//                        map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                        drawRT.batchDrawFrame('baseTiles',drawColor,oldPosX,i);
                        mapArray[oldPosX][i] = drawColor;
                        if(startBaseColor.length == 0 && mapArray[oldPosX][i+1] == edgeColor){
                            startBaseColor = [oldPosX,i+1];
                            initPixel = startBaseColor;
                        }
                    }
                }    
            }else if(mapArray[player.x][player.y+1] == drawColor){
                for(i=player.y+1;i<=oldPosY;i++){
                    if(mapArray[oldPosX][i] == drawColor){
//                        map.putTileAt(baseColor,oldPosX,i,undefined,'mainDraw');
                        drawRT.erase('pixel',oldPosX,i);
                        mapArray[oldPosX][i] = baseColor;
                    }
                }    
            }else if(mapArray[player.x][player.y] == edgeColor && tileIndexC == drawColor){
                for(i=player.y+1;i<=oldPosY-1;i++){
                    if(mapArray[oldPosX][i] == baseColor){
//                        map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                        drawRT.batchDrawFrame('baseTiles',drawColor,oldPosX,i);
                        mapArray[oldPosX][i] = drawColor;
                    }else if(mapArray[oldPosX][i] == edgeColor){
                        player.y++;
                    }
                }    
                this.fillTiles();
            }
                
        }else if(isErasing){
            for(i=player.y+1;i<=oldPosY;i++){
                if(mapArray[oldPosX][i] == drawColor){
//                    map.putTileAt(baseColor,oldPosX,i,undefined,'mainDraw');
                    drawRT.erase('pixel',oldPosX,i);
                    mapArray[oldPosX][i] = baseColor;
                }
            }    

        }

}


moveDown(){
    while(((mapArray[player.x][player.y+moveDist+1] == drawColor && (aPress || isErasing))
        || (mapArray[player.x][player.y+moveDist+1] == baseColor && 
        mapArray[player.x][player.y+moveDist+2] != drawColor && aPress)
        || mapArray[player.x][player.y+moveDist+1] == edgeColor) && moveDist < speed){
            moveDist++;
        }
        player.y += moveDist;
        if(aPress){
            if(mapArray[player.x][player.y] == baseColor){
                for(i=oldPosY+1;i<=player.y;i++){
                    if(mapArray[oldPosX][i] == baseColor){
//                        map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                        drawRT.batchDrawFrame('baseTiles',drawColor,oldPosX,i);
                        mapArray[oldPosX][i] = drawColor;
//                        console.log(mapArray[oldPosX,i-1] == edgeColor)
                        //console.log(startBaseColor);
                        if(startBaseColor.length == 0 && mapArray[oldPosX][i-1] == edgeColor){
                            startBaseColor = [oldPosX,i-1];
                            initPixel = startBaseColor;
//                            console.log("initPixel: " + initPixel);
                        }
                    }
                }    
            }else if(mapArray[player.x][player.y-1] == drawColor){
                for(i=oldPosY;i<=player.y-1;i++){
                    if(mapArray[oldPosX][i] == drawColor){
                        //map.putTileAt(baseColor,oldPosX,i,undefined,'mainDraw');
                        drawRT.erase('pixel',oldPosX,i);
                        mapArray[oldPosX][i] = baseColor;
                    }
                }    
            }else if(mapArray[player.x][player.y] == edgeColor && tileIndexC == drawColor){
                for(i=oldPosY+1;i<=player.y-1;i++){
                    if(mapArray[oldPosX][i] == baseColor){
                        //map.putTileAt(drawColor,oldPosX,i,undefined,'mainDraw');
                        drawRT.batchDrawFrame('baseTiles',drawColor,oldPosX,i);
                        mapArray[oldPosX][i] = drawColor;
                    }else if(mapArray[oldPosX][i] == edgeColor){
                        player.y--;
                    }
                }    
                this.fillTiles();
            }
                
        }else if(isErasing){
            for(i=oldPosY;i<=player.y-1;i++){
                if(mapArray[oldPosX][i] == drawColor){
                    //map.putTileAt(baseColor,oldPosX,i,undefined,'mainDraw');
                    drawRT.erase('pixel',oldPosX,i);
                    mapArray[oldPosX][i] = baseColor;
                }
            }    

        }

}




update ()
{


    
    leftPress = cursors.left.isDown;
    rightPress = cursors.right.isDown;
    upPress = cursors.up.isDown;
    downPress = cursors.down.isDown;
    aPress = keyA.isDown;
//    bPress = keyB.isDown;
//    cPress = keyC.isDown;
//    dPress = keyD.isDown; //kill this one
//    this.ePress = this.keyE.isDown;
//    qPress = keyQ.isDown;
//    wPress = keyW.isDown;
    spacePress = keySpace.isDown;



    if(bullComb != null){
        if(bullComb.x > borderWidth + cam.scrollX && !bullComb._hasHit && !currentScene.anims.paused){
            bullComb.x-=20;
            if(this.getTilesWithin(mapArray,bullComb.x,bullComb.y,20,8).includes(drawColor)){
                this.killPlayer(bullComb.x,bullComb.y);
            }
        }else if(bullComb.x < borderWidth + cam.scrollX && !bullComb._hasHit && !currentScene.anims.paused){
            sfxExplosion5.play();
            this.addSparkles(4,bullComb.x + cam.scrollX,bullComb.y);
            cam.shake(200,0.03);
            UICam.shake(200,0.03);
            bullComb.x += 25;
            bullComb._hasHit = true
        }else if(!currentScene.anims.paused){
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

    if (spacePress){
/*        console.log("Checking sides by order of 2")
        console.log("._._._.")
        console.log("|" + mapArray[player.x-2,player.y-2] + "|" + mapArray[player.x,player.y-2] + "|" + mapArray[player.x+2,player.y-2])
        console.log("|" + mapArray[player.x-2,player.y] + "|" + mapArray[player.x,player.y] + "|" + mapArray[player.x+2,player.y])
        console.log("|" + mapArray[player.x-2,player.y+2] + "|" + mapArray[player.x,player.y+2] + "|" + mapArray[player.x+2,player.y+2])
        console.log("._._._.")
        console.log("****************************")
*/
        console.log("Checking sides by order of 1")
        console.log("._._._.")
        console.log("|" + mapArray[player.x-1][player.y-1] + "|" + mapArray[player.x][player.y-1] + "|" + mapArray[player.x+1][player.y-1])
        console.log("|" + mapArray[player.x-1][player.y] + "|" + mapArray[player.x][player.y] + "|" + mapArray[player.x+1][player.y])
        console.log("|" + mapArray[player.x-1][player.y+1] + "|" + mapArray[player.x][player.y+1] + "|" + mapArray[player.x+1][player.y+1])
        console.log("._._._.")

        console.log("4 = base color")
        console.log("3 = draw color")
        console.log("2 = edge color")
        console.log("1 = trans color")
        console.log("0 = border color")
    }






    if(startingRound){



    }else{
    if (boxRoulette){
//        console.log('hi')
        if((aPress && boxTimer > 1) || boxTimer > 1000){

            boxTimer = 1111
            boxRoulette = false;
            scoreText.setVisible(true);
            scoreTextRight.setVisible(true);


            if(this.buttonPressingSprite != undefined){
                this.buttonPressingSprite.destroy();
            }
//            confettiEmitter.setParticleTint(GetRandom(tints));
            confettiEmitter.explode();

//            sfxCheer.play();
//            sfxLightning.play();

            this.time.addEvent({
                delay: 70,
                callback: () => {
                    this.sfxApplause.play()
                    this.sfxCheer2.play();
                }                
            })
//            this.sfxApplause.play()



            rouletteRect.destroy();
            this.spawnPlayer();
            

        }else if(boxTimer == 0 || boxTimer == 20 || (boxTimer > 40 && boxTimer%1 == 0)){
//            if(boxTimer%10 == 0){

                    if(boxTimer > 40 && this.buttonPressingSprite == undefined){
                        this.buttonPressingSprite = this.add.sprite(3*screenW/4,3*screenH/4,'buttonPressing').play('buttonPressingAnim');
                    }

                    sfxRoulette.play();

                    //change it so it starts at center o fmap
                    /*
                    initSquareX = Math.floor(((imageWidth/4) + Math.random()*(imageWidth/4))/2)*2;
                    initSquareY =  Math.floor(((imageHeight/4) + Math.random()*(imageHeight/4))/2)*2;
                    initSquareW = Math.floor(((imageWidth/4) + Math.random()*(imageWidth/4))*1.3/2)*2;
                    initSquareH = Math.floor(((imageHeight/4) + Math.random()*(imageHeight/4))*1.3/2)*2;
                    */

                    initSquareX = Math.floor(((screenW/4) + Math.random()*(screenW/4))/2)*2;
                    initSquareY =  Math.floor(((screenH/4) + Math.random()*(screenH/4))/2)*2;
                    initSquareW = Math.floor(((screenW/4) + Math.random()*(screenW/4))*1.3/2)*2;
                    initSquareH = Math.floor(((screenH/4) + Math.random()*(screenH/4))*1.3/2)*2;
                
        
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
            cam.pan(0,0,600,'Power3')
            
        }

        boxTimer++;
    }else{

//        if(isMoving){
  //          updateRevive();
    //      }

    if (!isMoving){
//        console.log("player.x: " + player.x)
//        console.log("player.y: " + player.y)

/*        if(this.scrollImage != undefined){
            if(this.scrollImage.alpha == 1){
                this.scrollImage.alpha = 0.5;
            }else{
                this.scrollImage.alpha = 1;
            }
        }
*/

        oldPosX = player.x;
        oldPosY = player.y;
        oldHealth = currentHealth;

        moveDist = 0;
        fillArray = [];


        if(qPress){
            this.decreaseHealth();
        }
        if(wPress){
            this.increaseHealth();
        }


//        if(player.x < imageWidth-borderWidth - (1+this.noScroll*(imageWidth-screenW)) && player.x > borderWidth
//             && player.y > borderWidth && player.y < imageHeight-borderWidth - (1+this.noScroll*(imageHeight-screenH))){
        if(player.x < imageWidth && player.x > 0
            && player.y > 0 && player.y < imageHeight){
   
            tileIndexC = mapArray[player.x][player.y];
            tileIndexL = mapArray[player.x-1][player.y];
            tileIndexR = mapArray[player.x+1][player.y];
            tileIndexU = mapArray[player.x][player.y-1];
            tileIndexD = mapArray[player.x][player.y+1];
            


            drawRT.beginDraw();
            if(aPress){
                isErasing = false;
                startBaseColor = [];
            }
            
            if (!upPress && !downPress){
                if (rightPress && !leftPress){
                    //right
                    if(tileIndexR == edgeColor){
                        this.moveRight();
                    }else if(tileIndexU == edgeColor && mapArray[player.x][player.y-3] != edgeColor 
                    && mapArray[player.x+2][player.y-2] == edgeColor && !aPress){
                        this.moveUp();
                    }else if(tileIndexD == edgeColor && mapArray[player.x][player.y+3] != edgeColor 
                    && mapArray[player.x+2][player.y+2] == edgeColor && !aPress){
                        this.moveDown();
                    }else{
                        this.moveRight();
                    }
                }else if(leftPress && !rightPress){
                    //left
                    if(tileIndexL == edgeColor){
                        this.moveLeft();
                    }else if(tileIndexU == edgeColor && mapArray[player.x][player.y-3] != edgeColor 
                    && mapArray[player.x-2][player.y-2] == edgeColor && !aPress){
                        this.moveUp();
                    }else if(tileIndexD == edgeColor && mapArray[player.x][player.y+3] != edgeColor 
                    && mapArray[player.x-2][player.y+2] == edgeColor && !aPress){
                        this.moveDown();
                    }else{
                        this.moveLeft();
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
                                    this.moveRight();
                                }else if((tileIndexU == baseColor 
                                && (tileIndexL == drawColor || tileIndexR == drawColor || tileIndexR == edgeColor)) 
                                    || tileIndexR == transColor || tileIndexR == borderColor){
                                    this.moveUp();
                                }else if(tileIndexC == edgeColor && tileIndexU == baseColor && tileIndexR == baseColor){
                                    this.moveUp();
                                }
                            }else{
                                if(tileIndexR == edgeColor){
                                    this.moveRight();
                                }else if(tileIndexU == edgeColor){
                                    this.moveUp();
                                }
                            }

                    }else if(leftPress && !rightPress){
                        //up left

                        
                        if(aPress){
                            if((tileIndexL == baseColor 
                            && (tileIndexD == drawColor || tileIndexU == drawColor || tileIndexU == edgeColor))
                                || tileIndexU == transColor || tileIndexU == borderColor){
                                this.moveLeft();
                            }else if((tileIndexU == baseColor 
                            && (tileIndexR == drawColor || tileIndexL == drawColor || tileIndexL == edgeColor)) 
                                || tileIndexL == transColor || tileIndexL == borderColor){
                                this.moveUp();
                            }else if(tileIndexC == edgeColor && tileIndexU == baseColor && tileIndexL == baseColor){
                                this.moveUp();
                            }
                        }else{
                            if(tileIndexL == edgeColor){
                                this.moveLeft();
                            }else if(tileIndexU == edgeColor){
                                this.moveUp();
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
                                this.moveRight();
                            }else if((tileIndexD == baseColor 
                            && (tileIndexL == drawColor || tileIndexR == drawColor || tileIndexR == edgeColor)) 
                                || tileIndexR == transColor || tileIndexR == borderColor){
                                this.moveDown();
                            }else if(tileIndexC == edgeColor && tileIndexD == baseColor && tileIndexR == baseColor){
                                this.moveDown();
                            }
                        }else{
                            if(tileIndexR == edgeColor){
                                this.moveRight();
                            }else if(tileIndexD == edgeColor){
                                this.moveDown();
                            }
                        }


                    }else if(leftPress && !rightPress){
                        //down left

                        if(aPress){
                            if((tileIndexL == baseColor 
                            && (tileIndexU == drawColor || tileIndexD == drawColor || tileIndexD == edgeColor))
                                || tileIndexD == transColor || tileIndexD == borderColor){
                                this.moveLeft();
                            }else if((tileIndexD == baseColor 
                            && (tileIndexR == drawColor || tileIndexL == drawColor || tileIndexL == edgeColor)) 
                                || tileIndexL == transColor || tileIndexL == borderColor){
                                this.moveDown();
                            }else if(tileIndexC == edgeColor && tileIndexD == baseColor && tileIndexL == baseColor){
                                this.moveDown();
                            }
                        }else{
                            if(tileIndexL == edgeColor){
                                this.moveLeft();
                            }else if(tileIndexD == edgeColor){
                                this.moveDown();
                            }
                        }

                    }
                }
            }
             if (!leftPress && !rightPress){
                if (upPress && !downPress){
                    //up
                    if(tileIndexU == edgeColor){
                        this.moveUp();
                    }else if(tileIndexL == edgeColor && mapArray[player.x-3][player.y] != edgeColor 
                    && mapArray[player.x-2][player.y-2] == edgeColor && !aPress){
                        this.moveLeft();
                    }else if(tileIndexR == edgeColor && mapArray[player.x+3][player.y] != edgeColor 
                    && mapArray[player.x+2][player.y-2] == edgeColor && !aPress){
                        this.moveRight();
                    }else{
                        this.moveUp();
                    }
                }else if(downPress && !upPress){
                    //down
                    if(tileIndexD == edgeColor){
                        this.moveDown();
                    }else if(tileIndexL == edgeColor && mapArray[player.x-3][player.y] != edgeColor 
                    && mapArray[player.x-2][player.y+2] == edgeColor && !aPress){
                        this.moveLeft();
                    }else if(tileIndexR == edgeColor && mapArray[player.x+3][player.y] != edgeColor 
                    && mapArray[player.x+2][player.y+2] == edgeColor && !aPress){
                        this.moveRight();
                    }else{
                        this.moveDown();
                    }
                }
                
            }


            //erase when not pressing anything
//            if(!leftPress && !rightPress && !upPress && !downPress && !aPress && tileIndexC == drawColor){
            if(!aPress && tileIndexC == drawColor){
                isErasing = true;
                moveDist = 0;
                if(tileIndexL == drawColor){
                    this.moveLeft();
                }else if(tileIndexR == drawColor){
                    this.moveRight();
                }else if(tileIndexU == drawColor){
                    this.moveUp();
                }else if(tileIndexD == drawColor){
                    this.moveDown();
                }


            }

            drawRT.endDraw();


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
                    //if(mapArray[player.x,player.y] == drawColor){
                        //initPixel = [oldPosX,oldPosY];
                        //console.log("initPixel: " + initPixel)
//                        console.log("HELLOOOOOO")
                    //}
                }
            }else if(tileIndexC == edgeColor){
                playerState = "NoDraw";
                //if(mapArray[player.x,player.y] == drawColor){
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

        this.spawnItem();
        
        
    

        if((percentageRevealed > 80 || cPress) && !bossKill && !isMoving && !bossKillStarted){
//            console.log('yeah you win!!!!')
            isMoving = true;
            bossKillStarted = true;
            this.winRound();
//            this.killBoss(true);
        }else if(bossKill && !bossKillStarted){
//            console.log("HIII")
            bossKillStarted = true;
            isMoving = true;

            this.killBoss();

        }


    
    }

    if(player != undefined && cam != undefined && timerBar != undefined && this.timerBarBorder != undefined && scoreText != undefined && scoreTextRight != undefined){
//        console.log("Relative Player X: " + (player.x - cam.scrollX));
//        console.log("Relative Player Y: " + (player.y - cam.scrollY));
        
        if(player.x - cam.scrollX < 100 && player.y - cam.scrollY > screenH - 80){
            if(timerBar.alpha > 0.4){
                timerBar.alpha -= 0.05;
                this.timerBarBorder.alpha -= 0.05;
                this.timerBarBack.alpha -= 0.05;
                this.timerBarClock.alpha -= 0.05;
                scoreText.alpha -= 0.05;
                scoreTextRight.alpha -= 0.05;
            }
        }else{
            if(timerBar.alpha < 1){
                timerBar.alpha += 0.05;
                this.timerBarBorder.alpha += 0.05;
                this.timerBarBack.alpha += 0.05;
                this.timerBarClock.alpha += 0.05;
                scoreText.alpha += 0.05;
                scoreTextRight.alpha += 0.05;
    
            }
        }    
    }


    this.updateItem();

    this.updateAnimation();

    this.updateEnemy();

    this.updateKill();

    this.updateRevive();

    this.updateHealth();



    if(stopTimer != undefined){
        if(stopTimer.getRemaining() > 0){
            var timerText = (Math.floor((4000-stopTimer.getElapsed())/1000))
            var timerText2 = (Math.floor(4000-stopTimer.getElapsed())-(timerText*1000))
            stopTimerText.setText(timerText)
            stopTimerTextRight.setText(`.${timerText2}`)
            if(timerText2 < 100){
                stopTimerTextRight.setText(`.0${timerText2}`)
            }
        }    
    }

    if(roundTimer != undefined){
        this.updateTimer();
        if(roundTimer.getRemaining() == 0 && !timeOut){
            timeOut = true;
            this.killPlayer(player.x,player.y)
            if(tileIndexC == edgeColor){
                initPixel = [Math.floor(player.x),Math.floor(player.y)]
            }
//            decreaseHealth(6);
            console.log("TIME OUT!")
        }
    }

//    updateCamera();
}
    }

}


killBoss(){
    sfxExplosion2.play();
    cam.shake(300,0.05);
    UICam.shake(300,0.05);
    var bullBoss;

    enemyArray.forEach((enemy) => {
        if(enemy._isBoss){
            bullBoss = enemy;
        }else{
            enemy.destroy();
        }
    });

    bullBoss.scale = 1;
    bullBoss.play('bullDie');
    bullBoss.flipX = false;
    
    //maybe should just be the cloud he rides on that turns white and gets destroyed
    
    var bullEnemyTint = currentScene.add.sprite(bullBoss.x,bullBoss.y,'bullEnemy').play('bullDie').setAlpha(0);
    bullEnemyTint.depth = 2;
    bullEnemyTint.setTintFill(0xffffff);

    UICam.ignore([bullEnemyTint])


    currentScene.time.delayedCall(1000, () =>
        {
            currentScene.tweens.add({
                targets: bullEnemyTint,
                alpha: 1,
                duration: 1000
            })
        });

    currentScene.time.delayedCall(3000, () =>
        {
            bullEnemyTint.destroy();
            this.addExplosions(bullBoss.x,bullBoss.y,20,10)
            cam.shake()
            UICam.shake();
            //play a better one here?
            sfxExplosionLong.play();
            
            //change animation of boss to fallign here

            var bullDieTween = currentScene.tweens.chain({
                targets: bullEnemy,
                tweens:[
                    {
                        at: 0,
                        y: '-= 30',
                        duration: 400,
                        ease: 'Quint.easeOut'
                    },
                    {
                        from: 0,
                        y: screenH+100,
                        duration: 1500, //should it be based on initial y pos?
                        ease: 'Quint.easeIn'
                    },
                    {
                        from: 0,
                        duration: 1500,
                    }
                ]
            })

            bullDieTween.setCallback('onComplete',()=>{
                bullEnemy.destroy();
                this.winRound();
            });


        }
    )


}

updateDrawTexture(){



    regularDrawTween = currentScene.tweens.addCounter({
        from: 100,
        to: 0,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: 'Quad.easeInOut',
        onUpdate: function (tween)
        {
            const value = (tween.getValue())/100;
            drawRT.setTintFill(Phaser.Display.Color.GetColor(41 - (16*value), 195 - (57*value), 255 - (25*value)));
        }
    }).pause();

    rainbowDrawTween = currentScene.tweens.addCounter({
        from: 99,
        to: 0,
        duration: 500,
        repeat: -1,
        onUpdate: function (tween)
        {
            const value = (tween.getValue())/100;
            drawRT.setTintFill(tints[Math.floor(tints.length*value)]);
//            console.log(Math.floor(tints.length*value))
        }
    }).pause();
/*
    if(player._speedUp){
        if(drawTintTimer%10==0){

            drawRT.setTintFill(tints[tintIndex])
            tintIndex++;
            if(tintIndex >= tints.length){
                tintIndex=0;
            }
    
        }    
    }else{
        if(drawTintTimer%40==0){
            //0x29c3ff
            drawRT.setTintFill(aqua);
        }else if(drawTintTimer%40==20){
            drawRT.setTintFill(0x198ae6);
        }
    }

    drawTintTimer++;*/
}


glowShine(xPos = player.x,yPos = player.y,delayT = 56, playSFX = false){

    currentScene.time.addEvent({
        delay: delayT,
        callback: () => {
            if(playSFX){
                sfxSkyGlint.play()
            }
            var glowShineSprite = currentScene.add.sprite(xPos,yPos,'glow2').play('glowAnim2');
            glowShineSprite.setDepth(3);
            UICam.ignore([glowShineSprite]);
            glowShineSprite.on('animationcomplete', () => {
                glowShineSprite.destroy();
              });
        }
    });
}

glowShine2(xPos = player.x,yPos = player.y,delayT = 56){

    currentScene.time.addEvent({
        delay: delayT,
        callback: () => {
            var glowShineSprite2 = currentScene.add.sprite(xPos,yPos,'glow3').play('glowAnim3');
            glowShineSprite2.setDepth(3);
            UICam.ignore([glowShineSprite2]);
            glowShineSprite2.on('animationcomplete', () => {
                glowShineSprite2.destroy();
              });
        }
    });
}





spawnGagBlitter(){
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


speedupPopup(){

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

    currentScene.time.addEvent({
        delay: 60,
        repeat: 21,
        callback: () => {
            if (speedUpText.tint == 0xe373ff){
                speedUpText.setTint(0xff7e14);
            }else{
                speedUpText.setTint(0xe373ff);
            }
        }
    });


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


zapPopup(){

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

//it works
    currentScene.time.addEvent({
        delay: 60,
        repeat: 21,
        callback: () => {
            if (speedUpText.tint == 0xe373ff){
                speedUpText.setTint(0xff7e14);
            }else{
                speedUpText.setTint(0xe373ff);
            }
        }
    });

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



slowPopup(){

    var textYPos;

    if(player.y > screenH/2){
        textYPos = 80;
    }else{
        textYPos = 200;
    }
    var speedUpText = currentScene.add.image(screenW/2,textYPos,'popupText',2).setOrigin(0.5,0.25);
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


stopPopup(){

    var textYPos;

    if(player.y > screenH/2){
        textYPos = 80;
    }else{
        textYPos = 200;
    }
    var speedUpText = currentScene.add.image(screenW/2,textYPos,'popupText',3).setOrigin(0.5,0.25);
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

shrinkPopup(){

    var textYPos;

    if(player.y > screenH/2){
        textYPos = 80;
    }else{
        textYPos = 200;
    }
    var speedUpText = currentScene.add.image(screenW/2,textYPos,'popupText',4).setOrigin(0.5,0.25);
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




decreaseHealth(num = 1){

//    if(!gagMode){
        currentHealth -= num;
//    }

    if(currentHealth < 0){
        currentHealth = 0;
    }
//    console.log("Current health: " + currentHealth)


    firstI = -1;
    this.delayHealthCall();


//    healthImage = currentScene.add.image(healthContainer.x,healthContainer.y,'healthHUD').setFrame(0);


}

increaseHealth(num = 1){

    currentHealth += num;
    if(currentHealth > totalHealth){
        currentHealth = totalHealth;
    }
//    console.log("Current health: " + currentHealth)

    this.delayHealthCall();

    if(currentHealth >= 6 && gagMode){
            gagMode = false;
            isMoving = true;
            spawnItemRNG *= 0.5;


                    currentScene.time.addEvent({
                        delay: 1700,
                        callback: () => {
                            this.sfxMusic.setDetune(0);
                        }
                    })


                    currentScene.time.addEvent({
                        delay: 10,
                        repeat: 200,
                        callback: () => {
                            this.spawnGagBlitter();
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
                            this.revealImage();
                            this.calculateScore()
                            this.transScoreChange();
                            this.delayHealthCall();
        
        //                    healthChange = true;
        
                            healthImage.setFrame(0);
        
        //                    currentHealth = 7;
        
                        }
                    })
        



        
    }
}


delayHealthCall(){

//    healthContainer.iterate((child){
//        child.setTintFill(0xffffff);
//    });
//    healthContainer.y = 0;
    healthTimer = 200;

}


updateHealth(){

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

  


winRound(){

    this.plugins.get('rexsoundfadeplugin').fadeOut(this.sfxMusic, 200);

    cam.setBounds(0,0,imageWidth,imageHeight);

    this.sfxWinTune.play();
    this.sfxApplauseLong.play();

    timeElapsed += Math.floor(roundTimer.getElapsedSeconds());


    if(this.warningTween != undefined){
        if(this.warningTween.isPlaying()){
            this.warningTween.stop();
            this.warningImage.destroy();
        }    
    }


    roundWon = true;
    if(enemyArray.length > 0){
        for(i=0;i<enemyArray.length;i++){
            this.addSparkles(enemyArray[i].x,enemyArray[i].y)
            enemyArray[i].destroy();
        }
        enemyArray = [];
    }

    if(this.bullCloudFront != undefined){
        this.bullCloudFront.destroy();
        this.bullCloudBack.destroy();
    }

    if(itemArray.length > 0){
        for(i=0;i<itemArray.length;i++){
                itemArray[i].setTintFill(0xffffff);
                itemArray[i].setAlpha(1);
                itemArray[i]._itemDestroy.paused = false;

        }
    }

    timerBar.setVisible(false);
    this.timerBarBorder.setVisible(false);
    this.timerBarBack.setVisible(false);
    this.timerBarClock.setVisible(false);


    confettiEmitter2.resume();
//    confettiEmitter.explode()

    player.setAlpha(0);
    playerAfter1.setVisible(false);
    playerAfter2.setVisible(false);
    playerAfter3.setVisible(false);

    scoreText.setVisible(false);
    scoreTextRight.setVisible(false);


    cam.flash(1250);

    var fillScreen = [...Array(imageWidth)].map(e => Array(imageHeight).fill(transColor));
    mapArray = fillScreen;
//    layer.putTilesAt(fillScreen,0,0,imageWidth,imageHeight);
    this.revealImage();

//    console.log("cam scrollX: " + cam.scrollX)

    var biggerHoriz = false;

    if(imageWidth > 320){
        biggerHoriz = true;
        var initialScroll = cam.scrollX*10;
    }else if(imageHeight > 240){
        var initialScroll = cam.scrollY*10;
    }

    var totalPan = biggerHoriz*10*(imageWidth-screenW) + (1-biggerHoriz)*10*(imageHeight-screenH);

//    console.log("totalPan: " + totalPan)

    cam.stopFollow();

    var winTimeline = currentScene.add.timeline([
        {
            at: 0,
            run: () => {
//                console.log("HII")
                cam.pan(0,0,initialScroll);
            },
        },
        {
            from: initialScroll+1+100,
            run: () => {
//                console.log("HII2")
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
//                console.log("HII3")
                cam.pan(0,0,totalPan*2.5)
            }
        },
        {
            from: 8000,
            run: () => {
                this.startCG(false);
            }
        },
        {
            from: 5000,
            run: () => {
                this.scene.launch('TransitionScene');
            }
        },
        {
            from: 200,
            run: () => {
                this.time.addEvent({
                    delay: 100,
                    callback: () => {
                        this.scene.launch('LoadingScene');
                    }
                })
            }
        },
        {
            from: 300,
            run: () => {
                currentRound++;
                if(currentRound <= 2){
                    currentScene.scene.restart();
                    currentScene.scene.pause();
                }else{
                    //this is where the code goes for the 3rd round
                    //should only be availabel if % cleared is > 90% for both rounds? or 100% for one of the rounds
                    //for now, its just gonna be a win screen for testing purposes
                    this.scene.launch('WinTestScene')
                    this.scene.stop('MainRoundScene')
                }
            }
        }
    ]);

    winTimeline.play(true);


//    var fireworksImage = currentScene.add.image(0,0,'fireworksTest').setOrigin(0.5).setVisible(false);
//    fireworksImage.scale = 0.1;
//    var fireworksZone = currentScene.plugins.get('rexbitmapzoneplugin').add(fireworksImage);

    var canvasObject = currentScene.add.rexCanvas(32, 32)
        .loadTexture('fireworksTest')
        .setScale(0.2)
        .setVisible(false);

    fireworksZone = currentScene.plugins.get('rexbitmapzoneplugin').add(canvasObject);


    const emitterFireworksConfig = {
        anim: 'cleanSparkle1',
        alpha: {
            onEmit: () => 1,
        //    onUpdate: (p, k, t) => 0.8 * CubicIn(1 - t)
          },
//          angle: { min: 0, max: 360 },
    //  blendMode: "SCREEN",
//    angle: (particle) => Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(x, y, particle.x, particle.y)),
      emitting: false,
      frequency: -1,
      gravityY: 128,
      lifespan: 2000,//{ min: 1000, max: 2000 },
      quantity: 100,
      reserve: 100,
    //  rotate: 45,
    scale: {
        onEmit: () => 1,
        onUpdate: (p, k, t) => 1 * CubicIn(1 - t)
      },
//      speed: { onEmit: () => FloatBetween(0, 18) ** 2 },
//      speed: { onEmit: () => FloatBetween(0, 5)},
      speed: 50,
//        speedX: {
//            onEmit: (particle) => {return particle.x-160}
//        },
//        speedY: {
//            onEmit: (particle) => {return particle.y-120}
//        },
      emitZone: {
        type: 'random',
        source: fireworksZone,
      },
    };
    

    var fireworks1 = currentScene.add.particles(0,0,'fireworks',{
        x: 0, y:0,
        anim: 'cleanSparkle1',
        alpha: {
            onEmit: () => 1,
          },
      emitting: false,
      frequency: -1,
      gravityY: 128,
      lifespan: 2000,//{ min: 1000, max: 2000 },
      quantity: 100,
      reserve: 100,
    scale: {
        onEmit: () => 1,
        onUpdate: (p, k, t) => 1 * CubicIn(1 - t)
      },
        speedX: (particle) => 5*(particle.x-fireworks1.x),
        speedY: (particle) => 5*(particle.y-fireworks1.y),
      emitZone: {
        type: 'random',
        source: fireworksZone,
      },
    });
    var fireworks2 = currentScene.add.particles(0,0,'fireworks',emitterFireworksConfig);
    var fireworks3 = currentScene.add.particles(0,0,'fireworks',emitterFireworksConfig);

    fireworks1.addParticleProcessor(drag1);
    fireworks2.addParticleProcessor(drag2);
    fireworks3.addParticleProcessor(drag3);


    cam.ignore([fireworks1,fireworks2,fireworks3]);
  
    currentScene.time.addEvent({
        delay: 1000,
        startAt: Between(0, 1000),
        repeat: 7,
        callback: () => {
            this.updateEmitter();
            sfxFirework.play();
        }
      });
    
      currentScene.time.addEvent({
        delay: 2000,
        startAt: Between(0, 2000),
        repeat: 3,
        callback: () => {
            this.updateEmitter();
            sfxFirework.play();
        }
      });
    
      currentScene.time.addEvent({
        delay: 3000,
        startAt: Between(0, 3000),
        repeat: 2,
        callback: () => {
            this.updateEmitter();
            sfxFirework.play();
        }
      });
    

      totalScore += percentageRevealed;

      var winScoreText = currentScene.add.bitmapText(screenW/2,screenH/2-10,'score','').setOrigin(0.5,0.5);
      winScoreText.text = `${Math.floor(percentageRevealed)}%`;
      winScoreText.fontSize = 0;

      currentScene.tweens.add({
        targets: winScoreText,
        fontSize: 64,
        ease: 'power4'
      });

      currentScene.tweens.add({
        targets: winScoreText,
        delay: 4500,
        duration: 500,
        fontSize: 0,
        ease: 'Quad.easeIn',
        onComplete: () => {
            winScoreText.destroy();
        }
      });



      cam.ignore([winScoreText])

}

updateEmitter() {
    var x1 = screenW * FloatBetween(0.1, 0.9);
    var y1 = screenH * FloatBetween(0.1, 0.7);

    var fireworksE = currentScene.add.particles(0,0,'fireworks',{
        x: x1, y:y1,
        anim: 'cleanSparkle1',
        alpha: {
            onEmit: () => 1,
          },
      emitting: false,
      frequency: -1,
      gravityY: 128,
      lifespan: 3000,//{ min: 1000, max: 2000 },
      quantity: 250,
      reserve: 250,
      angle: {min: 0, max: 360},
    scale: {
        onEmit: () => 1,
        onUpdate: (p, k, t) => 1 * CubicIn(1 - t)
      },
        speedX: (particle) => 80*(particle.x-x1)*(1-0.1*Math.random()),
        speedY: (particle) => 80*(particle.y-y1)*(1-0.1*Math.random()),
      emitZone: {
        type: 'random',
        source: fireworksZone,
      },
    });

    cam.ignore([fireworksE])


    var dragE = Object.create(drag);
    fireworksE.addParticleProcessor(dragE);

    fireworksE.setParticleTint(GetRandom(tints));
    fireworksE.explode();

    currentScene.time.addEvent({
        delay: 3001,
        callback: () => {
          fireworksE.destroy();
        }
      });

  }
  



getTilesWithin(array,x,y,w,h){

    var results = [];
    var array2 = array.slice();

    w = Math.floor(w/2);
    h = Math.floor(h/2);
    x = Math.floor(x);
    y = Math.floor(y);

    var minX = x - w;
    var maxX = x + w;
    var minY = y - h;
    var maxY = y + h;

    if(minX < 0){
        minX = 0;
    }
    if(maxX > imageWidth){
        maxX = imageWidth;
    }
    if(minY < 0){
        minY = 0;
    }
    if(maxY > imageHeight){
        maxY = imageHeight;
    }

    results = array2.slice(minX,maxX+1).map(i => i.slice(minY, maxY+1))


    return results.flat();
}



spawnItem(){
//    console.log("itemArray + 1: " + (itemArray.length + 1))
    if (Math.floor(Math.random()*spawnItemRNG*((itemArray.length+1)*0.5))==0){

        var itemX = Math.floor(Math.random()*(imageWidth - 60)) + 30;
        var itemY = Math.floor(Math.random()*(imageHeight - 60)) + 30;

        //map.getTilesWithin(itemX-15,itemY-15,30,30,undefined, 'mainDraw')

        while(this.getTilesWithin(mapArray,itemX,itemY,30,30).includes(edgeColor)
        || mapArray[itemX][itemY] != baseColor){
            itemX = Math.floor(Math.random()*(imageWidth - 60)) + 30;
            itemY = Math.floor(Math.random()*(imageHeight - 60)) + 30;
        }



        if(Phaser.Math.Between(0,foodRNG+powerRNG) < powerRNG && !itemArray.some(item => item._isPowerup == true)){
            //add additional rng spawn for the special foods?
            //itemArray.some(item => item._type != "food")

            var itemType = Phaser.Math.Between(0,4)
            var itemIndex = itemType;
            var item = currentScene.add.image(itemX,itemY,'powerups',itemIndex);
            item._type = itemTypes[itemType];
            item._isPowerup = true;

        }else{

            if(Phaser.Math.Between(0,favFoodRNG) <= 1){
                var itemIndex = Phaser.Math.Between(0,0);
                var item = currentScene.add.image(itemX,itemY,'favFood',itemIndex);
                item._type = "food"
                item._favFood = true;
            }else{
                var itemIndex = Phaser.Math.Between(0,3);
                var item = currentScene.add.image(itemX,itemY,'food',itemIndex);
                item._type = "food"    
                item._favFood = false;
            }
            item._isPowerup = false;


        }
            item._index = itemIndex; //in case each item does somethig different
            item._shineTimer = 290;
            item._lifeSpan = 0;
            UICam.ignore([item])
            itemArray.push(item);

            item._itemDestroy = currentScene.time.delayedCall(350, () =>
                {
                    this.addSparkles(10,item.x,item.y);
                    item.destroy();
                    itemArray.splice(itemArray.indexOf(item),1);
                });
            item._itemDestroy.paused = true;

            itemSparkles.emitParticleAt(itemX,itemY);
    }
}

updateItem(){
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





makeReviveGems(){
    startReviveLength = screenW*4;
    distCenter = screenW*4;
    for(i=0;i<numReviveGems;i++){
        var currentAngle = (i*360/numReviveGems);
        var reviveGem = currentScene.add.sprite(initPixel[0] + startReviveLength*Math.cos(currentAngle*Math.PI/180),initPixel[1] + startReviveLength*Math.sin(currentAngle*Math.PI/180),'rainbowstar');
        reviveGem.scale = 3.5
//        reviveGem.depth = 3;
        reviveGem._currentAngle = currentAngle;
        reviveGem.play('rainbowStarAnim');
//        if(i%2==0){
//            reviveGem.play('sparkleShine',true)
//        }else{
//            reviveGem.play('sparkleShine2',true)
//        }

//        reviveGem.setVisible(false);
//console.log(startReviveLength)
        UICam.ignore([reviveGem])
        reviveGems.push(reviveGem);
    }

}


updateRevive(){


    
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


//maybe have it every 2 steps, with a global alternating var?
explodePixelChain(pixelX, pixelY){
//     console.log("pixelX: " + pixelX);
//     console.log("pixelY: " + pixelY)
//     console.log("layerX: " + mapArray[pixelX,pixelY).x);
//     console.log("layerY: " + mapArray[pixelX,pixelY).y);
// console.log("Is it draw tile? " + (mapArray[pixelX,pixelY] == drawColor));
// console.log("Is it draw tile Left? " + (mapArray[pixelX-1,pixelY] == drawColor));
// console.log("Is it draw tile Right? " + (mapArray[pixelX+1,pixelY] == drawColor));
// console.log("Is it draw tile Up? " + (mapArray[pixelX,pixelY-1] == drawColor));
// console.log("Is it draw tile Down? " + (mapArray[pixelX,pixelY+1] == drawColor));
//    console.log()

//    console.log("Tile XY: " + mapArray[pixelX,pixelY))
explodePixelX = Math.floor(pixelX);
explodePixelY = Math.floor(pixelY);

//    map.putTileAt(baseColor,explodePixelX,explodePixelY);

drawRT.beginDraw();

        while(alternateExplodeCounter < alternateExplodeMax){
//            console.log("ASDJIOSDJIOASDOASDJOIDIOSADJIASOJO")

        var pixelLeft = mapArray[explodePixelX-1][explodePixelY] == drawColor;
        var pixelRight = mapArray[explodePixelX+1][explodePixelY] == drawColor;
        var pixelUp = mapArray[explodePixelX][explodePixelY-1] == drawColor;
        var pixelDown = mapArray[explodePixelX][explodePixelY+1] == drawColor;
            
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

        drawRT.erase('pixel',explodePixelX,explodePixelY);
        mapArray[explodePixelX][explodePixelY] = baseColor;


        alternateExplodeCounter++;


        }

        drawRT.endDraw();

        alternateExplodeCounter=0;



//                        alternateExplodeCounter = 0;
    var pixelLeft = mapArray[explodePixelX-1,explodePixelY] == drawColor;
    var pixelRight = mapArray[explodePixelX+1,explodePixelY] == drawColor;
    var pixelUp = mapArray[explodePixelX,explodePixelY-1] == drawColor;
    var pixelDown = mapArray[explodePixelX,explodePixelY+1] == drawColor;


    

//    if(pixelLeft || pixelRight || pixelUp || pixelDown){
//        explodePixelChain(explodePixelX,explodePixelY);
//    }

            
}



killPlayer(enemyX,enemyY){
    if(!isKillPlayer){
        totalDeaths++;
        isKillPlayer = true;
        enemyKillXY[0] = enemyX;
        enemyKillXY[1] = enemyY;
        cam.stopFollow();
        cam.pan(enemyX,enemyY,750,'Power2')
        this.makeReviveGems()
        this.sfxMusic.setVolume(0.3);
//        this.sfxMusic.setDetune(-500);
    }

}

updateKill(){

    if(isKillPlayer){


        if (!isPixelExploding && !allExploded){
            currentScene.anims.pauseAll();
            if(enemyArray != [] && enemyArray[0]._state != "laugh"){
                for (var enemy of enemyArray){
                    enemy._state = "laugh"
                }
            }

            if(roundTimer.getRemaining() != 0){
                this.decreaseHealth(2);
            }

            //replace with some kind of slash animation
            this.addSparkles(undefined,enemyKillXY[0],enemyKillXY[1])
            cam.flash(100);
            //explosionEmitter3.emitParticleAt(enemyKillXY[0],enemyKillXY[1]);
//            sfxExplosion3.play();
            freezeFrame = true;
            isMoving = true;
            isPixelExploding = true;

            player.anims.play('die');
            // for(i=0;i<imageWidth;i++){
            //     for(j=0;j<imageHeight;j++){
            //         if(mapArray[i,j] == drawColor)
            //             mapArray[i,j)._toExplode = true;
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
                    this.explodePixelChain(initPixel[0],initPixel[1]);
                    freezeFrame = false;
                }
            })


        }else if(isPixelExploding && !freezeFrame){
            sfxExplosion3.play();
            cam.shake(100,0.03);
            UICam.shake(100,0.03);
            cam.pan(explodePixelX,explodePixelY,300,undefined,true)
            this.addExplosions(explodePixelX,explodePixelY,undefined,3)
//            explosionEmitter1.emitParticleAt(explodePixelX,explodePixelY)
            //            console.log("explodePixelX: " + explodePixelX)
//            console.log("explodePixelY: " + explodePixelY)
//            console.log("is drawcolor?: " + mapArray[explodePixelX,explodePixelY] == drawColor);
            this.explodePixelChain(explodePixelX,explodePixelY);
        }

        if(allExploded && playerState != "kill"){
            //console.log("WTFFFFFFFFFFFF")
            sfxExplosion3.stop();
            sfxExplosion4.play();
            cam.shake(300,0.15,true);
            UICam.shake(300,0.15,true);
            cam.flash(100);
            this.addSparkles(15);
            this.addExplosions(player.x,player.y,20,3);
//            glowSprite.x = player.x;
//            glowSprite.y = player.y;
//            glowSprite.setVisible(true);
//            glowSprite.play({key: 'glowAnim'});
            this.glowShine(undefined,undefined,1500,true);
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
                if((currentHealth == 0 || roundTimer.getRemaining() == 0) && !gameOver){
                    gameOver = true;

                    timeElapsed += Math.floor(roundTimer.getElapsedSeconds());

                    this.plugins.get('rexsoundfadeplugin').fadeOut(this.sfxMusic, 1000);

                    currentScene.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            

                            borderImage.destroy();
                            borderImage = this.add.image(0,0,'border').setOrigin(0,0);
                            borderImage.x = -30+cam.scrollX;
                            borderImage.y = -20+cam.scrollY;
                            borderImage.setDepth(3);
                            UICam.ignore([borderImage])
                            currentScene.scene.launch('GameOverScene');
                        }
                    })
                }else if(currentHealth <= 2 && !gagMode){
                    gagMode = true;
                    gagRevive = true;
                    

                    currentScene.time.addEvent({
                        delay: 1700,
                        callback: () => {
                            this.sfxMusic.setDetune(-500);
                        }
                    })

                    currentHealth = 2;
                    spawnItemRNG *= 2;
                    currentScene.time.addEvent({
                        delay: 10,
                        repeat: 200,
                        callback: () => {
                            this.spawnGagBlitter();
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
                            this.revealImage();
                            this.calculateScore()
                            this.transScoreChange();
                            this.delayHealthCall();

                            healthImage.setFrame(3);

                            healthArray[0].setFrame(3)


                        }
                    })


                }
                
            }

//            if(respawnTime == 25){
//                decreaseHealth(2);
//            }
        }else if(!gagRevive && !gameOver){
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
                    this.addSparkles(10);
                    player.setVisible(true);
                    sfxSpawn.play();
//                    glowSprite.x = player.x;
//                    glowSprite.y = player.y;
//                    glowSprite.setVisible(true);
//                    glowSprite.play({key: 'glowAnim'});
                    //glowShine();
                    this.glowShine2();
                    isMoving = false;
                    speed = 2;
                    player._speedUp = false;
                    player.setOrigin(0.5,0.5);
                    player.angle = 0;
                    cam.startFollow(player,true,0.1,0.1);
                    this.sfxMusic.setVolume(this.musicVolume)
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


transitionOut(progress)
{
//    this.face.y = (600 * progress);
}

startTransitionOut(){
    this.scene.launch('GameOverScene');

    this.scene.setVisible(false, 'MainRoundScene');

    this.rt = this.make.renderTexture({ x: 0, y: 0, width: 800, height: 600 }, false);

    this.rt.saveTexture('game');

}

updateEnemy(){
    if(enemyArray != []){
        for (var enemy of enemyArray){

            if(!enemy._isBoss){
//                console.log(enemy.x)
//                console.log(enemy.y)

                //8x8, checked within 7x7
                //ugh
                //map.this.getTilesWithin(Math.floor(enemy.x)-8,Math.floor(enemy.y-7),3,7,undefined, 'mainDraw')

                enemy._enemyX = enemy.x;
                enemy._enemyY = enemy.y;

                enemy._enemyX = Phaser.Math.Clamp(enemy.x, borderWidth, imageWidth-borderWidth)
                enemy._enemyY = Phaser.Math.Clamp(enemy.y, borderWidth, imageHeight-borderWidth)
                
/*
                enemy._enemyTileIndexL = mapArray[Math.round(enemy._enemyX)-1][Math.round(enemy._enemyY)];
                enemy._enemyTileIndexR = mapArray[Math.round(enemy._enemyX)+1][Math.round(enemy._enemyY)];
                enemy._enemyTileIndexU = mapArray[Math.round(enemy._enemyX)][Math.round(enemy._enemyY)-1];
                enemy._enemyTileIndexD = mapArray[Math.round(enemy._enemyX)][Math.round(enemy._enemyY)+1];
*/

                enemy._enemyTileIndexL = this.getTilesWithin(mapArray,enemy.x-4,enemy.y,2,8);
                enemy._enemyTileIndexR = this.getTilesWithin(mapArray,enemy.x+4,enemy.y,2,8);
                enemy._enemyTileIndexU = this.getTilesWithin(mapArray,enemy.x,enemy.y-4,8,2);
                enemy._enemyTileIndexD = this.getTilesWithin(mapArray,enemy.x,enemy.y+4,8,2);


//                enemy._enemyTileIndexL = mapArray[enemy.x-1,enemy.y];
//                enemy._enemyTileIndexR = mapArray[enemy.x+1,enemy.y];
//                enemy._enemyTileIndexU = mapArray[enemy.x,enemy.y-1];
//                enemy._enemyTileIndexD = mapArray[enemy.x,enemy.y+1];

            }else{
                //bull: 68 by 136
                //map.this.getTilesWithin(Math.floor(enemy.x)-24,Math.floor(enemy.y-34),1,68,undefined, 'mainDraw')
                //enemy.scale
                var xScale1 = enemy.scale*24
                var xScale2 = enemy.scale*30
                var yScale1 = enemy.scale*34
                var yScale2 = enemy.scale*25
                bossLeft = this.getTilesWithin(mapArray,enemy.x-xScale1,enemy.y,3,yScale1);
                bossRight = this.getTilesWithin(mapArray,enemy.x+xScale1,enemy.y,3,yScale1)
                bossUp = this.getTilesWithin(mapArray,enemy.x,enemy.y-yScale1,xScale1,3)
                bossDown = this.getTilesWithin(mapArray,enemy.x,enemy.y+yScale1,xScale1,3)

                //map.this.getTilesWithin(Math.floor(enemy.x)-30,Math.floor(enemy.y-25),1,50,undefined, 'mainDraw')
                bossLeftHit = this.getTilesWithin(mapArray,enemy.x-xScale2,enemy.y,3,yScale2)
                bossRightHit = this.getTilesWithin(mapArray,enemy.x+xScale2,enemy.y,3,yScale2)
                bossUpHit = this.getTilesWithin(mapArray,enemy.x,enemy.y-yScale2,xScale2,3)
                bossDownHit = this.getTilesWithin(mapArray,enemy.x,enemy.y+yScale2,xScale2,3)

                bossLeftShrink = this.getTilesWithin(mapArray,enemy.x-xScale1-6,enemy.y,3,yScale1);
                bossRightShrink = this.getTilesWithin(mapArray,enemy.x+xScale1+6,enemy.y,3,yScale1)
                bossUpShrink = this.getTilesWithin(mapArray,enemy.x,enemy.y-yScale1-6,xScale1,3)
                bossDownShrink = this.getTilesWithin(mapArray,enemy.x,enemy.y+yScale1+6,xScale1,3)

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
                        this.killPlayer(enemy.x,enemy.y);
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
                    this.startKill(enemy,enemyArray);
                }

            }

            if(enemy._enemyType == 'yellowGuy'){
                if(enemy._state == "move"){
                    enemy.anims.play('enemyAnim2',true);

                if(enemy._enemyTileIndex == transColor){
                    enemy._state = "die";
                }
            
                if(enemy._enemyTileIndex == drawColor){
                    this.killPlayer(enemy.x,enemy.y);
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
                this.startKill(enemy,enemyArray);
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
                this.startKill(enemy,enemyArray);
            }
            if(enemy._state == "laugh" && !currentScene.anims.paused){
                enemy.anims.play('enemyLaugh3',true);
                //have code that changes state back to move when respawn
            }
        }


        if(enemy._enemyType == 'bull'){



            

            if(!bossKill){


                if((bossUpShrink.includes(edgeColor) || bossUpShrink.includes(borderColor)) && (bossDownShrink.includes(edgeColor) || bossDownShrink.includes(borderColor))){
                    enemy._agoraCheck -= 0.005
                }else if((bossLeftShrink.includes(edgeColor) || bossLeftShrink.includes(borderColor)) && (bossRightShrink.includes(edgeColor) || bossRightShrink.includes(borderColor))){
                    enemy._agoraCheck -= 0.005                   
                }else if(enemy._agoraCheck < 1){
                    enemy._agoraCheck += 0.005
                }




            //percentageRevealed is 0-100
            enemy.scale = (1 - 0.7*(percentageRevealed/100))*enemy._size*enemy._agoraCheck
            if(enemy.scale < 0.5){
                enemy.scale = 0.5;
            }

            this.bullCloudBack.scale = this.bullCloudFront.scale = enemy.scale;


            //should this be for all general cases?
            if (bossLeft.includes(drawColor))
                {
                    this.killPlayer(enemy.x,enemy.y)
                }else if(bossRight.includes(drawColor)){
                    this.killPlayer(enemy.x,enemy.y)
                }else if(bossUp.includes(drawColor)){
                    this.killPlayer(enemy.x,enemy.y)
                }else if(bossDown.includes(drawColor)){
                    this.killPlayer(enemy.x,enemy.y)
                }

                
            if(enemy._state == "stop"){
                enemy.anims.pause();
                bullSwingTimelineLeft.timeScale = 1;
                bullSwingTimelineRight.timeScale = 1;
                bullSwingTimelineLeft.stop();
                bullSwingTimelineRight.stop();
                bullSingTimeline.stop()

            }
    
            
            if(enemy._state == "move"){


                enemy.anims.play('bullMove',true);

//                if(bossHitbox.includes(transColor)){
//                    enemy._state = "die";
  //              }

//                console.log(bossUp.filter(tile => parseInt(tile.index) == edgeColor || parseInt(tile.index) == borderColor).length)
                if ((bossLeft.includes(edgeColor) || bossLeft.includes(borderColor)) && enemy._xVel < 0)
                {
                    enemy._xVel *= -1;
//                    console.log("bouncing right!")
                }else if((bossRight.includes(edgeColor) || bossRight.includes(borderColor)) && enemy._xVel > 0){
                    enemy._xVel *= -1;
//                    console.log("bouncing left!")
                }else if((bossUp.includes(edgeColor) || bossUp.includes(borderColor)) && enemy._yVel < 0){
                    enemy._yVel *= -1;
//                    console.log("bouncing down!")
                }else if((bossDown.includes(edgeColor) || bossDown.includes(borderColor)) && enemy._yVel > 0){
                    enemy._yVel *= -1;
 //                   console.log("bouncing up!")
                }

                
    
    
                if(enemy._xVel > 0){
                    enemy.flipX = true;
                }else{
                    enemy.flipX = false;
                }

                enemy.x += enemy._xVel*enemy._vel;
                enemy.y += enemy._yVel*enemy._vel;


                //***Attack patterns */

//                this.debugSingTimer.text = this.singTimer;

                //check singing rng (actually this hsould just be any attack)
                if(this.singTimer > this._singCooldown){

                    var checkDist = (Math.abs(player.x - enemy.x) > 2*screenW/3) || (Math.abs(player.y - enemy.y) > 2*screenH/3);


                    var checkRNG = Math.floor(Math.random()*enemy._singRNG);

                    if(checkRNG == 0){
//                        console.log("START SING")
                        this.singTimer = -1;

                        if(checkDist){
                            this.warningPopup();
                        }

                        this.flashingEnemy([this.bullCM,this.cloudFCM,this.cloudBCM]);

                        currentScene.time.addEvent({
                            delay: this.attackDelay,
                            callback: () => {
//                                enemy._state = "sing";
                                this.startSing = true;
                            }
                        })


                    }else if(checkRNG == 1){
                        //thunderclouds
//                        console.log("START THUNDER")
                        this.singTimer = -1;

//                        if(checkDist){
//                            this.warningPopup();
//                        }

                        this.flashingEnemy([this.bullCM,this.cloudFCM,this.cloudBCM]);

                        currentScene.time.addEvent({
                            delay: this.attackDelay,
                            callback: () => {
                                this.spawnThunderclouds(enemy);
                            }
                        })


                    }else if(checkRNG == 2){
                        //radial lightning
//                        console.log("START LIGHTNING")
                        this.singTimer = -1;

                        this.flashingEnemy([this.bullCM,this.cloudFCM,this.cloudBCM]);

                        if(checkDist){
                            this.warningPopup();
                        }

                        currentScene.time.addEvent({
                            delay: this.attackDelay,
                            callback: () => {
                                this.spawnRadialLightning(enemy);
                            }
                        })


                    }else if(checkRNG == 3){
                        //soundwave
//                        console.log("START SOUNDWAVE")
                        this.singTimer = -1;

                        this.flashingEnemy([this.bullCM,this.cloudFCM,this.cloudBCM]);

                        if(checkDist){
                            this.warningPopup();
                        }

                        currentScene.time.addEvent({
                            delay: this.attackDelay,
                            callback: () => {
                                this.spawnSoundwave();
                            }
                        })


                    }


                }else if(this.singTimer >= 0){
                    this.singTimer++;
                }


                //blob spawn mechanism
                //maybe spawnrate changes with difficulty
                if(totalBlobs < totalBlobsMax){
                    if(enemy._blobSpawnTimer > enemy._blobSpawnTimerMax && enemy._state != "sing"){
                        this.spawnBullBlobs();
//                        console.log("spawning blob!")
                        enemy._blobSpawnTimer = 0;
                    }else{
                        enemy._blobSpawnTimer++;
                    }    
                }

                //for debugging the singing
                if(bPress || this.startSing){
                    enemy._state = "sing";
                    this.startSing = false;
//                    console.log("debug sing press")
                }

                //debug thunderclouds
                /*
                keyD.on('up', () => { 
                    flipFlop = false;
                 });
                 keyD.on('down', () => { 
                    if(!flipFlop){
//                        if((Math.abs(player.x - enemy.x) > 2*screenW/3) || (Math.abs(player.y - enemy.y) > 2*screenH/3)){
                            this.warningPopup();
//                        }
                        //                        this.spawnThunderclouds(enemy);
                        this.spawnRadialLightning();
                        flipFlop = true
                    }
                 });
                 */
                
                
                //swing left
                if(bossLeftHit.includes(drawColor) && enemy._startSwing == false){
                    enemy._state = "swing";
                    enemy._startSwing = true;
                    enemy.flipX = false;
                }
                //swing right
                else if(bossRightHit.includes(drawColor) && enemy._startSwing == false){
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
                        
//                        console.log(this.getTilesWithin(mapArray,enemy.x-30*enemy.scale,enemy.y-20*enemy.scale,30*enemy.scale,50*enemy.scale))
                        if(!enemy.flipX && this.getTilesWithin(mapArray,enemy.x-30*enemy.scale,enemy.y-20*enemy.scale,30,50).includes(drawColor)){
                            this.killPlayer(enemy.x,enemy.y);
                            sfxSwingHit.play();
                        }else if(enemy.flipX && this.getTilesWithin(mapArray,enemy.x+30*enemy.scale,enemy.y-20*enemy.scale,30,50).includes(drawColor)){
                            this.killPlayer(enemy.x,enemy.y);
                            sfxSwingHit.play();
                        }
                    }
                }
    
            }

            if(enemy._state == "sing" && !isSinging){
//                console.log("ASDOIJASOIDJOSJDS")
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
//                console.log("AM I PLAYING HELLOOOOOO")
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
                enemy.anims.play('bullDie',true);
//                enemy.anims.paused = true;
//                enemy.anims.play('enemyDie1',true);
//                startKill(enemy,enemyArray);
            }

            if(showDebug){
                debugBoss.x = enemy.x;
                debugBoss.y = enemy.y;    
                debugBoss2.x = enemy.x;
                debugBoss2.y = enemy.y;    
            }


            if(enemy._spriteOverlay != undefined){
                enemy._spriteOverlay.x = enemy.x;
                enemy._spriteOverlay.y = enemy.y;
            }

            this.bullCloudBack.x = enemy.x;
            this.bullCloudBack.y = enemy.y;
            this.bullCloudFront.x = enemy.x;
            this.bullCloudFront.y = enemy.y;

        }

    }

        if(enemy._enemyType == 'bullBlob'){


            
            if(!bossKill){

            enemy.scale = enemy._size;

            //should this be for all cases?
            if(enemy._enemyTileIndexL.includes(drawColor) || enemy._enemyTileIndexR.includes(drawColor)
            || enemy._enemyTileIndexU.includes(drawColor) || enemy._enemyTileIndexD.includes(drawColor)){
                this.killPlayer(enemy.x,enemy.y);
               //isKillPlayer = true;
               //initPixel = [enemy.x,enemy.y];
           }


            if(enemy._state == "stop"){
                enemy.anims.pause();
                isSinging = false;
                blobSing = false;
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


                if(enemy._enemyTileIndexL.includes(edgeColor) || enemy._enemyTileIndexL.includes(borderColor)){
                    enemy._xVel *= -1;
                    //enemy.x += Math.sign(enemy._xVel);
                }else if(enemy._enemyTileIndexR.includes(edgeColor) || enemy._enemyTileIndexR.includes(borderColor)){
                    enemy._xVel *= -1;
                    //enemy.x += Math.sign(enemy._xVel);
                }
                if(enemy._enemyTileIndexU.includes(edgeColor) || enemy._enemyTileIndexU.includes(borderColor)){
                    enemy._yVel *= -1;
                    //enemy.y += Math.sign(enemy._yVel);
                }else if(enemy._enemyTileIndexD.includes(edgeColor) || enemy._enemyTileIndexD.includes(borderColor)){
                    enemy._yVel *= -1;
                    //enemy.y += Math.sign(enemy._yVel);
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


                if(hardMode){
                    if(enemy._enemyTileIndexL.includes(edgeColor) || enemy._enemyTileIndexL.includes(borderColor)){
                        var randDegHalf = Math.random()*Math.PI/2; //actually a quarter
                        enemy._xVel = Math.cos(randDegHalf - Math.PI/2)
                        if(enemy._yVel > 0){
                            enemy._yVel = Math.sin(randDegHalf - Math.PI/2)*-1
                        }else{
                            enemy._yVel = Math.sin(randDegHalf - Math.PI/2)
                        }
                        //enemy.y += Math.sign(enemy._yVel);

                    }else if(enemy._enemyTileIndexR.includes(edgeColor) || enemy._enemyTileIndexR.includes(borderColor)){
                        var randDegHalf = Math.random()*Math.PI/2;
                        enemy._xVel = Math.cos(randDegHalf + Math.PI/2)
                        if(enemy._yVel > 0){
                            enemy._yVel = Math.sin(randDegHalf + Math.PI/2)
                        }else{
                            enemy._yVel = Math.sin(randDegHalf + Math.PI)*-1
                        }
                        //enemy.y += Math.sign(enemy._yVel);

                    }else if(enemy._enemyTileIndexU.includes(edgeColor) || enemy._enemyTileIndexU.includes(borderColor)){
                        var randDegHalf = Math.random()*Math.PI/2;
                        if(enemy._xVel > 0){
                            enemy._xVel = Math.cos(randDegHalf)
                        }else{
                            enemy._xVel = Math.cos(randDegHalf)*-1
                        }
                        enemy._yVel = Math.sin(randDegHalf)
                        //enemy.x += Math.sign(enemy._yVel);

                    }else if(enemy._enemyTileIndexD.includes(edgeColor) || enemy._enemyTileIndexD.includes(borderColor)){
                        var randDegHalf = Math.random()*Math.PI/2;
                        if(enemy._xVel > 0){
                            enemy._xVel = Math.cos(randDegHalf+Math.PI)*-1
                        }else{
                            enemy._xVel = Math.cos(randDegHalf+Math.PI)
                        }
                        enemy._yVel = Math.sin(randDegHalf+Math.PI)
                        //enemy.x += Math.sign(enemy._yVel);

                    }
                }else{
                    if(enemy._enemyTileIndexL.includes(edgeColor) || enemy._enemyTileIndexL.includes(borderColor)){
                        enemy._xVel *= -1;
                        //enemy.x += Math.sign(enemy._yVel);
                    }else if(enemy._enemyTileIndexR.includes(edgeColor) || enemy._enemyTileIndexR.includes(borderColor)){
                        enemy._xVel *= -1;
                        //enemy.x += Math.sign(enemy._yVel);
                    }
                    if(enemy._enemyTileIndexU.includes(edgeColor) || enemy._enemyTileIndexU.includes(borderColor)){
                        enemy._yVel *= -1;
                        //enemy.y += Math.sign(enemy._yVel);
                    }else if(enemy._enemyTileIndexD.includes(edgeColor) || enemy._enemyTileIndexD.includes(borderColor)){
                        enemy._yVel *= -1;
                        //enemy.y += Math.sign(enemy._yVel);
                    }    
                }

                if(enemy._xVel > 0){
                    enemy.flipX = false;
                }else{
                    enemy.flipX = true;
                }

                enemy.x += enemy._xVel*enemy._vel;
                enemy.y += enemy._yVel*enemy._vel;

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
                    this.resetSing();
                    enemy._state = "move";
                }
            }

            if(enemy._state == "laugh" && !currentScene.anims.paused){
                enemy.anims.play('enemyLaugh1',true);
                isSinging = false;
                blobSing = false;
            }

            if(enemy._state == "die"){

                if(enemy._spriteOverlay != undefined){
                    enemy._spriteOverlay.destroy();
                }

                //dont think i need that
//                enemy.anims.resume();

                enemy.anims.play('enemyDie1',true);
                totalBlobs--;
                this.startKill(enemy,enemyArray);
            }

            if(enemy._spriteOverlay != undefined){
                enemy._spriteOverlay.x = enemy.x;
                enemy._spriteOverlay.y = enemy.y;
                enemy._spriteOverlay.scale = enemy.scale;
            }

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


                if(enemy.x > borderWidth && enemy.x < imageWidth - borderWidth && enemy.y > borderWidth && enemy.y < imageHeight - borderWidth){

                    if(enemy._currentTimer < 5){
                        for(i=0;i<5;i++){
                            var point = enemy._hitLine.getPoint(i/5);
                            if(mapArray[Math.floor(point.x)][Math.floor(point.y)] == drawColor){
                                if(!isKillPlayer){
                                    this.killPlayer(enemy.x,enemy.y);
                                }
                            }
                        }    
                    }
                }
            }
        }


        if(enemy._enemyType == 'lightningBolt'){

            if(enemy._state == "laugh" && !currentScene.anims.paused){
                enemyArray.splice(enemyArray.indexOf(enemy),1);
                enemy.destroy()
            }

            if(enemy._state == "move"){
                
                enemy._currentVel = enemy._totalVel*(((enemy._totalTimer - enemy._currentTimer)/enemy._totalTimer)**4)


                if(enemy._currentTimer < enemy._totalTimer){
                    enemy.angle += 5*(1-((enemy._currentTimer/enemy._totalTimer))**2)
                    enemy.scale = 0.5+0.5*((enemy._currentTimer/enemy._totalTimer)**1);
                }

                enemy._xVel = Math.cos((enemy.angle+90)*Math.PI/180)*enemy._currentVel;
                enemy._yVel = Math.sin((enemy.angle+90)*Math.PI/180)*enemy._currentVel;
                enemy.x += enemy._xVel;
                enemy.y += enemy._yVel;

            

                enemy._currentTimer++;
                
                if(enemy._currentTimer > enemy._totalTimer*3){
                    enemyArray.splice(enemyArray.indexOf(enemy),1);
                    enemy.destroy();
                }
                
                if(enemy._currentTimer == enemy._totalTimer){
                    currentScene.time.addEvent({
                        delay: 350,
                        callback: () => {
                            this.sfxLightningbolt2.play();
                        }
                    })
                }

                enemy._hitLine = new Phaser.Geom.Line(enemy.x, enemy.y, enemy.x - enemy._xVel+(45*Math.cos(enemy.angle+90)), enemy.y - enemy._yVel+(45*Math.sin(enemy.angle+90)));


                if(enemy.x > borderWidth && enemy.x < imageWidth - borderWidth && enemy.y > borderWidth && enemy.y < imageHeight - borderWidth){

                    if(enemy._currentTimer < enemy._totalTimer*3){
                        var testLine = Math.floor(Phaser.Geom.Line.Length(enemy._hitLine));
//                        console.log(testLine)
                        for(i=0;i<testLine;i++){
                            var point = enemy._hitLine.getPoint(i/testLine);
                            if(point.x > borderWidth && point.x < imageWidth - borderWidth && point.y > borderWidth && point.y < imageHeight - borderWidth){
                                if(mapArray[Math.floor(point.x)][Math.floor(point.y)] == drawColor){
                                    if(!isKillPlayer){
                                        this.killPlayer(enemy.x,enemy.y);
                                    }
                                }    
                            }
                        }    
                    }
                }
            }
        }

        if(enemy._enemyType == 'soundwave'){

            if(enemy._state == "laugh" && !currentScene.anims.paused){
                enemyArray.splice(enemyArray.indexOf(enemy),1);
                enemy._wave2.destroy();
                enemy._wave3.destroy();
                enemy.destroy()
            }

            if(enemy._state == "move"){
                

                enemy._arrayX.push(enemy.x);
                enemy._arrayY.push(enemy.y);
                enemy._arrayA.push(enemy.angle);
                enemy._arrayS.push(enemy.scale);

                if(enemy._currentTimer > 3){
                    enemy._wave2.x = enemy._arrayX[enemy._wave2._i];
                    enemy._wave2.y = enemy._arrayY[enemy._wave2._i];
                    enemy._wave2.angle = enemy._arrayA[enemy._wave2._i];
                    enemy._wave2.scale = enemy._arrayS[enemy._wave2._i]*0.85;        
                    enemy._wave2._i++
                }
    
                if(enemy._currentTimer > 6){
                    enemy._wave3.x = enemy._arrayX[enemy._wave3._i];
                    enemy._wave3.y = enemy._arrayY[enemy._wave3._i];
                    enemy._wave3.angle = enemy._arrayA[enemy._wave3._i];
                    enemy._wave3.scale = enemy._arrayS[enemy._wave3._i]*0.7;
                    enemy._wave3._i++
                }
    

                enemy._currentVel = enemy._totalVel/5;


                if(enemy._currentTimer > 60){
                    enemy._currentVel = enemy._totalVel*1.5;

                    var angleB = Phaser.Math.Angle.Between(enemy.x,enemy.y,player.x,player.y)*(180/Math.PI);

                    enemy.angle += (angleB-enemy.angle)*0.005

//                    enemy._currentVel -= (3*enemy._totalVel/4)*(enemy._totalTimer-enemy._currentTimer-15)/(enemy._totalTimer-15)
                }else{
                    var angleB = Phaser.Math.Angle.Between(enemy.x,enemy.y,player.x,player.y)*(180/Math.PI);

                    enemy.angle += (angleB-enemy.angle)*0.03

                }

                if(enemy._currentTimer == 60){
                    this.sfxSoundwave2.play();
                }


                enemy.scale = 0.7+0.3*Math.cos(((1+(enemy._currentVel-(enemy._totalVel/3)))**0.5)*enemy._currentTimer/5)

                enemy._xVel = Math.cos((enemy.angle)*Math.PI/180)*enemy._currentVel;
                enemy._yVel = Math.sin((enemy.angle)*Math.PI/180)*enemy._currentVel;
                enemy.x += enemy._xVel;
                enemy.y += enemy._yVel;

                enemy._currentTimer++;
                
                if(enemy._currentTimer > enemy._totalTimer*6){
                    enemyArray.splice(enemyArray.indexOf(enemy),1);
                enemy._wave2.destroy();
                enemy._wave3.destroy();
                    enemy.destroy();
                }

//                enemy._hitLine = new Phaser.Geom.Line(enemy.x, enemy.y, enemy.x - enemy._xVel+(45*Math.cos(enemy.angle+90)), enemy.y - enemy._yVel+(45*Math.sin(enemy.angle+90)));

                enemy._hitLine = new Phaser.Geom.Line(enemy.x-23*Math.cos(enemy.angle+90),enemy.y-23*Math.sin(enemy.angle+90),enemy.x+23*Math.cos(enemy.angle+90),enemy.y+23*Math.sin(enemy.angle+90))

                if(enemy.x > borderWidth && enemy.x < imageWidth - borderWidth && enemy.y > borderWidth && enemy.y < imageHeight - borderWidth){

                    if(enemy._currentTimer < enemy._totalTimer*6){
                        var testLine = Math.floor(Phaser.Geom.Line.Length(enemy._hitLine));
//                        console.log(testLine)
                        for(i=0;i<testLine;i++){
                            var point = enemy._hitLine.getPoint(i/testLine);
                            if(point.x > borderWidth && point.x < imageWidth - borderWidth && point.y > borderWidth && point.y < imageHeight - borderWidth){
                                if(mapArray[Math.floor(point.x)][Math.floor(point.y)] == drawColor){
                                    if(!isKillPlayer){
                                        this.killPlayer(enemy.x,enemy.y);
                                    }
                                }    
                            }
                        }    
                    }
                }
            }
        }


    }
    }
}

resetSing(){
    this.singTimer = 0;
    this._singCooldown = 200 + Math.floor(200*Math.random())
}

flashingEnemy(enemyCM = [this.bullCM,this.cloudFCM,this.cloudBCM]){

    currentScene.tweens.addCounter({
        from: 1,
        to: 2,
        ease: 'Circ.easeOut',
        yoyo: true,
        repeat: 3,
        duration: 210,
        onUpdate: (tween) => {
            for(i=0;i<enemyCM.length;i++){
                enemyCM[i].brightness(tween.getValue());
            }
        }
    })


}

warningPopup(){
    this.sfxWarning.play()
                            
    this.warningImage = currentScene.add.image(screenW/2,screenH/2,'warning')//.setScale(0.5)//.setAlpha(0)
    cam.ignore([this.warningImage]);



    currentScene.time.addEvent({
        delay: 15,
        repeat: Math.floor(2*(210*3*2+200+150)/15),
        callback: () => {
            if(this.warningImage!= undefined){
                if(this.warningImage.isTinted){
                    this.warningImage.clearTint();
                    console.log("HII")
                }else{
                    this.warningImage.setTintFill(0xfff387);
                }
            }        
        }
    })

    currentScene.time.addEvent({
        delay: 210*3*2+200+150+400,
        callback: () => {
            if(this.warningImage!= undefined){
                this.warningImage.destroy();
            }
        
        }
    })


/*    this.warningTween = currentScene.tweens.add({
        targets: this.warningImage,
        alpha: 1,
        ease: 'Circ.easeOut',
        yoyo: true,
        repeat: 3,
        duration: 210,
        onComplete: () => {
            this.warningImage.destroy();
        }
    })*/
        this.warningImage.scaleX = 5;
        this.warningImage.scaleY = 0.1;
        this.warningImage.alpha = 0.5        


        this.warningTween = currentScene.tweens.chain({
            targets: this.warningImage,
            tweens:[
                {
                    ease: 'Back.easeOut',
                    scaleX: 1,
                    scaleY: 1,
                    alpha: 1,
                    duration: 200,
                },
                {
                    delay: 210*3*2,
                    ease: 'Back.easeIn',
                    scaleX: 3,
                    scaleY: 0.1,
                    alpha: 0,
                    duration: 150,
                }
            ]
        })


        this.warningTween.on('complete',()=>{this.warningImage.destroy()});


}

startKill(enemy, enemyArray){
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
            this.addExplosions(enemy.x,enemy.y,8,4);
            cam.shake(200,0.02);
            UICam.shake(200,0.02);
            if(enemy._spriteOverlay != undefined){
                enemy._spriteOverlay.destroy();
            }
                enemy.destroy();
            sfxExplosion2.play();
            
        }
}

updateCamera(){
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

updateAnimation(){

    if(!isPixelExploding && !bossKill)
    {
        if(playerState=="NoDraw"){
            player.anims.play('idle',true);
        }else if(playerState=="YesDraw"){
            regularDrawTween.resume()
            rainbowDrawTween.pause()
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
            regularDrawTween.pause();
            rainbowDrawTween.resume()
    //        player.setOrigin(0.5,1);
        }    
    }
}


spawnSoundwave(){

    this.sfxSoundwave1.play()

    currentScene.time.addEvent({
        delay: 2000,
        callback: () => {
            this.resetSing();
        }
    })

    for(i=0;i<enemyArray.length;i++){
        if(enemyArray[i]._enemyType == "bull"){
            var bullBossEnemy = i;
        }
    }

    var tempBull = enemyArray[bullBossEnemy]

    var addAngle = 0;

    if(Math.sign(tempBull.x-player.x) > 0){
        if(Math.sign(tempBull.y-player.y)>0){
            //(+,+)
            addAngle = 180;
        }else if(Math.sign(tempBull.y-player.y)<=0){
            //(+,-)
            addAngle = 270;
        }
    }else if(Math.sign(tempBull.x - player.x) <= 0){
        if(Math.sign(tempBull.y-player.y)>0){
            //(-,+)
            addAngle = 90;
        }
    }

    for(i = 0; i < 360; i+= 360/5){
        var soundwave = currentScene.add.sprite(tempBull.x,tempBull.y,'soundwave');
        soundwave.angle = i - addAngle//+ ()*(1-enemyArray[bullBossEnemy].flipX);
        soundwave._initX = tempBull.x;
        soundwave._initY = tempBull.y;


        soundwave._arrayX = [];
        soundwave._arrayY = [];
        soundwave._arrayA = [];
        soundwave._arrayS = [];

                
        soundwave._enemyType = 'soundwave';
        soundwave._state = "move";
        soundwave._noDie = true;
        soundwave._totalVel = 3;
        soundwave._currentVel = soundwave._totalVel;
        soundwave._totalTimer = 80;
        soundwave._currentTimer = 0;
        soundwave._xVel = Math.cos((soundwave.angle+90)*Math.PI/180)*soundwave._totalVel;
        soundwave._yVel = Math.sin((soundwave.angle+90)*Math.PI/180)*soundwave._totalVel;



        soundwave._wave2 = currentScene.add.sprite(tempBull.x,tempBull.y,'soundwave');
        soundwave._wave3 = currentScene.add.sprite(tempBull.x,tempBull.y,'soundwave');

        soundwave._wave2._i = 0;
        soundwave._wave3._i = 0;

        soundwave.setTintFill(0xf0294d);
        soundwave._wave2.setTintFill(0xe326ed);
        soundwave._wave3.setTintFill(0x275df2);


        enemyArray.push(soundwave);

        UICam.ignore([soundwave,soundwave._wave2,soundwave._wave3]);
    }

}



spawnRadialLightning(){


    this.sfxLightningbolt1.play();

    for(i=0;i<enemyArray.length;i++){
        if(enemyArray[i]._enemyType == "bull"){
            var bullBossEnemy = i;
        }
    }

    for(i = 0; i < 360; i+= 360/8){
        var lightningBolt = currentScene.add.sprite(enemyArray[bullBossEnemy].x,enemyArray[bullBossEnemy].y,'lightning2').setOrigin(0.5,0).play('lightning2Anim');
        lightningBolt.angle = i;
        lightningBolt._initX = enemyArray[bullBossEnemy].x;
        lightningBolt._initY = enemyArray[bullBossEnemy].y;

                
        lightningBolt._enemyType = 'lightningBolt';
        lightningBolt._state = "move";
        lightningBolt._noDie = true;
        lightningBolt._totalVel = 5;
        lightningBolt._currentVel = lightningBolt._totalVel;
        lightningBolt._totalTimer = 35;
        lightningBolt._currentTimer = 0;
        lightningBolt._xVel = Math.cos((lightningBolt.angle+90)*Math.PI/180)*lightningBolt._totalVel;
        lightningBolt._yVel = Math.sin((lightningBolt.angle+90)*Math.PI/180)*lightningBolt._totalVel;
        lightningBolt.scale = 0.5;

        enemyArray.push(lightningBolt);

        UICam.ignore([lightningBolt]);
    }

    currentScene.time.addEvent({
        delay: 500,
        callback: () => {
            this.resetSing();
        }
    })

/*        var lightningTween = currentScene.tweens.addCounter({
            from: 0,
            to: 320,
            duration: 1000,
            ease: "Quint.easeIn",
            onUpdate: (tween) => {
                var tweenValue = tween.getValue();
                var angle = lightningBolt.angle;
                lightningBolt.x = lightningBolt._initX + tweenValue*Math.cos(angle*Math.PI/180);
                lightningBolt.y = lightningBolt._initY + tweenValue*Math.sin(angle*Math.PI/180);
            }
        })
    }
*/

/*    var graphics = currentScene.add.graphics({ x: 0, y: 0 });

    console.log("enemy: " + enemy._enemyType)

    currentScene.tweens.addCounter({
        from: 15,
        to: 1,
        duration: 800,
        ease: "Cubic.easeOut",
        onUpdate: (tween) => {
            graphics.clear()

            graphics.lineStyle(tween.getValue(), 0xffaa00);
            graphics.beginPath();
        
        
            for (let i = 0; i < 360; i+=360/8)
            {
                graphics.moveTo(enemy.x, enemy.y);
                graphics.lineTo(320*Math.cos(i*Math.PI/180),320*Math.sin(i*Math.PI/180));
            }
        
            graphics.closePath();
            graphics.strokePath();
        },
        onComplete: () => {

        },
    });

*/



}


spawnThunderclouds(enemy){
    var lightning = currentScene.add.sprite(0,0,'lightning').setOrigin(0.5,0.15).setVisible(false);
    var thundercloud = currentScene.add.sprite(player.x,player.y-300,'thundercloud').play('thundercloud1');

    UICam.ignore([thundercloud,lightning]);

    var thunderChain = currentScene.tweens.chain({
        targets: thundercloud,
        tweens:[
            {
                at: 0,
                duration: 1300,
                onStart: () => {
                    sfxCloud.play();
                },
                onUpdate: () => {
                    thundercloud.x += (player.x - thundercloud.x-100)* 0.1
                    thundercloud.y += (player.y - thundercloud.y+30)* 0.1
                }
            },
            {
                from: 0,
                duration: 1300,
                onStart: () => {
                },
                onUpdate: () => {
                    thundercloud.x += (player.x - thundercloud.x+85)* 0.08
                    thundercloud.y += (player.y - thundercloud.y-90)* 0.08
                }
            },
            {
                from: 0,
                duration: 250,
                repeat: 7,
                onStart: () => {
                },
                onRepeat: () => {
                    if(thundercloud.anims.currentAnim.key == "thundercloud2"){
                        thundercloud.play({key: 'thundercloud1',startFrame: Phaser.Math.Clamp(thundercloud.anims.currentFrame.index-3,0,2)})
                    }else{
                        thundercloud.play({key: 'thundercloud2',startFrame: Phaser.Math.Clamp(thundercloud.anims.currentFrame.index+3,0,2)})
                    }
                },
                onUpdate: () => {
                    thundercloud.x += (player.x - thundercloud.x)* 0.04
                    thundercloud.y += (player.y - thundercloud.y-60)* 0.04
                }
            },
            {
                from: 0,
                duration: 40,
                repeat: 16,
                onStart: () => {
                    sfxThunder.play();
                },
                onRepeat: () => {
                    if(thundercloud.anims.currentAnim.key == "thundercloud2"){
                        thundercloud.play({key: 'thundercloud1',startFrame: Phaser.Math.Clamp(thundercloud.anims.currentFrame.index-3,0,2)})
                    }else{
                        thundercloud.play({key: 'thundercloud2',startFrame: Phaser.Math.Clamp(thundercloud.anims.currentFrame.index-3,0,2)})
                    }
                }
            },
            {
                from: 0,
                duration: 500,
                onStart: () => {
//                    if(thundercloud.anims.currentAnim.key == "thundercloud1"){
                        thundercloud.play('thundercloud2')
//                    }
                    cam.flash(400);
//                    sfxExplosion2.play();
                    sfxLightning.play();
                    lightning.x = thundercloud.x;
                    lightning.y = thundercloud.y;
                    lightning.setVisible(true).play('lightning1');

                    cam.shake()
                    UICam.shake();

                    if(this.getTilesWithin(mapArray,thundercloud.x,thundercloud.y+50,40,100).includes(drawColor)){
                        this.killPlayer(lightning.x,lightning.y);
                    }


                }
                
            },
            {
                from: 0,
                duration: 1500,
                onStart: () => {
                    thundercloud.play('thundercloud1')
                    lightning.destroy();
                }
            },
            {
                from: 0,
                duration: 800,
                y: '-= 300',
                ease: 'Cubic.easeIn',
                onComplete: () => {
                    this.resetSing();
                }
            }
        ]
    })

    thunderChain.setCallback('onComplete',()=>{thundercloud.destroy()});

}



 fillTiles(){
    drawRT.clear();

    var trueCanFill = false;

    var canFill = false;
    var borderFill = false;
    var checkX1 = 0;
    var checkX2 = 0;
    var checkY1 = 0;
    var checkY2 = 0;

    for (i=0;i<imageWidth;i++){
        for (j=0;j<imageHeight;j++){
            if(mapArray[i][j]==drawColor && !canFill){
                
                if(mapArray[i-1][j] == baseColor && mapArray[i+1][j] == baseColor){
                    //left+right
                    checkX1 = i-1;
                    checkX2 = i+1;
                    checkY1 = j;
                    checkY2 = j;
                    canFill = true;

                }else if(mapArray[i][j-1] == baseColor && mapArray[i][j+1] == baseColor){
                    //up+down
                    checkX1 = i;
                    checkX2 = i;
                    checkY1 = j-1;
                    checkY2 = j+1;
                    canFill = true;
                }
                    
                
            }
        }
    }

    console.log("checkX1: " + checkX1)
    console.log("checkX2: " + checkX2)
    console.log("checkY1: " + checkY1)
    console.log("checkY2: " + checkY2)

    //sigh, gotta check the literal edge cases
    if(!canFill){
        for (i=0;i<imageWidth;i++){
            for (j=0;j<imageHeight;j++){
                if(mapArray[i][j]==drawColor && !canFill){
                    
                    if(mapArray[i+1][j] == borderColor && mapArray[i-1][j] == baseColor){
                        checkX1 = i-1;
                        checkY1 = j;
                        canFill = true;
                        borderFill = true;
                    }else if(mapArray[i+1][j] == baseColor && mapArray[i-1][j] == borderColor){
                        checkX1 = i+1;
                        checkY1 = j;
                        canFill = true;
                        borderFill = true;
                    }else if(mapArray[i][j+1] == borderColor && mapArray[i][j-1] == baseColor){
                        checkX1 = i;
                        checkY1 = j-1;
                        canFill = true;
                        borderFill = true;
                    }else if(mapArray[i][j+1] == baseColor && mapArray[i][j-1] == borderColor){
                        checkX1 = i;
                        checkY1 = j+1;
                        canFill = true;
                        borderFill = true;
                    }
                    
                }
            }
        }
    }



    if(canFill){
        //man wtf did i do with the original code
        console.log("TIME TO REGULAR FILL")
        this.clearFillCheck();
        this.checkFill(checkX1,checkY1,false,false,"both");
        var counter1 = checkFillCounter;

        this.clearFillCheck();
        this.checkFill(checkX2,checkY2,false,false,"both");
        var counter2 = checkFillCounter;
        
        this.clearFillCheck();

    }else if(canFill && borderFill){

        console.log("TIME TO BORDER FILL")
        this.clearFillCheck();
        this.checkFill(checkX1,checkY1,false,false,"both");
        var counter1 = checkFillCounter;
        
        this.clearFillCheck();

    }
    


  
    //holy hell the rest*****************


    if(canFill){


        if(!borderFill){
            if(counter1 < counter2){
                this.checkFill(checkX1,checkY1,false,false,"both")
            }else{
                this.checkFill(checkX2,checkY2,false,false,"both")
            }
        }else{
            this.checkFill(checkX1,checkY1,false,false,"both")
        }
    
    
    
        actualFillCounter = 0
        this.performFill();
    
        this.makeEverythingYellow();

        this.checkAdjacentTrans();
    
        this.revealImage();
    
        this.calculateScore();
    
        if(percentageDelta >= 0.1 || actualFillCounter > 5){
            if(percentageDelta < 0.1){
                this.transScoreChange();
                sfxSuccess.play();
                sfxExplosion.play();
                cam.shake(100,0.02);
                UICam.shake(100,0.02);
            }else{
                this.percPopup();
    
                this.flashSilh();
    
                if(this.finishedImageTween != undefined){
                    if(this.finishedImageTween.isPlaying()){
                        this.finishedImageTween.stop()
                    }    
                }
    
                this.imgBright.brightness(1.25);
                this.gagimgBright.brightness(1.25);        
    
                this.finishedImageTween = currentScene.tweens.addCounter({
                    from: 1.25,
                    to: 1,
                    duration: 200,
                    delay: 50,
                    ease: "Quad.easeIn",
                    onUpdate: () => {
                        var value = this.finishedImageTween.getValue()
                        this.imgBright.brightness(value);
                        this.gagimgBright.brightness(value);        
                    }
                })
            
            }
        }else{
                this.transScoreChange();
                sfxSuccess.play();    
        }
    
    
    
        if((this.ePress || percentageRevealed > 30) && !this.isScroll){
    
            console.log("SCROOL!!!!")
    
            //todo: add sound effect, add SCROLL popup text, maybe add some images
    
            this.isScroll = true;
    
            cam.setBounds(0,0,imageWidth,imageHeight);
            cam.setLerp(0.01,0.01)
    
    //        this.bleh = 0;
    
            if(imageWidth > screenW){
                for (i=screenW-borderWidth;i<imageWidth-borderWidth+1;i++){
                    for (j=borderWidth;j<imageHeight-borderWidth+1;j++){
                        if(mapArray[i][j] == borderColor){
                            mapArray[i][j] = baseColor;
    //                        this.bleh++;
                        }
                    }
                }        
    
            }else if(imageHeight > screenH){
                for (i=borderWidth;i<imageWidth-borderWidth+1;i++){
                    for (j=screenH-borderWidth;j<imageHeight-borderWidth+1;j++){
                        if(mapArray[i][j] == borderColor){
                            mapArray[i][j] = baseColor;
    //                        this.bleh++;
                        }
                    }
                }        
            }
    
    //        console.log("BLEHHHH: " + this.bleh)
    
        this.scrollImage = currentScene.add.image(screenW/2,-50,'scroll')
        cam.ignore([this.scrollImage])
    
            var scrollTween = this.tweens.chain({
                targets: this.scrollImage,
                tweens:[
                    {
                        at: 0,
                        duration: 50,
                        y:{
                            from: -50,
                            to: screenH+50
                        }
                    },
                    {
                        from: 0,
                        duration: 100,
                        y: {
                            from: -50,
                            to: screenH+50
                        }
                    },
                    {
                        from: 0,
                        duration: 150,
                        y: {
                            from: -50,
                            to: screenH+50
                        }
                    },
                    {
                        from: 0,
                        duration: 200,
                        y: {
                            from: -50,
                            to: screenH+50
                        }
                    },
                    {
                        from: 0,
                        duration: 500,
                        y: {
                            from: -50,
                            to: screenH/2
                        },
                        ease: "Circ.easeOut"
                    },
                    {
                        from: 750,
                        delay: 1200,
                        duration: 700,
                        y: -200,
                        ease: "Back.easeIn",
                        onComplete: () => {
                            cam.setLerp(0.1,0.1);
                            this.scrollImage.destroy();
                        }
                    },
                ]
            });
         
            
    
        }
    
    
        if(enemyArray.length > 0){
            for(i=0;i<enemyArray.length;i++){
                if(enemyArray[i].x > borderWidth && enemyArray[i].x < screenW - borderWidth 
                    && enemyArray[i].y > borderWidth && enemyArray[i].y < screenH - borderWidth)
                if(mapArray[Math.floor(enemyArray[i].x)][Math.floor(enemyArray[i].y)]==transColor){
                    if(!enemyArray[i]._noDie){
                        enemyArray[i]._state = "die";
                    }
                }
            }    
        }
    
        if(itemArray.length > 0 && !bossKill){
            for(i=0;i<itemArray.length;i++){
                if(mapArray[Math.floor(itemArray[i].x)][Math.floor(itemArray[i].y)] == transColor && itemArray[i]._itemDestroy.paused){
                    itemArray[i].setTintFill(0xffffff);
                    itemArray[i].setAlpha(1);
                    itemArray[i]._itemDestroy.paused = false;
                    if(itemArray[i]._type == "food"){
    
                        this.healthEmitter.x = player.x;
                        this.healthEmitter.y = player.y;
                        this.healthEmitter.start();
    
                        this.sfxHeal.play();
    
                        if(itemArray[i]._favFood){
                            //image popup here
                            var popupFood = currentScene.add.image(itemArray[i].x+30,itemArray[i].y-30,'favBubble').setOrigin(0.5,0.5);
                            this.addSparkles(35,popupFood.x,popupFood.y)
                            popupFood.setDepth(3)
                            heartEmitter.emitParticleAt(popupFood.x,popupFood.y)
                            sfxFavFood.play();
    
                            UICam.ignore([popupFood])
    
                            
                            currentScene.add.timeline([
                                {
                                    at: 0,
                                    run: () => {
                                        popupFood.scaleX = 3;
                                        popupFood.scaleY = 0.1;
                                        popupFood.alpha = 0.5
                                    },
                                    tween:{
                                        targets: popupFood,
                                        ease: 'Back.easeOut',
                                        scaleX: 1,
                                        scaleY: 1,
                                        alpha: 1,
                                        duration: 200,
                                        delay: 150,
                                    }
                                },
                                {
                                    from: 1200,
                                    run: () => {
                                    },
                                    tween:{
                                        targets: popupFood,
                                        ease: 'Back.easeIn',
                                        scaleX: 3,
                                        scaleY: 0.1,
                                        alpha: 0,
                                        duration: 150,
                                    }
                                },
                                {
                                    from: 300,
                                    run: () => {
                                        popupFood.destroy();
                                    }
                                }
                            ]).play(true);
                            this.increaseHealth(6);
                        }else{
                            if(gagMode){
                                this.increaseHealth(2);
                            }else{
                                this.increaseHealth();
                            }    
                        }
                    }else if(itemArray[i]._type == "speed"){
                        player._speedUp = true;
                        player._speedTimer = 300;
                        this.speedupPopup();
                        sfxSpeedup.play();
                    }else if(itemArray[i]._type == "zap"){
                        //ZAP!! jk its probably more of an explosion
    //                    console.log(enemyArray.length)
                        if(enemyArray.length > 0){
                            for(i=0;i<enemyArray.length;i++){
                                if(!enemyArray[i]._isBoss){
                                    enemyArray[i]._state = "die";
                                }
                            }    
                        }
                        cam.flash(100);
                        sfxExplosionLong.play()
    //                    sfxBurst.play();
                        this.zapPopup();
                        this.spawnShockwave();
                        this.spawnExplodeWave();
                    }else if(itemArray[i]._type == "slow"){
                        console.log("SLOW!!")
                        if(enemyArray.length > 0){
    //                        for(i=0;i<enemyArray.length;i++){
    //                            enemyArray[i]._vel = 0.5;
    //                        }
                            enemyArray.forEach((enemy) => 
                                {
                                    enemy._vel = 0.25
    
                                    if(enemy._isBoss){
                                        enemy._spriteOverlay = currentScene.add.sprite(enemy.x,enemy.y,'webBig')
                                    }else{
                                        enemy._spriteOverlay = currentScene.add.sprite(enemy.x,enemy.y,'webSmall')
                                    }
                                    enemy._spriteOverlay.scale = enemy.scale;
                                    UICam.ignore([enemy._spriteOverlay])
            
                                });
    
    
                            //animation that shows enemy slowed? like a tint or a jelly glob?
                            currentScene.time.delayedCall(6000, () =>
                                {
                                    if(enemyArray.length > 0){
                                        enemyArray.forEach((enemy) => {
                                            enemy._vel = 1
                                            if(enemy._spriteOverlay != undefined){
                                                enemy._spriteOverlay.destroy();
                                            }
                                        });
                                    }
                                });
                        }
                        this.slowPopup();     
                        this.spawnShockwave();  
                        sfxSlow.play();
                    }else if(itemArray[i]._type == "stop"){
                        console.log("STOP!!")
                        enemyArray.forEach((enemy) => 
                            {
                                if(enemy._state != "die"){
                                    enemy._state = "stop"
                                    if(enemy._isBoss){
                                        enemy._spriteOverlay = currentScene.add.sprite(enemy.x,enemy.y,'iceBig').play('iceBigAnim');
                                    }else if(!enemy._noDie){
                                        enemy._spriteOverlay = currentScene.add.sprite(enemy.x,enemy.y,'iceSmall').play('iceSmallAnim');
                                    }
                                    if(enemy._spriteOverlay != undefined){
                                        enemy._spriteOverlay.scale = enemy.scale;
                                        UICam.ignore([enemy._spriteOverlay])    
                                    }
                            }
                            });
                        //animation that shows enemy frozen? like ice crystal?
                        //maybe a timer shows up too
                        currentScene.time.delayedCall(4000, () =>
                            {
                                if(enemyArray.length > 0){
                                    enemyArray.forEach((enemy) => 
                                        {
                                            if(enemy._state != "die"){
                                                enemy._state = "move"
                                            }
                                            
                                            if(enemy._spriteOverlay != undefined){
                                                enemy._spriteOverlay.destroy();
                                            }
                                        });
                                }
                            });
                            this.stopPopup();     
                            this.spawnShockwave();
                            stopTimerText.setVisible(true);
                            stopTimerTextRight.setVisible(true);
    
                            sfxFreeze.play();
    
                            stopTimer = currentScene.time.delayedCall(4000, () =>
                                {
                                    stopTimerText.setVisible(false);
                                    stopTimerTextRight.setVisible(false)
                                });
                    }else if(itemArray[i]._type == "shrink"){
                        console.log("SHRINK!!")
    
                        sfxShrink.play()
    
                        currentScene.tweens.addCounter({
                            from: 1,
                            to: 0.5,
                            duration: 500,
                            onUpdate: (tween) => {
                                if(enemyArray.length > 0){
                                    enemyArray.forEach((enemy) => enemy._size = tween.getValue());
                                }
                            },
                            onComplete: () => {
                                if(enemyArray.length > 0){
                                    enemyArray.forEach((enemy) => enemy._size = 0.5);
                                }
                            },
                        });
    
    
                        currentScene.time.delayedCall(7000, () =>
                            {
                                currentScene.tweens.addCounter({
                                    from: 0.5,
                                    to: 1,
                                    duration: 500,
                                    onUpdate: (tween) => {
                                        if(enemyArray.length > 0){
                                            enemyArray.forEach((enemy) => enemy._size = tween.getValue());
                                        }
                                    },
                                    onComplete: () => {
                                        if(enemyArray.length > 0){
                                            enemyArray.forEach((enemy) => enemy._size = 1);
                                        }
                                    },
                                });
                    
                            });
    
                            this.shrinkPopup();
                            this.spawnShockwave();
                    }
    
                }    
            }
        }
    
    }

}


 fillTiles2(){

//    hasDrawn = map.findByIndex(drawColor);

//    console.log("Has drawn?: ");
//    console.log(hasDrawn);


    //check which corner is smaller


    drawRT.clear();

    leftMax = imageWidth/2;
    rightMax = imageWidth/2;
    upMax = imageHeight/2;
    downMax = imageHeight/2;

    trueCheck = true;


    this.makeEverythingYellow();

    var floodIndexUR = mapArray[player.x+1][player.y-1]==baseColor;
    var floodIndexDR = mapArray[player.x+1][player.y+1]==baseColor;
    var floodIndexDL = mapArray[player.x-1][player.y+1]==baseColor;
    var floodIndexUL = mapArray[player.x-1][player.y-1]==baseColor;

//    console.log("Can check top right?: " + floodIndexUR);
//    console.log("Can check bottom right?: " + floodIndexDR);
//    console.log("Can check bottom left?: " + floodIndexDL);
//    console.log("Can check top left?: " + floodIndexUL);


    var cornerCheck = (floodIndexUR ? 1 : 0) + (floodIndexDR ? 1 : 0) + (floodIndexDL ? 1 : 0) + (floodIndexUL ? 1 : 0);

    var isCorner = false;

    if (cornerCheck >=3){
//        console.log("This is a corner!");
        isCorner = true;

        var floodIndexL = mapArray[player.x-1][player.y]==baseColor;
        var floodIndexR = mapArray[player.x+1][player.y]==baseColor;
        var floodIndexD = mapArray[player.x][player.y+1]==baseColor;
        var floodIndexU = mapArray[player.x][player.y-1]==baseColor;
    
//        console.log("Can check left?: " + floodIndexL);
//        console.log("Can check right?: " + floodIndexR);
//        console.log("Can check bottom?: " + floodIndexD);
//        console.log("Can check top?: " + floodIndexU);
    
    }else{
//        console.log("Not a corner!")
    }

    if(!isCorner)
    {
    this.clearFillCheck();
    if(floodIndexUR) this.checkFill(player.x+1,player.y-1,false,false,"both");
    var URCounter = checkFillCounter;
    this.clearFillCheck();

    if(floodIndexDR) this.checkFill(player.x+1,player.y+1,false,false,"both");
    var DRCounter = checkFillCounter;
    this.clearFillCheck();

    if(floodIndexDL) this.checkFill(player.x-1,player.y+1,false,false,"both");
    var DLCounter = checkFillCounter;
    this.clearFillCheck();

    if(floodIndexUL) this.checkFill(player.x-1,player.y-1,false,false,"both");
    var ULCounter = checkFillCounter;
    this.clearFillCheck();
    }else{
        this.clearFillCheck();
        if(floodIndexUR) this.checkFill(player.x+1,player.y-1,false,false,"both");
        var URCounter = checkFillCounter;
        this.clearFillCheck();
    
        if(floodIndexDR) this.checkFill(player.x+1,player.y+1,false,false,"both");
        var DRCounter = checkFillCounter;
        this.clearFillCheck();
    
        if(floodIndexDL) this.checkFill(player.x-1,player.y+1,false,false,"both");
        var DLCounter = checkFillCounter;
        this.clearFillCheck();
    
        if(floodIndexUL) this.checkFill(player.x-1,player.y-1,false,false,"both");
        var ULCounter = checkFillCounter;
        this.clearFillCheck();

        if(floodIndexL) this.checkFill(player.x-1,player.y-1,false,false,"both");
        var LCounter = checkFillCounter;
        this.clearFillCheck();

        if(floodIndexR) this.checkFill(player.x+1,player.y-1,false,false,"both");
        var RCounter = checkFillCounter;
        this.clearFillCheck();

        if(floodIndexD) this.checkFill(player.x,player.y+1,false,false,"both");
        var DCounter = checkFillCounter;
        this.clearFillCheck();

        if(floodIndexU) this.checkFill(player.x,player.y-1,false,false,"both");
        var UCounter = checkFillCounter;
        this.clearFillCheck();


//        console.log("L: " + LCounter)
//        console.log("R: " + RCounter)
//        console.log("D: " + DCounter)
//        console.log("U: " + UCounter)

    }

//    console.log("UR: " + URCounter)
//    console.log("DR: " + DRCounter)
//    console.log("DL: " + DLCounter)
//    console.log("UL: " + ULCounter)



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

//    console.log("min numebr: " + min)

//    console.log(findMin[min]);


    trueCheck = true;

//    console.log("current Color: " + mapArray[player.x+1,player.y-1];
    
if(!isCorner)
{
    if(min == 'UR')
    {
        this.checkFill(player.x+1,player.y-1,false,false,"both");
    }else if(min=='DR'){
        this.checkFill(player.x+1,player.y+1,false,false,"both");
    }else if(min=='DL'){
        this.checkFill(player.x-1,player.y+1,false,false,"both");
    }else if(min=='UL'){
        this.checkFill(player.x-1,player.y-1,false,false,"both");
    }
}else{
    if(min == 'UR')
    {
        this.checkFill(player.x+1,player.y-1,false,false,"both");
    }else if(min=='DR'){
        this.checkFill(player.x+1,player.y+1,false,false,"both");
    }else if(min=='DL'){
        this.checkFill(player.x-1,player.y+1,false,false,"both");
    }else if(min=='UL'){
        this.checkFill(player.x-1,player.y-1,false,false,"both");
    }else if(min == 'L'){
        this.checkFill(player.x-1,player.y,false,false,"both");
    }else if(min=='R'){
        this.checkFill(player.x+1,player.y,false,false,"both");
    }else if(min=='D'){
        this.checkFill(player.x,player.y+1,false,false,"both");
    }else if(min=='U'){
        this.checkFill(player.x,player.y-1,false,false,"both");
    }
    
}

/*    console.log("leftMax: " + leftMax)
    console.log("rightMax: " + rightMax)
    console.log("upMax: " + upMax)
    console.log("downMax: " + downMax)
*/
//    checkFillRest();


//    console.log("FULL CHECK PERFORMED")

    actualFillCounter = 0
    this.performFill();

//    console.log("FILL PERFORMED")

this.checkAdjacentTrans();

    this.revealImage();

    this.calculateScore();

    if(percentageDelta >= 0.1 || actualFillCounter > 5){
        if(percentageDelta < 0.1){
            this.transScoreChange();
            sfxSuccess.play();
            sfxExplosion.play();
            cam.shake(100,0.02);
            UICam.shake(100,0.02);
        }else{
            this.percPopup();

            this.flashSilh();

            if(this.finishedImageTween != undefined){
                if(this.finishedImageTween.isPlaying()){
                    this.finishedImageTween.stop()
                }    
            }

            this.imgBright.brightness(1.25);
            this.gagimgBright.brightness(1.25);        

            this.finishedImageTween = currentScene.tweens.addCounter({
                from: 1.25,
                to: 1,
                duration: 200,
                delay: 50,
                ease: "Quad.easeIn",
                onUpdate: () => {
                    var value = this.finishedImageTween.getValue()
                    this.imgBright.brightness(value);
                    this.gagimgBright.brightness(value);        
                }
            })
        
        }
    }else{
            this.transScoreChange();
            sfxSuccess.play();    
    }



    if((this.ePress || percentageRevealed > 30) && !this.isScroll){

        console.log("SCROOL!!!!")

        //todo: add sound effect, add SCROLL popup text, maybe add some images

        this.isScroll = true;

        cam.setBounds(0,0,imageWidth,imageHeight);
        cam.setLerp(0.01,0.01)

//        this.bleh = 0;

        if(imageWidth > screenW){
            for (i=screenW-borderWidth;i<imageWidth-borderWidth+1;i++){
                for (j=borderWidth;j<imageHeight-borderWidth+1;j++){
                    if(mapArray[i][j] == borderColor){
                        mapArray[i][j] = baseColor;
//                        this.bleh++;
                    }
                }
            }        

        }else if(imageHeight > screenH){
            for (i=borderWidth;i<imageWidth-borderWidth+1;i++){
                for (j=screenH-borderWidth;j<imageHeight-borderWidth+1;j++){
                    if(mapArray[i][j] == borderColor){
                        mapArray[i][j] = baseColor;
//                        this.bleh++;
                    }
                }
            }        
        }

//        console.log("BLEHHHH: " + this.bleh)

    this.scrollImage = currentScene.add.image(screenW/2,-50,'scroll')
    cam.ignore([this.scrollImage])

        var scrollTween = this.tweens.chain({
            targets: this.scrollImage,
            tweens:[
                {
                    at: 0,
                    duration: 50,
                    y:{
                        from: -50,
                        to: screenH+50
                    }
                },
                {
                    from: 0,
                    duration: 100,
                    y: {
                        from: -50,
                        to: screenH+50
                    }
                },
                {
                    from: 0,
                    duration: 150,
                    y: {
                        from: -50,
                        to: screenH+50
                    }
                },
                {
                    from: 0,
                    duration: 200,
                    y: {
                        from: -50,
                        to: screenH+50
                    }
                },
                {
                    from: 0,
                    duration: 500,
                    y: {
                        from: -50,
                        to: screenH/2
                    },
                    ease: "Circ.easeOut"
                },
                {
                    from: 750,
                    delay: 1200,
                    duration: 700,
                    y: -200,
                    ease: "Back.easeIn",
                    onComplete: () => {
                        cam.setLerp(0.1,0.1);
                        this.scrollImage.destroy();
                    }
                },
            ]
        });
     
        

    }


    if(enemyArray.length > 0){
        for(i=0;i<enemyArray.length;i++){
            if(enemyArray[i].x > borderWidth && enemyArray[i].x < screenW - borderWidth 
                && enemyArray[i].y > borderWidth && enemyArray[i].y < screenH - borderWidth)
            if(mapArray[Math.floor(enemyArray[i].x)][Math.floor(enemyArray[i].y)]==transColor){
                if(!enemyArray[i]._noDie){
                    enemyArray[i]._state = "die";
                }
            }
        }    
    }

    if(itemArray.length > 0 && !bossKill){
        for(i=0;i<itemArray.length;i++){
            if(mapArray[Math.floor(itemArray[i].x)][Math.floor(itemArray[i].y)] == transColor && itemArray[i]._itemDestroy.paused){
                itemArray[i].setTintFill(0xffffff);
                itemArray[i].setAlpha(1);
                itemArray[i]._itemDestroy.paused = false;
                if(itemArray[i]._type == "food"){

                    this.healthEmitter.x = player.x;
                    this.healthEmitter.y = player.y;
                    this.healthEmitter.start();

                    this.sfxHeal.play();

                    if(itemArray[i]._favFood){
                        //image popup here
                        var popupFood = currentScene.add.image(itemArray[i].x+30,itemArray[i].y-30,'favBubble').setOrigin(0.5,0.5);
                        this.addSparkles(35,popupFood.x,popupFood.y)
                        popupFood.setDepth(3)
                        heartEmitter.emitParticleAt(popupFood.x,popupFood.y)
                        sfxFavFood.play();

                        UICam.ignore([popupFood])

                        
                        currentScene.add.timeline([
                            {
                                at: 0,
                                run: () => {
                                    popupFood.scaleX = 3;
                                    popupFood.scaleY = 0.1;
                                    popupFood.alpha = 0.5
                                },
                                tween:{
                                    targets: popupFood,
                                    ease: 'Back.easeOut',
                                    scaleX: 1,
                                    scaleY: 1,
                                    alpha: 1,
                                    duration: 200,
                                    delay: 150,
                                }
                            },
                            {
                                from: 1200,
                                run: () => {
                                },
                                tween:{
                                    targets: popupFood,
                                    ease: 'Back.easeIn',
                                    scaleX: 3,
                                    scaleY: 0.1,
                                    alpha: 0,
                                    duration: 150,
                                }
                            },
                            {
                                from: 300,
                                run: () => {
                                    popupFood.destroy();
                                }
                            }
                        ]).play(true);
                        this.increaseHealth(6);
                    }else{
                        if(gagMode){
                            this.increaseHealth(2);
                        }else{
                            this.increaseHealth();
                        }    
                    }
                }else if(itemArray[i]._type == "speed"){
                    player._speedUp = true;
                    player._speedTimer = 300;
                    this.speedupPopup();
                    sfxSpeedup.play();
                }else if(itemArray[i]._type == "zap"){
                    //ZAP!! jk its probably more of an explosion
//                    console.log(enemyArray.length)
                    if(enemyArray.length > 0){
                        for(i=0;i<enemyArray.length;i++){
                            if(!enemyArray[i]._isBoss){
                                enemyArray[i]._state = "die";
                            }
                        }    
                    }
                    cam.flash(100);
                    sfxExplosionLong.play()
//                    sfxBurst.play();
                    this.zapPopup();
                    this.spawnShockwave();
                    this.spawnExplodeWave();
                }else if(itemArray[i]._type == "slow"){
                    console.log("SLOW!!")
                    if(enemyArray.length > 0){
//                        for(i=0;i<enemyArray.length;i++){
//                            enemyArray[i]._vel = 0.5;
//                        }
                        enemyArray.forEach((enemy) => 
                            {
                                enemy._vel = 0.25

                                if(enemy._isBoss){
                                    enemy._spriteOverlay = currentScene.add.sprite(enemy.x,enemy.y,'webBig')
                                }else{
                                    enemy._spriteOverlay = currentScene.add.sprite(enemy.x,enemy.y,'webSmall')
                                }
                                enemy._spriteOverlay.scale = enemy.scale;
                                UICam.ignore([enemy._spriteOverlay])
        
                            });


                        //animation that shows enemy slowed? like a tint or a jelly glob?
                        currentScene.time.delayedCall(6000, () =>
                            {
                                if(enemyArray.length > 0){
                                    enemyArray.forEach((enemy) => {
                                        enemy._vel = 1
                                        if(enemy._spriteOverlay != undefined){
                                            enemy._spriteOverlay.destroy();
                                        }
                                    });
                                }
                            });
                    }
                    this.slowPopup();     
                    this.spawnShockwave();  
                    sfxSlow.play();
                }else if(itemArray[i]._type == "stop"){
                    console.log("STOP!!")
                    enemyArray.forEach((enemy) => 
                        {
                            if(enemy._state != "die"){
                                enemy._state = "stop"
                                if(enemy._isBoss){
                                    enemy._spriteOverlay = currentScene.add.sprite(enemy.x,enemy.y,'iceBig').play('iceBigAnim');
                                }else if(!enemy._noDie){
                                    enemy._spriteOverlay = currentScene.add.sprite(enemy.x,enemy.y,'iceSmall').play('iceSmallAnim');
                                }
                                if(enemy._spriteOverlay != undefined){
                                    enemy._spriteOverlay.scale = enemy.scale;
                                    UICam.ignore([enemy._spriteOverlay])    
                                }
                        }
                        });
                    //animation that shows enemy frozen? like ice crystal?
                    //maybe a timer shows up too
                    currentScene.time.delayedCall(4000, () =>
                        {
                            if(enemyArray.length > 0){
                                enemyArray.forEach((enemy) => 
                                    {
                                        enemy._state = "move"
                                        
                                        if(enemy._spriteOverlay != undefined){
                                            enemy._spriteOverlay.destroy();
                                        }
                                    });
                            }
                        });
                        this.stopPopup();     
                        this.spawnShockwave();
                        stopTimerText.setVisible(true);
                        stopTimerTextRight.setVisible(true);

                        sfxFreeze.play();

                        stopTimer = currentScene.time.delayedCall(4000, () =>
                            {
                                stopTimerText.setVisible(false);
                                stopTimerTextRight.setVisible(false)
                            });
                }else if(itemArray[i]._type == "shrink"){
                    console.log("SHRINK!!")

                    sfxShrink.play()

                    currentScene.tweens.addCounter({
                        from: 1,
                        to: 0.5,
                        duration: 500,
                        onUpdate: (tween) => {
                            if(enemyArray.length > 0){
                                enemyArray.forEach((enemy) => enemy._size = tween.getValue());
                            }
                        },
                        onComplete: () => {
                            if(enemyArray.length > 0){
                                enemyArray.forEach((enemy) => enemy._size = 0.5);
                            }
                        },
                    });


                    currentScene.time.delayedCall(7000, () =>
                        {
                            currentScene.tweens.addCounter({
                                from: 0.5,
                                to: 1,
                                duration: 500,
                                onUpdate: (tween) => {
                                    if(enemyArray.length > 0){
                                        enemyArray.forEach((enemy) => enemy._size = tween.getValue());
                                    }
                                },
                                onComplete: () => {
                                    if(enemyArray.length > 0){
                                        enemyArray.forEach((enemy) => enemy._size = 1);
                                    }
                                },
                            });
                
                        });

                        this.shrinkPopup();
                        this.spawnShockwave();
                }

            }    
        }
    }
}




spawnExplodeWave(xPos = player.x, yPos = player.y){
    //have the radius and num incerase as it goes further out

    explodeAngle = 0;
    explodeDist = 1;


    currentScene.time.addEvent({
        delay: 50,
        repeat: 8,
        callback: () => {
            sfxExplosion.play();

            for(i=0;i<8;i++){
                explodeAngle += (Math.PI/180)*(360/7);
                var xDel = explodeDist * Math.cos(explodeAngle);
                var yDel = explodeDist*Math.sin(explodeAngle)
                this.addExplosions(player.x + xDel,player.y + yDel,5,Math.floor((explodeDist)/20))
            }
            explodeAngle += (360/14) * Math.PI/180
            explodeDist = 1.2*explodeDist + 40;
        }
    });

    var explodeWaveTween = currentScene.tweens.addCounter({

        from: 0,
        to: screenW,
        duration: 1500,
        ease: "Cubic.easeOut",
        onStart: () => {

        },
        onUpdate: () => {
            var value = explodeWaveTween.getValue();

        },
    });
}



flashSilh(){
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




addExplosions(xPos = player.x, yPos = player.y, num = 1,circleScale = 2){


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

addExplosions2(xPos = player.x, yPos = player.y, num = undefined){
    explosionEmitter1.emitParticleAt(xPos,yPos,num);
    explosionEmitter2.emitParticleAt(xPos,yPos,num);
    explosionEmitter3.emitParticleAt(xPos,yPos,num);
}


addSparkles(num = 5, xPos = player.x, yPos = player.y){
    sparkleEmitter.emitParticleAt(xPos,yPos,num);
    sparkleEmitter2.emitParticleAt(xPos,yPos,num);

}


addRainbowstars(xPos = player.x,yPos = player.y){
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


addRainbowstars2(xPos = player.x,yPos = player.y){
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


calculateScore(){
    oldPercentage = percentageRevealed;
    if(gagMode){
        percentageRevealed = Math.floor(10*(100*numRevealed/(gagTotalSilhouette)))/10;
    }else{
        percentageRevealed = Math.floor(10*(100*numRevealed/(totalSilhouette)))/10;
    }
    
    percentageDelta = Math.floor(10*(percentageRevealed-oldPercentage))/10;
    
//    console.log("+" + percentageDelta + "%!")
//    console.log(percentageRevealed + "% cleared!")

}

percPopup(){


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


    if (percentageDelta >= 3){
//        sfxExplosion2.play();
        sfxExplosion.play();
        this.addSparkles(15);
        cam.shake(100);
        UICam.shake(100);
    if(percentageDelta >= 8){
        sfxSuccess2.play();
        this.addRainbowstars2();
            confettiEmitter.explode()
            cam.shake(400);
            UICam.shake(400);
            this.sfxApplause.play();
            }else if(percentageDelta >= 6){
                sfxSuccess2.play();
            this.addRainbowstars2();
            confettiEmitter.explode(200)
            cam.shake(200);
            UICam.shake(200);
            }else{
                this.sfxSuccess25.play();
            this.addRainbowstars();
        }
        flashBrightness = 1.7
//        glowSprite.x = player.x;
//        glowSprite.y = player.y;
//        glowSprite.setVisible(true);
//        glowSprite.play({key: 'glowAnim'});
        this.glowShine2();
    }else{
        sfxSuccess.play();
        sfxExplosion.play();
        cam.shake(100,0.02);
        UICam.shake(100,0.02);
        this.addSparkles();
        flashBrightness = 1.2
//        glowSprite.x = player.x;
//        glowSprite.y = player.y;
//        glowSprite.setVisible(true);
//        glowSprite.play({key: 'glowAnim'});
        this.glowShine2();
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
    ease: 'Cubic.easeIn',

    onStart: () => {
//        this.sfxScoreTicker.play();
    }




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
            fontSize: percentageDelta >= 7.5 ? 32 : 24, //change depending on text above
            hold: 800,
            onStart: () => {
                if(percentageDelta >= 8){
                    //wunderbar with rottweiler
                    flavorText.text = `WONDERFUL!`;
                }else if(percentageDelta >= 6){
                    flavorText.text = `AMAZING!`;
                }else if(percentageDelta >= 3){
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


transScoreChange(){


    scoreText.text = `${Math.floor(percentageRevealed)}`;
    scoreTextRight.text = `.${Math.floor(10*(percentageRevealed-Math.floor(percentageRevealed)))}%`;

}

makeEverythingYellow()
{
    layerRT.beginDraw();
    for (i=0;i<imageWidth;i++){
        for (j=0;j<imageHeight;j++){
            if(mapArray[i][j]==drawColor){
                mapArray[i][j] = edgeColor;
                layerRT.batchDrawFrame('baseTiles',edgeColor,i,j);
            }
        }
    }
    layerRT.endDraw();
}

clearFillCheck(){
    checkFillCounter = 0;
    for(i=0;i<imageWidth;i++){
        for(j=0;j<imageHeight;j++){
            if(mapArray[i][j] == checkColor){
                mapArray[i][j] = baseColor;
            }
        }
    }
}



performFill(){
    var bossArray = [];
    if(enemyArray.length != 0){
        for (i=0;i<enemyArray.length;i++){
            if(enemyArray[i]._isBoss){
                bossArray.push(i);
            }
        }
    }
    
    var firstBoss = enemyArray[bossArray[0]];

    if(mapArray[Math.floor(firstBoss.x)][Math.floor(firstBoss.y)] == checkColor && bossArray.length == 1){
        for(i=0;i<imageWidth;i++){
            for(j=0;j<imageHeight;j++){
                if(mapArray[i][j] == baseColor){
                    mapArray[i][j] = transColor;
                    actualFillCounter++;
                }
                else if(mapArray[i][j] == checkColor){
                    mapArray[i][j] = baseColor;
                }
            }
        }
        bossKill = true;
        if(itemArray.length > 0){
            itemArray.forEach((item) => item.destroy());
        }
//        enemyArray.forEach((enemy) => {if(!enemy._isBoss){enemy.destroy()}});

//        winRound();
    }else{
        for(i=0;i<imageWidth;i++){
            for(j=0;j<imageHeight;j++){
                if(mapArray[i][j] == checkColor){
                    mapArray[i][j] = transColor;
                    actualFillCounter++;
                }
            }
        }    
    }
}


checkFill(xPos,yPos,checkedLeft = false,checkedRight = false,dir)
{
    if(xPos>borderWidth-1 && xPos<imageWidth-borderWidth+1 && yPos>borderWidth-1 && yPos<imageHeight-borderWidth+1
        && mapArray[xPos][yPos] != borderColor && checkFillCounter < 99999){
        if(mapArray[xPos][yPos]==baseColor && mapArray[xPos][yPos] != checkColor){

            mapArray[xPos][yPos] = checkColor;
            checkFillCounter++;
//            console.log("isChecked? : " + mapArray[xPos][yPos]._isChecked)

            if(checkedLeft && (mapArray[xPos-1][yPos]==edgeColor || mapArray[xPos-1][yPos]==drawColor)){
                checkedLeft = false;
            }else if(!checkedLeft && mapArray[xPos-1][yPos]==baseColor && mapArray[xPos-1][yPos] != checkColor){
                this.checkFill(xPos-1,yPos,false,true,"both");
                checkedLeft = true;
            }

            if(checkedRight && (mapArray[xPos+1][yPos]==edgeColor || mapArray[xPos+1][yPos]==drawColor)){
                checkedRight = false;
            }else if(!checkedRight && mapArray[xPos+1][yPos]==baseColor && mapArray[xPos+1][yPos] != checkColor){
                this.checkFill(xPos+1,yPos,true,false,"both");
                checkedRight = true;
            }

            if(dir=="up"){
                this.checkFill(xPos,yPos-1,checkedLeft,checkedRight,"up");
            }else if(dir=="down"){
                this.checkFill(xPos,yPos+1,checkedLeft,checkedRight,"down");
            }else if(dir=="both"){
                this.checkFill(xPos,yPos-1,checkedLeft,checkedRight,"up");
                this.checkFill(xPos,yPos+1,checkedLeft,checkedRight,"down");
            }



        }
    }else if(checkFillCounter < 99999){
        checkFillCounter=99999
//        console.log("Border at: (" + xPos + ", " + yPos + ")")
    }

}


revealImage(){

    
    
    rt.clear();

    numRevealed = 0;



//    revealMask = [...Array(imageHeight)].map(e => Array(imageWidth).fill(4));

    rt.beginDraw()
    
    for (i=borderWidth;i<imageWidth-borderWidth+1;i++){
        for (j=borderWidth;j<imageHeight-borderWidth+1;j++){
            if(mapArray[i][j]==transColor){
//                revealMask[j][i] = 0;
                rt.batchDrawFrame('baseTiles',3,i,j)
                if (silhouetteMatrix[j][i] == 1 && imageSilh.visible){
                    numRevealed++;
                }else if (gagSilhouetteMatrix[j][i] == 1 && gagImageSilh.visible){
                    numRevealed++;
                }
            }else{
//                rt.batchDrawFrame('baseTiles',4,i,j)
            }
        }
    }

    rt.endDraw()




}


checkFill2(xPos,yPos,checkedRight = false,checkedLeft=false,dir="both")
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

    while(mapArray[xPos,topCheck]==baseColor){
        if(mapArray[xPos,topCheck]==baseColor){
    
            mapArray[xPos,topCheck]._isChecked = true;


    
            if(checkedLeft && (mapArray[xPos-1,topCheck]==edgeColor || mapArray[xPos-1,topCheck]==drawColor))
                {
                    checkedLeft = false;
                }
                else if(!checkedLeft && mapArray[xPos-1,topCheck]==baseColor)
                {
                    if(mapArray[xPos-1,topCheck-1]==baseColor && mapArray[xPos-1,topCheck+1]==baseColor){
                        checkFill(xPos-1,topCheck,true,false,"both");
                    }else if(mapArray[xPos-1,topCheck-1]==baseColor){
                        checkFill(xPos-1,topCheck,true,false,"up");
                    }else if(mapArray[xPos-1,topCheck+1]==baseColor){
                        checkFill(xPos-1,topCheck,true,false,"down");
                    }
                    checkedLeft=true;
                }
            if(checkedRight && (mapArray[xPos+1,topCheck]==edgeColor || mapArray[xPos+1,topCheck]==drawColor))
                {
                    checkedRight = false;
                }
                else if(!checkedRight && mapArray[xPos+1,topCheck]==baseColor)
                {
                    if(mapArray[xPos+1,topCheck-1]==baseColor && mapArray[xPos+1,topCheck+1]==baseColor){
                        checkFill(xPos+1,topCheck,false,true,"both");
                    }else if(mapArray[xPos-1,topCheck-1]==baseColor){
                        checkFill(xPos+1,topCheck,false,true,"up");
                    }else if(mapArray[xPos-1,topCheck+1]==baseColor){
                        checkFill(xPos+1,topCheck,false,true,"down");
                    }
                    checkedRight=true;
                }

                if(dir=="up")
                {
                    if(mapArray[xPos,topCheck-1]==baseColor){
                        checkFill(xPos,topCheck-1,true,true,"up");
                    }
                }else if(dir=="down"){
                    if(mapArray[xPos,topCheck+1]==baseColor){
                        checkFill(xPos,topCheck+1,true,true,"down");
                    }
                }else if(dir=="both"){
                    if(mapArray[xPos,topCheck-1]==baseColor){
                        checkFill(xPos,topCheck-1,true,true,"up");
                    }
                    if(mapArray[xPos,topCheck+1]==baseColor){
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
            mapArray[xPos,i)._isChecked = true;
            checkFillCounter++;
        } */
}


checkFillBottom(xPos,yPos,checkedRight = false,checkedLeft=false)
{
    var botCheck= yPos;

            if(mapArray[xPos,botCheck-1]!=edgeColor && mapArray[xPos,botCheck-1]!=drawColor){
        
                mapArray[xPos,botCheck]._isChecked = true;
        
        
                if(checkedLeft && (mapArray[xPos-1,botCheck]==edgeColor || mapArray[xPos-1,botCheck]==drawColor))
                    {
                        checkedLeft = false;
                    }
                    else if(!checkedLeft && mapArray[xPos-1,botCheck]==baseColor)
                    {
                        this.checkFill(xPos-1,botCheck,true,false);
                        checkedLeft=true;
                    }
                if(checkedRight && (mapArray[xPos+1,botCheck]==edgeColor || mapArray[xPos+1,botCheck]==drawColor))
                    {
                        checkedRight = false;
                    }
                    else if(!checkedRight && mapArray[xPos+1,botCheck]==baseColor)
                    {
                        this.checkFill(xPos+1,botCheck,false,true);
                        checkedRight=true;
                    }
                    botCheck++;
                    checkFillCounter++;
        
                    if(botCheck>imageHeight-4 || xPos < 4 || xPos > imageWidth-4){
                        checkFillCounter=999999999;
                    }
        
    }


}




checkAdjacentTrans(){
    for (i=1;i<imageWidth-1;i++){
        for(j=1;j<imageHeight-1;j++){
            if(mapArray[i][j]==drawColor){
                //map.putTileAt(edgeColor,i,j,undefined,'mainDraw');
                mapArray[i][j] = edgeColor;
            }
            if(mapArray[i][j]==edgeColor && mapArray[i-1][j]==transColor && mapArray[i+1][j]==transColor){
                //map.putTileAt(transColor,i,j,undefined,'mainDraw');
                mapArray[i][j] = transColor;
            }
            if(mapArray[i][j]==edgeColor && mapArray[i][j+1]==transColor && mapArray[i][j-1]==transColor){
                //map.putTileAt(transColor,i,j,undefined,'mainDraw');
                mapArray[i][j] = transColor;
            }
            if(mapArray[i][j]==edgeColor && mapArray[i-1][j]==transColor && mapArray[i-1][j-1]==transColor && mapArray[i][j-1]==transColor && mapArray[i+1][j+1]==transColor){
                //map.putTileAt(transColor,i,j,undefined,'mainDraw');
                mapArray[i][j] = transColor;
            }

        }
    }
}

checkFillRest() {
//    console.log("ADSLKJSAOIASJDIJASD")
    for (i=3;i<=imageWidth-3;i++)
    {
        for(j=3;j<imageHeight-3;j++){
            if(mapArray[i,j]._isChecked && !(mapArray[i,j+1]._isChecked) && mapArray[i,j+1]==baseColor)
            {
//                mapArray[i,j+1)._isChecked = true;
//                checkFillCounter++;
            }
            if(mapArray[i,j]._isChecked && mapArray[i,j+1]==borderColor)
            {
                checkFillCounter=9999999;
            }
        }
    }
}

}





class GameOver extends Phaser.Scene{

    constructor ()
    {
        super({ key: 'GameOverScene', active: false });

        this.rt;
        this.gameOverImage;
        this.cutImages;
        this.canRetry;
        this.retryText;
        this.retryTextTimer;
        this.sceneLaunched;
    }


    preload ()
    {

        this.sound.setVolume(0.5)
        //plugins
        this.load.plugin('rexgridcutimageplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridcutimageplugin.min.js', true);

        //images
        this.load.image('gameOverScreen','assets/image/placeholders/gameover.png');

        //audio
        this.load.audio('gameOverSFX','assets/audio/placeholder/gameover.ogg')
    }


    create (){
//        this.scene.setVisible(false, 'MainRoundScene');

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.sfxGameOver = this.sound.add('gameOverSFX').play();
            }
        })

        keyA = this.input.keyboard.addKey(65);

        this.sceneLaunched = false;
        this.canRetry = false;
        this.retryTextTimer = 0;

        this.gameOverImage = this.add.image(0,0,'gameOverScreen').setOrigin(0,0)


        this.retryText = this.add.text(screenW/2,2*screenH/3,'PRESS BUTTON TO RETRY',{fontFamily: 'Diary of an 8-bit mage', fontSize: 16, color: '#ffffff'}).setVisible(false).setOrigin(0.5,0.5);


        this.rt = this.add.renderTexture(0,0, screenW, screenH).setOrigin(0,0);

        this.rt.camera.x = -cam.scrollX;
        this.rt.camera.y = -cam.scrollY;
//        UICam.scrollX = cam.scrollX;
//        UICam.scrollY = cam.scrollY;

//        this.rt.saveTexture('game');

//        console.log("game over screen here!!")

        const gameScene = this.scene.get('MainRoundScene');

        this.rt.clear();
        this.rt.draw(gameScene.children, 0, 0);

        this.scene.stop('MainRoundScene')

        this.cutImages = this.plugins.get('rexgridcutimageplugin').gridCut(this.rt, 4, 4);

        this.rt.setVisible(false);

//        var randomArray = Array.from({length: 25}, () => Math.floor(Math.random() * 25));


        const nums = new Set();
        while(nums.size !== 16) {
            nums.add(Math.floor(Math.random() * 16));
        }

        var randomArray = [...nums]

        for(i=0;i<randomArray.length;i++){
            this.tweens.add({
                targets: this.cutImages[randomArray[i]],
//                scale: 0.2,
                y: '+=300',
                ease: 'Cubic.easeIn',
                duration: 300,
                delay: i*100,   
            });
    
        }


        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.canRetry = true;
                this.retryText.setVisible(true);
            },
        })


    }

    update() {


        if(this.canRetry){
            this.retryTextTimer++
            if(this.retryTextTimer > 30){
                this.retryText.visible = !this.retryText.visible;
                this.retryTextTimer = 0;
            }


            if(keyA.isDown && !this.sceneLaunched){
                this.sceneLaunched = true;

                this.scene.launch('TransitionScene');
                
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.scene.launch('MainRoundScene');
                        this.scene.stop('GameOverScene')        
                    }
                })

                //should it transition?
            }
        }

    }


}    



class Transition extends Phaser.Scene{

    constructor ()
    {
        super({ key: 'TransitionScene', active: false });
        this.fadedBlack;
        this.startedDetransition;
    }

    create (){
        
        this.sound.setVolume(0.5)

        var rect = this.add.rectangle(0, 0, screenW, screenH, 0x000000).setAlpha(0).setOrigin(0,0);
        this.add.tween({
            targets: rect,
            duration: 500,
            alpha: 1,
            yoyo: true,
            hold: 500,
            onComplete: () => {
                this.scene.stop('TransitionScene');
            }

        })

        this.scene.bringToTop()

    }
}

class CharSelect extends Phaser.Scene{

    constructor ()
    {
        super({ key: 'CharSelectScene', active: false });
    }

    init(){

        this.selectIndex = 0;
        this.oldIndex = -1;
        timeElapsed = 0;
    }

    preload(){

        this.sound.setVolume(0.5)

        this.load.image('tigerTile','assets/image/tilebackground/tigerTile.png');
        this.load.image('unknownTile','assets/image/tilebackground/unknownTile.png');
        this.load.image('blankStar','assets/image/portraits/blankStar.png');

        this.load.image('blank','assets/image/portraits/blank.png');
        this.load.image('tiger','assets/image/portraits/tiger.png');

        this.load.spritesheet('select','assets/image/portraits/select.png',{frameWidth: 50, frameHeight: 50})

        this.load.image('tigerCG','assets/image/cgsprite/TigerCG1.png');
        this.load.image('blankCG','assets/image/cgsprite/blank.png');

        this.load.image('star','assets/image/cgsprite/star.png');

        this.load.image('charSelect','assets/image/portraits/charSelect.png');

        this.load.image('error','assets/image/portraits/error.png');


        this.load.bitmapFont('score', 'assets/fonts/Hardpixel_0.png', 'assets/fonts/Hardpixel.fnt');
        this.load.bitmapFont('description', 'assets/fonts/TomorrowNight_0.png', 'assets/fonts/TomorrowNight.fnt');



        this.load.audio('menuSelect','assets/audio/placeholder/menu select.ogg')
        this.load.audio('charSelect','assets/audio/placeholder/charSelect.ogg')
        this.load.audio('errorSFX','assets/audio/placeholder/error.ogg')

        this.load.audio('musicCharSelect','assets/audio/placeholder/charSelectMusic.ogg');
        this.load.audio('musicCharSelectIntro','assets/audio/placeholder/charSelectMusicIntro.ogg');


        this.load.plugin('rexsoundfadeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsoundfadeplugin.min.js', true);


    }

    create (){



        //everything else


        bIsPressed = false;

        this.ts = this.add.tileSprite(0, 0, screenW, screenH, 'tigerTile').setOrigin(0);


        this.time.addEvent({
            delay: 500,
            callback: () => {
        //audio
        //oh yea, were getting into nested delays
                this.time.addEvent({
                    delay: 200,
                    callback: () => {
                        this.sfxMusic = this.sound.add('musicCharSelect');
                        this.sfxMusic.setLoop(true);
                        this.sfxMusicIntro = this.sound.add('musicCharSelectIntro');
                        this.sfxMusicIntro.play();
                        this.sfxMusicIntro.on('complete',() => this.sfxMusic.play());
                
                    }
                })


        this.sfxSelect = this.sound.add('menuSelect');
        this.sfxCharSelect = this.sound.add('charSelect');
        this.sfxError = this.sound.add('errorSFX');
        

        this.starBack1 = this.add.image(45,95,'star').setAngle(-20).setScale(0);
        this.starBack1._scale = 0.8
        this.starBack2 = this.add.image(18,130,'star').setAngle(7).setScale(0);
        this.starBack2._scale = 0.4
        this.starBack3 = this.add.image(11,197,'star').setAngle(27).setScale(0);
        this.starBack3._scale = 0.2
        this.starBack4 = this.add.image(125,105,'star').setAngle(30).setScale(0);
        this.starBack4._scale = 0.6
        this.starBack5 = this.add.image(102,50,'star').setAngle(-8).setScale(0);
        this.starBack5._scale = 0.4
        this.starBack6 = this.add.image(60,39,'star').setAngle(8).setScale(0);
        this.starBack6._scale = 0.25
        this.starBack7 = this.add.image(160,180,'star').setAngle(22).setScale(0);
        this.starBack7._scale = 0.5
        this.starBack8 = this.add.image(5,75,'star').setAngle(-27).setScale(0);
        this.starBack8._scale = 0.15
        

        //background stars
        this.starBack9 = this.add.image(screenW-20,screenH-10,'star').setAngle(-27).setScale(1);
        this.starBack10 = this.add.image(screenW-70,20,'star').setAngle(17).setScale(0.4);


        this.starDuration = 1200;
        this.starDelay = 50;
        this.starDelay2 = 150;


        this.starBackTween1 = this.tweens.add({
            targets: this.starBack1,
            duration: this.starDuration*this.starBack1._scale,
            scale: this.starBack1._scale,
            ease: 'Cubic.easeOut',
            delay: this.starDelay2+this.starDelay*(1/this.starBack1._scale),
            angle: "+=72"
        })

        this.starBackTween2 = this.tweens.add({
            targets: this.starBack2,
            duration: this.starDuration*this.starBack2._scale,
            scale: this.starBack2._scale,
            ease: 'Cubic.easeOut',
            delay: this.starDelay2+this.starDelay*(1/this.starBack2._scale),
            angle: "+=72"
        })

        this.starBackTween3 = this.tweens.add({
            targets: this.starBack3,
            duration: this.starDuration*this.starBack3._scale,
            scale: this.starBack3._scale,
            ease: 'Cubic.easeOut',
            delay: this.starDelay2+this.starDelay*(1/this.starBack3._scale),
            angle: "+=72"
        })

        this.starBackTween4 = this.tweens.add({
            targets: this.starBack4,
            duration: this.starDuration*this.starBack4._scale,
            scale: this.starBack4._scale,
            ease: 'Cubic.easeOut',
            delay: this.starDelay2+this.starDelay*(1/this.starBack4._scale),
            angle: "-=72"
        })

        this.starBackTween5 = this.tweens.add({
            targets: this.starBack5,
            duration: this.starDuration*this.starBack5._scale,
            scale: this.starBack5._scale,
            ease: 'Cubic.easeOut',
            delay: this.starDelay2+this.starDelay*(1/this.starBack5._scale),
            angle: "-=72"
        })

        this.starBackTween6 = this.tweens.add({
            targets: this.starBack6,
            duration: this.starDuration*this.starBack6._scale,
            scale: this.starBack6._scale,
            ease: 'Cubic.easeOut',
            delay: this.starDelay2+this.starDelay*(1/this.starBack6._scale),
            angle: "+=72"
        })

        this.starBackTween7 = this.tweens.add({
            targets: this.starBack7,
            duration: this.starDuration*this.starBack7._scale,
            scale: this.starBack7._scale,
            ease: 'Cubic.easeOut',
            delay: this.starDelay2+this.starDelay*(1/this.starBack7._scale),
            angle: "-=72"
        })

        this.starBackTween8 = this.tweens.add({
            targets: this.starBack8,
            duration: this.starDuration*this.starBack8._scale,
            scale: this.starBack8._scale,
            ease: 'Cubic.easeOut',
            delay: this.starDelay2+this.starDelay*(1/this.starBack8._scale),
            angle: "+=72"
        })


        
        

        this.starArray = [this.starBackTween1,this.starBackTween2,this.starBackTween3,this.starBackTween4,this.starBackTween5,this.starBackTween6,this.starBackTween7,this.starBackTween8]



        this.charArray = ['tiger','blank','blank','blank','blank','blank','blank','blank','blank']
//        this.portraitArray = [...Array(3)].map(e => Array(3).fill(1))

        this.width = 3;
        this.height = 3;
        this.spacing = 52;

        const container = this.add.container(69+screenW/2, -20+screenH/2);

        this.portraitArray = [];
        this.realPortraitArray = [];

        for(var i=0;i<this.charArray.length;i++){
            var spriteImage = this.add.image(-this.spacing+(i%this.width)*this.spacing,-this.spacing+(Math.floor(i/this.height))*this.spacing-200,this.charArray[i]);

            var spriteImageColor = spriteImage.postFX.addColorMatrix();
            spriteImageColor.brightness(0.4)

            this.portraitArray.push(spriteImageColor)
            this.realPortraitArray.push(spriteImage);

            container.add(spriteImage);
        }

        this.portraitArray[0].brightness(1);

        this.tweens.add({
            targets: this.realPortraitArray,
            y: '+=200',
            duration: 650,
            ease: 'Back.easeOut',
            delay: this.tweens.stagger(70),
        })


        this.anims.create({
            key: 'selectAnim',
            frames: this.anims.generateFrameNumbers('select',{start:0,end:4}),
            frameRate: 16,
            repeat: -1,
        });
    

        this.selectSprite = this.add.sprite(-this.spacing,-this.spacing,'select').play('selectAnim');

        container.add(this.selectSprite);
        
        this.statBox = this.add.rectangle(90,screenH-33,200,53,0xffffff).setOrigin(0,0.5);
        this.statBox.scaleX = 0


        this.boxTween = this.tweens.add({
            targets: this.statBox,
            duration: 900,
            scaleX: 1,
            delay: 250,
            ease: 'Circ.easeOut',
        })

        this.text1 = this.add.bitmapText(150, screenH-50+1, 'description', '')
        .setOrigin(0,0.5)

        this.text2 = this.add.bitmapText(150, screenH-38+1, 'description', '')
        .setOrigin(0,0.5)

        this.text3 = this.add.bitmapText(150, screenH-26+1, 'description', '')
        .setOrigin(0,0.5)

        this.text4 = this.add.bitmapText(150, screenH-14+1, 'description', '')
        .setOrigin(0,0.5)

//        this.text1.fontSize = this.text2.fontSize = this.text3.fontSize = this.text4.fontSize = 16

        this.text1.x = 100;
        this.text2.x = 103;
        this.text3.x = 106;
        this.text4.x = 109;

        this.textTween = this.tweens.add({
            targets: [this.text1,this.text2,this.text3, this.text4],
            duration: 900,
            ease: 'Circ.easeOut',
            delay: 250,
            x: '+=50',
        })

        this.typewriteBitmapText(this.text1,'Age: 27',200)
        this.typewriteBitmapText(this.text2,'Height: 1.73m',300)
        this.typewriteBitmapText(this.text3,'Weight: 105kg',400)
        this.typewriteBitmapText(this.text4,'Likes: Uhhhhhhhhhhh hh h hh',500)





        this.star1 = this.add.image(23,65,'blankStar');
        this.star2 = this.add.image(23,92,'blankStar');
        this.star1.scale = this.star2.scale = 0;


        this.starTween = this.tweens.add({
            targets: [this.star1, this.star2],
            duration: 800,
            scale: 1,
            ease: 'Circ.easeOut'
        })


        this.sprite = this.add.image(-100,screenH+6,'tigerCG').setOrigin(0.5,1);

        this.spriteTween = this.tweens.add({
            targets: this.sprite,
            duration: 450,
            ease: 'Circ.easeOut',
            x: 80,
        });


        this.name = this.add.bitmapText(11, screenH-25, 'score', 'Tiger Guy')
        .setOrigin(0,0.5)

        this.nameColor = this.name.postFX.addColorMatrix();



        this.add.image(20,5,'charSelect').setOrigin(0,0)


        cursors = this.input.keyboard.createCursorKeys();
        //A = 65
        keyA = this.input.keyboard.addKey(65);
        //B = 66
        keyB = this.input.keyboard.addKey(66);

        this.isLeftPress = false
        this.isRightPress = false
        this.isUpPress = false
        this.isDownPress = false

        this.hasSelected = false;

        this.errorRect = this.add.rectangle(0,0,screenW,screenH,0xff0000,0.2).setOrigin(0,0).setAlpha(0);
        this.errorPopup = this.add.image(screenW/2,screenH/2,'error').setAlpha(0);


        this.hasLetGo = false
            }
        })
    

//        this.tweens.pauseAll();
    }

    update(){


        this.ts.tilePositionX += 1;
        this.ts.tilePositionY -= 0.5;

//        this.starBack1.angle+= 0.2
        if(this.sprite != undefined){
            this.oldIndex = this.selectIndex;

            leftPress = cursors.left.isDown;
            rightPress = cursors.right.isDown;
            upPress = cursors.up.isDown;
            downPress = cursors.down.isDown;
    
            this.leftPressN = cursors.left.isUp;
            this.rightPressN = cursors.right.isUp;
            this.upPressN = cursors.up.isUp;
            this.downPressN = cursors.down.isUp;
    
            aPress = keyA.isDown;
            bPress = keyB.isDown;
        
            if(this.hasLetGo){
                if(keyA.isUp){
                    this.hasLetGo = false;
                }
            }
    
    
            this.starBack9.angle += 0.75
            this.starBack10.angle -= 0.33
    
            if(!this.hasSelected){
                if(leftPress){
                    if(!this.isLeftPress){
                        if(this.selectIndex%this.width > 0){
                            this.selectIndex--;
                        }
                        this.isLeftPress = true
                    }
                }
                if(rightPress){
                    if(!this.isRightPress){
                        if(this.selectIndex%this.width < this.width-1){
                            this.selectIndex++;
                        }
                        this.isRightPress = true;
                    }
                }
                if(upPress){
                    if(!this.isUpPress){
                        if(Math.floor(this.selectIndex/this.width) > 0){
                            this.selectIndex-= this.width;
                        }
                        this.isUpPress = true;
                    }
                }
                if(downPress){
                    if(!this.isDownPress){
                        if(Math.floor(this.selectIndex/this.width) < this.height-1){
                            this.selectIndex+= this.width;
                        }
                        this.isDownPress = true;
                    }
                }
    
                if(this.leftPressN){
                    this.isLeftPress = false;
                }
                if(this.rightPressN){
                    this.isRightPress = false;
                }
                if(this.upPressN){
                    this.isUpPress = false;
                }
                if(this.downPressN){
                    this.isDownPress = false;
                }
    
            this.selectIndex = Phaser.Math.Clamp(this.selectIndex, 0, this.charArray.length);
    
    
            this.selectSprite.x = -this.spacing+(this.selectIndex%this.width)*this.spacing;
            this.selectSprite.y = -this.spacing+(Math.floor(this.selectIndex/this.height))*this.spacing;
    
            }
    
    
            if(this.selectIndex != this.oldIndex){
    
                this.nameColor.hue(this.selectIndex*(360/9));
    
                this.sfxSelect.play();
    
                this.star1.scale = this.star2.scale = 0;    
        
                if(this.starTween.isPlaying()){
                    this.starTween.restart();
                }else{
                    this.starTween = this.tweens.add({
                        targets: [this.star1, this.star2],
                        duration: 800,
                        scale: 1,
                        ease: 'Circ.easeOut'
                    })
                }
    
                this.starBack1.scale = this.starBack2.scale = this.starBack3.scale =
                    this.starBack4.scale = this.starBack5.scale = this.starBack6.scale =
                        this.starBack7.scale = this.starBack8.scale = 0;
    
                        this.starBack1.angle = -20;
                        this.starBack2.angle = 7;
                        this.starBack3.angle = 27;
                        this.starBack4.angle = 30;
                        this.starBack5.angle = -8;
                        this.starBack6.angle = 8;
                        this.starBack7.angle = 22;
                        this.starBack8.angle = -27;
                
    
                for(var i=0;i<this.starArray.length;i++){
                    if(this.starArray[i].isPlaying()){
                        this.starArray[i].destroy();
                    }
                }
    
                this.starBackTween1 = this.tweens.add({
                    targets: this.starBack1,
                    duration: this.starDuration*this.starBack1._scale,
                    scale: this.starBack1._scale,
                    ease: 'Cubic.easeOut',
                    delay: this.starDelay2+this.starDelay*(1/this.starBack1._scale),
                    angle: "+=72"
                })
        
                this.starBackTween2 = this.tweens.add({
                    targets: this.starBack2,
                    duration: this.starDuration*this.starBack2._scale,
                    scale: this.starBack2._scale,
                    ease: 'Cubic.easeOut',
                    delay: this.starDelay2+this.starDelay*(1/this.starBack2._scale),
                    angle: "+=72"
                })
        
                this.starBackTween3 = this.tweens.add({
                    targets: this.starBack3,
                    duration: this.starDuration*this.starBack3._scale,
                    scale: this.starBack3._scale,
                    ease: 'Cubic.easeOut',
                    delay: this.starDelay2+this.starDelay*(1/this.starBack3._scale),
                    angle: "+=72"
                })
        
                this.starBackTween4 = this.tweens.add({
                    targets: this.starBack4,
                    duration: this.starDuration*this.starBack4._scale,
                    scale: this.starBack4._scale,
                    ease: 'Cubic.easeOut',
                    delay: this.starDelay2+this.starDelay*(1/this.starBack4._scale),
                    angle: "-=72"
                })
        
                this.starBackTween5 = this.tweens.add({
                    targets: this.starBack5,
                    duration: this.starDuration*this.starBack5._scale,
                    scale: this.starBack5._scale,
                    ease: 'Cubic.easeOut',
                    delay: this.starDelay2+this.starDelay*(1/this.starBack5._scale),
                    angle: "-=72"
                })
        
                this.starBackTween6 = this.tweens.add({
                    targets: this.starBack6,
                    duration: this.starDuration*this.starBack6._scale,
                    scale: this.starBack6._scale,
                    ease: 'Cubic.easeOut',
                    delay: this.starDelay2+this.starDelay*(1/this.starBack6._scale),
                    angle: "+=72"
                })
        
                this.starBackTween7 = this.tweens.add({
                    targets: this.starBack7,
                    duration: this.starDuration*this.starBack7._scale,
                    scale: this.starBack7._scale,
                    ease: 'Cubic.easeOut',
                    delay: this.starDelay2+this.starDelay*(1/this.starBack7._scale),
                    angle: "-=72"
                })
        
                this.starBackTween8 = this.tweens.add({
                    targets: this.starBack8,
                    duration: this.starDuration*this.starBack8._scale,
                    scale: this.starBack8._scale,
                    ease: 'Cubic.easeOut',
                    delay: this.starDelay2+this.starDelay*(1/this.starBack8._scale),
                    angle: "+=72"
                })
            
                    this.starArray = [this.starBackTween1,this.starBackTween2,this.starBackTween3,this.starBackTween4,this.starBackTween5,this.starBackTween6,this.starBackTween7,this.starBackTween8]
            
        
    
                this.text1.x = 100;
                this.text2.x = 103;
                this.text3.x = 106;
                this.text4.x = 109;
    
                this.text1.text = this.text2.text = this.text3.text = this.text4.text = ''
    
    
                if(this.textTween.isPlaying()){
                    this.textTween.restart();
                }else{
                    this.textTween = this.tweens.add({
                        targets: [this.text1,this.text2,this.text3, this.text4],
                        duration: 900,
                        ease: 'Circ.easeOut',
                        delay: 250,
                        x: '+=50',
                        onStart: () => {
                            this.text1.x = 100;
                            this.text2.x = 103;
                            this.text3.x = 106;
                            this.text4.x = 109;
                
                        }
                    })
                }
    
    
                this.portraitArray[this.oldIndex].brightness(0.4);
                this.portraitArray[this.selectIndex].brightness(1);
    
        
                if(this.charArray[this.selectIndex] == 'blank'){
                    this.sprite.setTexture('blankCG')
                    this.ts.setTexture('unknownTile')
    
                    var text1Text = 'Age: Unknown'
                    var text2Text = 'Height: Unknown'
                    var text3Text = 'Weight: Unknown'
                    var text4Text = 'Likes: Uhhhhhhhhhhh hh h hh'
    
                    this.name.text = 'Unknown'
            
                }else if(this.charArray[this.selectIndex] == 'tiger'){
                    this.sprite.setTexture('tigerCG')
                    this.ts.setTexture('tigerTile')
    
                    var text1Text = 'Age: 27'
                    var text2Text = 'Height: 1.73m'
                    var text3Text = 'Weight: 105kg'
                    var text4Text = 'Likes: uhhhhh'
    
                    this.name.text = 'Tiger Guy'
                    
                }
    
    
                this.typewriteBitmapText(this.text1,text1Text,200)
                this.typewriteBitmapText(this.text2,text2Text,300)
                this.typewriteBitmapText(this.text3,text3Text,400)
                this.typewriteBitmapText(this.text4,text4Text,500)
    
            
                this.sprite.x = -100;
    
                if(this.spriteTween.isPlaying()){
                    this.spriteTween.restart();
                }else{
                    this.spriteTween = this.tweens.add({
                        targets: this.sprite,
                        duration: 450,
                        ease: 'Circ.easeOut',
                        x: 80,
                    });    
                }
    
                this.statBox.scaleX = 0;
    
                if(this.boxTween.isPlaying()){
                    this.boxTween.restart();
                }else{
                    this.boxTween = this.tweens.add({
                        targets: this.statBox,
                        duration: 900,
                        scaleX: 1,
                        delay: 250,
                        ease: 'Circ.easeOut',
                    })
                }
    
    
        
        
        
            }
    
            if(aPress && !this.hasSelected){
    
                if(this.charArray[this.selectIndex] != 'blank'){

                    if(bPress){
                        bIsPressed = true;
                    }

//                    console.log("Bpressed?: " + bIsPressed)
    
                    this.sfxCharSelect.play();
    
                    this.hasSelected = true;
        
                    this.selectSprite.anims.pause();
        
                    this.tweens.add({
                        targets: this.sprite,
                        y: '-=6',
                        ease: "Circ.easeOut",
                        duration: 250,
                    })
        
        //            this.cameras.main.flash(800)
                    var flashRect = this.add.rectangle(0,0,screenW,screenH,0xffffff,0.8).setOrigin(0,0);
        
                    this.tweens.add({
                        targets: flashRect,
                        duration: 800,
                        alpha: 0
                    })
        
                    this.time.addEvent({
                        callback: () => {
                            if(this.selectSprite.isTinted){
                                this.selectSprite.clearTint();
                            }else{
                                this.selectSprite.setTintFill(0xffffff);
                            }
                        },
                        repeat: Math.floor(2500/70),
                        delay: 70
                    })
        
                    this.time.addEvent({
                        delay: 2000,
                        callback: () => {
        
                            this.scene.launch('TransitionScene');

                            this.plugins.get('rexsoundfadeplugin').fadeOut(this.sfxMusic, 500);

        
                            this.time.addEvent({
                                delay: 100,
                                callback: () => {
                                    this.scene.launch('LoadingScene');
                                }
                            })
        
                            currentChar = this.charArray[this.selectIndex];
                                
                            this.time.addEvent({
                                delay: 500,
                                callback: () => {
                                    this.scene.launch('MainRoundScene');
                                    this.scene.stop('CharSelectScene')
                                }
                            })
                        }
                    });
        
                }else if(!this.hasLetGo){
                    this.hasLetGo = true;
                    //tint screen red too
                    this.sfxError.play();
    
                    if(this.errorPopup.alpha > 0){
                        this.errorTween.stop();
                    }
                    this.errorRect.setAlpha(1)
                    this.errorPopup.setAlpha(1);
                    this.errorTween = this.tweens.add({
                        targets: [this.errorPopup,this.errorRect],
                        alpha: 0,
                        duration: 600,
                        ease: "Circ.easeIn"
                    })
    
                }
    
    
            }
    
        }
    
        }

    typewriteBitmapText(bitmapLabel,text,delay1)
    {
        bitmapLabel.setText(text)
    
        const bounds = bitmapLabel.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        bitmapLabel.setText('')

        var currIndex = this.selectIndex
    
        const length = wrappedText.length
        let i = 0

        this.time.addEvent({
            delay: delay1,
            callback: () => {
                var timedEvent = this.time.addEvent({
                    callback: () => {

                        if(i == 0 && bitmapLabel.text != ''){
                           this.time.removeEvent(timedEvent);
                           timedEvent = undefined
//                           timedEvent.destroy() 
                        }else{

                            if(this.selectIndex == currIndex){
                                bitmapLabel.text += wrappedText[i]
                                ++i
                            }
                        }
                    },
                    repeat: length - 1,
                    delay: 45
                })
        
            }
        })
    }
    

}


class Loading extends Phaser.Scene{

    constructor ()
    {
        super({ key: 'LoadingScene', active: false });
    }

    preload () {
        this.load.spritesheet('loading','assets/image/food/food.png',{frameWidth: 20, frameHeight: 20});
    }

    create (){

        this.sound.setVolume(0.5)

console.log("LOADING SCREEN STARTED")
        this.anims.create({
            key: 'loadingAnim',
            frames: this.anims.generateFrameNumbers('loading',{start:0, end:3}),
            frameRate:18,
            repeat: -1
        })

        this.add.sprite(screenW-40,screenH-30,'loading').play('loadingAnim');

        this.scene.bringToTop()

    
    }
}


class WinTest extends Phaser.Scene{

    constructor ()
    {
        super({ key: 'WinTestScene', active: false });
    }

    preload () {

        this.sound.setVolume(0.5)

        this.load.image('bgTile','assets/image/bgTile2.png');
        this.load.bitmapFont('description', 'assets/fonts/TomorrowNight_0.png', 'assets/fonts/TomorrowNight.fnt');
        if(totalScore/2 == 100){
            this.load.image('badge','assets/image/badge.png');
        }else{
            this.load.image('badge','assets/image/badge2.png');
        }

        this.load.audio('musicCharSelect','assets/audio/placeholder/charSelectMusic.ogg');
        this.load.audio('musicCharSelectIntro','assets/audio/placeholder/charSelectMusicIntro.ogg');


    }

    create (){
        this.ts = this.add.tileSprite(0, 0, screenW, screenH, 'bgTile').setOrigin(0);

        var tempScore = totalScore/2;
        var text = 'YOU SHOULDNT BE SEEING THIS MESSAGE';

        if(tempScore == 100){
            text = 'Incredible! 100% is unbelievable!\nYou earned this badge!'
        }else if(tempScore > 90){
            text = 'Great job!\nBut think you can go for 100%?'
        }else{
            text = 'Not too bad,\nbut there\'s room for improvement...'
        }

        this.add.bitmapText(screenW/2,screenH/2-80,'description',text).setOrigin(0.5,0.5).setCenterAlign();

        this.totalScoreText = this.add.bitmapText(screenW/2,screenH/2-50,'description','').setOrigin(0.5,0.5);
        this.totalScoreText.text = `Total score: ${(tempScore).toFixed(1)}%`;

        this.timeText = this.add.bitmapText(screenW/2,screenH/2-30,'description','').setOrigin(0.5,0.5);
        this.timeText.text = `Total time elapsed: ${timeElapsed} seconds`;
        
        this.deathText = this.add.bitmapText(screenW/2,screenH/2-10,'description','').setOrigin(0.5,0.5);
        this.deathText.text = `Total deaths: ${totalDeaths}`;

        this.add.image(screenW/2-5,screenH/2+50,'badge');

        this.time.addEvent({
            delay: 700,
            callback: () => {
                this.scene.stop('LoadingScene')
            }
        })
        

        this.time.addEvent({
            delay: 200,
            callback: () => {
                this.sfxMusic = this.sound.add('musicCharSelect');
                this.sfxMusic.setLoop(true);
                this.sfxMusicIntro = this.sound.add('musicCharSelectIntro');
                this.sfxMusicIntro.play();
                this.sfxMusicIntro.on('complete',() => this.sfxMusic.play());
        
            }
        })


    }

    update (){
        this.ts.tilePositionX -= 1;
    }

}



class TitleScreen extends Phaser.Scene{

    constructor ()
    {
        super({ key: 'TitleScreenScene', active: false });
    }

    preload () {

        this.load.bitmapFont('description', 'assets/fonts/TomorrowNight_0.png', 'assets/fonts/TomorrowNight.fnt');

        this.load.image('bgTile','assets/image/bgTile2.png');

        this.load.audio('music','assets/audio/placeholder/titleMusic.ogg');
        this.load.audio('charSelect','assets/audio/placeholder/charSelect.ogg')

        this.load.plugin('rexsoundfadeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsoundfadeplugin.min.js', true);

    }

    create (){

        this.sound.setVolume(0.5)

        this.sfxSelect = this.sound.add('charSelect')

        this.sfxMusic = this.sound.add('music');
        this.sfxMusic.on('complete',() => 
        {
//            console.log("HIAHSIODASOI")
            this.tweens.add({
                targets: blackRect,
                alpha: 1,
                duration: 500,
                yoyo: true,
                onComplete: () => {
                    this.sfxMusic.play();
                }
            })    
        }
        );

        this.time.addEvent({
            delay: 300,
            callback: () => {
                this.sfxMusic.play();
            }
        })



        this.ts = this.add.tileSprite(0, 0, screenW, screenH, 'bgTile').setOrigin(0);

        this.add.bitmapText(screenW/2,screenH/2-40,'description','GUYS PANIC!!!').setOrigin(0.5,0.5).setScale(2);
        this.add.bitmapText(screenW/2,screenH/2-20,'description','(tentative title)').setOrigin(0.5,0.5).setScale(0.5);

        this.add.bitmapText(screenW/2,screenH/2+10,'description','Alpha Build 0.047').setOrigin(0.5,0.5).setScale();

        
        this.pressA = this.add.bitmapText(screenW/2,screenH/2+60,'description','-- Press A to start --').setOrigin(0.5,0.5).setScale(1);

        var blackRect = this.add.rectangle(0,0,screenW,screenH,0x000000).setOrigin(0,0)

        this.tweens.add({
            targets: blackRect,
            alpha: 0,
            duration: 500,
            
        })

        this.blinkIter = 0;
        this.blinkIterMax = 30

        this.keyA = this.input.keyboard.addKey(65);

        this.hasStarted = false;

    }

    update (){
        this.ts.tilePositionX -= 1;

        if(this.blinkIter > this.blinkIterMax){
            this.pressA.visible = !this.pressA.visible;
            this.blinkIter = 0;
        }
        this.blinkIter++;

        if(this.keyA.isDown && !this.hasStarted){
            this.sfxSelect.play();
            this.hasStarted = true;
            this.blinkIterMax = 1

            this.time.addEvent({
                delay: 2000,
                callback: () => {
                    this.plugins.get('rexsoundfadeplugin').fadeOut(this.sfxMusic, 1000);


                    this.scene.launch('TransitionScene');
                        
                    this.time.addEvent({
                        delay: 500,
                        callback: () => {
                            this.scene.launch('CharSelectScene');
                            this.scene.stop('TitleScreenScene')
                        }
                    })

                }
            })
        }

    }

}

//game config

var screenW = 320;
var screenH = 240;

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
/*    scene: {
        preload: preload,
        create: create,
        update: update,
    },*/
    scale:{
        zoom: 2/window.devicePixelRatio,
//        mode: Phaser.Scale.NONE
    },
    disableContextMenu: true,
//    pixelArt: true,
    render:{
        roundPixels: true,
        pixelArt: true,
        antialias: true,
        antialiasGL: true,
    },//ORDER MATTERS HERE, FIRST SCENE IS WHAT GETS PLAYED FIRST NO MATTER WHAT
    scene: [TitleScreen,CharSelect, MainRound,GameOver,Transition,Loading,WinTest] //uncomment this one when deploying
//    scene: [MainRound,TitleScreen,CharSelect,GameOver,Transition,Loading,WinTest]
};


const game = new Phaser.Game(config);