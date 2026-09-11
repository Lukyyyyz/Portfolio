document.addEventListener("DOMContentLoaded", () => {

  // ---------- Rolagem Suave até o Topo ----------
  const scrollButtons = document.querySelectorAll(".js-scroll-top");
  
  scrollButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
          e.preventDefault();
          window.scrollTo({
              top: 0,
              behavior: "smooth"
          });
      });
  });

  // ---------- Tratamento e Correção de Imagens ----------
  const handleProjectImageFallbacks = () => {
      const projectImages = document.querySelectorAll('.project-img');

      projectImages.forEach(img => {
          // Função para injetar o fallback caso ocorra erro
          const renderFallback = () => {
              if (img.dataset.failed) return;
              img.dataset.failed = "true";

              const title = img.getAttribute('data-fallback-title') || 'Projeto';
              const parent = img.parentElement;

              const fallbackDiv = document.createElement('div');
              fallbackDiv.className = 'project-fallback';
              fallbackDiv.innerHTML = `
                  <i class="fa-solid fa-code"></i>
                  <span>${title}</span>
              `;

              img.style.display = 'none';
              parent.appendChild(fallbackDiv);
          };

          img.addEventListener('error', renderFallback);

          // Verificação caso a imagem já esteja quebrada no cache
          if (img.complete && img.naturalWidth === 0) {
              renderFallback();
          }
      });

      // Verificação da foto de perfil
      const heroPhoto = document.getElementById('heroPhoto');
      if (heroPhoto) {
          const imgCheck = new Image();
          imgCheck.src = 'Imagens/Eu.jpeg';
          imgCheck.onerror = () => {
              heroPhoto.style.backgroundImage = 'none';
              heroPhoto.style.display = 'flex';
              heroPhoto.style.alignItems = 'center';
              heroPhoto.style.justifyContent = 'center';
              heroPhoto.style.backgroundColor = 'var(--bg-alt)';
              heroPhoto.innerHTML = '<i class="fa-solid fa-user" style="font-size: 5rem; color: var(--primary);"></i>';
          };
      }
  };

  handleProjectImageFallbacks();

  // ---------- Alternar Tema (Dark/Light) ----------
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      updateThemeIcon(savedTheme);
  }

  if (themeToggle) {
      themeToggle.addEventListener("click", () => {
          const currentTheme = document.documentElement.getAttribute("data-theme");
          const newTheme = currentTheme === "light" ? "dark" : "light";

          document.documentElement.setAttribute("data-theme", newTheme);
          localStorage.setItem("theme", newTheme);
          updateThemeIcon(newTheme);
      });
  }

  function updateThemeIcon(theme) {
      if (!themeToggle) return;
      const icon = themeToggle.querySelector("i");
      if (theme === "light") {
          icon.className = "fa-solid fa-sun";
      } else {
          icon.className = "fa-solid fa-moon";
      }
  }

  // ---------- Menu Mobile ----------
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
          const isOpen = navMenu.classList.toggle("nav--open");
          navToggle.setAttribute("aria-expanded", isOpen);
      });

      navMenu.querySelectorAll(".nav__link").forEach(link => {
          link.addEventListener("click", () => {
              navMenu.classList.remove("nav--open");
              navToggle.setAttribute("aria-expanded", "false");
          });
      });
  }

  // ---------- Máscara para Telefone ----------
  const aplicarMascaraTelefone = (valor) => {
      let digits = valor.replace(/\D/g, "").slice(0, 11);
      if (digits.length === 0) return "";
      if (digits.length <= 2) return `(${digits}`;
      if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const telefoneInput = document.getElementById("telefone");
  if (telefoneInput) {
      telefoneInput.addEventListener("input", e => {
          e.target.value = aplicarMascaraTelefone(e.target.value);
      });
  }

  // ---------- Formulário com Toast Modal ----------
  const form = document.getElementById("contactForm");
  const formError = document.getElementById("formError");
  const toast = document.getElementById("toast");

  if (form) {
      form.addEventListener("submit", (e) => {
          e.preventDefault();

          const nome = document.getElementById("nome").value.trim();
          const email = document.getElementById("email").value.trim();

          if (!nome || !email || !email.includes("@")) {
              formError.hidden = false;
              return;
          }

          formError.hidden = true;

          toast.classList.add("toast--visible");
          form.reset();

          setTimeout(() => {
              toast.classList.remove("toast--visible");
          }, 4000);
      });
  }

  // ---------- Botão Voltar ao Topo (Visibilidade) ----------
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
          backToTop.classList.add("back-to-top--visible");
      } else {
          backToTop.classList.remove("back-to-top--visible");
      }
  });

  // ---------- Ano Atual no Rodapé ----------
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

});