import React from "react";
import { useLocation } from "react-router-dom";

import "./search.scss";

const Search = () => {
  const location = useLocation();
  const path = location.pathname;

  return <div className="wrapper-search">{path === "/" && <p>Search</p>}</div>;
};

export default Search;
