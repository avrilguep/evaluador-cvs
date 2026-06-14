"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"

export default function EnterPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await fetch("/api/enter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push("/")
      router.refresh()
    } else {
      setError("Contraseña incorrecta")
      setLoading(false)
    }
  }

  return (
    <main className={styles.main}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/fondo-employment.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />

      {/* Texto superior centrado */}
      <p className={styles.subtitle}>
        Plataforma inteligente de reclutamiento con IA
      </p>

      <div className={styles.layout}>
        <div className={styles.leftCol}>

          {/* Bienvenido fuera del card */}
          <h2 className={styles.welcome}>¡BIENVENIDO!</h2>

          {/* Card sin h2 adentro */}
          <div className={styles.card}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>
                Ingresa la contraseña de acceso
              </label>

              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoFocus
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className={styles.eyeBtn}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.05-3.378M6.228 6.228A9.97 9.97 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-4.132 5.411M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading ? "Verificando..." : "Entrar"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  )
}