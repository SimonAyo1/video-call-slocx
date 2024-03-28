import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { Message, RoomData } from '../types/message';

export const WS_ENDPOINT = environment.wsEndpoint; // wsEndpoint: 'ws://localhost:8081'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private socket$!: WebSocketSubject<any> | undefined;
  public roomID: string = '1f213e23-e815-4b63-8097-2754aca40f1a'
  public websocketType: string = ''
  private messagesSubject = new Subject<RoomData>();
  public messages$ = this.messagesSubject.asObservable();

  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(): void {
    console.log('connecting....' );
    if (!this.socket$ || this.socket$.closed) {
      console.log('connecting1....');
      this.socket$ = this.getNewWebSocket();
      this.socket$?.subscribe(
        {
          next: (msg) => {
            console.log('Received message of type: ' + msg.Message.type);
            this.messagesSubject.next(msg);
          },
          error: (err) => console.log('Error: REC' + err),
          complete: () => console.log('Complete'),
        }
        // Called whenever there is a message from the server
      );
    }
  }

  sendMessage(data: RoomData): void {
    console.log('sending message: ' + data.Message.awnser, data);
    this.socket$?.next(data);
  }

  /**
   * Return a custom WebSocket subject which reconnects after failure
   */

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: `ws://192.168.106.1:2000/v1/lessons/join/1f213e23-e815-4b63-8097-2754aca40f1a/tutor?joinerId=f56c5639-58ac-4fbe-93ec-170be82b04d5`,
      openObserver: {
        next: (ws) => {
          console.log('[DataService]: connection ok',);

        },
        error: (err) => {
          console.log(err, 'erorororor');
        },
      },
      closeObserver: {
        next: () => {
          console.log('[DataService]: connection closed');
          this.socket$ = undefined;
          this.connect();
        },
      },
    });
  }
}

// import { Injectable, inject } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Message } from '../types/message';
// import {
//   Firestore,
//   collectionData,
//   collection,
//   addDoc,
//   DocumentReference,
// } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root',
// })
// export class DataService {
//   firestore: Firestore = inject(Firestore);
//   messages$!: Observable<Message[] | any>;

//   messageColl = collection(this.firestore, 'messages');

//   constructor() {
//     this.messages$ = collectionData<Message[]>(this.messageColl as any);
//   }

//   sendMessage(msg: Message): void {
//     addDoc(this.messageColl, <{data: string}>{ data: JSON.stringify(msg) }).then(
//       (documentReference: DocumentReference) => {
//         console.log({ data: JSON.stringify(msg) })
//       }
//     );
//   }

// getMessages(): Observable<Message[]> {
// }
// }
