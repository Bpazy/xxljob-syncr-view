import React from 'react';
import './App.css';
import ExecutorSelector from './syncer/ExecutorSelector';
import {Space} from 'antd';

function App() {
  return (
    <div className="App">
        <Space direction="vertical">
            <ExecutorSelector tip="源环境" selectorPlaceholder="请输入源执行器"/>
            <ExecutorSelector tip="目标环境" selectorPlaceholder="请输入目标执行器"/>
        </Space>
    </div>
  );
}

export default App;
