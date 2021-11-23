import React from "react";
import Web3 from "web3";
import Gotchi from "../../../../../../components/Gotchi/Gotchi";
import ghst from '../../../../../../assets/images/ghst-doubleside.gif';
import useStyles from "../../../BaazaarSortingBody/style";
import { Grid, Button } from "@mui/material";

const web3 = new Web3();

export default function Aavegotchi({item}) {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.baazaarListItem}>
                <Grid item xs={12}>
                    {
                        item.gotchi.__typename === "Aavegotchi" ?
                            <Gotchi
                                className={classes.gotchi}
                                gotchi={item.gotchi}
                            /> :
                            <Gotchi
                                key={item.gotchi.id}
                                className={classes.gotchi}
                                gotchi={item.gotchi}
                                renderSvgByStats={true}
                            />
                    }
                </Grid>
            </div>
            <Grid container className={classes.ghstFooter}>
                <Grid item className={classes.price} xs={7}>
                    <img className={classes.ghst} src={ghst} alt="ghst"/>
                    <div>{web3.utils.fromWei(item.priceInWei)}</div>
                </Grid>
                <Grid item xs={5}>
                    <Button
                        target={'_blank'}
                        href={'https://aavegotchi.com/baazaar/erc721/' + item.id}
                        variant={'outlined'}
                        color={'primary'}
                        fullWidth
                    >Buy</Button>
                </Grid>
            </Grid>
        </div>
    );
}
