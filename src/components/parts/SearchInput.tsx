import { memo, useState, VFC } from "react";
import "../../styles/searchInput.css";

const SearchInput: VFC = memo(() => {
  const [searchStr, setSearchStr] = useState("");
  return (
    <section className="section search">
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
