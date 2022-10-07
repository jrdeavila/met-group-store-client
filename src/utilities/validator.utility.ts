export const getValidatorErrorMessage = (code: number) => {
  if (code === 401) return "Unauthorized Action";
  if (code === 422) return "Invalid Parameters";
  if (code === 404) return "Resource Not Found";
  if (code >= 400 && code < 500) return "Action Not Allowed";
  if (code === 500) return "Server Error";
  return "Unknown Action";
};
