import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyusersmapped',
})
export class KeysUserMappedPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string | undefined {
    const keysMapped = [
      { key: 'userId', value: 'Id Usuario' },
      { key: 'verified', value: 'Email Verificado' },
      { key: 'userRole', value: 'Rol de Usuario' },
      { key: 'name', value: 'Nombre' },
      { key: 'dni', value: 'Dni' },
      { key: 'lastName', value: 'Apellido' },
      { key: 'age', value: 'Edad' },
      { key: 'email', value: 'Email' },
      { key: 'password', value: 'Contraseña' },
      { key: 'socialWork', value: 'Obra Social' },
      { key: 'profilePhoto', value: 'Foto de perfil 1' },
      { key: 'profilePhotoTwo', value: 'Foto de perfil 2' },
      { key: 'verifiedByAdmin', value: 'Verificado por Admin' },
      { key: 'speciality', value: 'Especialidad' },
    ];

    return keysMapped.find((k) => k.key === value)?.value;
  }
}
