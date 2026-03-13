import { type AddressData } from "@/presentation/web/context/RegisterContext";

export type RegisterBusinessOwnerDTO = {
  address: AddressData;
  businessName: string;
  ownerName: string;
  phone: string;
  businessEmail: string;

  firstName: string;
  lastName: string;
  email: string;
  password: string;
};