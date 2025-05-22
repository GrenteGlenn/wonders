import { Status } from './Global';

export default interface TripTransportationInterface {
  id?: number;
  from_date: Date;
  to_date: Date;
  price: number;
  url: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}
