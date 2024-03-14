import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [data, setData] = useState<T>(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) || "")
      : defaultValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData] as const;
};
