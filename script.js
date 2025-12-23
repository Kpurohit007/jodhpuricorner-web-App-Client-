document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("navbar__links--open");
    });

    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("navbar__links--open");
      }
    });
  }

  const categoryFilter = document.getElementById("categoryFilter");
  const productSearch = document.getElementById("productSearch");
  const productGrids = document.querySelectorAll(".products-grid");

  function normalize(text) {
    return (text || "").toString().toLowerCase();
  }

  function applyFilters() {
    const selectedCategory = normalize(categoryFilter && categoryFilter.value);
    const searchQuery = normalize(productSearch && productSearch.value);

    productGrids.forEach((grid) => {
      const gridCategory = normalize(grid.getAttribute("data-category"));
      const cards = grid.querySelectorAll(".product-card");

      cards.forEach((card) => {
        const name = normalize(card.getAttribute("data-name") || card.querySelector("h4")?.textContent);

        let matchesCategory = true;
        if (selectedCategory) {
          matchesCategory = gridCategory === selectedCategory;
        }

        let matchesSearch = true;
        if (searchQuery) {
          matchesSearch = name.includes(searchQuery);
        }

        if (matchesCategory && matchesSearch) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      applyFilters();

      const val = categoryFilter.value;
      if (val) {
        const section = document.getElementById(val);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }

  if (productSearch) {
    productSearch.addEventListener("input", applyFilters);
  }
});


