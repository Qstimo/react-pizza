import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch,  } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');

  const updateSearchValue = React.useCallback(
    debounce((str:string) => {
      dispatch(setSearchValue(str));
    }, 200),
    [],
  );

  const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onCliclClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M416 48C416 39.13 408.9 32 400 32h-64C327.1 32 320 39.13 320 48V96h96.04L416 48zM63.88 160.1C61.34 253.9 3.5 274.3 0 404V448c0 17.6 14.4 32 32 32h128c17.6 0 32-14.4 32-32V128H95.88C78.26 128 64.35 142.5 63.88 160.1zM448.1 160.1C447.6 142.5 433.7 128 416.1 128H320v320c0 17.6 14.4 32 32 32h128c17.6 0 32-14.4 32-32v-44C508.5 274.3 450.7 253.9 448.1 160.1zM224 288h64V128H224V288zM176 32h-64C103.1 32 96 39.13 96 48L95.96 96H192V48C192 39.13 184.9 32 176 32z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы"></input>
      {value && (
        <svg
          onClick={onCliclClear}
          className={styles.close}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};
export default Search;
