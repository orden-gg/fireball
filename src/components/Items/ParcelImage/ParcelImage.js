import { useEffect, useRef, useState } from 'react';

import { GotchiverseGif } from 'components/Icons/Icons';
import gotchiverseApi from 'api/gotchiverse.api';
import citadelUtils from 'utils/citadelUtils';
import { COLORS } from 'data/citadel.data';

import styles from './styles';

export default function ParcelImage({ parcel, imageSize }) {
    const classes = styles();
    const canvasRef = useRef(null);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageMap, setImageMap] = useState([]);

    const processColorsMap = () => {
        const colorsSize = imageMap.length/4;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.globalAlpha = 1;

        for(let i = 0; i < colorsSize; i++) {
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

    const drawParcelBorder = (parcel, context) => {
        const { w, h } = citadelUtils.getParcelSize(parcel.size);

        return drawRect(parcel, context, w / 2 + 2, h / 2 + 2, 2);
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

        gotchiverseApi.getParcelImage(parcel.parcelId, imageSize, true).then(response => {
            if (mounted) {
                setImageMap(response);
            }
        })
        .catch(error => console.log(error))
        .finally(() => setImageLoading(false));

        return () => mounted = false;
    }, []);

    useEffect(() => {
        if (imageMap.length > 0 && !imageLoading) {
            processColorsMap();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageMap, imageLoading]);

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
