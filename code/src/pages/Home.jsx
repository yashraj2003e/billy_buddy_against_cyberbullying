import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([
    { name: "Hello 🙂 How Are you" },
    { name: "Looking for my package" },
    { name: "Let's take care of your package" },
    { name: "Im good" },
    { name: "" },
    { name: "Im good" },
    { name: "Hello How Are you" },
    { name: "Im good" },
    { name: "Hello How Are you" },
    { name: "Im good" },
    { name: "Hello 🙂 How Are you" },
    { name: "Looking for my package" },
    { name: "Let's take care of your package" },
    { name: "Im good" },
    { name: "Hello how are you" },
    { name: "Im good" },
    { name: "Hello How Are you" },
    { name: "Im good" },
    { name: "Hello How Are you" },
    { name: "Im good" },
  ]);
  const text =
    "To create a typewriter animation in a React.js project with Tailwind CSS, you can combine Tailwind classes with a small JavaScript function to render text one character at a time. Here's how to do it:";
  let speed = 40;
  useEffect(() => {
    const d = [...data];
    console.log(d);
    let index = d[4].name.length;
    const interval = setInterval(() => {
      if (index < text.length) {
        d[4].name = d[4].name + text[index];
        setData(d);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [data, speed]);

  return (
    <div className="relative w-screen flex justify-center items-center flex-col bg-white-300/50">
      <div className="w-screen lg:max-w-[40vw] lg:w-[40vw] flex flex-col border-2 border-white rounded-md bg-white items-center pt-10">
        {data.map((msg, i) => {
          console.log(msg.name);
          return (
            <div key={i} className={`${i % 2 == 0 ? "mr-auto" : "ml-auto"}`}>
              <h1
                className={`border-2 rounded-md p-2 m-2 ${
                  i % 2 == 0
                    ? "bg-slate-200/25 px-4"
                    : "bg-gradient-to-r from-[#020024] via-[#4545b9] to-[#fa6c9b] text-white font-semibold py-2 px-4"
                }`}
              >
                {msg.name}
              </h1>
            </div>
          );
        })}
        <div className="w-full justify-center z-[100] fixed bottom-0 flex space-x-4 items-center bg-white p-10">
          <input className="border-2 border-black rounded-full p-2 text-lg w-[90%]" />
          <button className="py-[9px] px-[25px] bg-green-200 rounded-full">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
