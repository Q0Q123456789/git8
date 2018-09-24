const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const Stores = assign({},

    EventEmitter.prototype,{
        isHide: true,
        setStores(v) {
            this.isHide = v;
        },
        getStores() {
            return this.isHide;
        },
        emitChange: function () {
            this.emit('change');
        },
        addChangeListener: function (callback) {
            this.on('change', callback);
        },
        removeChangeListener: function (callback) {
            this.removeListener('change', callback);
        }
    }
)

module.exports = Stores