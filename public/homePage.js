const exit = new LogoutButton();
exit.action = exitCall => {
    ApiConnector.logout(exitCall => {
        if(exitCall.success == true) {
            location.reload();
        }else{
            alert(exitCall.error);
        }
    });
}

ApiConnector.current(infoUser => {
    if(infoUser.success == true) {
        ProfileWidget.showProfile(infoUser.data);
    } else {
        alert(infoUser.error);
    }
});

const exchangeRates = new RatesBoard();
ApiConnector.getStocks(function queryExchangeRates(stocks) {
    if(stocks.success == true) {
        exchangeRates.clearTable();
        exchangeRates.fillTable(stocks.data);
    }
    
    setInterval(() => queryExchangeRates(stocks), 60000);
});

const moneyTransactions = new MoneyManager();
moneyTransactions.addMoneyCallback = refill => {
    ApiConnector.addMoney(refill, callback => {
        if(callback.success == true) {
            ProfileWidget.showProfile(callback.data);
            moneyTransactions.setMessage(callback.success, callback.error = 'Баланс пополнен успешно!');
        } else {
            moneyTransactions.setMessage(callback.success, callback.error);
        }
    });
};

moneyTransactions.conversionMoneyCallback = conversion => {
    ApiConnector.convertMoney(conversion, callback => {
        if(callback.success == true) {
            ProfileWidget.showProfile(callback.data);
            moneyTransactions.setMessage(callback.success, callback.error = 'Конвертация выполнена успешно!');
        } else {
            moneyTransactions.setMessage(callback.success, callback.error);
        }
    });
};

moneyTransactions.sendMoneyCallback = transfer => {
    ApiConnector.transferMoney(transfer, callback => {
        if(callback.success == true) {
            ProfileWidget.showProfile(callback.data);
            moneyTransactions.setMessage(callback.success, callback.error = 'Перевод выполнен успешно!');
        } else {
            moneyTransactions.setMessage(callback.success, callback.error);
        }
    });
};

const elect = new FavoritesWidget();
ApiConnector.getFavorites(callback => {
    if(callback.success == true) {
        elect.clearTable();
        elect.fillTable(callback.data);
        moneyTransactions.updateUsersList(callback.data);
    }
});

elect.addUserCallback = addUser => {
    ApiConnector.addUserToFavorites(addUser, callback => {
        if(callback.success == true) {
            elect.clearTable();
            elect.fillTable(callback.data);
            moneyTransactions.updateUsersList(callback.data);
        }else {
            elect.setMessage(callback.success, callback.error);
        }
    });
};

elect.removeUserCallback  = deleteUser => {
    ApiConnector.removeUserFromFavorites(deleteUser, callback => {
        if(callback.success == true) {
            elect.clearTable();
            elect.fillTable(callback.data);
            moneyTransactions.updateUsersList(callback.data);
        }else {
            elect.setMessage(callback.success, callback.error);
        }
    });
};

