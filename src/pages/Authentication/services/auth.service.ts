import { AxiosCall } from "@/models";
import axios from "axios";
import { Crendentials, EndpointLoginToken } from "../models";

const loginApiUrl = `${import.meta.env.VITE_API_URL}/auth`;
const registerApiUrl = `${import.meta.env.VITE_API_URL}/register`;

export const authLoginRequest = (
  credentials: Crendentials
): AxiosCall<EndpointLoginToken> => {
  return {
    call: axios.post(loginApiUrl, credentials),
  };
};

export const authRegisterRequest = (
  credentials: Crendentials
): AxiosCall<any> => {
  return {
    call: axios.post(registerApiUrl, credentials),
  };
};
