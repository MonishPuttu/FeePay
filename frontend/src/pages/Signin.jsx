import { BottomWarningComp } from "../components/bottomwarning"
import { ButtonComp } from "../components/button"
import { HeadingComp } from "../components/heading"
import { InputBox } from "../components/inputbox"
import { SubHeadComp } from "../components/subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


export const Signin = () => {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();


    return <div className="bg-slate-800 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-2xl bg-white w-90 text-center p-2 h-max px-4">
        <HeadingComp label={"Sign in"}></HeadingComp>
        <SubHeadComp text={"Enter your credentials to login into your account"}></SubHeadComp>
        <InputBox value={username} onChange={(e) => {
            setUsername(e.target.value)
        }} boxTitle={"Email"} placeholder={"JackSparrow@gmail.com"}></InputBox>
        <InputBox value={password} onChange={(e) => {
            setPassword(e.target.value)
        }} boxTitle={"Password"} placeholder={"password"}></InputBox>
        <div className="pt-4">
        <ButtonComp text={"Sign in"} onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", 
                {
                    username,
                    password
                });
                localStorage.setItem("token", response.data.token),
                navigate("/dashboard")
        }}></ButtonComp>
        </div>
        <BottomWarningComp text={"Don't have an account?"} linkText={"Sign up"} path={"/signup"}></BottomWarningComp>
        </div>
    </div>
</div>
}