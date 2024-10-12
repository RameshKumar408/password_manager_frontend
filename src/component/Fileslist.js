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

    return (
        <div>
            <div style={{ textAlign: 'center' }} > <h1>Password Manager</h1> </div>
            <div style={{ textAlign: 'center' }}>
                <Button variant='contained' onClick={() => { navigate('/createlist') }} >Create Data</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell> <b>Website</b> </TableCell>
                            <TableCell ><b>UserName</b></TableCell>
                            <TableCell ><b>Password</b></TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Fileslist;