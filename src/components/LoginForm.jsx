import axios from "axios";
import { useState } from "react";

function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const authObject = {'Project-ID': "dbb7b000-c456-46bd-9561-6bd6fe75d2d8", 'User-Name' : username, 'User-Secret' : password};

        try {
            await axios.get('https://api.chatengine.io/chats',{ headers : authObject });

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();

        } catch (error) {
            setError('Oops, incorect credentials.')
        }

    }

    const HandleDemo_1 = ()=>{
        localStorage.setItem('username', 'Demo');
        localStorage.setItem('password', '123');
        window.location.reload();
    }
    const HandleDemo_2 = ()=>{
        localStorage.setItem('username', 'Demo_2');
        localStorage.setItem('password', '123');
        window.location.reload();
    }

    return ( 
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="input" placeholder="Username" required/>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="input" placeholder="Password" required/>
                    <div align="center" >
                        <button type="submit" className="button" >
                            <span>Start Chatting</span>
                        </button>
                        
                    </div>
                    <h2 className="error" >{error}</h2>
                </form>
                <div className="login_demo">
                    <button onClick={HandleDemo_1} >
                        Login As User 1
                    </button>
                    <button onClick={HandleDemo_2}>
                        Login As User 2
                    </button>
                </div>
            </div>
        </div>
     );
}

export default LoginForm;