import { useContext } from "react";
import { AutopetContext } from "../../AutopetContextProvider";
import { infoStyles } from "../../styles";
import AutopetInfoCard from "./AutopetInfoCard";

export default function AutopetInfo() {
    const classes = infoStyles();
    const {
        totalGotchis,
        totalUsers
    } = useContext(AutopetContext);

    return (
        <div
            className={classes.autopetInfo}
        >
            <AutopetInfoCard 
                name='Gotchis'
                count={totalGotchis}
            />
            <AutopetInfoCard 
                name='Frens'
                count={totalUsers}
            />
        </div>
    )
}