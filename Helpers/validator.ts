import validator from 'validator';

export function validarCorreo(correo: string): boolean {
    return validator.isEmail(correo);
}

export function validarContrasena(contrasena: string): boolean {
    if (contrasena.length < 8) {
        return false;
    }
    return true;
}

export function validarCamposObligatorios(campos: string[]): boolean {
    return campos.every(campo => !!campo);
}
