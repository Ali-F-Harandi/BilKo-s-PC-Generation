import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { PCStorage } from './components/editor/PCStorage';
import { Inventory } from './components/editor/Inventory';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
        <Header />
        
        <main className="max-w-7xl mx-auto w-full p-4 md:p-8 flex-grow flex flex-col gap-8">
          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
            
            {/* Left Panel: Item Box */}
            <div className="w-full lg:w-1/3 h-full overflow-hidden">
              <Inventory />
            </div>

            {/* Right Panel: PC Storage */}
            <div className="w-full lg:w-2/3 h-full">
              <PCStorage />
            </div>

          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
