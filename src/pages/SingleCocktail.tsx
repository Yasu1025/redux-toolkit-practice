import React, { memo, VFC } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectCocktail,
  fetchAsyncSingleCocktail,
  setError,
} from "../store/slices/cocktailSlice";
import { AppDispatch } from "../store/store";
import { selectLoading } from "../store/slices/cocktailSlice";
import { Cocktail } from "../models/Cocktail";
import { Link } from "react-router-dom";

const SingleCocktail: VFC = memo(() => {
  const { id }: any = useParams();
  const cocktail: Cocktail[] = useSelector(selectCocktail);
  const [targetCocktail, setTargetCocktail] = useState<Cocktail | null>(null);
  const loading = useSelector(selectLoading);
  const dispatch: AppDispatch = useDispatch();

  const getAllIngredients = (): string[] => {
    if (targetCocktail) {
      return [
        targetCocktail.strIngredient1 || "",
        targetCocktail.strIngredient2 || "",
        targetCocktail.strIngredient3 || "",
        targetCocktail.strIngredient4 || "",
        targetCocktail.strIngredient5 || "",
      ];
    }
    return [];
  };

  useEffect(() => {
    try {
      dispatch(fetchAsyncSingleCocktail({ id }));
    } catch (err) {
      dispatch(setError);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (cocktail.length) {
      setTargetCocktail(cocktail[0]);
    }
  }, [cocktail]);

  return (
    <section className="section cocktail-section">
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : !targetCocktail ? (
        <h2 className="section-title">No cocktail to display...</h2>
      ) : (
        <>
          <Link to="/">
            <button className="btn btn-danger" style={{ marginTop: "2rem" }}>
              Go Back
            </button>
          </Link>
          <h2 className="section-title">{targetCocktail?.strDrink}</h2>
          <div className="drink">
            <img
              src={targetCocktail?.strDrinkThumb}
              alt={targetCocktail?.strDrink}
            />
            <div className="drink-info">
              <p>
                <span className="drink-data">Name: </span>
                {targetCocktail?.strDrink}
              </p>
              <p>
                <span className="drink-data">Category: </span>
                {targetCocktail?.strDrink}
              </p>
              <p>
                <span className="drink-data">Info: </span>
                {targetCocktail?.strAlcoholic}
              </p>
              <p>
                <span className="drink-data">Glass: </span>
                {targetCocktail?.strGlass}
              </p>
              <p>
                <span className="drink-data">Instructions: </span>
                {targetCocktail?.strInstructions}
              </p>
              <p>
                <span className="drink-data">Ingredients: </span>
                {getAllIngredients().map((ingredient, index) => (
                  <span key={index}>{ingredient || null}</span>
                ))}
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
});

export default SingleCocktail;
