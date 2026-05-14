const BIBTEX_TEXT = `@inproceedings{gong2026xdomainbench,
  title     = {{XD}omainBench: Diagnosing Reasoning Collapse in High-Dimensional Scientific Knowledge Composition},
  author    = {Gong, Zhiren and Wu, Tiantong and Zhang, Jiaming and Zhang, Fuyao and Wang, Che and Hao, Yurong and Hou, Yikun and Foo, Ping and Zhao, Yilei and Huang, Fei and Yuen, Chau and Lim, Wei Yang Bryan},
  booktitle = {Forty-third International Conference on Machine Learning},
  year      = {2026},
  url       = {https://openreview.net/forum?id=U8x5SYtT5b}
}`;

async function copyTextWithFeedback(button, text, success = "Copied") {
  if (!button) return;
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = success;
  } catch (_) {
    button.textContent = "Copy failed";
  }
  setTimeout(() => {
    button.textContent = original;
  }, 1400);
}

function initCitationCopyButtons() {
  const heroBtn = document.getElementById("copyCiteHero");
  const bibBtn = document.getElementById("copyBib");
  const bibBlock = document.getElementById("bib");

  if (heroBtn) {
    heroBtn.addEventListener("click", () => copyTextWithFeedback(heroBtn, BIBTEX_TEXT, "Citation copied"));
  }

  if (bibBtn && bibBlock) {
    bibBtn.addEventListener("click", () => copyTextWithFeedback(bibBtn, bibBlock.innerText, "Copied"));
  }
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  if (!lightbox || !lightboxImg || !closeBtn) return;

  const figureImages = document.querySelectorAll("img[data-full]");
  figureImages.forEach((img) => {
    img.addEventListener("click", () => {
      const full = img.getAttribute("data-full");
      if (!full) return;
      lightboxImg.src = full;
      lightbox.classList.add("show");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("show")) closeLightbox();
  });
}

function initNavHighlight() {
  const navLinks = Array.from(document.querySelectorAll(".nav nav a[href^='#']"));
  if (!navLinks.length) return;

  const sectionMap = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    const section = document.getElementById(id);
    if (section) sectionMap.set(section, link);
  });
  const sections = Array.from(sectionMap.keys());
  if (!sections.length) return;

  function setActive(link) {
    navLinks.forEach((item) => item.classList.remove("active"));
    if (link) link.classList.add("active");
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const activeSection = visible[0].target;
      setActive(sectionMap.get(activeSection));
    },
    {
      root: null,
      rootMargin: "-28% 0px -56% 0px",
      threshold: [0.15, 0.3, 0.5]
    }
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sectionMap.get(sections[0]));
}

function initMechanismLinkage() {
  const cards = Array.from(document.querySelectorAll(".mechanism-card"));
  if (cards.length < 2) return;

  function activateAll() {
    cards.forEach((c) => c.classList.add("is-linked"));
  }
  function deactivateAll() {
    cards.forEach((c) => c.classList.remove("is-linked"));
  }

  cards.forEach((card) => {
    card.addEventListener("mouseenter", activateAll);
    card.addEventListener("mouseleave", deactivateAll);
    card.addEventListener("focusin", activateAll);
    card.addEventListener("focusout", deactivateAll);
  });
}

initCitationCopyButtons();
initLightbox();
initNavHighlight();
initMechanismLinkage();
