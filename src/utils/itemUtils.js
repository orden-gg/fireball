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

    getItemSlotById(id) {
        return items[id]?.slot || '';
    },

    getEmojiStatsById(id) {
        let stats = items[id]?.stats;
        let emojis = {'NRG':'⚡️', 'AGG':'👹', 'SPK':'👻', 'BRN':'🧠', 'EYS':'👀', 'EYC':'👁'};

        if (!stats) return null;

        Object.entries(emojis).forEach((item) => {
            let [key, value] = item;

            if (stats.includes(key)) {
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
                return require(`../assets/images/portals/h1-sealed.svg`).default;
            },
            open_portal: () => {
                return require(`../assets/images/portals/h1-open.svg`).default;
            },
            realm: () => {
                return require(`../assets/images/portals/h1-sealed.svg`).default;
            },
            consumable: () => returnWearable(),
            ticket: () => returnTicket.call(this)
        };

        function returnWearable() {
            try {
                return require(`../assets/images/wearables/${item.erc1155TypeId}.svg`).default;
            } catch (error) {
                return require(`../assets/images/image-placeholder.svg`).default;
            }
        }

        function returnTicket() {
            try {
                return require(`../assets/images/tickets/${this.getBaazaarItemRarityName(item)}.svg`).default;
            } catch (error) {
                return require(`../assets/images/image-placeholder.svg`).default;
            }
        }

        return typeMap[this.getItemType(item)]();
    },

    getPortalImg(hauntId) {
        try {
            return require(`../assets/images/portals/h${hauntId}-open.svg`).default;
        } catch (error) {
            return require(`../assets/images/image-placeholder.svg`).default;
        }
    },

    getWearableImg(id) {
        try {
            return require(`../assets/images/wearables/${id}.svg`).default;
        } catch (error) {
            return require(`../assets/images/image-placeholder.svg`).default;
        }
    },

    getTicketImg(name) {
        try {
            return require(`../assets/images/tickets/${name}.svg`).default;
        } catch (error) {
            return require(`../assets/images/image-placeholder.svg`).default;
        }
    },

    getItemUrl(item) {
        try {
            return `https://app.aavegotchi.com/baazaar/${item.__typename === "ERC1155Listing" ? 'erc1155' : 'erc721'}/${item.id}`;
        } catch (error) {
            console.error(error);
            return 'https://app.aavegotchi.com/baazaar';
        }
    },

    getTicketFrensPrice(rarity) {
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
    },

    getSlotCaption(name) {
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
    },

    getParcelSize(id) {
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
            default:
                return '';
        }
    },

    getParcelDimmentions(id) {
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
            default:
                return '';
        }
    },

    getAlchemicaImg(name) {
        try {
            return require(`../assets/images/icons/${name}.png`).default;
        } catch (error) {
            return require(`../assets/images/image-placeholder.svg`).default;
        }
    },
}
