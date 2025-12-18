
// home page component
import HomePageComponent from "@/_pages/home/Home";
import "./globals.css";

// components
import Header from "@/components/header/Header";

export default function HomePage() {
  return (
    <>
    <Header/>
    <HomePageComponent />
    </>
  );
}
