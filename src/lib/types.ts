

export type FormValues = {
  learnerId: string;
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
  selectLearner: string,
  calendar: Date | null;
  instructor: string,
  status: string,
  detail: string,
  course: string,
  duration: string,
  stacks: string,
  contact: string
  paymentDetails: string
}


// Add this interface definition at the top of your file
export interface Invoice {
  _id: string; 
  amount: number;
  learnerID: string;
  image: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  date: string;
  status: string;
  user?: {
    name: string;
    email: string;
    image?: string;
  };
}


export interface Learner {
  _id: string;
  firstname: string; 
  lastname: string; 
  email: string; 
  course: string;
  gender: string; 
  location: string; 
  status: string;
  phone: string; 
  disability: string;
  image: string; 
  createdAt: string;
  amount: number;
  description: string
}

export interface Course {
  _id: string;
  adminId: string;
  title: string;
  price: number;
  duration: string;
  instructor: string;
  learners: string;
  image: string;
  stacks: string[]; 
  descriptions: string;
  createdAt: string;

}

// src/lib/types.ts
export interface AdminUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  contact?: string;
  role: string;
}

export interface AdminAuthResponse {
  message: string;
  user?: AdminUser;
}