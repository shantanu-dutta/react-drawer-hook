import { useState } from 'react';
import Drawer from './Drawer';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container">
      <button type="button" onClick={() => setIsOpen(true)}>
        Trigger Drawer
      </button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <button type="button" onClick={() => setIsOpen(false)}>
          Close
        </button>
        <p>Drawer content!</p>
        <input type="text" name="abc" id="abc" />
      </Drawer>
    </div>
  );
}

export default App;
