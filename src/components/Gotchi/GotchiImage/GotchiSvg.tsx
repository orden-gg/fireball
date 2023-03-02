import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { GOTCHI_SIDES } from 'shared/constants';

import { GotchiLoadingGif } from 'components/Icons/Icons';

import { TheGraphApi } from 'api';

import { styles } from './styles';

const regex = /<style>(.*?)<\/style>/g;
const regexClass = /\.(.*?)\}/g;

interface GotchiSvgProps {
  id: string;
  size: string;
  view?: string;
}

export function GotchiSvg({ id, size, view = GOTCHI_SIDES[0] }: GotchiSvgProps) {
  const classes = styles();

  const [loadingSvg, setLoadingSvg] = useState<boolean>(true);
  const [svgs, setSvgs] = useState<{ svg: string; right: string; back: string; left: string } | null>(null);

  useEffect(() => {
    let mounted = true;

    setLoadingSvg(true);

    TheGraphApi.getGotchiSvgById(id)
      .then((response: any) => {
        if (mounted) {
          setSvgs({
            svg: createSvg(response.data.aavegotchis[0].svg),
            right: createSvg(response.data.aavegotchis[0].right),
            back: createSvg(response.data.aavegotchis[0].back),
            left: createSvg(response.data.aavegotchis[0].left)
          });

          setLoadingSvg(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  const createSvg = (svg: string): string => {
    const regExpMatchArr: RegExpMatchArray | null = svg.match(regex);

    if (regExpMatchArr) {
      const svgStyles: string = regExpMatchArr[0];

      svgStyles.replace(/<\/?style>/g, '');

      const svgUniqueStyles = svgStyles
        .match(regexClass)
        ?.map((styleBlock: string) => {
          return `.gotchi-${id} ${styleBlock}`;
        })
        .join('');

      return svg.replace(regex, `<style>${svgUniqueStyles}</style>`);
    } else {
      return '';
    }
  };

  return (
    <div className={classes.svgWrapper} style={{ width: size }}>
      {!loadingSvg ? (
        <div className={classNames(`gotchi-${id}`)} dangerouslySetInnerHTML={{ __html: svgs && svgs[view] }}></div>
      ) : (
        <GotchiLoadingGif width='100%' />
      )}
    </div>
  );
}
