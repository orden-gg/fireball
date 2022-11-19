import { IconName } from 'shared/constants';
import {
    AggressionIcon,
    AlphaIcon,
    BrainIcon,
    EnergyIcon,
    EyeColorIcon,
    EyeShapeIcon,
    FomoIcon,
    FudIcon,
    KekIcon,
    SpookinessIcon
} from 'components/Icons/Icons';

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
            case IconName.Fud:
                return <FudIcon {...props} />;
            case IconName.Fomo:
                return <FomoIcon {...props} />;
            case IconName.Alpha:
                return <AlphaIcon {...props} />;
            case IconName.Kek:
                return <KekIcon {...props} />;
        }
    }
}
