from dataclasses import dataclass, asdict
from typing import Optional


@dataclass
class Producto:
    id: Optional[int]
    nombre: str
    descripcion: Optional[str]
    precio: float
    stock: int
    categoria: str
    fecha_creacion: Optional[str] = None

    @classmethod
    def desde_fila(cls, fila):
        return cls(**dict(fila))

    def to_dict(self):
        return asdict(self)