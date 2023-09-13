import { cepApi } from "./api";

export interface AddressResponse {
  bairro: string;
  complemento: string;
  localidade: string;
  logradouro: string;
  uf: string;
  pais: string;
  erro?: boolean;
}

async function getAddressByZipCode(zipcode: string) {
  const { data } = await cepApi.get<AddressResponse>(`/${zipcode}/json/`);

  if (data.erro) {
    return data;
  }

  return { ...data, pais: "Brasil" };
}

export const cepService = {
  getAddressByZipCode
}