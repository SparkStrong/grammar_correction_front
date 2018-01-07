import React, { Component } from "react";
import { Input, Button, Radio, Icon } from 'antd';
import './home.less';

// export default class Index extends Component {

//      constructor(props) {
//         super(props);
//     }

//     render() {
//     return <h1>Hello React</h1>;
//   }
// }


export default class AdvancedHome extends Component {

    constructor(props) {  // 只有在constructor中可以直接为this.state分配值，其他情况要是用setState()方法更新state值，如this.setState({loginState:0})
        super(props);
        this.state = {
            userInput: "",
        },
        this.originalCorrectionRes = ""
    }

    handleSubmit() {
        
    }

    render() {
        return (
            <div id="user-page">

                <div className="gc-app-bar">
                    <div className="gc-app-main">
                        <a className="gc-app-name">语法纠错</a>
                    </div>
                </div>

                {/*<hr/>*/}

                <div style={{ border: "1px", solid: true, color: "#CCC" }}></div>

                {/*语法纠错主体页面*/}
                <div className="gc-text-all">
                    <div id="gc-text-main" className="gc-text-main">
                        <div id="gc-text-c" className="gc-text-c">

                            {/*文本部分*/}
                            <div id="gc-text-top" className="gc-text-top">
                                {/*待纠错文本*/}
                                <div id="gc-src-c" className="gc-src-c">
                                    <div className="gc-src-p">
                                        <Input type="textarea" rows={10} style={{ fontSize: "16px" }} />
                                    </div>

                                    {/*提交和修改建议按钮*/}
                                    <div className="gc-src-submit">
                                        <Button type="primary" size="large">提交</Button>
                                    </div>
                                </div>

                                {/*纠错结果*/}
                                <div id="gc-res-c" className="gc-res-c">

                                    {/*纠错结果*/}
                                    <div className="gc-res-p">
                                        <Input type="textarea" rows={10} style={{ fontSize: "16px" }} value={this.state.userInput} />
                                    </div>

                                    <div className="gc-res-submit">
                                        {/*纠错结果的提出建议及查看原始纠错结果*/}
                                        <div id="gc-res-tools" className="gc-res-tools">
                                            <div id="gc-res-edit" className="gc-res-edit" role="button" alt="提出修改建议">
                                                <Icon type="edit" style={{ lineHeight: "2.5" }} value="提出修改建议" /> 提出修改建议
                                        </div>

                                        {/*style={{ lineHeight: "0" }} */}

                                            <div id="gc-res-undo" className="gc-res-undo" role="button" onClick="">
                                                <span className="gc-res-undo-img"> </span> 查看原始纠错结果
                                        </div>

                                            {/*提交修改建议*/}
                                            <div className="gc-res-edit-submit">
                                                <Button type="primary" size="large" alt="提出修改建议">提交修改建议</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
