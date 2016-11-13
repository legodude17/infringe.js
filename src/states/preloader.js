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
      this.game.load.image('play');
      this.game.load.image('check');
      this.game.load.image('Pause');
      this.game.load.image('person');
      this.game.load.image('pwrblt');
      this.game.load.image('x');
      this.game.load.image('background', 'Snowtex.png')
      this.game.load.spritesheet('missile', null, 89, 191, 4);
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
