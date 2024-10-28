import { useRoutes } from "react-router-dom";
import { routers } from "../routes";
function AllRoutes() {
    const element = useRoutes(routers)
    return (
        <>
            {element}
        </> 
    )
}

export default AllRoutes;