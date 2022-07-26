import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { alpha } from '@mui/material';
import { useTheme } from '@mui/material';

import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GhstTokenGif } from 'components/Icons/Icons';
import { EthersApi, TheGraphApi } from 'api';
import { CommonUtils, ItemUtils } from 'utils';

import { totalPriceStyles } from '../styles';

interface CardTotalPriceProps {
    id: number;
    balance: number;
    category: string;
    priceInWei: string;
    className?: string;
}

export function CardTotalPrice({ id, balance, category, priceInWei, className }: CardTotalPriceProps) {
    const classes = totalPriceStyles();
    const theme = useTheme();

    const [lastSold, setLastSold] = useState<any>(null);

    const rarity: string = ItemUtils.getItemRarityById(id);

    useEffect(() => {
        let mounted: boolean = true;

        TheGraphApi.getErc1155Price(id, true, category, 'timeLastPurchased', 'desc').then((response: any) => {
            if (mounted) {
                setLastSold(response);
            }
        });

        return () => { mounted = false };
    }, [id]);

    const renderNode = (): string => {
        if (lastSold.price !== 0 || priceInWei) {
            return CommonUtils.formatPrice((lastSold.price && balance) ? (
                (lastSold.price * balance)
            ) : (
                EthersApi.fromWei(priceInWei))
            );
        } else {
            return '???';
        }
    };

    return (
        <>
            {lastSold ? (
                <CustomTooltip
                    title='Total value'
                    placement='top'
                    followCursor
                >
                    <div className={classNames(classes.total, className)}>
                        <span>{renderNode()}</span>
                        <GhstTokenGif width={18} height={18} />
                    </div>
                </CustomTooltip>
            ) : (
                <ContentLoader
                    speed={2}
                    viewBox='0 0 70 27'
                    backgroundColor={alpha(theme.palette.common.black, .4)}
                    foregroundColor={alpha(theme.palette.common.black, .1)}

                    className={classes.totalValueLoader}
                >
                    <rect x='0' y='0' width='70' height='27' />
                </ContentLoader>
            )}
        </>
    )
}
