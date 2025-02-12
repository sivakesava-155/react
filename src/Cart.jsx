import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrement, increment,  purchasedetails,  remove } from "./store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart()
{
      let cartObjects=useSelector(state=>state.Cart)
       let { isAuthenticated } = useSelector((state) => state.auth);
               let navigate =useNavigate()
     let dispath=useDispatch();
     
       let cartItems=cartObjects.map((item,index) =>(
      <li key={index}>
    {item.name}  {item.price} 
   <button onClick={()=>dispath(increment(item))}>+</button>
   <button onClick={()=>dispath(decrement(item))}>-</button>
      {item.quantity}
        <button onClick={()=>dispath(remove(item))}>Remove</button>
    </li>
   ));
 let totalPrice=cartObjects.reduce((sum,item)=>
 sum+item.quantity*item.price,0 );

const [discountPercentage,setDiscountPercentage]=useState(0);
const [showDiscountPrice,setShowDiscountPrice]=useState(false)
 let discountAmount=totalPrice*discountPercentage/100;
 let finalAmount=totalPrice-discountAmount;

 let [cuponcode,setCuponcode]=useState('');
 let [cuponcodeDiscountPer,setCuponcodeDiscountPer]=useState(0);
 const [showCupondiscont,setShowCupondiscont]=useState(false)

 let handlingcuponcodeper=()=>{
    switch(cuponcode.toUpperCase())
    {
    case'RATAN10':setCuponcodeDiscountPer(10);
    break;
    case'RATAN20':setCuponcodeDiscountPer(20);
    break;
    case'RATAN30':setCuponcodeDiscountPer(30);
    break;
    default:
     alert("invalid cupon code");
     setCuponcodeDiscountPer(0);
    }
 }

 let cuponDiscountAmount=totalPrice*cuponcodeDiscountPer/100;
  
  
 const handlePurchaseDetails = () => {
    isAuthenticated
      ? (() => {
          const purchaseDate = new Date().toLocaleDateString();
          let purchaseDetails = {
            items: [...cartObjects],
            total: totalPrice,
            date: purchaseDate,
          }
  
          dispath(purchasedetails(purchaseDetails)) ;
            dispath(clearCart())
        })()
      : 
      (() => {
        alert("Please login to proceed with the purchase.");
        navigate("/login");
      })();
  };
  


   

    return(
        <>
        {
       cartObjects.length>0?
            <div> 
        <h2> This is Cart items</h2>
        <ul>{cartItems}</ul>
        <p style={{color:'green',fontFamily:'cursive'  }}>your price value is :${totalPrice}</p>
        {
            showDiscountPrice&&
            <div>
        <p style={{color:'orange',fontFamily:'revert-layer'}}>your products discount Applied:{discountPercentage}%</p>
        <p style={{color:'brown',fontFamily:'revert'  }}>your discount Amount is:${discountAmount }</p>
        </div>
         }
        <p>your net Amount to pay :${finalAmount}</p>
        <button style={{backgroundColor:'green' }} onClick={()=>{setDiscountPercentage(10),setShowDiscountPrice(true)}}>Add 10% discount</button>
        <button style={{backgroundColor:'yellow' }}onClick={()=>{setDiscountPercentage(20),setShowDiscountPrice(true)}}>Add 20% discount</button>
        <button style={{backgroundColor:'orange'  }}onClick={()=>{setDiscountPercentage(30),setShowDiscountPrice(true)}}>Add 30% discount</button>
        <p><input 
          type="text"  
          value={cuponcode} 
          onChange={(e)=>setCuponcode(e.target.value)} 
          placeholder="Enter your cupon code"/>
        <button onClick={()=>{handlingcuponcodeper() ,setShowCupondiscont(true)}}>Apply cupon code</button>
        </p>
        {
        showCupondiscont&&
        <div>
        <p>your cupon discount:{cuponcodeDiscountPer}%</p>
        <p>your coupn Applied:{cuponDiscountAmount}</p>
        </div>
         }
         <button onClick={()=>handlePurchaseDetails()}>complete purchaise</button>
        </div>:
        <h2 style={{color:'green',fontFamily:'cursive'  }}> your Cart is empty</h2>
                  
}
        </>

    )
}

export default Cart;