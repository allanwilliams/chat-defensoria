import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App';
import Chat from './components/Chat/Chat';
import ChatScreen from './components/Chat/ChatScreen';
import { ChatProvider } from './contexts/chat';


root.render(
  <ChatProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/teste" element={<App />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </BrowserRouter>
  </ChatProvider>

);