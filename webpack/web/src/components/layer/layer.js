import './layer.scss';
import tpl from './layer.ejs';            // 返回是一个函数

function layer () {
	return {
		name: 'layer',
		tpl:tpl
	}
}
 
export default layer;
