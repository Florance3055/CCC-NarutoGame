//var naruto = require('./NARUTO');
cc.Class({
    extends: cc.Component,

    properties: {
        

    },

    onLoad: function () {
        

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        //var gamectrl = cc.instantiate(this.gamectrl);
        //this.gamectrl.getComponent('GameCtrl').setHead();

        
    },

    

    onCollisionEnter: function () {
        
        
    },
});
