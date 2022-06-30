import { useCallback, useContext, useEffect, useState } from 'react';

import { TokenTypes } from 'shared/constants';
import { AlchemicaList } from 'shared/models';
import { FudTokenIcon, FomoTokenIcon, AlphaTokenIcon, KekTokenIcon } from 'components/Icons/Icons';
import { CommonUtils } from 'utils';
import { TokensPricesContext } from 'contexts/TokensPricesContext';

import { styles } from './styles';

const icons = [FudTokenIcon, FomoTokenIcon, AlphaTokenIcon, KekTokenIcon];

export function AlchemicaPrice({ alchemica }: { alchemica: AlchemicaList }) {
    const classes = styles();
    const [itemPrice, setItemPrice] = useState<number>(0);
    const { tokensPrices, isPricesLoaded } = useContext<any>(TokensPricesContext);

    const getItemPrice = useCallback((): number => {
        const tokens = Object.values(TokenTypes);

        return alchemica.reduce((prev: number, current: number, index: number) =>
            prev + current * tokensPrices[tokens[index]]
        , 0);
    }, [isPricesLoaded, alchemica]);

    useEffect(() => {
        if (isPricesLoaded) {
            const price = getItemPrice();

            setItemPrice(price !== 0 ? Number(price.toFixed(2)) : 0);
        }
    }, [isPricesLoaded, alchemica]);

    return (
        <>
            <div className={classes.alchemica}>
                {
                    alchemica.map((amount: number, index: number ) => {
                        const Icon = icons[index];

                        return <div className={classes.token} key={index}>
                            <Icon className={classes.tokenIcon} width={20} height={20} />
                            <span className={classes.amount}>{CommonUtils.convertFloatNumberToSuffixNumber(amount)}</span>
                        </div>;
                    })
                }
            </div>
            <div className={classes.daiPrice}>craft price: <span>{itemPrice}$</span></div>
        </>
    );
}
