import { useEffect, useState } from "react"
import { ButtonComp } from "./button";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    const [ users, setUsers ] = useState([]);
    const [ filter, setFilter ] = useState("");

    useEffect(() => {

        if (!filter.trim()) return;
        
        axios.get(`http://localhost:3000/api/v1/user/bulk?firstname=${filter}`)
        .then(response => {
            setUsers(response.data.users)
        })
    }, [filter])

    return <>
    <div className="font-bold mt-6 text-lg">
        Users
    </div>
    <div className="my-2">
        <input onChange={(e) => {
            setFilter(e.target.value)
        }} type="text" placeholder="Search Users.." className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div>
    <div>
        {users.map(user => <User key={user.userId} user={user} />)}
    </div>
    </>
}

function User({user}) {

    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstname}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <ButtonComp onClick={() => {
                navigate(`/send?id=${user.userId}&name=${user.firstname}`);
            }} text={"Send Money"} />
        </div>
    </div>
}