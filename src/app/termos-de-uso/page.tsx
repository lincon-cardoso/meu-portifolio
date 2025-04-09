"use client";
import React from "react";
import Cabecalho from "@/components/layout/Cabecalho"; // Ajuste o caminho conforme necessário
import Rodape from "@/components/layout/Rodape";

export default function TermosDeUso() {
    return (
        <main className="termos-de-uso fade-in">
            <Cabecalho />
            <div className="termos-container">

                <header className="termos-header">
                    <h1>Termos de Uso</h1>
                    <p className="termos-atualizacao">
                        <strong>Última atualização:</strong> 08 de abril de 2025
                    </p>
                    <p className="termos-introducao">
                        Bem-vindo ao site <strong>devlincon.com.br</strong>, mantido por Lincon Cardoso – Desenvolvedor Web. Ao utilizar este site, você concorda com os seguintes Termos de Uso:
                    </p>
                </header>

                <section className="termos-secao">
                    <h2 className="termos-titulo">1. Objetivo do Site</h2>
                    <p className="termos-texto">
                        Este site apresenta o portfólio e serviços de desenvolvimento web de Lincon Cardoso, além de permitir contato profissional.
                    </p>
                </section>

                <section className="termos-secao">
                    <h2 className="termos-titulo">2. Uso do Conteúdo</h2>
                    <p className="termos-texto">
                        Todo o conteúdo é protegido por direitos autorais. É proibido copiar, reproduzir ou modificar sem autorização prévia.
                    </p>
                </section>

                <section className="termos-secao">
                    <h2 className="termos-titulo">3. Responsabilidades do Usuário</h2>
                    <ul className="termos-lista">
                        <li>Não comprometer a segurança ou funcionamento do site;</li>
                        <li>Não enviar spam ou mensagens abusivas;</li>
                        <li>Fornecer informações verdadeiras nos formulários.</li>
                    </ul>
                </section>

                <section className="termos-secao">
                    <h2 className="termos-titulo">4. Isenção de Responsabilidade</h2>
                    <p className="termos-texto">
                        Não garantimos funcionamento ininterrupto ou livre de erros. O site pode conter links externos sob responsabilidade de terceiros.
                    </p>
                </section>

                <section className="termos-secao">
                    <h2 className="termos-titulo">5. Modificações nos Termos</h2>
                    <p className="termos-texto">
                        Estes termos podem ser atualizados sem aviso prévio. Consulte esta página regularmente.
                    </p>
                </section>

                <section className="termos-secao">
                    <h2 className="termos-titulo">6. Contato</h2>
                    <p className="termos-texto">
                        Em caso de dúvidas, entre em contato pelo e-mail disponível no site.
                    </p>
                </section>

            </div>
            <Rodape />
        </main>
    );
}