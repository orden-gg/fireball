import { items } from '../data/items';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getItemNameById(id) {
        return items[id]?.name || '';
    },

    getItemRarityById(id) {
        return items[id]?.rarity || '';
    },

    getItemTypeById(id) {
        return items[id]?.type || '';
    },

    getItemStatsById(id) {
        return items[id]?.stats || '';
    },

    getEmojiStatsById(id) {
        let stats = items[id].stats;
        let emojis = {'NRG':'⚡️', 'AGG':'👹', 'SPK':'👻', 'BRN':'🧠', 'EYS':'👀', 'EYC':'👁'};

        Object.entries(emojis).forEach((item) => {
            let [key, value] = item;

            if(stats.includes(key)) {
                stats = stats.replace(`${key} `, value);
            }
        });

        return stats;
    },

    getItemType(item) {
        const itemMap = {
            'ERC721Listing': {
                '0': () => {
                    return 'closed_portal';
                },
                '2': () => {
                    return 'open_portal';
                },
                '3': () => {
                    return 'aavegotchi';
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
            }
        };

        return itemMap[item.__typename][item.category]();
    },

    getBaazaarItemRarityName(item) {
        if (item.__typename === 'ERC1155Listing') {
            return this.getItemRarityName(item.rarityLevel);
        } else {
            return null;
        }
    },

    getItemRarityName(id) {
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
    },

    getItemRarityId(rarity) {
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
    },

    getItemImg(item) {
        const typeMap = {
            wearable: () => returnWearable(),
            closed_portal: () => {
                return require(`../assets/images/portal-sealed.svg`).default;
            },
            open_portal: () => {
                return require(`../assets/images/portal-open.svg`).default;
            },
            aavegotchi: () => returnAavegotchi(),
            consumable: () => returnWearable(),
            ticket: () => returnTicket.call(this)
        };

        function returnWearable() {
            try {
                return require(`../assets/wearables/${item.erc1155TypeId}.svg`).default;
            } catch (error) {
                return require(`../assets/images/no-image2.svg`).default;
            }
        }

        function returnAavegotchi() {
            try {
                return require(`../assets/svgs/${item.tokenId}.svg`).default;
            } catch (error) {
                return require(`../assets/images/no-image2.svg`).default;
            }
        }

        function returnTicket() {
            try {
                return require(`../assets/tickets/${this.getBaazaarItemRarityName(item)}.svg`).default;
            } catch (error) {
                return require(`../assets/images/no-image2.svg`).default;
            }
        }

        return typeMap[this.getItemType(item)]();
    },

    getWearableImg(id) {
        try {
            return require(`../assets/wearables/${id}.svg`).default;
        } catch (error) {
            return require(`../assets/images/no-image2.svg`).default;
        }
    },

    getItemUrl(item) {
        try {
            return `https://aavegotchi.com/baazaar/${item.__typename === "ERC1155Listing" ? 'erc1155' : 'erc721'}/${item.id}`;
        } catch (error) {
            console.error(error);
            return 'https://aavegotchi.com/baazaar';
        }
    }
}