import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';


export const SendMoneyComp = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [ amount, setAmount ] = useState(0);


    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-black max-w-md p-4 
            space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Transfer Money</h2>
                </div>
                <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-2xl font-semibold">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
                         peer-disabled:opacity-70" htmlFor="amount">Amount (in Rs)</label>
                         <input onChange={(e) => {
                            setAmount(parseFloat(e.target.value));
                         }} type="number" className="flex h-10 w-full rounded-md border border-input 
                         bg-white px-3 py-2 text-sm" id="amount" placeholder="Enter Amount" />
                    </div>
                    <button onClick={() => {

                        if (amount <= 0) return;
                         
                        axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: id,
                            amount: parseFloat(amount)
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token") 
                            }
                        })
                        .then(response => {
                            console.log("Transfer Successful:", response.data);
                        })
                    }}  className="justify-center rounded-md text-sm font-medium ring-offset-black
                    transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                  </div>
            </div>
        </div>
    </div>
}