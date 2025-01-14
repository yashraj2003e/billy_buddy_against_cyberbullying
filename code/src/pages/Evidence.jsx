import { useState } from "react";
import UploadWidget from "../widgets/uploadwidget";

function Evidence() {
  const [images, setImages] = useState([]);
  return (
    <div>
      <div className="flex justify-center text-2xl h-[90vh]">
        <h1 className="mt-[15%]">You can submit evidence here !</h1>
        <div className="w-full justify-center z-[100] fixed bottom-0 flex space-x-4 items-center bg-white p-10">
          <input
            className="border-2 border-black rounded-full px-4 py-1 focus:outline-none text-lg w-[50%]"
            placeholder="Post link"
          />
          <UploadWidget
            uwConfig={{
              cloudName: "dm87sudhx",
              uploadPreset: "estate",
              multiple: true,
              folder: "avatars",
            }}
            setState={setImages}
          />
          <button className="py-[9px] px-[25px] bg-green-200 rounded-full">
            Submit Evidence
          </button>
        </div>
      </div>
    </div>
  );
}

export default Evidence;
