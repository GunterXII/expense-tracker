function NotFound(){
  // oggetti stile inline
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",            // si adatta verticalmente
      padding: "28px 18px",
      boxSizing: "border-box",
      textAlign: "center",
      background: "linear-gradient(180deg,#f6f8fb,#ffffff)", // sfondo leggero
      fontFamily:
        'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: "#0f172a",
    },
    title: {
      margin: 0,
      fontWeight: 800,
      // dimensione reattiva: minimo 1.75rem, ideale 4vw, massimo 2.5rem
      fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
      letterSpacing: "-0.5px",
    },
    message: {
      marginTop: "12px",
      color: "#6b7280",
      fontSize: "clamp(1rem, 2.2vw, 1.125rem)",
      maxWidth: "780px",
      lineHeight: 1.5,
    },
    hint: {
      marginTop: "16px",
      color: "#9aa3b2",
      fontSize: "0.95rem",
    },
    // piccolo badge / codice (opzionale)
    code: {
      marginTop: "14px",
      padding: "6px 10px",
      borderRadius: "8px",
      background: "rgba(15,23,42,0.04)",
      color: "#0f172a",
      fontWeight: 700,
      fontSize: "0.95rem",
    }
  };

  return(
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>404 — Pagina non trovata</h1>
        <p style={styles.message}>La pagina che stai cercando non esiste o è stata spostata.</p>
        <div style={styles.hint}>Controlla l'URL o torna alla pagina principale.</div>
        <div style={styles.code}>Errore 404</div>
      </div>
    </>
  )
}
export default NotFound;
