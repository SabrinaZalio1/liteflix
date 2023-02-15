import React, { useEffect, useState } from 'react';
import LargeButton from './LargeButton'


export default function AddMovieModal() {

    const [loadedImg, setLoadedImg] = useState('')

    const onImgChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
            e.preventDefault();
            setLoadedImg(e.target.result as string)
        }

    }
    const [showElement, setShowElement] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowElement(false);
        }, 6000);
    }, []);

    const [movieText, setmovieText] = useState('');

    const handleChange = (e) => {
        setmovieText(e.target.value);
    };

    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = () => {

        if (loadedImg.length > 0 && movieText.length > 0) {
            const movie = {
                image: loadedImg,
                title: movieText
            }
            localStorage.setItem('myMovies', JSON.stringify(movie))
        }
    };

    useEffect(() => {
        const upload = localStorage.getItem('myMovies')
    }, [])

    return (
        <div className='c-modal'>
            <button className='c-modal__button  d-flex align-items-center' type="button" data-toggle="modal" data-target="#exampleModalCenter">
                <i className={`material-symbols-outlined c-white`}>add</i>
                <span className='c-modal__button-text'>agregar pelicula</span>
            </button>

            <div className="c-modal__background modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="c-modal__container modal-content d-flex justify-content-around text-center">
                        <button className='c-modal__closing-tag close' type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className='c-modal__title '>agregar pelicula</h3>
                        {
                            loadedImg ?
                                showElement ?
                                    (<div className='c-modal__loading-container mx-auto w-75'>
                                        <span className='c-modal__loading-title d-block text-left'>cargando 40%</span>
                                        <div className="progress my-3">
                                            <div className="progress-bar" role="progressbar" style={{ width: "40%", backgroundColor: ' #64EEBC' }} ></div>
                                        </div>
                                        <span className='c-modal__cancel-text d-block text-right'>cancelar</span>
                                    </div>)
                                    : (<div className='c-modal__loading-container mx-auto w-75'>
                                        <span className='c-modal__loading-title d-block text-left'>cargando 100%</span>
                                        <div className="progress my-3">
                                            <div className="progress-bar" role="progressbar" style={{ width: "100%", backgroundColor: ' #64EEBC' }} ></div>
                                        </div>
                                        <span className='c-modal__done-text d-block text-right'>listo!</span>
                                    </div>)
                                :
                                <div className='c-modal__drop-file-container d-flex align-items-center justify-content-center'>
                                    <i className="material-symbols-outlined c-modal__clip-icon c-white">attach_file </i>
                                    <label htmlFor="file" className="c-modal__drop-file-text">agrega un archivo o arrastralo y soltalo aqui</label>
                                    <input id='file' className='c-modal__drop-file-section' type="file" accept='image/*' multiple onChange={e => onImgChange(e)} />
                                </div>
                        }
                        <div>
                            <input type="text" className='c-modal__movie-title-section' placeholder='titulo' onChange={handleChange} />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <LargeButton text='ir a home' color='c-large-button--white' className={`d-none`} />
                            <LargeButton text='subir pelicula' color='c-large-button--white' onClick={() => handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
