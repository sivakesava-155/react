import { useSelector } from "react-redux";

function Orders()
{
    let purchaseHistory=useSelector(state=>state.PurchaseDetails) ;
    let purchaseItems=  purchaseHistory.map((purchase,index)=>(
        <li key={index}>
         <h1> Date:{purchase.date}</h1> 
          <h2>TotalAmount: {purchase.total}</h2>
          {purchase.items.map((items,itemindex)=>(
            <li key={itemindex}>
         name:{items.name} -price:{items.price}  quantiy:{items.quantity}
            
            
            </li>
            
          )
         )
          }

        </li>
        
        
       ));
      
       
    return(
       <>
       {purchaseHistory.length===0?
    <h1>no puchase history</h1>
        :
        <div>
        <ul>{purchaseItems}</ul>
        </div>
       }
       </>
    )
}
export default Orders;