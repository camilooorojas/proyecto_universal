import { Link } from "react-router-dom";
import styles from './navBarStyles.module.css'

function NavBar() {
    return (
        <div className={`d-flex align-items-center justify-content-between ${styles.navBar} `}>
            <ul className={styles.menu__elements}>
                <li className="nav-item active">
                    <Link to="/crearProducto"> Crear Producto </Link>
                </li>
                <li className="nav-item active">
                    <Link to="/listadoProductos"> Listado Producto </Link>
                </li>
            </ul>
        </div>
    );
}
export { NavBar }