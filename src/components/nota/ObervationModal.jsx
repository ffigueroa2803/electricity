import { useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

const ObervationModal = ({ open, setOpened, observation, setObservation }) => {
  return (
    open && (
      <>
        <div className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer" />
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/3 left-1/2 z-20 -translate-x-1/2 -translate-y-1/3">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <div className="flex justify-between items-center">
                <label className="font-medium text-lg">Observación</label>
                <button
                  type="button"
                  onClick={() => setOpened((prevState) => !prevState)}
                  style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
                  className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <MdOutlineCancel />
                </button>
              </div>
              <textarea
                id="observation"
                className="w-full border-2 border-gray-100 rounded-md py-2 px-4 mt-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                name="description"
                cols="20"
                rows="15"
                value={observation || ""}
                onChange={(e) => setObservation(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ObervationModal;
