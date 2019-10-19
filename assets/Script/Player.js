cc.Class({
    extends: cc.Component,

    properties: {
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 每次移动距离
        dx: 200
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // 移动方向开关
        this.accLeft = false;
        this.accRight = false;
        this.xPosition = this.node.x;
        this.playerWidth = this.node.width;
        this.spaceWidth = this.node.parent.width;

        // 子弹对象池
        this.bulletPool = new cc.NodePool();
        // 最多发射3发子弹
        let initCount = 3;
        for (let i = 0; i < initCount; ++i) {
            let bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
    },

    start () {

    },

    moveLeft (isMove) {
        this.accLeft = isMove;
    },

    moveRight (isMove) {
        this.accRight = isMove;
    },

    // 发射子弹
    fire () {
        let bulletSize = this.bulletPool.size();
        if (bulletSize <= 0) {
            return;
        }
        let bullet = this.bulletPool.get();
        bullet.parent = this.node.parent;
        bullet.x = this.node.x;
        bullet.y = this.node.y;
    },

    onBulletDied(bulletNode) {
        console.log('Player onBulletDied');
        if (bulletNode) {
            this.bulletPool.put(bulletNode);
        }
    },

    update (dt) {
        //方向逻辑
        if (this.accLeft) {
            this.xPosition -= this.dx * dt;
        } 
        if (this.accRight) {
            this.xPosition += this.dx * dt;
        }

        //边界逻辑
        if (this.xPosition < (this.playerWidth - this.spaceWidth) / 2) {
            this.xPosition = (this.playerWidth - this.spaceWidth) / 2;
        }
        if (this.xPosition > (this.spaceWidth - this.playerWidth) / 2) {
            this.xPosition = (this.spaceWidth - this.playerWidth) / 2;
        }

        // 更新主角的位置
        this.node.x = this.xPosition;
    },
});
