import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./home.css";

export default function BookDetails() {

  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useContext(CartContext);

  const [popup, setPopup] = useState(false);   

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(res => setBook(res.data));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(book);
    setPopup(true);

    setTimeout(() => {
      setPopup(false);
    }, 1500);
  };

  if(!book) return <h2 style={{textAlign:"center",color:"white"}}>Loading...</h2>;

  return (
    <div style={{
      textAlign:"center",
      marginTop:"130px",
      color:"white"
    }}>

      <img 
        src={book.image} 
        width="250" 
        style={{borderRadius:"10px", boxShadow:"0 10px 25px rgba(0,0,0,.6)"}}
      />

      <h2 style={{marginTop:"20px"}}>{book.title}</h2>
      <p style={{opacity:.8, width:"50%", margin:"auto"}}>{book.description}</p>

      <h3 style={{color:"#00ffa6", margin:"15px"}}>₹{book.price}</h3>

      <button 
        onClick={handleAddToCart}     
        style={{
          padding:"12px 25px",
          borderRadius:"10px",
          border:"none",
          background:"#00ffa6",
          color:"#000",
          fontWeight:"bold",
          cursor:"pointer",
          boxShadow:"0 5px 15px rgba(0,0,0,.5)"
        }}
      >
        Add to Cart
      </button>

     
      {popup && (
        <div style={{
          position:"fixed",
          top:"50%",
          left:"50%",
          transform:"translate(-50%,-50%)",
          background:"#10182f",
          padding:"25px 45px",
          borderRadius:"12px",
          boxShadow:"0 5px 30px rgba(0,0,0,0.7)",
          fontSize:"20px",
          fontWeight:"bold",
          color:"#00ffa6",
          zIndex:"1000"
        }}>
          ✅ Book Added to Cart!
        </div>
      )}

    </div>
  );
}
