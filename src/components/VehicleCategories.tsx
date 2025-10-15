import { Car, Bike, Truck, Bus, Tractor, Container } from "lucide-react";
import { Card } from "@/components/ui/card";

const categories = [
  {
    id: "cars",
    name: "Леки автомобили",
    icon: Car,
    count: 24,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "motorcycles",
    name: "Мотоциклети",
    icon: Bike,
    count: 18,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "trucks",
    name: "Товарни автомобили",
    icon: Truck,
    count: 15,
    color: "from-green-500 to-green-600",
  },
  {
    id: "buses",
    name: "Автобуси",
    icon: Bus,
    count: 12,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "agricultural",
    name: "Селскостопанска техника",
    icon: Tractor,
    count: 10,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: "trailers",
    name: "Ремаркета",
    icon: Container,
    count: 8,
    color: "from-red-500 to-red-600",
  },
];

const VehicleCategories = () => {
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
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} листовки
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
