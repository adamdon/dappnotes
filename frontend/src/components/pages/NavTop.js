import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";


import {useData} from "../utilities/DataContextProvider";




export default function NavTop()
{
    const [data, setData] = useData();



    return (

        <nav className="navbar navbar-dark bg-primary p-0">

            <Link to="/" className="navbar-brand">
                &nbsp; <img src="/images/logo.svg" width="30" height="30" className="d-inline-block align-top" alt="logo"/>&nbsp;DappNotes
            </Link>





            <div className="dropdown">
                <button className="nav-link dropdown-toggle btn btn-primary" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/images/menu.svg" width="30" height="30" className="rounded-circle " alt="icon"/> Menu
                </button>

                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end animate slideIn" aria-labelledby="dropdownMenuLink">
                    <li>
                        <Link to="/" className="dropdown-item text-center">Home</Link>
                    </li>
                    <li>
                        <Link to="/view" className="dropdown-item text-center">View Note</Link>
                    </li>
                    <li>
                        <Link to="/about" className="dropdown-item text-center">About</Link>
                    </li>
                    {/*<li>*/}
                    {/*    <Link to="/admin" className="dropdown-item text-center">Admin</Link>*/}
                    {/*</li>*/}
                </ul>
            </div>


        </nav>
    );


}


