import './Styles/App.css';
import './Styles/Song.css';


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './Pages/Login';
import Home from './Pages/Home';
import Search from "./Pages/Search";
import CreatePlaylist from "./Pages/CreatePlaylist";
import LikedSongs from "./Pages/LikedSongs";
import YourLibrary from "./Pages/YourLibrary";


import Error from './Pages/Error';

import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Loading from "./Components/Loading";
import { useGlobalContext } from './context';
function App() {
  const { token, loading } = useGlobalContext();

  return (
    <>
      {token ?
        <div className="body">
          <div className="upper">
            <Router>
              <div className="sidebar">
                <Sidebar />
              </div>
              <div className="main">
                <Header />
                <div className="submain">
                  {loading ? <div><Loading /></div>
                    :
                    <Switch>
                      <Route exact path={`/`}>
                        <Home />
                      </Route>
                      <Route path={`/search`}>
                        <Search />
                      </Route>
                      <Route path={`/yourlibrary`}>
                        <YourLibrary />
                      </Route>

                      <Route path={`/createplaylist`}>
                        <CreatePlaylist />
                      </Route>
                      <Route path={`/likedsongs`}>
                        <LikedSongs />
                      </Route>
                      <Route path="*">
                        <Error />
                      </Route>
                    </Switch>}
                </div>
              </div>
              <div className="lower">
                <Footer />
              </div>
            </Router>
          </div>
        </div>
        :
        <Login />
      }
    </>
  );
  // return (
  //   <Router>
  //     <Navbar />
  //     <Switch>
  //       <Route exact path="/">
  //         <Home />
  //       </Route>
  //       <Route path="/about">
  //         <About />
  //       </Route>
  //       <Route path="/cocktail/:id">
  //         <SingleCocktail />
  //       </Route>
  //       <Route path="*">
  //         <Error />
  //       </Route>
  //     </Switch>
  //   </Router>
  // );
}

export default App;
