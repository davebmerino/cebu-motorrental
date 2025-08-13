import banner1 from "./banner1.jpg";
import banner2 from "./banner2.jpg";
import banner3 from "./banner3.jpg";
import clickblack from "./clickblack.png";
import clickorange from "./clickorange.jpg";
import clickred from "./clickred.avif";
import nmax from "./nmax.jpg";
import aerox from "./aerox.webp";
import postImage1 from "./postimage1.jpg";
import postImage2 from "./postimage2.jpg";
import postImage3 from "./postimage3.jpg";
import postImage4 from "./postimage4.jpg";
import postImage5 from "./postimage5.jpg";

import imageUpload from "./image-.png";
import aboutpic from "./aboutmotorental.jpg";
import logo from "./motorentallogo.jpg";

export const motorData = [
  {
    id: "1",
    image: clickorange,
    brand: "Honda",
    model: "Click 125",
    year: 2019,
    pricePerDay: 400,
    displacement: "125cc",
    transmission: "CVT",
    description: "2019 model, perfect for city riding and affordable",
    available: true,
  },
  {
    id: "2",
    image: clickred,
    brand: "Honda",
    model: "Click 125",
    year: 2023,
    pricePerDay: 450,
    displacement: "125cc",
    transmission: "CVT",
    description: "2023 model, perfect for city riding and affordable",
    available: true,
  },
  {
    id: "3",
    image: clickblack,
    brand: "Honda",
    model: "Click 125",
    year: 2024,
    pricePerDay: 450,
    displacement: "125cc",
    transmission: "CVT",
    description: "2024 model, perfect for city riding and affordable",
    available: true,
  },
  {
    id: "4",
    image: aerox,
    brand: "Yamaha",
    model: "Aerox 155",
    year: 2024,
    pricePerDay: 650,
    displacement: "155cc",
    transmission: "CVT",
    description: "2024 model, perfect for city riding and affordable",
    available: false,
  },

  {
    id: "5",
    image: nmax,
    brand: "Yamaha",
    model: "Nmax 155",
    year: 2024,
    pricePerDay: 900,
    displacement: "155cc",
    transmission: "CVT",
    description: "2024 model, perfect for city riding and affordable",
    available: true,
  },
];

export const bookingData = [
  {
    motor: "Honda Click 125cc",
    dateFrom: "04/10/2025",
    dateTo: "04/25/2025",
    total: 600,
    status: "completed",
  },
  {
    motor: "Honda Click 125cc",
    dateFrom: "04/10/2025",
    dateTo: "04/25/2025",
    total: 600,
    status: "pending",
  },
  {
    motor: "Honda Click 125cc",
    dateFrom: "04/10/2025",
    dateTo: "04/25/2025",
    total: 600,
    status: "canceled",
  },
  {
    motor: "Honda Click 125cc",
    dateFrom: "04/10/2025",
    dateTo: "04/25/2025",
    total: 600,
    status: "completed",
  },
  {
    motor: "Honda Click 125cc",
    dateFrom: "04/10/2025",
    dateTo: "04/25/2025",
    total: 600,
    status: "completed",
  },
];

export const assets = {
  banner1,
  banner2,
  banner3,
  clickblack,
  clickorange,
  clickred,
  nmax,
  aerox,
  aboutpic,
  logo,
  postImage1,
  postImage2,
  postImage3,
  postImage4,
  postImage5,
  imageUpload,
};
