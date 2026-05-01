---
name: Warm & Appetizing
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#59413d'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#8d716b'
  outline-variant: '#e1bfb9'
  surface-tint: '#ae311e'
  primary: '#ae311e'
  on-primary: '#ffffff'
  primary-container: '#ff6b52'
  on-primary-container: '#6a0700'
  inverse-primary: '#ffb4a6'
  secondary: '#605e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2de'
  on-secondary-container: '#666461'
  tertiary: '#5d5f5d'
  on-tertiary: '#ffffff'
  tertiary-container: '#999a98'
  on-tertiary-container: '#303231'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a6'
  on-primary-fixed: '#3f0300'
  on-primary-fixed-variant: '#8c1808'
  secondary-fixed: '#e5e2de'
  secondary-fixed-dim: '#c9c6c2'
  on-secondary-fixed: '#1c1c19'
  on-secondary-fixed-variant: '#484744'
  tertiary-fixed: '#e2e3e1'
  tertiary-fixed-dim: '#c6c7c5'
  on-tertiary-fixed: '#1a1c1b'
  on-tertiary-fixed-variant: '#454746'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  card-gap: 24px
---

## Brand & Style
The design system is built on the philosophy of "Culinary Clarity." It evokes the warmth of a sun-drenched kitchen and the cleanliness of a high-end bistro. The target audience values freshness, ease of use, and visual inspiration. 

The style is a refined **Minimalism** blended with **Modern Corporate** sensibilities. It prioritizes generous whitespace to let food photography act as the primary visual driver. By utilizing a "High-Curation" approach, the interface recedes, ensuring that the vibrancy of the dishes remains the focal point while providing a trustworthy, effortless ordering experience.

## Colors
The palette is rooted in appetizing warmth. The primary **Sunset Coral** is used strategically for calls to action, price highlights, and critical navigation cues, stimulating appetite and urgency. 

The background uses a **Warm White** rather than a sterile pure white to maintain a soft, inviting atmosphere. Secondary surfaces utilize **Soft Greys** with slight warm undertones to create subtle containment without introducing harsh contrast. Typography and iconography leverage a deep **Charcoal Neutral** for maximum legibility against the light background.

## Typography
This design system utilizes **Plus Jakarta Sans** for its friendly, rounded terminals and exceptional legibility. The typeface strikes a balance between professional modernism and approachable warmth. 

Headlines use tighter letter-spacing and heavier weights to command attention and create an editorial feel. Body text is optimized with a generous line height to ensure descriptions of ingredients and dishes are easy to scan. Labels are used for metadata like "Delivery Time" or "Nutritional Info," often paired with increased letter spacing for clarity at smaller sizes.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to maintain an editorial, magazine-like feel, while transitioning to a fluid single-column layout on mobile. A strict 8px spatial rhythm governs all padding and margins.

Spaciousness is a functional requirement here, not just an aesthetic choice. Large margins (48px+) are used to separate different cuisine categories, while a consistent 24px gutter ensures that "Food Cards" have enough breathing room to be distinct. Content should never feel cramped; if in doubt, increase the vertical padding between sections.

## Elevation & Depth
Depth in this design system is achieved through **Ambient Shadows** and **Tonal Layers**. Instead of heavy borders, the system relies on soft, diffused shadows (Blur: 20px, Opacity: 4%) with a slight warm tint to lift cards off the Warm White background.

Interactive elements like "Add to Cart" buttons use a slightly more pronounced shadow to indicate clickability. When a user hovers over a food card, the elevation should subtly increase (y-offset moves from 4px to 8px) to provide tactile feedback. Semi-transparent overlays (Glassmorphism) are reserved exclusively for mobile navigation bars and sticky headers to maintain context of the food scroll underneath.

## Shapes
The shape language is consistently **Rounded**, reflecting the "friendly" brand pillar. Standard buttons and cards use a 16px (1rem) corner radius. This softness mirrors the organic shapes found in food and avoids the aggressive, clinical feel of sharp corners. Large imagery containers (like Hero banners) should use the `rounded-xl` setting (24px) to create a soft frame for photography.

## Components
- **Cards:** The core component. Food cards must feature edge-to-edge photography at the top, with a 16px padded content area below for title, rating, and price. 
- **Buttons:** Primary buttons are solid Sunset Coral with white text. Secondary buttons are Ghost-style with a 1px soft grey border.
- **Chips:** Used for dietary tags (e.g., "Vegan", "Gluten-Free"). These use a soft-grey background with charcoal text and a pill-shaped radius.
- **Inputs:** Search bars and form fields use a subtle soft-grey fill rather than a border, turning into a Sunset Coral border only on focus.
- **Quantity Selector:** A specialized component for the cart, featuring large "+" and "-" hit areas to ensure ease of use on mobile devices.
- **Status Badges:** Small, high-contrast badges (e.g., "Popular", "New") should be overlaid on the top-left corner of food images.