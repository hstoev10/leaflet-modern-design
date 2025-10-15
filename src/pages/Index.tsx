import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VehicleCategories from "@/components/VehicleCategories";
import LatestBrochures from "@/components/LatestBrochures";
import Footer from "@/components/Footer";

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
    </div>
  );
};

export default Index;
