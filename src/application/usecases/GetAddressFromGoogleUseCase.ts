import { get } from "http";

export class GetAddressFromGoogleUseCase {
  async execute(address: string) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      throw new Error("Missing Google API key");
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("Address not found");
    }

    const result = data.results[0];
    console.log("Direccion Google: ", result.formatted_address);

    const components = result.address_components;

    type GoogleAddressComponent = {
      long_name: string;
      types: string[];
    };

    const getCompnent = (type: string) => components.find(
      (c: GoogleAddressComponent) => c.types.includes(type)
    )?.long_name || "";

    console.log("Componentes: ", getCompnent);

    return {
      formattedAddress: result.formatted_address,
      streetNumber: getCompnent("street_number"),
      route: getCompnent("route"),
      city: getCompnent("locality"),
      province: getCompnent("administrative_area_level_1"),
      country: getCompnent("country"),
      postalCode: getCompnent("postal_code"),
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    };
  }
}
