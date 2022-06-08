import { useEffect, useRef, useState } from 'react';

import { GotchiverseGif } from 'components/Icons/Icons';
import gotchiverseApi from 'api/gotchiverse.api';
import { COLORS } from 'data/citadel.data';

import styles from './styles';

export default function ParcelImage({ parcel, imageSize }) {
    const classes = styles();
    const canvasRef = useRef(null);
    const [imageLoading, setImageLoading] = useState(true);

    const processColorsMap = (map) => {
        const cache = [];

        map.forEach((item) => {
            if (!cache.length) {
                cache[0] = [];
            }

            if (cache[cache.length - 1].length < 4) {
                cache[cache.length - 1].push(item);
            } else {
                cache[cache.length] = [item];
            }
        });

        const canvas = canvasRef.current;

        if (!canvas) return;

        const context = canvas.getContext('2d');

        context.globalAlpha = 1;

        for (let x = 0; x < imageSize; x++) {
            for (let y = 0; y < imageSize; y++) {
                context.beginPath();
                context.fillStyle = `rgba(${cache[x*imageSize+y].join(',')})`;
                context.fillRect(y,x, x+1,y+1);
            }
        }

        context.strokeStyle = `#${COLORS.parcels.selected.toString(16)}`;

        drawParcelBorder(parcel, context);
    };

    const drawParcelBorder = (parcel, context) => {
        const size = Number(parcel.size);

        switch (size) {
            case 0:
                return drawRect(parcel, context, 5, 5, 2);
            case 1:
                return drawRect(parcel, context, 10, 10, 2);
            case 2:
                return drawRect(parcel, context, 16, 32, 2);
            case 3:
                return drawRect(parcel, context, 32, 16, 2);
            default:
                return;
        }
    };

    const drawRect = (parcel, context, width, height, line) => {
        const parcelX = (imageSize - width < parcel.coordinateX ? imageSize - width : parcel.coordinateX) / 2;
        const parcelY = (imageSize - height < parcel.coordinateY ? imageSize - height : parcel.coordinateY) / 2;

        context.lineWidth = line;
        context.rect(parcelX, parcelY, width, height);
        context.stroke();
    };

    useEffect(() => {
        let mounted = true;

        setImageLoading(true);

        gotchiverseApi.getParcelImage(parcel.parcelId, imageSize, true)
            .then(res => {
                if (mounted) {
                    setImageLoading(false);
                    processColorsMap(res);
                }
            });

        return () => mounted = false;
    }, []);

    return (
        <div
            className={classes.image}
            style={{ width: imageSize }}
        >
            { imageLoading ? (
                <GotchiverseGif width='100%' height='100%' />
            ) : (
                <canvas
                    ref={canvasRef}
                    width={imageSize - 4}
                    height={imageSize - 4}
                />
            )}
        </div>
    );
}
