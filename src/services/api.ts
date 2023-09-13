import axios from 'axios';

const cepApi = axios.create({
  baseURL: "https://viacep.com.br/ws"
});

const ibgeApi = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades"
})

export { cepApi, ibgeApi };
