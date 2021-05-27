import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from 'app/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public db: AngularFirestore) { }

  public getMessages() {
   return  this.db.collection('messages').valueChanges()
  }
  public saveMessage(message: Message ) {
    return this.db.collection('messages').doc(`${message.message_id}`).set(message)
  }
}
