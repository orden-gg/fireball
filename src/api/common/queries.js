export const gotchiesQuery = (skip, orderDir, hauntId) => {
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
        }
    }`
};

export const gotchiByIdQuery = (id) => {
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
    }
  }`
}

export const userQuery = (id, skip) => {
    return `{
        user(id: "${id}") {
          id
          gotchisOwned(first: 1000, skip: ${skip}, where: {status: 3}) {
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
          }
        }
    }`
};

export const svgQuery = (id) => {
    return `{
        aavegotchis(where: {id: ${id}}) {
          id
          svg
        }
      }`
};

export const erc1155Query = (id, sold, category, orderBy, orderDireciton) => {
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
  }`
};

export const erc721ListingsBySeller = (seller) => {
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
    }`
};

export const erc1155ListingsBySeller = (seller) => {
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
    }`
};

export const realmQuery = (address, skip) => {
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
    }`
};

export const parselQuery = (id) => {
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
  }`
};

export const activeListingQeury = (erc, id, type, category) => {
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
        }`
};

export const erc721SalesHistory = (id, category) => {
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
    }`
}

export const getParcelOrderDirectionQuery = data => {
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
    }`
  }

export const auctionQuery = (id) => {
    return `{
      auctions(first: 1, where: { id: "${id}" }) {
        id
        highestBid
      }
    }`
};

export const listedParcelsQuery = (skip, orderDir, size) => {
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
    }`
};

export const raffleQuery = (id) => {
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
  }`
};

export const raffleEntrantsQuery = (address) => {
    return `{
      raffleEntrants(where: { address: "${address}" }) {
        id
        ticketId
        quantity
        raffle {
          id
        }
      }
    }`
};

export const raffleWinsQuery = (address) => {
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
    }`
};

export const lendingsQuery = (skip, orderDir) => {
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
            modifiedRarityScore
        }
        lender
        borrower
        whitelistId
        tokensToShare
        splitOther
        splitBorrower
        splitOwner
      }
    }`
};

export const lendingsByAddressQuery = (address, skip) => {
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
        }
        lender
        borrower
        whitelistId
        tokensToShare
        splitOther
        splitBorrower
        splitOwner
      }
    }`
};

export const incomeQuery = (id, timestamp) => {
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
      }`
};

// ! Gotchiverse queries

export const gotchisGotchiverseQuery = (gotchis) => {
    return `{
        gotchis(
            first: ${gotchis.length},
            where: { id_in: ${JSON.stringify(gotchis)}
        })  {
          id
          lastChanneledAlchemica
        }
      }`
};

export const parcelsGotchiverseQuery = (parcels) => {
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
      }`
};
