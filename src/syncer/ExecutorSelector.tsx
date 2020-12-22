import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import {TreeSelect} from 'antd';
import {CascaderOptionType} from 'antd/lib/cascader';
import {queryEnvs, queryExecutors} from '../service';

interface Props {
    tip: string
    selectorPlaceholder: string
}

interface State {
    value?: string
    treeData: {
        title: string
        key: string
        value: string
        id: string | number
        pId: string | number
        disabled: boolean
    }[]
}

class ExecutorSelector extends React.Component<Props, State> {
    state: State = {
        value: undefined,
        treeData: [],
    };

    constructor(props: Props) {
        super(props);
        queryEnvs().then(d => {
            this.setState({
                treeData: d.data
                    .map(env => ({
                        title: env,
                        key: env,
                        value: env,
                        id: env,
                        pId: 0,
                        disabled: true
                    }))
            });
        });
    }


    // @ts-ignore
    onChange = (value) => {
        this.setState({value});
    };

    loadExecutors = async (treeNode: CascaderOptionType) => {
        const executors = (await queryExecutors(treeNode.key)).data;

        const leafs = [];
        for (const executor of executors) {
            leafs.push({
                id: executor.id,
                pId: treeNode.id,
                value: executor.name,
                title: executor.name,
                key: executor.name,
                isLeaf: true,
                disabled: false
            });
        }

        this.setState({
            treeData: this.state.treeData.concat(leafs),
        });
    };

    render() {
        const {treeData} = this.state;
        return (
            <>
                <span>{this.props.tip}: </span>
                <TreeSelect
                    treeDataSimpleMode
                    style={{width: '200px'}}
                    dropdownStyle={{overflow: 'auto'}}
                    placeholder={this.props.selectorPlaceholder}
                    onChange={this.onChange}
                    loadData={this.loadExecutors}
                    treeData={treeData}
                />
            </>
        );
    }
}

export default ExecutorSelector;
