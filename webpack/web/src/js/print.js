import '../css/style.scss';
import ejs from 'index.ejs';            // 返回是一个函数
 
function layer () {
	return {
		name: 'layer',
		ejs: ejs
	}
}
 
export default layer;
