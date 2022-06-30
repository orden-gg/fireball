import { FudTokenIcon, FomoTokenIcon, AlphaTokenIcon, KekTokenIcon } from 'components/Icons/Icons';

import { styles } from './styles';

const icons = [FudTokenIcon, FomoTokenIcon, AlphaTokenIcon, KekTokenIcon];

export function AlchemicaPrice({ alchemica }: { alchemica: any[] }) {
    const classes = styles();

    return (
        <div className={classes.alchemica}>
            {
                alchemica.map((amount: number, index: number ) => {
                    const Icon = icons[index];

                    return <div className={classes.token} key={index}>
                        <Icon className={classes.tokenIcon} width={20} height={20} />
                        <span className={classes.amount}>{alchemica[index]}</span>
                    </div>;
                })
            }
        </div>
    );
}
