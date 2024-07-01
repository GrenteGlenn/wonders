export default interface Organization {
  id: number;
  userId: number;
  statusId: number;
  userAnswerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}