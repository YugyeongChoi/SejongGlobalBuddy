import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../pages/Main/MainPage.css';
import { Link } from 'react-router-dom';

const R2_BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

function ImageSwitcher() {
    const [mainImage, setMainImage] = useState(null);
    const [thumbnails, setThumbnails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get('/api/files');
                const files = Array.isArray(res.data) ? res.data : [];

                const groupImages = files
                    .filter(f => /^group[1-9]\.(jpg|jpeg|png)$/i.test(f))
                    .sort((a, b) => {
                        const numA = parseInt(a.match(/group(\d+)/i)?.[1], 10);
                        const numB = parseInt(b.match(/group(\d+)/i)?.[1], 10);
                        return numA - numB;
                    });

                const [main, ...thumbs] = groupImages;

                const mainObj = {
                    id: 1,
                    src: `${R2_BASE_URL}/${encodeURIComponent(main)}`,
                    alt: 'MainPage Image',
                    name: main,
                };

                const thumbObjs = thumbs.map((file, idx) => ({
                    id: idx + 2,
                    src: `${R2_BASE_URL}/${encodeURIComponent(file)}`,
                    alt: `Image ${idx + 2}`,
                    name: file,
                }));

                setMainImage(mainObj);
                setThumbnails(thumbObjs);
            } catch (err) {
                console.error('이미지 불러오기 실패:', err);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        const preload = (url) => {
            const img = new Image();
            img.src = url;
        };
        thumbnails.forEach(img => preload(img.src));
    }, [thumbnails]);

    const handleThumbnailClick = (clickedImage, index) => {
        const preloadMain = new Image();
        preloadMain.src = clickedImage.src;

        setThumbnails(prev => {
            const updated = [...prev];
            updated[index] = mainImage;
            return updated;
        });
        setMainImage(clickedImage);
    };

    if (!mainImage) return null;

    return (
        <div className="main-container">
            <div className="left">
                <img
                    src={mainImage.src}
                    alt={mainImage.alt}
                    className={`main-image ${loading ? 'loading' : ''}`}
                    onLoad={() => setLoading(false)}
                    onContextMenu={(e) => e.preventDefault()}
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
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    ))}
                </div>

                <p className="description">
                    세종대학교 글로벌버디는 대외협력처 SOS 센터 산하 봉사단체로, 외국인 교환학생의 학교 생활과 한국 적응을 돕고 있습니다.
                    공식행사, 먼슬리버디, 소모임 등의 다양한 교류 활동으로 특별한 대학생활을 만들어갑니다.
                </p>

                <Link to="/review" className="cta-button">
                    후기 보러가기
                </Link>
            </div>
        </div>
    );
}

export default ImageSwitcher;
