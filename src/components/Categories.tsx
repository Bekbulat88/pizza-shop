const categoriesName = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
};
export const Categories = ({ categoryId, onClickCategory }: CategoriesProps) => {
  return (
    <div className="categories">
      <ul>
        {categoriesName.map((elem, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? 'active' : ''}
            >
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
