import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Student Portal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href={"/"}>Student-Portal</Link>
        </h1>

        <Link href={"/register"}>
          <p className={styles.description}>Get started by Registering</p>
        </Link>

        <div className={styles.grid}>
          <Link href={"/admin"} className={styles.card}>
            <h2>Admin Access &rarr;</h2>
            <p>Get access of all students data</p>
          </Link>

          <Link href={"/dashboard"} className={styles.card}>
            <h2>dashboard Access &rarr;</h2>
            <p>Click here to view all students data</p>
          </Link>

          <Link href={"/login"} className={styles.card}>
            <h2>Already an User of student-portal &rarr;</h2>
            <p>Login to existing account</p>
          </Link>

          <Link href={"/register"} className={styles.card}>
            <h2>New to student-portal &rarr;</h2>
            <p>Create a new Account</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
