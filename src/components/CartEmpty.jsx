import React from 'react';
import { Link } from 'react-router-dom';

function CartEmpty() {
  return (
    <div style={{ margin: '30px auto' }} className="cart cart--empty">
      <h2 style={{ padding: '30px' }}>
        Корзина пустая <icon>😕</icon>
      </h2>
      <p style={{ padding: '10px' }}>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <Link className="button--black" to="/">
        Вернуться назад
      </Link>
    </div>
  );
}

export default CartEmpty;
