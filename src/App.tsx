import "./App.css";
import Graphs from "./Pages/Graphs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Graphs />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
