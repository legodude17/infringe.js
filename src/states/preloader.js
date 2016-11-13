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
    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.25, 'Loading Resources...    0/0 Assets Loaded (0%)', {
      fill: '#FFFFFF'
    });
    text.anchor.setTo(0.5);
    var updateProgress = () => {
      text.setText('Loading Resources...    ' + this.load.totalLoadedFiles() + '/' + (this.load.totalLoadedFiles() + this.load.totalQueuedFiles()) + ' Assets Loaded (' + this.load.progress + '%)');
    };
    this.load.onFileStart.add(updateProgress);
    this.load.onFileComplete.add(updateProgress);

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
      this.game.load.images(['play', 'Pause', 'person', 'pwrblt', 'snow', 'Zombie']);
      this.game.load.images(this.generateImages());
      this.game.load.spritesheet('missile', null, 252 * 0.25, 89 * 0.25, 4);
      this.game.load.spritesheet('portal', null, 32, 32);
      this.game.load.audio('intro', 'NewStuff.wav');
      Object.keys(rooms.rooms).filter(function (v) {
        return v !== 'default';
      }).forEach(function (i) {
        this.game.load.audio(rooms.rooms[i].music.replace('.wav', ''), rooms.rooms[i].music);
      }, this);
  }

  onLoadComplete() {
    console.log('Load complete!');
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
      });
    }).forEach(function (v) {
      v.forEach(function (v) {
        imgs.push(v);
      });
    });
    return imgs;
  }
}

export default Preloader;
