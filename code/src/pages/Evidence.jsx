import { useEffect, useState } from "react";
import UploadWidget from "../widgets/uploadwidget";
import { useDataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

function Evidence() {
  const { id } = useDataContext();
  const { userLoggedIn } = useDataContext();
  const [link, setLink] = useState("");
  const [images, setImages] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/auth");
    }
  }, [userLoggedIn, navigate]);

  const handleClick = async () => {
    if (link || images) {
      const location = localStorage.getItem("locationName") || "";
      const { lat, lng } = JSON.parse(localStorage.getItem("geoLocation")) || {
        lat: null,
        lng: null,
      };

      const data = {
        userId: id,
        location,
        lat,
        lng,
        link,
        image: images,
      };

      await fetch("http://localhost:3000/addEvidence", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center text-2xl h-[90vh]">
        <h1 className="mt-[15%]">You can submit evidence here !</h1>
        <div className="w-full justify-center z-[100] fixed bottom-0 flex space-x-4 items-center bg-white p-10">
          <input
            className="border-2 border-black rounded-full px-4 py-1 focus:outline-none text-lg w-[50%]"
            placeholder="Post link"
            onChange={(e) => setLink(e.target.value)}
          />
          <UploadWidget
            uwConfig={{
              cloudName: import.meta.env.VITE_CLOUD_NAME,
              uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
              multiple: false,
              folder: import.meta.env.VITE_FOLDER_NAME,
            }}
            setState={setImages}
          />
          <button
            className="py-[9px] px-[25px] bg-green-200 rounded-full"
            onClick={handleClick}
          >
            Submit Evidence
          </button>
        </div>
      </div>
    </div>
  );
}

export default Evidence;
