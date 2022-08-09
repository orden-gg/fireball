import { RarityTypes } from 'shared/constants';
import { GotchiAgingModel } from 'shared/models';

export class GotchiUtils {
    public static getTotalXpByLevel(level: number): number {
        return level * level / 0.02;  // Based on https://wiki.aavegotchi.com/en/xp
    }

    public static getLevelXpByLevel(level: number): number {
        const [currentXp, previousXp]: number[] = [
            GotchiUtils.getTotalXpByLevel(level),
            GotchiUtils.getTotalXpByLevel(level - 1)
        ];

        return currentXp - previousXp;
    }

    public static getGotchiLevelPercentage(level: number, toNextLevel: number): number {
        const diff: number = GotchiUtils.getLevelXpByLevel(level);
        const percentageFormula: number = 100 - Math.floor(Number(toNextLevel) * 100 / diff);

        return percentageFormula;
    }

    public static getRarityByTrait(trait: any): any {
        switch (true) {
            case trait >= 100 || trait <= -1:
                return RarityTypes.Godlike;
            case trait >= 98 || trait <= 1:
                return RarityTypes.Mythical;
            case trait >= 90 || trait <= 9:
                return RarityTypes.Rare;
            default:
                return RarityTypes.Common;
        }
    }

    public static getAgingMetadata(blocksOld: number): GotchiAgingModel {
        const oneMillionBlocks = 1000000;

        switch (true) {
            case blocksOld > 89 * oneMillionBlocks:
                return { name: 'Aancient', boost: 10 };
            case blocksOld > 55 * oneMillionBlocks:
                return { name: 'Aancient', boost: 9 };
            case blocksOld > 35 * oneMillionBlocks:
                return { name: 'Aancient', boost: 8 };
            case blocksOld > 21 * oneMillionBlocks:
                return { name: 'Aancient', boost: 7 };
            case blocksOld > 13 * oneMillionBlocks:
                return { name: 'Aancient', boost: 6 };
            case blocksOld > 8 * oneMillionBlocks:
                return { name: 'Boomer', boost: 5 };
            case blocksOld > 5 * oneMillionBlocks:
                return { name: 'Zoomer', boost: 4 };
            case blocksOld > 3 * oneMillionBlocks:
                return { name: 'Youngin', boost: 3 };
            case blocksOld > 2 * oneMillionBlocks:
                return { name: 'Youngin', boost: 2 };
            case blocksOld > 1 * oneMillionBlocks:
                return { name: 'Newborn', boost: 1 };
            default:
                return { name: 'Newborn', boost: 0 };
        }
    }

    public static getAgingImg(id: number): any {
        try {
            return require(`../assets/images/aging/${id}.png`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }
}
