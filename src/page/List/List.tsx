import { getAllBooks, Books } from "../../service/BookService";
import { BookService } from "../../service/state/BookServiceState";
import { BookBox } from "../../component/BookBox/BookBox";
import "./ListStyle.css";

export const List = () => {
  const service: BookService<Books> = getAllBooks();

  console.log(service);

  if (service.status === "loading") {
    return <div>Fetching data</div>;
  }
  if (service.status === "error") {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="container">
      {service.payload.data.map((book) => {
        return <BookBox key={book.id} book={book}></BookBox>;
      })}
    </div>
  );
};
