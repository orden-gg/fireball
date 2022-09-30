import { IconName } from 'shared/constants';
import { AggressionIcon, BrainIcon, EnergyIcon, EyeColorIcon, EyeShapeIcon, SpookinessIcon } from 'components/Icons/Icons';

export class IconUtils {
    public static getIconByName(name: IconName, props: { width: number, height: number }): JSX.Element {
        switch (name) {
            case IconName.Energy:
                return <EnergyIcon {...props} />;
            case IconName.Aggression:
                return <AggressionIcon {...props} />;
            case IconName.Spookiness:
                return <SpookinessIcon {...props} />;
            case IconName.Brain:
                return <BrainIcon {...props} />;
            case IconName.EyeShape:
                return <EyeShapeIcon {...props} />;
            case IconName.EyeColor:
                return <EyeColorIcon {...props} />;
        }
    }
}
