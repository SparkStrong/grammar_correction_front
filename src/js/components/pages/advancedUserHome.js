import React, { Component } from "react";
import { Input, Button, Radio, Icon } from 'antd';
import './home.less';
import networkAction from "../../utils/networkAction"

export default class AdvancedHome extends Component {

    constructor(props) {  // 只有在constructor中可以直接为this.state分配值，其他情况要是用setState()方法更新state值，如this.setState({loginState:0})
        super(props);
        this.state = {
            gcSource: "",  // 用户原始输入待纠错内容
            gcResult: "",  // 系统纠错结果
            suggestGCRes: "",  // 用户修改建议
            gcState: 0 // 0代表正常, -1后台错误
        },
        this.gcResEditFlag = false;  // 提出修改建议的标志,true允许修改，false不允许修改
        // this.originalCorrectionRes = "";
        // this.suggestGCRes = "";
    }

    handleSubmit() {
        let gcSource = document.getElementsByName("src-input")[0].value;
        // console.log("gcSource: ", gcSource);

        let url = "api/grammar/correct/";
        const result = networkAction.promiseNetwork({ "url": url, "method": 'POST' }, { "gcSource": gcSource });

        result.then((res) => {
            console.log("gc-res:", res);
            if (res.code == 0) {
                this.setState({
                    gcResult: res.data.gcResult,
                    suggestGCRes: res.data.gcResult
                })

                console.log(res.data);
                console.log(res.data["gcResult"])
                this.setGcResult();
            } else {
                this.setState({ gcState: -1 });
            }
        })

    }


    handleSubmitSuggest() {
        if (this.state.gcResult != "" && this.state.gcResult != this.state.suggestGCRes) {
            let gcSource = this.state.gcSource;
            let gcRes = this.state.gcResult;
            let gcResSugg = this.state.suggestGCRes;
            let data = { "gcSource": gcSource, "gcRes": gcRes, "gcResSugg": gcResSugg };

            console.log(data);

            let url = "api/grammar/correct-suggest/";
            const result = networkAction.promiseNetwork({ "url": url, "method": 'POST' }, data);

            result.then((res) => {
            console.log("gc-res:", res);
            if (res.code == 0) {  // 提交修改建议成功
                console.log("成功提交修改建议");
                alert("成功提交修改建议");
            } else if (res.code == 1){
                browserHistory.push('/login');
            } else {
                 this.setState({ gcState: -1 });
            }
        })

        } else if (this.state.suggestGCRes == "") {
            alert("请输入您修改后文本再进行提交修改建议！");
        } else if (this.state.gcResult == this.state.suggestGCRes) {
            alert("请输入您修改后文本再进行提交！");
        }
    }

    // 用户输入原始要进行纠错的文本
    gcSourceChanging(event) {
        this.setState({
            gcSource: event.target.value,
        })

        this.showOrHideResTools(false); // 不显示提出修改建议，提交修改建议等内容
        // this.showOrHideSuggestionButton(false);
        this.gcResEditFlag = false;  // 取消可以提出修改建议的标志
        this.state.gcResult = "";
        this.setState.suggestGCRes = "";
    }


    gcResInputChanging(event) {
        console.log("gcResInputChanging");
        // if(this.gcResEditFlag) {
        //     this.setState({
        //         suggestGCRes: event.target.value,
        //     })
        // }

        this.setState({
            suggestGCRes: event.target.value,
        })
        // console.log(this.suggestGCRes);
        // console.log(this.state.suggestGCRes);
    }

    showOriginGCRes() {
        let gcResInput = document.getElementsByName("gc-res-input")[0];
        gcResInput.value = this.state.gcResult;

        console.log("origin gcres = " + this.state.gcResult);
        console.log("sugges gcres = " + this.suggestGCRes);
        console.log("state sugges gcres = " + this.state.suggestGCRes);
    }

    suggestionButtonClicked() {
        this.gcResEditFlag = true;
        // this.showOrHideResTools(true);  // 显示查看原始纠错结果和提交修改建议按钮
        console.log("suggestion button clicked");
        // console.log(this.gcResEditFlag);
    }

    /**
     * 显示纠错结果
     */
    setGcResult() {
        console.log("setGcResult gcResult: ", this.state.gcResult);
        let gcResInput = document.getElementsByName("gc-res-input")[0];
        gcResInput.value = this.state.gcResult;

        // this.showOrHideSuggestionButton(true);  // 显示提出修改建议 按钮，使得用户可以提交修改建议
        this.showOrHideResTools(true);
    }

    showOrHideSuggestionButton(flag) {
        let suggestionDiv = document.getElementById("gc-res-edit");
        if (flag) {
            suggestionDiv.style.display = "block";
        } else {
            suggestionDiv.style.display = "none";
        }
    }

    /**
     * 显示或者隐藏语法纠错结果修改建议、提交建议等工具
     * @param {*} flag true 显示， false 隐藏
     */
    showOrHideResTools(flag) {
        let resTools = document.getElementById("gc-res-tools");
        if (flag) {
            resTools.style.display = "block";
        } else {
            resTools.style.display = "none";
        }
    }

    // componentDidMount() {
    //     console.log("page didmount");
    //     showOrHideResTools(false);
    // }

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
                                        <Input name="src-input" type="textarea" rows={10} style={{ fontSize: "16px" }}
                                            value={this.state.gcSource}
                                            onChange={this.gcSourceChanging.bind(this)}
                                            required
                                        />
                                    </div>

                                    {/*提交和修改建议按钮*/}
                                    <div className="gc-src-submit">
                                        <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>提交</Button>
                                    </div>
                                </div>

                                {/*纠错结果*/}
                                <div id="gc-res-c" className="gc-res-c">

                                    {/*纠错结果*/}
                                    <div className="gc-res-p">
                                        <Input name="gc-res-input" type="textarea" rows={10} style={{ fontSize: "16px" }}
                                            onChange={this.gcResInputChanging.bind(this)}
                                        />
                                    </div>

                                    <div className="gc-res-submit">
                                        {/*纠错结果的提出建议及查看原始纠错结果*/}
                                        <div id="gc-res-tools" className="gc-res-tools">
                                            <div id="gc-res-edit" className="gc-res-edit" role="button" alt="提出修改建议">
                                                <div onClick={this.suggestionButtonClicked.bind(this)}>
                                                    <Icon type="edit" style={{ lineHeight: "2.5" }} value="提出修改建议" /> 提出修改建议
                                                </div>

                                            </div>

                                            {/*style={{ lineHeight: "0" }} */}

                                            <div id="gc-res-undo" className="gc-res-undo" role="button" onClick="">
                                                <div onClick={this.showOriginGCRes.bind(this)}> <span className="gc-res-undo-img"> </span> 查看原始纠错结果 </div>
                                            </div>

                                            {/*提交修改建议*/}
                                            <div className="gc-res-edit-submit">
                                                <Button type="primary" size="large" alt="提出修改建议" onClick={this.handleSubmitSuggest.bind(this)} >提交修改建议</Button>
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
