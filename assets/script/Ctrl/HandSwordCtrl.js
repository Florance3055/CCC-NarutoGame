

cc.Class({
    extends: cc.Component,

    properties: {
        handsword:{
            default: null,
            type: cc.Node
        },

        naruto: {
            default: null,
            type: cc.Node
        },

        handswordPrefab: cc.Prefab,

        regionOrigin: cc.Vec2,
        regionSize: cc.Size
    },

    onLoad: function(){
        
        this.schedule(function() {
            this.rotateHandSword();
        }, 1);

        //this.schedule(this.generateNode, 2);
        //this._pool = new cc.NodePool('PoolHandler');
    },

    rotateHandSword: function(){
        var rotateTo = cc.rotateBy(3,360);
        this.handsword.runAction(rotateTo);
    },

    /*
    shotHandSword: function(){
        var narutoPosX = this.naruto.x;
        var narutoPosY = this.naruto.y;
    },

   generateNode: function () {
    var monster = this._pool.get();
    if (!monster) {
        monster = cc.instantiate(this.handswordPrefab);
    
        // Add pool handler component which will control the touch event
        //monster.addComponent('PoolHandler');
    }
    /*
    monster.x = this.regionOrigin.x + Math.floor(Math.random() * this.regionSize.width);
    monster.y = this.regionOrigin.y + Math.floor(Math.random() * this.regionSize.height);
    
    var angle = Math.random() * Math.PI * 2;
    var dx = 500 * Math.cos(angle);
    var dy = 500 * Math.sin(angle);
    */

   /*
    monster.runAction(cc.sequence(
        cc.moveBy(5, dx, dy),
        cc.callFunc(this.removeNode, this, monster)
    ));
    

    monster.runAction(cc.sequence(
    cc.moveTo(1, Math.random(960), Math.random(640)),
    cc.callFunc(this.removeNode, this, monster)
));

    this.node.addChild(monster);

    },

    removeNode: function (sender, monster) {
        this._pool.put(monster);
    },

    update: function(dt){
    }
    */
});
