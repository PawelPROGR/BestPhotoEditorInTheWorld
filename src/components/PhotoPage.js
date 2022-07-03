import './MainPage.css';
import './PhotoPage.css';
import '../App.css';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import Cropper from 'react-easy-crop'
import axios from 'axios';
import Image from './ImageFromPCs'

axios.defaults.baseURL = 'http://192.168.56.1:5000/api';

const MainPage = (props) => {
    const [returnedData, setReturnedData] = useState([]);
    const location = useLocation();
    const imageElement = React.createRef();

    const [imageList, setImageList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [viewPhoto, setViewPhoto] = useState([])

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])

    useEffect(() => {
        console.log(props)
    }, []);

    const deletePhoto = async (i) => {
        const data = await axios.delete(`/photos/delete_photo`, {
            headers: {
                'Content-type': 'Application/json',
                'Accept': 'Application/json',
            },
            data: {
                id: i
            }
        }).then(console.log('Успешно')).catch((error) => {
            console.log(error.message);
        });
    }

    const EditPhoto = (i) => {
        //
    }

    return (
        <div className="App">
            <div className='logo'>Sputnik<div className="logoPhotoColor">Photo</div></div>
            <div className="container PhotoContainer">
                <div className='photoContainer'>
                    {/* <Cropper
                        image={"data:image/png;base64," + location.state.data.image}
                        crop={crop}
                        zoom={zoom}
                        aspect={3 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        restrictPosition={true}
                        classes={{
                            width: '33%',
                            height: '80%',
                            borderRadius: '32px',
                            objectFit: 'cover',
                            display: 'flex',
                            backgroundColor: 'red'
                        }}
                    /> */}
                    <img ref={imageElement} src={location.state.data.image} alt="Source" crossorigin className='photoPagephoto' />
                    <div className='blockInfoPhoto'>
                        <div className='descriptionPhoto'>{location.state.data.description}</div>
                        <button type="button" title='button3' id="SavePhotoEdit" onClick={() => deletePhoto(location.state.data.id)} className="btn btnblockred">Удалить</button>
                        {/* <button type="button" title='button4' id="SavePhotoEdit" onClick={() => EditPhoto(location.state.data.id)} className="btn btnblock">Редактировать</button> */}
                        Редактировать
                        <Image
                            viewPhoto={viewPhoto}
                            // addOrEdit={addOrEdit}
                            recordForEdit={recordForEdit}
                            page={"Photo"}
                            id={location.state.data.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;