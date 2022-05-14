import React, { VFC } from "react";
import CocktailList from "../components/parts/CocktailList";
import SearchInput from "../components/parts/SearchInput";

const Home: VFC = () => {
  return (
    <div>
      <SearchInput />
      <CocktailList />
    </div>
  );
};

export default Home;
