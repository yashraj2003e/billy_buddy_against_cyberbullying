import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useScreenSize from "../hooks/useScreenSize";
import {
  faHandPaper,
  faMessage,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPaperclip,
  faPlane,
  faPlaneCircleCheck,
  faRightLong,
  faTruckPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowRightArrowLeft";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons/faRightLeft";

function Community() {
  const isMobile = useScreenSize();
  return (
    <div className="p-5 flex flex-col sm:flex-row w-screen h-[95vh] space-x-0 sm:space-x-8 space-y-4 sm:space-y-0">
      {!isMobile && (
        <div className="w-full sm:w-3/4 h-full rounded-md ring-4 ring-offset-6 ring-[#b48e92] overflow-scroll">
          <div className="min-h-[1.5rem] bg-teal-200/70">
            <h1 className="p-2 text-center">Upcoming Q&A Sessions</h1>
          </div>
          <div className="">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                className="w-full min-h-16 p-4 flex items-center justify-center"
                key={i}
              >
                <div className="px-5 py-4 border-[1px] border-black w-full flex justify-between rounded-md items-center">
                  <h1>{((i + 1 + (i + 1)) % 30) + 1}/12/2024</h1>
                  <button className="bg-[#b48e92] px-[25px] py-[9px] rounded-md text-white">
                    Remind Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="w-full sm:w-1/4 h-full rounded-md ring-4 ring-offset-6 ring-[#b48e92] flex flex-col justify-between">
        <div className="min-h-[1.5rem] bg-teal-200/70 flex justify-between p-2">
          <h1 className="text-center">Chat with Anonymous Peers</h1>
          <div className="flex space-x-2 items-center justify-center">
            <div className="w-[10px] h-[10px] bg-green-500 rounded-full"></div>
            <p>0</p>
          </div>
        </div>
        <div className="bg-green-500 w-full flex items-center justify-between p-2 space-x-4">
          <input className="w-full rounded-md text-black focus:outline-none" />
          <button className="rounded-md">
            <FontAwesomeIcon icon={faRightLong} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Community;
