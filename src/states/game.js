import rooms from '../rooms.js';
class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.walls = this.add.group(null, 'walls', false, true, Phaser.Physics.ARCADE);
    this.imgs = [];
    this.renderRoom();
    var player = this.player = this.game.global.player = this.add.sprite(0, 0, 'person');
    this.game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.setTo(0.5, 0.5);
    player.body.collideWorldBounds = true;
    player.data.poweredUp = false;
    this.add.button(this.game.width - 40, 10, 'Pause', this.pauseGame, this);
    this.keys = this.game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D, 'firemissle': Phaser.KeyCode.SPACEBAR} );
    var weapon = this.add.weapon(10, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 600;
    weapon.fireRate = 1;
    weapon.trackSprite(player, 0, 0, true);
    this.weapon = weapon;
    this.game.input.onDown.add(function(){if (player.data.poweredUp){}else{weapon.fire(); }});
    this.enemies = this.add.group(null, 'enemies', false, true, Phaser.Physics.ARCADE);
    this.game.camera.follow(player);
    player.events.onKilled.add(this.endGame, this);
    player.health = player.maxHealth = 100;
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
    if (this.portal.body && this.game.physics.arcade.intersects(this.player.body, this.portal.body)) {
      this.advance();
    }
    if (this.game.physics.arcade.overlap(this.player, this.enemies)) {
      this.player.damage(1);
    }
    this.game.physics.arcade.collide(this.player, this.walls);
    this.game.physics.arcade.collide(this.walls, this.missile, function(missile){console.log('Collide!'); missile.kill(); });
    this.game.physics.arcade.collide(this.weapon.bullets, this.walls, function(bullet){bullet.kill(); });
    this.game.physics.arcade.collide(this.weapon.bullets, this.enemies, function(bullet, enemy){bullet.kill(); enemy.damage(27); });
    this.game.physics.arcade.collide(this.enemies, this.missile, function(missile, enemy){missile.kill(); enemy.damage(41); });
    this.player.bringToTop();
  }

  pauseGame() {
    this.game.paused = true;
  }

  fireMissle() {
    if (this.missile) {
      return;
    }
    var missle = this.add.sprite(this.player.x, this.player.y, 'missile');
    this.game.physics.enable(missle, Phaser.Physics.ARCADE);
    missle.anchor.setTo(0.5);
    missle.rotation = this.player.rotation;
    this.game.physics.arcade.velocityFromRotation(missle.rotation, 300, missle.body.velocity);
    missle.animations.add('go');
    missle.animations.play('go', 10, true);
    missle.checkWorldBounds = true;
    missle.outOfBoundsKill = true;
    this.missile = missle;
    missle.events.onKilled.add(function() {
      this.missile = false;
    }, this);
  }

  createPortal(x, y) {
    var portal = this.portal = this.add.sprite(x, y, 'portal');
    this.game.physics.enable(portal, Phaser.Physics.ARCADE);
    portal.animations.add('default');
    portal.animations.play('default', 15, true);
    return portal;
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
    if (this.imgs.text) {
      this.imgs.text.destroy();
    }
    if (this.imgs.length) {
      this.imgs.forEach(function(v){v.destroy(); });
      this.imgs = [];
    }
    this.walls.removeAll(true);
    room = this.room = rooms.rooms[this.game.global.room];
    rooms.parse(room);
    document.title = this.game.global.room + ' Room - Infringe';
    this.game.global.songManager.play(room.music.replace('.wav', ''));
    for (y = 0; y < room.mapParsed.length; y++) {
      for (x = 0; x < room.mapParsed[y].length; x++) {
        if (room.mapParsed[y][x] === 'portal') {
          this.imgs.push(this.createPortal(x * 32, y * 32));
        } else if (room.mapParsed[y][x] === undefined) {
          this.createWall(x*32, y*32);
        } else if (room.mapParsed[y][x] === 'activate') {
          this.imgs.push(this.add.button(x * 32, y * 32, 'activate', room.onButtonPress, this));
        } else {
          this.imgs.push(this.add.image(x * 32, y * 32, room.mapParsed[y][x]));
        }
        this.imgs[this.imgs.length - 1].sendToBack();
      }
    }
    if (room.walls) {
      for (var i = 0; i < room.walls.length; i++) {
        this.createWall(+room.walls[i].split(',')[0] * 32, +room.walls[i].split(',')[1] * 32);
      }
    }
    this.imgs.text = this.add.text(32, (y * 32) + 64, this.wordWrap(room.text, 50), {fill: '#FFFFFF', fontSize: '20px'});
    this.game.world.setBounds(0, 0, x * 32, y * 32);
    if (room.parsedEnts.length) {
      room.parsedEnts.forEach(this.createEntity, this);
    }
  }

  advance() {
    this.player.x = 0;
    this.player.y = 0;
    this.game.global.room = this.room.next;
    this.renderRoom();
  }

  createWall(x, y) {
    var wall = this.walls.create(x, y, 'wool_colored_cyan');
    wall.body.immovable = true;
    wall.collideWorldBounds = true;
    wall.allowGravity = false;
    wall.bringToTop();
    wall.z = this.player.z;
  }

  wordWrap(str, maxWidth) {
    var newLineStr = "\n", done = false, res = '';
    do {
        var found = false;
        // Inserts new line at first whitespace of the line
        for (var i = maxWidth - 1; i >= 0; i--) {
            if (/^\s$/.test(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('');
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        // Inserts new line at maxWidth position, the word is too long to wrap
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }

        if (str.length < maxWidth)
            done = true;
    } while (!done);

    return res + str;
  }

  createEntity(obj) {
    var group = (obj.type.group === 'enemies' ? this.enemies : this.friends);
    var e = group.create(obj.x, obj.y, obj.type.texture);
    e.health = e.maxHealth = 100;
    e.data.update = this.updateFunc(obj.type.group);
    e.data.parent = e;
  }

  updateFunc(group) {
    var self = this;
    var game = this.game;
    switch (group) {
      case 'enemies':
        return function () {
          this.parent.body.velocity = game.physics.arcade.velocityFromRotation(game.physics.arcade.angleBetween(this.parent, self.player), 200);
        };
    }
  }
}

export default Game;
