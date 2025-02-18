import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { use } from "react";

export default function Header() {
  const ctxValue = use(CartContext);
  const userProgressCtx = use(UserProgressContext);
  const totalCartItems = ctxValue.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
