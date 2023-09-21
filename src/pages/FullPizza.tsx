import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = ()=> {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string,
    title: string,
    price: number,
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(`https://64cb8751700d50e3c7060db8.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Пицца не загрузилась');
        navigate('/');
      }
    }
    getPizza();
  }, []);

  if (!pizza) {
    return <>Идёт загрузка</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <div
            className="cart__bottom-buttons  "
            style={{ margin: '30px 0 auto 0', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/" className="button  go-back-btn">
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span >Вернуться назад</span>
            </Link>
         
          </div>
    </div>
  );
}

export default FullPizza;
