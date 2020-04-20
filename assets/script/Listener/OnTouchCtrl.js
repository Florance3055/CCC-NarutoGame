
cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,

        follower: {
            default: null,
            type: cc.Node
        },

        followSpeed: 200
    },

    onLoad: function(){
        var self = this;
        self.moveToPos = cc.v2(0, 0);
        self.isMoving = false;

        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.isMoving = true;
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
        }, self.node);

        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
        }, self.node);

        self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.isMoving = false; 
            follower.xSpeed = 0;
            follower.ySpeed = 0;
        }, self.node);
    },
        
    update: function (dt) {
        if (!this.isMoving) return;
        var oldPos = this.follower.position;
        // get move direction
        var direction = this.moveToPos.sub(oldPos).normalize();
        // multiply direction with distance to get new position
        var newPos = oldPos.add(direction.mul(this.followSpeed * dt));
        // set new position
        this.follower.setPosition(newPos);
        
    }
});
