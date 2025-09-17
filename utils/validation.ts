export const validateUser = (data: any) => {
  const errors: any = {};
  if (!/^[A-Za-z ]+$/.test(data.name)) errors.name = "Name must be letters only";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email";
  if (!/^\d{11}$/.test(data.phone)) errors.phone = "Phone must be 11 digits";
  if (!data.password || data.password.length < 6) errors.password = "Password min 6 chars";
  if (!data.country) data.country = "Bangladesh";
  return errors;
};
