import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '..', 'public', 'assets', 'jerseys');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Base Jersey SVG path
const jerseyOutline = "M 170,80 L 120,120 L 50,180 L 100,240 L 145,200 L 145,430 L 355,430 L 355,200 L 400,240 L 450,180 L 380,120 L 330,80 C 300,125 200,125 170,80 Z";

function createSvg(team) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18202E" />
      <stop offset="100%" stop-color="#0E121A" />
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#000000" flood-opacity="0.6" />
    </filter>
    <clipPath id="jerseyClip-${team.id}">
      <path d="${jerseyOutline}" />
    </clipPath>
  </defs>

  <!-- Background rounded card -->
  <rect width="500" height="500" rx="30" fill="url(#bgGlow)" />
  
  <!-- Subtle athletic grid lines -->
  <circle cx="250" cy="250" r="210" fill="none" stroke="#232D42" stroke-width="1.5" stroke-dasharray="6 6" />

  <!-- Jersey Group with Drop Shadow -->
  <g filter="url(#dropShadow)">
    
    <!-- Base Fill -->
    <path d="${jerseyOutline}" fill="${team.baseColor}" stroke="#1E2638" stroke-width="3" />

    <!-- Clipped Custom Patterns -->
    <g clip-path="url(#jerseyClip-${team.id})">
      ${team.patterns}
    </g>

    <!-- Collar & Neck Line -->
    <path d="M 170,80 C 200,125 300,125 330,80 C 310,140 190,140 170,80 Z" fill="${team.collarColor}" stroke="#1E2638" stroke-width="2" />
    <path d="M 210,125 L 250,150 L 290,125" fill="none" stroke="${team.collarAccent || '#00E5FF'}" stroke-width="3" />

    <!-- Sleeve Cuffs -->
    <path d="M 50,180 L 100,240 L 115,225 L 65,165 Z" fill="${team.cuffColor}" />
    <path d="M 450,180 L 400,240 L 385,225 L 435,165 Z" fill="${team.cuffColor}" />

    <!-- Club Crest on Left Chest (Viewer's Left / Heart) -->
    <g transform="translate(195, 175)">
      ${team.crestSvg}
    </g>

    <!-- Manufacturer Logo on Right Chest -->
    <g transform="translate(285, 175)">
      ${team.brandSvg}
    </g>

    <!-- Center Sponsor / Chest Text -->
    ${team.sponsorSvg || ''}
  </g>

  <!-- Club Name Label Banner at Bottom -->
  <rect x="50" y="445" width="400" height="36" rx="10" fill="#131822" stroke="#232D42" stroke-width="1" />
  <text x="250" y="468" fill="#FFFFFF" font-family="'Montserrat', Inter, sans-serif" font-size="14" font-weight="900" text-anchor="middle" letter-spacing="2">
    ${team.name.toUpperCase()}
  </text>
  <circle cx="90" cy="463" r="4" fill="#00E5FF" />
  <circle cx="410" cy="463" r="4" fill="#00E5FF" />
</svg>`;
}

const teams = [
  {
    id: 'flamengo',
    name: 'CR Flamengo - Manto Titular',
    baseColor: '#121212',
    collarColor: '#C4161C',
    collarAccent: '#FFFFFF',
    cuffColor: '#C4161C',
    patterns: `
      <rect x="0" y="100" width="500" height="45" fill="#C4161C" />
      <rect x="0" y="190" width="500" height="45" fill="#C4161C" />
      <rect x="0" y="280" width="500" height="45" fill="#C4161C" />
      <rect x="0" y="370" width="500" height="45" fill="#C4161C" />
      <line x1="120" y1="120" x2="160" y2="90" stroke="#FFFFFF" stroke-width="5" />
      <line x1="110" y1="130" x2="150" y2="100" stroke="#FFFFFF" stroke-width="5" />
      <line x1="380" y1="120" x2="340" y2="90" stroke="#FFFFFF" stroke-width="5" />
      <line x1="390" y1="130" x2="350" y2="100" stroke="#FFFFFF" stroke-width="5" />
    `,
    crestSvg: `
      <rect x="-18" y="-18" width="36" height="36" rx="6" fill="#121212" stroke="#FFFFFF" stroke-width="2" />
      <text x="0" y="7" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle">CRF</text>
      <polygon points="0,-24 4,-16 -4,-16" fill="#FFD700" />
    `,
    brandSvg: `
      <path d="M-10,5 L-5,-5 L0,5 M-3,5 L2,-9 L7,5 M4,5 L9,-13 L14,5" stroke="#FFFFFF" stroke-width="2.5" fill="none" />
    `,
    sponsorSvg: `
      <rect x="180" y="240" width="140" height="28" rx="6" fill="#121212" stroke="#FFFFFF" stroke-width="1.5" />
      <text x="250" y="259" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="2">PIXBET</text>
    `
  },
  {
    id: 'palmeiras',
    name: 'SE Palmeiras - Alviverde',
    baseColor: '#006437',
    collarColor: '#FFFFFF',
    collarAccent: '#FFD700',
    cuffColor: '#FFFFFF',
    patterns: `
      <g opacity="0.15" fill="#FFFFFF">
        <polygon points="200,160 250,220 150,220" />
        <polygon points="300,160 350,220 250,220" />
        <polygon points="250,240 300,300 200,300" />
        <polygon points="200,320 250,380 150,380" />
        <polygon points="300,320 350,380 250,380" />
      </g>
      <line x1="250" y1="140" x2="250" y2="430" stroke="#004d2a" stroke-width="4" />
    `,
    crestSvg: `
      <circle cx="0" cy="0" r="20" fill="#006437" stroke="#FFFFFF" stroke-width="3" />
      <circle cx="0" cy="0" r="14" fill="#006437" stroke="#FFD700" stroke-width="1.5" />
      <text x="0" y="7" fill="#FFFFFF" font-family="serif" font-size="18" font-weight="bold" text-anchor="middle">P</text>
      <circle cx="0" cy="-26" r="3" fill="#FFD700" />
    `,
    brandSvg: `
      <circle cx="5" cy="0" r="10" fill="none" stroke="#FFD700" stroke-width="2" />
      <path d="M0,2 Q5,-8 10,2" fill="none" stroke="#FFD700" stroke-width="2" />
    `,
    sponsorSvg: `
      <text x="250" y="260" fill="#FFFFFF" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle" letter-spacing="3">CREFISA</text>
    `
  },
  {
    id: 'sao-paulo',
    name: 'São Paulo FC - Tricolor',
    baseColor: '#FFFFFF',
    collarColor: '#1A1A1A',
    collarAccent: '#CC1A1A',
    cuffColor: '#CC1A1A',
    patterns: `
      <rect x="0" y="210" width="500" height="24" fill="#CC1A1A" />
      <rect x="0" y="234" width="500" height="24" fill="#1A1A1A" />
      <line x1="148" y1="200" x2="148" y2="430" stroke="#CC1A1A" stroke-width="4" />
      <line x1="352" y1="200" x2="352" y2="430" stroke="#1A1A1A" stroke-width="4" />
    `,
    crestSvg: `
      <polygon points="-22,-14 22,-14 0,22" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="2.5" />
      <rect x="-20" y="-14" width="40" height="10" fill="#1A1A1A" />
      <text x="0" y="-6" fill="#FFFFFF" font-family="sans-serif" font-size="8" font-weight="900" text-anchor="middle">SPFC</text>
      <polygon points="-16,-2 0,16 -2,-2" fill="#CC1A1A" />
      <polygon points="0,16 16,-2 2,-2" fill="#1A1A1A" />
      <polygon points="-8,-19 -5,-14 -11,-14" fill="#CC1A1A" />
      <polygon points="0,-20 3,-14 -3,-14" fill="#FFD700" />
      <polygon points="8,-19 11,-14 5,-14" fill="#CC1A1A" />
    `,
    brandSvg: `
      <text x="5" y="5" fill="#CC1A1A" font-family="sans-serif" font-size="16" font-weight="bold">NB</text>
    `,
    sponsorSvg: `
      <text x="250" y="285" fill="#1A1A1A" font-family="sans-serif" font-size="15" font-weight="900" text-anchor="middle" letter-spacing="3">SUPERBET</text>
    `
  },
  {
    id: 'corinthians',
    name: 'SC Corinthians - Alvinegro',
    baseColor: '#FFFFFF',
    collarColor: '#111111',
    collarAccent: '#FFFFFF',
    cuffColor: '#111111',
    patterns: `
      <line x1="200" y1="120" x2="200" y2="430" stroke="#F0F0F0" stroke-width="2" />
      <line x1="250" y1="140" x2="250" y2="430" stroke="#F0F0F0" stroke-width="2" />
      <line x1="300" y1="120" x2="300" y2="430" stroke="#F0F0F0" stroke-width="2" />
      <rect x="145" y="200" width="8" height="230" fill="#111111" />
      <rect x="347" y="200" width="8" height="230" fill="#111111" />
    `,
    crestSvg: `
      <circle cx="0" cy="0" r="18" fill="#111111" stroke="#FFFFFF" stroke-width="2" />
      <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#C4161C" stroke-width="2" />
      <text x="0" y="5" fill="#111111" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">SCCP</text>
      <line x1="-12" y1="-12" x2="12" y2="12" stroke="#C4161C" stroke-width="2" />
      <line x1="12" y1="-12" x2="-12" y2="12" stroke="#C4161C" stroke-width="2" />
    `,
    brandSvg: `
      <path d="M-12,5 Q0,-8 12,-2 Q-2,10 -12,5 Z" fill="#111111" />
    `,
    sponsorSvg: `
      <rect x="185" y="245" width="130" height="30" rx="4" fill="#111111" />
      <text x="250" y="266" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="2">ESPORTES</text>
    `
  },
  {
    id: 'fluminense',
    name: 'Fluminense FC - Tricolor',
    baseColor: '#7B1832',
    collarColor: '#FFFFFF',
    collarAccent: '#006633',
    cuffColor: '#006633',
    patterns: `
      <rect x="160" y="90" width="30" height="340" fill="#006633" />
      <line x1="190" y1="90" x2="190" y2="430" stroke="#FFFFFF" stroke-width="4" />
      <rect x="235" y="120" width="30" height="310" fill="#006633" />
      <line x1="235" y1="120" x2="235" y2="430" stroke="#FFFFFF" stroke-width="4" />
      <line x1="265" y1="120" x2="265" y2="430" stroke="#FFFFFF" stroke-width="4" />
      <rect x="310" y="90" width="30" height="340" fill="#006633" />
      <line x1="310" y1="90" x2="310" y2="430" stroke="#FFFFFF" stroke-width="4" />
    `,
    crestSvg: `
      <polygon points="-16,-16 16,-16 0,20" fill="#7B1832" stroke="#FFFFFF" stroke-width="2" />
      <text x="0" y="4" fill="#FFFFFF" font-family="serif" font-size="13" font-weight="bold" text-anchor="middle">FFC</text>
      <polygon points="-4,-22 0,-17 4,-22" fill="#FFD700" />
    `,
    brandSvg: `
      <polygon points="-10,0 0,-7 10,0 0,7" fill="none" stroke="#FFFFFF" stroke-width="2.5" />
      <polygon points="-5,0 0,-3 5,0 0,3" fill="#FFFFFF" />
    `,
    sponsorSvg: `
      <text x="250" y="265" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle" letter-spacing="2">SUPERBET</text>
    `
  },
  {
    id: 'botafogo',
    name: 'Botafogo FR - Estrela Solitária',
    baseColor: '#FFFFFF',
    collarColor: '#111111',
    collarAccent: '#FFFFFF',
    cuffColor: '#111111',
    patterns: `
      <rect x="175" y="90" width="36" height="340" fill="#111111" />
      <rect x="232" y="130" width="36" height="300" fill="#111111" />
      <rect x="289" y="90" width="36" height="340" fill="#111111" />
      <polygon points="50,180 120,120 145,200 100,240" fill="#111111" />
      <polygon points="450,180 380,120 355,200 400,240" fill="#111111" />
    `,
    crestSvg: `
      <polygon points="-18,-18 18,-18 18,5 0,22 -18,5" fill="#111111" stroke="#FFFFFF" stroke-width="2.5" />
      <polygon points="0,-12 3.5,-3 12,-3 5,3 8,12 0,6 -8,12 -5,3 -12,-3 -3.5,-3" fill="#FFFFFF" />
    `,
    brandSvg: `
      <path d="M-8,-8 L8,8 M-8,8 L8,-8" stroke="#FFFFFF" stroke-width="3" />
    `,
    sponsorSvg: `
      <text x="250" y="260" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle" letter-spacing="3">PARIMATCH</text>
    `
  },
  {
    id: 'vasco',
    name: 'CR Vasco da Gama - Faixa Diagonal',
    baseColor: '#111111',
    collarColor: '#FFFFFF',
    collarAccent: '#C4161C',
    cuffColor: '#FFFFFF',
    patterns: `
      <polygon points="145,110 200,90 355,380 300,400" fill="#FFFFFF" />
    `,
    crestSvg: `
      <g transform="translate(10, 20)">
        <polygon points="-14,-14 -4,-4 -14,0 -4,4 -14,14 -4,4 0,14 4,4 14,14 4,4 14,0 4,-4 14,-14 4,-4 0,-14 -4,-4" fill="#C4161C" stroke="#FFFFFF" stroke-width="1.5" />
      </g>
      <circle cx="10" cy="-5" r="3" fill="#FFD700" />
    `,
    brandSvg: `
      <text x="5" y="5" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="900">K</text>
    `,
    sponsorSvg: `
      <text x="250" y="270" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="900" text-anchor="middle" letter-spacing="3">BETFAIR</text>
    `
  },
  {
    id: 'atletico-mg',
    name: 'Atlético Mineiro - Galo Forte',
    baseColor: '#111111',
    collarColor: '#FFFFFF',
    collarAccent: '#FFD700',
    cuffColor: '#FFD700',
    patterns: `
      <rect x="175" y="90" width="30" height="340" fill="#FFFFFF" />
      <rect x="235" y="130" width="30" height="300" fill="#FFFFFF" />
      <rect x="295" y="90" width="30" height="340" fill="#FFFFFF" />
    `,
    crestSvg: `
      <polygon points="-18,-16 18,-16 18,8 0,22 -18,8" fill="#111111" stroke="#FFFFFF" stroke-width="2" />
      <text x="0" y="2" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">CAM</text>
      <polygon points="0,-24 3,-18 9,-18 4,-14 6,-8 0,-12 -6,-8 -4,-14 -9,-18 -3,-18" fill="#FFD700" />
    `,
    brandSvg: `
      <path d="M-10,5 L-5,-5 L0,5 M-3,5 L2,-9 L7,5 M4,5 L9,-13 L14,5" stroke="#FFFFFF" stroke-width="2.5" fill="none" />
    `,
    sponsorSvg: `
      <text x="250" y="260" fill="#FFD700" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle" letter-spacing="2">BETANO</text>
    `
  },
  {
    id: 'cruzeiro',
    name: 'Cruzeiro EC - Cabuloso',
    baseColor: '#0047AB',
    collarColor: '#FFFFFF',
    collarAccent: '#0047AB',
    cuffColor: '#FFFFFF',
    patterns: `
      <g opacity="0.1" fill="#FFFFFF">
        <circle cx="250" cy="250" r="100" />
      </g>
    `,
    crestSvg: `
      <polygon points="0,-16 2,-11 7,-11 3,-8 5,-3 0,-6 -5,-3 -3,-8 -7,-11 -2,-11" fill="#FFFFFF" />
      <polygon points="-12,-4 -10,-1 -5,-1 -8,2 -6,7 -11,4 -16,7 -14,2 -17,-1 -12,-1" fill="#FFFFFF" />
      <polygon points="12,-4 14,-1 19,-1 16,2 18,7 13,4 8,7 10,2 7,-1 12,-1" fill="#FFFFFF" />
      <polygon points="0,14 2,19 7,19 3,22 5,27 0,24 -5,27 -3,22 -7,19 -2,19" fill="#FFFFFF" />
      <polygon points="6,4 7,7 10,7 8,9 9,12 6,10 3,12 4,9 2,7 5,7" fill="#FFFFFF" />
    `,
    brandSvg: `
      <path d="M-10,5 L-5,-5 L0,5 M-3,5 L2,-9 L7,5 M4,5 L9,-13 L14,5" stroke="#FFFFFF" stroke-width="2.5" fill="none" />
    `,
    sponsorSvg: `
      <text x="250" y="260" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle" letter-spacing="3">BETFAIR</text>
    `
  },
  {
    id: 'gremio',
    name: 'Grêmio FBPA - Tricolor Gaúcho',
    baseColor: '#0080FF',
    collarColor: '#FFFFFF',
    collarAccent: '#111111',
    cuffColor: '#111111',
    patterns: `
      <rect x="175" y="90" width="30" height="340" fill="#111111" />
      <line x1="175" y1="90" x2="175" y2="430" stroke="#FFFFFF" stroke-width="3" />
      <line x1="205" y1="90" x2="205" y2="430" stroke="#FFFFFF" stroke-width="3" />

      <rect x="235" y="130" width="30" height="300" fill="#111111" />
      <line x1="235" y1="130" x2="235" y2="430" stroke="#FFFFFF" stroke-width="3" />
      <line x1="265" y1="130" x2="265" y2="430" stroke="#FFFFFF" stroke-width="3" />

      <rect x="295" y="90" width="30" height="340" fill="#111111" />
      <line x1="295" y1="90" x2="295" y2="430" stroke="#FFFFFF" stroke-width="3" />
      <line x1="325" y1="90" x2="325" y2="430" stroke="#FFFFFF" stroke-width="3" />
    `,
    crestSvg: `
      <ellipse cx="0" cy="0" rx="20" ry="15" fill="#0080FF" stroke="#FFFFFF" stroke-width="2.5" />
      <rect x="-20" y="-3" width="40" height="6" fill="#111111" />
      <text x="0" y="3" fill="#FFFFFF" font-family="sans-serif" font-size="6" font-weight="900" text-anchor="middle">GRÊMIO</text>
      <circle cx="-10" cy="-18" r="2.5" fill="#FFD700" />
      <circle cx="0" cy="-20" r="2.5" fill="#C0C0C0" />
      <circle cx="10" cy="-18" r="2.5" fill="#CD7F32" />
    `,
    brandSvg: `
      <polygon points="-10,0 0,-7 10,0 0,7" fill="none" stroke="#FFFFFF" stroke-width="2.5" />
    `,
    sponsorSvg: `
      <text x="250" y="260" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle" letter-spacing="2">BANRISUL</text>
    `
  },
  {
    id: 'internacional',
    name: 'SC Internacional - Colorado',
    baseColor: '#D00000',
    collarColor: '#FFFFFF',
    collarAccent: '#D00000',
    cuffColor: '#FFFFFF',
    patterns: `
      <g opacity="0.1" fill="#FFFFFF">
        <circle cx="250" cy="270" r="120" />
      </g>
      <line x1="120" y1="120" x2="160" y2="90" stroke="#FFFFFF" stroke-width="4" />
      <line x1="380" y1="120" x2="340" y2="90" stroke="#FFFFFF" stroke-width="4" />
    `,
    crestSvg: `
      <circle cx="0" cy="0" r="19" fill="#D00000" stroke="#FFFFFF" stroke-width="3" />
      <text x="0" y="6" fill="#FFFFFF" font-family="serif" font-size="15" font-weight="bold" text-anchor="middle">SCI</text>
      <circle cx="0" cy="-24" r="3" fill="#FFD700" />
    `,
    brandSvg: `
      <path d="M-10,5 L-5,-5 L0,5 M-3,5 L2,-9 L7,5 M4,5 L9,-13 L14,5" stroke="#FFFFFF" stroke-width="2.5" fill="none" />
    `,
    sponsorSvg: `
      <text x="250" y="260" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="900" text-anchor="middle" letter-spacing="2">BANRISUL</text>
    `
  },
  {
    id: 'bahia',
    name: 'EC Bahia - Tricolor de Aço',
    baseColor: '#FFFFFF',
    collarColor: '#003399',
    collarAccent: '#CC0000',
    cuffColor: '#CC0000',
    patterns: `
      <rect x="180" y="90" width="22" height="340" fill="#003399" />
      <rect x="202" y="90" width="22" height="340" fill="#CC0000" />
      <rect x="276" y="90" width="22" height="340" fill="#003399" />
      <rect x="298" y="90" width="22" height="340" fill="#CC0000" />
    `,
    crestSvg: `
      <circle cx="0" cy="0" r="18" fill="#003399" stroke="#FFFFFF" stroke-width="2" />
      <rect x="-10" y="-8" width="20" height="16" fill="#CC0000" />
      <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
      <polygon points="-5,-22 0,-18 5,-22" fill="#FFD700" />
    `,
    brandSvg: `
      <polygon points="-8,4 0,-6 8,4" fill="#003399" />
    `,
    sponsorSvg: `
      <text x="250" y="260" fill="#003399" font-family="sans-serif" font-size="15" font-weight="900" text-anchor="middle" letter-spacing="2">ESPORTES</text>
    `
  },
  {
    id: 'athletico-pr',
    name: 'Athletico Paranaense - Furacão',
    baseColor: '#111111',
    collarColor: '#C4161C',
    collarAccent: '#FFFFFF',
    cuffColor: '#C4161C',
    patterns: `
      <polygon points="150,300 170,280 320,430 300,430" fill="#C4161C" />
      <polygon points="175,260 195,240 345,390 325,410" fill="#C4161C" />
      <polygon points="200,220 220,200 355,335 340,350" fill="#C4161C" />
      <polygon points="225,180 245,160 355,270 345,285" fill="#C4161C" />
    `,
    crestSvg: `
      <polygon points="-14,-14 14,-14 18,14 -14,14" fill="#111111" stroke="#C4161C" stroke-width="2" />
      <text x="0" y="6" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="900" text-anchor="middle">CAP</text>
    `,
    brandSvg: `
      <polygon points="-10,0 0,-7 10,0 0,7" fill="none" stroke="#FFFFFF" stroke-width="2.5" />
    `,
    sponsorSvg: `
      <text x="250" y="260" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="900" text-anchor="middle" letter-spacing="2">COPEL</text>
    `
  },
  {
    id: 'fortaleza',
    name: 'Fortaleza EC - Leão do Pici',
    baseColor: '#003399',
    collarColor: '#FFFFFF',
    collarAccent: '#CC0000',
    cuffColor: '#CC0000',
    patterns: `
      <rect x="0" y="150" width="500" height="40" fill="#CC0000" />
      <line x1="0" y1="150" x2="500" y2="150" stroke="#FFFFFF" stroke-width="4" />
      <line x1="0" y1="190" x2="500" y2="190" stroke="#FFFFFF" stroke-width="4" />

      <rect x="0" y="250" width="500" height="40" fill="#CC0000" />
      <line x1="0" y1="250" x2="500" y2="250" stroke="#FFFFFF" stroke-width="4" />
      <line x1="0" y1="290" x2="500" y2="290" stroke="#FFFFFF" stroke-width="4" />

      <rect x="0" y="350" width="500" height="40" fill="#CC0000" />
      <line x1="0" y1="350" x2="500" y2="350" stroke="#FFFFFF" stroke-width="4" />
      <line x1="0" y1="390" x2="500" y2="390" stroke="#FFFFFF" stroke-width="4" />
    `,
    crestSvg: `
      <polygon points="-16,-16 16,-16 16,8 0,20 -16,8" fill="#003399" stroke="#FFFFFF" stroke-width="2" />
      <rect x="-14" y="-14" width="28" height="12" fill="#CC0000" />
      <text x="0" y="11" fill="#FFFFFF" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">FEC</text>
      <polygon points="0,-22 3,-17 -3,-17" fill="#FFD700" />
    `,
    brandSvg: `
      <text x="5" y="5" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">VOLT</text>
    `,
    sponsorSvg: `
      <text x="250" y="225" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="900" text-anchor="middle" letter-spacing="2">NOVIBET</text>
    `
  },
  {
    id: 'bragantino',
    name: 'Red Bull Bragantino - Massa Bruta',
    baseColor: '#FFFFFF',
    collarColor: '#CC0000',
    collarAccent: '#111111',
    cuffColor: '#CC0000',
    patterns: `
      <polygon points="200,100 240,100 220,430 180,430" fill="#E8E8E8" />
      <polygon points="250,140 270,140 260,380 240,380" fill="#CC0000" />
      <polygon points="290,120 320,120 300,430 270,430" fill="#E8E8E8" />
    `,
    crestSvg: `
      <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#CC0000" stroke-width="2.5" />
      <text x="0" y="4" fill="#CC0000" font-family="sans-serif" font-size="10" font-weight="900" text-anchor="middle">RBB</text>
      <circle cx="0" cy="-6" r="3" fill="#FFD700" />
    `,
    brandSvg: `
      <circle cx="5" cy="0" r="8" fill="none" stroke="#CC0000" stroke-width="2" />
    `,
    sponsorSvg: `
      <text x="250" y="260" fill="#CC0000" font-family="sans-serif" font-size="18" font-weight="900" text-anchor="middle" letter-spacing="3">RED BULL</text>
    `
  }
];

teams.forEach(team => {
  const svgContent = createSvg(team);
  const filePath = path.join(outputDir, `${team.id}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf8');
  console.log(`Generated: ${team.id}.svg`);
});

console.log(`\nSuccessfully generated ${teams.length} Serie A football jersey SVGs!`);

