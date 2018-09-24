const Dispatcher = require('flux').Dispatcher;
const AppDispatcher = new Dispatcher();
const stores = require('./stores');

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case 'IS_HIDE':
            stores.setStores(action.text);
            stores.emitChange();
            break;
        default:
    }
})

module.exports = AppDispatcher;