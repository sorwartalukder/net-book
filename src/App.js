import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Router';

function App() {
  return (
    <div className='bg-[#f6f8fc]'>
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
