import { EndpointLoginToken, LoginToken } from "../models";

export const CreateAdapttedLoginToken = (loginToken: EndpointLoginToken) => {
  const token: LoginToken = {
    token: loginToken.access_token,
  };
  return token;
};
