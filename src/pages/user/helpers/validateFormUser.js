
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

    
    setTimeout(() => {

        setValidate({});
      }, 8000);
  

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

    setTimeout(() => {

        setValidate({});
      }, 8000);

    return rslt;
};