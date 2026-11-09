# Prueba técnica: CRUD de Productos

Aplicación web para administrar el catálogo de productos de una tienda pequeña.
Permite crear, listar, consultar, actualizar y eliminar productos.

- **Backend:** Python + Flask + SQLite (API REST con JSON)
- **Frontend:** React + Vite (con React Router)

## Requisitos previos

- Python 3.13.7 o superior
- Node.js 22.20.0 o superior (incluye npm)

## Estructura del proyecto

```
Prueba-productos/
├── Backend/
│   ├── app/
│   │   ├── models/        # Modelo Producto
│   │   ├── routes/        # Rutas HTTP (Blueprint)
│   │   ├── services/      # Lógica de negocio, validaciones y acceso a datos
│   │   ├── database.py    # Conexión a SQLite y creación de la tabla
│   │   └── errors.py      # Manejo centralizado de errores
│   ├── run.py             # Punto de entrada
│   └── requirements.txt
└── Frontend/
    └── src/
        ├── api/           # Llamadas a la API
        ├── components/    # Componentes reutilizables
        └── pages/         # Pantallas: listado, crear y editar
```

## Cómo ejecutar el backend

Desde la carpeta `Backend`:

```
python -m venv venv
```

Activar el entorno virtual:

- Windows (cmd): `venv\Scripts\activate`
- Windows (PowerShell): `venv\Scripts\Activate.ps1`
- macOS / Linux: `source venv/bin/activate`

Instalar dependencias y arrancar:

```
pip install -r requirements.txt
python run.py
```

La API queda disponible en `http://127.0.0.1:5000`.
La base de datos (`productos.db`) se crea sola en la carpeta `Backend` la primera vez que se ejecuta.

## Cómo ejecutar el frontend

En **otra terminal**, desde la carpeta `Frontend`:

```
npm install
npm run dev
```

Abrir `http://localhost:5173` en el navegador.
El backend debe estar corriendo al mismo tiempo.

## Endpoints de la API

| Método | Ruta | Descripción | Respuesta exitosa |
|---|---|---|---|
| POST | `/productos` | Crear un producto | 201 |
| GET | `/productos` | Listar todos los productos | 200 |
| GET | `/productos/<id>` | Obtener un producto | 200 |
| PUT | `/productos/<id>` | Actualizar un producto (se envían todos los campos) | 200 |
| DELETE | `/productos/<id>` | Eliminar un producto | 204 |

Errores: `400` (datos inválidos), `404` (el producto no existe) y `500` (error interno).

Ejemplo de respuesta `400`:

```json
{
  "error": "Datos inválidos",
  "detalles": { "precio": "El precio debe ser mayor a 0" }
}
```

## Reglas de validación

| Campo | Regla |
|---|---|
| `nombre` | Obligatorio, mínimo 3 caracteres |
| `descripcion` | Opcional |
| `precio` | Obligatorio, número mayor a 0 (se redondea a 2 decimales) |
| `stock` | Obligatorio, entero mayor o igual a 0 |
| `categoria` | Obligatoria |
| `id`, `fecha_creacion` | Generados automáticamente |

La validación se hace en el frontend (respuesta inmediata) y también en el backend (validación definitiva).

## Decisiones técnicas

- **Flask + sqlite3:** se eligió un stack simple para mantener el código claro y explícito, sin ORM.
- **Capas en el backend:** las rutas solo manejan HTTP, los servicios contienen la lógica y el acceso a datos, y los errores se traducen a códigos HTTP en un único lugar.
- **CORS:** el backend solo permite peticiones desde `http://localhost:5173` y `http://127.0.0.1:5173`.
- **Componentes reutilizables:** un único `FormularioProducto` sirve para crear y para editar.