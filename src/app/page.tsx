import styles from "./page.module.css";
import MultiSelect from "@/components/multiSelect/MultiSelect";
import HomePage from "@/view/homePage/HomePage";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <HomePage/>
            </main>
        </div>
    );
}
