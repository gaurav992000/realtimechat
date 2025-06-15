import MessageArea from "../components/messagearea";
import SideBar from "../components/SideBar";

 export function Home(){
    return(
        <div className="w-full h-[100vh] flex" >
         <SideBar></SideBar>
         <MessageArea></MessageArea>
        </div>
    )
}