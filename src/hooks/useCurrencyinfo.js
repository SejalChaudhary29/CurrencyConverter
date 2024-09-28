import React, { useEffect, useState } from "react";

// Custom hook
function useCurrencyinfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((res) => {
        setData(res[currency]);
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
      });
  }, [currency]);

  return data;
}
export default useCurrencyinfo;

