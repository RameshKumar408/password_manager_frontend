import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import constant from '../constant';
import { useNavigate } from 'react-router-dom';

function Createllist() {

    const [website, setWebsite] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const CreateData = async () => {
        try {
            if (website == "") {
                toast.error("Please Enter website")
            } else if (username == "") {
                toast.error("Please Enter username")
            } else if (password == "") {
                toast.error("Please Enter password")
            } else {
                const { data } = await axios.post(`${constant.Live_url}/password/create-data`, {
                    website: website,
                    username: username,
                    password: password
                }, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("tokens")}`
                    }
                })
                if (data?.success == true) {
                    setWebsite("")
                    setUsername("")
                    setPassword("")
                    toast.success(data?.message)
                } else {
                    setWebsite("")
                    setUsername("")
                    setPassword("")
                    toast.error(data?.message)
                }
            }
        } catch (error) {
            setWebsite("")
            setUsername("")
            setPassword("")
            toast.error(error?.response?.data?.message)
            console.log("🚀 ~ CreateData ~ error:", error)
        }
    }

    return (
        <div>
            <div style={{ textAlign: 'center' }} ><h1>Create Data</h1></div>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <TextField id="outlined-basic" value={website} label="website" variant="outlined" onChange={(e) => { setWebsite(e.target.value) }} />
                <TextField id="outlined-basic" value={username} label="username" variant="outlined" onChange={(e) => { setUsername(e.target.value) }} />
                <TextField id="outlined-basic" value={password} label="password" variant="outlined" onChange={(e) => { setPassword(e.target.value) }} />
                <Button variant='contained' onClick={() => { CreateData() }}>Submit</Button>
                <Button variant='contained' onClick={() => { navigate('/fileslist') }}>Back</Button>
            </div>
        </div>
    );
}

export default Createllist;