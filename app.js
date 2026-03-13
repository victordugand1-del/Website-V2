const navItems = [
  ["/", "Accueil"],
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

function card(title, content) {
  return `<article class="card"><h3>${title}</h3>${content}</article>`;
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
    <section class="hero">
      <span class="pill">Produit hybride</span><span class="pill">Coffret + plateforme compagnon</span>
      <h1>Le site de La Focale clarifie, projette, convertit puis accompagne.</h1>
      <p>Le coffret physique reste le centre de gravité. Le digital prolonge l'expérience : progression, validations, retour régulier et fidélité durable.</p>
      <div class="notice"><strong>Garde-fous :</strong> ne pas ressembler à un média, un LMS, un jeu, un dashboard SaaS ni un e-commerce standard.</div>
    </section>

    <section class="section grid grid-3">
      ${card("Vision", "<ul class='list'><li>Le site n'est pas un substitut.</li><li>Promesse : compréhension active d'un sujet complexe.</li><li>Posture sobre, claire, premium et accessible.</li></ul>")}
      ${card("Architecture", "<ul class='list'><li>Pages publiques de découverte.</li><li>Espace personnel comme passeport digital.</li><li>Pages sujet comme liaison entre les deux.</li></ul>")}
      ${card("Parcours", "<ul class='list'><li>Comprendre → se projeter → décider.</li><li>Activer après achat.</li><li>Revenir, progresser, collectionner.</li></ul>")}
    </section>

    <section class="section card">
      <h2>Pages clés prévues</h2>
      <p>Accueil, Le coffret, La plateforme, Les sujets, Offres/S'abonner, Méthode, Espace personnel, pages sujet, pages secondaires de réassurance.</p>
      <p class="small">Le socle implémente déjà la séparation public/personnel, des données simulées, et des composants réutilisables.</p>
    </section>
  `;
}

function renderCoffret() {
  app.innerHTML = `
    <section class="card">
      <h1>Le coffret : centre de gravité de l'expérience</h1>
      <p>Le coffret porte la découverte initiale, la matérialité et la valeur perçue premium. Le site confirme et amplifie cette valeur sans la déplacer.</p>
      <div class="grid grid-2 section">
        ${card("Contenu du coffret", "<ul class='list'><li>Sujet géopolitique structuré</li><li>Supports de lecture/manipulation</li><li>Passeport et logique de validation</li></ul>")}
        ${card("Rôle du digital", "<ul class='list'><li>Tracer le parcours</li><li>Valider étapes et progression</li><li>Installer un retour dans le temps</li></ul>")}
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
      <div class="notice section">Le ton reste adulte, non scolaire, non militant, non technologique.</div>
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
      <p>Chaque sujet relie le coffret physique à un prolongement digital minimal mais concret : avancement, validation, activation.</p>
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
        ${card("Essentiel", "<p class='kpi'>39€</p><p>1 coffret + accès plateforme compagnon</p>")}
        ${card("Continuité", "<p class='kpi'>109€</p><p>3 coffrets + suivi progression + défis hebdo</p>")}
        ${card("Collection", "<p class='kpi'>199€</p><p>6 coffrets + logique de série et badges symboliques</p>")}
      </div>
      <p class="small section">La conversion reste alignée avec la promesse : compréhension, progression, continuité.</p>
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
      <p class="notice section">Cohérence forte entre physique et digital : même promesse, même retenue, même exigence.</p>
    </section>`;
}

function renderPersonal() {
  const { user, weeklyChallenge } = data;
  app.innerHTML = `
    <section class="hero">
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
      <p class="notice section">Règle : prioriser ce qui renforce la valeur centrale, pas ce qui ajoute du bruit.</p>
    </section>`;
}

function validateStep() {
  alert("Étape validée. La progression est enregistrée dans votre passeport digital (simulation). ");
}

window.validateStep = validateStep;
window.addEventListener("hashchange", route);
route();
