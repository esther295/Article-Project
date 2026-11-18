import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Articles } from './pages/Articles';
import { ArticleDetails } from './pages/ArticleDetails';
import { Authors } from './pages/Authors';
import { AuthorDetails } from './pages/AuthorDetails';
import { About } from './pages/About';

export function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <div className="min-h-screen flex flex-col bg-[#E6E1D8] text-[#242A29] selection:bg-[#123F40] selection:text-[#FAF9F6]">
          
          <Navbar />

      
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetails />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/authors/:id" element={<AuthorDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          
          <Footer />
        </div>
      </BlogProvider>
    </BrowserRouter>
  );
}

export default App;
