import './style.scss'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
