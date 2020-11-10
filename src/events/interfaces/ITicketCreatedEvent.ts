import { Subjects } from "../enums/subjects";
import { IEvent } from "./IEvent";

export interface ITicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
