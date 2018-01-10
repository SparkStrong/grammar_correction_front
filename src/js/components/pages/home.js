import React, { Component } from "react";
import { Input, Button, Radio } from 'antd';
import './home.less';
import networkAction from "../../utils/networkAction"

export default class Home extends Component {

    constructor(props) {  // 只有在constructor中可以直接为this.state分配值，其他情况要是用setState()方法更新state值，如this.setState({loginState:0})
        super(props);
        this.gcRes = "",
        this.state = {
            gcSource: "",
            gcResult: "",
            gcState: 0 // 0代表正常, -1后台错误
        }
    }

    handleSubmit() {
        //event.preventDefault();
        let gcSource = document.getElementsByName("src-input")[0].value;
        console.log("gcSource: ", gcSource);

        let url = "api/grammar/correct/";

        const result = networkAction.promiseNetwork({"url": url, "method": 'POST'}, {"gcSource": gcSource})
        result.then((res) => {
            console.log("gc-res:", res);
            if(res.code == 0) {
                console.log(this);
                this.setState({
                    gcResult: res.data.gcResult
                })

                console.log(res.data);
                console.log(res.data["gcResult"])
                this.gcRes = res.data["gcResult"];
                console.log("gcResult: ", this.gcRes);
            } else {
                this.setState({gcState: -1});
            }
        })
    }

    // 用户输入原始要进行纠错的文本
    gcSourceChanging(event) {
        this.setState({
            gcSource: event.target.value,
        })
    }

    setGcResult() {
        console.log("gcResult: ", this.gcResult);
        let gcResultInput = document.getElementsByName("gc-res-input");
        gcResultInput.value = this.gcRes;
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
                                        <Input name="src-input" type="textarea" rows={10} style={{fontSize: "16px"}} 
                                        value={this.state.gcSource}
                                        onChange={this.gcSourceChanging.bind(this)}
                                        required />
                                    </div>

                                    {/*提交*/}
                                    <div className="gc-src-submit"> 
                                        <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>提交</Button>
                                    </div>
                                </div>

                                {/*纠错结果*/}
                                <div id="gc-res-c" className="gc-res-c">
                                    <div className="gc-res-p">
                                        <Input name="gc-res-input" type="textarea" rows={10} style={{fontSize: "16px"}}
                                        value={this.state.gcResult} 
                                        />
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
