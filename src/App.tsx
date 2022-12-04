import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { DatabaseProvider } from './context/DatabaseContext';
import EffectPicker from './components/EffectPicker';
import Result from './components/Result';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>Pokemon Sandwich Maker</h1>
        <h3 class="text-lg text-red-300">What kind of sandwich do you feel like?</h3>
      </header>
      <div class="container mx-auto px-4">
        <DatabaseProvider>
          <div class="flex-col gap-8 justify-center p-4">
            <EffectPicker />
            <Result />
          </div>
        </DatabaseProvider>
      </div>
    </div>
  );
};

export default App;
