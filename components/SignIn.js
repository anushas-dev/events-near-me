import styles from '../styles/components/SignIn.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useProviderLink, useSignInEmailPassword } from '@nhost/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import Input from './Input'
import Spinner from './Spinner'
import githubLogo from '../public/github.svg'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const { signInEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
    useSignInEmailPassword()

  const { github, google } = useProviderLink()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    await signInEmailPassword(email, password)
  }

  if (isSuccess) {
    router.push('/')
    return null
  }

  const disableForm = isLoading || needsEmailVerification

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles['logo-wrapper']}>
          <Image src="/events.png" alt="logo" height={100} width={100} objectFit="contain" />
        </div>

        {needsEmailVerification ? (
          <p className={styles['verification-text']}>
            Please check your mailbox and follow the verification link to verify your email.
          </p>
        ) : (
          <>
            <form onSubmit={handleOnSubmit} className={styles.form}>
              <Input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disableForm}
                required
              />
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disableForm}
                required
              />

              <button type="submit" disabled={disableForm} className={styles.button}>
                {isLoading ? <Spinner size="sm" /> : 'Sign in'}
              </button>

              {isError ? <p className={styles['error-text']}>{error?.message}</p> : null}
            </form>
          </>
        )}
      </div>
      <br></br>

      <div className={styles.github}>
        <a
          href={github}
          className="flex items-center justify-center space-x-2 rounded-md border border-opacity-50 px-6 py-2 hover:bg-gray-50"
        >
          <Image src={githubLogo} alt="Github" width={32} height={32} />
          <span>Sign in with Github</span>
        </a>
        <p className={styles.text}>
          No account yet?{' '}
          <Link href="/sign-up">
            <a className={styles.link}>Sign up</a>
          </Link>
        </p>
      </div>

    </div>
  )
}

export default SignIn