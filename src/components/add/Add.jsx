import React from 'react';
import { useForm } from 'react-hook-form';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from 'axios';
import './add.css';

const Add = ({ onClose }) => {
     const { register, handleSubmit } = useForm();

     const notyf = new Notyf({
          position: {
               x: 'center',
               y: 'top',
          }
     });

     const addData = (data) => {
          axios.post('https://13dokon-bot-server.vercel.app/api/add', data)
               .then(response => {
                    notyf.success("Успешно");
                    onClose();
               })
               .catch(error => {
                    console.error(error);
                    notyf.error("Ошибка при отправке данных");
               });
     };

     return (
          <div className='modal'>
               <div className="modal-content">
                    <span className='close' onClick={onClose}>
                         &times;
                    </span>
                    <form onSubmit={handleSubmit(addData)} className='modal__form'>
                         <input type="text" name="rasm" placeholder='Url-картинка' {...register("rasm", { required: true })} />
                         <input type="text" name="nomi" placeholder='Названия' {...register("nomi", { required: true })} />
                         <input type="text" name="malumoti" placeholder='Описания' {...register("malumoti", { required: true })} />
                         <input type="text" name="turi" placeholder='Категория' {...register("turi", { required: true })} />
                         <input type="text" name="location" placeholder='Город' {...register("location", { required: true })} />
                         <input type="number" name="soni" placeholder='Количество' {...register("soni", { required: true })} />
                         <input type="text" name="narxi" placeholder='Цена в LTC' {...register("narxi", { required: true })} />
                         <input type="text" name="ton" placeholder='Цена в TON' {...register("ton",{ required: true })} />

                         <button type="submit">Отправить данные</button>
                    </form>
               </div>
          </div>
     );
}

export default Add;