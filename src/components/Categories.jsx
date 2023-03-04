import { useState } from 'react';

const categoriesName = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = ({ categoryIndex, onClickChangeCategory }) => {
  // const [categoryActiveIndex, setCategoryActiveIndex] = useState(0);
  // const changeCategory = (index) => {
  //   setCategoryActiveIndex(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categoriesName.map((elem, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickChangeCategory(index)}
              className={categoryIndex === index ? 'active' : ''}
            >
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
