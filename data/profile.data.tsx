import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

const profileMenu = [
  {
    id: uuidv4(),
    name: "Account Settings",
  },
  {
    id: uuidv4(),
    name: "Favorites",
  },
  {
    id: uuidv4(),
    name: "Notification Settings",
  },
  {
    id: uuidv4(),
    name: "Inbox Settings",
  },
  {
    id: uuidv4(),
    name: "Order History",
  },
  {
    id: uuidv4(),
    name: "Security Settings",
  },
  {
    id: uuidv4(),
    name: "Help & Support",
  },
  {
    id: uuidv4(),
    name: "Privacy Policy",
  },
  {
    id: uuidv4(),
    name: "About",
  },
  {
    id: uuidv4(),
    name: "Logout",
  },
];

export { profileMenu };
