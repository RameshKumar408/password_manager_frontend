import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import constant from '../constant';
import { useLocation, useNavigate } from 'react-router-dom';

function Updatelist() {

    const [website, setWebsite] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [id, setId] = useState("")

    const location = useLocation()

    const navigate = useNavigate()


    useEffect(() => {
        console.log("🚀 ~ location.state.data:", location.state.data)
        if (location.state.data) {
            setWebsite(location.state.data.website)
            setUsername(location.state.data.username)
            setId(location.state.data._id)
        }
    }, [location.state.data])

    const UpdateDatas = async () => {
        try {
            if (website == "") {
                toast.error("Please Enter website")
            } else if (username == "") {
                toast.error("Please Enter username")
            } else if (password == "") {
                toast.error("Please Enter password")
            } else {
                const { data } = await axios.post(`${constant.Live_url}/password/update-data`, {
                    id: id,
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
                    navigate('/fileslist')
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
            console.log("🚀 ~ UpdateDatas ~ error:", error)
        }
    }

    return (
        <div>
            <div style={{ textAlign: 'center' }} ><h1>Create Data</h1></div>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <TextField id="outlined-basic" value={website} label="website" variant="outlined" onChange={(e) => { setWebsite(e.target.value) }} />
                <TextField id="outlined-basic" value={username} label="username" variant="outlined" onChange={(e) => { setUsername(e.target.value) }} />
                <TextField id="outlined-basic" value={password} label="password" variant="outlined" onChange={(e) => { setPassword(e.target.value) }} />
                <Button variant='contained' onClick={() => { UpdateDatas() }}>Submit</Button>
                <Button variant='contained' onClick={() => { navigate('/fileslist') }}>Back</Button>
            </div>
        </div>
    );
}

export default Updatelist;