import { useCallback, useState } from 'react';

import classNames from 'classnames';

import { CustomModal } from 'components/CustomModal/CustomModal';
import { CardSalesHistory } from 'components/ItemCard/components';

import { GotchiverseUtils } from 'utils';

import { ERC721Listing } from '../Items/ERC721Listing/ERC721Listing';
import { FlipButton } from './FlipButton/FlipButton';
import { GotchiBadges } from './GotchiBadges/GotchiBadges';
import { GotchiChanelling } from './GotchiChanneling/GotchiChanneling';
import { GotchiCollateral } from './GotchiCollateral/GotchiCollateral';
import { GotchiIdentity } from './GotchiIdentity/GotchiIdentity';
import { GotchiImage } from './GotchiImage/GotchiImage';
import { GotchiKinship } from './GotchiKinship/GotchiKinship';
import { GotchiLending } from './GotchiLending/GotchiLending';
import { GotchiLendingStats } from './GotchiLendingStats/GotchiLendingStats';
import { GotchiLevel } from './GotchiLevel/GotchiLevel';
import { GotchiName } from './GotchiName/GotchiName';
import { GotchiOwner } from './GotchiOwner/GotchiOwner';
import { GotchiPreviewModal } from './GotchiPreviewModal/GotchiPreviewModal';
import { GotchiRs } from './GotchiRs/GotchiRs';
import { GotchiSkillPoints } from './GotchiSkillPoints/GotchiSkillPoints';
import { GotchiTraits } from './GotchiTraits/GotchiTraits';
import { GotchiWearablesLine } from './GotchiWearablesLine/GotchiWearablesLine';
import { GuildIcon } from './GuildIcon/GuildIcon';
import { WhitelistId } from './WhitelistId/WhitelistId';
import { styles } from './styles';

interface GotchiProps {
  gotchi: CustomAny;
  render: CustomAny;
  renderSvgByStats?: CustomAny;
  portal?: CustomAny;
  isHighlightLending?: boolean;
  className?: string;
  shouldLoadGotchiInModal?: boolean;
}

export function Gotchi({
  gotchi,
  renderSvgByStats,
  render,
  portal,
  isHighlightLending,
  className,
  shouldLoadGotchiInModal = true
}: GotchiProps) {
  const classes = styles();

  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const flipCard = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();

      setIsFlipped(!isFlipped);
    },
    [isFlipped]
  );

  const gotchiSections = {
    wrapper: (children: CustomAny, className?: CustomAny) => {
      return (
        <div className={className && classes[className]} key={`${gotchi.id}-${className}`}>
          {children}
        </div>
      );
    },

    get channeling() {
      return <GotchiChanelling gotchiId={gotchi.id} key={`${gotchi.id}-channeling`} />;
    },

    get guild() {
      return gotchi.guild && <GuildIcon guildName={gotchi.guild} key={`${gotchi.id}-guildIcon`} />;
    },

    get whitelistId() {
      return (
        gotchi.whitelistId && <WhitelistId whitelistId={gotchi.whitelistId} key={`${gotchi.whitelistId}-whitelistId`} />
      );
    },

    get rs() {
      return <GotchiRs gotchi={gotchi} key={`${gotchi.id}-rs`} />;
    },

    get kinship() {
      return <GotchiKinship gotchi={gotchi} key={`${gotchi.id}-kinship`} />;
    },

    get owner() {
      return <GotchiOwner gotchi={gotchi} key={`${gotchi.id}-owner`} />;
    },

    get identity(): JSX.Element {
      return <GotchiIdentity identityQuantity={gotchi.identity?.claimed?.length} key={`${gotchi.id}-identity`} />;
    },

    get collateral() {
      return <GotchiCollateral collateral={gotchi.collateral} key={`${gotchi.id}-collateral`} />;
    },

    get level() {
      return (
        <GotchiLevel
          level={gotchi.level}
          toNextLevel={gotchi.toNextLevel}
          experience={gotchi.experience}
          key={`${gotchi.id}-level`}
        />
      );
    },

    get badges() {
      return <GotchiBadges badges={gotchi.badges} key={`${gotchi.id}-badges`} />;
    },

    get skillpoints() {
      return <GotchiSkillPoints id={gotchi.id} usedPoints={gotchi.usedSkillPoints} key={`${gotchi.id}-skillpoints`} />;
    },

    get traits() {
      return (
        <GotchiTraits
          traits={gotchi.numericTraits}
          currentTraits={gotchi.modifiedNumericTraits}
          key={`${gotchi.id}-traits`}
        />
      );
    },

    get wearablesLine() {
      return (
        <div className={classes.gotchiInnerSection} key={`${gotchi.id}-wearablesLine`}>
          <GotchiWearablesLine gotchi={gotchi} />
        </div>
      );
    },

    get name() {
      return <GotchiName gotchi={gotchi} key={`${gotchi.id}-name`} />;
    },

    get svg() {
      return (
        <div key={`${gotchi.id}-svg`}>
          <GotchiImage gotchi={gotchi} renderSvgByStats={renderSvgByStats} portal={portal} />
        </div>
      );
    },

    get lending() {
      return <GotchiLending gotchi={gotchi} key={`${gotchi.id}-lending`} />;
    },

    get lendingStats() {
      return <GotchiLendingStats gotchi={gotchi} key={`${gotchi.id}-lending-stats`} />;
    },

    get listing() {
      return (
        <ERC721Listing
          key={`${gotchi.id}-listing`}
          listings={gotchi.listings}
          historicalPrices={gotchi.historicalPrices}
        />
      );
    },

    get saleHistory() {
      return (
        <CardSalesHistory
          key={`${gotchi.id}-saleHistory`}
          listing={{
            seller: gotchi.seller,
            buyer: gotchi.buyer,
            timePurchased: gotchi.timePurchased
          }}
        />
      );
    },

    get flipButton() {
      return <FlipButton key={`${gotchi.id}-flipButton`} onFlipCard={flipCard} />;
    }
  };

  function renderSection(value: CustomAny) {
    if (typeof value === 'string') {
      return gotchiSections[value];
    } else {
      return gotchiSections.wrapper(
        value.items.map((item: CustomAny) => renderSection(item)),
        value.className
      );
    }
  }

  return (
    <>
      <div
        className={classNames(
          classes.gotchi,
          `haunt${gotchi.hauntId}`,
          'vertical',
          className,
          GotchiverseUtils.getRarityNameByRS(gotchi.modifiedRarityScore),
          gotchi.lending && isHighlightLending && 'lended',
          isFlipped && classes.gotchiIsFlipped
        )}
        onClick={() => setIsPreviewOpen(true)}
      >
        {gotchi.lending && isHighlightLending && <div className={classes.statusBadge}>Lended</div>}
        {render.map((name: CustomAny) => {
          return renderSection(name);
        })}
      </div>
      <CustomModal modalOpen={isPreviewOpen} setModalOpen={setIsPreviewOpen}>
        <GotchiPreviewModal
          id={shouldLoadGotchiInModal ? gotchi.id : null}
          gotchi={!shouldLoadGotchiInModal ? gotchi : null}
        />
      </CustomModal>
    </>
  );
}
