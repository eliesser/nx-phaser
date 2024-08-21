import * as Phaser from 'phaser';

export class BootLoaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootLoaderScene' });
  }

  preload() {
    try {
      console.log('world.scene.ts', 'preload()');

      this.load.image('body', 'assets/images/body.png');

      this.load.image('food', 'assets/images/food.png');

      this.load.image('board', 'assets/images/board.png');

      this.load.json('fontJson', 'assets/font/font.json');
      this.load.image('font', 'assets/font/font.png');
    } catch (e) {
      console.error('preloader.scene.ts', 'error preloading', e);
    }
  }

  create() {
    console.log(
      'world.scene.ts',
      'create()',
      this.scale.width,
      this.scale.height
    );

    const fontJson = this.cache.json.get('fontJson');
    this.cache.bitmapFont.add(
      'pixel',
      Phaser.GameObjects.RetroFont.Parse(this, fontJson)
    );

    this.scene.start('MenuScene');
  }
}
