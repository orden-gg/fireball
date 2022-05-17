import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { GotchiverseGif } from 'components/Icons/Icons';

import styles from './styles';

export default function ParcelImage({ parcel, parcelSize }) {
    const classes = styles();
    const canvasRef = useRef(null);
    const [imageLoading, setImageLoading] = useState(true);

    const processColorsMap = (map) => {
        let cache = [];

        map.forEach((item) => {
            if (!cache.length) {
                cache[0] = []
            }

            if (cache[cache.length -1].length < 4) {
                cache[cache.length - 1].push(item)
            } else {
                cache[cache.length] =[item]
            }
        })

        let canvas = canvasRef.current;

        if (!canvas) return;

        let context = canvas.getContext('2d');

        const drawRect = (width, height) => {
            const parcelX = (parcelSize - width < parcel.coordinateX ? parcelSize - width : parcel.coordinateX) / 2;
            const parcelY = (parcelSize - height < parcel.coordinateY ? parcelSize - height : parcel.coordinateY) / 2;

            context.rect(parcelX, parcelY, width, height);
        };

        context.globalAlpha = 1;

        for (let x = 0; x < parcelSize; x++) {
            for (let y = 0; y < parcelSize; y++) {
                context.beginPath();
                context.fillStyle = `rgba(${cache[x*parcelSize+y].join(',')})`;
                context.fillRect(y,x, x+1,y+1);
            }
        }

        const {size} = parcel;

        context.strokeStyle = 'white';
        +size === 0 && drawRect(5, 5);
        +size === 1 && drawRect(9, 9);
        +size === 3 && drawRect(32, 16);
        +size === 2 && drawRect(16, 32);
        context.stroke();
    };


    useEffect(() => {
        let mounted = true;

        setImageLoading(true);

        axios.get(`https://api.gotchiverse.io/realm/map/load?map=citaadel&format=rgba-buffer-integers&parcel=${parcel.parcelId},${parcelSize}`)
            .then((res) => {
                if (mounted) {
                    setImageLoading(false);
                    processColorsMap(res.data);
                }
            });

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
                    width={parcelSize}
                    height={parcelSize}
                />
            )}
        </div>
    );
}
