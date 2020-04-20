
cc.Class({
    extends: cc.Component,

    properties: {
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0
    },

    onLoad: function(){
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;
        // 主角当前方向速度
        this.xSpeed = 0;
        this.ySpeed = 0;
        // screen boundaries
        this.minPosX = -this.node.parent.width/2;
        this.maxPosX = this.node.parent.width/2;
        this.minPosY = -this.node.parent.height/2;
        this.maxPosY = this.node.parent.height/2;
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        
        
    },

    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            case cc.macro.KEY.w:
                this.accUp = true;
                break;
            case cc.macro.KEY.s:
                this.accDown = true;
                break;
            case cc.macro.KEY.b:
                this.xSpeed = 0;
                this.ySpeed = 0;
                break;
        }
    },

    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
            case cc.macro.KEY.w:
                this.accUp = false;
                break;
            case cc.macro.KEY.s:
                this.accDown = false;
                break;
        }
    },
    
    onDestory () {
        //取消键盘监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.off(cc.systemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },
    
    update: function(dt){

        //根据加速度方向每帧更新速度
        if(this.accLeft){
            this.xSpeed -=this.accel * dt;
        }else if (this.accRight){
            this.xSpeed += this.accel * dt;
        }else if (this.accUp){
            this.ySpeed += this.accel * dt;
        }else if (this.accDown){
            this.ySpeed -= this.accel * dt;
        }

        //限制速度
        if(Math.abs(this.xSpeed) > this.maxMoveSpeed){
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        if(Math.abs(this.ySpeed) > this.maxMoveSpeed){
            this.ySpeed = this.maxMoveSpeed * this.ySpeed / Math.abs(this.ySpeed);
        }
        
        //更新Play位置
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
        
        // limit player position inside screen
        if ( this.node.x > this.maxPosX) {
            this.node.x = this.maxPosX - 25;
            this.xSpeed = 0;
        } else if (this.node.x < this.minPosX) {
            this.node.x = this.minPosX + 25;
            this.xSpeed = 0;
        }else if (this.node.y > this.maxPosY) {
            this.node.y = this.maxPosY - 50;
            this.ySpeed = 0;
        }else if (this.node.y < this.minPosY) {
            this.node.y = this.minPosY + 50;
            this.ySpeed = 0;
        }
        
    }
});
