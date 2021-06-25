export interface Profile {
  age: number;
  name: string;
  password: string;
  addresses: Address[];
}

interface Address {
  direction: string;
  postalCode: number;
  country: string;
  city: string;
}
