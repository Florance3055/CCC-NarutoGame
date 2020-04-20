
cc.Class({
    extends: cc.Component,

    properties: {
        naruto: {
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {
        // screen boundaries
        this.minPosX = -this.node.parent.width/2;
        this.maxPosX = this.node.parent.width/2;
        this.minPosY = -this.node.parent.height/2;
        this.maxPosY = this.node.parent.height/2;
        /*
        this.schedule(function() {
            var action = cc.moveTo(0.5, Math.random()*(450-(-450)+1)+(-450), Math.random()*(300-(-300)+1)+(-300));
            this.node.runAction(action);
        }, 0.5);
                
        this.schedule(function() {
            var action = cc.moveTo(0.5, this.naruto.x, this.naruto.y);
            this.node.runAction(action);
        }, 3);
        */
        this.schedule(function() {
            this.node.runAction(cc.sequence(
                cc.moveTo(0.7, Math.random()*(450-(-450)+1)+(-450), Math.random()*(300-(-300)+1)+(-300)),
                cc.delayTime(Math.random()*(0.5-(0.25)+1)+(0.25)),
                cc.moveTo(0.5, this.naruto.x, this.naruto.y)
            ));         
        }, 1.2);
    },

    update: function(dt){
        if ( this.node.x > this.maxPosX) {
            this.node.x = this.maxPosX - 25;
        } else if (this.node.x < this.minPosX) {
            this.node.x = this.minPosX + 25;
        }else if (this.node.y > this.maxPosY) {
            this.node.y = this.maxPosY - 50;
        }else if (this.node.y < this.minPosY) {
            this.node.y = this.minPosY + 50;
        }
    },

});
