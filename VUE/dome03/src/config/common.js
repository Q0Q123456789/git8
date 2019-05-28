const common = {
    $Api () {
        return process.env.NODE_ENV === 'development' ? 'http://localhost:10086' : 'https://api.xiaomu1314.xin'
    }
}

export default common