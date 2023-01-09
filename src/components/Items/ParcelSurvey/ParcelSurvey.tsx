import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { Parcel, ParcelAlchemica } from 'shared/models';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { EthersApi } from 'api';
import { AlchemicaUtils } from 'utils';

import { ParcelSurveyBar } from './components/ParcelSurveyBar';
import { parcelSurveyStyles } from './styles';

interface ParcelSurveyProps {
    parcel: Parcel;
    className?: string;
}

export function ParcelSurvey({ parcel, className }: ParcelSurveyProps) {
    const classes = parcelSurveyStyles();

    const [isSurveyed, setIsSurveyed] = useState<boolean>(false);
    const [avarageRate, setAvarageRate] = useState<number>(1);
    const [avarageSurvey, setAvarageSurvey] = useState<ParcelAlchemica | {}>({});
    const [totalSurveysSupply, setTotalSurveysSupply] = useState<ParcelAlchemica | null>(null);

    useEffect(() => {
        const isSurveyed = parcel.surveys.length > 0;

        if (isSurveyed) {
            const avarageSurvey: ParcelAlchemica = AlchemicaUtils.getAvarageSurveyBySize(Number(parcel.size));
            const totalSurveysSupply: ParcelAlchemica = AlchemicaUtils.getCombinedSurveys(parcel.surveys);
            let rateSum: number = 0;

            for (const tokenName in totalSurveysSupply) {
                const currentTokentRate = totalSurveysSupply[tokenName] / avarageSurvey[tokenName];

                rateSum += currentTokentRate;
            }

            setTotalSurveysSupply(totalSurveysSupply);
            setAvarageRate(Number((rateSum / 4).toFixed(2)));
            setAvarageSurvey(AlchemicaUtils.getAvarageSurveyBySize(parcel.size));
        }
        setIsSurveyed(isSurveyed);
    }, [parcel]);

    return (
        <div className={classNames(classes.surveyList, className)}>
            {isSurveyed ? (
                <>
                    <span className={classes.surveyListHead}>
                        <CustomTooltip placement='top' title={<>times surveyed</>} disableInteractive arrow>
                            <span className={classes.surveyedTime}>{parcel.surveys.length}</span>
                        </CustomTooltip>
                        <CustomTooltip placement='top' title={<>total avarage</>} disableInteractive arrow>
                            <span className={classes.rateAvarage}>x{avarageRate}</span>
                        </CustomTooltip>
                    </span>
                    {totalSurveysSupply !== null &&
                        Object.entries(totalSurveysSupply).map(([tokenName, amount], index: number) => (
                            <ParcelSurveyBar
                                key={tokenName}
                                avarageSurvey={avarageSurvey[tokenName]}
                                tokenName={tokenName}
                                currentAmount={EthersApi.fromWei(parcel.alchemica[index])}
                                surveySupply={amount}
                            />
                        ))}
                </>
            ) : (
                <span className={classes.surveyListHead}>
                    <span className={classes.surveyedTime}>not surveyed</span>
                </span>
            )}
        </div>
    );
}
