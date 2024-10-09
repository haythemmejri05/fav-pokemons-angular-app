export interface User {
  id: string;         // UUID
  email: string;      // User's email
  password_hash: string;  // Hashed password
}

export interface UserCredentials {
  email: string;      // User's email
  password: string;   // User's password
  passwordConfirmation?: string;   // User's password confirmation
}

