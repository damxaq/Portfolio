import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import SinglePost from "./components/SinglePost";
import Workplace from "./components/Workplace";
import Projects from "./components/Projects";
import NavBar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={About} path="/about" />
        <Route component={SinglePost} path="/post/:slug" />
        <Route component={Projects} path="/projects" />
        <Route component={Workplace} path="/workplaces" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
