import { getAllFavorites } from "../../service/BookService";
import { BookBox } from "../../component/BookBox/BookBox";
import React from "react";

const FavoritePage: React.FC = () => {
  const favorites = getAllFavorites();
  console.log(favorites);
  return (
    // <div>halo</div>
    <div className="container">
      {favorites.map((book) => {
        return <BookBox book={book} />;
      })}
    </div>
  );
};

export default FavoritePage;
