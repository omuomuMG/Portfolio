import "./App.css";
import TopPage from "./features/Top/TopPage";
import Content from "./features/Content/Content";
import Profile from "./features/Profile/Profile";
import TestForm from "./features/Contact/Contact";

function App() {
  return (
    <div className="App">
      <div>
        <title>omuomuMG</title>
        <TopPage />
        <Content />
        <Profile />
        <TestForm />
      </div>
    </div>
  );
}

export default App;
