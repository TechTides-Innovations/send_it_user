import { v4 as uuidv4 } from "uuid";
import { images } from "../../imports/images.imports";
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
    name: "Price Check",
    icon: images.price,
  },
];

export { homeOptions };
