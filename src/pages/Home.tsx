import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate, } from 'react-router-dom';

import { setCategoryId, setPageCount, setFilters, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';
import Skeleton from '../components/PizzaBlock/Skeleton';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useDispatch();

  const isSeacrh = React.useRef(false);

  const isMounted = React.useRef(false);

  const {titleCategory} = useSelector(selectFilter)

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const pizzas = items.map((obj:any) => <PizzaBlock key={obj.id} {...obj} />);

  const onChangeCategory = (id:number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num:number) => {
    dispatch(setPageCount(num));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

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

    // await axios
    //   .get(
    //     `https://64cb8751700d50e3c7060db8.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `,
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsloading(false);
    //   });

    dispatch(
      // @ts-ignore
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        pageCount,
      }),
    );
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
      getPizzas();
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
           
          />
          <Sort />
        </div>
        <h2 className="content__title">{titleCategory}</h2>
        {status === 'error' ? (
          <div className="content__error-info">
            <h2 style={{ padding: '30px' }}>
              Произошла ошибка <span>😕</span>
            </h2>
            <p style={{ padding: '10px' }}>К сожалению пиццы сегодня не будет(</p>
          </div>
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        )}

        <Pagination value={pageCount} page={onChangePage} />
      </div>
    </>
  );
};

export default Home;
