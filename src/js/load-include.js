// // src/js/load-include.js
// async function loadInclude(id, file) {
//     const element = document.getElementById(id);
//     if (element) {
//       const response = await fetch(file);
//       if (response.ok) {
//         element.innerHTML = await response.text();
//       } else {
//         console.error(`Failed to load ${file}: ${response.statusText}`);
//       }
//     }
//   }
  
//   // Load header and footer
//   document.addEventListener("DOMContentLoaded", () => {
//     loadInclude("header-placeholder", "/includes/header.html");
//     loadInclude("footer-placeholder", "/includes/footer.html");
//   });
  
async function loadInclude(id, file) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with id "${id}" not found.`);
    return;
  }

  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.statusText}`);
    }
    element.innerHTML = await response.text();
  } catch (error) {
    console.error(error.message);
  }
}

// Load header and footer after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const basePath = window.location.origin; // Ensures correct absolute path
  loadInclude("header-placeholder", `${basePath}/includes/header.html`);
  loadInclude("footer-placeholder", `${basePath}/includes/footer.html`);
});
