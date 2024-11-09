export const frenchDocumentation = {
  javascript: {
    title: "Fondamentaux JavaScript",
    sections: [
      {
        title: "Concepts de base JavaScript",
        content:
          "<p>JavaScript est un langage de programmation polyvalent avec des fonctionnalités clés comme les variables, les fonctions et les objets.</p><ul><li>Les variables stockent des données avec let, const, var</li><li>Les fonctions sont des blocs de code réutilisables</li><li>Les objets regroupent données et fonctionnalités associées</li></ul>",
        code: "const salutation = 'Bonjour le monde';\nlet compteur = 0;\n\nfunction incrementer() {\n  compteur++;\n  return compteur;\n}\n\nconst utilisateur = {\n  nom: 'Jean',\n  age: 30,\n  saluer() {\n    return `Bonjour ${this.nom}`;\n  }\n};",
        copyCode: true,
        preview: {
          type: "console",
          output: "Bonjour le monde\n1\n2\n3\nBonjour Jean",
        },
      },
    ],
  },
  react: {
    title: "Framework React",
    sections: [
      {
        title: "Composants React",
        content:
          "<p>Les composants React sont les éléments de base des applications React.</p><ul><li>Les composants fonctionnels sont modernes et préférés</li><li>Les props transmettent des données entre composants</li><li>L'état gère les données des composants</li></ul>",
        code: "function Bienvenue(props) {\n  const [compte, setCompte] = useState(0);\n  \n  return (\n    <div>\n      <h1>Bonjour, {props.nom}</h1>\n      <button onClick={() => setCompte(compte + 1)}>\n        Cliqué {compte} fois\n      </button>\n    </div>\n  );\n}",
        preview: {
          type: "visual",
          html: "<div style='padding:1rem;background:#f3f4f6;border-radius:0.5rem'><h1 style='margin:0 0 1rem'>Bonjour, Jean</h1><button onclick='this.textContent=`Cliqué ${++this.clicks || (this.clicks=1)} fois`' style='background:#4f46e5;color:white;padding:0.5rem 1rem;border:none;border-radius:0.25rem'>Cliqué 0 fois</button></div>",
        },
      },
    ],
  },
  css: {
    title: "Styles CSS",
    sections: [
      {
        title: "Bordures CSS",
        content:
          "<p>La propriété border en CSS permet de définir les bordures d'un élément. Voici plusieurs façons de l'utiliser.</p>",
        code: ".bordure-basique {\n  border: 2px solid black;\n}\n\n.bordure-radius {\n  border: 1px solid #333;\n  border-radius: 8px;\n}\n\n.bordure-style {\n  border-width: 3px;\n  border-style: dashed;\n  border-color: #ff0000;\n}\n\n.bordure-cotes {\n  border-top: 2px dotted blue;\n  border-right: 4px double green;\n  border-bottom: 3px groove orange;\n  border-left: 1px solid purple;\n}",
        copyCode: true,
        preview: {
          type: "visual",
          html: "<div style='display:flex;gap:1rem;flex-wrap:wrap'><div style='border:2px solid black;padding:1rem'>Bordure Basique</div><div style='border:1px solid #333;border-radius:8px;padding:1rem'>Bordure Radius</div><div style='border-width:3px;border-style:dashed;border-color:#ff0000;padding:1rem'>Style Bordure</div><div style='border-top:2px dotted blue;border-right:4px double green;border-bottom:3px groove orange;border-left:1px solid purple;padding:1rem'>Côtés Bordure</div></div>",
        },
      },
    ],
  },
};
