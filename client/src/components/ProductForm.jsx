import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    
    const [formInfo, setFormInfo] = useState({
        title : "",
        price : "",
        description : ""
    })

    //error object
    const [errors, setErrors] = useState({});

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
                //save the errors into our error state variable
                if(res.data.error){
                    setErrors(res.data.error.errors);
                } else {
                setFormInfo({
                    title : "",
                    price : "",
                    description : ""
                })
            }
                })
            .catch(err => {
                console.log("formInfo error: ", err)
            })
        
    }

    return(
        <div>
            
            <form onSubmit={ submitHandler }>
                <div className="form-group d-flex flex-column">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" onChange={ changeHandler } value={formInfo.title} />
                    <p className="text-danger">{errors.title?.message}</p>
                    <label  htmlFor="price">Price: </label>
                    <input min="0"  type="number" name="price" onChange={ changeHandler } value={formInfo.price} />
                    <p className="text-danger">{errors.price?.message}</p>
                    <label htmlFor="description">Description: </label>
                    <textarea name="description" cols="30" rows="3" onChange={ changeHandler } value={formInfo.description}></textarea>
                    <p className="text-danger">{errors.description?.message}</p>
                    <input className='btn btn-primary my-3' type="submit" value="Add Product"  />
                </div>
            </form>
            <hr />
        </div>
    )
}

export default ProductForm
