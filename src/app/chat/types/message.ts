export interface Message {
  awnser: 'offer' | 'answer' | 'hangup' | 'ice-candidate';
  data: any;
}
export interface RoomData {
  Message: Message
  RoomID: string
  Client: string
}

