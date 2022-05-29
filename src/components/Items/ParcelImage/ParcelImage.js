import React, { useEffect, useRef, useState } from 'react';

import { GotchiverseGif } from 'components/Icons/Icons';
import gotchiverseApi from 'api/gotchiverse.api';
import citadelUtils from 'utils/citadelUtils';
import { COLORS } from 'data/citadel.data';

import styles from './styles';

export default function ParcelImage({ parcel, parcelSize }) {
    const classes = styles();
    const canvasRef = useRef(null);
    const [imageLoading, setImageLoading] = useState(true);

    const processColorsMap = (map) => {
        const colorsSize = map.length/4;
        const canvas = canvasRef.current;

        if (!canvas) return;

        const context = canvas.getContext('2d');

        const drawRect = (width, height) => {
            const parcelX = (parcelSize - width < parcel.coordinateX ? parcelSize - width : parcel.coordinateX) / 2;
            const parcelY = (parcelSize - height < parcel.coordinateY ? parcelSize - height : parcel.coordinateY) / 2;

            context.rect(parcelX, parcelY, width, height);
        };

        context.globalAlpha = 1;

        for(let i = 0; i < colorsSize; i++) {
            const id = i * 4;
            const [x, y] = [Math.floor(i / parcelSize), i % parcelSize];

            context.beginPath();
            context.fillStyle = `rgb(
                ${map[id]},
                ${map[id + 1]},
                ${map[id + 2]}
            )`;
            context.fillRect(y, x, x + 1, y + 1);
        }

        const { w, h } = citadelUtils.getParcelSize(parcel.size);

        context.strokeStyle = `#${COLORS.parcels.selected.toString(16)}`;
        context.lineWidth = 2;
        drawRect(w / 2, h / 2);
        context.stroke();
    };


    useEffect(() => {
        let mounted = true;

        setImageLoading(true);

        gotchiverseApi.getParcelColorBySizeMap(parcel.parcelId, parcelSize).then(response => {
            if (mounted) {
                processColorsMap(response);
            }
        })
        .catch(e => console.log(e))
        .finally(() => setImageLoading(false));

        return () => mounted = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={classes.image}
            style={{ width: parcelSize, height: parcelSize }}
        >
            { imageLoading ? (
                <GotchiverseGif width='100%' height='100%' />
            ) : (
                <canvas
                    ref={canvasRef}
                    width={parcelSize - 4}
                    height={parcelSize - 4}
                />
            )}
        </div>
    );
}
