import { memo, useState, VFC } from "react";
import "../../styles/searchInput.css";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { fetchAsyncSearchCocktails } from "../../store/slices/cocktailSlice";

const SearchInput: VFC = memo(() => {
  const [searchStr, setSearchStr] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchAsyncSearchCocktails({ searchStr }));
  };

  return (
    <section className="section search" onSubmit={onSubmit}>
      <form className="search-form">
        <div className="form-control">
          <label htmlFor="name">Search Cocktail</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setSearchStr(e.target.value)}
          />
        </div>
      </form>
    </section>
  );
});

export default SearchInput;
