

export const BalanceComp = ({amt}) => {
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {amt}
        </div>
    </div>
}