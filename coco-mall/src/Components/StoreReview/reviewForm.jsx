import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import {useParams} from 'react-router-dom'


const ReviewForm = () => {
    const { id } = useParams()
    const [allStoreReviews, setAllStoreReviews] = useState([])

    const [review, setReview] = useState({
        description: "",
        qualification: "1"
    })

    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert("funciona")
    }

    useEffect(() => {
        axios.get(`http:localhost:3001/review/${id}`).then(response => setAllStoreReviews([...allStoreReviews, ...response.data]))

    }, [])

    return (
        <>
            <div className="container">
                <form key="1" onSubmit={handleSubmit}>
                    {review.qualification==="1" ? <span>🥥</span> : review.qualification === "2" ? <span>🥥 🥥</span> : review.qualification === "3" ? <span>🥥 🥥 🥥</span> : review.qualification === "4" ? <span>🥥 🥥 🥥 🥥</span> : review.qualification === "5" ? <span>🥥 🥥 🥥 🥥 🥥</span> : false} 
                    <p></p>
                    <input type="range" id="qualification" name="qualification" value={review.qualification} min="1" max="5" step="1" onChange={handleChange}/> 
                    <p></p>
                    <textarea name="description" rows="3" cols="20" onChange={handleChange} >Describe your experience (optional)</textarea>
                    <button className="create-button" type="submit" disabled={!review.qualification ? true : false} onSubmit={handleSubmit} id="buttonC">POST</button>
                </form>
            </div>
        </>
    );
};

export default ReviewForm;