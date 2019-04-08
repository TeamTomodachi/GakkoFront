import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { RaidService } from '../../services/raid.service'
import { Raid } from '../../models/raid'

@Component({
  selector: 'app-add-raid',
  templateUrl: './add-raid.component.html',
  styleUrls: ['./add-raid.component.scss']
})
export class AddRaidComponent implements OnInit {

  @Output() addRaid: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  time: string;
  level: string;
  private: boolean;

  constructor(public modalController: ModalController) { }

  ngOnInit() {

  }

  onSubmit() {
    const raid = {
      time: this.time,
      level: this.level,
      private: this.private,
      roomNum: Math.floor(Math.random() * 10000) + 1
    }
    this.modalController.dismiss(
      raid
    );
  }

  closeForm(){
    this.modalController.dismiss();
  }
}
