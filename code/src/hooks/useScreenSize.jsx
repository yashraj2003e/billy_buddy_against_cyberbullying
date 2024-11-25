import { useState, useEffect } from "react";

function useScreenSize() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    function checkSize() {
      setIsSmallScreen(window.innerWidth < 640);
    }

    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isSmallScreen;
}

export default useScreenSize;
