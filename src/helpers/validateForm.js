
/**
 * @author Pablo
 * @module validateForm
 */



/**
 * Valida los datos del usuario del formulario de registro
 * @method validateFormRegister
 * @param {Object} data Los datos a validar
 * @param {Hook} setValidate Hook para almacenar los datos del resultado de la validación
 * @returns {Boolean} Con el resultado de la validación
 */
export const validateFormRegister = (data, setValidate) => {


    let email, image, name, password, passwordR, rslt = true;


    const testEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);


    if (data.email == '' || !testEmail.test(data.email)) {
        email = 'Debes escribir un email válido';
        rslt = false;
    }
    console.log('data image', data.image)
    if (data.name == '') {
        name = 'El nombre no puede estar vacío';
        rslt = false;
    }

    if (data.image.name == '') {
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


    setTimeout(() => {
        setValidate({});
    }, 8000);

    return rslt;
};



/**
 * Valida los datos del usuario del formulario de login
 * @method validateFormLogin
 * @param {Object} data Los datos a validar
 * @param {Hook} setValidate Hook para almacenar los datos del resultado de la validación
 * @returns {Boolean} Con el resultado de la validación
 */
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

    setTimeout(() => {
        setValidate({});
    }, 8000);

    return rslt;
};



/**
 * Valida los datos del usuario del formulario de edición del perfil
 * @method validateFormProfile
 * @param {Object} data Los datos a validar
 * @returns {Boolean} Con el resultado de la validación
 */
export const validateFormProfile = (data) => {

    let rslt = true;

    for (const [key, value] of Object.entries(data)) {
        if (data[key] == '') rslt = false;
    };


    return rslt;
};