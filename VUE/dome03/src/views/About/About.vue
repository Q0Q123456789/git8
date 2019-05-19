
<template>
    <div class="about">
        <div id="canvas" ref="canvas">
            <p id="clearCanvas" ref="clearCanvas">清除</p>
            <p id="saveCanvas" ref="saveCanvas">保存</p>
        </div>
        <div class="mySign" v-show="isSign">
            <img :src="signSrc" alt="">
        </div>
    </div>
</template>

<script>
export default {
 name: "about_page",
    data() {
        return {
            isSign: false,
            signSrc:''
        }
    },
    created() {

    },
    mounted() {
       this.lineCanvas({
            el: this.$refs.canvas,//绘制canvas的父级div
            clearEl:  this.$refs.clearCanvas,//清除按钮
            saveEl:  this.$refs.saveCanvas,//保存按钮
        });
    },
    methods: {
        lineCanvas(obj) {
            this.linewidth = 2;
            this.color = "red";
            this.background = "#000000";
            for (var i in obj) {
                this[i] = obj[i];
            }
            this.canvas = document.createElement("canvas");
            this.el.appendChild(this.canvas);
            this.cxt = this.canvas.getContext("2d");
            this.canvas.width = this.el.clientWidth;
            this.canvas.height = this.el.clientHeight;
            this.cxt.fillStyle = this.background;
            this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.width);
            this.cxt.strokeStyle = this.color;
            this.cxt.lineWidth = this.linewidth;
            this.cxt.lineCap = "round";
            console.log(this.cxt)
            //开始绘制
            this.canvas.addEventListener("touchstart", function(e) {
                this.cxt.beginPath();
                this.cxt.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
            }.bind(this), false);
            //绘制中
            this.canvas.addEventListener("touchmove", function(e) {
                console.log(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
                this.cxt.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
                this.cxt.stroke();
            }.bind(this), false);
            //结束绘制
            this.canvas.addEventListener("touchend", function() {
                this.cxt.closePath();
                 let imgBase64 = this.canvas.toDataURL();
                //console.log(imgBase64);
                this.signSrc= imgBase64;
                this.isSign= true;
            }.bind(this), false);
            //清除画布
            this.clearEl.addEventListener("click", function(e) {
              console.log(e)
                this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }.bind(this), false);
            //保存图片，直接转base64
            this.saveEl.addEventListener("click", function(e) {

                console.log(e)
                let imgBase64 = this.canvas.toDataURL();
                console.log(imgBase64)
                //console.log(imgBase64);
                this.signSrc= imgBase64;
                this.isSign= true;
            }.bind(this), false);
        }
    }
}
</script>

<style scoped lang="less">
    #canvas{
    width: 100%;
    height: 300px;
    position: relative;
        canvas{
            display: block;
        }
        #clearCanvas{
            width: 50%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            border: 1px solid #DEDEDE;
            z-index: 1;
        }
        #saveCanvas{
            width: 50%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: absolute;
            bottom: 0;
            right: 0;
            border: 1px solid #DEDEDE;
            z-index: 1;
        }
    }
    .mySign{
        width: 100%;
        height: 300px;
        img{
            width: 100%;
            height: 300px;
        }
    }
    .test{
        width: 100%;
        height:200px;
        font-size:14px;
        font-weight:600;
        text-align:center;
        
    }
    
</style>