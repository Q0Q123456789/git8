
import React, { Component } from 'react'
import { NavBar, Icon ,Popover } from 'antd-mobile';
import axios from 'axios';
import './newsDetails.less'
const Action = require('../../stores/action');

class newsDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: ''
        }
        this.$http = this.$http.bind(this);
    };
    componentWillMount() {
        Action.addNewItem(false); //隐藏导航栏
        let url = this.props.match.params;
        this.$http(url.id);
    };
    componentDidMount() {

        
    };
    componentWillUnmount() {

    };
    getContent(){
        return {__html:this.state.list.content}
    };
    render() {
        return (
            <div id="newsDetails">
                <div className="header">
                    <NavBar key='1' mode="light" icon={<Icon type="left" />} onLeftClick={() => this.onBack(true)} 
                        rightContent={[
                        <Popover mask key='1'
                        overlayClassName="fortest"
                        overlayStyle={{ color: 'currentColor' }}
                        visible={this.state.visible}
                        align={{
                            overflow: { adjustY: 0, adjustX: 0 },
                            offset: [-10, 0],
                        }}
                        >
                        <div>
                        </div>
                        </Popover>
                        ]}
                    >详情</NavBar>
                </div>
                <div className="mian">
                    <center dangerouslySetInnerHTML={this.getContent()} />
                </div>
            </div>
        )
    };
     //返回
    onBack(v){
        window.history.back();
        Action.addNewItem(v);
    };
    $http(id){
        const that = this;
        let url = 'http://www.phonegap100.com/appapi.php';
        axios.get(url,{
          params:{
            a: 'getPortalArticle',
            aid: id
          }
        })
        .then(response => {
          that.setState({
            list:response.data.result[0]
          });
        })
        .catch(error => console.log(error));
    }
}


export default newsDetails