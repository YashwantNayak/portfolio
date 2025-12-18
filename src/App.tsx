import { useEffect, useState } from "react";
import DesktopApp from "./components/DesktopApp";
import MobileOnly from "./components/MobileOnly";

export default function App() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  // IMPORTANT: prevents blank screen during hydration
  if (isMobile === null) return null;

  return isMobile ? <MobileOnly /> : <DesktopApp />;
}
