import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage/MainPage';

const URL = `www.google.pl`;

function App() {
  return (
    <div className="App">
      <MainPage ULR={URL} />
    </div>
  );
}

export default App;
