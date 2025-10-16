import { Car, Bike, Truck, Bus, Tractor, Container } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = {
  Car,
  Bike,
  Truck,
  Bus,
  Tractor,
  Container,
};

const colorMap: Record<string, string> = {
  blue: "from-blue-500 to-blue-600",
  orange: "from-orange-500 to-orange-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  yellow: "from-yellow-500 to-yellow-600",
  red: "from-red-500 to-red-600",
};

const VehicleCategories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });
  if (isLoading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Категории превозни средства
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Изберете категория, за да намерите специфични информационни листовки
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6">
                <div className="h-16 w-16 bg-muted animate-pulse rounded-2xl mb-4" />
                <div className="h-6 w-32 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Категории превозни средства
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Изберете категория, за да намерите специфични информационни листовки
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories?.map((category) => {
            const Icon = iconMap[category.icon] || Car;
            const colorClass = colorMap[category.color] || colorMap.blue;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClass} shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.brochure_count || 0} листовки
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VehicleCategories;
