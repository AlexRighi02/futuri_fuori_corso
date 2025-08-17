import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Risultati.css';  // Import the custom CSS

const Risultati = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/risultati")
            .then((res) => {
                if (!res.ok) throw new Error("Errore nel recupero dei risultati");
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-4">Caricamento...</p>;
    if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
    if (!data.data || !data.data.partite || data.data.partite.length === 0)
        return <p className="text-center mt-4">Nessun risultato disponibile</p>;

    return (
        <div className="results-container">
            <h2 className="section-title">Risultati</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="mySwiper"
            >
                {data.data.partite.map((partita, index) => (
                    <SwiperSlide key={index}>
                        <div className="result-card">
                            <div className="team-info">
                                <img
                                    src={partita.squadre[0].logo}
                                    alt={partita.squadre[0].nome}
                                    className="team-logo"
                                />
                                <span className="team-name">{partita.squadre[0].nome}</span>
                            </div>

                            <div className="score">
                                <span className="score-text">{partita.risultato}</span>
                                <div className="match-time">
                                    {partita.data} - {partita.ora}
                                </div>
                            </div>

                            <div className="team-info right">
                                {partita.data !== "RIPOSA" ? (
                                    <>
                                        <span className="team-name">{partita.squadre[1].nome}</span>
                                        <img
                                            src={partita.squadre[1].logo}
                                            alt={partita.squadre[1].nome}
                                            className="team-logo"
                                        />
                                    </>
                                ) : (
                                    <span className="team-name no-match">RIPOSA</span>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Risultati;
