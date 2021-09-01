import { List } from "./page/List/List";
import { Navbar } from "./component/Navbar/Navbar";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ArtPage from "./page/ArtPage/ArtPage";
import SearchPage from "./page/SearchPage/SearchPage";
import FavoritePage from "./page/FavoritePage/FavoritePage";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/favorite">
          <FavoritePage />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/art/:id">
          <ArtPage />
        </Route>
        <Route path="/">
          <List />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
