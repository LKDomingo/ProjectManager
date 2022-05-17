import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AllProducts = () => {
    const history = useHistory();
    const [productList, setProductList] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then(res => {
                setProductList(res.data.results);
            })
            .catch(err => {
                console.log("error: ", err);
            })
    }, [productList]);

    const displayOneProduct = (id) => {
        console.log('entering displayOneProduct');
        history.push(`/product/${id}/display`);
    }

    //DELETE PRODUCT
    const deleteProduct = (id) => {
        console.log('---deleting product---')
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(deletedProduct=>{
                console.log('Deleted Product: ', deletedProduct);
                //Delete item from the list
                let filteredCopy = productList.filter((productObj, idx) => {
                    return idx != id;
                })
                // set Product List to the filtered Copy
                setProductList(filteredCopy);
            })
            .catch(err=>{
                console.log("Error: ", err);
            })
    }


    return (
        <div>
            
            <div className="d-flex justify-content-center flex-wrap">
                {
                    productList.map((product, idx) => {
                        return (
                            <div key={product._id}>
                                <div onClick={() => displayOneProduct(product._id) } className="card btn mt-2 mx-2 hover-shadow" style={{ width: '18rem', backgroundColor: '#EAEAEA', boxShadow: "1px 2px 3px #9E9E9E" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Price: ${product.price}</h6>
                                        <p className="card-text">{product.description}</p>
                                            {/* <a href="#" className="card-link">Another link</a> */}
                                    </div>
                                </div>
                                        <button className='btn btn-sm btn-danger m-2' onClick={()=>deleteProduct(product._id) }>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllProducts