//import rooms from '../rooms.js';
class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'snow');
    var player = this.player = this.game.global.player = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'person');
    this.game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.setTo(0.5, 0.5);
    this.game.global.room = this.game.global.room || 'Bed';
    this.add.button(this.game.width - 40, 10, 'Pause', this.pauseGame, this);
    this.keys = this.game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D} );
    var weapon = this.add.weapon(10, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 600;
    weapon.fireRate = 1;
    weapon.trackSprite(player, 0, 0, true);
    this.game.input.onDown.add(function(){this.fire(); }, weapon);
  }

  update() {
    this.player.rotation = this.game.physics.arcade.angleToPointer(this.player);
    if (this.keys.up.isDown) {
      this.player.body.velocity.y = -143;
    } else {
      if (this.keys.down.isDown) {
        this.player.body.velocity.y = 143;
      } else {
        this.player.body.velocity.y = 0;
      }
    }
    if (this.keys.left.isDown) {
      this.player.body.velocity.x = -143;
    } else {
      if (this.keys.right.isDown) {
        this.player.body.velocity.x = 143;
      } else {
        this.player.body.velocity.x = 0;
      }
    }
  }

  pauseGame() {
    this.game.paused = true;
  }

  endGame() {
    this.game.state.start('gameover');
  }

  paused() {
    this.pausedText = this.add.text(this.game.width * 0.5, this.game.height * 0.25, 'Paused');
    this.pausedText.anchor.set(0.5);
    this.game.input.onDown.addOnce(this.resumeGame, this);
  }

  resumed() {
    this.pausedText.destroy();
  }

  resumeGame() {
    this.game.paused = false;
  }

}

export default Game;
