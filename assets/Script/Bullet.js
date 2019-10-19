cc.Class({
    extends: cc.Component,

    properties: {
        xSpeed: cc.Integer,
        ySpeed: cc.Integer,
        hpDrop: cc.Integer
    },

    // use this for initialization
    onLoad: function () {
       cc.director.getCollisionManager().enabled = true;
       this.playerNode = this.node.parent.getChildByName("Player");;
       this.player = this.playerNode.getComponent("Player");
    },
    
    //碰撞检测
    onCollisionEnter: function(other, self) {
        console.log('onCollisionEnter');
        this.player.onBulletDied(self.node);

        let enemyScript = other.node.getComponent("Enemy");
        if (enemyScript) {
            enemyScript.onPlayerBulletHit();
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.x += dt * this.xSpeed;
        this.node.y += dt * this.ySpeed;
        
        if (this.node.y > this.node.parent.height / 2) {
            this.player.onBulletDied(this.node);
        }
    },
});
