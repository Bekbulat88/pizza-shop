import { Categories } from '../components/Categories';
import { PizzaBlock } from '../components/pizzaBlock/PizzaBlock';
import { Sort } from '../components/Sort';
import { useEffect, useState } from 'react';
import Skeleton from '../components/pizzaBlock/SkeletonPizzaBlock';
import Pagination from '../components/Pagination/Pagination';

const Home = ({ searchText }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pizzasArray, setPizzasArray] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

    fetch(
      `https://6400c3e49f84491029986be2.mockapi.io/items?page=${currentPage}&limit=4${
        categoryIndex > 0 ? 'category=' + categoryIndex : ''
      }&sortBy=${sortBy}&order=${order}&search=${searchText}`,
    )
      .then((response) => response.json())
      .then((array) => {
        setPizzasArray(array);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryIndex, sortType, searchText, currentPage]);
  console.log(currentPage);
  return (
    <div>
      <div className="content__top">
        <Categories
          categoryIndex={categoryIndex}
          onClickChangeCategory={(categoryIndex) => {
            setCategoryIndex(categoryIndex);
          }}
        />
        <Sort
          sortType={sortType}
          onClickChangeSort={(sortType) => {
            setSortType(sortType);
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzasArray.map((elem, index) => <PizzaBlock {...elem} key={index} />)}
      </div>
      <Pagination onChangeCurrentPage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
