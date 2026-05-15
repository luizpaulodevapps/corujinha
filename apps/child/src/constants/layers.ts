/**
 * 🪜 Layer System
 * 
 * Centraliza os z-indexes para evitar conflitos visuais e garantir a hierarquia correta,
 * especialmente em ambientes PWA e Mobile.
 */

export const LAYERS = {
  WORLD: 1,
  CONTENT: 10,
  NAV: 9000,
  OVERLAY: 9100,
  POPOVER: 9200,
  MODAL: 9500,
  CEREMONY: 9800,
  RITUAL: 10000,
  CRITICAL: 11000
} as const
