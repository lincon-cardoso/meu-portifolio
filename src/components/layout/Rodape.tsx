"use client";

const Rodape: React.FC = () => {
  return (
    <footer className="fade-in">
      <div className="footer-container">
        <p className="footer-text">
          &copy; 2025 Lincon Cardoso. Todos os direitos reservados.
        </p>
        <p className="redes-sociais">Siga-me nas redes sociais</p>
        <div className="social-icons">
          <a href="#" className="social-icon" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
