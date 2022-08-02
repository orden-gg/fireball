export class GotchiUtils {
    public static getTotalXpByLevel(level: number): number {
        return level * level / 0.02;  // Based on https://wiki.aavegotchi.com/en/xp
    }

    public static getLevelXpByLevel(level: number): number {
        const [currentXp, previousXp]: number[] = [
            GotchiUtils.getTotalXpByLevel(level),
            GotchiUtils.getTotalXpByLevel(level-1)
        ];

        return currentXp - previousXp;
    }

    public static getGotchiLevelPercentage(level: number, toNextLevel: number): number {
        const diff: number = GotchiUtils.getLevelXpByLevel(level);
        const percentageFormula: number = 100 - Math.floor(Number(toNextLevel) * 100 / diff);

        return percentageFormula;
    }
}
