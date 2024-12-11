import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
import { BrowserRouter, Routes, Route } from "react-router";
import ChatScreen from './components/Chat/ChatScreen';
import { ChatProvider } from './contexts/chat';


root.render(
  <ChatProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </BrowserRouter>
  </ChatProvider>

);