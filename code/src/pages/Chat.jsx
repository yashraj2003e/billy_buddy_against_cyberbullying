import { useEffect, useRef, useState } from "react";
import useKey from "../hooks/useKey";
import { useDataContext } from "../contexts/DataContext";
import chatWithBilly from "../model/model";
import { useNavigate } from "react-router-dom";

function Chat() {
  const { data, setData } = useDataContext();
  const [text, setText] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const send = useRef();
  const { userLoggedIn, id } = useDataContext();

  const [location, setLocation] = useState(() => {
    if (localStorage.getItem("location")) {
      return JSON.parse(localStorage.getItem("geoLocation"));
    } else {
      return { latitude: null, longitude: null };
    }
  });

  const [Error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoggedIn) {
      navigate(-1);
    }
  }, [navigate, userLoggedIn]);

  useEffect(() => {
    if (id != undefined) {
      fetch("http://localhost:3000/createUser", {
        method: "POST",
        data: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [id]);

  useEffect(() => {
    async function getLocationName(lat, lng) {
      const api_key = import.meta.env.VITE_POSITIONSTACK_API_KEY;
      // const response = await fetch(
      //   `https://api.positionstack.com/v1/reverse?access_key=${api_key}&query=${lat},${lng}`
      // );
      // const result = await response.json();
      const result = {
        data: [
          {
            county: "Bangalore",
          },
        ],
      };
      console.log(result);
      if (result.data[0]?.county) {
        localStorage.setItem("locationName", result.data[0].county);
        localStorage.setItem("geoLocation", JSON.stringify({ lat, lng }));
      }
    }
    const showPosition = (position) => {
      getLocationName(position.coords.latitude, position.coords.longitude);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setError(null);
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };
    if (!location.latitude) {
      getLocation();
    }
  }, [location, location.latitude]);

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unknown error occurred.");
        break;
    }
  };

  useEffect(() => {
    let speed = 20;
    if (text.length > 0) {
      const d = [...data];
      console.log(d);
      if (d.length === 1 || d.at(-1).bot === undefined) {
        d.push({ bot: "" });
      }

      let index = d[d.length - 1].bot.length;
      console.log(index, text.length);
      const interval = setInterval(() => {
        if (index < text.length) {
          d[d.length - 1].bot += text[index];
          setData(d);
          console.log(text[index]);
          index++;
        } else {
          clearInterval(interval);
          setText("");
        }
      }, speed);

      return () => clearInterval(interval);
    }
  }, [data, setData, text]);

  useKey("Enter", function () {
    if (document.activeElement !== send.current) {
      handleSubmit();
    }
  });

  async function getResults() {
    setData((data) => [...data, { user: userMessage }]);

    const lastFiveItems = data.slice(-5);
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

    setUserMessage("");
    const response = await chatWithBilly(total);
    const parsedResponse = JSON.parse(response);
    setText(parsedResponse.response);
  }

  const handleSubmit = () => {
    if (userMessage) {
      getResults();
    }
  };

  return (
    <div className="bg-[#D1C4E9] min-h-[90vh]">
      <div className="relative w-screen flex justify-center items-center flex-col bg-white-300/50 bg-[#D1C4E9]">
        <div className="w-screen lg:max-w-[40vw] lg:w-[40vw] flex flex-col  rounded-md bg-[#D1C4E9] items-center pt-10 mb-[20vh]">
          {data.map((msg, i) => {
            return (
              <div key={i} className={`${msg.bot ? "mr-auto" : "ml-auto"}`}>
                <h1
                  className={`border-2 rounded-md p-2 m-2 ${
                    msg.bot
                      ? "bg-white px-4"
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
          <div className="w-full fixed bottom-0 z-[100] flex items-center justify-center bg-[#D1C4E9] p-4 shadow-lg">
            <div className="flex items-center w-full max-w-3xl space-x-3">
              <input
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 text-lg shadow-sm"
                onChange={(e) => setUserMessage(e.target.value)}
                value={userMessage}
                placeholder="Message Billy"
              />
              <button
                ref={send}
                className="bg-green-500 text-white text-lg font-medium px-6 py-2 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
