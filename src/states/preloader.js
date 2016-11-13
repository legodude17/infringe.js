import rooms from '../rooms.js';
class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  update() {
      if (this.ready) {
        this.game.state.start('menu');
      }
  }

  loadResources() {
      // load your resources here
      this.game.load.baseURL = window.location;
      this.game.load.path = 'assets/';
      this.game.load.image('bullet', 'bullett orange.png');
      this.game.load.audio('lab', 'Lab Room.wav');
      this.game.load.images(['play', 'Pause', 'person', 'pwrblt', 'snow']);
      this.game.load.images(this.generateImages());
      this.game.load.spritesheet('missile', null, 252 * 0.25, 89 * 0.25, 4);
      this.game.load.spritesheet('portal', null, 32, 32);
  }

  onLoadComplete() {
    this.ready = true;
  }

  generateImages() {
    var imgs = [];
    Object.keys(rooms.rooms).filter(function (v) {
      return v !== 'default';
    }).map(function (v) {
      return rooms.rooms[v];
    }).map(function (v) {
      return Object.keys(v.textureMap).map(function (i) {
        return v.textureMap[i];
      }).filter(function (v) {
        return v !== 'portal';
      })
    }).forEach(function (v) {
      v.forEach(function (v) {
        imgs.push(v);
      });
    });
    return imgs;
  }
}

export default Preloader;
