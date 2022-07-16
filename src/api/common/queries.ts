export const gotchiesQuery = (skip: any, orderDir: any, hauntId: any): any => {
    return `{
        aavegotchis(
          first: 1000,
          skip: ${skip},
          orderBy: id,
          orderDirection: ${orderDir},
          where: {status: 3, owner_not: "0x0000000000000000000000000000000000000000", hauntId: ${hauntId}}
        ) {
          id
          name
          numericTraits
          modifiedNumericTraits
          withSetsNumericTraits
          baseRarityScore
          modifiedRarityScore
          withSetsRarityScore
          kinship
          toNextLevel
          level
          experience
          equippedWearables
          collateral
          hauntId
          createdAt
          possibleSets
          equippedSetID
          equippedSetName
          usedSkillPoints
          listings(where:{cancelled: false, timePurchased: 0}) {
            id
            priceInWei
          }
          historicalPrices
          owner {
            id
          }
          originalOwner {
            id
          }
          lending
        }
    }`;
};

export const gotchiByIdQuery = (id: any): any => {
  return `{
    aavegotchi(id: ${id}) {
      id
      hauntId
      name
      numericTraits
      equippedWearables
      owner {
        id
      }
      originalOwner {
        id
      }
    }
  }`;
};

export const userQuery = (id: any, skip: any): any => {
    return `{
        user(id: "${id}") {
          id
          gotchisOriginalOwned(first: 1000, skip: ${skip}, where: {status: 3}) {
            id
            name
            numericTraits
            modifiedNumericTraits
            withSetsNumericTraits
            baseRarityScore
            modifiedRarityScore
            withSetsRarityScore
            kinship
            equippedWearables
            experience
            level
            toNextLevel
            collateral
            hauntId
            createdAt
            possibleSets
            equippedSetID
            equippedSetName
            usedSkillPoints
            listings(where:{cancelled: false, timePurchased: 0}) {
              id
              priceInWei
            }
            historicalPrices
            owner {
              id
            }
            lending
          }
        }
    }`;
};

export const userOwnedGotchisQuery = (address: string, skip: number): string => {
    return `{
        user(id: "${address}") {
          id
          gotchisOwned(first: 1000, skip: ${skip}, where: {status: 3, originalOwner: null}) {
            id
            name
            numericTraits
            modifiedNumericTraits
            withSetsNumericTraits
            baseRarityScore
            modifiedRarityScore
            withSetsRarityScore
            kinship
            equippedWearables
            experience
            level
            toNextLevel
            collateral
            hauntId
            createdAt
            possibleSets
            equippedSetID
            equippedSetName
            usedSkillPoints
            listings(where:{cancelled: false, timePurchased: 0}) {
              id
              priceInWei
            }
            historicalPrices
            owner {
              id
            }
            lending
          }
        }
    }`;
};

export const svgQuery = (id: any): any => {
    return `{
        aavegotchis(where: {id: ${id}}) {
          id
          svg
        }
      }`;
};

export const erc1155Query = (id: any, sold: any, category: any, orderBy: any, orderDireciton: any): any => {
  return `{
      erc1155Listings (
          first: 1,
          orderBy: ${orderBy},
          orderDirection: ${orderDireciton},
          where: {
              cancelled: false,
              sold: ${sold},
              category: ${category},
              erc1155TypeId: ${id}
          }
      ){
          id
          priceInWei
          timeLastPurchased
      }
  }`;
};

export const erc721ListingsBySeller = (seller: any): any => {
    return `{
        erc721Listings(
            where: {
                seller: "${seller}",
                cancelled: false,
                timePurchased: 0
            }
        )
        {
            id
            tokenId
            category
            priceInWei
            gotchi {
                id
                name
                numericTraits
                modifiedNumericTraits
                withSetsNumericTraits
                baseRarityScore
                modifiedRarityScore
                withSetsRarityScore
                kinship
                toNextLevel
                level
                experience
                equippedWearables
                collateral
                hauntId
                createdAt
                possibleSets
                equippedSetID
                equippedSetName
                usedSkillPoints
                listings(where: { cancelled: false, timePurchased: 0 }) {
                    id
                    priceInWei
                }
                historicalPrices
                owner {
                    id
                }
            }
            parcel {
                parcelId
                parcelHash
                tokenId
                coordinateX
                coordinateY
                district
                fudBoost
                fomoBoost
                alphaBoost
                kekBoost
                size
                auctionId
                historicalPrices
                owner {
                    id
                }
            }
            portal {
                hauntId
                historicalPrices
            }
        }
    }`;
};

export const erc1155ListingsBySeller = (seller: any): any => {
    return `{
        erc1155Listings(
            where: {
                seller: "${seller}",
                cancelled: false,
                timeLastPurchased: 0
            }
        )
        {
            id
            erc1155TypeId
            category
            quantity
            priceInWei
            rarityLevel
        }
    }`;
};

export const realmQuery = (address: any, skip: any): any => {
    return `{
      parcels(first: 1000, skip: ${skip}, where: { owner: "${address}" }) {
        tokenId
        parcelId
        owner {
          id
        }
        coordinateX
        coordinateY
        size
        district
        parcelHash
        fudBoost
        fomoBoost
        alphaBoost
        kekBoost
        timesTraded
        historicalPrices
        activeListing
      }
    }`;
};

export const realmQueryByDistrict = (skip: any, district: any): any => {
    return `{
      parcels(first: 1000, skip: ${skip}, where: { district: ${district}}) {
        tokenId
        parcelId
        owner {
          id
        }
        coordinateX
        coordinateY
        size
        district
        parcelHash
        fudBoost
        fomoBoost
        alphaBoost
        kekBoost
        timesTraded
        historicalPrices
        activeListing
        auctionId
      }
    }`;
};

export const parselQuery = (id: any): any => {
  return `{
    parcel( id: ${id}) {
      tokenId
      parcelId
      owner {
        id
      }
      coordinateX
      coordinateY
      size
      district
      parcelHash
      fudBoost
      fomoBoost
      alphaBoost
      kekBoost
      timesTraded
      historicalPrices
      activeListing
    }
  }`;
};

export const activeListingQeury = (erc: any, id: any, type: any, category: any): any => {
    return `{
        ${erc}Listings(
                where: {
                    category: "${category}"
                    ${type}: "${id}"
                    cancelled: false
                    timePurchased: 0
                }
            ) {
                id
                priceInWei
            }
        }`;
};

export const erc721SalesHistory = (id: any, category: any): any => {
    return `{
        erc721Listings(
            where:{
                tokenId_in: ["${id}"]
                category: "${category}"
                timePurchased_not: 0
            },
            orderBy: timePurchased,
            orderDirection: desc,
        ) {
            buyer
            seller
            timePurchased
            priceInWei
        }
    }`;
};

export const getParcelOrderDirectionQuery = (data: any): any => {
    return `{
        erc721Listings(
            first: 1,
            orderBy: priceInWei,
            orderDirection: ${data.direction},
            where: {
                size: "${data.size}",
                category: "4",
                cancelled: false,
                timePurchased: 0,
            }
        ){
            id
            priceInWei
            size
        }
    }`;
  };

export const auctionQuery = (id: any): any => {
    return `{
      auctions(first: 1, where: { id: "${id}" }) {
        id
        highestBid
      }
    }`;
};

export const listedParcelsQuery = (skip: any, orderDir: any, size: any): any => {
    return `{
        erc721Listings(
            first: 1000,
            skip: ${skip},
            orderDirection: ${orderDir},
            orderBy: timeCreated,
            where: {
                category: "4",
                size: ${size},
                priceInWei_lt: "10000000000000000000000000",
                timePurchased: 0,
                cancelled: false
            }
        ) {
            id
            tokenId
            category
            priceInWei
            seller
            timePurchased
            timeCreated
            cancelled
            erc721TokenAddress
            blockCreated
            parcel {
                id
                tokenId
                parcelId
                parcelHash
                owner {
                    id
                }
                district
                fudBoost
                fomoBoost
                alphaBoost
                kekBoost
                size
                timesTraded
                historicalPrices
                coordinateX
                coordinateY
            }
        }
    }`;
};

export const raffleQuery = (id: any): any => {
  return `{
    raffles(where: {id: "${id}" }) {
      ticketPools {
        id
        prizes{
          id
          quantity
        }
      }
      stats {
        totalCommon
        totalUncommon
        totalRare
        totalLegendary
        totalMythical
        totalGodLike
        totalDrop
      }
    }
  }`;
};

export const raffleEntrantsQuery = (address: any): any => {
    return `{
      raffleEntrants(where: { address: "${address}" }) {
        id
        ticketId
        quantity
        raffle {
          id
        }
      }
    }`;
};

export const raffleWinsQuery = (address: any): any => {
    return `{
      raffleWinners(where: { address: "${address}" }) {
        id
        item{
          id
        }
        raffle {
          id
        }
        quantity
      }
    }`;
};

export const lendingsQuery = (skip: any, orderDir: any): any => {
    return `{
      gotchiLendings(
          first: 1000,
          skip: ${skip},
          orderBy: "timeCreated",
          orderDirection: ${orderDir},
          where: {
            borrower: "0x0000000000000000000000000000000000000000",
            cancelled: false
        }
      ) {
        id
        timeCreated
        rentDuration
        upfrontCost
        period
        gotchi {
            id
            name
            collateral
            kinship
            hauntId
            baseRarityScore
            modifiedRarityScore,
            toNextLevel
            level
        }
        lender
        borrower
        whitelistId
        tokensToShare
        splitOther
        splitBorrower
        splitOwner
      }
    }`;
};

export const lendingsByAddressQuery = (address: any, skip: any): any => {
    return `{
      gotchiLendings(
        first: 1000,
        skip: ${skip},
        where:{
            lender: "${address}",
            borrower_not: "0x0000000000000000000000000000000000000000",
            cancelled: false,
            completed: false
        }
      ) {
        id
        timeCreated
        timeAgreed
        rentDuration
        upfrontCost
        period
        lastClaimed
        completed
        gotchi {
            id
            name
            collateral
            kinship
            hauntId
            baseRarityScore
            modifiedRarityScore
            escrow
            numericTraits
            modifiedNumericTraits
            withSetsNumericTraits
            withSetsRarityScore
            equippedWearables
            possibleSets
            equippedSetID
            equippedSetName
            toNextLevel
            level
        }
        lender
        borrower
        whitelistId
        tokensToShare
        splitOther
        splitBorrower
        splitOwner
      }
    }`;
};

export const borrowedByAddressQuery = (address: any, skip: any): any => {
    return `{
      gotchiLendings(
        first: 1000,
        skip: ${skip},
        where:{
            borrower: "${address}",
            cancelled: false,
            completed: false
        }
      ) {
        id
        timeCreated
        timeAgreed
        rentDuration
        upfrontCost
        period
        lastClaimed
        completed
        gotchi {
            id
            name
            collateral
            kinship
            hauntId
            baseRarityScore
            modifiedRarityScore
            escrow
            numericTraits
            modifiedNumericTraits
            withSetsNumericTraits
            withSetsRarityScore
            equippedWearables
            possibleSets
            equippedSetID
            equippedSetName
            toNextLevel
            level
        }
        lender
        borrower
        whitelistId
        tokensToShare
        splitOther
        splitBorrower
        splitOwner
      }
    }`;
};

export const incomeQuery = (id: any, timestamp: any): any => {
    return `{
        vortexClaims(
            first: 1000,
            where:{
                gotchiId: "${id}",
                timestamp_gt: "${timestamp}"
            }
        ) {
          gotchiId
          FUDAmount
          FOMOAmount
          ALPHAAmount
          KEKAmount
        }
      }`;
};

// ! Gotchiverse queries

export const gotchisGotchiverseQuery = (gotchis: any): any => {
    return `{
        gotchis(
            first: ${gotchis.length},
            where: { id_in: ${JSON.stringify(gotchis)}
        })  {
          id
          lastChanneledAlchemica
        }
      }`;
};

export const parcelsGotchiverseQuery = (parcels: any): any => {
    return `{
        parcels(
            first: ${parcels.length},
            where: { id_in: ${JSON.stringify(parcels)}
        }) {
          id
          lastChanneledAlchemica
          equippedInstallations {
            id
            alchemicaType
            upgradeQueueBoost
            deprecated
          }
        }
      }`;
};

export const parcelsOwnerGotchiverseQuery = (owner: any): any => {
    return `{
        parcels(
            first: 1000,
            where: { owner: "${owner}" }
        ) {
          id
          lastChanneledAlchemica
          equippedInstallations {
            id
            alchemicaType
            upgradeQueueBoost
            deprecated
          }
        }
      }`;
};
