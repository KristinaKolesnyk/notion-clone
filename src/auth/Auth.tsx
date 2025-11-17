import {useState} from "react"
import type {FormEvent} from "react"
import {useAuthSession} from "./AuthSessionContext"
import {Navigate} from "react-router-dom"
import styles from "./Auth.module.css";
import {supabase} from "../supabaseClient"


export const Auth = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const {session} = useAuthSession()

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setLoading(true)
            const {error} = await supabase.auth.signInWithOtp({email})
            if (error) throw error
            alert("Check your email for the magic link ✉️");
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    if (session) {
        return <Navigate to="/"/>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.logoRow}>
                    <div className={styles.logoIcon}>💡</div>
                    <h1 className={styles.logo}>IdeaNest</h1>
                </div>
                <p className={styles.tagline}>
                    Your mind is full. Put it on the page.
                </p>
                {loading ? ("Sending magic link...") : (
                    <form onSubmit={handleLogin}>
                        <div className={styles.labelRow}>
                            <span className={styles.label}>Email</span>
                            <div className={styles.inputRow}>
                                <input
                                    className={styles.input}
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                />
                                <button className={styles.button} type="submit">
                                    Send magic link
                                </button>
                            </div>
                        </div>
                        <p className={styles.helper}>
                            No password needed. We’ll send a one-time link to your inbox.
                        </p>
                    </form>
                )}
                <p className={styles.footer}>
                    Built by Kristina, for messy, brilliant ideas.
                </p>
            </div>
        </div>
    )

}