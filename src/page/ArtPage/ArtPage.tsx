import React from "react";
import { useParams } from "react-router-dom";
import "./ArtPageStyle.css";
import { getBook } from "../../service/BookService";
import "bootstrap/dist/css/bootstrap.css";
import { addFavorite } from "../../service/BookService";

interface Param {
  id: string;
}

const ArtPage = () => {
  const { id } = useParams<Param>();
  // console.log(id);
  const service = getBook(id);

  console.log(service);

  if (service.status === "loading") {
    return <div>Fetching</div>;
  } else if (service.status === "error") {
    return <div>Error</div>;
  }

  const imageUrl = `https://www.artic.edu/iiif/2/${service.payload.image_id}/full/843,/0/default.jpg`;
  return (
    <React.Fragment>
      <div className="container">
        <div className="image">
          <h1>{service.payload.title}</h1>
          <img src={imageUrl} alt="" />
          <div>Original Size : {service.payload.dimensions}</div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Detail</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>title</td>
              <td>{service.payload.title}</td>
            </tr>
            <tr>
              <td>credit_line</td>
              <td>{service.payload.credit_line}</td>
            </tr>
            <tr>
              <td>dimensions</td>
              <td>{service.payload.dimensions}</td>
            </tr>
            <tr>
              <td>date_display</td>
              <td>{service.payload.date_display}</td>
            </tr>
            <tr>
              <td>artist_display</td>
              <td>{service.payload.artist_display}</td>
            </tr>
          </tbody>
        </table>
        <input type="submit" onClick={() => addFavorite(service.payload)} />
      </div>
    </React.Fragment>
  );
};

export default ArtPage;
