import styles from "./productStyles.module.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { Field } from "../field/field";

function Product() {
    const URLApi = "http://localhost:5278/api/product";
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const handleName = ({ target: { value } }) => setName(value);
    const handleDescription = ({ target: { value } }) => setDescription(value);
    const handleCategory = ({ target: { value } }) => setCategory(value);
    const handleImage = ({ target: { value } }) => setImage(value);
    const handleStock = ({ target: { value } }) => setStock(value);
    const handlePrice = ({ target: { value } }) => setPrice(value);

    const sendData = async (e) => {
        e.preventDefault();
        const body = {
            name: name,
            description: description,
            category: category,
            image: image,
            stock: stock,
            price: price,
        };

        var data = new FormData();
        data.append("name", name);
        data.append("description", description);
        data.append("category", category);
        data.append("URLImage", "URLImage");
        data.append("stock", stock);
        data.append("price", price);
        data.append("ImageFile", file);
        console.log("Se llena", data);

        const sendBody = JSON.stringify(body);
        await axios
            .post(URLApi, data)
            .then((resonse) => {
                console.log("Guardo");
            })
            .catch((error) => {
                console.log(error);
            });

        setModalOpen((prev) => !prev);
    };

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    return (
        <div className={styles.container}>
            <h2 className="text-center">Registro Producto</h2>
            <form onSubmit={sendData} className="form-control">
                <div className={styles.container_fields}>
                    <Field
                        valueField={name}
                        setValueField={setName}
                        placeholder={"Digite nombre del estudiante..."}
                        label={"Nombre:"}
                        type={"text"}
                    />
                    <Field
                        valueField={description}
                        setValueField={setDescription}
                        placeholder={"Digite description del estudiante..."}
                        label={"Descripción:"}
                        type={"text"}
                    />
                    <Field
                        valueField={category}
                        setValueField={setCategory}
                        placeholder={"Digite description del estudiante..."}
                        label={"Categoria:"}
                        type={"text"}
                    />
                    <Field
                        valueField={stock}
                        setValueField={setStock}
                        placeholder={"Digite description del estudiante..."}
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
                </div>
                <div className={styles.btn_container}>
                    <button type="submit" className="btn btn-sucess">
                        Registrar
                    </button>
                </div>
            </form>

            <Modal isOpen={modalOpen} contentLabel="Example Modal">
                <div className="modalBackground">
                    <div className="modalContainer">
                        <div className="titleCloseBtn"></div>
                        <div className="title">
                            <h1>Información de Registro</h1>
                        </div>
                        <div className="body">
                            <p>Registro exitoso!</p>
                        </div>
                        <div className="footer">
                            <Link to="/listadoProductos" onClick={() => setModalOpen(false)}>
                                <button>Continuar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export { Product };
