import React from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://64cb8751700d50e3c7060db8.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsloading(false);
        window.scrollTo(0, 0);
      });
  }, []);
  return (
    <>
      {' '}
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : items.map((obj) => <PizzaBlock key={obj.imageUrl} {...obj} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
