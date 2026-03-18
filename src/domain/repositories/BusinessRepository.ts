export type AvailabilityInput = {
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  opensAt: string;
  closesAt: string;
  isClosed: boolean;
};

export type CreateBusinessInput = {
  name: string;
  ownerName: string;
  phone: string;
  businessEmail: string;
  availability?: AvailabilityInput[];
  formattedAddress: string;
  streetNumber?: string;
  route?: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
  ownerId: string;
};

export type BusinessDTO = {
  id: string;
  name: string;
  ownerId: string;
};

export interface BusinessRepository {
  create(input: CreateBusinessInput): Promise<BusinessDTO>;
  //findByOwnerId(ownerId: string): Promise<BusinessDTO | null>;
}
