import React, { useEffect, useState } from 'react'
// import jwt from 'jsonwebtoken'
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')

    async function populateQuote() {
        const req = await fetch('http://127.0.0.1:1999/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }, 
        })

        const data = await req.json();

        if(data.status === 'OK') {
            setQuote(data.quote)
            //  alert(data.status)
        }

        else {
            alert(data.error)
        }

        console.log(data)

    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            // const user = jwt.decode(token)

            if(!token) {
                localStorage.removeItem('token')
                navigate.replace('/login')
            }

            else {
                populateQuote();
            }
        }
    }, [])

    async function updateQuote(e) {
        e.preventDefault();
        const req = await fetch('http://127.0.0.1:1999/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            }, 

            body: JSON.stringify({
                quote: tempQuote,
            })
        })

        const data = await req.json();

        if(data.status === 'OK') {
            setQuote(tempQuote)
            setTempQuote('')
        }

        else {
            alert(data.error)
        }
    }

  return (
        <div>
            <h1 style={{textAlign:'center'}}>Welcome to Dashboard <br /> 
                Your quote : {quote || 'No Quote Found'}
            </h1>

            <form onSubmit={updateQuote}>
                <input 
                    type='text'
                    placeholder='quote'
                    value={tempQuote}
                    onChange ={(e) => setTempQuote(e.target.value)}
                />
                <input type='submit' value="updateQuote" />
            </form>
        </div>

  ) 
        
}

export default Dashboard
