// src/js/load-include.js
async function loadInclude(id, file) {
    const element = document.getElementById(id);
    if (element) {
      const response = await fetch(file);
      if (response.ok) {
        element.innerHTML = await response.text();
      } else {
        console.error(`Failed to load ${file}: ${response.statusText}`);
      }
    }
  }
  
  // Load header and footer
  document.addEventListener("DOMContentLoaded", () => {
    loadInclude("header-placeholder", "/includes/header.html");
    loadInclude("footer-placeholder", "/includes/footer.html");
  });
  