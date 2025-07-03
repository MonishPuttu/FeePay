import { BottomWarningComp } from "../components/bottomwarning"
import { ButtonComp } from "../components/button"
import { HeadingComp } from "../components/heading"
import { InputBox } from "../components/inputbox"
import { SubHeadComp } from "../components/subheading"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"


export const Signup = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    return <div className="bg-slate-800 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-2xl bg-white w-90 text-center p-2 h-max px-4">
        <HeadingComp label={"Sign up"}></HeadingComp>
        <SubHeadComp text={"Enter your information to create an account"}></SubHeadComp>
        <InputBox value={firstname} onChange={(e) => {
            setFirstname(e.target.value);
        }}  boxTitle={"First Name"} placeholder={"Jack"}></InputBox>
        <InputBox value={lastname} onChange={(e) => {
            setLastname(e.target.value);
        }} boxTitle={"Last Name"} placeholder={"Sparrow"}></InputBox>
        <InputBox value={username} onChange={(e) => {
            setUsername(e.target.value);
        }} boxTitle={"Email"} placeholder={"JackSparrow@gmail.com"}></InputBox>
        <InputBox value={password} onChange={(e) => {
            setPassword(e.target.value);
        }} boxTitle={"Password"} placeholder={"password"}></InputBox>
        <div className="pt-4">
        <ButtonComp text={"Sign up"} onClick={async () => {
            await axios.post("http://localhost:3000/api/v1/user/signup",
            {
                username,
                firstname,
                lastname,
                password
            });
            navigate("/signin")
        }} />
        </div>
        <BottomWarningComp text={"Already have an account?"} linkText={"Sign in"} path={"/signin"}></BottomWarningComp>
        </div>
    </div>
</div>
}