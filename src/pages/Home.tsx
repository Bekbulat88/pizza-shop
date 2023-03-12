import { Categories } from '../components/Categories';
import { PizzaBlock } from '../components/pizzaBlock/PizzaBlock';
import { Sort, sortList } from '../components/Sort';
import { useEffect, useRef } from 'react';
import Skeleton from '../components/pizzaBlock/SkeletonPizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterSelect,
  setCategoryId,
  setCurrentPage,
  setFilter,
  setSortType,
  SortType,

} from '../Redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, pizzaSelect } from '../Redux/slices/pizzasSlice';
import { useAppDispatch } from '../Redux/store';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(pizzaSelect);
  const { sortType, categoryId, currentPage, searchValue } = useSelector(filterSelect);

  const changeSortType = (sortObj : SortType) => {
    dispatch(setSortType(sortObj));
  };
  const onChangeCategory = (id : number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number : number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    dispatch(
    
      fetchPizzas({
        sortBy,
        order,
        categoryId,
        searchValue,
        currentPage,
      }),
    );
  };

  useEffect(() => {
    if (window.location.search) {
      // if URI address has smthg
      const params = qs.parse(window.location.search.substring(1));
      //make obj from string (URI address)
      const sortType = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      //@ts-ignore
      dispatch(setFilter({...params, sortType}));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        // string without '?'
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`); // write '?' to the start of string and put it in URI
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage]);
  return (
    <div>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onChangeCategory} />
        <Sort sortType={sortType} onClickChangeSort={changeSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2>Произошла ошибка 😕</h2>
          <p>Попробуйте пожалуйста позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((elem : any, index : number) => <PizzaBlock {...elem} key={index} />)}
        </div>
      )}
      <Pagination onChangeCurrentPage={onChangePage} />
    </div>
  );
};

export default Home;
