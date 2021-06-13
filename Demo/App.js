import { Grid } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header";
import SlideMenu from "./components/database-table-menu/SideMenu";
import MainPanel from "./components/query-tab/MainPanel";
import ResultTab from "./components/result-tab/Result";

function App() {
  return (
    <div>
      <Header />
      <Grid container style={{ width: "100vw", height: "100vh" }}>
        <Grid item xs={2} style={{ height: "100vh", overflow: "scroll" }}>
          <SlideMenu />
        </Grid>
        <Grid item xs={10}>
          <Grid item xs={12} style={{ height: "40%" }}>
            <MainPanel />
          </Grid>
          <Grid item xs={12} style={{ height: "60%" }}>
            <ResultTab />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
