import { ImageSourcePropType } from "react-native";

interface PromosType {
  id: string;
  image: ImageSourcePropType;
}

interface CurrentTrackingType {
  id: string;
  name: string;
  number: string;
  icon: ImageSourcePropType;
  date: string;
  status: string;
}

interface UserSettings {
  receive_delivery_notifications: boolean;
  receive_chat_notifications: boolean;
  receive_promo_notifications: boolean;
  receive_tracking_notifications: boolean;
}

interface UserType {
  id: number;
  address: any[];
  settings: UserSettings;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  main_address: string | null;
  profile_picture: string | null;
  email: string;
  phone_number: string;
  role: "customer" | "admin" | "staff" | string;
  is_verified: boolean;
  groups: any[];
  user_permissions: any[];
  favorites: any[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
  user: UserType | null;
  updateUserPartially: (user: UserType) => Promise<void>;
  setUser: (user: UserType) => Promise<void>;
}

export { PromosType, CurrentTrackingType, UserType, AuthContextType };
