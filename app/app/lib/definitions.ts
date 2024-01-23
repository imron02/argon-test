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

export interface Attendance {
  id: number;
  employeeId: number;
  checkInDatetime: string;
  checkOutDatetime: string;
}
