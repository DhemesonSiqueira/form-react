import { ibgeApi } from "./api";

export interface Response {
  nome: string;
}

async function getCitiesByState(zipcode: string) {
  const { data } = await ibgeApi.get<Response[]>(`/estados/${zipcode}/municipios?orderBy=nome`);

  return data;
}

export const ibgeService = {
  getCitiesByState
}