cc.Class({
    extends: cc.Component,

    properties: {
        //敌方类型
        enemyType: 1,
        //敌方血量
        hpValue: 1
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.animComponent = this.getComponent(cc.Animation);
        if (this.enemyType == 1) {
            this.hpValue = 1;
            this.animComponent.play('WhiteEnemy');
        } else {
            this.hpValue = 2;
            this.animComponent.play('RedEnemy');
        }
    },

    start () {

    },

    setEnemyType (enemyType) {
        this.enemyType = enemyType;
    },

    onPlayerBulletHit () {
        this.hpValue--;
        if (this.hpValue <= 0) {
            this.node.destroy();
        }
    },

    // update (dt) {},
});
