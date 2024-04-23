import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Author from "./pages/Authors";
import CreatePost from "./pages/CreatePost";
import UserProfile from "./pages/UserProfile";
import { useAuthContext } from "./hooks/useAuthContext";
import AuthorPosts from "./pages/AuthorPosts";
import CategoryPosts from "./pages/CategoryPosts";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import Dashboard from './pages/Dashboard'

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/signup" element={!user ? <Register /> : <Home />} />
        <Route path="/create" element={user ? <CreatePost /> : <Login />} />
        <Route path="/author" element={user ? <Author /> : <Login />} />
        <Route path="/profile" element={user ? <UserProfile /> : <Login />} />
        <Route path="/posts/user/:creator" element={<AuthorPosts />} />
        <Route path="/posts/categories/:category" element={<CategoryPosts />} />
        <Route path="/post/:postID" element={<PostDetail />} />
        <Route path="/myposts" element={<Dashboard />} />
        <Route
          path="/posts/:postID/edit"
          element={user ? <EditPost /> : <Login />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
