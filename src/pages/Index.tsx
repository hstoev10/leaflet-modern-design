import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VehicleCategories from "@/components/VehicleCategories";
import LatestBrochures from "@/components/LatestBrochures";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <VehicleCategories />
        <LatestBrochures />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
