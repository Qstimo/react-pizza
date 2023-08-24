import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    </div>
  );
}

export default FullPizza;
