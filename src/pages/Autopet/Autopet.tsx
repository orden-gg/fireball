import { AutopetContextProvider } from './AutopetContextProvider';
import { AutopetHeader } from './components/AutopetHeader';
import { AutopetInfo } from './components/AutopetInfo/AutopetInfo';
import { AutopetSteps } from './components/AutopetSteps/AutopetSteps';
import { styles } from './styles';

export function Autopet() {
  const classes = styles();

  return (
    <AutopetContextProvider>
      <div className={classes.autopetWrapper}>
        <AutopetHeader />
        <AutopetSteps />
        <AutopetInfo />
      </div>
    </AutopetContextProvider>
  );
}
