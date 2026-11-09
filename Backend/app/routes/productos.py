from flask import Blueprint, jsonify, request

from app.services import producto_service

productos_bp = Blueprint("productos", __name__, url_prefix="/productos")


@productos_bp.post("")
def crear():
    datos = request.get_json(silent=True)
    producto = producto_service.crear_producto(datos)
    return jsonify(producto.to_dict()), 201

@productos_bp.get("")
def listar():
    productos = producto_service.listar_productos()
    return jsonify([p.to_dict() for p in productos]), 200

@productos_bp.get("/<int:producto_id>")
def obtener(producto_id):
    producto = producto_service.obtener_producto(producto_id)
    return jsonify(producto.to_dict()), 200

@productos_bp.put("/<int:producto_id>")
def actualizar(producto_id):
    datos = request.get_json(silent=True)
    producto = producto_service.actualizar_producto(producto_id, datos)
    return jsonify(producto.to_dict()), 200

@productos_bp.delete("/<int:producto_id>")
def eliminar(producto_id):
    producto_service.eliminar_producto(producto_id)
    return "", 204