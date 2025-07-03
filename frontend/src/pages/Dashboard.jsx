import { Appbar } from "../components/Appbar"
import { BalanceComp } from "../components/balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return <div>
        <Appbar />
        <div className="m-8">
            <BalanceComp amt={"10,000"} />
            <Users />
        </div>
    </div>
}