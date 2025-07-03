import { Link } from "react-router-dom"

export function BottomWarningComp({text, linkText, path}) {
    return <div className="py-2 text-sm flex justify-center">
        <div>
           {text}
        </div>
        <Link className="cursor-pointer underline pl-1" to={path}>
            {linkText}
        </Link>
    </div>
}