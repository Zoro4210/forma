'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ProductStudio, { FabricPicker, finishes, type Finish } from './product-studio';
import PageMotion from './page-motion';
import SofaDetails from './sofa-details';

export default function Home() {
  const [finish, setFinish] = useState<Finish>('sage');
  return <>
    <PageMotion />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header wrap">
      <nav className="navigation" aria-label="Main navigation">
        <a href="#" className="wordmark" aria-label="Forma home">forma<span>®</span></a>
        <div className="nav-links"><a href="#sunday">Collection</a><a href="#materials">Materials</a><a href="#philosophy">The studio</a></div>
        <a className="nav-cta" href="#details">Dimensions & care <ArrowUpRight size={14} /></a>
      </nav>
    </header>
    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-heading">
        <div className="hero-copy"><p className="eyebrow">Furniture for everyday living</p><h1 id="hero-heading">Designed for<br />staying in.</h1></div>
        <div className="hero-aside"><p>Meet Sunday. A modular sofa with a low profile, a deep seat, and room to stretch.</p><div className="hero-actions"><a className="pill" href="#sunday">Explore the sofa <ArrowUpRight size={16} /></a><a className="outline-pill" href="#materials">See the materials</a></div></div>
      </section>
      <section id="sunday" className="collection wrap" aria-labelledby="sunday-heading">
        <div className="collection-index"><span>01 / The collection</span><span>Sunday — Modular seating</span></div>
        <ProductStudio finish={finish} onFinishChange={setFinish} />
        <div className="collection-footnote"><p>Shown with a right-hand chaise. Color previews are indicative.</p><a href="#details">Measurements & care <ArrowUpRight size={14} /></a></div>
      </section>
      <section id="materials" className="materials wrap editorial-section" aria-labelledby="materials-heading">
        <div className="section-index"><span>02 / Material study</span><span>A closer look at the surface</span></div>
        <div className="material-grid">
          <figure className="material-figure"><div className="material-image"><img src={finishes[finish].texture} alt={`Close view of ${finishes[finish].name.toLowerCase()} bouclé loops, a rounded sofa arm, and the stitched seat edge`} width={1536} height={1024} loading="lazy" /></div><figcaption aria-live="polite"><span>Fig. 01 — Bouclé, in {finishes[finish].name.toLowerCase()}</span><span>Texture detail</span></figcaption></figure>
          <div className="material-copy"><h2 id="materials-heading">Texture,<br />up close.</h2><p className="body-copy">A fine woven surface gives Sunday its quiet finish. The bouclé study shown here explores a more pronounced texture: small loops, a soft handle, and a rounded edge.</p><div className="material-divider" /><p className="control-label">Explore Sunday in three woven finishes.</p><FabricPicker value={finish} onChange={setFinish} label="Choose the sofa fabric color" /><p className="material-note" aria-live="polite">{finishes[finish].name} selected <span>—</span> <a href="#sunday">View on the sofa <ArrowUpRight size={14} /></a></p></div>
        </div>
      </section>
      <section id="details" className="details wrap editorial-section" aria-labelledby="details-heading">
        <div className="section-index"><span>03 / Product notes</span><span>Sunday, from the inside out</span></div>
        <div className="details-grid"><div><h2 id="details-heading">Made to<br />settle into.</h2><p className="body-copy">Proportions, construction,<br />and a little everyday care.</p><p className="dimension-note">W 298 × D 168 × H 78 cm</p></div><SofaDetails /></div>
      </section>
      <section id="philosophy" className="philosophy wrap editorial-section" aria-labelledby="philosophy-heading">
        <div className="studio-note"><p className="section-number">04 / A note from Forma</p><div><h2 id="philosophy-heading">We start with the way<br className="desktop-break" /> a room is lived in.</h2><p>Some days, a sofa is a place to read. Some evenings, it holds the whole conversation. Sunday leaves room for both, with a generous seat and a simple modular shape.</p><a className="text-link" href="#sunday">Back to the collection <ArrowUpRight size={16} /></a></div></div>
      </section>
    </main>
    <footer className="footer wrap"><div className="footer-top"><a href="#" className="wordmark" aria-label="Forma home">forma<span>®</span></a><p>Furniture for everyday living.</p><nav aria-label="Footer navigation"><a href="#sunday">Collection</a><a href="#materials">Materials</a><a href="#details">Care</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Forma</span><span className="icon-credit">Powered by <img src="/images/vectiloom-emblem.png" alt="Vectiloom" width="24" height="24" /></span><a href="/credits.html">Credits</a><a href="#">Back to top ↑</a></div></footer>
  </>;
}
