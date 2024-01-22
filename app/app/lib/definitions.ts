export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  position: string;
  phoneNumber: string;
  photoPath?: string;
  role?: string;
}

export interface AuthSession extends User {
  name: string;
  token: string;
}