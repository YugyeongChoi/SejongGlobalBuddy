import React, {useState} from 'react';
import './Main.css';
import {Link} from "react-router-dom";

function ImageSwitcher() {
    const initialImages = [
        {id: 2, src: '/images/group2.jpg', alt: 'Image 2'},
        {id: 3, src: '/images/group3.jpg', alt: 'Image 3'},
        {id: 4, src: '/images/group4.jpg', alt: 'Image 4'},
        {id: 5, src: '/images/group5.JPG', alt: 'Image 5'},
    ];

    const [mainImage, setMainImage] = useState({
        id: 1,
        src: '/images/group1.jpg',
        alt: 'Main Image',
    });

    const [thumbnails, setThumbnails] = useState(initialImages);

    const handleThumbnailClick = (clickedImage, index) => {
        const newThumbnails = [...thumbnails];
        newThumbnails[index] = mainImage;
        setMainImage(clickedImage);
        setThumbnails(newThumbnails);
    };

    return (
        <div className="main-container">
            <div className="left">
                <img
                    src={mainImage.src}
                    alt={mainImage.alt}
                    className="main-image"
                />
            </div>

            <div className="right">
                <div className="thumbnail-container">
                    {thumbnails.map((img, idx) => (
                        <img
                            key={img.id}
                            src={img.src}
                            alt={img.alt}
                            className="thumbnail"
                            onClick={() => handleThumbnailClick(img, idx)}
                        />
                    ))}
                </div>

                <p className="description">
                    세종대학교 글로벌버디는 대외협력처 SOS 센터 산하 봉사단체로, 외국인 교환학생의 학교 생활과 한국 적응을 돕고 있습니다.
                    공식행사, 먼슬리버디, 소모임 등의 다양한 교류 활동으로 특별한 대학생활을 만들어갑니다.
                </p>

                <Link to="/team" className="cta-button">
                    팀 별 소개
                </Link>

            </div>

        </div>
    );
}

export default ImageSwitcher;