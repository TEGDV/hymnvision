/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import App from "./App.tsx"
import LyricsView from "./components/LyricsView.tsx"
import NewPresentationView from "./components/NewPresentationView.tsx"
import CreateSongView from "./components/CreateSongView.tsx"
import BibleView from "./components/BibleView.tsx"
import ConfigsView from "./components/ConfigsView.tsx"
import CreateSong from "./components/Test.tsx"
import "./index.css"

render(
  () => <Router>
    <Route path={["/"]} component={App}/>
    <Route path={["/new-song"]} component={CreateSongView}/>
    <Route path={["/new-presentation"]} component={NewPresentationView}/>
    <Route path={["/bible"]} component={BibleView}/>
    <Route path={["/configs"]} component={ConfigsView}/>
    <Route path={["/test"]} component={CreateSong}/>
  </Router>,
  document.getElementById("root")
);
