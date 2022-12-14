import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./listProductStyles.module.css";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Field } from "../field/field";

function ListProduct() {
    const URLApi = "http://localhost:5278/api/product";
    const [data, setData] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [dataTemp, setDataTemp] = useState({});
    const [search, setSearch] = useState("");
    const [dropdown, setDropdown] = useState("name");

    const [productId, setProductId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const handleName = ({ target: { value } }) => setName(value);
    const handleDescription = ({ target: { value } }) => setDescription(value);
    const handleCategory = ({ target: { value } }) => setCategory(value);
    const handleImage = ({ target: { value } }) => setImage(value);
    const handleStock = ({ target: { value } }) => setStock(value);
    const handlePrice = ({ target: { value } }) => setPrice(value);

    const requestGetAll = async () => {
        await axios
            .get(URLApi)
            .then((response) => {
                console.log("No me estallo");
                console.log(response.data.obj);
                setData(response.data.obj);
                setDataList(response.data.obj);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        requestGetAll();
    }, []);

    const editModal = (element) => {
        setName(element.name);
        setDescription(element.description);
        setCategory(element.category);
        setStock(element.stock);
        setPrice(element.price);
        setProductId(element.productId);

        setModalOpen((prev) => !prev);
        console.log("element", element);
        console.log("temporal", dataTemp);
    };

    const closedModal = () => {
        console.log("nombre:", name);
        console.log("description:", description);
        console.log("stock:", stock);
        console.log("Price:", price);

        setModalOpen(false);
    };

    const editProduct = async () => {
        var data = new FormData();
        data.append("name", name);
        data.append("description", description);
        data.append("category", category);
        data.append("stock", stock);
        data.append("price", price);
        data.append("ImageFile", file);

        const res = await axios.put(`${URLApi}/${productId}`, data);
        setSearch("");
        setModalOpen(false);
        requestGetAll();
    };

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const deleteModal = async (element) => {
        const res = await axios.delete(
            `${URLApi}/DeleteProduct/${element.productId}`
        );
        requestGetAll();
    };

    const handleChangeFilter = (e) => {
        setSearch(e.target.value);
        filterData(e.target.value);
    };

    var filterData = (textSearch) => {
        var resSearch = data.filter((element) => {
            if (dropdown === "name") {
                if (
                    element.name
                        .toString()
                        .toLowerCase()
                        .includes(textSearch.toLowerCase())
                ) {
                    return element;
                }
            } else if (dropdown === "description") {
                if (
                    element.description
                        .toString()
                        .toLowerCase()
                        .includes(textSearch.toLowerCase())
                ) {
                    return element;
                }
            } else if (dropdown === "category") {
                if (
                    element.category
                        .toString()
                        .toLowerCase()
                        .includes(textSearch.toLowerCase())
                ) {
                    return element;
                }
            }
        });
        console.log("quiero editar", data);
        setDataList(resSearch);
        console.log("edito?", data);
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerInput}>
                <input
                    value={search}
                    className="form-control inputBuscar"
                    placeholder="Buscar por nombre, descripcion o categoria."
                    onChange={handleChangeFilter}
                />
                <select value={dropdown} onChange={(e) => setDropdown(e.target.value)}>
                    <option value="name">Nombre</option>
                    <option value="description">Descripcion</option>
                    <option value="category">Categoria</option>
                </select>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Categoria</th>
                        <th>Imagen</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((element) => (
                        <tr key={element.name}>
                            <td>{element.name}</td>
                            <td>{element.description}</td>
                            <td>{element.category}</td>
                            <td>
                                <img src={element.urlImage} alt="Imagen de producto."></img>
                            </td>
                            <td>{element.stock}</td>
                            <td>{element.price}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => editModal(element)}
                                >
                                    Editar
                                </button>
                                {"  "}
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteModal(element)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalOpen}>
                <div className="modalBackground">
                    <div className="modalContainerField modalContainer">
                        <Field
                            valueField={name}
                            setValueField={setName}
                            placeholder={"Digite nombre del producto..."}
                            label={"Nombre:"}
                            type={"text"}
                        />
                        <Field
                            valueField={description}
                            setValueField={setDescription}
                            placeholder={"Digite descripción del producto..."}
                            label={"Descripción:"}
                            type={"text"}
                        />
                        <Field
                            valueField={category}
                            setValueField={setCategory}
                            placeholder={"Digite categoria del producto..."}
                            label={"Categoria:"}
                            type={"text"}
                        />
                        <Field
                            valueField={stock}
                            setValueField={setStock}
                            placeholder={"Digite stock del producto..."}
                            label={"Stock:"}
                            type={"number"}
                        />
                        <Field
                            valueField={price}
                            setValueField={setPrice}
                            placeholder={"Digite description del estudiante..."}
                            label={"Precio:"}
                            type={"number"}
                        />
                        <div className={styles.input_field}>
                            <label>
                                {" "}
                                Insertar Imagen
                                <input required type="file" onChange={saveFile} />
                            </label>
                        </div>
                        <div className={styles.btn_action}>
                            <button className="btn btn-sucess" onClick={() => editProduct()}>
                                Editar
                            </button>
                            <button className="btn btn-sucess" onClick={() => closedModal()}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export { ListProduct };
