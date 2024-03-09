import styles from "./menu.module.css";

export default function Menu() {

  return (
    <div className="menu">
        <div style="text-align: center;">Menu</div>
        <div className="section-header grid">
            <div style="grid-column: 1; grid-row: 1;">Apps</div>
            <div style="text-align: right; grid-column: 2; grid-row: 1;">
                Total: 
                <span style="color: green;">$.$$</span>
            </div>
        </div>
        <div className="section-content">
            <ul>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
            </ul>
        </div>
        <div className="section-header">Meals</div>
        <div className="section-content">
            <ul>
                <li>Item</li>
            </ul>
        </div>
        <div className="section-header">Drinks</div>
        <div className="section-content">
            <ul>
                <li>Item</li>
                <li>Item</li>
            </ul>
        </div>
        <div className="section-header"></div>
        <div className="grid">
            <div style="text-align: center; padding: 5 0">Thanks for your order</div>
            <div style="text-align: right;">
                <button className="submit-order-button">Submit</button>
            </div>
        </div>
    </div>
  );
}
