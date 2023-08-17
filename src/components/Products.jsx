
import React, {useEffect, useState, useReducer} from 'react';
import axios from 'axios';
import { productReducer } from '../reducer/productReducer';
import Cart from './Cart';

const API = process.env.REACT_APP_API

function Products() {
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [priceSorting, setPriceSorting] = useState("")
    const [totalPage, setTotalPage] = useState(0)
    let initialState = {
        products:[],
        cart:[]
    }
    const [state, dispatch] = useReducer(productReducer, initialState)

    const getData = async () =>{
        let url = `${API}/products?_page=${page}&_limit=8`
        if(priceSorting==="lth"){
            url += `&_sort=price&_order=asc`
        }else{
            url += `&_sort=price&_order=desc`
        }
        
        setLoading(true)
       const {data} =  await axios.get(url)
       const length = data.length;
       setTotalPage(length/8)

       dispatch({type:"product", payload: data})
       setLoading(false)
    }

    useEffect(() =>{
        getData(page)
    }, [page, priceSorting])

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
        <div style={{margin:"20px 0"}}>
            <select onChange={(e)=>setPriceSorting(e.target.value)} name="price" id="price">
                <option value="dfd">Sort by Price</option>
                <option value="htl">High to Low</option>
                <option value="lth">Low to High</option>
            </select>
        <div style={{display:"flex"}}>
            {
                !loading ? (
                     <div style={{display:"flex", flexWrap:"wrap", width:"80%", gap:"10px", justifyContent:"center"}}>
            {
                state.products.map(p => {
                    return <div style={{boxShadow:"10px 12px 10px black", width:"250px", textAlign:"center"}} key={p.id}>
                        <div>
                            <img style={{width:"200px", height:"250"}} src={p.thumbnail} alt={p.title} />
                            <h3>{p.title}</h3>
                        </div>
                        <div>
                            <p>{p.price}</p>
                            <p>{p.rating}</p>
                            <p>{p.category}</p>
                        </div>
                        <button onClick={()=>addToCart(p)}>Add to cart</button>
                    </div>
                })
            }
            <div style={{display:"flex", justifyContent:"center", gap:"20px", alignItems:"center"}}>
                <button disabled={page===1} onClick={()=>setPage(page-1)} style={{padding:"10px 20px"}}>prev</button>
                {page}
                <button disabled={totalPage<1} onClick={()=>setPage(page+1)} style={{padding:"10px 20px"}}>next</button>
            </div>
        </div>
                ) : <div>Loading......</div>
            }
       
         
        <div style={{width:"30%"}}>
            <Cart state={state} dispatch={dispatch}/>
        </div>
        </div>
        </div>
    );
}

export default Products;