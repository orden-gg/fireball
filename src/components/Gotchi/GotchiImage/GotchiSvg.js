import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { GotchiLoadingGif } from 'components/Icons/Icons';
import thegraph from 'api/thegraph.api';

import styles from './styles';

let regex = /<style>(.*?)<\/style>/g;
let regexClass = /\.(.*?)\}/g;

export default function GotchiSvg({ id, size, hideWearables, hideBg }) {
    const classes = styles();
    const svgRef = useRef(null);
    const [loadingSvg, setLoadingSvg] = useState(true);
    let svgInner = document.createElement('div');

    useEffect(() => {
        let controller = new AbortController();

        setLoadingSvg(true);

        thegraph.getGotchiSvgById(id)
            .then((response)=> {
                if (!controller.signal.aborted) {
                    let svgString = response.data.aavegotchis[0].svg;
                    let svgUniqueStyles = svgString.match(regex).map((val) => {
                        return val.replace(/<\/?style>/g,'');
                    });

                    svgUniqueStyles = svgUniqueStyles[0].match(regexClass).map((styleBlock) => {
                        return `.gotchi-${id} ${styleBlock}`;
                    }).join('');

                    svgInner.innerHTML = svgString.replace(regex, `<style>${svgUniqueStyles}</style>`);

                    setLoadingSvg(false);
                    svgRef.current.innerHTML = '';
                    svgRef.current.appendChild(svgInner);
                }
            }).catch((error) => {
                console.log(error);
            });

        return () => controller?.abort(); // cleanup on destroy

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className={classNames(classes.svgWrapper, hideWearables && 'hide-wearables', hideBg && 'hide-bg' )} style={{ width: size }}>
            {loadingSvg ? (
                <GotchiLoadingGif width='100%' />
            ) : (
                <div
                    className={classNames(classes.svgImage, `gotchi-${id}`)}
                    ref={svgRef}
                ></div>
            )}
        </div>
    );
}
