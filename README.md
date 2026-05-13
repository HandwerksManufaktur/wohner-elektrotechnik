# Wohner Elektrotechnik — Website

Statische Multi-Page-Website für [Wohner Elektrotechnik](https://elektrotechnik-wohner.de) — Photovoltaik, Batteriespeicher und Wallboxen im Raum Landsberg & Weilheim.

## Struktur

```
.
├── index.html                    # Startseite
├── ueber-uns.html                # Über uns
├── pv-anlagen.html               # Photovoltaik
├── batteriespeicher.html         # Speicher
├── ladestationen.html            # Wallboxen
├── elektroinstallation.html      # Elektroinstallation
├── kontakt.html                  # Kontaktformular
├── impressum.html                # Impressum
├── datenschutz.html              # Datenschutz
├── css/
│   └── style.css                 # Komplettes Stylesheet
├── js/
│   └── main.js                   # Nav, Reveal, Lightbox, Filter, Form
└── assets/
    ├── logo.jpg
    └── projects/                 # Alle Projektfotos
        ├── project-01-...jpg
        └── ...
```

## Lokal ausführen

Ohne Build-Tools — einfach `index.html` im Browser öffnen, oder ein simples Static-Server:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .
```

Dann http://localhost:8000 öffnen.

## Tech-Stack

- Pure HTML / CSS / JS — kein Framework, kein Build-Step
- Schriften: Inter + Geist Mono via Google Fonts
- Bilder: Eigene Projektfotos, optimiert auf 1600px / Quality 82
- Responsive ab 540px Mobile bis Desktop

## Kontaktformular

Aktuell ist das Formular ein **Demo-Stub** — beim Submit zeigt es nur "Gesendet ✓" an. Für Production:

- Formspree, Basin, Netlify Forms oder eigenes Backend (PHP/Node-Endpoint)
- In `js/main.js` den `contact-form` Handler durch echten POST-Request ersetzen

## Bewertungen

Die Testimonials in `index.html` sind **Platzhalter**. Sobald echte Google-Bewertungen vorhanden sind, einfach im HTML ersetzen:

```html
<div class="testi reveal">
  <div class="testi__head"><span class="testi__stars">★★★★★</span></div>
  <p class="testi__text">„Echter Bewertungstext..."</p>
  <div class="testi__author">Echter Name</div>
  <div class="testi__where">Echter Ort</div>
</div>
```

## Hosting

Funktioniert auf jeder Static-Hosting-Plattform:

- **Netlify**: Repo verbinden → automatisches Deployment bei Push
- **Vercel**: Genauso, ein Klick
- **GitHub Pages**: Settings → Pages → Branch wählen
- **Klassisches Webhosting**: Per FTP hochladen

## Lizenz

© 2026 Wohner Elektrotechnik. Alle Inhalte und Bildrechte beim Inhaber.
