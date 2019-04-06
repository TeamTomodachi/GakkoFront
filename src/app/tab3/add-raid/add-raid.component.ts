import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-raid',
  templateUrl: './add-raid.component.html',
  styleUrls: ['./add-raid.component.scss'],
})
export class AddRaidComponent implements OnInit {

  @Output() addRaid: EventEmitter<any> = new EventEmitter();

  time: string;
  level: string;
  private: boolean;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    const raid = {
      title: this.time,
      level: this.level,
      private: this.private

    }

    this.addRaid.emit(raid);
  }

  closeRaid(){
    
  }


}
