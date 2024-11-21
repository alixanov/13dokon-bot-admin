import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './card.css';
import { IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./card.css"

const Card = () => {
     const [data, setData] = useState([]);
     const [deleteState, setDeleteState] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [editProduct, setEditProduct] = useState(null);
     const [openEditModal, setOpenEditModal] = useState(false);

     useEffect(() => {
          axios
               .get('https://13dokon-bot-server.vercel.app/api/getall')
               .then((response) => setData(response.data))
               .catch((error) => console.error('Ошибка при получении данных:', error));
     }, [deleteState]);

     const handleDelete = (id) => {
          setIsLoading(true);
          axios
               .delete(`https://13dokon-bot-server.vercel.app/api/delete/${id}`)
               .then(() => {
                    setIsLoading(false);
                    setDeleteState((prev) => !prev);
               })
               .catch((error) => {
                    console.error('Ошибка при удалении продукта:', error);
                    setIsLoading(false);
               });
     };

     const handleEdit = (product) => {
          setEditProduct(product);
          setOpenEditModal(true);
     };

     const handleCloseEditModal = () => setOpenEditModal(false);

     const handleUpdate = (updatedProduct) => {
          axios
               .put(`https://13dokon-bot-server.vercel.app/api/update/${editProduct._id}`, updatedProduct)
               .then(() => {
                    setOpenEditModal(false);
                    setDeleteState((prev) => !prev);
               })
               .catch((error) => console.error('Ошибка при обновлении продукта:', error));
     };

     return (
          <div className="card-container">
               {data.map((item, index) => (
                    <div className="card-box" key={index}>
                         <img src={item.rasm} alt={item.nomi} className="card-image" />
                         <div className="card-details">
                              <h3 className="card-title">{item.nomi}</h3>
                              <p className="card-info">{item.malumoti}</p>
                              <div className="card-meta">
                                   <span>{item.soni} шт.</span>
                                   <span>{item.turi}</span>
                              </div>
                              <div className="card-price">
                                   <span>{item.narxi} LTC</span>
                                   <span>{item.ton} ТОН</span>
                              </div>
                         </div>
                         <div className="card-actions">
                              <IconButton
                                   onClick={() => handleDelete(item._id)}
                                   color="error"
                                   disabled={isLoading}
                              >
                                   {isLoading ? <CircularProgress size={20} /> : <DeleteIcon />}
                              </IconButton>
                              <IconButton onClick={() => handleEdit(item)} color="primary">
                                   <EditIcon />
                              </IconButton>
                         </div>
                    </div>
               ))}

               {/* Modal */}
               {openEditModal && (
                    <div className="modal">
                         <div className="modal-content">
                              <span className="close" onClick={handleCloseEditModal}>
                                   &times;
                              </span>
                              <form
                                   onSubmit={(e) => {
                                        e.preventDefault();
                                        const updatedProduct = {
                                             rasm: e.target.rasm.value,
                                             nomi: e.target.nomi.value,
                                             soni: e.target.soni.value,
                                             narxi: e.target.narxi.value,
                                             malumoti: e.target.malumoti.value,
                                             turi: e.target.turi.value,
                                             ton: e.target.ton.value,
                                        };
                                        handleUpdate(updatedProduct);
                                   }}
                                   className="modal__form"
                              >
                                   <input type="text" name="rasm" placeholder="URL изображения" defaultValue={editProduct?.rasm || ''} />
                                   <input type="text" name="nomi" placeholder="Название" defaultValue={editProduct?.nomi || ''} />
                                   <input type="text" name="malumoti" placeholder="Информация" defaultValue={editProduct?.malumoti || ''} />
                                   <input type="text" name="turi" placeholder="Тип" defaultValue={editProduct?.turi || ''} />
                                   <input type="number" name="soni" placeholder="Количество" defaultValue={editProduct?.soni || ''} />
                                   <input type="text" name="narxi" placeholder="Цена" defaultValue={editProduct?.narxi || ''} />
                                   <input type="text" name="ton" placeholder="Тон-цена" defaultValue={editProduct?.ton || ''} />
                                   <button type="submit" className="modal-btn">
                                        Сохранить 
                                   </button>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default Card;
