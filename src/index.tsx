/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import App from "./App.tsx"
import LyricsView from "./components/LyricsView.tsx"
import NewPresentationView from "./components/NewPresentationView.tsx"
import BibleView from "./components/BibleView.tsx"
import ConfigsView from "./components/ConfigsView.tsx"
import Card from "./components/Card.tsx"
import "./index.css"

render(
  () => <Router>
    <Route path={["/"]} component={App}/>
    <Route path={["/lyrics"]} component={LyricsView}/>
    <Route path={["/new-presentation"]} component={NewPresentationView}/>
    <Route path={["/bible"]} component={BibleView}/>
    <Route path={["/configs"]} component={ConfigsView}/>
    <Route path={["/test"]} component={Card}/>
  </Router>,
  document.getElementById("root")
);
