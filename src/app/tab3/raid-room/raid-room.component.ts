import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapComponent } from '../../map/map.component';
import { RaidService } from '../../services/raid.service';
import { Raid } from '../../models/raid';
import { Message } from '../../models/message';

@Component({
  selector: 'app-raid-room',
  templateUrl: './raid-room.component.html',
  styleUrls: ['./raid-room.component.scss'],
})
export class RaidRoomComponent implements OnInit {

  // was hoping to use below to import the same map component from parent container, but ended up being more complicated than anticipated.
  map;
  // the raid used to generate raid info for raid room.
  raid;
  // placeholder conversations for the chat of raid room.
  items;
  // new message created in raid room.
  newMessage: string;
  
  @Input()
  messages: Array<Message> = [
    {
      "author": "John",
      "msgContent": "Here is a message"
    },
    {
      "author": "Jack",
      "msgContent": "Speak up I can't hear you"
    },
    {
      "author": "Jill",
      "msgContent": "he said HERE IS A MESSAGE"
    }
 ];

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.items = this.messages;
  }

  leaveRoom() {
    this.modalController.dismiss();
  }

  // add a new message to chat from input
  addNewMessage() {
    let message = new Message();
    message.author = "Steve";
    message.msgContent = this.newMessage;
    this.messages.push(message);
    this.newMessage = "";
  }

}
