import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";

import TutorialsList from "./components/app/TutorialsList";
import Tutorial from "./components/app/Tutorial";
import AuthorsList from "./components/app/AuthorsList";
import Author from "./components/app/Author";
import About from "./components/app/About";
import FeedBack from "./components/app/FeedBack";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import AdminUsers from "./components/admin/AdminUsers";
import AdminTutorials from "./components/admin/AdminTutorials";
import AdminTutorialComments from "./components/admin/AdminTutorialComments";

import AuthorTutorials from "./components/author/AuthorTutorials";
import AuthorTutorialCreate from "./components/author/AuthorTutorialCreate";
import AuthorTutorialEdit from "./components/author/AuthorTutorialEdit";

import UserProfile from "./components/user/UserProfile";
import UserProfileEdit from "./components/user/UserProfileEdit"
import NotFound from "./components/app/NotFound";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showAuthorBoard, setShowAuthorBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showSiteNav, setShowSiteNav] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.role === 'admin');
      setShowAuthorBoard(user.role === 'author');
      setShowUserBoard(user.role === 'user');
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const handleSiteNav = () => {
    setShowSiteNav(!showSiteNav)
  };

  return (
    <Router>
      <div className="App Site">
        <nav className="navbar navbar-expand-md">
          {(!currentUser || showUserBoard) && (
            <a href="/tutorials" className="navbar-brand">
              TutorialsApp
            </a>
          )}
          {showAdminBoard && (
            <a href="/admin/tutorials" className="navbar-brand">
              AdminPanel
            </a>
          )}
          {showAuthorBoard && (
            <a href="/author" className="navbar-brand">
              AuthorPanel
            </a>
          )}

          <button className="navbar-toggler" type="button"  data-toggle="collapse" data-target="#navbar"
                  aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar">

            {(!currentUser || showUserBoard) && (
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/tutorials"} className="nav-link">
                    Tutorials
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/authors"} className="nav-link">
                    Authors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/feedback"} className="nav-link">
                    Feedback
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/about"} className="nav-link">
                    About
                  </Link>
                </li>
              </div>
            )}

            {showAdminBoard && (
              <div className="navbar-nav mr-auto">

                {!showSiteNav && (
                  <>
                    <li className="nav-item">
                      <Link to={"/admin/users"} className="nav-link">
                        User management
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/admin/tutorials"} className="nav-link">
                        Management of tutorials
                      </Link>
                    </li>
                  </>
                )}

                {showSiteNav && (
                  <>
                    <li className="nav-item">
                      <Link to={"/tutorials"} className="nav-link">
                        Tutorials
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/authors"} className="nav-link">
                        Authors
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/feedback"} className="nav-link">
                        Feedback
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/about"} className="nav-link">
                        About
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  {showSiteNav ? (
                    <Link to={"/admin/users"} className="nav-link" onClick={handleSiteNav}>
                      Admin navigation
                    </Link>
                  ) : (
                    <Link to={"/"} className="nav-link" onClick={handleSiteNav}>
                      Site navigation
                    </Link>
                  )}
                </li>
              </div>
            )}

            {showAuthorBoard && (
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/authors/tutorials"} className="nav-link">
                    Management of tutorials
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/author/tutorial/create/form"} className="nav-link">
                    Create New
                  </Link>
                </li>
              </div>
            )}

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <p className="nav-link">
                    {currentUser.username}
                  </p>
                </li>
                {showUserBoard && (
                  <li className="nav-item">
                    <Link to={"/user/profile"} className="nav-link">
                      Profile
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Logout
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </div>
        </nav>

        <div className="Site-content">
          <div className="main">
            <div className="container mt-3">
              <Switch>
                <Route exact path="/" component={TutorialsList}/>
                <Route exact path="/tutorials" component={TutorialsList}/>
                <Route exact path="/authors" component={AuthorsList}/>
                <Route exact path="/tutorial/:id" component={Tutorial}/>
                <Route exact path="/author/:id" component={Author}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/feedback" component={FeedBack}/>

                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>

                <Route exact path="/admin/tutorials" component={AdminTutorials}/>
                <Route exact path={["/admin", "/admin/users"]} component={AdminUsers}/>
                <Route exact path="/admin/tutorial/:id/comments" component={AdminTutorialComments}/>

                <Route exact path={["/author", "/authors/tutorials"]} component={AuthorTutorials}/>
                <Route exact path={"/author/tutorial/create/form"} component={AuthorTutorialCreate}/>
                <Route exact path={"/author/tutorial/:id/edit"} component={AuthorTutorialEdit}/>

                <Route exact path="/user/profile" render={(props) => <UserProfile {...props} logout={logOut}/>}/>

                <Route exact path={"/user/profile/edit"} component={UserProfileEdit}/>

                <Route path="*" component={NotFound}/>

              </Switch>
            </div>
          </div>
        </div>
        <footer>
          <div className="footer-copyright py-1">
            &copy; Fedorenko A.G., 2017-{new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </Router>
  );
}


export default App;




