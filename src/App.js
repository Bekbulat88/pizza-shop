import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Sort } from './components/Sort';
import './scss/app.scss';
import pizzasArray from './assets/pizzas.json';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzasArray.map((elem) => {
              return (
                <PizzaBlock
                  key={elem.id}
                  {...elem}
                  // title={elem.title}
                  // price={elem.price}
                  // image={elem.imageUrl}
                  // sizes={elem.sizes}
                  // types={elem.types}
                />
              );
            })}
            {/* <PizzaBlock title="Маргарита" price="300" />
            <PizzaBlock title="Чизбургер" price="500" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
