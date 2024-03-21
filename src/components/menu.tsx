import styles from "./menu.module.css";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <div style={{ textAlign: "center" }}>Menu</div>
      <div className={`${styles["section-header"]} ${styles.grid}`}>
        <div style={{ gridColumn: 1, gridRow: 1 }}>Apps</div>
        <div style={{ textAlign: "right", gridColumn: 2, gridRow: 1 }}>
          Total:
          <span style={{ color: "green" }}>$.$$</span>
        </div>
      </div>
      <div className={styles["section-content"]}>
        <ul className={styles["menu-ul"]}>
          <li>Item</li>
          <li>Item</li>
          <li>Item</li>
        </ul>
      </div>
      <div className={styles["section-header"]}>Meals</div>
      <div className={styles["section-content"]}>
        <ul className={styles["menu-ul"]}>
          <li>Item</li>
        </ul>
      </div>
      <div className={styles["section-header"]}>Drinks</div>
      <div className={styles["section-content"]}>
        <ul className={styles["menu-ul"]}>
          <li>Item</li>
          <li>Item</li>
        </ul>
      </div>
      <div className={styles["section-header"]}></div>
      <div className={styles.grid}>
        <div style={{ textAlign: "center", padding: "5px 0" }}>
          Thanks for your order
        </div>
        <div style={{ textAlign: "right" }}>
          <button className={styles["submit-order-button"]}>Submit</button>
        </div>
      </div>
    </div>
  );
}
