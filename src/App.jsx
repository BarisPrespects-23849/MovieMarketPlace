import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import StockMarket from './pages/StockMarket';
import StockDetails from './pages/StockDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/SearchResults';
import SeriesDetails from './pages/SeriesDetails';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>

        <main className="flex-grow pt-20">
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/tv/:id" element={<SeriesDetails />} />
                <Route path="/search/:query" element={<SearchResults />} />
                <Route path="/stock-market" element={<StockMarket />} />
                <Route path="/stock/:id" element={<StockDetails />} />
                <Route path="*" element={
                  <div className="text-center py-20">
                    <h1 className="text-2xl">404 - Page Not Found</h1>
                  </div>
                } />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>

        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
