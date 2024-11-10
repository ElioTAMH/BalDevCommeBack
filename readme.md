# BalDev Documentation - Contribution Guide

[English](#english) | [Français](#français)

## English

### How to Contribute

Thank you for your interest in contributing to BalDev Documentation! There are several ways you can help improve the project:

#### 1. Adding or Updating Documentation

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Add your content in `src/data/documentation.json`
4. Follow the existing structure:

```json
{
  "category": {
    "title": "Category Title",
    "sections": [
      {
        "title": "Section Title",
        "content": "HTML content with <p> and <ul> tags",
        "code": "Your code example",
        "preview": {
          "type": "visual or console",
          "html": "Preview HTML"
        }
      }
    ]
  }
}
```

#### 2. Adding Translations

1. Navigate to `src/translations/`
2. Add or modify translation files:
   - For new languages: Create `[language-code].ts`
   - Follow the structure in existing files like `en.ts` or `fr.ts`
3. Update the language selector in `src/components/LanguageSelector.tsx`

#### 3. Bug Fixes

1. Check existing issues or create a new one
2. Fork and clone the repository
3. Create a bug fix branch: `git checkout -b fix/bug-name`
4. Implement your fix
5. Test thoroughly
6. Submit a pull request with:
   - Clear description of the fix
   - Steps to reproduce the bug
   - Screenshots if applicable

#### 4. Feature Development

1. Discuss new features in Issues first
2. Fork and create a feature branch
3. Implement the feature
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

### Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Français

### Comment Contribuer

Merci de votre intérêt pour contribuer à BalDev Documentation ! Voici les différentes façons d'améliorer le projet :

#### 1. Ajouter ou Mettre à Jour la Documentation

1. Forkez le dépôt
2. Créez une nouvelle branche : `git checkout -b feature/nom-de-votre-feature`
3. Ajoutez votre contenu dans `src/data/documentation.json`
4. Suivez la structure existante :

```json
{
  "categorie": {
    "title": "Titre de la Catégorie (langage de programmation web si la catégorie n'existe pas déjà)",
    "sections": [
      {
        "title": "Titre de la Section",
        "content": "Contenu HTML avec balises <p> et <ul> pour le contenu de votre section",
        "code": "Votre exemple de code",
        "preview": {
          "type": "visual ou console",
          "html": "Aperçu HTML ou console"
        }
      }
    ]
  }
}
```

#### 2. Ajouter des Traductions

1. Accédez au dossier `src/translations/`
2. Ajoutez ou modifiez les fichiers de traduction :
   - Pour nouvelles langues : Créez `[code-langue].ts`
   - Suivez la structure des fichiers existants comme `en.ts` ou `fr.ts` ou documentation.fr.ts sachant que de base la documentation est en anglais
3. Mettez à jour le sélecteur de langue dans `src/components/LanguageSelector.tsx`

#### 3. Correction de Bugs

1. Vérifiez les issues existantes ou créez-en une nouvelle
2. Forkez et clonez le dépôt
3. Créez une branche de correction : `git checkout -b fix/nom-du-bug`
4. Implémentez votre correction
5. Testez minutieusement
6. Soumettez une pull request avec :
   - Description claire de la correction
   - Étapes pour reproduire le bug
   - Captures d'écran si nécessaire

#### 4. Développement de Fonctionnalités

1. Discutez des nouvelles fonctionnalités dans les Issues
2. Forkez et créez une branche de fonctionnalité
3. Implémentez la fonctionnalité
4. Ajoutez des tests si applicable
5. Mettez à jour la documentation
6. Soumettez une pull request

### Configuration de Développement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

---

## License

[MIT License](LICENSE)
