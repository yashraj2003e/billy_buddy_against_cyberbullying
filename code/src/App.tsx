import { getBase64 } from "./utils/utils";

export default function App() {
  const key = import.meta.env.VITE_VIRUS_TOTAL_KEY;
  return (
    <h1>
      {key}
      {getBase64("https://www.leetcode.com")}{" "}
      {" aHR0cHM6Ly93d3cubGVldGNvZGUuY29t"}
    </h1>
  );
}
