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
    <div className="flex justify-center items-center h-[90vh] text-xl">
      <div className="border-2 rounded-lg border-gray-150 p-12 space-y-8">
        <h1 className="text-center text-2xl">You can submit evidence here!</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Post link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border-2 border-black rounded-full px-4 py-1 focus:outline-none text-lg w-full"
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
            onClick={handleClick}
            className="py-2 px-4 bg-green-200 rounded-full hover:bg-green-300"
          >
            Submit Evidence
          </button>
        </div>
      </div>
    </div>
  );
}

export default Evidence;
