import './App.css';
import { Route, Switch } from "react-router-dom";
import AddQuiz from './components/AddQuiz';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={AddQuiz}/>
      </Switch>
    </div>
  );
}

export default App;