var Player = require("Player");
var EnemyGroup = require("EnemyGroup");

cc.Class({
    extends: cc.Component,

    properties: {
        startLayer: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: Player
        },
        enemyGroup: {
            default: null,
            type: EnemyGroup
        },
    },

    // use this for initialization
    onLoad: function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    // called every frame
    update: function (dt) {

    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                //console.log('Press a/left key');
                this.player.moveLeft(true);
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                //console.log('Press d/right key');
                this.player.moveRight(true);
                break;
            case cc.macro.KEY.space:
                console.log('Press space key');
                this.player.fire();
                break;
        }
    },

    onKeyUp: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                //console.log('Press a/left key');
                this.player.moveLeft(false);
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                //console.log('Press d/right key');
                this.player.moveRight(false);
                break;
            case cc.macro.KEY.space:
                //console.log('release space key');
                //this.startLayer.active = false;
                break;
        }
    }
});
