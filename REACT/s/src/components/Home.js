import React, { Component } from 'react';

import Swiper from 'swiper';

import '../static/swiper.min.css';


var Store=require('../stores/CountStore');

class Home extends Component{



    constructor(props){
        super(props);

        this.state={

            count:Store.count
        }

    }

    componentDidMount() {
    	var mySwiper = new Swiper('.swiper-container', {
            autoplay: 1000,//可选选项，自动滑动
            pagination : '.swiper-pagination',
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next'
        })
    }

    render(){

        return(

            <div>
              

                    <h2>{this.state.count}</h2>
                    <div className="swiper-container">
                    <div className="swiper-wrapper">
                    <div className="swiper-slide red">

                            <ul>
                                <li>美食</li>
                                <li>美食</li>
                                <li>美食</li>
                                <li>美食</li>
                                <li>美食</li>
                                <li>美食</li>
                                <li>美食</li>
                            </ul>
                    </div>
                    <div className="swiper-slide blue">slider2</div>
                    <div className="swiper-slide orange">slider3</div>
                    </div>

                    <div className="swiper-pagination"></div>

                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>

                </div>
    
              
            </div>
        )
    }
}

export default Home;