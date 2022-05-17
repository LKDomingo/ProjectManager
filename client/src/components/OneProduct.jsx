import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios'


const OneProduct = () => {
    const history = useHistory();
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        let isMounted = true;
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                if(isMounted) {
                setProduct(res.data.results[0]);
                }
            })
            .catch(err => {
                console.log("error: ", err)
            })
            return () => isMounted = false;

    }, [id])

    //DELETE PRODUCT
    const deleteProduct = () => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(deletedProduct=>{
                console.log('Deleted Product: ', deletedProduct);
                history.push('/');
            })
            .catch(err=>{
                console.log("Error: ", err);
            })
    }


    return (
        <div>
            <div className='d-flex justify-content-end'>
                <button onClick={() => history.push(`/product/${id}/edit`)} className="btn btn-primary mx-1">Edit</button>
                <button onClick={() => history.push('/')} className="btn btn-primary">Home</button>
            </div>
            <div className="text-center">
                <h1>{product.title}</h1>
                <p>Item Price: ${product.price}</p>
                <p>Item Description: {product.description}</p>
                <button onClick={ deleteProduct  } className="btn btn-danger">Delete</button>
            </div>
        </div>


    )
}

export default OneProduct;