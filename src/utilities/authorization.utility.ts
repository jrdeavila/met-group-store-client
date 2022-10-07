export const getBasicAuthorization = () => {
  let token = localStorage.getItem("token");
  return `Bearer ${JSON.parse(token ?? "")}`;
};
