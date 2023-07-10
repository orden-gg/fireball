import { NavigationCards } from './components/NavigationCards/NavigationCards';
import { bgStyles, styles } from './styles';

export function Main() {
  const classes = {
    ...bgStyles(),
    ...styles()
  };

  return (
    <div className={classes.content}>
      <NavigationCards />
    </div>
  );
}
