import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const brochures = [
  {
    id: 1,
    title: "Техническа проверка на леки автомобили 2025",
    category: "Леки автомобили",
    date: "15.10.2025",
    downloads: 1234,
    color: "blue",
  },
  {
    id: 2,
    title: "Регистрация на нови мотоциклети",
    category: "Мотоциклети",
    date: "12.10.2025",
    downloads: 856,
    color: "orange",
  },
  {
    id: 3,
    title: "Изисквания за товарни автомобили над 3.5т",
    category: "Товарни автомобили",
    date: "10.10.2025",
    downloads: 2145,
    color: "green",
  },
  {
    id: 4,
    title: "Лицензиране на автобуси за обществен транспорт",
    category: "Автобуси",
    date: "08.10.2025",
    downloads: 678,
    color: "purple",
  },
  {
    id: 5,
    title: "Регистрация на селскостопанска техника",
    category: "Селскостопанска техника",
    date: "05.10.2025",
    downloads: 423,
    color: "yellow",
  },
  {
    id: 6,
    title: "Технически изисквания за ремаркета",
    category: "Ремаркета",
    date: "03.10.2025",
    downloads: 567,
    color: "red",
  },
];

const LatestBrochures = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Най-нови листовки
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Актуални информационни материали и наръчници
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brochures.map((brochure) => (
            <Card key={brochure.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-3">
                  <Badge variant="secondary" className={`bg-${brochure.color}-100 text-${brochure.color}-700 hover:bg-${brochure.color}-100`}>
                    {brochure.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {brochure.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{brochure.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{brochure.downloads}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4" />
                  Преглед
                </Button>
                <Button size="sm" className="flex-1">
                  <Download className="h-4 w-4" />
                  Изтегли
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline">
            Виж всички листовки
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestBrochures;
