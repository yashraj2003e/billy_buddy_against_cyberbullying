import { createContext, useContext, useState } from "react";

const dataContext = createContext();

export default function DataContext({ children }) {
  const [data, setData] = useState([{ bot: "" }]);

  return (
    <dataContext.Provider value={{ data, setData }}>
      {children}
    </dataContext.Provider>
  );
}

function useDataContext() {
  const value = useContext(dataContext);
  if (value === undefined)
    throw new Error("Context is being used outside scope !");
  return value;
}

export { useDataContext };
