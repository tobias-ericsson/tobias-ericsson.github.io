const MARKDOWN_URL = "links.md";

let ALL_ROWS = [];
let ACTIVE_TAB = null;
let SECTION_BASE = [];

// Event delegation — header is injected after this script runs
document.addEventListener("input", debounce(function (evt) {
  if (evt.target.matches("[data-search-input]")) applyFilters();
}, 120));

async function loadMarkdown() {
  const res = await fetch(MARKDOWN_URL, { cache: "no-cache" });
  return res.text();
}

function parseMarkdown(md) {
  const lines = md.split(/\r?\n/);
  const rows = [];
  let section = "", subsection = "";
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("## ")) { section = line.slice(3).trim(); subsection = ""; continue; }
    if (line.startsWith("### ")) { subsection = line.slice(4).trim(); continue; }
    if (line.startsWith("* ")) {
      const parts = smartSplit(line.slice(2).trim());
      const url = (parts[0] || "").trim();
      const title = (parts[1] || "").trim();
      const desc = stripQuotes((parts[2] || "").trim());
      rows.push({ section, subsection, url, title, desc });
    }
  }
  return rows;
}

function smartSplit(s) {
  const out = [];
  let cur = "", inQuotes = false;
  for (const ch of s) {
    if (ch === '"') { inQuotes = !inQuotes; cur += ch; continue; }
    if (ch === "," && !inQuotes) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  if (cur) out.push(cur);
  return out.map((x) => x.trim());
}

function stripQuotes(s) {
  return s.startsWith('"') && s.endsWith('"') ? s.slice(1, -1) : s;
}

function hostFrom(url) {
  try { return new URL(url).host; } catch { return ""; }
}

function faviconElement(url, title) {
  const host = hostFrom(url);
  const img = document.createElement("img");
  img.className = "favicon";
  img.src = `${new URL(url).origin}/favicon.ico`;
  img.onerror = () => {
    img.onerror = () => {
      const fallback = document.createElement("div");
      fallback.className = "favicon-fallback";
      fallback.textContent = (title || host || "?")[0].toUpperCase();
      img.replaceWith(fallback);
    };
    img.src = `https://icons.duckduckgo.com/ip2/${host}.ico`;
  };
  return img;
}

function renderTabs(topSections) {
  let tabs = document.getElementById("tabs");
  if (!tabs) {
    const host = document.querySelector("[data-tabs-host]") || document.querySelector("main");
    tabs = document.createElement("nav");
    tabs.id = "tabs";
    tabs.className = "tabs";
    host.appendChild(tabs);
  }
  tabs.innerHTML = "";
  topSections.forEach((name) => {
    const btn = document.createElement("button");
    btn.className = "tab";
    btn.type = "button";
    btn.textContent = name;
    if ((ACTIVE_TAB ?? topSections[0]) === name) btn.classList.add("active");
    btn.addEventListener("click", () => setActiveTab(name));
    tabs.appendChild(btn);
  });
}

function setActiveTab(name) {
  ACTIVE_TAB = name;
  SECTION_BASE = ALL_ROWS.filter((r) => r.section === name);
  document.querySelectorAll("#tabs .tab")
    .forEach((b) => b.classList.toggle("active", b.textContent === name));
  applyFilters();
}

function applyFilters() {
  const q = (document.querySelector("[data-search-input]")?.value ?? "").toLowerCase();
  const sub = document.getElementById("sectionFilter")?.value ?? "";
  const filtered = SECTION_BASE.filter((r) => {
    const hay = `${r.url} ${r.title} ${r.desc} ${r.section} ${r.subsection}`.toLowerCase();
    return (!q || hay.includes(q)) && (!sub || r.subsection === sub);
  });
  renderContent(filtered, sub);
}

function render(rows) {
  ALL_ROWS = rows;
  const topSections = [...new Set(rows.map((r) => r.section).filter(Boolean))];
  if (!ACTIVE_TAB) ACTIVE_TAB = topSections[0] || null;
  renderTabs(topSections);
  if (ACTIVE_TAB) setActiveTab(ACTIVE_TAB);
}

function renderContent(data, preserveSub) {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const groups = new Map();
  for (const r of data) {
    const key = r.subsection || "Misc";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  }

  const sectionFilter = document.getElementById("sectionFilter");
  const subs = [...groups.keys()];
  sectionFilter.innerHTML =
    '<option value="">All sections</option>' +
    subs.map((s) => `<option>${s}</option>`).join("");
  if (preserveSub) sectionFilter.value = preserveSub;
  sectionFilter.onchange = applyFilters;

  for (const [subsection, items] of groups) {
    const secEl = document.getElementById("sectionTmpl").content.firstElementChild.cloneNode(true);
    secEl.querySelector(".section-title").textContent = subsection;
    const arrowEl = secEl.querySelector(".arrow");
    const headBtn = secEl.querySelector(".section-head");
    const grid = secEl.querySelector(".grid");
    items.forEach((item) => grid.appendChild(card(item)));

    function toggle() {
      const collapsed = grid.style.display === "none";
      grid.style.display = collapsed ? "" : "none";
      headBtn.setAttribute("aria-expanded", String(collapsed));
      arrowEl.textContent = collapsed ? "▼" : "▲";
    }
    headBtn.addEventListener("click", toggle);
    headBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
    content.appendChild(secEl);
  }
}

function card({ url, title, desc }) {
  const t = document.getElementById("cardTmpl").content.firstElementChild.cloneNode(true);
  t.href = url || "#";
  t.querySelector(".icon").appendChild(faviconElement(url, title));
  t.querySelector(".title").textContent = title || hostFrom(url) || "Untitled";
  t.querySelector(".host").textContent = hostFrom(url);
  t.querySelector(".desc").textContent = desc || "";
  return t;
}

function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

(async function () {
  const md = await loadMarkdown();
  render(parseMarkdown(md));
})();
