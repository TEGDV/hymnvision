/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import App from "./App.tsx"
import LyricsView from "./components/LyricsView.tsx"
import PresentationView from "./components/PresentationView.tsx"
import SongDetailsView from "./components/SongDetailsView.tsx"
import SongsView from "./components/SongsView"
import BibleView from "./components/BibleView.tsx"
import ConfigsView from "./components/ConfigsView.tsx"
import "./index.css"

render(
  () => <Router>
      <Route path="/" component={App} />
      <Route path="/songs" component={SongsView} />
      <Route path="/songs/:id" component={SongDetailsView} /> {/* ✅ Dynamic route for viewing a song */}
      <Route path="/presentation/:id" component={PresentationView} />
      <Route path="/bible" component={BibleView} />
      <Route path="/configs" component={ConfigsView} />
  </Router>,
  document.getElementById("root")
);
