import React, {Component} from "react";
import ReactDOM from "react-dom";
import {browserHistory} from 'react-router'
import './login.style.less'
//import networkAction from "../utils/networkAction"

export default class Login extends Component {
    constructor(props) {  // 只有在constructor中可以直接为this.state分配值，其他情况要是用setState()方法更新state值，如this.setState({loginState:0})
        super(props);
        this.userId = "",
        this.state = {
            loginState: 0, // 0表示未登录，1表示用户名或密码错误，2表示该用户不存在
            content: ["用户名或密码错误，请重新输入！","该用户不存在，请重新输入！"],
            userNum: "",
            password: "",
        }
    }
    // componentWillMount() {
    //     // 发送清除cookie的请求
    //     const result = networkAction.promiseNetwork({"url": `TeachingResourceManagement/user/logout`, "method": 'POST'})
    //     result.then((res) => {
    //         console.log("logout-result:", res);
    //         sessionStorage.clear();
    //     })
    // }
    handleLogin(event) {

        browserHistory.push('/home');

        // event.preventDefault();
        // console.log("handleLogin")
        // let userNum = document.getElementsByName("userNum")[0].value;
        // let password = document.getElementsByName("password")[0].value;
        // console.log("usrNum: ", userNum, "psw: ", password);
        // const result = networkAction.promiseNetwork({"url": `TeachingResourceManagement/user/login`, "method": 'POST'},{"userNum": userNum, "password": password})
        // result.then((res) => {
        //     console.log("login-result:", res);
        //     if(res.code == 0){
        //         this.userId = res.data.userId;
        //         console.log("this.userId:", this.userId);
        //         this.props.userStateOnChange(this.userId);
        //         sessionStorage.setItem('userId', this.userId);
        //         browserHistory.push('/TeachingResourceManagement/home');
        //     }else if(res.code == 1){
        //         this.setState({loginState: 1});
        //     }else{
        //         this.setState({loginState: 2});
        //     }
        // })
    }  
    guestLogin() {
        const result = networkAction.promiseNetwork({"url": `TeachingResourceManagement/user/guestLogin`, "method": 'POST'})
        result.then((res) => {
            console.log("guest-login-result:", res);
            if(res.code == 0){
                // this.userId = res.data.userId;
                console.log("this.userId:", this.userId);
                this.props.userStateOnChange('guest');
                sessionStorage.setItem('userId', 'guest');
                browserHistory.push('/TeachingResourceManagement/home');
            }else if(res.code == 1){
                this.setState({loginState: 1});
            }else{
                this.setState({loginState: 2});
            }
        })
    }
    renderWrong(){
        if(this.state.loginState == 1){
           return "用户名或密码错误，请重新输入！"
        }else return null;
    }
    userNumChange(event) {
        this.setState({
            userNum: event.target.value,
            loginState: 2
        })
    }
    passwordChange(event) {
        this.setState({
            password: event.target.value,
            loginState: 2
        })
    }

    render(){
        return(
            <div id="login-page">
                 <div className=" login-all ">
                    <div  className=" login-left " >
                        <form className="form-sign" onSubmit={this.handleLogin.bind(this)}>
                            <div className="head">
                                <h3 className="form-sign-heading">欢迎登录英语语法纠错系统！</h3>
                            </div>
                            <div className="username">
                                <input type="text" className="form-control" name="userNum" placeholder="账号"
                                value={this.state.userNum} 
                                onChange={this.userNumChange.bind(this)} 
                                required />
                            </div>
                            <div className="password">
                                <input type="password" className="form-control" name="password" placeholder="密码"
                                value={this.state.password} 
                                onChange={this.passwordChange.bind(this)} 
                                required />
                            </div>
                            <div className="summit">
                                <input className="btn btn-md btn-primary btn-block" type="submit" value="登录"/>
                                {/*<input className="btn btn-md btn-primary btn-block" type="button" onClick={this.guestLogin.bind(this)} value="游客访问"/>*/}
                            </div>
                        </form>
                        <div className="login-remind">{this.renderWrong()}</div> 
                    </div>

                    {/*<div className=" login-right  ">
                        <h4>扫描二维码登录</h4>
                        <img src="/assets/img/login.jpg" />
                    </div> */}
                    
                </div>
            </div>
           
        );
    }
}
