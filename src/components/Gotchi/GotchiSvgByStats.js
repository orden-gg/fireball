import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import GotchiSvgRender from "./GotchiSvgRender";

import gotchiLoading from '../../assets/images/gotchi-loading.gif';

const useStyles = makeStyles(() => ({
    svgWrapper: {
        margin: 'auto',
        '& svg, & img': {
            display: 'block'
        },
        '& .gotchi-wearable': {
            transition: 'all .5s ease-in-out'
        },
        '& .gotchi-sleeves': {
            transition: 'all .5s ease-in-out'
        },
        '&:hover': {
            '& .gotchi-wearable:not(.wearable-bg)': {
                opacity: 0,
            },
            '& .gotchi-sleeves': {
                opacity: 0,
            },
            '& .wearable-head': {
                transform: 'translateY(-5px) rotateZ(-45deg)'
            },
            '& .wearable-eyes': {
                transform: 'translateX(10px) rotateZ(5deg)'
            },
            '& .wearable-face': {
                transform: 'translateX(-10px) rotateZ(10deg)'
            },
            '& .wearable-body': {
                transform: 'translateY(10px) rotateZ(-5deg)'
            },
            '& .wearable-hand-right': {
                transform: 'translateX(5px) rotateZ(-5deg)'
            },
            '& .wearable-hand-left': {
                transform: 'translateX(-5px) rotateZ(5deg)'
            },
            '& .wearable-pet': {
                transform: 'translateY(5px)'
            }
        }
    },
    svgPlaceholder: {
        width: '100%',
    }
}));

let regex = /<style>(.*?)<\/style>/g;
let regexClass = /\.(.*?)\}/g;

export default function GotchiSvgByStats({gotchi, size}) {
    const classes = useStyles();
    const svgRef = useRef();
    const [loadingSvg, setLoadingSvg] = useState(true);
    let svgInner = document.createElement('div');

    useEffect(() => {
        setLoadingSvg(true);
        GotchiSvgRender.getSvg([gotchi]).then((response)=> {
                const svg = response[0];
                const tmp = document.createElement("div");

                tmp.appendChild(svg);

                const svgString = tmp.innerHTML;

                let svgUniqueStyles = svgString.match(regex).map((val) => {
                    return val.replace(/<\/?style>/g,'');
                });

                svgUniqueStyles = svgUniqueStyles[0].match(regexClass).map((styleBlock) => {
                    return `.gotchi-${gotchi.tempId}${styleBlock}`;
                }).join('');

                svgInner.innerHTML = svgString.replace(regex, `<style>${svgUniqueStyles}</style>`);

                setLoadingSvg(false);
                svgRef.current.innerHTML = '';
                svgRef.current.appendChild(svgInner);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={classes.svgWrapper} style={{ width: size }}>
            {loadingSvg ? (
                <img
                    className={classes.svgPlaceholder}
                    src={gotchiLoading} alt='Gotchi Loading...'
                />
            ) : (
                <div
                    className={classNames(classes.svgImage, `gotchi-${gotchi.tempId}`, `gotchi-svg-${gotchi.id}`)}
                    ref={svgRef}
                ></div>
            )}
        </div>
    );
}