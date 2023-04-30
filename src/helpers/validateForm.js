
export const validateFormEditData = (data, setValidate) => {


    let image, name, rslt = true;


    if (data.name == '') {
        name = 'El nombre no puede estar vacío';
        rslt = false;
    }

    if (data.image == '' && data.imageURL == '') {
        image = 'Debes elegir una imagen para mostrar';
        rslt = false;
    }

    setValidate({
        name,
        image
    });

    return rslt;
};



export const validateFormChangePassword = (data, setValidate) => {


    let oldPassword, password, passwordR, rslt = true;


    if (data.oldPassword == '') {
        oldPassword = 'La contraseña actual es obligatoria';
        rslt = false;
    }

    if (data.password == '') {
        password = 'La contraseña nueva es obligatoria';
        rslt = false;
    }

    if (data.password != data.passwordR) {
        passwordR = 'Las contraseñas no coinciden';
        rslt = false;
    }


    setValidate({
        password,
        passwordR,
        oldPassword
    });

    return rslt;
};



export const validateFormRegister = (data, setValidate) => {


    let email, image, name, password, passwordR, rslt = true;


    const testEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);


    if (data.email == '' || !testEmail.test(data.email)) {
        email = 'Debes escribir un email válido';
        rslt = false;
    }

    if (data.name == '') {
        name = 'El nombre no puede estar vacío';
        rslt = false;
    }

    if (data.image == '') {
        image = 'Debes elegir una imagen para mostrar';
        rslt = false;
    }

    if (data.password == '') {
        password = 'La contraseña es obligatoria';
        rslt = false;
    }

    if (data.password != data.passwordR) {
        passwordR = 'Las contraseñas no coinciden';
        rslt = false;
    }


    setValidate({
        email,
        name,
        password,
        passwordR,
        image
    });

    return rslt;
};



export const validateFormLogin = (data, setValidate) => {


    let email, password, rslt = true;

    const testEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);


    if (data.email == '' || !testEmail.test(data.email)) {
        email = 'Debes escribir un email válido';
        rslt = false;
    }


    if (data.password == '') {
        password = 'La contraseña es obligatoria';
        rslt = false;
    }


    setValidate({
        email,
        password
    });

    return rslt;
};
