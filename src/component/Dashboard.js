import axios from "axios";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import constant from "../constant";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const Login = async () => {
        try {
            if (email == "") {
                toast.error("Please Enter Email")
            } else if (password == "") {
                toast.error("Please Enter Password")
            } else {
                const { data } = await axios.post(`${constant.Live_url}/login`, {
                    Email: email,
                    Password: password
                })
                if (data?.status == true) {
                    window.localStorage.setItem("tokens", data?.result)
                    toast.success(data?.message)
                } else {
                    toast.error(data?.message)
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log("🚀 ~ Login ~ error:", error)
        }
    }

    const Register = async () => {
        try {
            if (name == "") {
                toast.error("Please Enter Name")
            } else if (email == "") {
                toast.error("Please Enter Email")
            } else if (password == "") {
                toast.error("Please Enter Password")
            } else {
                const { data } = await axios.post(`${constant.Live_url}/register`, {
                    Name: name,
                    Email: email,
                    Password: password
                })
                if (data?.status == true) {
                    toast.success(data?.message)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                } else {
                    toast.error(data?.message)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setTimeout(() => {
                window.location.reload()
            }, 1000);
            console.log("🚀 ~ Register ~ error:", error)
        }
    }

    return (
        <div class="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div class="login">
                <div class="form">
                    <label for="chk" aria-hidden="true">Log in</label>
                    <input class="input" type="email" name="email" placeholder="Email" required="" onChange={(e) => { setEmail(e.target.value) }} />
                    <input class="input" type="password" name="pswd" placeholder="Password" required="" onChange={(e) => { setPassword(e.target.value) }} />
                    <button onClick={() => { Login() }} >Log in</button>
                </div>
            </div>

            <div class="register">
                <div class="form">
                    {/* <form class="form"> */}
                    <label for="chk" aria-hidden="true">Register</label>
                    <input class="input" type="text" name="txt" placeholder="Username" required="" onChange={(e) => { setName(e.target.value) }} />
                    <input class="input" type="email" name="email" placeholder="Email" required="" onChange={(e) => { setEmail(e.target.value) }} />
                    <input class="input" type="password" name="pswd" placeholder="Password" required="" onChange={(e) => { setPassword(e.target.value) }} />
                    <button onClick={() => { Register() }} >Register</button>
                    {/* </form> */}
                </div>

            </div>
        </div>
    );
}

export default Dashboard;