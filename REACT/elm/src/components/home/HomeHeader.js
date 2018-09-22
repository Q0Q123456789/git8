import React, { Component } from 'react';
import { NavBar, Icon ,Popover } from 'antd-mobile';
import './header.less'

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt=""/>;

class HomeHeader extends Component {
  constructor(props){
      super(props)
      this.state ={
        visible: false,
        selected: '',
        title:{}
      }
  };
  componentWillMount(){
    this.setState({
      title:this.props.match.params
    })
  };
  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: true,
      selected: opt.props.value,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  render() {
    return (
      <div className="Header" id='Header'>
      <NavBar key='1' mode="light" icon={<Icon type="left" />} onLeftClick={() => this.onBack()} 
        rightContent={[
          <Popover mask key='1'
          overlayClassName="fortest"
          overlayStyle={{ color: 'currentColor' }}
          visible={this.state.visible}
          overlay={[
            (<Item key="1" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
            (<Item key="2" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
            (<Item key="3" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
              <span style={{ marginRight: 5 }}>Help</span>
            </Item>),
          ]}
          align={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [-10, 0],
          }}
          onVisibleChange={this.handleVisibleChange}
          onSelect={this.onSelect}
        >
          <div style={{
            height: '100%',
            padding: '0 15px',
            marginRight: '-15px',
            display: 'flex',
            alignItems: 'center',
          }}
          >
            <Icon type="ellipsis" />
          </div>
        </Popover>
        ]}
      >{this.state.title.title}</NavBar>
            
            <div className='date_time'>{this.state.title.dateTime}</div>
      </div>
    );
  }
  //返回
  onBack(){
    window.history.back();
  }
}

export default HomeHeader;
