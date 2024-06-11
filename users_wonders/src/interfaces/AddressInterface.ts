import User from "./UserInterface";

export default interface Address {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    user: User;
}