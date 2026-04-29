export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Rubinus";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_DESCRIOTION || "Premium E-commerce Experience";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export  const SignInDefaultValues = {
    email:'',
    password:'',
}
export  interface SignUpFormState  {
errors?:{
    name?:string[],
    email?:string[],
    password?:string[],
    confirmPassword?:string[],
}
formData?:{
    name?:string,
    email?:string,
    password?:string,
    confirmPassword?:string,
};
status?:number;
message?:string;
}
