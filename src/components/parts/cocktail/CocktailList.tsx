import { VFC, memo, useEffect, Suspense } from "react";
import {
  fetchAsyncCocktails,
  selectCocktails,
  setError,
} from "../../../store/slices/cocktailSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { Cocktail } from "../../../models/Cocktail";
import CocktailCard from "./CocktailCard";
import { selectLoading } from "../../../store/slices/cocktailSlice";

const CocktailList: VFC = memo(() => {
  const cocktails = useSelector(selectCocktails);
  const loading = useSelector(selectLoading);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(fetchAsyncCocktails());
    } catch (err) {
      dispatch(setError);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Cocktail List</h2>
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cocktails.map((cocktail: Cocktail) => (
            <CocktailCard
              key={cocktail.idDrink}
              id={cocktail.idDrink}
              name={cocktail.strDrink}
              image={cocktail.strDrinkThumb}
              glass={cocktail.strGlass}
              info={cocktail.strAlcoholic}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default CocktailList;
