import './Footer.css';
import ig from '../../assets/Vector1.png';     
import yt from '../../assets/Vector2.png';
import fb from '../../assets/Vector3.png';

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="socials" aria-label="Social links">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
          <img src={ig} alt="" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
          <img src={yt} alt="" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
          <img src={fb} alt="" />
        </a>
      </nav>
    </footer>
  );
}
