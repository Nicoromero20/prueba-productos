function ModalConfirmacion({
  titulo,
  texto,
  textoConfirmar,
  onConfirmar,
  onCancelar,
  procesando = false,
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          background: "white",
          color: "#222",
          padding: "1.5rem",
          borderRadius: "8px",
          maxWidth: "400px",
        }}
      >
        <h2>{titulo}</h2>
        <p>{texto}</p>
        <button onClick={onCancelar} disabled={procesando}>
          Cancelar
        </button>{" "}
        <button onClick={onConfirmar} disabled={procesando}>
          {procesando ? "Procesando..." : textoConfirmar}
        </button>
      </div>
    </div>
  );
}

export default ModalConfirmacion;