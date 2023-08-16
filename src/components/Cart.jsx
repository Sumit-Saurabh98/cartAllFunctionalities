
import { useEffect, useState } from "react";
import React from 'react';

function Cart({state, dispatch}) {

    const [TotalPrice, setTotalPrice] = useState()

    const changeQuantity =(id, quantity)=>{
        dispatch({
            type:"quantityChange",
            payload:{
                id: id,
                quantity: quantity
            }
        })
    }

    useEffect(()=>{
       setTotalPrice(state.cart.reduce((acc, curr)=>acc+(curr.price)*(curr.quantity),0))



    }, [state.cart])

    return (
        <div style={{border:"1px solid red"}}>
            <h1>Total:- {Number(TotalPrice).toFixed(2)}</h1>
            {
                state.cart.map((p)=>{
                    return <div style={{display:"flex", justifyContent:"start", alignItems:"center"}} key={p.id}>
                    <div style={{width:"50%"}}>
                        <img style={{width:"100px"}} src={p.image} alt={p.title} />
                        <p>{p.title}</p>
                        <p>{p.price}</p>
                    </div>
                    <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}}>
                        <button onClick={()=>changeQuantity(p.id, p.quantity+1)}>+</button>
                        <p>{p.quantity}</p>
                        <button disabled={p.quantity===1} onClick={()=>changeQuantity(p.id, p.quantity-1)}>-</button>
                        <button onClick={()=>dispatch({type:"remove", payload:p.id})}>Remove</button>
                    </div>
                    </div>
                })
            }
        </div>
    );
}

export default Cart;