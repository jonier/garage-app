export type CreateBusinessInput = {
  name: string;
  ownerName: string;
  phone: string;
  businessEmail: string;
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
