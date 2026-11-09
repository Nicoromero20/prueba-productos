class ErrorValidacion(Exception):
    """Se lanza cuando los datos de entrada no cumplen las reglas."""

    def __init__(self, errores):
        super().__init__("Datos inválidos")
        self.errores = errores  # {"campo": "mensaje"}


def validar_producto(datos):
    if not isinstance(datos, dict):
        raise ErrorValidacion({"cuerpo": "Se esperaba un objeto JSON"})

    errores = {}
    limpio = {}

    nombre = datos.get("nombre")
    if not isinstance(nombre, str) or len(nombre.strip()) < 3:
        errores["nombre"] = "El nombre es obligatorio y debe tener al menos 3 caracteres"
    else:
        limpio["nombre"] = nombre.strip()

    descripcion = datos.get("descripcion")
    if descripcion is None:
        limpio["descripcion"] = None
    elif not isinstance(descripcion, str):
        errores["descripcion"] = "La descripción debe ser texto"
    else:
        limpio["descripcion"] = descripcion.strip() or None

    categoria = datos.get("categoria")
    if not isinstance(categoria, str) or not categoria.strip():
        errores["categoria"] = "La categoría es obligatoria"
    else:
        limpio["categoria"] = categoria.strip()

    precio = datos.get("precio")
    if isinstance(precio, bool) or not isinstance(precio, (int, float)):
        errores["precio"] = "El precio es obligatorio y debe ser un número"
    else:
        precio = round(precio, 2)
        if precio <= 0:
            errores["precio"] = "El precio debe ser mayor a 0"
        else:
            limpio["precio"] = precio

    stock = datos.get("stock")
    if isinstance(stock, bool) or not isinstance(stock, int):
        errores["stock"] = "El stock es obligatorio y debe ser un número entero"
    elif stock < 0:
        errores["stock"] = "El stock no puede ser negativo"
    else:
        limpio["stock"] = stock 

    if errores:
        raise ErrorValidacion(errores)
    return limpio