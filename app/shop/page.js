import ShopFilter from "@/components/ShopFilter/ShopFilter";

export const metadata = {
  title: "Shop All Products",
  description: "Browse our extensive collection of furniture, lighting, accessories, and home decor. Find premium products at unbeatable prices on Anevix.",
  keywords: "shop online, furniture store, home decor, modern lighting, Anevix products, jeans online, shopping",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop All Products | Anevix",
    description: "Browse our extensive collection of furniture, lighting, accessories, and home decor. Find premium products at unbeatable prices on Anevix.",
    url: "https://anevix.com/shop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop All Products | Anevix",
    description: "Browse our extensive collection of furniture, lighting, accessories, and home decor. Find premium products at unbeatable prices on Anevix.",
  }
};

export default function ShopPage() {
  return <ShopFilter />;
}
