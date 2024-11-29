import { v4 as uuidv4 } from "uuid";
import { icons, images } from "../../imports/images.imports";
import "react-native-get-random-values";
const homeOptions = [
  {
    id: uuidv4(),
    name: "Store",
    icon: images.store,
  },
  {
    id: uuidv4(),
    name: "Restaurant",
    icon: images.restaurant,
  },
  {
    id: uuidv4(),
    name: "Send Package",
    icon: images.send,
  },
  {
    id: uuidv4(),
    name: "Events",
    icon: images.event,
  },
];

const currentTracking = [
  {
    id: uuidv4(),
    name: "Cindy Rice (5KG) - 3 Bags",
    status: "Transit",
    number: "#4126736233-56UC",
    date: "7/18/2023",
    icon: icons.object,
  },
  {
    id: uuidv4(),
    name: "Cindy Rice (5KG) - 3 Bags",
    status: "Transit",
    number: "#4126736233-56UC",
    date: "7/18/2023",
    icon: icons.object,
  },
  {
    id: uuidv4(),
    name: "Cindy Rice (5KG) - 3 Bags",
    status: "Transit",
    number: "#4126736233-56UC",
    date: "7/18/2023",
    icon: icons.object,
  },
];

export { homeOptions, currentTracking };
