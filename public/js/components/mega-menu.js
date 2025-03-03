document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded, running script...");

  // Service Tabs Function
  window.openService = function (event, serviceFocus) {
      event.stopPropagation();
      document.querySelectorAll(".servicetabcontent").forEach(tab => tab.style.display = "none");
      document.querySelectorAll(".servicetablinks").forEach(link => link.classList.remove("activeservice"));

      const targetTab = document.getElementById(serviceFocus);
      if (targetTab) {
          targetTab.style.display = "flex";
          event.currentTarget.classList.add("activeservice");
      }
  };

  // Automatically open the default service tab
  document.getElementById("Opendefault")?.click();

  // Mega Menu Activation
  function activateTab(section, mgtabRel) {
      section.querySelectorAll('.mega-mtabs li').forEach(mgtab =>
          mgtab.classList.toggle('active', mgtab.getAttribute('rel') === mgtabRel)
      );

      section.querySelectorAll('.mega-mtab-content').forEach(content =>
          content.style.display = content.id === mgtabRel ? 'flex' : 'none'
      );

      section.querySelectorAll('.mega-mtab-heading').forEach(heading =>
          heading.classList.toggle('d_active', heading.getAttribute('rel') === mgtabRel)
      );
  }

  function activateFirstTab(section) {
      const firstTab = section.querySelector('.mega-mtabs li');
      if (firstTab) {
          firstTab.classList.add('active');
          activateTab(section, firstTab.getAttribute('rel'));
      }
  }

  function setupSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (!section) return;

      activateFirstTab(section);

      // Use event delegation for better performance
      section.addEventListener('mouseover', function (event) {
          const span = event.target.closest('.mega-mtabs li span');
          if (span) activateTab(section, span.parentElement.getAttribute('rel'));
      });

      section.addEventListener('click', function (event) {
          const heading = event.target.closest('.mega-mtab-heading');
          if (heading) {
              const content = section.querySelector(`#${heading.getAttribute('rel')}`);
              if (content) {
                  const allContents = section.querySelectorAll('.mega-mtab-content');
                  const allHeadings = section.querySelectorAll('.mega-mtab-heading');

                  if (content.style.display === 'block') {
                      content.style.display = 'none';
                      heading.classList.remove('d_active');
                  } else {
                      allContents.forEach(c => c.style.display = 'none');
                      allHeadings.forEach(h => h.classList.remove('d_active'));
                      content.style.display = 'block';
                      heading.classList.add('d_active');
                  }
              }
          }
      });
  }

  ['serviceAreas', 'industryFocus', 'resources-section-menu', 'locations-section-menu', 'about-section-menu']
      .forEach(setupSection);

  // Mega Menu Close Button
  document.querySelectorAll(".mega-menu-close-btn").forEach(btn =>
      btn.addEventListener('click', function (e) {
          e.preventDefault();
          let parent = this.closest('.mega-mtab-content');
          if (parent) {
              parent.style.display = 'none';
              setTimeout(() => parent.style.display = '', 600);
          }
      })
  );

  // Mega Menu Navigation
  const navbar__menu = document.querySelector('.navbar__menu');
  if (navbar__menu) {
      navbar__menu.addEventListener('mouseleave', function (event) {
          if (!document.querySelector('.navbar')?.contains(event.relatedTarget)) {
              clearMegaMenu();
              resetTwice();
          }
      });

      document.querySelectorAll('ul.navbar__menu > li').forEach(navItem => {
          const toggleMenu = navItem.querySelector('.navbar__togglemenu');
          const megaMenu = navItem.querySelector('.navbar__megamenu');

          if (toggleMenu && megaMenu) {
              toggleMenu.addEventListener('click', function () {
                  console.log("Toggling mega menu...");
                  clearMegaMenu();
                  toggleMenu.classList.toggle("menu-opened");
                  megaMenu.classList.toggle("menu-expanded");
              });
          }
      });
  } else {
      console.error("Error: .navbar__menu not found in the DOM!");
  }
});

// Function to clear mega menu (Ensure it's defined)
function clearMegaMenu() {
  document.querySelectorAll('.navbar__megamenu').forEach(menu => menu.classList.remove("menu-expanded"));
  document.querySelectorAll('.navbar__togglemenu').forEach(toggle => toggle.classList.remove("menu-opened"));
}

function resetTwice() {
  console.log("Reset function called");
}
