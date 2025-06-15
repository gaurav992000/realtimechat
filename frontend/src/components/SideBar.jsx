import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { serverurl } from "../main";
import { setselecteduser, setUserData } from "../redux/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function SideBar() {
  let { userData, otherusers,selecteduser } = useSelector((state) => state.user);
  let [search, setsearch] = useState(false);
  let dispatch=useDispatch()
const navigate = useNavigate();
  const handellogout=async()=>{
    try {
        let result=await axios.get(`${serverurl}/api/auth/logout`,{withCredentials:true})
        dispatch(setUserData(null))
        dispatch(otherusers(null))
        navigate("/login")
    } catch (error) {
        console.log(error);
        
        
    }
  }
  return (
    <div className={`lg:w-[30%] w-full h-full bg-slate-200 lg:block ${!selecteduser?"block":"hidden"}`}>
 <div
              className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg mt-[10px] cursor-pointer fixed bottom-[20px] left-[20px]"
              
            onClick={handellogout}>
                <HiOutlineLogout />
             
            </div>

      <div className="w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-lg flex flex-col  justify-center px-[20px]">
        <h1 className="text-white font-bold text-[25px]">chatly</h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-800 font-bold text-[25px]">
            hii,{userData.name}
          </h1>
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white shadow-gray-500 shadow-lg  cursor-pointer" onClick={()=>navigate("/profile")}>
            <img src={userData.image} className="h-[100%]" />
          </div>
        </div>
        <div className="w-full flex items-center gap-[20px]">
          {!search && (
            <div
              className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg mt-[10px] cursor-pointer"
              onClick={() => setsearch(true)}
            >
              <CiSearch className="w-[25px] h-[25px]" />
            </div>
          )}
          {search && (
            <form className="w-full h-[60px] bg-white shadow-gray-500 flex itmes-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px]">
              <CiSearch className="w-[25px] h-[25px]" />
              <input
                type="text"
                placeholder="search user ...."
                className="w-full h-full p-[10px] outline-0 border-0 text-[17px]"
              />
              <MdCancel
                className="w-[25px] h-[25px]cursor-pointer"
                onClick={() => setsearch(false)}
              />
            </form>
          )}

          {!search && otherusers?.map((user) => (
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white shadow-gray-500 shadow-lg ">
              <img src={user.image} className="h-[100%]" />
            </div>
          ))}
        </div>
      </div>

<div className="flex flex-col gap-[20px] overflow-auto items-center mt-[20px]">
  {otherusers?.map((user) => (
    <div className="w-[95%] h-[60px] bg-white shadow-lg rounded-full flex justify-start items-center gap-[20px] hover:bg-[#b2ccdf]   cursor-pointer" onClick={()=>dispatch(setselecteduser(user))}>
  
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center bg-white shadow-gray-500 shadow-lg ">
              <img src={user.image} className="h-[100%]" />
              
            </div>
            <h1>{user.name || user.userName}</h1>
            </div>
          ))}
</div>



    </div>
  );
}

export default SideBar;
