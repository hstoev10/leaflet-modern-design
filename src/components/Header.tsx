import { Link } from "react-router-dom";
import { FileText, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <FileText className="h-6 w-6 text-primary" />
          <span>Листовки БГ</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Начало
          </Link>
          <Link to="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            Категории
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            За нас
          </Link>
          <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Контакти
          </Link>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
