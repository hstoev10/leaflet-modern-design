import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { toast } from "sonner";

const LatestBrochures = () => {
  const { data: brochures, isLoading } = useQuery({
    queryKey: ["latest-brochures"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brochures")
        .select(`
          *,
          categories (
            name,
            color
          )
        `)
        .order("published_date", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  const handleView = (fileUrl: string | null) => {
    if (!fileUrl) {
      toast.error("Файлът не е наличен");
      return;
    }
    window.open(fileUrl, "_blank");
  };

  const handleDownload = async (fileUrl: string | null, title: string, brochureId: string) => {
    if (!fileUrl) {
      toast.error("Файлът не е наличен");
      return;
    }

    // Get current brochure to increment downloads
    const { data: currentBrochure } = await supabase
      .from("brochures")
      .select("downloads")
      .eq("id", brochureId)
      .single();

    // Increment download count
    if (currentBrochure) {
      await supabase
        .from("brochures")
        .update({ downloads: (currentBrochure.downloads || 0) + 1 })
        .eq("id", brochureId);
    }

    // Trigger download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Изтеглянето започна");
  };
  if (isLoading) {
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-5 w-full bg-muted animate-pulse rounded mt-3" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {brochures?.map((brochure) => (
            <Card key={brochure.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-3">
                  <Badge variant="secondary">
                    {brochure.categories?.name || "Без категория"}
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
                    <span>
                      {brochure.published_date 
                        ? format(new Date(brochure.published_date), "dd.MM.yyyy", { locale: bg })
                        : "Няма дата"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{brochure.downloads || 0}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-2"
                  onClick={() => handleView(brochure.file_url)}
                >
                  <Eye className="h-4 w-4" />
                  Преглед
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 gap-2"
                  onClick={() => handleDownload(brochure.file_url, brochure.title, brochure.id)}
                >
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
