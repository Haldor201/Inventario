import deleteSVG from "../icons/delete.svg";
import { useContext } from "react";
import {SfpContext} from '../context/GeneralContext.jsx'

export default function DeleteSFP({id}) {
    const {deleteSfp} = useContext(SfpContext);
    return (
        <img
            src={deleteSVG}
            alt="Eliminar"
            className="icon-action"
            onClick={()=>{deleteSfp(id)}}
        />
    )
}
