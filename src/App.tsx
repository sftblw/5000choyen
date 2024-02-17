import type { Component } from 'solid-js';

import "./App.scss";
import DrawPage from "./drawer/DrawPage";

const App: Component = () => {
  return (
    <>
      <header>
        <h1>
          5000choyen hoshii!
        </h1>
      </header>
      <main>
        <section>
          <DrawPage></DrawPage>
        </section>
      </main>
      <footer>
        footer
      </footer>
    </>
    
  );
};

export default App;
