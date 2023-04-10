import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { EthersApi } from 'api';

import { AlchemicaListTuple, ParcelAlchemica, ParcelSurvey } from 'shared/models';

import { AlchemicaUtils, CommonUtils } from 'utils';

import { parcelSurveyDetailsStyles } from './styles';

interface ParcelSurveyDetailsProps {
  surveys: ParcelSurvey[];
  surveysRatesByToken: AlchemicaListTuple;
  surveysRatesByRounds: ParcelAlchemica[];
}

export function ParcelSurveyDetails({ surveys, surveysRatesByToken, surveysRatesByRounds }: ParcelSurveyDetailsProps) {
  const classes = parcelSurveyDetailsStyles();

  const renderIcon = (name: string) => {
    const Icon: ({ className, width, height }) => JSX.Element = AlchemicaUtils.getIconByName(name);

    return <Icon className={classes.surveyDetailsIcon} width={16} height={16} />;
  };

  const renderRate = (value: number) => {
    return <span className={classes.surveyTableRate}>{Number((value * 100).toFixed(1))}%</span>;
  };

  return (
    <Table aria-label='surveys table' className={classes.surveysTable}>
      <TableHead>
        <TableRow>
          <TableCell component='th' className={classes.surveysTableCell}></TableCell>

          {surveys.map((survey: ParcelSurvey, index: number) => (
            <TableCell key={index} className={classes.surveysTableCell} component='th' align='center'>
              Round {survey.round + 1}
              {renderRate(AlchemicaUtils.getEverageFromObject(surveysRatesByRounds[index]))}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(surveysRatesByToken).map(([name, values]: [string, number[]]) => (
          <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell className={classes.surveysTableCell} component='td' scope='row'>
              {renderIcon(name)}
            </TableCell>
            {values.map((value: number, index: number) => (
              <TableCell key={index} className={classes.surveysTableCell} align='center'>
                {CommonUtils.convertFloatNumberToSuffixNumber(EthersApi.fromWei(surveys[index][name]))}
                {renderRate(value)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
