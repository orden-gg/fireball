import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

import { DateTime } from 'luxon';
import classNames from 'classnames';

import { GhstTokenIcon } from 'components/Icons/Icons';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { TheGraphApi } from 'api';
import { EthersApi } from 'api';

import { styles } from './styles';

interface SalesHistoryProps {
    id: string;
    category: number;
}

export function SalesHistory({ id, category }: SalesHistoryProps) {
    const classes = styles();

    const [history, setHistory] = useState<any[]>([]);
    const [historyLoading, setHistoryLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;

        setHistoryLoading(true);

        TheGraphApi.getErc721SalesHistory(id, category)
            .then((res: any) => {
                if (mounted) {
                    setHistory(res);
                    setHistoryLoading(false);
                }
            })
            .catch(err => console.log(err));

        return () => { mounted = false };
    }, [id, category]);

    return (
        <div className={classes.container}>
            { historyLoading ? (
                <CircularProgress color='primary' size={28} />
            ) : (
                <>
                    <div className={classNames(classes.row, 'head')}>
                        <div>seller</div>
                        <div>buyer</div>
                        <div>time</div>
                        <div>price</div>
                    </div>

                    { history.map((item, i) => (
                        <div className={classes.row} key={i}>
                            <div>
                                <EthAddress
                                    address={item.seller}
                                    isShwoIcon={true}
                                    isClientLink={true}
                                    isPolygonButton={true}
                                    isCopyButton={true}
                                />
                            </div>
                            <div>
                                <EthAddress
                                    address={item.buyer}
                                    isShwoIcon={true}
                                    isClientLink={true}
                                    isPolygonButton={true}
                                    isCopyButton={true}
                                />
                            </div>
                            <div>{DateTime.fromSeconds(parseInt(item.timePurchased)).toRelative()}</div>
                            <div className={classes.cell}>
                                {EthersApi.fromWei(item.priceInWei)}
                                <GhstTokenIcon height={15} width={15} />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
