import EditorHomePage from "./Components/EditorHomePage";
import HomePage from "./Components/HomePage/HomePage";
import LoginScreen from "./Components/LoginScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHomepage from "./Components/AdminHomepage";
import ArticlePage from "./Components/ArticlePage/ArticlePage";
import ArticlePage2 from "./Components/ArticlePage/ArticlePage2";
import SearchPage from "./Components/SearchPage/SearchPage";
import NavbarLayout from "./Components/NavbarLayout";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function App() {


  return (
    <Router>

    <Routes>

      <Route element={<NavbarLayout />} >
        <Route path='/'  element={<HomePage/>} />
        <Route path='/search'  element={<SearchPage/>} />
        <Route path='/ArticlePage/:category/:slug'  element={<ArticlePage/>} />
      <Route path='/ArticlePage2/:category/:slug'  element={<ArticlePage2/>} />
      </Route>
      
      
      <Route path='/login'  element={<LoginScreen/>} />
      <Route path='/Editor'  element={<EditorHomePage/>} />
      <Route path='/Admin'  element={<AdminHomepage/>} />
  
    </Routes>


    </Router>
  );
}

export default App;
