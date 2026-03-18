import {
  type AddressData,
  type BusinessAvailability,
} from "@/presentation/web/context/RegisterContext";

export type RegisterBusinessOwnerDTO = {
  address: AddressData;
  availability?: BusinessAvailability[];
  businessName: string;
  ownerName: string;
  phone: string;
  businessEmail: string;

  firstName: string;
  lastName: string;
  email: string;
  password: string;
};