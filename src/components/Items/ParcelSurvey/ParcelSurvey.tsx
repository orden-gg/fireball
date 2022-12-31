import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { ParcelAlchemica } from 'shared/models';
import { AlchemicaTypes } from 'shared/constants';
import { CommonUtils, AlchemicaUtils } from 'utils';

import { parcelSurveyStyles } from './styles';

interface ParcelSurveyProps {
    alchemica: ParcelAlchemica;
    parcelSize: number;
}

export function ParcelSurvey({ alchemica, parcelSize }: ParcelSurveyProps) {
    const classes = parcelSurveyStyles();

    const [maxRate, setMaxRate] = useState<number>(1);
    const [avarageSurvey, setAvarageSurvey] = useState<{[key in AlchemicaTypes]: number} | {}>({});

    const getPercentageByRate = (amount: number, tokenName: string) => {
        const maxSupplyByCurrentRate = avarageSurvey[tokenName] * maxRate;

        return amount / maxSupplyByCurrentRate * 100;
    };

    useEffect(() => {
        let maxRate: number = 1;
        const avarageSurvey = AlchemicaUtils.getAvarageSurveyBySize(Number(parcelSize));

        for (const tokenName in alchemica) {
            const currentTokentRate = Math.ceil(
                alchemica[tokenName].amount / avarageSurvey[tokenName]
                );

                if (currentTokentRate > maxRate) maxRate = currentTokentRate;
            }

        setMaxRate(maxRate);
        setAvarageSurvey(AlchemicaUtils.getAvarageSurveyBySize(Number(parcelSize)));

    }, [alchemica, parcelSize]);

    return (
        <div className={classes.surveyList}>
            <span className={classes.rateAvarage}>{(maxRate / 2) * 100}%</span>
            {
                Object.entries(alchemica).map(([tokenName, value]) =>
                    <div className={classNames(classes.surveyAlchemica, classes[tokenName])} key={tokenName}>
                        <div
                            className={classes.surveyAlchemicaBar}
                            style={{ width: `${getPercentageByRate(value.amount, tokenName)}%` }}
                        >
                            <span className={classes.amount}>
                                {CommonUtils.convertFloatNumberToSuffixNumber(value.amount)}
                            </span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
