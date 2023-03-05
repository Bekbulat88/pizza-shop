import { Categories } from '../components/Categories';
import { PizzaBlock } from '../components/pizzaBlock/PizzaBlock';
import { Sort } from '../components/Sort';
import { useContext, useEffect, useState } from 'react';
import Skeleton from '../components/pizzaBlock/SkeletonPizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setSortType } from '../Redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { searchText } = useContext(SearchContext);

  const [isLoading, setIsLoading] = useState(true);
  const [pizzasArray, setPizzasArray] = useState([]);

  const { sortType, categoryId, currentPage } = useSelector((state) => state.filter);
  const changeSortType = (sortObject) => {
    dispatch(setSortType(sortObject));
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

    axios
      .get(
        `https://6400c3e49f84491029986be2.mockapi.io/items?${
          categoryId > 0 ? 'category=' + categoryId : ''
        }&sortBy=${sortBy}&order=${order}&search=${searchText}&page=${currentPage}&limit=4`,
      )
      .then((response) => {
        setPizzasArray(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchText, currentPage]);

  return (
    <div>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onChangeCategory} />
        <Sort sortType={sortType} onClickChangeSort={changeSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzasArray.map((elem, index) => <PizzaBlock {...elem} key={index} />)}
      </div>
      <Pagination onChangeCurrentPage={onChangePage} />
    </div>
  );
};

export default Home;
