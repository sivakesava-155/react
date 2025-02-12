import { configureStore, createSlice } from "@reduxjs/toolkit";
import { act } from "react";


     let productslice=createSlice({
        name:"Products",
     initialState:{
      Veg:[{name:"Potato",price:100},
        {name:"Carrot",price:200},
        {name:"Onoion",price:100},
        {name:"Beetroot",price:200},
        {name:"Tomato",price:200},
        {name:"Cabbage",price:300}],
        NonVeg:
        [{name:"Mutton",price:100},
         {name:"Fish",price:200},
         {name:"Eggs",price:100},
         {name:"Chicken",price:200},
         {name:"Prawns",price:200},
         {name:"c",price:200}],
         Milk:
         [{name:"Nandini",price:100},
          {name:"Dodla",price:200},
          {name:"Sangham",price:100},
          {name:"Heritage",price:200},
          {name:"Arokya",price:200},
          {name:"milk",price:200}
        ],
         

     },
     reducers:{}
}
)
 const cartSlice=createSlice(
   {
      name:"Cart",
      initialState:[],
      reducers: {
   
         addToCart: (state, action) => {
           const item = state.find(item => item.name === action.payload.name);
           if (item) {
             item.quantity += 1;
           } else {
             state.push({ ...action.payload, quantity: 1 });
           }
         },
    
         increment: (state, action) => {
           const item = state.find(item => item.name === action.payload.name);
           if (item) {
             item.quantity += 1;
           }
         },

          decrement: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item&&item.quantity>1)
                {
              item.quantity -= 1;
            }
            else{
              return state.filter(item => item.name !== action.payload.name);
            }
          },
          remove: (state, action) => {
           return state.filter(item => item.name !== action.payload.name);
            
          },
          clearCart: () => []
        
        }
     });
      let purchaseslice= createSlice(
      {
        name:"PurchaseDetails",
        initialState:[],
        reducers:{
        purchasedetails:(state,action)=>
        {
          state.push(action.payload);
        }
       
        }
        
      }
    
     );
     let authslice = createSlice({
      name: "auth",
      initialState: {
        isAuthenticated: localStorage.getItem("username") ? true : false,
        user: localStorage.getItem("username") || "",
      },
      reducers: {
        login: (state, action) => {
          state.isAuthenticated = true;
          state.user= action.payload;
          localStorage.setItem("username", action.payload);
        },
        logout: (state) => {
          state.isAuthenticated = false;
          state.user= ""; 
          localStorage.removeItem("username");
        },
      },
    });
    

     

 const store=configureStore(
   {
    
    reducer:{Products:productslice.reducer,
            Cart:cartSlice.reducer,
            PurchaseDetails:purchaseslice.reducer,
            auth:authslice.reducer},

    }
)

export default store;
export const{addToCart,increment,decrement,remove,clearCart}=cartSlice.actions;
export const{purchasedetails}=purchaseslice.actions;
export const{login,logout}=authslice.actions;
