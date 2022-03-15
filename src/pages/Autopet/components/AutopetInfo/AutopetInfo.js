import { Link } from "@mui/material";
import { useContext } from "react";
import { AutopetContext } from "../../AutopetContextProvider";
import { infoStyles } from "../../styles";
import AutopetInfoCard from "./AutopetInfoCard";
import CallMadeIcon from '@mui/icons-material/CallMade';
import classNames from "classnames";

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
            <Link
                href='https://polygonscan.com/address/0x715FB0175ebCa2802855D8AdCc93fd913EF60E93#code'
                target='_blank'
                className={classNames(classes.autopetInfoCard, classes.autopetInfoLink)}
            >
                Contract
                <CallMadeIcon className={classes.autopetInfoIcon} />
            </Link>
        </div>
    )
}