// animated
import ghstTokenGif from 'assets/images/animated/ghst-token.gif';
import gotchiHeartGif from 'assets/images/animated/gotchi-heart.gif';
import gotchiLoadingGif from 'assets/images/animated/gotchi-loading.gif';
import gotchiverseGif from 'assets/images/animated/gotchiverse.gif';
import h1OpenedPortalGif from 'assets/images/animated/h1-opened.gif';
import realmGif from 'assets/images/animated/realm.gif';

// icons
import activity from 'assets/images/icons/activity.svg';
import alpha from 'assets/images/icons/alpha.svg';
import anvil from 'assets/images/icons/anvil.svg';
import baazar from 'assets/images/icons/baazar.svg';
import badge from 'assets/images/icons/badge.svg';
import glossary from 'assets/images/icons/glossary.svg';
import fakeGotchis from 'assets/images/icons/fake-gotchis.svg';
import fakeGotchisCard from 'assets/images/icons/fake-gotchis-card.png';
import channel from 'assets/images/icons/channel.svg';
import channelActive from 'assets/images/icons/channel-active.svg';
import consumable from 'assets/images/icons/consumable.svg';
import controller from 'assets/images/wearables/204.svg';
import craft from 'assets/images/icons/craft.svg';
import discord from 'assets/images/icons/discord.svg';
import fomo from 'assets/images/icons/fomo.svg';
import fud from 'assets/images/icons/fud.svg';
import gotchi from 'assets/images/gotchi-placeholder.svg';
import { ReactComponent as Guild } from 'assets/images/icons/guild.svg';
import gotchiland from 'assets/images/icons/gotchiland.png';
import ghst from 'assets/images/icons/ghst.svg';
import kek from 'assets/images/icons/kek.svg';
import listing from 'assets/images/icons/listing.svg';
import logo from 'assets/images/icons/logo-white.svg';
import logoMobile from 'assets/images/icons/logo-mobile.svg';
import land from 'assets/images/icons/land.svg';
import { ReactComponent as Lending } from 'assets/images/icons/lending.svg';
import metamask from 'assets/images/icons/metamask.svg';
import purchase from 'assets/images/icons/purchase.svg';
import purpleGrass from 'assets/images/icons/purple_grass.svg';
import { ReactComponent as Reload } from 'assets/images/icons/reload.svg';
import sold from 'assets/images/icons/sold.svg';
import firegem from 'assets/images/icons/firegem.svg';
import twitch from 'assets/images/icons/twitch.svg';
import rareTicket from 'assets/images/tickets/rare.svg';
import warehouse from 'assets/images/wearables/15.svg';

// portals
import h1SealedPortal from 'assets/images/portals/h1-sealed.svg';
import h1OpenedPortal from 'assets/images/portals/h1-opened.svg';
import h2SealedPortal from 'assets/images/portals/h2-sealed.svg';
import h2OpenedPortal from 'assets/images/portals/h2-opened.svg';

// tokens
import alphaToken from 'assets/images/tokens/alpha-token.svg';
import fomoToken from 'assets/images/tokens/fomo-token.svg';
import fudToken from 'assets/images/tokens/fud-token.svg';
import ghstToken from 'assets/images/tokens/ghst-token.svg';
import maticToken from 'assets/images/tokens/matic-token.svg';
import gltrToken from 'assets/images/tokens/gltr-token.svg';
import kekToken from 'assets/images/tokens/kek-token.svg';
import daiToken from 'assets/images/tokens/dai-token.svg';

// traits
import aggression from 'assets/images/traits/agg.png';
import brain from 'assets/images/traits/brn.png';
import eyeColor from 'assets/images/traits/eyc.png';
import eyeShape from 'assets/images/traits/eys.png';
import energy from 'assets/images/traits/nrg.png';
import spookiness from 'assets/images/traits/spk.png';

// card icons
import anvilCard from 'assets/images/navigation/anvil.jpg';
import clientCard from 'assets/images/navigation/client.jpg';
import craftCard from 'assets/images/navigation/craft.jpg';
import explorerCard from 'assets/images/navigation/explorer.jpg';
import fakeGalleryCard from 'assets/images/navigation/fakegallery.jpg';
import glossaryCard from 'assets/images/navigation/glossary.jpg';
import guildsCard from 'assets/images/navigation/guilds.jpg';
import lendCard from 'assets/images/navigation/lend.jpg';
import mapCard from 'assets/images/navigation/map.jpg';
import marketCard from 'assets/images/navigation/market.jpg';
import rafflesCard from 'assets/images/navigation/raffles.jpg';

interface IconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}

// animated
export const GhstTokenGif = ({ width, height, className }: IconProps) => {
  return <img className={className} width={width} height={height} src={ghstTokenGif} alt='ghst token' />;
};

export const GotchiHeartGif = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={gotchiHeartGif} alt='gotchi heart' />;
};

export const GotchiLoadingGif = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={gotchiLoadingGif} alt='gotchi loading...' />;
};

export const GotchiverseGif = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={gotchiverseGif} alt='gotchiverse loader' />;
};

export const H1OpenedPortalGif = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={h1OpenedPortalGif} alt='H1 opened portal' />;
};

export const RealmGif = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={realmGif} alt='realm' />;
};

// icons
export const ActivityIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={activity} alt='activity' />;
};

export const AlphaIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={alpha} alt='alpha' />;
};

export const BaazarIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={baazar} alt='baazar' />;
};

export const BadgeIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={badge} alt='badge' />;
};

export const GlossaryIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={glossary} alt='glossary' />;
};

export const FakeGotchisIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={fakeGotchis} alt='fake gotchis' />;
};

export const FakeGotchisCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={fakeGotchisCard} alt='fake gotchi card' />;
};

export const FomoIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={fomo} alt='fomo' />;
};

export const FudIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={fud} alt='fud' />;
};

export const ChannelIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={channel} alt='channel' />;
};

export const ChannelActiveIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={channelActive} alt='channel active' />;
};

export const ConsumableIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={consumable} alt='consumable' />;
};

export const CraftIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={craft} alt='craft' />;
};

export const DiscordIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={discord} alt='discord' />;
};

export const GotchiIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={gotchi} alt='gotchi' />;
};

export const GuildIcon = ({ className, width, height }: IconProps) => {
  return <Guild className={className} width={width} height={height} />;
};

export const GotchilandIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={gotchiland} alt='gotchiland logo' />;
};

export const LendingIcon = ({ className, width, height }: IconProps) => {
  return <Lending className={className} width={width} height={height} />;
};

export const LandIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={land} alt='land' />;
};

export const KekIcon = ({ width, height, alt }: IconProps) => {
  return <img width={width} height={height} src={kek} alt={alt ?? 'kek'} />;
};

export const GhstIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={ghst} alt='ghst' />;
};

export const TwitchIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={twitch} alt='twitch' />;
};

export const RareTicketIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={rareTicket} alt='ticket' />;
};

export const WarehouseIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={warehouse} alt='warehouse' />;
};

export const GameControllerIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={controller} alt='game controller' />;
};

// portals
export const H1SealedPortalIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={h1SealedPortal} alt='H1 sealed portal' />;
};

export const H1OpenedPortalIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={h1OpenedPortal} alt='H1 opened portal' />;
};

export const H2SealedPortalIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={h2SealedPortal} alt='H2 sealed portal' />;
};

export const H2OpenedPortalIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={h2OpenedPortal} alt='H2 opened portal' />;
};

// tokens
export const AlphaTokenIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={alphaToken} alt='alpha' />;
};

export const FomoTokenIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={fomoToken} alt='fomo' />;
};

export const FudTokenIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={fudToken} alt='fud' />;
};

export const GhstTokenIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={ghstToken} alt='ghst' />;
};

export const MaticTokenIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={maticToken} alt='matic' />;
};

export const GltrTokenIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={gltrToken} alt='gltrToken' />;
};

export const KekTokenIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={kekToken} alt='kek' />;
};

export const DaiTokenIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={daiToken} alt='dai' />;
};

export const ListingIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={listing} alt='listing' />;
};

export const LogoIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={logo} alt='logo' />;
};

export const MobileLogoIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={logoMobile} alt='logo part' />;
};

export const MetamaskIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={metamask} alt='metamask' />;
};

export const PurchaseIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={purchase} alt='purchase' />;
};

export const PurpleGrassIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={purpleGrass} alt='purple grass' />;
};

export const ReloadIcon = ({ width, height }: IconProps) => {
  return <Reload width={width || 24} height={height || 24} />;
};

export const SoldIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={sold} alt='sold' />;
};

export const FiregemIcon = ({ className, width, height }: IconProps) => {
  return <img className={className} width={width} height={height} src={firegem} alt='firegem' />;
};

export const AnvilIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={anvil} alt='anvil' />;
};

// traits
export const AggressionIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={aggression} alt='aggression' />;
};

export const BrainIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={brain} alt='brain' />;
};

export const EyeColorIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={eyeColor} alt='eye color' />;
};

export const EyeShapeIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={eyeShape} alt='eye shape' />;
};

export const EnergyIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={energy} alt='energy' />;
};

export const SpookinessIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={spookiness} alt='spookiness' />;
};

// card icons
export const AnvilCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={anvilCard} alt='anvil' />;
};

export const ClientCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={clientCard} alt='client' />;
};

export const CraftCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={craftCard} alt='craft' />;
};

export const ExplorerCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={explorerCard} alt='explorer' />;
};

export const FakeGalleryCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={fakeGalleryCard} alt='fakeGallery' />;
};

export const GlossaryCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={glossaryCard} alt='glossary' />;
};

export const GuildsCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={guildsCard} alt='guilds' />;
};

export const LendCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={lendCard} alt='lend' />;
};

export const MapCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={mapCard} alt='map' />;
};

export const MarketCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={marketCard} alt='market' />;
};

export const RafflesCardIcon = ({ width, height }: IconProps) => {
  return <img width={width} height={height} src={rafflesCard} alt='raffles' />;
};
