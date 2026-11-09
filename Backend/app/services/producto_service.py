from app.database import conectar
from app.models import Producto
from app.services.validaciones import validar_producto


class ProductoNoEncontrado(Exception):
    pass


def crear_producto(datos):
    datos = validar_producto(datos)
    with conectar() as conn:
        cursor = conn.execute(
            """
            INSERT INTO productos (nombre, descripcion, precio, stock, categoria)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                datos["nombre"],
                datos["descripcion"],
                datos["precio"],
                datos["stock"],
                datos["categoria"],
            ),
        )
        fila = conn.execute(
            "SELECT * FROM productos WHERE id = ?", (cursor.lastrowid,)
        ).fetchone()
    return Producto.desde_fila(fila)


def listar_productos():
    with conectar() as conn:
        filas = conn.execute("SELECT * FROM productos ORDER BY id").fetchall()
    return [Producto.desde_fila(fila) for fila in filas]


def obtener_producto(producto_id):
    with conectar() as conn:
        fila = conn.execute(
            "SELECT * FROM productos WHERE id = ?", (producto_id,)
        ).fetchone()
    if fila is None:
        raise ProductoNoEncontrado(f"No existe un producto con id {producto_id}")
    return Producto.desde_fila(fila)

def actualizar_producto(producto_id, datos):
    datos = validar_producto(datos)
    with conectar() as conn:
        cursor = conn.execute(
            """
            UPDATE productos
            SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?
            WHERE id = ?
            """,
            (
                datos["nombre"],
                datos["descripcion"],
                datos["precio"],
                datos["stock"],
                datos["categoria"],
                producto_id,
            ),
        )
        if cursor.rowcount == 0:
            raise ProductoNoEncontrado(f"No existe un producto con id {producto_id}")
        fila = conn.execute(
            "SELECT * FROM productos WHERE id = ?", (producto_id,)
        ).fetchone()
    return Producto.desde_fila(fila)

def eliminar_producto(producto_id):
    with conectar() as conn:
        cursor = conn.execute(
            "DELETE FROM productos WHERE id = ?", (producto_id,)
        )
        if cursor.rowcount == 0:
            raise ProductoNoEncontrado(f"No existe un producto con id {producto_id}")

