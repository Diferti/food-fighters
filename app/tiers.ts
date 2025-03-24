export const TIER_THRESHOLDS = {
    LEGENDARY: 100000,
    GRANDMASTER: 50000,
    MASTER: 20000,
    DIAMOND: 10000,
    GOLD: 5000,
    SILVER: 1000,
    COPPER: 0,
};

export const getTierImage = (points: number) => {
    if (points >= TIER_THRESHOLDS.LEGENDARY) return require('../assets/images/legues/legendary.png');
    if (points >= TIER_THRESHOLDS.GRANDMASTER) return require('../assets/images/legues/grandmaster.png');
    if (points >= TIER_THRESHOLDS.MASTER) return require('../assets/images/legues/master.png');
    if (points >= TIER_THRESHOLDS.DIAMOND) return require('../assets/images/legues/diamond.png');
    if (points >= TIER_THRESHOLDS.GOLD) return require('../assets/images/legues/gold.png');
    if (points >= TIER_THRESHOLDS.SILVER) return require('../assets/images/legues/silver.png');
    return require('../assets/images/legues/copper.png');
};