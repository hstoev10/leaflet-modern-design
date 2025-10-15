import { FileText, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Листовки БГ</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Информационни листовки за всички типове превозни средства в България
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Бързи връзки</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Начало
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                  Категории
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  За нас
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/cars" className="text-muted-foreground hover:text-primary transition-colors">
                  Леки автомобили
                </Link>
              </li>
              <li>
                <Link to="/category/motorcycles" className="text-muted-foreground hover:text-primary transition-colors">
                  Мотоциклети
                </Link>
              </li>
              <li>
                <Link to="/category/trucks" className="text-muted-foreground hover:text-primary transition-colors">
                  Товарни автомобили
                </Link>
              </li>
              <li>
                <Link to="/category/buses" className="text-muted-foreground hover:text-primary transition-colors">
                  Автобуси
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Контакти</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>бул. "Мария Луиза" 106, София</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>02 / 952 44 88</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@listovki.bg</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Листовки БГ. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
