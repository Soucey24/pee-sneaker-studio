import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";
import shoe4 from "@/assets/shoe-4.jpg";

export type Product = {
  id: string;
  category: "Shoes" | "Sneakers" | "Slippers";
  name: string;
  tag: string;
  price: number;
  image: string;
  images?: string[];
  sizes: number[];
  description: string;
  popularity: number;
  createdAt: string;
};

export type CatalogProduct = Product & {
  stock: number;
  status: "Active" | "Draft" | "Archived";
};

export const products: Product[] = [
  {
    id: "ember-hi",
    category: "Sneakers",
    name: "Ember Hi-Top",
    tag: "New drop",
    price: 189,
    image: shoe1,
    images: [shoe1, shoe2],
    sizes: [40, 41, 42, 43, 44, 45],
    description: "A high-top built with a padded collar, durable canvas, and a warm ember finish.",
    popularity: 98,
    createdAt: "2026-08-04",
  },
  {
    id: "static-runner",
    category: "Sneakers",
    name: "Static Runner",
    tag: "Best seller",
    price: 165,
    image: shoe2,
    images: [shoe2, shoe1],
    sizes: [39, 40, 41, 42, 43, 44],
    description: "A lightweight everyday runner with a responsive sole and clean technical lines.",
    popularity: 96,
    createdAt: "2026-07-21",
  },
  {
    id: "dust-low",
    category: "Shoes",
    name: "Dust Low Suede",
    tag: "Limited",
    price: 142,
    image: shoe3,
    images: [shoe3, shoe4],
    sizes: [40, 41, 42, 43, 44],
    description: "Soft suede, low profile, and an easy neutral tone for quiet daily rotation.",
    popularity: 89,
    createdAt: "2026-06-15",
  },
  {
    id: "blackout-court",
    category: "Shoes",
    name: "Blackout Court",
    tag: "Big Pee pick",
    price: 210,
    image: shoe4,
    images: [shoe4, shoe3],
    sizes: [41, 42, 43, 44, 45, 46],
    description: "A structured court classic with a blackout upper and serious street presence.",
    popularity: 94,
    createdAt: "2026-05-28",
  },
  {
    id: "cloud-slide",
    category: "Slippers",
    name: "Cloud Slide",
    tag: "New comfort",
    price: 78,
    image: shoe3,
    images: [shoe3, shoe4],
    sizes: [39, 40, 41, 42, 43, 44],
    description: "Cloud-soft slides for recovery days, quick errands, and post-game comfort.",
    popularity: 91,
    createdAt: "2026-08-18",
  },
  {
    id: "after-hours-slide",
    category: "Slippers",
    name: "After Hours Slide",
    tag: "Big Pee pick",
    price: 86,
    image: shoe4,
    images: [shoe4, shoe3],
    sizes: [40, 41, 42, 43, 44, 45],
    description: "A relaxed after-hours slide with a supportive footbed and easy slip-on shape.",
    popularity: 86,
    createdAt: "2026-04-10",
  },
];
