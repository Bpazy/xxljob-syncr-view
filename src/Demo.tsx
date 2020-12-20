import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {TreeSelect} from 'antd';

const {SHOW_PARENT} = TreeSelect;

const treeData = [
    {
        title: 'test',
        key: 'test',
        value: 'test',
        pId: 'test',
    },
    {
        title: 'sst',
        key: 'sst',
        value: 'sst',
        pId: 'sst',
    },
    {
        title: 'sit',
        key: 'sit',
        value: 'sit',
        pId: 'sit',
    },
    {
        title: 'pre',
        key: 'pre',
        value: 'pre',
        pId: 'pre',
    },
    {
        title: 'prod',
        key: 'prod',
        value: 'prod',
        pId: 'prod',
    },
    {
        title: 'trial',
        key: 'trial',
        value: 'trial',
        pId: 'trial',
    },
];

class Demo extends React.Component {
    state = {
        value: ['0-0-0'],
    };

    // @ts-ignore
    onChange = value => {
        this.setState({value});
    };

    onLoadData = treeNode =>
        new Promise<void>(resolve => {
            const {id} = treeNode.props;
            setTimeout(() => {
                this.setState({
                    treeData: this.state.treeData.concat([
                        this.genTreeNode(id, false),
                        this.genTreeNode(id, true),
                    ]),
                });
                resolve();
            }, 300);
        });

    render() {
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            placeholder: 'Please select',
            loadData: this.onLoadData,
            style: {
                width: '30%',
            },
        };
        return <TreeSelect {...tProps} />;
    }
}

export default Demo;
