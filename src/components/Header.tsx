import React, { memo, VFC } from "react";

const Header: VFC = memo(() => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 header-title text-success">
            Find your favorite cocktail
          </span>
        </div>
      </nav>
    </header>
  );
});

export default Header;
