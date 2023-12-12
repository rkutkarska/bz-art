export const validateName = (e, setNameHasError) => {
    if (e.target.value.length < 3) {
        setNameHasError(true);
    } else {
        setNameHasError(false);
    }
}

export const validateEmail = (e, setEmailHasError) => {
    let emailPattern = new RegExp(/^[a-zA-Z0-9\.\-_]{2,}@[a-zA-Z\-0-9]{2,}.[a-zA-Z]{2,}$/);

    if (!emailPattern.test(e.target.value)) {
        setEmailHasError(true);
    } else {
        setEmailHasError(false);
    }
}

export const validatePhone = (e, setPhoneHasError) => {

    let phonePattern = new RegExp(/^[0-9]{10}$/);
    if (!phonePattern.test(e.target.value)) {
        setPhoneHasError(true);
    } else {
        setPhoneHasError(false);
    }
}

export const validateMessage = (e, setMessageHasError) => {
    if ((e.target.value.length > 500) || (e.target.value.length < 20)) {
        setMessageHasError(true);
    } else {
        setMessageHasError(false);
    }
}