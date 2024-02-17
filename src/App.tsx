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
          <h3>Generator</h3>
          <DrawPage></DrawPage>
        </section>
        <section>
          <h3>authors in fork list</h3>
          <ul>
              <li>
                (1) <a href="https://twitter.com/rarity_rare25">@rarity_rare25</a> / <a href="https://rare25.github.io/5000choyen/">generator URL</a> / <a href="https://github.com/rare25/5000choyen">source URL</a>
              </li>
              <li>
                (2) <a href="https://twitter.com/yurafuca">@yurafuca</a> / <a href="https://yurafuca.com/5000choyen/">generator URL</a> / <a href="https://github.com/yurafuca/5000choyen">source URL</a>
              </li>
              <li>
                (3) (this) <a href="https://lake.naru.cafe/@sftblw">@sftblw@lake.naru.cafe</a> / <a href="https://sftblw.github.io/5000choyen/">generator URL (this page)</a> / <a href="https://github.com/sftblw/5000choyen">source URL</a>
              </li>
            </ul>
        </section>

      </main>

      <footer>
        <a href="https://github.com/sftblw/5000choyen">source URL</a> / If possible, It should be in MIT license, but It's unknown.
      </footer>
    </>
  );
};

export default App;
