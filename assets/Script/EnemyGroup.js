var levelData = require("LevelData");

cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab: cc.Prefab,
        gameLevel: 1
    },

    // LIFE-CYCLE CALLBACKS:
    init (level) {
        this.gameLevel = level;
    },

    onLoad () {
        var level = levelData[this.gameLevel];
        this.groupWidth = (Global.ENEMY_WIDTH + 10) * level.length;
        this.groupHeight = Global.ENEMY_HEIGHT * level[0].length;
        this.spaceWidth = this.node.parent.width;
        
        for (let i = 0; i < level.length; ++i) {
            for (let j = 0; j < level[i].length; ++j) {
                let enemy = cc.instantiate(this.enemyPrefab);
                let enemyScript = enemy.getComponent("Enemy");
                if (level[i][j] == 1) {
                    enemyScript.setEnemyType(1);
                } else {
                    enemyScript.setEnemyType(2);
                }
                enemy.parent = this.node; // 将生成的敌人加入节点树
                enemy.x = (Global.ENEMY_WIDTH + 10) * j - this.groupWidth / 2 + (Global.ENEMY_WIDTH + 10) / 2;
                enemy.y = Global.ENEMY_HEIGHT * i;
            }
        }

        this.direction = 1;
        this.xPos = this.node.x;
        this.yPos = this.node.y;
        //每隔 1s 执行一次
        this.schedule(this.scheduleCallback, 1);
    },

    scheduleCallback() {
        //console.log('scheduleCallback');
        let tmpPos = this.xPos + this.direction * Global.ENEMY_WIDTH;
        if (tmpPos < (this.groupWidth - this.spaceWidth) / 2) {
            this.yPos -= Global.ENEMY_HEIGHT;
            this.direction = 1;
        } else if (tmpPos > (this.spaceWidth - this.groupWidth) / 2) {
            this.yPos -= Global.ENEMY_HEIGHT;
            this.direction = -1;
        } else {
            this.xPos = tmpPos;
        }

        this.node.x = this.xPos;
        this.node.y = this.yPos;
    }

    // update (dt) {},
});
