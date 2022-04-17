import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Home } from "./components/Home";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { RQSuperHeroes } from "./components/RQSuperHeroes";
import { SuperHeroes } from "./components/SuperHeroes";
import { RQHeroDetails } from "./components/RQHeroDetails";
import { ParallelQueries } from "./components/ParallelQueries";
import { DynamicParallel } from "./components/DynamicParallel";
import { DependentQueries } from "./components/DependentQueries";
import { PaginatedQueries } from "./components/PaginatedQueries";
import { InfiniteQueries } from "./components/InfiniteQueries";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rq-parallel" element={<ParallelQueries />} />
            <Route path="/rq-paginated" element={<PaginatedQueries />} />
            <Route path="/rq-infinite" element={<InfiniteQueries />} />
            <Route
              path="/rq-dependent"
              element={<DependentQueries email="test@com.ua" />}
            />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallel heroIds={[1, 3]} />}
            />
            <Route path="/super-heroes" element={<SuperHeroes />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQHeroDetails />}
            />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-rigth" />
    </QueryClientProvider>
  );
}

export default App;
