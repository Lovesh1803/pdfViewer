import { Provider } from "react-redux";
import "./App.css";
import store from "../src/redux/store";
import AppContainer from "./base/AppContainer";

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
