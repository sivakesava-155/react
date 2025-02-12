import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Aboutus from "./Aboutus";
import Contactus from "./Contactus";
import Orders from "./Orders";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Milk from "./Milk";
import Cart from "./Cart";
import NotFound from "./NotFound";
import Login from "./Login";
import { logout } from "./store";

import "./navbar.css"

function App()
{
    const cart=useSelector(state=>state.Cart);
    const totalItems=cart.reduce((sum,item)=>sum+item.quantity,0)
    let { isAuthenticated, user } = useSelector((state) => state.auth);
      let dispatch=useDispatch()
   return(
    <>
    
    <BrowserRouter>
    <nav className="navbar">
    
    <Link to='/home' className="myclass">Home</Link>
    <Link to='/veg'className="myclass">Vegitems</Link>
    <Link to='/nonveg'className="myclass">Nonvegitems</Link>
    <Link to='/milk'className="myclass">Milkitems</Link>
    <Link to='/aboutus' className="myclass">Aboutus</Link>
    <Link to='/contactus'className="myclass">Contactus</Link>
    <Link to='/cart'className="myclass">Cart <span>{totalItems}</span></Link>
    <Link to='/orders'className="myclass">Orders</Link>
    {
    isAuthenticated?
    <>welcome  
    <button onClick={()=>dispatch(logout())}>Logout</button>
    
    </>
    :
    <>
      <Link to='/login'className="myclass">Signin</Link>
    </>
    }
    </nav>
    <div className="">
     <Routes>
     <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/veg" element={<Veg/>}/>
      <Route path="/nonveg" element={<Nonveg/>}/>
      <Route path="/milk" element={<Milk/>}/>
      <Route path="/aboutus" element={<Aboutus/>}/>
      <Route path="/contactus" element={<Contactus/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/*" element={<NotFound/>}/>
    
     </Routes>
     </div>
    </BrowserRouter>

    </>


   )

}
export default App;