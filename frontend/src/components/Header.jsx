import { Link } from "react-router-dom";
import "./header.css";

export default function Header(){
  return(
    <header className="header">
      <div className="logo">
  📚 <span>Online Book Store</span>
</div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}
