export function EmailValidation (email) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i;
    
    if(!re.test(email)){
        return true;
    }
    else {
        return false;
    }

}


export function PhoneValidation(phone) {
    const re = /^(0|[1-9][0-9]{9})$/i;
    
    if(!re.test(phone)){
        return true;
    }
    else {
        return false;
    }
}
