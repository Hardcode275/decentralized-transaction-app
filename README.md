# Aplicación de Transacciones Descentralizadas

Este proyecto es una aplicación descentralizada diseñada para facilitar transacciones entre Bitcoin (BTC) y Monero (XMR) utilizando una metodología de intercambio (swap). La aplicación tiene como objetivo proporcionar una forma segura y eficiente de realizar intercambios de criptomonedas sin depender de intercambios centralizados.

## Características

- **Intercambios Descentralizados**: Inicia intercambios entre BTC y XMR de manera descentralizada.
- **Gestón de Transacciones**: Supervisa y gestiona el estado de las transacciones.
- **Integración de Servicios**: Utiliza servicios dedicados para manejar transacciones de Bitcoin y Monero.

## Estructura del Proyecto

```
aplicacion-transacciones-descentralizadas
├── src
│   ├── app.ts                  # Punto de entrada de la aplicación
│   ├── services
│   │   ├── btcService.ts       # Servicio para transacciones de Bitcoin
│   │   └── moneroService.ts    # Servicio para transacciones de Monero
│   ├── controllers
│   │   └── transactionController.ts # Controlador para la lógica de transacciones
│   ├── routes
│   │   └── index.ts            # Definición de rutas de la API
│   └── types
│       └── index.ts            # Definiciones de tipos para transacciones
├── package.json                 # Configuración de paquetes NPM
├── tsconfig.json                # Configuración de TypeScript
└── README.md                    # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tuusuario/aplicacion-transacciones-descentralizadas.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd aplicacion-transacciones-descentralizadas
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Uso

Para iniciar la aplicación, ejecuta el siguiente comando:

```
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Endpoints de la API

- **POST /swap**: Inicia un intercambio entre BTC y XMR.
- **GET /transaction/:id**: Recupera el estado de una transacción.

## Contribución

¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request para cualquier mejora o corrección de errores.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

