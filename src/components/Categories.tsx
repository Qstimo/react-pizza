/* eslint-disable array-callback-return */
import React from 'react';
import {  setTitleValue } from '../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps={ 
  
  
  value:number,
  setCategory:(i:number)=>void,
}

export const Categories:React.FC<CategoriesProps>=React.memo(({ value, setCategory,  })=> {
  const dispatch = useDispatch();
  useWhyDidYouUpdate('Categories',{ value, setCategory,  } )

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const onClickCategory = (index:number) => {
    setCategory(index);
    dispatch(setTitleValue(categories[index]));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
})


