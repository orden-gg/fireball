import { useEffect, useRef, useState } from 'react';

import { GotchiverseApi } from 'api';

import { CitadelUtils } from 'utils';

import { GotchiverseGif } from 'components/Icons/Icons';

import { COLORS } from 'data/citadel.data';

import { styles } from './styles';

interface ParcelImageProps {
  parcel: any;
  imageSize: number;
}

export function ParcelImage({ parcel, imageSize }: ParcelImageProps) {
  const classes = styles();

  const canvasRef = useRef<any>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageMap, setImageMap] = useState([]);

  const processColorsMap = () => {
    const colorsSize: number = imageMap.length / 4;
    const canvas: any = canvasRef.current;
    const context: any = canvas.getContext('2d');

    context.globalAlpha = 1;

    for (let i = 0; i < colorsSize; i++) {
      const id = i * 4;
      const [x, y] = [Math.floor(i / imageSize), i % imageSize];

      context.beginPath();
      context.fillStyle = `rgb(
                ${imageMap[id]},
                ${imageMap[id + 1]},
                ${imageMap[id + 2]}
            )`;
      context.fillRect(y, x, x + 1, y + 1);
    }

    context.strokeStyle = `#${COLORS.parcels.selected.toString(16)}`;

    drawParcelBorder(parcel, context);
  };

  const drawParcelBorder = (parcel: any, context: any): any => {
    const { w, h } = CitadelUtils.getParcelSize(parcel.size);

    return drawRect(parcel, context, w / 2 + 2, h / 2 + 2, 2);
  };

  const drawRect = (parcel: any, context: any, width: any, height: any, line: any) => {
    const parcelX: number = (imageSize - width < parcel.coordinateX ? imageSize - width : parcel.coordinateX) / 2;
    const parcelY: number = (imageSize - height < parcel.coordinateY ? imageSize - height : parcel.coordinateY) / 2;

    context.lineWidth = line;
    context.rect(parcelX, parcelY, width, height);
    context.stroke();
  };

  useEffect(() => {
    let mounted = true;

    setImageLoading(true);

    GotchiverseApi.getParcelImage(parcel.parcelId, imageSize, true)
      .then((response) => {
        if (mounted) {
          setImageMap(response);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setImageLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (imageMap.length > 0 && !imageLoading) {
      processColorsMap();
    }
  }, [imageMap, imageLoading]);

  return (
    <div className={classes.image} style={{ width: imageSize }}>
      {imageLoading ? (
        <GotchiverseGif width='100%' height='100%' />
      ) : (
        <canvas ref={canvasRef} width={imageSize - 4} height={imageSize - 4} />
      )}
    </div>
  );
}
