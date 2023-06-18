'use strict'
const UserForma = new UserForm();
UserForma.loginFormCallback = data => {
    ApiConnector.login(data, callback => {
        if(callback.success == true) {
            location.reload();
        }else {
            UserForma.setLoginErrorMessage(callback.error);
        };
    });
};

UserForma.registerFormCallback  = data => {
    ApiConnector.register(data, callback => {
        if(callback.success == true) {
            location.reload();
        }else {
            UserForma.setRegisterErrorMessage(callback.error);
        };
    });
};



