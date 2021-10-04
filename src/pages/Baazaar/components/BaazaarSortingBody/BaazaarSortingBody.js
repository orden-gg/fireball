import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import Gotchi from "../../../../components/Gotchi/Gotchi";
import Pagination from '../Pagination/Pagination';
import {Button, Typography, useTheme} from '@material-ui/core';
import ghst from '../../../../assets/images/ghst-doubleside.gif';
import Web3 from "web3";
import Filters from "./components/Filters/Filters";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import GotchiSvgRender from "../../../../components/Gotchi/GotchiSvgRender";

const web3 = new Web3();

const useStyles = makeStyles(() => ({
    baazaarBody: {
        padding: 30
    },
    pagination: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        '& nav': {
            marginTop: 15,
            fontSize: '1.2rem'
        }
    },
    warning: {
        marginBottom: '15px'
    },
    noGoods: {
        fontSize: "1rem"
    },
    ghstFooter: {
        marginTop: 5,
        marginBottom: 15
    },
    ghst: {
        width: 20
    },
    price: {
        display: 'flex',
        fontSize: 16,
        alignItems: 'center',
        '& > div': {
            marginTop: 3
        }
    },
    carousel: {
        '& .carousel:not(.carousel-slider)': {
            display: 'none'
        },
        '& .control-dots': {
            display: 'none'
        },
        '& .carousel .slider-wrapper': {
            paddingTop: 10
        },
        '& .carousel-status': {
            top: -17
        }
    }
}));

// let regex = /<style>(.*?)<\/style>/g;
// let regexClass = /\.(.*?)\}/g;

export default function BaazaarSortingBody({goods, page, limit, onNextPageClick, onPrevPageClick, handleFindClick}) {
    const classes = useStyles();
    const theme = useTheme();
    // const [SVGs, setSVGs] = useState([]);

    const getGotchiColor = (haunt) => {
        return theme.palette.haunt['h' + haunt];
    };

    // useEffect(() => {
    //     const gotchiList = [];
    //     let gotchiSVGs = [];
    //
    //     const addGotchiToList = (gotchi, svg) => {
    //         console.log(gotchi, svg);
    //         debugger;
    //     };
    //
    //     goods.map((item) => {
    //         item.gotchi instanceof Array && item.gotchi.map((singleGotchi) => {
    //             gotchiList.push(singleGotchi);
    //         })
    //     });
    //
    //     GotchiSvgRender.getSvg(gotchiList).then((response)=> {
    //         response.map((gotchiItem, index) => {
    //             let svgInner = document.createElement('div');
    //             const tmp = document.createElement("div");
    //             tmp.appendChild(gotchiItem);
    //
    //             const svgString = tmp.innerHTML;
    //
    //             let svgUniqueStyles = svgString.match(regex).map((val) => {
    //                 return val.replace(/<\/?style>/g,'');
    //             });
    //
    //             svgUniqueStyles = svgUniqueStyles[0].match(regexClass).map((styleBlock) => {
    //                 return `${styleBlock}`;
    //             }).join('');
    //
    //             svgInner.innerHTML = svgString.replace(regex, `<style>${svgUniqueStyles}</style>`);
    //
    //             addGotchiToList(gotchiList[index], svgInner);
    //         });
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //
    // }, [goods]);

    return (
        <Grid className={classes.baazaarBody} item xs={12} sm={12} md={9} lg={9} xl={10}>
            <Filters handleFindClick={handleFindClick} />
            <Grid container spacing={3}>
                {
                    // eslint-disable-next-line array-callback-return
                    goods.map((item, index) => {
                        return <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        {
                                            item.gotchi instanceof Array ?
                                                <Carousel showArrows={true} className={classes.carousel}>
                                                    {
                                                        item.gotchi.map((gotchiItem) => {
                                                            return <Gotchi
                                                                key={gotchiItem.id}
                                                                className={classes.gotchi}
                                                                gotchi={gotchiItem}
                                                                title={gotchiItem.tokenId}
                                                                gotchiColor={getGotchiColor(item.hauntId)}
                                                                narrowed={false}
                                                                renderSvgByStats={true}
                                                            />
                                                        })
                                                    }
                                                </Carousel> :
                                                <Gotchi
                                                    className={classes.gotchi}
                                                    gotchi={item.gotchi}
                                                    title={item.gotchi.tokenId}
                                                    gotchiColor={getGotchiColor(item.hauntId)}
                                                    narrowed={false}
                                                />
                                        }
                                    </Grid>
                                </Grid>
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
                        </Grid>
                    })
                }
                <Grid className={classes.pagination} item xs={12}>
                    {
                        goods.length ? <Pagination
                                page={page}
                                prevPageVisibility={page === 1}
                                nextPageVisibility={goods.length < limit}
                                onNextPageClick={onNextPageClick}
                                onPrevPageClick={onPrevPageClick}
                            /> :
                            <Typography className={classes.noGoods} variant={'caption'}>Spooky Market has no such goods :(</Typography>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}