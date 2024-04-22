import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MessageContainer = () => (
  <ToastContainer
    position="top-center"
    autoClose={4000}
    hideProgressBar={false}
    rtl={false}
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />
)
