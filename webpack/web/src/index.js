
import Layer from './components/layer/layer.js';
 
let App = function () {
  var oApp = document.querySelector("#app");
  var oModal = new Layer();
	oApp.innerHTML = oModal.tpl({
    name: 'jeson',
      arr: ['张三', '李四', '王五', '赵六']
  });
}
new App()
