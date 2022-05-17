import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const ProductForm = () => {
    const history = useHistory();
    
    const [formInfo, setFormInfo] = useState({
        title : "",
        price : "",
        description : ""
    })

    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();

        //pass our formInfo into our api post method
        axios.post("http://localhost:8000/api/products", formInfo)
            .then(res => {
                console.log('response after posting to api', res)
                setFormInfo({
                    title : "",
                    price : "",
                    description : ""
                })
            })
            .catch(err => {
                console.log("error: ", err)
            })
        
    }

    return(
        <div>
            
            <form onSubmit={ submitHandler }>
                <div className="form-group d-flex flex-column">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" onChange={ changeHandler } value={formInfo.title} />
                    <label  htmlFor="price">Price: </label>
                    <input min="0"  type="number" name="price" onChange={ changeHandler } value={formInfo.price} />
                    <label htmlFor="description">Description: </label>
                    <textarea name="description" cols="30" rows="3" onChange={ changeHandler } value={formInfo.description}></textarea>
                    <input className='btn btn-primary my-3' type="submit" value="Add Product"  />
                </div>
            </form>
            <hr />
        </div>
    )
}

export default ProductForm
