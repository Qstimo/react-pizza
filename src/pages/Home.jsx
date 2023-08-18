import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import Skeleton from '../components/PizzaBlock/Skeleton';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const isSeacrh = React.useRef(false);
  const isMounted = React.useRef(false);

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

  const fetchPizzas = () => {
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
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
      const sorts = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sorts }));
      isSeacrh.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSeacrh.current) {
      fetchPizzas();
    }
    isSeacrh.current = false;
  }, [categoryId, sort, searchValue, pageCount]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort,
        categoryId,
        pageCount,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
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
