"use client";
import React from "react";
import Cabecalho from "@/components/layout/Cabecalho"; // Ajuste o caminho conforme necessário
import Rodape from "@/components/layout/Rodape";

export default function PoliticaDePrivacidade() {
    return (
        <main className="politica-de-privacidade fade-in">
            <Cabecalho />
            <div className="politica-container">

                <header className="politica-header">
                    <h1>Política de Privacidade</h1>
                    <p className="politica-atualizacao">
                        <strong>Última atualização:</strong> 08 de abril de 2025
                    </p>
                    <p className="politica-introducao">
                        A sua privacidade é importante para mim. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações ao utilizar o site <strong>devlincon.com.br</strong>.
                    </p>
                </header>

                <section className="politica-secao">
                    <h2 className="politica-titulo">1. Informações Coletadas</h2>
                    <p className="politica-texto">
                        Podemos coletar informações pessoais, como nome, e-mail e telefone, fornecidas voluntariamente por você ao preencher formulários no site.
                    </p>
                </section>

                <section className="politica-secao">
                    <h2 className="politica-titulo">2. Uso das Informações</h2>
                    <p className="politica-texto">
                        As informações coletadas são utilizadas para responder às suas solicitações, melhorar nossos serviços e enviar comunicações relevantes.
                    </p>
                </section>

                <section className="politica-secao">
                    <h2 className="politica-titulo">3. Compartilhamento de Informações</h2>
                    <p className="politica-texto">
                        Não compartilhamos suas informações pessoais com terceiros, exceto quando exigido por lei ou com o seu consentimento explícito.
                    </p>
                </section>

                <section className="politica-secao">
                    <h2 className="politica-titulo">4. Segurança</h2>
                    <p className="politica-texto">
                        Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração ou divulgação.
                    </p>
                </section>

                <section className="politica-secao">
                    <h2 className="politica-titulo">5. Cookies</h2>
                    <p className="politica-texto">
                        Utilizamos cookies para melhorar a experiência do usuário no site. Você pode desativar os cookies nas configurações do seu navegador.
                    </p>
                </section>

                <section className="politica-secao">
                    <h2 className="politica-titulo">6. Alterações na Política</h2>
                    <p className="politica-texto">
                        Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você revise esta página regularmente.
                    </p>
                </section>

                <section className="politica-secao">
                    <h2 className="politica-titulo">7. Contato</h2>
                    <p className="politica-texto">
                        Caso tenha dúvidas sobre esta Política de Privacidade, entre em contato pelo e-mail disponível no site.
                    </p>
                </section>

            </div>
            <Rodape />
        </main>
    );
}