# poke-teams-app
Una plataforma de equipos Pokemon.

# Requisitos

- `node` >=14.
- `yarn` instalado globalmente.
- Un emulador, simulador o dispositivo físico (configurado en modo de depuración) para ejecutar la App.

### Para depuración en Android

- [Android CLI Tools](https://developer.android.com/studio/command-line):

    1. Vienen incluidas en la instalación de [Android Studio](https://developer.android.com/studio?gclsrc=ds&gclsrc=ds).
    2. Si no deseas instalar Android Studio, [es posible instalarlas de forma directa](https://proandroiddev.com/how-to-setup-android-sdk-without-android-studio-6d60d0f2812a).

### Para depuración en iOS

- XCode

# Instalación

## 1. Configurar el entorno

Copiar el archivo `.env.example` en la raíz de este proyecto a uno llamado `.env` en la misma ubicación.

```bash
  cp .env.example .env
```

NOTA: Para agilizar el proceso de revisión, las variables de entorno ya han sido configuradas en el archivo de ejemplo.

## 2. Instalar las dependencias

```bash
  yarn install
```

## 3. Iniciar el servidor de Metro

```bash
  yarn start
```

El servidor de Metro estará listo cuando se muestre un código QR.

## 4. Lanzar la aplicación en Expo Go

Desde la terminal en donde corre el servidor de Metro, presiona `a` para lanzar la aplicación en Android o `i` para lanzar la aplicación en iOS.

El servidor se encargará de instalar la aplicación de Expo Go en tu simulador o dispositivo. Luego de eso, lanzará `poke-teams-app`.

# Características

- Autenticación con Google y Facebook.
- CRUD de los equipos del usuario.
- Máximo de equipos por región (configurable mediante `TEAMS_PER_REGION` en el archivo `.env`).
- Mínimo 3 y máximo 6 Pokemones por equipo.
- Sincronización con Firebase.
- Fuentes personalizadas.

# Contribuciones

## Mensajes de commits

Los commits de este repositorio utilizan el estándar de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), en donde se sigue el formato:

```
<tipo>(<ámbito opcional>): <descripción>
```

en donde `tipo` puede ser uno de los siguientes:

- `feat`: funcionalidad añadida, removida o modificada.
- `fix`: corrección de un bug.
- `refactor`: refactorización de código (sin añadir o remover funcionalidad).
- `perf`: optimización de rendimiento.
- `chore`: cambios relacionados a la configuración de herramientas, dependencias y CI.
- `docs`: cambios de documentación.
- `style`: cambios exclusivamente a interfaz de la App.
- `test`: cambios hechos exclusivamente a las pruebas automatizadas.

Más detalles y ejemplos del estándar se encuentran en la especificación de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

# Limitaciones

- Este proyecto utiliza la [PokéApi](https://pokeapi.co/) para obtener los datos de regiones y Pokemones. Mientras que la API sí soporta paginación, __no soporta filtrado por campos__. Debido a esto, la consulta de Pokemones por región se ha implementado parcialmente mediante el uso de constantes, aprovechando que los Pokemones han sido añadidos a la PokéApi por orden de ubicación.
