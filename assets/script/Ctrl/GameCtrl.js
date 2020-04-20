var lastClick = 0;

function pauseresume () {
    var now = Date.now();
    // Double click in 300 ms
    if (now - lastClick < 300) {
        this.stopAllActions();
        var pool = this.getComponent('GameCtrl')._pool;
        if (pool) {
            pool.put(this);
        }
        else {
            this.removeFromParent(true);
        }
    }
    // Click
    else {
        if (this.paused) {
            cc.director.getActionManager().resumeTarget(this);
        }
        else {
            cc.director.getActionManager().pauseTarget(this);
        }
        this.paused = !this.paused;
    }
    lastClick = now;
}


cc.Class({
    extends: cc.Component,

    properties: {
        hpDisplay:{
            default: null,
            type: cc.Label
        },

        hurtAudio: {
            default: null,
            type: cc.AudioClip
        },

        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },

        scoreDisplay:{
            default: null,
            type: cc.Label
        },

        timeDisplay:{
            default: null,
            type: cc.Label
        },

        sasuke: {
            default: null,
            type: cc.Node
        },

        naruto: {
            default: null,
            type: cc.Node
        },

        handswordctrl:{
            default: null,
            type: cc.Node
        },

        handsword:{
            default: null,
            type: cc.Node
        },

        gameOverNode: {
            default: null,
            type: cc.Node
        },

        startGameNode: {
            default: null,
            type: cc.Node
        },

        star:{
            default: null,
            type: cc.Node
        },

        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        regionOrigin: cc.Vec2,
        regionSize: cc.Size,

    },
    
    onLoad: function(){

        this.hp = 100;
        this.time = 0;

        this.schedule(function() {
            // Time++
            this.gainTime();
        }, 1);

        this.schedule(function() {
            // return color
            this.naruto.color = cc.Color.WHITE;
        }, 0.5);
        this.enabled = false;

        
        //this.schedule(this.generateNode, 1);
        //this._pool = new cc.NodePool('GameCtrl');
    },

    onStartGame: function () {
        this.enabled = true;
        // 初始化
        this.resetGame();

        // set game state to running

        // set button and gameover text out of screen
        this.startGameNode.x = 3000;
        this.gameOverNode.active = false;

        this.schedule(function() {
            this.star.runAction(cc.sequence(
            cc.moveTo(1, Math.random()*(450-(-450)+1)+(-450), Math.random()*(300-(-300)+1)+(-300)),
            cc.delayTime(0.5),
        ));
        }, 1.5);

         
    },

    resetGame: function () {
        this.hp = 100;
        this.hpDisplay.string = 'HP: ' + this.hp.toString();
        this.time = 0;
        this.timeDisplay.string = 'Time: ' + this.time.toString();
        this.score = 0;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    hpDecrease: function () {
        if(this.hp === 0){
            this.gameOver();
        }
        this.hp -= 1;
        this.hpDisplay.string = 'HP: ' + this.hp.toString();
        
        cc.audioEngine.playEffect(this.hurtAudio, false);
    },   

    gainTime: function () {
        this.time += 1;
        this.timeDisplay.string = 'Time: ' + this.time.toString();
        if(this.time % 30 == 0){
            this.addSasuke();
            //this.handsword.rotateHandSword();
            //this.handsword.shotHandSword();
        }
    },

    gainScore: function(){
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
    
    addSasuke: function () {
        var scene = cc.director.getScene().getChildByName('Canvas');
        var node = cc.instantiate(this.sasuke);
    
        node.parent = scene;
        node.setPosition(Math.random()*(450-(-450)+1)+(-450), Math.random()*(300-(-300)+1)+(-300));
      },

    update: function(dt){

        if(this.getDistance()<50 || this.getDistance_1()<50){
            this.naruto.color = cc.Color.RED;
            this.hpDecrease();
        }
        if(this.getDistance_2()<50){
            this.gainScore();
        }

    },
    //获取N和S的距离
    getDistance: function(){
        var sasukePos = this.sasuke.getPosition();
        var disT = this.naruto.position.sub(sasukePos).mag();
        return disT;
    },

    //获取N和HandSword的距离
    getDistance_1: function(){
        var narutoPos = this.naruto.getPosition();
        var disT = this.handsword.position.sub(narutoPos).mag();
        return disT;
    },

    //获取N和Star的距离
    getDistance_2: function(monster){
        var narutoPos = this.naruto.getPosition();
        var disT = this.star.position.sub(narutoPos).mag();
        return disT;
    },


    gameOver: function () {
        this.gameOverNode.active = true;

            cc.director.loadScene('game')
    },

    generateNode: function () {
        var monster = this._pool.get();
        if (!monster) {
            monster = cc.instantiate(this.starPrefab);
        
            // Add pool handler component which will control the touch event
            monster.addComponent('GameCtrl');
        }
        // screen boundaries

        monster.x = this.regionOrigin.x + Math.floor(Math.random() * this.regionSize.width);
        monster.y = this.regionOrigin.y + Math.floor(Math.random() * this.regionSize.height);
        /*
        var angle = Math.random() * Math.PI * 2;
        var dx = 500 * Math.cos(angle);
        var dy = 500 * Math.sin(angle);
        */

        monster.runAction(cc.sequence(
            cc.moveBy(0.5, Math.random()*(450-(-450)+1)+(-450), Math.random()*(300-(-300)+1)+(-300)),
            cc.delayTime(5),
            cc.callFunc(this.removeNode, this, monster)
        ));
        
        this.node.addChild(monster);
    },
    
    removeNode: function (sender, monster) {
        this._pool.put(monster);
    },
    
}); 
/*
    gameOver: function(){
        
        var delay = cc.delayTime(5);
        cc.director.getScene().getChildByName('Canvas').runAction(delay);
        
        this.node.stopAllActions();
        cc.director.loadScene('game');
    }*/