import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import CreatePage from "./pages/CreatePage";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout";
import ResponsiveDrawer from "./pages/drawer";

function App() {
  return (
    <div className="app">
      <Toaster />
      <BrowserRouter>
        {/* //wrapping with Layout component to add a sidebar and use routes in it */}
        {/* <AppLayout> */}
        <Routes>
          <Route index path="/" element={<NotesPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
        {/* </AppLayout> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
