

export function InputBox({value, onChange, type= "text", boxTitle, placeholder}) {
    return <div>
        <div className="font-medium text-sm text-left py-2">
            {boxTitle}
        </div>
        <div>
           <input type={type} value={value}
           onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border 
           border-slate-200 rounded"></input>
        </div>
    </div>

}