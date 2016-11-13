class SongManager {
  constructor(game) {
    this.game = game;
    this._cursong = null;
  }

  play(name) {
    if (this._cursong) {
      this._cursong.stop();
      this._cursong.destroy();
    }
    this._cursong = this.game.add.audio(name);
    this._cursong.play(null, null, null, true, true);
    this._cursong.mute = false;
    this._cursong.volume = 1;
  }
}
export default SongManager;
