import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const assets = {
  hero: '/assets/hero-editorial.jpg',
  campaign: '/assets/campaign-still.jpg',
  city: '/assets/lookbook-city.jpg',
  fabric: '/assets/fabric-sculpture.jpg',
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price?: number;
  mrp?: number;
  category: string;
  collection: string;
  sku?: string;
  images: string[];
  video?: string;
  sizes: string[];
  colors: string[];
  stock?: number;
  fabric?: string;
  fit?: string;
  careInstructions?: string;
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
};

type CinematicVideoProps = {
  desktopSource?: string;
  mobileSource?: string;
  poster: string;
  title: string;
};

function CinematicVideo({ desktopSource, mobileSource, poster, title }: CinematicVideoProps) {
  return <div className="cinematic-video" aria-label={title} data-cursor="PLAY">
    {desktopSource && <video className="video-desktop" src={desktopSource} poster={poster} autoPlay muted loop playsInline preload="none" />}
    {mobileSource && <video className="video-mobile" src={mobileSource} poster={poster} autoPlay muted loop playsInline preload="none" />}
    <img src={poster} alt={title} loading="lazy" />
  </div>;
}

const collections = [
  { slug: 'everyday-essentials', title: 'Everyday Essentials', number: '01', description: 'Pieces designed to become part of your everyday.', image: assets.hero, tone: 'ash' },
  { slug: 'culture', title: 'Culture', number: '02', description: 'Stories, characters and worlds translated into something you can wear.', image: assets.campaign, tone: 'cream' },
  { slug: 'spidey', title: 'Spidey', number: '03', description: 'Energy. Movement. Attitude.', image: assets.city, tone: 'rust' },
  { slug: 'statement', title: 'Statement', number: '04', description: 'For when understated does not mean invisible.', image: assets.fabric, tone: 'ink' },
];

const socials = [
  ['Instagram', 'https://www.instagram.com/theunderstated.store'],
  ['Pinterest', 'https://pin.it/268ORjNRY'],
  ['Threads', 'https://www.threads.com/@theunderstated.store'],
  ['YouTube', 'https://youtube.com/@theunderstated-r5i'],
  ['WhatsApp Community', 'https://chat.whatsapp.com/Jl8HqZHQ2Aw2pTq0kGm36N'],
  ['WhatsApp Channel', 'https://whatsapp.com/channel/0029Vb8WOV4KwqSPjEyvmr3j'],
  ['Facebook', 'https://www.facebook.com/share/1DsaSiSDwi/'],
];

function Meta({ title, description = 'The Understated — contemporary clothing, culture-driven pieces and modern streetwear. Luxury, without the noise.' }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = `${title} — THE UNDERSTATED`;
    const setMeta = (name: string, content: string) => {
      let node = document.querySelector(`meta[name="${name}"]`);
      if (!node) { node = document.createElement('meta'); node.setAttribute('name', name); document.head.appendChild(node); }
      node.setAttribute('content', content);
    };
    setMeta('description', description);
    setMeta('theme-color', '#171615');
  }, [title, description]);
  return null;
}

function Header({ onSearch, onMenu, onCart }: { onSearch: () => void; onMenu: () => void; onCart: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', listener, { passive: true });
    listener();
    return () => window.removeEventListener('scroll', listener);
  }, []);
  const dark = location === '/' && !scrolled;
  return (
    <header className={`site-header ${dark ? 'header-over-hero' : ''}`} data-testid="site-header">
      <div className="announcement"><span>Free shipping</span><span className="announcement-dot" /> <span>The first drop is coming</span></div>
      <div className="header-inner">
        <button className="mobile-menu-button icon-button" onClick={onMenu} aria-label="Open menu" data-testid="button-open-menu"><Menu size={18} /></button>
        <Link href="/" className="wordmark" data-testid="link-logo"><span>THE</span> UNDERSTATED</Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/shop" data-testid="link-shop">Shop</Link>
          <Link href="/collections" data-testid="link-collections">Collections</Link>
          <Link href="/lookbook" data-testid="link-lookbook">Lookbook</Link>
          <Link href="/about" data-testid="link-about">About</Link>
        </nav>
        <div className="header-actions">
          <button className="action-label" onClick={onSearch} data-testid="button-open-search"><Search size={15} /><span>Search</span></button>
          <Link href="/account/wishlist" className="action-label action-hide-mobile" data-testid="link-wishlist"><Heart size={15} /><span>Wishlist</span></Link>
          <button className="action-label" onClick={onCart} data-testid="button-open-bag"><ShoppingBag size={15} /><span>Bag <b className="count-badge">0</b></span></button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow">THE UNDERSTATED</p>
          <p className="footer-note">Luxury, without the noise.<br />Made for what speaks to you.</p>
        </div>
        <div className="footer-bigline">STAY<br /><i>UNDERSTATED.</i></div>
      </div>
      <div className="footer-grid">
        <div><p className="footer-label">Explore</p><Link href="/shop">Shop</Link><Link href="/collections">Collections</Link><Link href="/lookbook">Lookbook</Link><Link href="/about">About</Link></div>
        <div><p className="footer-label">Need to know</p><Link href="/contact">Contact</Link><Link href="/faq">FAQ</Link><Link href="/size-guide">Size guide</Link><Link href="/coming-soon">Coming soon</Link></div>
        <div><p className="footer-label">Community</p>{socials.slice(0, 4).map(([name, href]) => <a href={href} target="_blank" rel="noreferrer" key={name}>{name}</a>)}</div>
        <div><p className="footer-label">Legal</p><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/shipping">Shipping</Link><Link href="/returns">Returns</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 THE UNDERSTATED.</span><span>INDIA / WORLDWIDE</span><span className="footer-mark">TU—001</span></div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (reduced || touch) return;
    const move = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const owner = target.closest<HTMLElement>('[data-cursor]');
      setCursorLabel(owner?.dataset.cursor ?? '');
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return (
    <div className="site-shell">
      <Header onSearch={() => setSearchOpen(true)} onMenu={() => setMenuOpen(true)} onCart={() => setCartOpen(true)} />
      <main>{children}</main>
      <Footer />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
      <div className={`context-cursor ${cursorLabel ? 'context-cursor-visible' : ''}`} aria-hidden="true"><span>{cursorLabel}</span></div>
    </div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [term, setTerm] = useState('');
  return <div className="overlay overlay-search" role="dialog" aria-modal="true" aria-label="Search">
    <div className="overlay-bar"><span className="eyebrow">SEARCH / 001</span><button className="icon-button" onClick={onClose} aria-label="Close search"><X size={20} /></button></div>
    <div className="search-content">
      <label htmlFor="site-search" className="sr-only">What are you looking for?</label>
      <div className="search-input-wrap"><Search size={25} /><input autoFocus id="site-search" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="WHAT ARE YOU LOOKING FOR?" data-testid="input-site-search" /><span>{term.length ? `${term.length}/40` : 'ESC'}</span></div>
      <p className="eyebrow search-popular-label">Popular worlds</p>
      <div className="search-links">{collections.map((item) => <Link href={`/collections/${item.slug}`} onClick={onClose} key={item.slug}>{item.title}<ArrowUpRight size={14} /></Link>)}</div>
      <p className="form-disclaimer">Search is a preview for Phase 1. Product discovery will be activated with the catalogue.</p>
    </div>
  </div>;
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const links = [['Shop', '/shop'], ['Collections', '/collections'], ['Lookbook', '/lookbook'], ['About', '/about'], ['Contact', '/contact']];
  return <div className="overlay mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
    <div className="overlay-bar"><Link href="/" className="wordmark" onClick={onClose}><span>THE</span> UNDERSTATED</Link><button className="icon-button" onClick={onClose} aria-label="Close menu"><X size={20} /></button></div>
    <nav className="mobile-links">{links.map(([label, href], index) => <Link href={href} onClick={onClose} key={href}><span>0{index + 1}</span>{label}<ArrowUpRight size={20} /></Link>)}</nav>
    <div className="mobile-menu-foot"><p>Luxury, without the noise.</p><a href={socials[0][1]} target="_blank" rel="noreferrer">Follow along <ArrowUpRight size={15} /></a></div>
  </div>;
}

function CartDrawer({ onClose }: { onClose: () => void }) {
  return <div className="drawer-backdrop" role="dialog" aria-modal="true" aria-label="Your bag">
    <button className="drawer-scrim" aria-label="Close bag" onClick={onClose} />
    <aside className="cart-drawer"><div className="drawer-head"><span className="eyebrow">YOUR BAG / 000</span><button className="icon-button" onClick={onClose} aria-label="Close bag"><X size={19} /></button></div><div className="empty-cart"><div className="empty-glyph"><ShoppingBag size={22} strokeWidth={1} /></div><h2>Your bag is empty.</h2><p>The next drop is almost here.</p><Link href="/collections" className="text-link" onClick={onClose}>Explore the world <ArrowUpRight size={14} /></Link></div><div className="drawer-foot"><span>Phase 1 preview</span><span>Commerce arrives soon</span></div></aside>
  </div>;
}

function Home() {
  return <><Meta title="Luxury, Without the Noise" /><Hero /><Statement /><Campaign /><Worlds /><EditorialStory /><Manifesto /><Sculpture /><LookbookPreview /><DropBanner /><Community /><Newsletter /></>;
}

function Hero() {
  const [intro, setIntro] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setIntro(false), 1500); return () => window.clearTimeout(timer); }, []);
  return <section className={`hero ${intro ? 'hero-intro-active' : ''}`}>
    <div className="hero-image" style={{ backgroundImage: `url(${assets.hero})` }} aria-hidden="true" />
    <div className="hero-shade" />
    <div className="hero-intro" aria-hidden={!intro}><span>THE</span><strong>UNDERSTATED</strong><small>Luxury, Without the Noise.</small></div>
    <div className="hero-copy">
      <p className="eyebrow light hero-kicker">ACT I / THE SILENCE <span>INDIA — 2026</span></p>
      <h1><span>THE</span><em>UNDER-</em><strong>STATED.</strong></h1>
      <p className="hero-sub">Contemporary essentials, culture-driven pieces and modern streetwear for those who do not need to be loud to stand out.</p>
      <div className="hero-entry"><Link href="/collections" className="text-link light-link" data-cursor="GO" data-testid="link-explore-world">Enter the worlds <ArrowUpRight size={15} /></Link><span className="hero-film-note">A FILM IN SIX ACTS<br />FRAME 01 / 13</span></div>
    </div>
    <div className="hero-vertical">LUXURY, WITHOUT THE NOISE.</div>
    <div className="hero-bottom"><span>Scroll to enter</span><span className="scroll-line" /><span>01—13</span></div>
  </section>;
}

function Statement() {
  return <section className="statement section-pad"><div className="statement-number">ACT II<br />02 / 13</div><div className="statement-copy"><p className="eyebrow">The presence / A point of view</p><h2>LESS<br /><em>NOISE.</em><br />MORE <span>YOU.</span></h2><p className="body-copy">Fashion does not have to shout to make an impression. It only has to mean something to you.</p></div><span className="statement-side-note">A QUIET<br />POSITION</span></section>;
}

function Campaign() {
  return <section className="campaign section-dark"><div className="campaign-media media-frame" data-cursor="VIEW"><img src={assets.campaign} alt="Folds of black fabric and a sculptural object in a stark studio" loading="lazy" /><div className="media-grain" /><span className="campaign-freeze">FREEZE FRAME<br />04:12:26</span></div><div className="campaign-content"><p className="eyebrow light">ACT III / THE CULTURE</p><h2>The quiet<br /><i>city.</i></h2><p>For the spaces between one place and the next. A study in movement, shadow and the clothes that keep up.</p><Link href="/lookbook" className="text-link light-link" data-cursor="GO">Discover the lookbook <ArrowUpRight size={15} /></Link></div><span className="campaign-caption">DROP 001 / POSTER STUDY / INDIA</span></section>;
}

function Worlds() {
  return <section className="worlds section-pad"><div className="section-head"><div><p className="eyebrow">ACT IV / THE EVERYDAY</p><h2>Find your<br /><em>frequency.</em></h2></div><p className="body-copy">A wardrobe with room for every version of you. Start where it feels right.</p></div><div className="world-grid">{collections.map((item) => <Link href={`/collections/${item.slug}`} className={`world-card tone-${item.tone}`} key={item.slug} data-cursor="ENTER" data-testid={`card-world-${item.slug}`}><img src={item.image} alt={`${item.title} editorial placeholder`} loading="lazy" /><div className="world-overlay" /><div className="world-meta"><span className="eyebrow">{item.number} / Collection world</span><h3>{item.title}</h3><p>{item.description}</p><span className="world-cta">Enter <ArrowUpRight size={14} /></span></div></Link>)}</div></section>;
}

function EditorialStory() {
  return <section className="editorial-story section-pad"><div className="editorial-image image-tall" data-cursor="VIEW"><img src={assets.city} alt="Figure crossing a wet concrete plaza at blue hour" loading="lazy" /><span className="editorial-stamp">EDITORIAL 01<br />SHOT 04 / 12</span></div><div className="editorial-copy"><p className="eyebrow">ACT V / THE EVERYDAY</p><h2>Fashion does not have to be loud to make an <em>impression.</em></h2><div className="editorial-rule" /><p className="body-copy">There is a certain confidence in choosing less. In keeping the detail that matters and leaving the rest behind.</p><Link href="/about" className="text-link" data-cursor="GO">Read our point of view <ArrowUpRight size={14} /></Link></div><div className="editorial-mini"><img src={assets.fabric} alt="Abstract black fabric texture" loading="lazy" /><span>Character / in the details</span></div></section>;
}

function Manifesto() {
  return <section className="manifesto section-dark"><div className="manifesto-top"><span className="eyebrow light">ACT VI / THE STATEMENT</span><span className="manifesto-side">For those who know.</span></div><h2>FASHION<br />DOES NOT HAVE<br />TO BE <em>LOUD.</em></h2><div className="manifesto-bottom"><p>It just has to<br /><strong>mean something.</strong></p><p className="manifesto-sign">Wear what speaks to you.<br /><span>— The Understated</span></p></div></section>;
}

function Sculpture() {
  return <section className="sculpture section-pad"><div className="sculpture-copy"><p className="eyebrow">FORM STUDY / BETWEEN ACTS</p><h2>Weightless<br /><em>presence.</em></h2><p className="body-copy">A quiet study in form. Move with your cursor or let the shape hold the room.</p></div><div className="sculpture-stage" aria-label="Abstract fabric sculpture, decorative"><div className="sculpture-orbit orbit-one" /><div className="sculpture-orbit orbit-two" /><div className="sculpture-form"><span>TU</span></div><div className="sculpture-caption">SUSPENDED BLACK FABRIC / 001</div></div></section>;
}

function LookbookPreview() {
  const looks = [{ number: '01', title: 'The everyday', image: assets.hero }, { number: '02', title: 'After dark', image: assets.city }, { number: '03', title: 'Culture', image: assets.campaign }];
  return <section className="lookbook-preview section-dark"><div className="lookbook-head"><div><p className="eyebrow light">EDITORIAL 01 / COLLECTION 001</p><h2>Ways of<br /><em>wearing.</em></h2></div><Link href="/lookbook" className="text-link light-link" data-cursor="GO">View all stories <ArrowUpRight size={15} /></Link></div><div className="lookbook-strip">{looks.map((look, index) => <Link href="/lookbook" className="look-card" data-cursor="VIEW" key={look.number}><img src={look.image} alt={`${look.title} lookbook editorial`} loading="lazy" /><div className="look-overlay" /><div className="look-meta"><span>{look.number} / 0{index + 4}</span><h3>{look.title}</h3><ArrowUpRight size={17} /></div></Link>)}</div></section>;
}

function DropBanner() {
  return <section className="drop-banner"><div><p className="eyebrow">ACT VII / THE DROP — DROP 001</p><h2>The first drop<br /><em>is coming.</em></h2><p>Something worth waiting for.</p></div><div className="button-row"><Link href="/coming-soon" className="button button-dark" data-cursor="GO">Join the world <ArrowUpRight size={15} /></Link><a href={socials[0][1]} target="_blank" rel="noreferrer" className="button button-outline" data-cursor="GO">Follow the drop</a></div></section>;
}

function Community() {
  return <section className="community section-pad"><div className="community-head"><p className="eyebrow">09 / Community</p><h2>Stay<br /><em>understated.</em></h2><p className="body-copy">New drops. New stories.<br />Things worth wearing.</p></div><div className="social-list">{socials.map(([name, href], index) => <a href={href} target="_blank" rel="noreferrer" key={name} data-testid={`link-social-${index}`}><span>0{index + 1}</span><strong>{name}</strong><ArrowUpRight size={16} /></a>)}</div></section>;
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  return <section id="newsletter" className="newsletter section-dark"><div><p className="eyebrow light">10 / The list</p><h2>Be <em>first.</em></h2><p>Get notified when the next chapter begins.</p></div>{joined ? <div className="newsletter-confirm"><span className="confirm-mark">OK</span><p>We have your interest.<br /><small>Connection is ready for the next chapter.</small></p></div> : <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email.includes('@')) setJoined(true); }}><label htmlFor="newsletter-email" className="sr-only">Email address</label><input id="newsletter-email" type="email" required placeholder="EMAIL ADDRESS" value={email} onChange={(event) => setEmail(event.target.value)} data-testid="input-newsletter-email" /><button type="submit" data-testid="button-join-newsletter">Join <ArrowUpRight size={15} /></button><small>This Phase 1 form does not send or store data yet.</small></form>}</section>;
}

function PageIntro({ eyebrow, title, italic, description }: { eyebrow: string; title: string; italic?: string; description?: string }) {
  return <section className="page-intro section-pad"><p className="eyebrow">{eyebrow}</p><h1>{title}<br />{italic && <em>{italic}</em>}</h1>{description && <p className="page-intro-desc">{description}</p>}</section>;
}

function About() {
  return <><Meta title="About" /><PageIntro eyebrow="About / 01" title="Luxury," italic="without the noise." description="A contemporary label for people who express themselves differently." /><section className="about-body section-pad"><div className="about-statement"><span className="eyebrow">The idea</span><h2>Fashion does not have to be loud to make a <em>statement.</em></h2></div><div className="about-copy"><p>The Understated was built on a simple idea — fashion does not have to be loud to make a statement.</p><p>We create contemporary clothing for people who express themselves differently. Blending minimal aesthetics, modern streetwear and designs inspired by culture, creativity and individuality, our collections are made for everyday life — and everything that happens in between.</p><p>From understated essentials to culture-driven pieces and statement graphics, every piece is designed around one belief:</p><p className="serif-line">Wear what speaks to you.</p><div className="about-values"><span>Quality.</span><span>Comfort.</span><span>Character.</span><span>Without the unnecessary noise.</span></div></div></section><section className="about-image"><img src={assets.fabric} alt="Abstract folded black fabric in light" /></section><section className="about-end section-pad"><p className="eyebrow">The Understated / India</p><h2>This is<br /><em>The Understated.</em></h2><Link href="/collections" className="text-link">Enter the worlds <ArrowUpRight size={15} /></Link></section></>;
}

function Collections() {
  return <><Meta title="Collections" /><PageIntro eyebrow="Collections / 04 worlds" title="Choose your" italic="world." description="Four starting points. No wrong answers." /><section className="collection-overview">{collections.map((item) => <Link href={`/collections/${item.slug}`} className={`collection-row tone-${item.tone}`} key={item.slug}><div className="collection-row-number">{item.number}</div><div className="collection-row-image"><img src={item.image} alt={`${item.title} collection placeholder`} loading="lazy" /></div><div className="collection-row-copy"><p className="eyebrow">{item.number} / Collection</p><h2>{item.title}</h2><p>{item.description}</p><span className="text-link">Explore <ArrowUpRight size={14} /></span></div></Link>)}</section></>;
}

function CollectionPage({ slug }: { slug: string }) {
  const item = collections.find((collection) => collection.slug === slug) ?? collections[0];
  return <><Meta title={item.title} description={`${item.title} — a world by The Understated.`} /><section className={`collection-hero tone-${item.tone}`}><img src={item.image} alt={`${item.title} editorial placeholder`} /><div className="collection-hero-overlay" /><div className="collection-hero-copy"><p className="eyebrow light">{item.number} / Collection world — INDIA / 2026</p><h1>{item.title}</h1><p>{item.description}</p></div><span className="collection-hero-note">Catalogue preview / coming soon</span></section><section className="collection-empty section-pad"><div><p className="eyebrow">A considered wardrobe</p><h2>Nothing to add<br /><em>just yet.</em></h2></div><div><p className="body-copy">This world is being built with the same care as the pieces inside it. The first drop will arrive here when it is ready.</p><Link href="/coming-soon" className="button button-dark" data-cursor="GO">Stay close <ArrowUpRight size={15} /></Link></div></section><section className="collection-quote"><p>“Wear what<br /><em>speaks to you.</em>”</p></section></>;
}

function Lookbook() {
  const looks = [{ number: '01', title: 'The everyday', body: 'The pieces that earn their place.', image: assets.hero }, { number: '02', title: 'After dark', body: 'A little more shadow. A little less noise.', image: assets.city }, { number: '03', title: 'Culture', body: 'Stories translated into something you can wear.', image: assets.campaign }, { number: '04', title: 'The statement', body: 'For when quiet does not mean invisible.', image: assets.fabric }];
  return <><Meta title="Lookbook" /><PageIntro eyebrow="Lookbook / 2026" title="Ways of" italic="wearing." description="A visual record of the worlds we are building." /><section className="lookbook-page">{looks.map((look, index) => <article className={`lookbook-row ${index % 2 ? 'lookbook-row-reverse' : ''}`} key={look.number}><div className="lookbook-large" data-cursor="VIEW"><img src={look.image} alt={`${look.title} lookbook`} loading="lazy" /><span>{look.number} / SHOT 0{index + 4} / 12</span></div><div className="lookbook-row-copy"><p className="eyebrow">EDITORIAL 0{index + 1} / COLLECTION 001</p><h2>{look.title}</h2><p>{look.body}</p><Link href="/coming-soon" className="text-link" data-cursor="GO">Enter the world <ArrowUpRight size={14} /></Link></div></article>)}</section></>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  return <><Meta title="Contact" /><PageIntro eyebrow="Contact / 01" title="Let’s" italic="talk." description="For questions, collaborations and the things that do not fit in a form." /><section className="contact-layout section-pad"><div className="contact-side"><p className="eyebrow">Find us elsewhere</p><p className="body-copy">The quickest way into the world is through the community.</p>{socials.slice(0, 5).map(([name, href]) => <a className="contact-social" href={href} target="_blank" rel="noreferrer" key={name}>{name}<ArrowUpRight size={14} /></a>)}</div>{sent ? <div className="form-success"><span>OK</span><h2>Message drafted.</h2><p>This form is ready for an email integration. Nothing has been sent in Phase 1.</p><button className="text-link button-reset" onClick={() => setSent(false)}>Write another <ArrowUpRight size={14} /></button></div> : <form className="editorial-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><Field label="Name" name="name" /><Field label="Email" name="email" type="email" /><Field label="Subject" name="subject" /><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required placeholder="Tell us what is on your mind." data-testid="input-contact-message" /><button className="button button-dark" type="submit" data-testid="button-send-message">Send message <ArrowUpRight size={15} /></button><small className="form-disclaimer">This form is integration-ready. It does not send or store messages yet.</small></form>}</section></>;
}

function Field({ label, name, type = 'text' }: { label: string; name: string; type?: string }) {
  return <div className="field"><label htmlFor={`contact-${name}`}>{label}</label><input id={`contact-${name}`} name={name} type={type} required data-testid={`input-contact-${name}`} /></div>;
}

const faqs = ['Orders', 'Shipping', 'Sizing', 'Products', 'Payments', 'Returns'].map((category) => ({ category, answer: 'Details coming soon. Final information will be published before the first drop.' }));
function FAQ() {
  const [open, setOpen] = useState<string | null>(null);
  return <><Meta title="FAQ" /><PageIntro eyebrow="Information / FAQ" title="Questions," italic="answered." description="The useful details, without the unnecessary noise." /><section className="faq-list section-pad">{faqs.map((faq) => <div className={`faq-item ${open === faq.category ? 'faq-open' : ''}`} key={faq.category}><button onClick={() => setOpen(open === faq.category ? null : faq.category)} aria-expanded={open === faq.category} data-testid={`button-faq-${faq.category.toLowerCase()}`}><span>{faq.category}</span><ChevronDown size={18} /></button>{open === faq.category && <div className="faq-answer"><p>{faq.answer}</p></div>}</div>)}</section></>;
}

function SizeGuide() {
  const rows = ['XS', 'S', 'M', 'L', 'XL'];
  return <><Meta title="Size guide" /><PageIntro eyebrow="Information / 01" title="Find your" italic="fit." description="A considered starting point. Final measurements arrive with the first drop." /><section className="size-guide section-pad"><div className="size-tabs"><button className="size-tab active">T-shirts</button><button className="size-tab">Hoodies</button><button className="size-tab">Other categories</button></div><div className="size-table-wrap"><table><thead><tr><th>Size</th><th>Chest</th><th>Length</th><th>Shoulder</th></tr></thead><tbody>{rows.map((size) => <tr key={size}><td>{size}</td><td>—</td><td>—</td><td>—</td></tr>)}</tbody></table></div><p className="form-disclaimer">Measurements will be added once the collection is finalised. For now, use this as a placeholder framework.</p></section></>;
}

function ComingSoon() {
  return <><Meta title="Coming soon" /><section className="coming-page section-dark"><div className="coming-visual"><img src={assets.hero} alt="Editorial portrait in a concrete space" /><div className="coming-visual-word">TU—001</div></div><div className="coming-copy"><p className="eyebrow light">The first chapter / 001</p><h1>The first drop<br /><em>is coming.</em></h1><p>Something worth waiting for.</p><Link href="/#newsletter" className="button button-light">Join the world <ArrowUpRight size={15} /></Link><a href={socials[0][1]} target="_blank" rel="noreferrer" className="text-link light-link">Follow the drop <ArrowUpRight size={14} /></a></div></section></>;
}

function Legal({ type }: { type: 'privacy' | 'terms' | 'shipping' | 'returns' }) {
  const titles = { privacy: 'Privacy policy', terms: 'Terms', shipping: 'Shipping', returns: 'Returns' };
  return <><Meta title={titles[type]} /><PageIntro eyebrow={`Legal / ${type}`} title={titles[type]} italic="coming soon." description="The structure is ready. Final client-approved content will be added here." /><section className="legal-body section-pad"><div className="legal-index"><span>01</span><span>02</span><span>03</span></div><div><h2>Information pending.</h2><p>This page is intentionally a placeholder for the final {titles[type].toLowerCase()} content. We will publish the full details before commerce is activated.</p><p>No claims or policy details are being invented in this Phase 1 build.</p></div></section></>;
}

function CommerceShell({ page }: { page: 'shop' | 'product' | 'cart' | 'checkout' | 'account' | 'orders' | 'wishlist' }) {
  const labels = { shop: 'Shop', product: 'Product', cart: 'Your bag', checkout: 'Checkout', account: 'Account', orders: 'Orders', wishlist: 'Wishlist' };
  return <><Meta title={labels[page]} /><PageIntro eyebrow={`Commerce / ${page}`} title={page === 'product' ? 'Product' : labels[page]} italic={page === 'product' ? 'preview.' : 'coming soon.'} description="Commerce architecture is ready. The catalogue will arrive in the next chapter." /><section className="commerce-empty section-pad"><div className="empty-glyph"><ShoppingBag size={22} strokeWidth={1} /></div><h2>{page === 'cart' ? 'Your bag is empty.' : 'This space is being prepared.'}</h2><p>Phase 1 is about the world before the wardrobe. No products or transactions are live yet.</p><Link href="/collections" className="button button-dark">Explore the worlds <ArrowUpRight size={15} /></Link></section></>;
}

function NotFound() {
  return <><Meta title="Page not found" /><section className="not-found section-dark"><p className="eyebrow light">404 / Lost in the quiet</p><h1>This page<br /><em>is not here.</em></h1><Link href="/" className="button button-light">Return home <ArrowLeft size={15} /></Link></section></>;
}

function ProductCard({ product }: { product: Product }) {
  return <article className="product-card"><Link href={`/product/${product.slug}`} className="product-image"><img src={product.images[0]} alt={product.name} /><button className="product-wishlist" aria-label={`Add ${product.name} to wishlist`} onClick={(event) => event.preventDefault()}><Heart size={16} /></button></Link><div className="product-card-meta"><p>{product.collection}</p><h3>{product.name}</h3><span>{product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Coming soon'}</span></div></article>;
}

function ProductGrid({ products = [] }: { products?: Product[] }) {
  if (!products.length) return <div className="products-empty"><p className="eyebrow">Catalogue / 000</p><h2>The wardrobe<br /><em>is on its way.</em></h2><p>Product cards are ready for the first real catalogue.</p></div>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}

function ProductPageTemplate({ product }: { product?: Product }) {
  if (!product) return <CommerceShell page="product" />;
  return <><Meta title={product.name} /><section className="product-detail section-pad"><div className="product-gallery">{product.images.map((image, index) => <img src={image} alt={`${product.name} view ${index + 1}`} key={image} />)}</div><div className="product-information"><p className="eyebrow">{product.collection}</p><h1>{product.name}</h1><p className="product-price">{product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Coming soon'}</p><p className="body-copy">{product.description}</p><div className="product-attribute"><span>Colour</span><strong>{product.colors.join(' / ')}</strong></div><div className="product-attribute"><span>Size</span><strong>{product.sizes.join(' / ')}</strong></div><div className="product-actions"><button className="button button-dark" disabled>Add to bag</button><button className="button button-outline" disabled>Buy now</button></div><p className="form-disclaimer">This product page is commerce-ready. Actions activate when the catalogue is live.</p><details><summary>Fabric & fit <ChevronDown size={15} /></summary><p>{product.fabric ?? 'Details coming soon.'} / {product.fit ?? 'Fit details coming soon.'}</p></details><details><summary>Care & delivery <ChevronDown size={15} /></summary><p>{product.careInstructions ?? 'Details coming soon.'}</p></details></div></section></>;
}

function CollectionRoute() {
  const params = useParams<{ slug: string }>();
  return <CollectionPage slug={params.slug} />;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={() => <Home />} />
    <Route path="/about" component={() => <About />} />
    <Route path="/collections" component={() => <Collections />} />
    <Route path="/collections/:slug" component={CollectionRoute} />
    <Route path="/lookbook" component={() => <Lookbook />} />
    <Route path="/contact" component={() => <Contact />} />
    <Route path="/faq" component={() => <FAQ />} />
    <Route path="/size-guide" component={() => <SizeGuide />} />
    <Route path="/coming-soon" component={() => <ComingSoon />} />
    <Route path="/privacy" component={() => <Legal type="privacy" />} />
    <Route path="/terms" component={() => <Legal type="terms" />} />
    <Route path="/shipping" component={() => <Legal type="shipping" />} />
    <Route path="/returns" component={() => <Legal type="returns" />} />
    <Route path="/shop" component={() => <CommerceShell page="shop" />} />
    <Route path="/product/:slug" component={() => <CommerceShell page="product" />} />
    <Route path="/cart" component={() => <CommerceShell page="cart" />} />
    <Route path="/checkout" component={() => <CommerceShell page="checkout" />} />
    <Route path="/account" component={() => <CommerceShell page="account" />} />
    <Route path="/account/orders" component={() => <CommerceShell page="orders" />} />
    <Route path="/account/wishlist" component={() => <CommerceShell page="wishlist" />} />
    <Route path="/404" component={() => <NotFound />} />
    <Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Shell><Router /></Shell></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;