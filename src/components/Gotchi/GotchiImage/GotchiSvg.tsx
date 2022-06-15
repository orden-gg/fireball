import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { GotchiLoadingGif } from 'components/Icons/Icons';
import thegraph from 'api/thegraph.api';

import { styles } from './styles';

const regex = /<style>(.*?)<\/style>/g;
const regexClass = /\.(.*?)\}/g;

interface GotchiSvgProps {
    id: string;
    size: string;
}

export function GotchiSvg({ id, size }: GotchiSvgProps) {
    const classes = styles();

    const svgRef = useRef<HTMLDivElement | null>(null);
    const [loadingSvg, setLoadingSvg] = useState<boolean>(true);
    const svgInner = document.createElement('div');

    useEffect(() => {
        const controller = new AbortController();

        setLoadingSvg(true);

        thegraph.getGotchiSvgById(id)
            .then((response: any) => {
                if (!controller.signal.aborted) {
                    const svgString: any = response.data.aavegotchis[0].svg;
                    let svgUniqueStyles: any = svgString.match(regex).map((val: any) => {
                        return val.replace(/<\/?style>/g,'');
                    });

                    svgUniqueStyles = svgUniqueStyles[0].match(regexClass).map((styleBlock) => {
                        return `.gotchi-${id} ${styleBlock}`;
                    }).join('');

                    svgInner.innerHTML = svgString.replace(regex, `<style>${svgUniqueStyles}</style>`);

                    setLoadingSvg(false);

                    if (svgRef?.current) {
                        svgRef.current.innerHTML = '';
                        svgRef.current.appendChild(svgInner);
                    }
                }
            }).catch((error) => {
                console.log(error);
            });

        return () => controller?.abort(); // cleanup on destroy
    }, [id]);

    return (
        <div className={classes.svgWrapper} style={{ width: size }}>
            {loadingSvg ? (
                <GotchiLoadingGif width='100%' />
            ) : (
                <div
                    className={classNames(`gotchi-${id}`)}
                    ref={svgRef}
                ></div>
            )}
        </div>
    );
}
