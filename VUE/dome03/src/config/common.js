const common = {
    $Api () {
        return process.env.NODE_ENV === 'development' ? 'http://localhost:9527' : 'https://api.xiaomu1314.xin'
    }
}

export default common