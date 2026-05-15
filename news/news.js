const DATA_STORAGE_KEY = "dagens.news.data";

const template = document.querySelector("#story-template");
const panels = [...document.querySelectorAll("[data-panel]")];
const articleContainers = new Map(
  [...document.querySelectorAll("[data-articles]")].map((node) => [node.dataset.articles, node]),
);

const initialData = readInlineJSON("#initial-data");
const state = {
  data: loadStoredJSON(DATA_STORAGE_KEY) ?? initialData ?? { generatedAt: "", sections: [] },
  activeTab: readTabFromURL(),
  query: "",
};

bindEvents();
render();
refreshData();
registerServiceWorker();

function bindEvents() {
  // Header "News" nav link toggles between nyheter/news when on this page
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-nav='news']");
    if (link) {
      event.preventDefault();
      setActiveTab(state.activeTab === "nyheter" ? "news" : "nyheter");
    }
  });

  // Header search — injected after module runs so use event delegation
  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-search-input]")) {
      state.query = event.target.value ?? "";
      render();
    }
  });

  window.addEventListener("popstate", () => {
    state.activeTab = readTabFromURL();
    render();
  });
}

function render() {
  const section = getActiveSection();
  const q = normalizeForSearch(state.query);
  const articles = filterArticles(section, q);

  // Nav link text reflects active section so it reads as a toggle
  const navLink = document.querySelector("[data-nav='news']");
  if (navLink) navLink.textContent = state.activeTab === "nyheter" ? "Nyheter" : "News";

  for (const panel of panels) {
    const isActive = panel.dataset.panel === state.activeTab;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
  }

  const container = articleContainers.get(state.activeTab);
  if (container) renderArticles(container, articles);
}

async function refreshData() {
  try {
    const res = await fetch("./data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("data.json " + res.status);
    const data = await res.json();
    state.data = data;
    persistJSON(DATA_STORAGE_KEY, data);
    render();
  } catch (err) {
    const fallback = loadStoredJSON(DATA_STORAGE_KEY);
    if (fallback) { state.data = fallback; render(); }
    console.warn("Unable to refresh news data", err);
  }
}

function filterArticles(section, q) {
  const articles = section?.articles ?? [];
  if (!q) return articles;
  return articles.filter((a) => {
    const hay = (a.title + " " + a.source + " " + a.summary).toLowerCase();
    return hay.includes(q);
  });
}

function renderArticles(container, articles) {
  container.replaceChildren();
  if (!articles.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = state.query ? "No stories matched." : "No stories available right now.";
    container.append(empty);
    return;
  }
  const fragment = document.createDocumentFragment();
  for (const article of articles) {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector("[data-story-source]").textContent = article.source;
    const link = node.querySelector("[data-story-link]");
    link.textContent = article.title;
    link.href = article.link;
    const summary = node.querySelector("[data-story-summary]");
    if (article.summary) { summary.textContent = article.summary; summary.hidden = false; }
    else { summary.hidden = true; }
    const time = node.querySelector("[data-story-time]");
    time.dateTime = article.publishedAt;
    time.textContent = formatDateTime(article.publishedAt);
    fragment.append(node);
  }
  container.append(fragment);
}

function getActiveSection() {
  return (state.data.sections ?? []).find((s) => s.key === state.activeTab)
    ?? state.data.sections?.[0]
    ?? { key: state.activeTab, label: state.activeTab, articles: [] };
}

function setActiveTab(tab) {
  state.activeTab = tab === "news" ? "news" : "nyheter";
  const url = new URL(window.location.href);
  url.searchParams.set("tab", state.activeTab);
  window.history.pushState({}, "", url);
  render();
}

function readTabFromURL() {
  const tab = new URLSearchParams(window.location.search).get("tab");
  return tab === "news" || tab === "nyheter" ? tab : "nyheter";
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./news-sw.js", { scope: "./" })
      .catch((err) => console.warn("SW registration failed", err));
  });
}

function readInlineJSON(selector) {
  try { return JSON.parse(document.querySelector(selector)?.textContent ?? ""); }
  catch { return null; }
}

function loadStoredJSON(key) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
  catch { return null; }
}

function persistJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function normalizeForSearch(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function formatDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(d);
}
