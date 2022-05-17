import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';

const EditProduct = () => {
    const history = useHistory();
    const { id } = useParams();
    const [formInfo, setFormInfo] = useState({
        title: "",
        price: "",
        description: ""
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res.data.results[0]);
                setFormInfo({
                    title: res.data.results[0].title,
                    price: res.data.results[0].price,
                    description: res.data.results[0].description
                })
            })
            .catch(err => {
                console.log('error: ', err);
            })
    }, [])


    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name] : e.target.value
        })
    }


    const updateProduct = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:8000/api/products/${id}`, formInfo)
            .then(updatedProduct=>{
                console.log('Updated Product: ', updatedProduct);
                history.push(`/product/${id}/display`)
            })
            .catch(err=>{
                console.log('error: ', err);
            })
    }

    return (
        <>
            <h1 className='text-center'>Edit product</h1>
            <form onSubmit={ updateProduct }>
                <div className="form-group d-flex flex-column">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" onChange={changeHandler} value={formInfo.title} />
                    <label htmlFor="price">Price: </label>
                    <input min="0" type="number" name="price" onChange={changeHandler} value={formInfo.price} />
                    <label htmlFor="description">Description: </label>
                    <textarea name="description" cols="30" rows="3" onChange={changeHandler} value={formInfo.description}></textarea>
                    <input className='btn btn-primary my-3' type="submit" value="Update" />
                </div>
            </form>
        </>
    )
}

export default EditProduct;