import { useSelector } from "react-redux";
import MessageArea from "../components/messagearea";
import SideBar from "../components/SideBar";
import getMessages from "../customehooks/getMessages";

 export function Home(){
    let {selecteduser}=useSelector(state=>state.user)
    getMessages()
    return(
        <div className="w-full h-[100vh] flex overflow-hidden" >
         <SideBar></SideBar>
         <MessageArea></MessageArea>
        </div>
    )
}