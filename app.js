const navItems = [
  ["/", "Accueil"],
  ["/architecture", "Architecture"],
  ["/coffret", "Le coffret"],
  ["/plateforme", "La plateforme"],
  ["/sujets", "Les sujets"],
  ["/offres", "Offres"],
  ["/methode", "Méthode"],
  ["/espace", "Espace personnel"],
  ["/roadmap", "MVP · V1 · V2"],
];

const data = {
  user: {
    name: "Camille",
    passportId: "LF-2048",
    activeBox: "Géopolitique de l'eau",
    progress: 62,
    completed: 3,
    inProgress: 2,
    badges: ["Rigueur", "Continuité", "Vision d'ensemble"],
  },
  topics: [
    { id: "eau", title: "Géopolitique de l'eau", status: "En cours", completion: 62, availability: "Disponible", activation: "Défi hebdo : cartographier un acteur clé" },
    { id: "arctique", title: "Arctique stratégique", status: "Complété", completion: 100, availability: "Disponible", activation: "Validation finale effectuée" },
    { id: "ia", title: "IA et puissances", status: "À commencer", completion: 0, availability: "Bientôt", activation: "Pré-inscription ouverte" },
  ],
  weeklyChallenge: {
    title: "Défi 15 minutes — comprendre une interdépendance",
    frequency: "Hebdomadaire",
    reward: "Badge symbolique + point de continuité",
    status: "Ouvert jusqu'à dimanche",
  },
  architecture: [
    {
      key: "vente",
      label: "Vente",
      points: [
        "Landing / précommande",
        "Offre claire (12 mois, 6 mois, mensuel)",
        "Checkout rassurant",
        "Page merci avec prochaine action",
      ],
    },
    {
      key: "postachat",
      label: "Post achat",
      points: [
        "Start : mode d'emploi ultra simple",
        "Profil : tableau de bord personnel",
        "Gestion abonnement fluide",
      ],
    },
    {
      key: "produit",
      label: "Vie du produit",
      points: [
        "Passeport digital (tampons/progression)",
        "Défis hebdo courts",
        "Débat cadré mensuel",
        "Badges et récompenses sobres",
        "Parrainage cohérent",
      ],
    },
    {
      key: "confiance",
      label: "Confiance",
      points: [
        "Méthode transparente",
        "FAQ utile",
        "À propos clair",
        "Contact direct",
      ],
    },
    {
      key: "legal",
      label: "Légal",
      points: [
        "CGV",
        "Mentions légales",
        "Confidentialité / RGPD",
        "Retours et remboursements",
      ],
    },
  ],
};

const app = document.getElementById("app");
const nav = document.getElementById("main-nav");

function link(path, label) {
  const a = document.createElement("a");
  a.href = `#${path}`;
  a.textContent = label;
  if ((location.hash.slice(1) || "/") === path) a.classList.add("active");
  return a;
}

function renderNav() {
  nav.innerHTML = "";
  navItems.forEach(([path, label]) => nav.appendChild(link(path, label)));
}

function card(title, content, className = "") {
  return `<article class="card ${className}"><h3>${title}</h3>${content}</article>`;
}

function route() {
  const path = location.hash.slice(1) || "/";
  renderNav();

  if (path.startsWith("/sujet/")) {
    const id = path.split("/sujet/")[1];
    return renderTopicDetail(id);
  }

  const pages = {
    "/": renderHome,
    "/architecture": renderArchitecture,
    "/coffret": renderCoffret,
    "/plateforme": renderPlatform,
    "/sujets": renderTopics,
    "/offres": renderOffers,
    "/methode": renderMethod,
    "/espace": renderPersonal,
    "/roadmap": renderRoadmap,
  };

  (pages[path] || renderHome)();
}

function renderHome() {
  app.innerHTML = `
    <section class="hero lively">
      <span class="pill">Produit hybride</span><span class="pill">Coffret + plateforme compagnon</span>
      <h1>Un site plus vivant, mais toujours clair et premium.</h1>
      <p>La Focale relie découverte, achat, activation, progression et fidélité dans une seule expérience continue.</p>
      <div class="cta-row">
        <a class="btn" href="#/architecture">Voir l'architecture complète</a>
        <a class="btn secondary" href="#/offres">Voir les offres</a>
      </div>
    </section>

    <section class="section ribbon-grid">
      <article class="ribbon sale">Vente</article>
      <article class="ribbon post">Post achat</article>
      <article class="ribbon product">Vie du produit</article>
      <article class="ribbon trust">Confiance</article>
      <article class="ribbon legal">Légal</article>
    </section>

    <section class="section grid grid-3">
      ${card("Vision", "<ul class='list'><li>Le site n'est pas un substitut.</li><li>Promesse : compréhension active d'un sujet complexe.</li><li>Posture sobre, claire, premium et accessible.</li></ul>")}
      ${card("Architecture", "<ul class='list'><li>Pages publiques de découverte.</li><li>Espace personnel comme passeport digital.</li><li>Pages sujet comme liaison entre les deux.</li></ul>")}
      ${card("Parcours", "<ul class='list'><li>Comprendre → se projeter → décider.</li><li>Activer après achat.</li><li>Revenir, progresser, collectionner.</li></ul>")}
    </section>
  `;
}

function renderArchitecture() {
  const items = data.architecture
    .map(
      (block) =>
        `<article class="arch-card ${block.key}">
          <h3>${block.label}</h3>
          <ul class="list">${block.points.map((point) => `<li>${point}</li>`).join("")}</ul>
        </article>`
    )
    .join("");

  app.innerHTML = `
    <section class="card">
      <h1>Architecture du site</h1>
      <p>Voici une structure claire et colorée inspirée de ton schéma : du parcours de vente jusqu'aux pages de confiance et légales.</p>
      <div class="arch-grid section">${items}</div>
    </section>
  `;
}

function renderCoffret() {
  app.innerHTML = `
    <section class="card">
      <h1>Le coffret : centre de gravité de l'expérience</h1>
      <p>Le coffret porte la découverte initiale, la matérialité et la valeur perçue premium. Le site confirme et amplifie cette valeur sans la déplacer.</p>
      <div class="grid grid-2 section">
        ${card("Contenu du coffret", "<ul class='list'><li>Sujet géopolitique structuré</li><li>Supports de lecture/manipulation</li><li>Passeport et logique de validation</li></ul>", "accent-soft")}
        ${card("Rôle du digital", "<ul class='list'><li>Tracer le parcours</li><li>Valider étapes et progression</li><li>Installer un retour dans le temps</li></ul>", "accent-soft")}
      </div>
    </section>`;
}

function renderPlatform() {
  app.innerHTML = `
    <section class="card">
      <h1>La plateforme : continuité personnelle</h1>
      <p>L'espace digital agit comme un passeport : il montre ce qui est commencé, validé, complété, et ce qui reste à explorer.</p>
      <div class="grid grid-2 section">
        ${card("Fonctionnalités MVP", "<ul class='list'><li>Profil/passeport</li><li>Suivi de progression</li><li>Validation d'étapes</li><li>Première mécanique de retour</li></ul>")}
        ${card("Engagement maîtrisé", "<ul class='list'><li>Badges et points symboliques</li><li>Défis hebdo courts</li><li>Pas de sur-gamification</li></ul>")}
      </div>
    </section>`;
}

function renderTopics() {
  const topicCards = data.topics
    .map(
      (t) => card(
        t.title,
        `<p><strong>État :</strong> ${t.status}</p>
         <p><strong>Disponibilité :</strong> ${t.availability}</p>
         <div class="progress"><span style="width:${t.completion}%"></span></div>
         <p class="small">${t.activation}</p>
         <p><a href="#/sujet/${t.id}">Ouvrir la page sujet</a></p>`
      )
    )
    .join("");

  app.innerHTML = `
    <section class="card">
      <h1>Les sujets : profondeur, collection, continuité</h1>
      <div class="grid grid-3 section">${topicCards}</div>
    </section>`;
}

function renderTopicDetail(id) {
  const topic = data.topics.find((t) => t.id === id) || data.topics[0];
  app.innerHTML = `
    <section class="card">
      <h1>Sujet — ${topic.title}</h1>
      <p>Page de liaison entre objet physique et plateforme.</p>
      <div class="grid grid-2 section">
        ${card("Progression", `<p>${topic.completion}% complété</p><div class='progress'><span style='width:${topic.completion}%'></span></div><button class='btn' onclick='validateStep()'>Valider une étape</button>`) }
        ${card("Activation", `<p>${topic.activation}</p><p>Mini-format de retour régulier pour installer l'habitude.</p>`) }
      </div>
      <p class="section"><a href="#/sujets">← Retour à tous les sujets</a></p>
    </section>`;
}

function renderOffers() {
  app.innerHTML = `
    <section class="card">
      <h1>Offres / S'abonner</h1>
      <p>Page de conversion structurée : elle transforme l'intérêt en décision sans réduire le produit à un achat isolé.</p>
      <div class="grid grid-3 section">
        ${card("Essentiel", "<p class='kpi'>39€</p><p>1 coffret + accès plateforme compagnon</p>", "pricing")}
        ${card("Continuité", "<p class='kpi'>109€</p><p>3 coffrets + suivi progression + défis hebdo</p>", "pricing")}
        ${card("Collection", "<p class='kpi'>199€</p><p>6 coffrets + logique de série et badges symboliques</p>", "pricing")}
      </div>
    </section>`;
}

function renderMethod() {
  app.innerHTML = `
    <section class="card">
      <h1>Méthode / Notre approche</h1>
      <div class="grid grid-2 section">
        ${card("Principes UX", "<ul class='list'><li>Clarté avant spectaculaire</li><li>Sobriété engageante</li><li>Action visible sans agitation</li></ul>")}
        ${card("Posture de marque", "<ul class='list'><li>Compréhension plutôt que commentaire</li><li>Pédagogie adulte, jamais scolaire</li><li>Premium par la qualité d'ensemble</li></ul>")}
      </div>
    </section>`;
}

function renderPersonal() {
  const { user, weeklyChallenge } = data;
  app.innerHTML = `
    <section class="hero profile-hero">
      <span class="pill">Passeport digital</span>
      <h1>Bonjour ${user.name}</h1>
      <p>ID Passeport : <strong>${user.passportId}</strong> · Coffret actif : <strong>${user.activeBox}</strong></p>
    </section>

    <section class="section grid grid-3">
      ${card("Progression globale", `<p class='kpi'>${user.progress}%</p><div class='progress'><span style='width:${user.progress}%'></span></div>`) }
      ${card("Sujets", `<p>${user.inProgress} en cours · ${user.completed} complétés</p>`) }
      ${card("Badges", `<p>${user.badges.join(" · ")}</p>`) }
    </section>

    <section class="section grid grid-2">
      ${card("Défi hebdomadaire", `<p>${weeklyChallenge.title}</p><ul class='list'><li>${weeklyChallenge.frequency}</li><li>${weeklyChallenge.status}</li><li>${weeklyChallenge.reward}</li></ul>`) }
      ${card("Activité récente", "<ul class='list'><li>Validation d'une étape du sujet Eau</li><li>Défi de continuité accompli</li><li>Nouveau sujet recommandé</li></ul>") }
    </section>
  `;
}

function renderRoadmap() {
  app.innerHTML = `
    <section class="card">
      <h1>Priorisation produit : MVP, V1, V2</h1>
      <div class="grid grid-3 section">
        ${card("MVP", "<ul class='list'><li>Pages publiques essentielles</li><li>Espace personnel minimal</li><li>Progression visible + validation simple</li><li>1 mécanique de retour périodique</li></ul>")}
        ${card("V1", "<ul class='list'><li>Profondeur des pages sujet</li><li>Collections enrichies</li><li>Badges mieux contextualisés</li><li>Réactivation plus fine</li></ul>")}
        ${card("V2", "<ul class='list'><li>Couches relationnelles maîtrisées</li><li>Mécaniques avancées (parrainage/récompenses)</li><li>Sans dénaturer la promesse centrale</li></ul>")}
      </div>
    </section>`;
}

function validateStep() {
  alert("Étape validée. La progression est enregistrée dans votre passeport digital (simulation).");
}

window.validateStep = validateStep;
window.addEventListener("hashchange", route);
route();
