import styles from "./productStyles.module.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";

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
        <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Registro Producto</h2>
            <form onSubmit={sendData} className="form-control">
                <div className="col-md-6 offset-md-3">
                    <h3 className="text-center">Nombre:</h3>
                    <input
                        required
                        value={name}
                        onChange={handleName}
                        className="form-control"
                        type="text"
                        placeholder="Digite nombre del estudiante..."
                    />
                    <h3 className="text-center">Descripción:</h3>
                    <input
                        required
                        value={description}
                        onChange={handleDescription}
                        className="form-control"
                        type="text"
                        placeholder="Digite apellido del estudiante..."
                    />
                    <h3 className="text-center">Categoria:</h3>
                    <input
                        required
                        value={category}
                        onChange={handleCategory}
                        className="form-control"
                        type="text"
                        placeholder="Digite código del estudiante..."
                    />
                    <h3 className="text-center">Stock:</h3>
                    <input
                        required
                        value={stock}
                        onChange={handleStock}
                        className="form-control"
                        type="number"
                        placeholder="Digite cédula del estudiante..."
                    />
                    <h3 className="text-center">Precio:</h3>
                    <input
                        required
                        value={price}
                        onChange={handlePrice}
                        className="form-control"
                        type="number"
                        placeholder="Digite cédula del estudiante..."
                    />
                    <h3 className="text-center">Adjuntar Imagen:</h3>
                    <input required type="file" onChange={saveFile} />
                </div>
                <button type="submit" className="btn btn-sucess">
                    Registrar
                </button>
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
