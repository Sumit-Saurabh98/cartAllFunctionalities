
import React, {useEffect, useReducer} from 'react';
import axios from 'axios';
import { productReducer } from '../reducer/productReducer';
import Cart from './Cart';

const API = process.env.REACT_APP_API

function Products(props) {
    let initialState = {
        products:[],
        cart:[]
    }
    const [state, dispatch] = useReducer(productReducer, initialState)

    const getData = async () =>{
       const {data} =  await axios.get(`${API}/products`)

       dispatch({type:"product", payload: data})
    }

    useEffect(() =>{
        getData()
    }, [])

    const addToCart = async (p) =>{
        const allReadyPresent = state.cart.some((item) => p.id === item.id)

        console.log(allReadyPresent)

        if(allReadyPresent){
            alert("Already added to cart")
        }else{
            dispatch({type:"cart", payload:p})
        }
        
    }
    return (
        <div style={{display:"flex"}}>
        <div style={{display:"flex", flexWrap:"wrap", width:"80%", gap:"10px"}}>
            {
                state.products.map(p => {
                    return <div style={{boxShadow:"10px 12px 10px black", width:"250px", textAlign:"center"}} key={p.id}>
                        <div>
                            <img style={{width:"200px", height:"250"}} src={p.image} alt={p.title} />
                            <h3>{p.title}</h3>
                        </div>
                        <div>
                            <p>{p.price}</p>
                            <p>{p.category}</p>
                        </div>
                        <button onClick={()=>addToCart(p)}>Add to cart</button>
                    </div>
                })
            }
        </div>
        <div style={{width:"30%"}}>
            <Cart state={state} dispatch={dispatch}/>
        </div>
        </div>
    );
}

export default Products;