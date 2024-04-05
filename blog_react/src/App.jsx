import { Outlet } from "react-router-dom";
import './App.css'
import Navbar from './Navbar';

export default function App() {
  
  
  return (
    <>
      <h1 style={{fontFamily: "monospace"}}>Blogs App</h1>
      <Navbar />
      <hr />
      <Outlet />
    </>
  );
}

