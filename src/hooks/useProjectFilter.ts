import { useEffect } from "react";

export default function useProjectFilter() {
  useEffect(() => {
    // Só executa o filtro se houver itens de menu e cards na página
    const menuItems = document.querySelectorAll(".menu-item a");
    const cards = document.querySelectorAll(".card");

    if (menuItems.length && cards.length) {
      menuItems.forEach((item) => {
        item.addEventListener("click", (event) => {
          event.preventDefault();
          menuItems.forEach((item) => item.classList.remove("active"));
          item.classList.add("active");

          const category = item.getAttribute("data-category");
          cards.forEach((card) => {
            if (
              category === "todos" ||
              card.getAttribute("data-category") === category
            ) {
              (card as HTMLElement).style.display = "block";
            } else {
              (card as HTMLElement).style.display = "none";
            }
          });
        });
      });
    }

    // Validação do formulário de contato – esse código será executado se houver formulário na página
    const contactForm = document.querySelector(".contato-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        (contactForm as HTMLFormElement).reset();
      });
    }
  }, []);
}
