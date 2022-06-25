import { useContext } from 'react';
import { Skeleton } from '@mui/material';

import { AlchemicaList } from 'shared/models';
import { TokensPricesContext } from 'contexts/TokensPricesContext';
import { TokenTypes } from 'data/types';
import { CommonUtils, GotchiverseUtils, GraphUtils } from 'utils';

import { styles } from './styles';

const altarsLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const tokens: string[] = [
    TokenTypes.Fud,
    TokenTypes.Fomo,
    TokenTypes.Alpha,
    TokenTypes.Kek
];

export function GotchiKinshipTooltip({ kinship }: { kinship: string }) {
    const classes = styles();

    const { isPricesLoaded, tokensPrices } = useContext<any>(TokensPricesContext);

    const channelingBoots = GotchiverseUtils.countKinshipChannelingBoost(kinship);

    const renderTotalChannelingPrice = (alchemica: AlchemicaList): JSX.Element => {
        const total = alchemica.map((item, index) => item * tokensPrices[tokens[index]]);

        return <span className={classes.totalPrice}>
            ≈
            { CommonUtils.convertFloatNumberToSuffixNumber(
                CommonUtils.summArray(total)
            )}
            $
        </span>;
    };

    return (
        <div className={classes.container}>
            <div className={classes.containerRow}>
                channeling boost: <span>x{channelingBoots}</span>
            </div>

            { altarsLevels.map((level, altarIndex) => {
                const channelingRate = GotchiverseUtils.countGotchiChannelingRate(level, channelingBoots);

                return <div className={classes.altar} key={altarIndex}>
                    <div className={classes.row}>
                        <span className={classes.rowTitle}>level {level} altar</span>
                        <div>
                            { isPricesLoaded ? (
                                renderTotalChannelingPrice(channelingRate)
                            ) : (
                                <Skeleton
                                    className={classes.placeholder}
                                    variant='rectangular'
                                    width={50}
                                    height={16}
                                />
                            )}
                        </div>
                    </div>

                    <div className={classes.tokensList}>
                        { tokens.map((token, tokenIndex) => (
                            <div className={classes.token} key={tokenIndex}>
                                <img
                                    className={classes.tokenIcon}
                                    src={GraphUtils.getTokenImg(token)}
                                    width={12}
                                    alt={token}
                                />
                                { CommonUtils.convertFloatNumberToSuffixNumber(channelingRate[tokenIndex]) }
                            </div>
                        ))}
                    </div>
                </div>;
            })}
        </div>
    );
}
