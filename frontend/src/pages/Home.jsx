import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(()=>setLoading(false));
  }, []);

  if (loading) return <h2 style={{textAlign:"center"}}>Loading...</h2>;

  return (
    <div className="container">
      <h2 className="title">Featured Books</h2>

      {books.length === 0 ?
        <h3 style={{textAlign:"center"}}>No Books Available</h3>
      :
      <div className="book-grid">
        {books.map(book => (
          <div key={book._id} className="book-card">
            <img src={book.image} alt="" />
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <span className="price">₹{book.price}</span>
            <Link className="btn" to={`/book/${book._id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>}
    </div>
  );
}
