import { useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // State to manage the anchor element for Popover
  const [openPopover, setOpenPopover] = useState<boolean>(false); // State to manage the visibility of the Popover

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Set the anchor element when the table is clicked
    setOpenPopover(true); // Open the Popover
  };

  const handleClosePopover = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent event propagation to prevent Popover from reopening
    setOpenPopover(false); // Close the Popover
  };
  // return (
  //   <div className={styles.menu}>
  //     <div style={{ textAlign: "center" }}>Menu</div>
  //     <div className={`${styles["section-header"]} ${styles.grid}`}>
  //       <div style={{ gridColumn: 1, gridRow: 1 }}>Apps</div>
  //       <div style={{ textAlign: "right", gridColumn: 2, gridRow: 1 }}>
  //         Total:
  //         <span style={{ color: "green" }}>$.$$</span>
  //       </div>
  //     </div>
  //     <div className={styles["section-content"]}>
  //       <ul className={styles["menu-ul"]}>
  //         <li>Item</li>
  //         <li>Item</li>
  //         <li>Item</li>
  //       </ul>
  //     </div>
  //     <div className={styles["section-header"]}>Meals</div>
  //     <div className={styles["section-content"]}>
  //       <ul className={styles["menu-ul"]}>
  //         <li>Item</li>
  //       </ul>
  //     </div>
  //     <div className={styles["section-header"]}>Drinks</div>
  //     <div className={styles["section-content"]}>
  //       <ul className={styles["menu-ul"]}>
  //         <li>Item</li>
  //         <li>Item</li>
  //       </ul>
  //     </div>
  //     <div className={styles["section-header"]}></div>
  //     <div className={styles.grid}>
  //       <div style={{ textAlign: "center", padding: "5px 0" }}>
  //         Thanks for your order
  //       </div>
  //       <div style={{ textAlign: "right" }}>
  //         <button className={styles["submit-order-button"]}>Submit</button>
  //       </div>
  //     </div>
  //   </div>
  // );
  return <></>;
}
