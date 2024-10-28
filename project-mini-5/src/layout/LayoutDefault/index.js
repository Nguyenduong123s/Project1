import { Outlet } from "react-router-dom";
import Header from "../Header";
import './LayoutDefault.scss'
function LayoutDefault() {
    return ( 
        <>
            <Header/>
            <div className="content">
                <Outlet/>
            </div>
        </> 
    );
}

export default LayoutDefault;