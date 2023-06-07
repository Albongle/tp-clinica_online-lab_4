import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysNames',
})
export class KeysNamesPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    const keysMapped = {
      userId: 'Id Usuario',
      verified: 'Verificado',
      userRole: 'Rol de Usuario',
      name: 'Nombre',
      lastName: 'Apellido',
      age: 'Edad',
      email: 'Email',
      password: 'Contraseña',
      socialWork: 'Obra Social',
      profilePhoto: 'Foto de perfil 1',
      profilePhotoTwo: 'Foto de perfil 2',
      verifiedByAdmin: 'Verficado por Admin',
      speciality: 'Especialidad',
    };

    //@ts-ignore
    return keysMapped[value];
  }
}
