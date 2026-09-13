import { ArrowLeft, ArrowRight, Ruler, Layers, LayoutGrid, ZoomIn, RotateCcw, Move, Palette, Maximize2, Eye } from 'lucide-react';

const icons = { ruler: Ruler, layers: Layers, modules: LayoutGrid, left: ArrowLeft, right: ArrowRight, zoom: ZoomIn, reset: RotateCcw, move: Move, palette: Palette, expand: Maximize2, eye: Eye };

export default function SiteIcon({ name, size = 24, className = '' }: { name: keyof typeof icons; size?: number; className?: string }) {
  const Icon = icons[name];
  return <Icon className={`site-icon ${className}`} size={size} strokeWidth={1.5} aria-hidden="true" focusable="false" />;
}
