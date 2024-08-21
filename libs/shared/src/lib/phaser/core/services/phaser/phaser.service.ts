import { Injectable, NgZone, Optional, SkipSelf } from '@angular/core';

import * as Phaser from 'phaser';

import { BootLoaderScene, MenuScene } from '../../scenes';

@Injectable({
  providedIn: 'root',
})
export class PhaserService {
  // * We need the Phaser.Game to live inside our own class because extending Phaser.Game would require a super call
  public static activeGame: Phaser.Game;
  public static actionsHistory: string[] = []; // * Since phaser is a singleton, let's store the history of actions here for all components.
  private static ngZone: NgZone;

  constructor(
    private _ngZone: NgZone,
    @Optional() @SkipSelf() parentModule?: PhaserService
  ) {
    if (parentModule) {
      console.error('Phaser Service is already loaded');
    } else {
      PhaserService.ngZone = this._ngZone;
      PhaserService.actionsHistory.push('Initializing Phaser...');
    }
  }

  /**
   * * Initializes the active Phaser.Game
   * * The Phaser.Game instance owns Scene Manager, Texture Manager, Animations FrameHandler, and Device Class as GLOBALS
   * * The Scene Manager owns the individual Scenes and is accessed by activeGame.scene
   * * Each Scene owns it's own "world", which includes all game objects.
   * ! GameInstance must be the parent class to scenes.
   * ! Should only be called *when* we want it to load in memory.  I.e. during simulation.
   */
  public static async init(parent: string): Promise<void> {
    console.warn('Phaser Service init');
    /**
     * * Phaser by default runs at 60 FPS, and each frame that triggers change detection in Angular which causes
     * * Performance to go out the door.  NgZone's runOutsideAngular will prevent Phaser from automatically hitting change detection
     * * https://angular.io/guide/zone
     */

    this.ngZone.runOutsideAngular(() => {
      if (!this.activeGame) {
        // To scale game to always fit in parent container
        // https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html
        this.activeGame = new Phaser.Game({
          type: Phaser.AUTO,
          scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: window.innerWidth,
            height: window.innerHeight,
          },
          parent,
          scene: [BootLoaderScene, MenuScene],
          plugins: {
            global: [],
            scene: [],
          },
          backgroundColor: '#f9ca24',
          fps: {
            forceSetTimeOut: true,
          },
          render: {
            transparent: false,
          },
        });
      }
    });
  }

  /**
   * * When A user Logs out, destroy the active game.
   */
  public static destroyActiveGame(): void {
    //* Param 1: Set to true if you would like the parent canvas element removed from the DOM.
    //* Param 2: Set to false  If you do need to create another game instance on the same page
    if (this.activeGame) {
      this.activeGame.destroy(true, false);
    }
  }
}
