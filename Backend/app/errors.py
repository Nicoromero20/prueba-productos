from flask import jsonify
from werkzeug.exceptions import HTTPException

from app.services.producto_service import ProductoNoEncontrado
from app.services.validaciones import ErrorValidacion


def registrar_errores(app):
    @app.errorhandler(ErrorValidacion)
    def error_validacion(e):
        return jsonify({"error": "Datos inválidos", "detalles": e.errores}), 400

    @app.errorhandler(ProductoNoEncontrado)
    def no_encontrado(e):
        return jsonify({"error": str(e)}), 404

    @app.errorhandler(HTTPException)
    def error_http(e):
        # 404 de rutas inexistentes, 405 método no permitido, etc.
        return jsonify({"error": e.description}), e.code

    @app.errorhandler(Exception)
    def error_inesperado(e):
        app.logger.exception(e)
        return jsonify({"error": "Error interno del servidor"}), 500