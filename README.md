# Djehamie Hair Braiding — Site web

Site vitrine pour **Djehamie Hair Braiding**, salon de tressage afro professionnel à Chicago.
Construit avec **Next.js 14 (App Router)**, **TypeScript** et **Tailwind CSS**.

## 🚀 Démarrage

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000

Pour la mise en production :

```bash
npm run build
npm start
```

Déploiement recommandé : **Vercel** (zéro configuration). Le domaine cible est
`djehamiihairbraiding.com` / `djehamiehairbraiding.com` (cf. cahier des charges).

## 🗂️ Structure

```
app/
  layout.tsx        → polices, SEO, JSON-LD (schema.org HairSalon), nav + footer
  page.tsx          → Accueil (hero, services, galerie, avis, CTA)
  services/         → Carte des prestations + tarifs
  galerie/          → Portfolio + emplacement flux Instagram
  reservation/      → Intégration Fresha + formulaire de secours
  a-propos/         → Histoire du salon & valeurs
  contact/          → Coordonnées, carte Google Maps, formulaire
  sitemap.ts, robots.ts, not-found.tsx
components/         → Navbar, Footer, Reviews, GalleryGrid, formulaires, UI, icônes
lib/site.ts         → ⭐ TOUT le contenu modifiable (infos, services, avis, galerie)
public/images/      → Photos du salon
```

## ✏️ Modifier le contenu

Presque tout se règle dans **`lib/site.ts`** : adresse, téléphone, liens réseaux,
services, tarifs, avis Google, légendes de la galerie.

## 🔌 Intégrations à brancher (cf. stratégie d'intégration)

Le site est pensé pour **agréger l'existant** sans double saisie :

| Élément | Où | À faire |
|--------|-----|---------|
| **Réservation Fresha** | `lib/site.ts → business.fresha` + iframe dans `app/reservation/page.tsx` | Coller l'URL/widget Fresha exact du salon |
| **Avis Google en direct** | `components/Reviews.tsx` | Optionnel : remplacer les avis statiques par un widget Elfsight / Trustindex |
| **Flux Instagram** | `app/galerie/page.tsx` (bloc commenté) | Coller le widget EmbedSocial / Elfsight (ou Smash Balloon si WordPress) |
| **Carte Google Maps** | `lib/site.ts → business.mapsEmbed` | Déjà fonctionnelle ; lier à la fiche Google Business |
| **Lien « Laisser un avis »** | `lib/site.ts → googleReviewUrl` | Remplacer `YOUR_PLACE_ID` par le Place ID Google du salon |
| **Formulaires** | `components/BookingForm.tsx`, `ContactForm.tsx` | Repli SMS/mail actif ; brancher Formspree / une route API pour l'envoi e-mail |

## 🎨 Charte graphique

- **Couleurs** : crème chaude, espresso (brun profond), or, terracotta — définies dans `tailwind.config.ts`.
- **Typographies** : *Fraunces* (titres, éditorial) + *Hanken Grotesk* (texte), via `next/font`.
- **Esprit** : luxe chaleureux, culturel, clin d'œil aux miroirs ronds dorés du salon.

## ✅ Conforme au cahier des charges

Responsive · réservation en ligne · galerie dynamique · flux Instagram (emplacement) ·
formulaire de contact · carte Google Maps · bouton « Appeler » mobile · SEO local
(métadonnées, sitemap, robots, schema.org) · note Google 4,8 ★ mise en avant.
