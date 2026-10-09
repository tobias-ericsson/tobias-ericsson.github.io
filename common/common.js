async function include(selector, relativePath) {
  const el = document.querySelector(selector);
  if (!el) return;

  const baseUrl = new URL(".", import.meta.url);
  const url = new URL(relativePath, baseUrl);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    el.innerHTML = await res.text();
  } catch (err) {
    el.innerHTML = `<!-- include failed: ${url} -->`;
    console.error(err);
  }
}

function currentSection() {
  const explicit = document.body.dataset.siteSection;
  if (explicit) return explicit;

  const segment = window.location.pathname.split("/").filter(Boolean)[0];
  return segment || "home";
}

function markActiveNav() {
  const section = currentSection();
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const isActive = link.dataset.nav === section;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function applyPageBrand() {
  const { brandEmoji, brandLabel } = document.body.dataset;
  if (brandEmoji) {
    const mark = document.querySelector(".site-brand-mark");
    if (mark) mark.textContent = brandEmoji;
  }
  if (brandLabel) {
    const copy = document.querySelector(".site-brand-copy strong");
    if (copy) copy.textContent = brandLabel;
  }
}

// Pages can hand the sidebar a sub-navigation (e.g. the Links tabs) by marking
// an element with data-subnav; it is moved in right below the active nav link.
function mountSubnav() {
  const subnav = document.querySelector("main [data-subnav]");
  if (!subnav) return;
  subnav.classList.add("site-subnav");
  const anchor = document.querySelector(".site-nav-link.is-active");
  if (anchor) anchor.after(subnav);
  else document.querySelector(".site-nav")?.append(subnav);
}

window.addEventListener("DOMContentLoaded", async () => {
  await include("#site-header", "header.html");
  await include("[data-site-footer]", "footer.html");

  markActiveNav();
  applyPageBrand();
  mountSubnav();
});
