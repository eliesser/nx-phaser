import * as Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const gameWidth = Number(this.sys.game.config.width);
    const gameHeight = Number(this.sys.game.config.height);

    this.add.image(gameWidth / 2, gameHeight / 2 - 80, 'food').setScale(6);

    this.add
      .dynamicBitmapText(gameWidth / 2, gameHeight / 2, 'pixel', 'SNAKE', 18)
      .setScale(2)
      .setOrigin(0.5);

    const pressButton = this.add
      .dynamicBitmapText(
        gameWidth / 2,
        gameHeight - 40,
        'pixel',
        'PRESS ANY BUTTON',
        8
      )
      .setScale(2)
      .setOrigin(0.5);

    this.tweens.add({
      targets: pressButton,
      alpha: 0,
      ease: (x: number) => (x < 0.5 ? 0 : 1),
      duration: 500,
      yoyo: true,
      repeat: -1,
    });

    this.input.on('pointerdown', () => this.goToPlay());
    this.input.keyboard?.on('keydown', () => this.goToPlay());
  }

  goToPlay() {
    // this.scene.start('Play');
    console.log('Play');
  }
}
