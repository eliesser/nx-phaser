import { Component, OnDestroy } from '@angular/core';

import { PhaserService } from '@nx-phaser/phaser/services';

@Component({
  selector: 'nx-phaser-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public actionsHistoryRef: string[]; // * Store all actions on home screen for printing

  // * for our app template to use the actions History)
  constructor(public phaserInstance: PhaserService) {
    this.actionsHistoryRef = PhaserService.actionsHistory;
  }

  /**
   * * Need to handle the destroy method so we dont lock up our computer!
   */
  ngOnDestroy(): void {
    PhaserService.destroyActiveGame();
  }
}
