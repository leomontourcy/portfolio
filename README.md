# Portfolio — Léo Montourcy

Portfolio personnel présentant mon parcours en **BUT Informatique** à l'IUT Paul Sabatier (Toulouse), mes compétences et mes projets.

🔗 **Site en ligne : [leomontourcy.github.io/portfolio](https://leomontourcy.github.io/portfolio/)**

## Fonctionnalités

- **Bilingue français / anglais** : changement de langue instantané en JavaScript natif, via des attributs `data-fr` / `data-en`, sans rechargement de page. Le choix est mémorisé (`localStorage`).
- **Thème clair / sombre** : respecte la préférence du système (`prefers-color-scheme`) et mémorise le choix de l'utilisateur.
- **Animations au défilement** avec l'API `IntersectionObserver` (apparition des sections, barres de niveau de langue, lien actif dans le menu).
- **Formulaire de contact fonctionnel**, envoyé en asynchrone (`fetch`) via [Formspree](https://formspree.io/), avec retour visuel de succès ou d'erreur.
- **Responsive** : mise en page adaptée au mobile, avec un menu dédié.

## Technologies

- **HTML5** : structure sémantique, balises Open Graph
- **CSS3** : variables CSS, Grid, Flexbox, animations
- **JavaScript (ES6+)** : sans framework ni dépendance

## Structure

```
├── index.html    # Contenu de la page (FR/EN)
├── style.css     # Mise en page, thèmes clair/sombre, responsive
├── main.js       # Langue, thème, animations, formulaire
├── cv.pdf        # CV téléchargeable
└── photo/        # Photo de profil
```

## Lancer en local

Aucune installation n'est nécessaire : il suffit d'ouvrir `index.html` dans un navigateur, ou de lancer un petit serveur local :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déploiement

Le site est hébergé avec **GitHub Pages** depuis la branche `main`.

---

[LinkedIn](https://www.linkedin.com/in/l%C3%A9o-montourcy-5b7381437/) · [GitHub](https://github.com/leomontourcy)
