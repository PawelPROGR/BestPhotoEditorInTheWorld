import './MainPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Scrollbar } from "react-scrollbars-custom";
import { useNavigate } from 'react-router-dom';
import Image from './ImageFromPCs'
// import 'reactjs-popup/dist/index.css';
axios.defaults.baseURL = 'http://192.168.56.1:5000/api';

const MainPage = () => {
    const [returnedData, setReturnedData] = useState([]);
    const navigate = useNavigate();
    const [imageList, setImageList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [viewPhoto, setViewPhoto] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`/photos/get_all_photos`, {
                headers: {
                    'Content-type': 'Application/json',
                    'Accept': 'Application/json',
                },
                data: {

                }
            }).then(console.log('Успешно')).catch((error) => {
                console.log(error.message);
            });
            setReturnedData(data.data.xt)
            console.log(data.data.xt[0].description)
        }
        fetchData();
        // setData();
        // console.log(1)
    }, []);

    // const setData = async () => {
    //     const data = await axios.post(`/photos/get_all_photos`, {
    //         headers: {
    //             'Content-type': 'Application/json',
    //             'Accept': 'Application/json',
    //         },
    //         data: {

    //         }
    //     }).then(console.log('Успешно')).catch((error) => {
    //         console.log(error.message);
    //     });
    //     setReturnedData(data.data.xt)
    //     console.log(data.data.xt[0])
    // }

    const clickbutton = (i) => {
        navigate('/times', { state: { id: i, data: returnedData[i] } })
    }

    // const contentStyle = {
    //     maxWidth: "600px",
    //     width: "90%"
    //   };

    return (
        <div className="container">
            <Scrollbar style={{ width: '98%', height: '100%', color: '#393e4b' }}>
                <div className="scrollbarRow">
                    {/* <button type="button" title='button' onClick={clickbutton} className="btn">Добавить фото</button> */}
                    <Image
                        viewPhoto={viewPhoto}
                        // addOrEdit={addOrEdit}
                        recordForEdit={recordForEdit}
                        page={"Main"}
                    />
                    {
                        returnedData.map((data, i) => (
                            <div key={i} className="blockScreenMiniPhoto">
                                <img className="card-img-top" src={data.image} alt="Card image cap" />
                                <div className="description">{data.description}</div>
                                <button type="button" title='button' id="openPhotoBtn" onClick={() => clickbutton(i)} className="btn">Открыть</button>
                            </div>
                        ))
                    }
                </div>
            </Scrollbar>
        </div>
    );
}

export default MainPage;