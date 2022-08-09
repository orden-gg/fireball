import { RarityTypes } from 'shared/constants';

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

    public static getAgingMetadata(blockNumber: number): any {
        switch (true) {
            case blockNumber > 89000000:
                return { name: 'Imba', boost: 10 };
            case blockNumber > 55000000:
                return { name: 'Seconds', boost: 9 };
            case blockNumber > 34000000:
                return { name: 'Third', boost: 8 };
            case blockNumber > 21000000:
                return { name: 'Fourth', boost: 7 };
            case blockNumber > 13000000:
                return { name: 'Fifth', boost: 6 };
            case blockNumber > 8000000:
                return { name: 'Sixth', boost: 5 };
            case blockNumber > 5000000:
                return { name: 'Seventh', boost: 4 };
            case blockNumber > 3000000:
                return { name: 'Eleventh', boost: 3 };
            case blockNumber > 2000000:
                return { name: 'Ninth', boost: 2 };
            case blockNumber > 1000000:
                return { name: 'Tenth', boost: 1 };
            default:
                return { name: 'Newborn', boost: 0 };
        }
    }
}
