import React from 'react';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [titleCategory, setTitleCategory] = React.useState('Все пиццы');
  const [pageCurrent, setPageCurrent] = React.useState(1);
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.imageUrl} {...obj} />);

  React.useEffect(() => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    setIsloading(true);
    fetch(
      `https://64cb8751700d50e3c7060db8.mockapi.io/items?page=${pageCurrent}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsloading(false);
        window.scrollTo(0, 0);
      });
  }, [categoryId, sortType, searchValue, pageCurrent]);
  return (
    <>
      {' '}
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            setCategoryId={(id) => setCategoryId(id)}
            title={(i) => setTitleCategory(i)}
          />
          <Sort sortType={sortType} setSortType={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">{titleCategory}</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination page={(num) => setPageCurrent(num)} />
      </div>
    </>
  );
};

export default Home;
