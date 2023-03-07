import { teamStyles } from '../styles';
import { HomeGotchi } from './HomeGotchi.';
import { User } from './User';

export function Team({ team }: { team: any[] }) {
  const classes = teamStyles();

  return (
    <div className={classes.gotchisWrapper}>
      {team.map((gotchi: any, index: number) => (
        <HomeGotchi gotchi={gotchi} key={index} />
      ))}
      <User />
    </div>
  );
}
