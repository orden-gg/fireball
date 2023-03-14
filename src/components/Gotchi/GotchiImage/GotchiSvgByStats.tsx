import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { GotchiLoadingGif } from 'components/Icons/Icons';

import { renderSvg } from './GotchiSvgRender';
import { styles } from './styles';

const regex = /<style>(.*?)<\/style>/g;
const regexClass = /\.(.*?)\}/g;

interface GotchiSvgByStatsProps {
  gotchi: any;
  size: string;
}

export function GotchiSvgByStats({ gotchi, size }: GotchiSvgByStatsProps) {
  const classes = styles();

  const svgRef = useRef<HTMLDivElement | null>(null);
  const [loadingSvg, setLoadingSvg] = useState<boolean>(true);
  const svgInner = document.createElement('div');

  useEffect(() => {
    setLoadingSvg(true);

    renderSvg([gotchi])
      .then((response: any) => {
        const svg: any = response[0];
        const tmp: any = document.createElement('div');

        tmp.appendChild(svg);

        const svgString: any = tmp.innerHTML;

        let svgUniqueStyles: any = svgString.match(regex).map((val: any) => {
          return val.replace(/<\/?style>/g, '');
        });

        svgUniqueStyles = svgUniqueStyles[0]
          .match(regexClass)
          .map((styleBlock: any) => {
            return `.gotchi-${gotchi.tempId}${styleBlock}`;
          })
          .join('');

        svgInner.innerHTML = svgString.replace(regex, `<style>${svgUniqueStyles}</style>`);

        setLoadingSvg(false);

        if (svgRef?.current) {
          svgRef.current.innerHTML = '';
          svgRef.current.appendChild(svgInner);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.svgWrapper} style={{ width: size }}>
      {loadingSvg ? (
        <GotchiLoadingGif width='100%' />
      ) : (
        <div className={classNames(`gotchi-${gotchi.tempId}`, `gotchi-svg-${gotchi.id}`)} ref={svgRef}></div>
      )}
    </div>
  );
}
