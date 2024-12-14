import { useRef, useState } from "react";
import useKey from "../hooks/useKey";
import { useDataContext } from "../contexts/DataContext";
import chatWithBilly from "../model/model";

function Home() {
  const { data, setData } = useDataContext();
  // const [text, setText] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const send = useRef();

  // useEffect(() => {
  //   if (text) console.log(text);
  // }, [text]);

  // let speed = 40;
  // useEffect(() => {
  //   if (text.length > 0) {
  //     // console.log(text.length);
  //     const d = [...data];
  //     d[d.length - 1] = { bot: "" };
  //     let index = d[d.length - 1].bot.length;
  //     const interval = setInterval(() => {
  //       if (index < text.length) {
  //         d[d.length - 1].bot = d[d.length - 1].bot + text[index];
  //         setData(d);
  //         index++;
  //       } else {
  //         clearInterval(interval);
  //       }
  //     }, speed);

  //     return () => clearInterval(interval);
  //   }
  // }, [data, setData, speed, text]);

  useKey("Enter", function () {
    if (document.activeElement !== send.current) {
      handleSubmit();
    }
  });

  async function getResults() {
    setData((data) => [...data, { user: userMessage }]);

    const lastFiveItems = data.slice(-5); // Get the last 5 items from the array
    let total = "";

    for (let item of lastFiveItems) {
      if (item.bot) {
        total += "bot: ";
        total += item.bot;
        total += "\n";
      } else if (item.user) {
        total += "user: ";
        total += item.user;
        total += "\n";
      }
    }

    total += userMessage;
    console.log(total);
    setUserMessage("");
    const response = await chatWithBilly(total);
    const parsedResponse = JSON.parse(response);
    setData((data) => [...data, { bot: parsedResponse.response }]);
    // setText(parsedResponse.response);
  }

  const handleSubmit = () => {
    if (userMessage) {
      getResults();
    }
  };

  return (
    <div className="relative w-screen flex justify-center items-center flex-col bg-white-300/50">
      <div className="w-screen lg:max-w-[40vw] lg:w-[40vw] flex flex-col border-2 border-white rounded-md bg-white items-center pt-10 mb-[20vh]">
        {data.map((msg, i) => {
          return (
            <div key={i} className={`${msg.bot ? "mr-auto" : "ml-auto"}`}>
              <h1
                className={`border-2 rounded-md p-2 m-2 ${
                  msg.bot
                    ? "bg-slate-200/25 px-4"
                    : msg.user
                    ? "bg-gradient-to-r from-[#020024] via-[#4545b9] to-[#fa6c9b] text-white font-semibold py-2 px-4"
                    : ""
                }`}
              >
                {msg.bot ? msg.bot : msg.user}
              </h1>
            </div>
          );
        })}
        <div className="w-full justify-center z-[100] fixed bottom-0 flex space-x-4 items-center bg-white p-10">
          <input
            className="border-2 border-black rounded-full px-4 py-1 focus:outline-none text-lg w-[90%]"
            onChange={(e) => setUserMessage(e.target.value)}
            value={userMessage}
            placeholder="Message Billy"
          />
          <button
            ref={send}
            className="py-[9px] px-[25px] bg-green-200 rounded-full"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
