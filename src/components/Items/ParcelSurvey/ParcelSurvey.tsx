import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { ParcelAlchemica, ParcelSurvey as ParcelSurveyModel } from 'shared/models';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { EthersApi } from 'api';
import { AlchemicaUtils } from 'utils';

import { ParcelSurveyBar } from './components/ParcelSurveyBar';
import { parcelSurveyStyles } from './styles';

interface ParcelSurveyProps {
    alchemica: string[];
    size: number;
    surveys: ParcelSurveyModel[];
    className?: string;
}

export function ParcelSurvey({ surveys, alchemica, size, className }: ParcelSurveyProps) {
    const classes = parcelSurveyStyles();

    const [isSurveyed, setIsSurveyed] = useState<boolean>(false);
    const [averageRate, setAverageRate] = useState<number>(1);
    const [averageSurvey, setAverageSurvey] = useState<ParcelAlchemica | null>(null);
    const [totalSurveysSupply, setTotalSurveysSupply] = useState<ParcelAlchemica | null>(null);

    useEffect(() => {
        const isSurveyed = surveys?.length > 0;

        if (isSurveyed) {
            const averageSurvey: ParcelAlchemica = AlchemicaUtils.getAverageSurveyBySize(Number(size));
            const totalSurveysSupply: ParcelAlchemica = AlchemicaUtils.getCombinedSurveys(surveys);
            let rateSum: number = 0;

            for (const tokenName in totalSurveysSupply) {
                const currentTokentRate = totalSurveysSupply[tokenName] / averageSurvey[tokenName];

                rateSum += currentTokentRate;
            }

            setTotalSurveysSupply(totalSurveysSupply);
            setAverageRate(Number((rateSum / 4).toFixed(2)));
            setAverageSurvey(AlchemicaUtils.getAverageSurveyBySize(Number(size)));
        }
        setIsSurveyed(isSurveyed);
    }, [surveys, size]);

    if (surveys === undefined) {
        return <></>;
    }

    return (
        <div className={classNames(classes.surveyList, className)}>
            {isSurveyed ? (
                <>
                    <span className={classes.surveyListHead}>
                        <CustomTooltip placement='top' title={<>times surveyed</>} disableInteractive arrow>
                            <span className={classes.surveyedTime}>{surveys.length}</span>
                        </CustomTooltip>
                        <CustomTooltip placement='top' title={<>total average</>} disableInteractive arrow>
                            <span className={classes.rateAvarage}>x{averageRate}</span>
                        </CustomTooltip>
                    </span>
                    {totalSurveysSupply !== null &&
                        Object.entries(totalSurveysSupply).map(([tokenName, amount], index: number) => (
                            <ParcelSurveyBar
                                key={tokenName}
                                averageSurvey={averageSurvey && averageSurvey[tokenName]}
                                tokenName={tokenName}
                                currentAmount={EthersApi.fromWei(alchemica[index])}
                                surveySupply={amount}
                            />
                        ))}
                </>
            ) : (
                <span className={classes.surveyListHead}>
                    <span className={classNames(classes.surveyedTime, classes.textCenter)}>not surveyed</span>
                </span>
            )}
        </div>
    );
}
