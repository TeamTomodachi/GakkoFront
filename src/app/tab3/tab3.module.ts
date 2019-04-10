import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { MapComponent } from '../map/map.component';
import { AddRaidComponent } from './add-raid/add-raid.component';
import { RaidRoomComponent } from './raid-room/raid-room.component';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page, MapComponent, AddRaidComponent, RaidRoomComponent],
  exports: [MapComponent, AddRaidComponent, RaidRoomComponent],
  entryComponents: [AddRaidComponent, RaidRoomComponent]
})
export class Tab3PageModule {

}
