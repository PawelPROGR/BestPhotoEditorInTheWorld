import React, { useState, useEffect } from "react"
import axios from "axios";
axios.defaults.baseURL = 'http://192.168.56.1:5000/api';

const defaultImageSrc = '/img/img1.png' //изображение по умолчанию

//скомуниздил

export default function Image(props) { //изображение имя


    const { recordForEdit, page, id } = props
    const initialFieldValues = {
        imageID: id,
        description: '',
        imageName: '',
        imageSrc: defaultImageSrc,
        imageFile: null
    }
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit])

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const showPreview = e => { //загрузка изображения и просмотр
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }
    const validate = () => {
        let temp = {}
        temp.description = values.description == "" ? false : true;
        temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }
    const handleFormSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('imageID', values.imageID)
            formData.append('description', values.description)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            // addOrEdit(formData, resetForm)
        }
    }
    const applyErrorClass = field => ((field in errors && errors[field] == false) ? 'invalid-field' : '') //ошибка если не заполнены поля

    const addPhotoInDataBase = async () => {
        // const atobImage = btoa(initialFieldValues.imageFile)
        console.log(values.imageSrc)
        console.log(values.description)

        page === "Photo" ? (
            await axios.patch(`/photos/update_photo`, {
                headers: {
                    'Content-type': 'Application/json',
                    'Accept': 'Application/json',
                },
                data: {
                    oldId: id,
                    id: Math.floor(Math.random() * (100000 - 10 + 1) + 10),
                    imageSrc: values.imageSrc,
                    description: values.description,
                }
            }).then(console.log('Успешно1')).catch((error) => {
                console.log(error.message);
            })
        )
            :
            (
                await axios.post(`/photos/add_photo`, {
                    headers: {
                        'Content-type': 'Application/json',
                        'Accept': 'Application/json',
                    },
                    data: {
                        id: Math.floor(Math.random() * (100000 - 10 + 1) + 10),
                        imageSrc: values.imageSrc,
                        description: values.description,
                    }
                }).then(console.log('Успешно2')).catch((error) => {
                    console.log(error.message);
                })
            )
    }

    return (
        <>
            <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
                <div className="card">
                    <img src={values.imageSrc} className="card-img-top" />
                    <div className="card-body">
                        <div className="form-group">
                            <input type="file" accept="image/*" className={"form-contol-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader" />
                        </div>
                        <div className="form-group">
                            <input className={"form-contol" + applyErrorClass('description')} placeholder="Описание" name="description" value={values.description} onChange={handleInputChange} />
                        </div>

                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-light" onClick={() => addPhotoInDataBase()}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}