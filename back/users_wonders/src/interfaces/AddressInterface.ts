import User from "./UserInterface";

export default interface AddressInterface {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    user: User;
}