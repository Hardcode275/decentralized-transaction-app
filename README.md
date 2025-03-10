# Aplicación de Transacciones Descentralizadas

Este proyecto es una aplicación descentralizada diseñada para facilitar transacciones entre Bitcoin (BTC) y Monero (XMR) utilizando una metodología de intercambio (swap). La aplicación tiene como objetivo proporcionar una forma segura y eficiente de realizar intercambios de criptomonedas sin depender de intercambios centralizados.

## Características

- **Intercambios Descentralizados**: Inicia intercambios entre BTC y XMR de manera descentralizada.
- **Gestión de Transacciones**: Supervisa y gestiona el estado de las transacciones.
- **Integración de Servicios**: Utiliza servicios dedicados para manejar transacciones de Bitcoin y Monero.

## Estructura del Proyecto

```
decentralized-transaction-app
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
│       └── monero-javascript.d.ts   # Definiciones de tipos para Monero
├── package.json                 # Configuración de paquetes NPM
├── tsconfig.json                # Configuración de TypeScript
└── README.md                    # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tuusuario/decentralized-transaction-app.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd decentralized-transaction-app
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

Para construir y luego iniciar la aplicación, ejecuta:

```
npm run build && npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Endpoints de la API

- **POST /swap**: Inicia un intercambio entre BTC y XMR.
  ```sh
  curl -X POST http://localhost:3000/api/transactions/swap -H "Content-Type: application/json" -d "{\"fromCurrency\":\"BTC\", \"toCurrency\":\"XMR\", \"amount\":0.1, \"recipientAddress\":\"abc123\"}"
  ```

- **GET /transaction/:id**: Recupera el estado de una transacción.
  ```sh
  curl -X GET http://localhost:3000/api/transactions/status/transaction-id
  ```

✅ Verificar la ruta `/api/transactions/status/:id`
Ejemplo con curl (sustituye `transaction-id` por un ID real si lo tienes):
```sh
curl -X GET http://localhost:3000/api/transactions/status/transaction-id
```

## Despliegue en Heroku

Para desplegar la aplicación en Heroku, sigue estos pasos:

1. Asegúrate de que todos los cambios estén confirmados en tu repositorio Git local:
   ```sh
   git add .
   git commit -m "Add type declarations for body-parser, express, and node"
   ```

2. Despliega tu aplicación a Heroku:
   ```sh
   git push heroku main
   ```

3. Abre tu aplicación en el navegador:
   ```sh
   heroku open
   ```

4. Monitorea tu aplicación:
   ```sh
   heroku logs --tail
   ```

## Contribución

¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request para cualquier mejora o corrección de errores.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

