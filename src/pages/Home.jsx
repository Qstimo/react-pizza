import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);
  const [titleCategory, setTitleCategory] = React.useState('Все пиццы');
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.imageUrl} {...obj} />);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (num) => {
    dispatch(setPageCount(num));
  };

  React.useEffect(() => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    setIsloading(true);

    // fetch(
    //   `https://64cb8751700d50e3c7060db8.mockapi.io/items?page=${pageCurrent}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `,
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //     setIsloading(false);
    //     window.scrollTo(0, 0);
    //   });

    axios
      .get(
        `https://64cb8751700d50e3c7060db8.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `,
      )
      .then((res) => {
        setItems(res.data);
        setIsloading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, pageCount]);

  return (
    <>
      {' '}
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            setCategory={onChangeCategory}
            title={(i) => setTitleCategory(i)}
          />
          <Sort />
        </div>
        <h2 className="content__title">{titleCategory}</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination value={pageCount} page={onChangePage} />
      </div>
    </>
  );
};

export default Home;
