import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";   
import "./home.css";

export default function Cart() {

  const { cart, removeFromCart, total, clearCart } = useContext(CartContext); 
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [showPopup,setShowPopup] = useState(false);

  const navigate = useNavigate();   

  const checkout = async () => {
    if(cart.length === 0) return alert("Cart is empty");

    try {
      await axios.post("http://localhost:5000/api/orders/checkout", {
        items: cart,
        totalAmount: total,
        customer: { name, email, address }
      });

      setShowPopup(true);

      setTimeout(() => {
        clearCart && clearCart();    
        navigate("/");              
      }, 1500);

    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Shopping Cart</h2>

      {cart.length === 0 ? (
        <h3 className="empty">No items in cart</h3>
      ) : (
        cart.map(item => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt="" className="cart-image" />
            <div>
              <h3>{item.title}</h3>
              <p>₹{item.price}</p>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <h2 className="total">Total: ₹{total}</h2>

      <div className="checkout-box">
        <h2>Checkout</h2>

        <input
          placeholder="Enter Name"
          className="input-box"
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Enter Email"
          className="input-box"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          placeholder="Enter Address"
          className="input-box"
          onChange={e => setAddress(e.target.value)}
        />

        <button className="checkout-btn" onClick={checkout}>
          Confirm Purchase
        </button>
      </div>

      {showPopup && <div className="popup">🎉 Order Placed Successfully!</div>}
    </div>
  );
}
