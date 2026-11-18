import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Comments } from './pages/Comments';
import { Home } from './pages/Home';
import { Posts } from './pages/Posts';
import { Users } from './pages/Users';

export function App() {
  return <BrowserRouter><div className="min-h-screen bg-pearl text-charcoal"><Navbar /><main><Routes><Route path="/" element={<Home />} /><Route path="/posts" element={<Posts />} /><Route path="/comments" element={<Comments />} /><Route path="/users" element={<Users />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main><Footer /></div></BrowserRouter>;
}
export default App;
