import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import classNames from 'classnames';

import { EthersApi } from 'api';

import { SURVEY_ROUNDS } from 'shared/constants';
import { AlchemicaRoundsList, ParcelAlchemica, ParcelSurvey } from 'shared/models';

import { AlchemicaUtils, CommonUtils, IconUtils } from 'utils';

import { parcelSurveysTableStyles } from './styles';

interface ParcelSurveysTableProps {
  surveys: ParcelSurvey[];
  size: number;
  className?: string;
}

const roundsIdArray = [...Array(SURVEY_ROUNDS).keys()];

export function ParcelSurveysTable({ surveys, size, className }: ParcelSurveysTableProps) {
  const classes = parcelSurveysTableStyles();

  const [ratesByRounds, setRatesByRounds] = useState<ParcelAlchemica[]>();
  const [ratesByToken, setRatesByToken] = useState<AlchemicaRoundsList>();

  useEffect(() => {
    if (surveys) {
      const surveysRatesByRounds: ParcelAlchemica[] = [];

      for (const survey of surveys) {
        surveysRatesByRounds.push(AlchemicaUtils.getSurveyRate(survey, size));
      }

      setRatesByRounds(surveysRatesByRounds);

      const surveysRatesByToken: AlchemicaRoundsList = AlchemicaUtils.sortByTypes(surveysRatesByRounds);

      setRatesByToken(surveysRatesByToken);
    }
  }, [surveys]);

  const renderRate = (value: number) => {
    return <span className={classes.surveyTableRate}>{Number((value * 100).toFixed(1))}%</span>;
  };

  return ratesByRounds && ratesByToken ? (
    <TableContainer>
      <Table aria-label='surveys table' className={classNames(classes.surveysTable, className)}>
        <TableHead>
          <TableRow>
            <TableCell component='th' className={classes.surveysTableCell}></TableCell>

            {roundsIdArray.map((id: number) => (
              <TableCell key={id} className={classes.surveysTableCell} component='th' align='center'>
                Round {id + 1}
                {surveys.length > id && renderRate(AlchemicaUtils.getEverageFromObject(ratesByRounds[id]))}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(ratesByToken).map(([name, values]: [string, number[]]) => (
            <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell className={classes.surveysTableCell} component='td' scope='row'>
                {IconUtils.getIconByName(CommonUtils.capitalize(name), {
                  width: 16,
                  height: 16
                })}
              </TableCell>
              {roundsIdArray.map((id: number) => (
                <TableCell key={id} className={classes.surveysTableCell} align='center'>
                  {surveys.length > id ? (
                    <>
                      {CommonUtils.convertFloatNumberToSuffixNumber(EthersApi.fromWei(surveys[id][name]))}
                      {renderRate(values[id])}
                    </>
                  ) : (
                    '-'
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <></>
  );
}
