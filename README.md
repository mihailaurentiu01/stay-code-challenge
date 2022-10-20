# coding-challenge-stay

Incluye: 
- Vue 3 (Comp. api) + Pinia
- Vite
- i18n (es,en)
- Vue router
- axios
- Element plus

¿Cómo plantearías un escenario en el que te hubieras descargado los usuarios pero después la API estuviera offline, para que siguiera funcionando el visionado de usuarios?

Para ello simplemente cargaríamos el data de la carpeta models ( o donde se quiera guardar el mockup de los datos) y lo sustituiriamos por la respuesta de la api. En el caso de que falle la request se puede hacer en el control de errores un fallback para que el array de datos siempre tenga algo. Luego, manejando distintos status que devuelva la API, se puede cargar el mockup en vez de la respuesta de la api.


## Componentes y props
Alert: Componente de alerta que se reutiliza en la aplicación
- Props:


| Prop     | Type      | Description     | Default |
| ------------- | ------------- | -------- | -------- |
| type          | String         | Tipo de alert de element plus  | 'error' |
| title           | String         | El título de la alerta. Debe ser una traducción disponible en el diccionario | errors.default |


Dialog: Componente de diálogo (o popup) que se reutiliza en la aplicación
- Props:


| Prop     | Type      | Description     | Default |
| ------------- | ------------- | -------- | -------- |
| dialogVisible          | Boolean         | Indica si el diálogo o popup está visible  | false |
| title           | String         | El título del diálogo o popup | ''

NOTA: Este componente cuenta con un slot "content" para introducir el contenido del mismo.

UsersTable: Componente de Tabla de usuarios
- Props:


| Prop     | Type      | Description     | Default |
| ------------- | ------------- | -------- | -------- |
| dataSource          | Array         | El origen de datos de la tabla  | [] |
| enableDetails           | Boolean         | Habilita o deshabilita el botón de detalles | true
| enableDelete           | Boolean         | Habilita o deshabilita el botón de borrar | true


La aplicación además cuenta con unos helpers (o funciones de ayuda) que se reutilizan a lo largo de la aplicación.
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
