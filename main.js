// Runs after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio JS loaded");
  
    // --- Smooth scroll for internal links (e.g., #projects) ---
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const id = a.getAttribute("href");
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  
    // --- Simple filtering for thumbnails via pill tags ---
    const tags = document.querySelectorAll(".tag");
    const thumbs = document.querySelectorAll(".thumb");
  
    tags.forEach(tag => {
      tag.addEventListener("click", () => {
        const key = tag.dataset.filter; // e.g., "uxui"
        // Toggle active visual (optional)
        tags.forEach(t => t.classList.remove("active"));
        tag.classList.add("active");
  
        thumbs.forEach(t => {
          const has = (t.dataset.tags || "").includes(key);
          t.style.opacity = has ? "1" : ".25";
          t.style.filter  = has ? "none" : "grayscale(60%)";
        });
      });
    });
  
    // --- (Optional) Lightbox: click a thumb to open larger (starter) ---
    document.querySelectorAll(".thumb img").forEach(img => {
      img.addEventListener("click", e => {
        e.preventDefault();
        const src = img.getAttribute("src");
        openLightbox(src, img.getAttribute("alt"));
      });
    });
  });
  
  /* Tiny lightbox implementation */
  function openLightbox(src, alt){
    const overlay = document.createElement("div");
    overlay.style = `
      position:fixed; inset:0; background:rgba(0,0,0,.7);
      display:flex; align-items:center; justify-content:center; z-index:9999;
    `;
    overlay.addEventListener("click", () => document.body.removeChild(overlay));
  
    const img = document.createElement("img");
    img.src = src; img.alt = alt || "";
    img.style = "max-width:90vw; max-height:85vh; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,.4);";
  
    overlay.appendChild(img);
    document.body.appendChild(overlay);
  }
  