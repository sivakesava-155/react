import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function NotFound()
{

   let navigate=useNavigate();
   useEffect(()=>
   {
    setTimeout(()=>{
      navigate("/home")
    },3000),
    []}

    )
   

   
    return(
        <>
      <h1><img src="NotFound.png" /></h1>
        </>
    )
}
export default NotFound


