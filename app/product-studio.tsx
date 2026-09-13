'use client';

import { useEffect, useRef, useState, type PointerEvent, type KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { clamp, constrainPan, panBounds } from '@/lib/viewer-math';
import SiteIcon from './site-icon';

export const finishes = {
  sage: { name: 'Sage', color: '#9da58f', image: '/images/forma-sofa.png', texture: '/images/boucle-sage.png', note: 'Muted green woven upholstery.' },
  oat: { name: 'Oat', color: '#cbbfae', image: '/images/forma-oat.png', texture: '/images/boucle-detail.png', note: 'Warm neutral woven upholstery.' },
  ink: { name: 'Ink', color: '#3a414c', image: '/images/forma-ink.png', texture: '/images/boucle-ink.png', note: 'Deep blue-charcoal woven upholstery.' },
};
export type Finish = keyof typeof finishes;
const views = ['Full view', 'Cushion detail', 'Bouclé study'];

export function FabricPicker({ value, onChange, label = 'Choose your finish' }: { value: Finish; onChange: (value: Finish) => void; label?: string }) {
  return <RadioGroup className="interactive-finishes" value={value} onValueChange={next => onChange(next as Finish)} aria-label={label}>
    {(Object.entries(finishes) as [Finish, typeof finishes[Finish]][]).map(([key, finish]) => <label key={key} className="finish-option"><RadioGroupItem className="finish-radio" value={key} style={{ backgroundColor: finish.color }} aria-label={finish.name}/><span>{finish.name}</span></label>)}
  </RadioGroup>;
}

function ZoomView({ src, alt }: {src:string;alt:string}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({x:0,y:0});
  const [dragging, setDragging] = useState(false);
  const area = useRef<HTMLDivElement>(null);
  const drag = useRef<{id:number;x:number;y:number;panX:number;panY:number} | null>(null);
  const bounds = (scale = zoom) => panBounds(area.current?.clientWidth || 0, area.current?.clientHeight || 0, scale);
  const reset = () => { setZoom(1); setPan({x:0,y:0}); };
  const changeZoom = (next:number) => { const scale = clamp(next,1,3); setZoom(scale); setPan(previous => constrainPan(previous.x,previous.y,bounds(scale))); };
  useEffect(() => {
    const element = area.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setPan(previous => constrainPan(previous.x,previous.y,panBounds(element.clientWidth,element.clientHeight,zoom))));
    observer.observe(element); return () => observer.disconnect();
  }, [zoom]);
  const start = (event:PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1 || (event.pointerType === 'mouse' && event.button !== 0)) return;
    drag.current = {id:event.pointerId,x:event.clientX,y:event.clientY,panX:pan.x,panY:pan.y};
    event.currentTarget.setPointerCapture(event.pointerId); setDragging(true);
  };
  const move = (event:PointerEvent<HTMLDivElement>) => {
    const origin = drag.current; if (!origin || origin.id !== event.pointerId) return;
    setPan(constrainPan(origin.panX + event.clientX-origin.x,origin.panY + event.clientY-origin.y,bounds()));
  };
  const end = () => { drag.current = null; setDragging(false); };
  const keyboard = (event:KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '+' || event.key === '=') { event.preventDefault(); changeZoom(zoom+.25); }
    else if (event.key === '-') { event.preventDefault(); changeZoom(zoom-.25); }
    else if (event.key === 'Home' || event.key === '0') { event.preventDefault(); reset(); }
    else if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) {
      event.preventDefault(); const offsets = {ArrowLeft:[40,0],ArrowRight:[-40,0],ArrowUp:[0,40],ArrowDown:[0,-40]};
      const [x,y] = offsets[event.key as keyof typeof offsets]; setPan(previous => constrainPan(previous.x+x,previous.y+y,bounds()));
    }
  };
  return <>
    <div ref={area} className={`zoom-surface ${zoom>1?'can-pan':''} ${dragging?'is-dragging':''}`} tabIndex={0} role="region" aria-label="Zoomable product image. Use plus or minus to zoom, arrow keys to pan, and Home to reset." onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end} onKeyDown={keyboard} onDoubleClick={() => changeZoom(zoom === 1 ? 2 : 1)}>
      <img src={src} alt={alt} draggable={false} width={1536} height={1024} style={{transform:`translate(${pan.x}px, ${pan.y}px) scale(${zoom})`}}/>
    </div>
    <div className="zoom-toolbar"><SiteIcon name="zoom" size={20}/><Slider aria-label="Image zoom" className="zoom-slider" value={[zoom]} min={1} max={3} step={.1} onValueChange={value=>changeZoom(Array.isArray(value)?value[0]:value)}/><output aria-label="Zoom level">{zoom.toFixed(1)}×</output><Button variant="ghost" className="studio-button" onClick={reset}><SiteIcon name="reset" size={18}/>Reset</Button></div>
    <p className="viewer-help">Zoom in, then drag to explore. Double-click to zoom. Use + / − and arrow keys on a keyboard.</p>
  </>;
}

export default function ProductStudio({ finish, onFinishChange }: {finish:Finish;onFinishChange:(value:Finish)=>void}) {
  const [api, setApi] = useState<CarouselApi>();
  const [view, setView] = useState(0);
  const [dimensions, setDimensions] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const selected = finishes[finish];
  useEffect(() => { if (!api) return; const update = () => setView(api.selectedScrollSnap()); update(); api.on('select',update); return () => {api.off('select',update);}; },[api]);
  const changeFinish = (value:Finish) => { setImageError(false); onFinishChange(value); };
  const image = view === 2 ? selected.texture : selected.image;
  const showDimensions = () => {setDimensions(previous=>!previous);api?.scrollTo(0);};
  return <article className="product-card product-studio">
    <div className="product-title"><div><h2 id="sunday-heading">Sunday</h2></div></div>
    <Carousel className="sofa-carousel" opts={{loop:true}} setApi={setApi} aria-label="Sunday sofa product views">
      <CarouselContent className="sofa-track">
        {views.map((title,index) => <CarouselItem key={title} className="sofa-slide" aria-label={`${index+1} of 3: ${title}`}><div className={`sofa-stage ${index===1?'cushion-view':''} ${index===2?'texture-view':''}`}>
          <img src={index===2?selected.texture:selected.image} alt={index===2?`${selected.name} bouclé fabric detail`:`${selected.name} Sunday sofa — ${title.toLowerCase()}`} width={1536} height={1024} draggable={false} onError={()=>setImageError(true)}/>
          {index===0 && dimensions && <div className="dimension-overlay"><span className="dimension-width">298 cm wide</span><span className="dimension-depth">168 cm deep</span><span className="dimension-height">78 cm high</span></div>}
        </div></CarouselItem>)}
      </CarouselContent>
      <div className="gallery-navigation"><Button className="gallery-arrow" variant="ghost" size="icon" aria-label="Previous product view" onClick={()=>api?.scrollPrev()}><SiteIcon name="left" size={32}/></Button><div className="view-dots">{views.map((title,index)=><button key={title} className={view===index?'active':''} onClick={()=>api?.scrollTo(index)} aria-label={`View ${title.toLowerCase()}`} aria-current={view===index?'true':undefined}><span className="view-dot"/><span className="view-name">{title}</span></button>)}</div><Button className="gallery-arrow" variant="ghost" size="icon" aria-label="Next product view" onClick={()=>api?.scrollNext()}><SiteIcon name="right" size={32}/></Button></div>
    </Carousel>
    {imageError && <p className="image-error" role="status">An image could not load. Please refresh to try again.</p>}
    <div className="studio-tools"><p aria-live="polite"><span className="view-counter">0{view+1} / 03</span>{views[view]}</p><div><Button variant="ghost" className="studio-button" aria-pressed={dimensions} onClick={showDimensions}><SiteIcon name="ruler" size={18}/>Dimensions</Button><Dialog open={zoomOpen} onOpenChange={setZoomOpen}><DialogTrigger render={<Button variant="ghost" className="studio-button"/>}><SiteIcon name="expand" size={18}/>Explore detail</DialogTrigger><DialogContent className="image-dialog"><DialogTitle>{view===2?`Bouclé in ${selected.name}`:`Sunday in ${selected.name}`}</DialogTitle><DialogDescription>Zoom in to inspect the fabric and shape.</DialogDescription>{zoomOpen && <ZoomView key={image} src={image} alt={view===2?`${selected.name} bouclé upholstery close-up`:`Sunday sofa in ${selected.name}`}/>}</DialogContent></Dialog></div></div>
    <div className="studio-configuration"><div><span className="control-eyebrow">Upholstery</span><FabricPicker value={finish} onChange={changeFinish}/></div><div className="selection-summary" aria-live="polite"><strong>{selected.name}</strong><span>{selected.note}</span><small>3 seats + chaise · Soft woven fabric</small></div><a className="text-link" href="#details">Product notes ↗</a></div>
  </article>;
}
