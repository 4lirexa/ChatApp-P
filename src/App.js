import React, { useState,useEffect } from 'react'
import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed'
import './App.css';
import LoginForm from './components/LoginForm';
import { NewMessageForm
} from 'react-chat-engine'
import axios from 'axios';

export default function Home() {

  const [country,setCountry] = useState('');
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);

  useEffect(()=>{
    axios.get('https://ipwho.is/').then(function (response) {
        setCountry(response?.data?.country_code);
    }).catch(function (error) {
        console.error(error);
        setError(true)
    }).finally(()=>setLoading(false));
  },[])

  if(loading){
    return <h2>Loading...</h2>
  }
  if(error){
    return <h2>somthing went wrong... !</h2>
  }
  if(!loading && !error && country === 'IR'){
    return <>
    <h2>Error: Forbidden</h2>
    <br/>
    <h3>Your IP is not allowed to access this site.</h3>
    </>
  }

  
  if(!localStorage.getItem('username') && !localStorage.getItem('username')) return <LoginForm />

  return (
    <>
      <ChatEngine height="100vh" projectID="PROJECT-ID" userName={localStorage.getItem('username')} userSecret={localStorage.getItem('password')} renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}  renderNewMessageForm={(creds, chatID) => <NewMessageForm />} />
    </>
  )
}
