"use client";
import Header from "@/app/components/Header";
import { groq } from "next-sanity";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { client } from "@/sanity/lib/client";
import { addToCart } from "../../../../redux/CartReducer";
import Image from "next/image";

interface Offer {
  id: string;
  title: string;
  offer: string;
  oldPrice: number;
  price: number;
  image: string;
  carouselImages: string[];
  color: string;
  size: string;
}

interface ProductDetailsProps {
  params: { id: string };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const offers: Offer[] = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    // Other offers omitted for brevity
  ];

  const [index, setIndex] = useState<number>(0);
  const [added, setAdded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Offer | null>(null);
  const { id } = params;

  const addItemToCart = (item: Offer) => {
    setAdded(true);
    dispatch(addToCart(item));
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const query = groq`*[_type == "deal" && _id == $id][0]`;
        const data = await client.fetch<Offer>(query, { id });
        setProduct(data);
      };

      fetchData();
    }
  }, [id]);

  console.log(product);

  return (
    <div>
      <Header />
      <div className="flex gap-40 m-40 mt-20">
        {/* Left part */}
        <div>
          <div>
            <Image 
              className="w-80 h-80 rounded-sm object-contain cursor-pointer"
              src={product?.carouselImages[index] || ""}
              alt="Product"
              width={80}
              height={80}
            />
          </div>
          <div className="hidden lg:flex lg:mt-12 gap-10 mt-10">
            {product?.carouselImages?.map((item, idx) => (
              <Image 
                key={idx}
                className="w-20 h-20 object-contain cursor-pointer"
                src={item}
                alt={`Carousel ${idx}`}
                onMouseEnter={() => setIndex(idx)}
                width={20}
                height={20}
              />
            ))}
          </div>
        </div>

        {/* Right Part */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-lg font-semibold">{product?.title}</h1>

          <p>Color : {product?.color}</p>
          <p>Size : {product?.size}</p>

          <h4>Details :</h4>
          <p>Price : Rs {product?.price}</p>

          <div className="flex flex-col space-y-3">
            <button
              onClick={() => product && addItemToCart(product)}
              className="w-60 rounded-md p-2 mt-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400"
            >
              {added ? "Added to Cart" : "Add to Cart"}
            </button>

            <button className="w-60 rounded-md p-2 mt-2 text-xs md:text-sm bg-gradient-to-b from-yellow-400 to-yellow-500">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
