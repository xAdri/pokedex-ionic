# Pokedex Project

## Descripción
Este proyecto es una aplicación de Pokedex que permite a los usuarios explorar diferentes Pokémon, ver sus detalles y jugar minijuegos relacionados con ellos.

## Requisitos
- Node.js (versión 14 o superior)
- Angular CLI
- Capacitor

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/pokedex.git
   cd pokedex
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución del Proyecto
Para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:
```bash
npm start
```
Esto iniciará la aplicación en `http://localhost:4200/`.

## Construcción
Para construir el proyecto para producción, utiliza:
```bash
npm run build
```

## Capacitor
Para agregar plataformas móviles, utiliza:
```bash
npx cap add ios
npx cap add android
```

## Configuración del Proyecto

### Configuración de Angular
- Asegúrate de tener la versión correcta de Angular CLI instalada:
  ```bash
  npm install -g @angular/cli@latest
  ```

### Configuración de Capacitor
- Para inicializar Capacitor, ejecuta:
  ```bash
  npx cap init
  ```

### Configuración de Entorno
- Configura las variables de entorno en el archivo `src/environments/environment.ts` y `src/environments/environment.prod.ts` según sea necesario.

### Pruebas
- Para ejecutar las pruebas, utiliza:
  ```bash
  npm run test
  ```

### Linter
- Para verificar el código con el linter, utiliza:
  ```bash
  npm run lint
  ```

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia
Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.

## Contacto
Para más información, puedes contactar a:
- Tu Nombre - tu_email@example.com

---