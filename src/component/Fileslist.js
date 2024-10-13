import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import constant from '../constant';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';

function Fileslist() {
    const navigate = useNavigate()
    const [rows, setRows] = useState([])

    const getDatas = async () => {
        try {
            const { data } = await axios.get(`${constant.Live_url}/password/get-data`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("tokens")}`
                }
            })
            if (data?.success == true) {
                setRows(data?.result)
            }
        } catch (error) {
            console.log("🚀 ~ getDatas ~ error:", error)
        }
    }

    const [visible, setVisible] = useState(null)
    const [search, setSearch] = useState("")
    const [singleData, setSingleData] = useState()
    useEffect(() => {
        getDatas()
    }, [])

    const getSingle = async (id) => {
        try {
            const { data } = await axios.post(`${constant.Live_url}/password/get-single`, {
                id: id
            },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("tokens")}`
                    }
                })
            if (data?.success == true) {
                setSingleData(data?.result)
            }
        } catch (error) {
            console.log("🚀 ~ getSingle ~ error:", error)
        }
    }

    const deletes = async (id) => {
        try {
            const { data } = await axios.post(`${constant.Live_url}/password/delete-data`, {
                id: id
            },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("tokens")}`
                    }
                })
            if (data?.success == true) {
                toast.success(data?.message)
                getDatas()
            }
        } catch (error) {
            console.log("🚀 ~ getSingle ~ error:", error)
        }
    }

    const searchData = async () => {
        try {
            const { data } = await axios.post(`${constant.Live_url}/password/search-data`, {
                search: search
            }, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("tokens")}`
                }
            })
            if (data?.success == true) {
                setRows(data?.result)
            }
        } catch (error) {
            console.log("🚀 ~ searchData ~ error:", error)
        }
    }

    return (
        <div>
            <div style={{ textAlign: 'center' }} > <h1>Password Manager</h1> </div>
            <div style={{ textAlign: 'center' }}>
                <Button variant='contained' onClick={() => { navigate('/createlist') }} >Create Data</Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "20px", gap: "15px" }} >
                <TextField id="outlined-basic" value={search} label="search" variant="outlined" onChange={(e) => { setSearch(e.target.value) }} />
                <Button variant='contained' onClick={() => { searchData() }} >Search Data</Button>
                <Button variant='contained' onClick={() => { getDatas(); setSearch("") }} >Reset Data</Button>

            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, marginTop: "20px" }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell> <b>Website</b> </TableCell>
                            <TableCell ><b>UserName</b></TableCell>
                            <TableCell ><b>Password</b></TableCell>
                            <TableCell ><b>Status</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell >
                                    {row?.website}
                                </TableCell>
                                <TableCell >{row?.username}</TableCell>
                                <TableCell>{(singleData) && (visible == index) ? singleData : row?.password} {visible == index ? <span onClick={() => { setVisible(""); setVisible(""); console.log("ramesh") }} > <VisibilityIcon /> </span> : <span onClick={() => { setVisible(index); getSingle(row?._id) }}><VisibilityOffIcon /></span>}   </TableCell>
                                <TableCell>
                                    <Button variant='contained' onClick={() => { navigate(`/updatelist`, { state: { data: row } }) }} >Update</Button>
                                    <Button variant='contained' onClick={() => { deletes(row?._id) }} >Delete</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Fileslist;