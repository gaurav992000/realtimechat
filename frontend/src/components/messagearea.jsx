import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setselecteduser } from "../redux/userSlice";
function MessageArea() {
    let {selecteduser}=useSelector(state=>state.user)
    let dispatch =useDispatch()
  return (
    <div className={`lg:w-[70%] ${selecteduser?"flex":"hidden"}  lg:flex w-full h-full bg-slate-200 border-1-2 border-gray-300`}>
     
     {selecteduser &&  <div className="w-full h-[100px] bg-[#20c7ff] rounded-b-[30px] shadow-lg flex items-center  px-[20px] gap-2">
        <div className=" cursor-pointer" onClick={()=>dispatch(setselecteduser(null))}>
          <FaArrowLeftLong className="w-[30px] h-[30px] text-white" />
        </div>
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white shadow-gray-500 shadow-lg  cursor-pointer">
            <img src={selecteduser?.image || ""} className="h-[100%]" />
          </div>
<h1 className="text-white font-semibold text-[20px]">{selecteduser?.name|| "user"}</h1>

      </div>}

      {!selecteduser && <div className="w-full h-full flex flex-col items-center justify-center">
        <h1  className="text-gray-700 font-bold text-[50px]">welcome to chatly</h1>
        <span className="text-gray-700 font-semibold text-[30px]"> chat friendly!</span>

        </div>}
     
    </div>
  );
}

export default MessageArea;
