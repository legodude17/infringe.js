import rooms from '../rooms.js';
class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.walls = this.add.group(null, 'walls', false, true, Phaser.Physics.ARCADE);
    this.renderRoom();
    var player = this.player = this.game.global.player = this.add.sprite(0, 0, 'person');
    this.game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.setTo(0.5, 0.5);
    player.body.collideWorldBounds = true;
    player.poweredUp = false;
    player.x = player.width/2;
    player.y = player.height/2;
    this.add.button(this.game.width - 40, 10, 'Pause', this.pauseGame, this);
    this.keys = this.game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D, 'firemissle': Phaser.KeyCode.SPACEBAR} );
    var weapon = this.add.weapon(10, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 600;
    weapon.fireRate = 1;
    weapon.trackSprite(player, 0, 0, true);
    this.game.input.onDown.add(function(){if (player.poweredUp){}else{weapon.fire(); }});
    this.enemies = this.add.group(null, 'enemies', false, true, Phaser.Physics.ARCADE);
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
    if (this.keys.firemissle.isDown) {
      this.fireMissle();
    }
    if (this.game.physics.arcade.intersects(this.player.body, this.portal.body)) {
      this.advance();
    }
  }

  pauseGame() {
    this.game.paused = true;
  }

  fireMissle() {
    if (this.missle) {
      return;
    }
    var missle = this.add.sprite(this.player.x, this.player.y, 'missile');
    this.game.physics.enable(missle, Phaser.Physics.ARCADE);
    missle.anchor.setTo(0.5);
    missle.rotation = this.player.rotation;
    missle.body.velocity = this.game.physics.arcade.velocityFromAngle(missle.rotation, 300);
    missle.animations.add('go');
    missle.animations.play('go', 10, true);
    missle.checkWorldBounds = true;
    missle.outOfBoundsKill = true;
    this.missle = true;
    missle.events.onKilled.add(function() {
      this.missle = false;
    }, this);
  }

  createPortal(x, y) {
    var portal = this.portal = this.add.sprite(x, y, 'portal');
    this.game.physics.enable(portal, Phaser.Physics.ARCADE);
    portal.animations.add('default');
    portal.animations.play('default', 15, true);
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

  renderRoom() {
    var x, y, room;
    room = this.room = rooms.rooms[this.game.global.room];
    rooms.parse(room);
    document.title = this.game.global.room + ' Room - Infringe';
    this.add.audio(room.music).play(null, null, null, true, true);
    for (y = 0; y < room.mapParsed.length; y++) {
      for (x = 0; x < room.mapParsed[y].length; x++) {
        if (room.mapParsed[y][x] === 'portal') {
          this.createPortal(x * 32, y * 32);
        } else {
          this.add.image(x * 32, y * 32, room.mapParsed[y][x]);
        }
      }
      var sprite = this.walls.create(x * 32, y * 32);
      sprite.body.immovable = true;
      sprite.collideWorldBounds = true;
      sprite.allowGravity = false;
    }
    this.game.world.setBounds(0, 0, x * 32, y * 32);
  }

  advance() {
    player.x = player.width/2;
    player.y = player.height/2;
    this.game.global.room = this.room.next;
    this.renderRoom();
  }
}

export default Game;
