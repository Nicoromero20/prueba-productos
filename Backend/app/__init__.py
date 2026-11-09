from flask import Flask
from flask_cors import CORS

from app.database import init_db
from app.errors import registrar_errores
from app.routes import productos_bp


def create_app():
    app = Flask(__name__)

    CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

    init_db()

    app.register_blueprint(productos_bp)
    registrar_errores(app)

    @app.get("/")
    def raiz():
        return {"mensaje": "API funcionando"}

    return app
