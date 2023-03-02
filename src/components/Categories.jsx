import { useState } from 'react';

const categoriesName = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = () => {
  const [categoryActiveIndex, setCategoryActiveIndex] = useState(0);
  const changeCategory = (index) => {
    setCategoryActiveIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        {categoriesName.map((elem, index) => {
          return (
            <li
              key={index}
              onClick={() => changeCategory(index)}
              className={categoryActiveIndex === index ? 'active' : ''}
            >
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
