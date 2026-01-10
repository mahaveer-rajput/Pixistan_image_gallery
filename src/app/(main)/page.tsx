import HeroSection from "@/components/hero/Hero";
import React from 'react'
import ImageGrid from "@/components/imageGrid/ImageGrid";
const mockImages = [
  {
    id: "1",
    title: "Zen Meditation",
    duration: "20 weeks - 5 day 30 mins",
    imageUrl:
      "https://cdn.pixabay.com/photo/2025/06/03/18/01/urban-fashion-9639853_640.jpg",
    views: 1243,
    likes: 562,
    downloads: 321,
  },
  {
    id: "2",
    title: "Mountain Sunrise",
    duration: "15 weeks - 3 day 45 mins",
    imageUrl:
      "https://cdn.pixabay.com/photo/2025/04/24/05/23/woman-9554464_640.jpg",
    views: 2845,
    likes: 892,
    downloads: 543,
  },
  {
    id: "3",
    title: "Mountain Sunrise",
    duration: "15 weeks - 3 day 45 mins",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/11/14/20/14/compass-7592444_640.jpg",
    views: 2845,
    likes: 892,
    downloads: 543,
  },
  {
    id: "4",
    title: "Mountain Sunrise",
    duration: "15 weeks - 3 day 45 mins",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/11/14/20/14/compass-7592444_640.jpg",
    views: 2845,
    likes: 892,
    downloads: 543,
  },
  {
    id: "5",
    title: "Mountain Sunrise",
    duration: "15 weeks - 3 day 45 mins",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/11/14/20/14/compass-7592444_640.jpg",
    views: 2845,
    likes: 892,
    downloads: 543,
  },

  {
    id: "6",
    title: "Mountain Sunrise",
    duration: "15 weeks - 3 day 45 mins",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/11/14/20/14/compass-7592444_640.jpg",
    views: 2845,
    likes: 892,
    downloads: 543,
  },

  {
    id: "7",
    title: "Mountain Sunrise",
    duration: "15 weeks - 3 day 45 mins",
    imageUrl:
      "https://cdn.pixabay.com/photo/2025/05/01/16/21/insect-9571817_640.jpg",
    views: 2845,
    likes: 892,
    downloads: 543,
  },
  {
    id: "8",
    title: "Mountain Sunrise",
    duration: "15 weeks - 3 day 45 mins",
    imageUrl:
      "https://cdn.pixabay.com/photo/2025/05/13/07/47/train-9596810_640.jpg",
    views: 2845,
    likes: 892,
    downloads: 543,
  },
];
 
 export default function page() {
   return (
     <div>
       <HeroSection />
       <ImageGrid images={mockImages}/>
     </div>
   )
 }
 
