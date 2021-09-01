import { getAllBooks, Books } from "../../service/BookService";
import { BookService } from "../../service/state/BookServiceState";
import { BookBox } from "../../component/BookBox/BookBox";
import React from "react";
import { useState, useEffect } from "react";
import "./SearchPageStyle.css";
import { Book } from "../../models/Book";

const SearchPage: React.FC = () => {
  const service: BookService<Books> = getAllBooks();

  const [search, setSearch] = useState("");
  const [currArray, setCurrArray] = useState<any>([]);
  useEffect(() => {
    if (service.status === "loaded") {
      setCurrArray(
        service.payload.data.filter((word) =>
          word.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [service, search]);

  if (service.status === "loading") {
    return <div>Fetching data</div>;
  }
  if (service.status === "error") {
    return <div>Something went wrong</div>;
  }
  return (
    <React.Fragment>
      <div className="content">
        <div className="searching">
          <input
            type="text"
            placeholder="Search Art Here..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="container">
          {currArray.map((book: Book) => {
            return <BookBox book={book}></BookBox>;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
