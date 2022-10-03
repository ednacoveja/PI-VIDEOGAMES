import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";
import VideogameCreate from "./components/VideogameCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/videogames" component={VideogameCreate} />
          <Route path="/videogame/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

