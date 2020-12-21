import React from 'react';
import './App.css';
import ExecutorSelector from './syncer/ExecutorSelector';

function App() {
  return (
    <div className="App">
      <ExecutorSelector placeholder={"请输入源执行器"}/>
      <ExecutorSelector placeholder={"请输入目标执行器"}/>
    </div>
  );
}

export default App;
