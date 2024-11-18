import { getBase64 } from "./utils/utils";

export default function App() {
  return (
    <h1>
      {getBase64("https://www.leetcode.com")}{" "}
      {" aHR0cHM6Ly93d3cubGVldGNvZGUuY29t"}
    </h1>
  );
}
