import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Router';

function App() {
  return (
    <div className='bg-[#f6f8fc]'>
      <RouterProvider router={router}>

      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
