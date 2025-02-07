


export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  chooseModule: string;
  gender: string;
  disabled: string;
  phone: string;
  image: string ;
  amount: number;
  description: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  oldPassword: string,
}

export interface Course {
  _id: string;
  title: string;
}