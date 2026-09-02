export interface ArenaLocation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  metro: string;
  area: string;
  rigsCount: number;
  vipRoomsCount: number;
  ps5RoomsCount: number;
  phone: string;
  telegram: string;
  workingHours: string;
  rating: number;
  reviewsCount: number;
  image: string;
  features: string[];
  status: 'ONLINE' | 'MAINTENANCE';
  coordinates: { x: number; y: number };
}

export interface ZoneType {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  capacity: string;
  hardwareBrief: string[];
  features: string[];
  pricePerHour: number;
  priceNight: number;
  image: string;
  badge?: string;
  popular?: boolean;
}

export interface HardwareItem {
  id: string;
  category: 'monitors' | 'rigs' | 'keyboards' | 'mice' | 'audio' | 'chairs';
  categoryLabel: string;
  name: string;
  model: string;
  tagline: string;
  image: string;
  keySpecs: { label: string; value: string; detail?: string }[];
  description: string;
  proAdvantage: string;
  interactiveType: 'hertz' | 'actuation' | 'sensor' | 'audioGraph' | 'fps' | 'ergonomics';
}

export interface Tournament {
  id: string;
  title: string;
  game: 'CS2' | 'DOTA 2' | 'VALORANT' | 'EA FC 25' | 'TEKKEN 8';
  badge?: string;
  gameTag?: string;
  prizePool: string;
  prizePoolNumeric: number;
  date: string;
  time: string;
  location: string;
  format: string;
  slotsTotal: number;
  slotsRegistered: number;
  registrationOpen: boolean;
  entryFee: string;
  streamUrl?: string;
  description: string;
  rules: string[];
  prizes: { place: string; reward: string }[];
}

export interface Promotion {
  id: string;
  title: string;
  tag: string;
  discount: string;
  period: string;
  description: string;
  perks: string[];
  code: string;
  colorScheme: 'red' | 'dark' | 'steel';
  featured?: boolean;
}

export interface BookingState {
  arenaId: string;
  zoneId: string;
  date: string;
  time: string;
  durationHours: number;
  guestsCount: number;
  customerName: string;
  customerPhone: string;
  notes?: string;
}
