import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";
import shoe4 from "@/assets/shoe-4.jpg";

export type Product = {
  id: string;
  name: string;
  tag: string;
  price: number;
  image: string;
  sizes: number[];
};

export const products: Product[] = [
  {
    id: "ember-hi",
    name: "Ember Hi-Top",
    tag: "New drop",
    price: 189,
    image: shoe1,
    sizes: [40, 41, 42, 43, 44, 45],
  },
  {
    id: "static-runner",
    name: "Static Runner",
    tag: "Best seller",
    price: 165,
    image: shoe2,
    sizes: [39, 40, 41, 42, 43, 44],
  },
  {
    id: "dust-low",
    name: "Dust Low Suede",
    tag: "Limited",
    price: 142,
    image: shoe3,
    sizes: [40, 41, 42, 43, 44],
  },
  {
    id: "blackout-court",
    name: "Blackout Court",
    tag: "Big Pee pick",
    price: 210,
    image: shoe4,
    sizes: [41, 42, 43, 44, 45, 46],
  },
];
