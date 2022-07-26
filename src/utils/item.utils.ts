import { Erc1155Categories, TRAITS_KEYS } from 'shared/constants';
import { items } from '../data/items.data';
export class ItemUtils {
    public static getItemNameById(id: any): any {
        return items[id]?.name || '';
    }

    public static getItemRarityById(id: any): string {
        return items[id]?.rarity || 'common';
    }

    public static getItemTypeById(id: any): any {
        return items[id]?.type || '';
    }

    public static getItemStatsById(id: any): any {
        return items[id]?.stats || '';
    }

    public static getItemSlotById(id: any): any {
        return items[id]?.slot || '';
    }

    public static getStatsById(id: number, category: number): any {
        const stats: string = items[id]?.stats;
        const isWearable: boolean = category === Number(Erc1155Categories.Wearable);

        if (isWearable) {
            let result = {};

            for(const stat of stats.split(',')) {
                const [key, value]: string[] = stat.trim().split(' ');
                result[key] = value;
            };

            return result;
        } else {
            return stats;
        }
    }

    public static getEmojiStatsById(id: any): any {
        let stats: any = items[id]?.stats;

        const emojis = { 'NRG':'⚡️', 'AGG':'👹', 'SPK':'👻', 'BRN':'🧠', 'EYS':'👀', 'EYC':'👁' };

        if (!stats) return null;

        Object.entries(emojis).forEach((item) => {
            const [key, value] = item;

            if (stats.includes(key)) {
                stats = stats.replace(`${key} `, value);
            }
        });

        return stats;
    }

    public static getItemType(item: any): any {
        const itemMap: any = {
            'ERC721Listing': {
                '0': () => {
                    return 'closed_portal';
                },
                '2': () => {
                    return 'open_portal';
                },
                '3': () => {
                    return 'aavegotchi';
                },
                '4': () => {
                    return 'realm';
                }
            },
            'ERC1155Listing': {
                '0': () => {
                    return 'wearable';
                },
                '2': () => {
                    return 'consumable';
                },
                '3': () => {
                    return 'ticket';
                }
            },
            'ERC1155Purchase': {
                '0': () => {
                    return 'wearable';
                },
                '2': () => {
                    return 'consumable';
                },
                '3': () => {
                    return 'ticket';
                }
            }
        };

        return itemMap[item.__typename][item.category]();
    }

    public static getBaazaarItemRarityName(item: any): any {
        if (item.__typename === 'ERC1155Listing') {
            return this.getItemRarityName(item.rarityLevel);
        } else {
            return null;
        }
    }

    public static getItemRarityName(id: any): any {
        switch (id) {
            case '0':
                return 'common';
            case '1':
                return 'uncommon';
            case '2':
                return 'rare';
            case '3':
                return 'legendary';
            case '4':
                return 'mythical';
            case '5':
                return 'godlike';
            case '6':
                return 'drop';
            default:
                return null;
        }
    }

    public static getItemRarityId(rarity: any): any {
        switch (rarity) {
            case 'common':
                return '0';
            case 'uncommon':
                return '1';
            case 'rare':
                return '2';
            case 'legendary':
                return '3';
            case 'mythical':
                return '4';
            case 'godlike':
                return '5';
            default:
                return '-1';
        }
    }

    public static getTraitIconByName(trait: any): any {
        return require(`../assets/images/traits/${trait}.png`).default;
    }

    public static getRarityByTrait(trait: any): any {
        switch (true) {
            case trait >= 100 || trait <= -1:
                return 'godlike';
            case trait >= 98 || trait <= 1:
                return 'mythical';
            case trait >= 90 || trait <= 9:
                return 'rare';
            default:
                return 'common';
        }
    }

    public static getItemImg(item: any): any {
        const typeMap: any = {
            wearable: () => returnWearable(),
            closed_portal: () => {
                return require('../assets/images/portals/h1-sealed.svg').default;
            },
            open_portal: () => {
                return require('../assets/images/portals/h1-opened.svg').default;
            },
            realm: () => {
                return require('../assets/images/portals/h1-sealed.svg').default;
            },
            consumable: () => returnWearable(),
            ticket: () => returnTicket.call(this)
        };

        function returnWearable(): any {
            try {
                return require(`../assets/images/wearables/${item.erc1155TypeId}.svg`).default;
            } catch (error) {
                return require('../assets/images/image-placeholder.svg').default;
            }
        }

        function returnTicket(): any {
            try {
                return require(`../assets/images/tickets/${ItemUtils.getBaazaarItemRarityName(item)}.svg`).default;
            } catch (error) {
                return require('../assets/images/image-placeholder.svg').default;
            }
        }

        return typeMap[this.getItemType(item)]();
    }

    public static getPortalImg(hauntId: any): any {
        try {
            return require(`../assets/images/portals/h${hauntId}-opened.svg`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static getWearableImg(id: any): any {
        try {
            return require(`../assets/images/wearables/${id}.svg`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static getTicketImg(name: any): any {
        try {
            return require(`../assets/images/tickets/${name}.svg`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static getItemUrl(item: any): any {
        try {
            return `https://app.aavegotchi.com/baazaar/${item.__typename === 'ERC1155Listing' ? 'erc1155' : 'erc721'}/${item.id}`;
        } catch (error) {
            console.error(error);

            return 'https://app.aavegotchi.com/baazaar';
        }
    }

    public static getTicketFrensPrice(rarity: any): any {
        switch (rarity) {
            case 'common':
                return 50;
            case 'uncommon':
                return 250;
            case 'rare':
                return 500;
            case 'legendary':
                return 2500;
            case 'mythical':
                return 10000;
            case 'godlike':
                return 50000;
            case 'drop':
                return 10000;
            default:
                return 0;
        }
    }

    public static getSlotCaption(name: any): any {
        switch (name) {
            case 'body':
                return 'b';
            case 'face':
                return 'f';
            case 'eyes':
                return 'e';
            case 'head':
                return 'hd';
            case 'right hand':
                return 'rh';
            case 'hands':
                return 'hs';
            case 'pet':
                return 'p';
            default:
                return name;
        }
    }

    public static getParcelSize(id: any): any {
        switch (id) {
            case '0':
                return 'humble';
            case '1':
                return 'reasonable';
            case '2': // 32x64
                return 'spacious';
            case '3': // 64x32
                return 'spacious';
            case '4':
                return 'partner';
            case '5':
                return 'guardian';
            default:
                return '';
        }
    }

    public static getParcelDimmentions(id: any): any {
        switch (id) {
            case '0':
                return '8x8';
            case '1':
                return '16x16';
            case '2':
                return '32x64';
            case '3':
                return '64x32';
            case '4':
                return '64x64';
            case '5':
                return '64x64';
            default:
                return '';
        }
    }

    public static getAlchemicaImg(name: any): any {
        try {
            return require(`../assets/images/icons/${name}.svg`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static getAlchemicaTokenImg(name: any): any {
        try {
            return require(`../assets/images/tokens/${name}-token.svg`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }

    public static getAlchemicaMultiplier(name: any): any {
        switch (name) {
            case 'fud':
                return 1000;
            case 'fomo':
                return 500;
            case 'alpha':
                return 250;
            case 'kek':
                return 100;
            default:
                return 1;
        }
    }
}
