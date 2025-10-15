import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Информационни листовки за превозни средства
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
            Открийте важна информация за всички типове превозни средства - от леки автомобили до селскостопанска техника
          </p>
          
          <div className="mx-auto max-w-2xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Търсене на листовки..."
                  className="h-12 pl-10 bg-card border-0 shadow-lg"
                />
              </div>
              <Button size="lg" className="h-12 px-8 bg-accent hover:bg-accent/90 shadow-lg">
                Търси
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
    </section>
  );
};

export default HeroSection;
