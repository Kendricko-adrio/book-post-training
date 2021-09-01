import { Link } from "react-router-dom";
import { Book } from "../../models/Book";
import style from "./BookBoxStyle.module.css";
import { useState, useEffect } from "react";
import {
  isFavorited,
  addFavorite,
  removeFavorite,
} from "../../service/BookService";

interface BookProps {
  book: Book;
}

export const BookBox: React.FC<BookProps> = ({ book }) => {
  const [favorite, setFavorite] = useState(false);
  // const test: boolean = true;
  const imageUrl: string = `https://www.artic.edu/iiif/2/${book.image_id}/full/843,/0/default.jpg`;
  useEffect(() => {
    if (isFavorited(book)) {
      setFavorite(true);
    }
  }, []);

  const startOnClick = () => {
    const state = isFavorited(book);
    if (state) {
      removeFavorite(book);
    } else {
      addFavorite(book);
    }
    setFavorite(!state);
  };

  return (
    <div className={style.card}>
      <Link to={`/art/${book.id}`}>
        <img src={imageUrl} alt="" />
        <div className={style.component}>
          <div>{book.title}</div>
        </div>
      </Link>

      <div
        onClick={startOnClick}
        className={favorite ? style.stared : style.star}
      ></div>
      {/* <div className="component">{book.id}</div> */}
    </div>
  );
};
