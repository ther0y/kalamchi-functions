export type User = {
  id: string;
  username: string | null;
  email: string | null;
  phone: string | null;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  salt: string;
  password: string | null;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};
