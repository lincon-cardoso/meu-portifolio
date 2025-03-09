import { useEffect } from "react";

export default function useProjectFilter() {
  useEffect(() => {
    // Filtro de projetos
    const menuItems = document.querySelectorAll(".menu-item a");
    const cards = document.querySelectorAll(".card");

    // Adiciona a classe active ao item clicado e filtra os cards
    menuItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();

        // Remove a classe active de todos os itens
        menuItems.forEach((item) => item.classList.remove("active"));

        // Adiciona a classe active ao item clicado
        item.classList.add("active");

        // Obtém a categoria do item clicado
        const category = item.getAttribute("data-category");

        // Filtra os cards com base na categoria
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

    // Validação do formulário de contato
    const contactForm = document.querySelector(".contato-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Simula o envio do formulário
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        (contactForm as HTMLFormElement).reset();
      });
    }
  }, []);
}
