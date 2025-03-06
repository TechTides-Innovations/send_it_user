import home from "@/assets/home.png";
import work from "@/assets/work.png";
import family from "@/assets/family.png";

const savedPlaces = [
  {
    id: 1,
    name: "Home",
    location: "Jasmine, Street 9",
    icon: home,
  },
  {
    id: 2,
    name: "Work",
    location: "Ramjack Technology Solutions",
    icon: work,
  },
  {
    id: 3,
    name: "Family",
    location: "Konkoband Production House",
    icon: family,
  },
];

const packages = [
  {
    id: 1,
    name: "Small Package",
    desc: "Fits small personal items like jewelry, cosmetics, gadgets (phones, chargers), or a single book.",
    image: require("../assets/pak-small.png"),
  },
  {
    id: 2,
    name: "Medium Package",
    desc: "Ideal for medium-sized items like shoes, clothing, books, or small electronics.",
    image: require("../assets/pak-medium.png"),
  },
  {
    id: 3,
    name: "Large Package",
    desc: "Best for large or bulky items such as laptops, larger electronics, or multiple items in one package.",
    image: require("../assets/pak-large.png"),
  },
];

export { savedPlaces, packages };
