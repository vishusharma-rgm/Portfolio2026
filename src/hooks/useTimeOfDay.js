import { useEffect, useState } from "react";

export function useTimeOfDay() {
  const [isDay, setIsDay] = useState(() => {
    const h = new Date().getHours();
    return h >= 6 && h < 18;
  });
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const h = now.getHours();
      setIsDay(h >= 6 && h < 18);
      setClock(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 15000);
    return () => clearInterval(id);
  }, []);

  return { isDay, clock };
}
