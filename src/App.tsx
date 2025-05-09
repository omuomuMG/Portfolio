import "./App.css";
import TopPage from "./features/Top/TopPage";
import Content from "./features/Content/Content";
import Profile from "./features/Profile/Profile";

function App() {
  return (
    <div className="App">
      <div>
        <TopPage />
        <Content />
        <Profile />
      </div>
    </div>
  );
}

export default App;
