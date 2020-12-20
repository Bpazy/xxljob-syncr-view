import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import {TreeSelect} from 'antd';
import {CascaderOptionType} from 'antd/lib/cascader';
import {queryExecutors} from '../service';

class ExecutorSelector extends React.Component {
    state: CascaderOptionType = {
        value: undefined,
        treeData: [
            {
                title: 'test',
                key: 'test',
                value: 'test',
                id: 'test',
                pId: 0
            },
            {
                title: 'sst',
                key: 'sst',
                value: 'sst',
                id: 'sst',
                pId: 0
            },
            {
                title: 'sit',
                key: 'sit',
                value: 'sit',
                id: 'sit',
                pId: 0
            },
            {
                title: 'pre',
                key: 'pre',
                value: 'pre',
                id: 'pre',
                pId: 0
            },
            {
                title: 'prod',
                key: 'prod',
                value: 'prod',
                id: 'prod',
                pId: 0
            },
            {
                title: 'trial',
                key: 'trial',
                value: 'trial',
                id: 'trial',
                pId: 0
            },
        ],
    };

    // @ts-ignore
    onChange = value => {
        this.setState({value});
    };

    loadExecutors = async (treeNode: CascaderOptionType) => {
        console.log('invoking');
        const executors = (await queryExecutors(treeNode.key)).data;
        console.log('invoked');

        const leafs = [];
        for (const executor of executors) {
            leafs.push({
                id: executor.id,
                pId: treeNode.id,
                value: executor.id,
                title: executor.name,
                isLeaf: true,
            });
        }

        this.setState({
            treeData: this.state.treeData.concat(leafs),
        });
    }

    render() {
        const {treeData} = this.state;
        return (
            <TreeSelect
                treeDataSimpleMode
                style={{width: '15%'}}
                value={this.state.value}
                dropdownStyle={{ overflow: 'auto'}}
                placeholder="Please select"
                onChange={this.onChange}
                loadData={this.loadExecutors}
                treeData={treeData}
            />
        );
    }
}

export default ExecutorSelector;
