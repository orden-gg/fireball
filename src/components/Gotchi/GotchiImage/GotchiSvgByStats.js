import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { GotchiLoadingGif } from 'components/Icons/Icons';

import renderSvg from './GotchiSvgRender';
import styles from './styles';

let regex = /<style>(.*?)<\/style>/g;
let regexClass = /\.(.*?)\}/g;

export default function GotchiSvgByStats({ gotchi, size }) {
    const classes = styles();
    const svgRef = useRef();
    const [loadingSvg, setLoadingSvg] = useState(true);
    let svgInner = document.createElement('div');

    useEffect(() => {
        setLoadingSvg(true);

        renderSvg([gotchi]).then((response) => {
            const svg = response[0];
            const tmp = document.createElement('div');

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
                <GotchiLoadingGif width='100%' />
            ) : (
                <div
                    className={classNames(classes.svgImage, `gotchi-${gotchi.tempId}`, `gotchi-svg-${gotchi.id}`)}
                    ref={svgRef}
                ></div>
            )}
        </div>
    );
}
