import { teamStyles } from '../styles';
import { HomeGotchi } from './HomeGotchi.';
import { User } from './User';

export function Team({ team }: { team: CustomAny[] }) {
  const classes = teamStyles();

  return (
    <div className={classes.gotchisWrapper}>
      {team.map((gotchi: CustomAny, index: number) => (
        <HomeGotchi gotchi={gotchi} key={index} />
      ))}
      <User />
    </div>
  );
}
