import { useEffect, useState } from 'react';
import "./games.css"

export default function Games(props) {

    const [paginaAtual, setPaginaAtual] = useState(1);

    // Renderiza os jogos na p�gina atual
    const jogosAtual = props.jogos.slice(
        (paginaAtual - 1) * 9,
        paginaAtual * 9
    );

    useEffect(() => {
        if (props.jogos.length > 1) {
            document.querySelector(`#slide-${props.jogos[0].id}`).style.width = "100%";
            document.querySelector(`#slide-${props.jogos[1].id}`).style.width = "0%";
            document.querySelector(`#slide-${props.jogos[2].id}`).style.width = "0%";

            let currentSlide = 0;

            function nextSlideX() {
                if (props.currentPage === 'inicio') {
                    currentSlide++;
                    if (currentSlide > 2) {
                        currentSlide = 0;
                    }
                    setTimeout(() => {
                        if (document.querySelector(`#slide-${props.jogos[currentSlide].id}`) === null) {
                        } else {
                            document.querySelector(`#slide-${props.jogos[0].id}`).style.width = "0%";
                            document.querySelector(`#slide-${props.jogos[1].id}`).style.width = "0%";
                            document.querySelector(`#slide-${props.jogos[2].id}`).style.width = "0%";

                            let doc = document.querySelector(`#slide-${props.jogos[currentSlide].id}`);

                            doc.style.width = "100%";
                        }
                    }, 100);
                }
            }

            // Iniciar o slideshow
            let nextSlide = setInterval(nextSlideX, 6000);


            return () => {
                clearInterval(nextSlide);
            };
        }
    }, [props.currentPage, props.jogos]);


    return (
        <div className='divGamesBodyContainer'>
            <div className="divSlideGamesBodyContainer">
                {props.jogos &&
                    props.jogos.slice(0, 3).map((jogo) => (
                        <div key={jogo.id} className='divSliderGames' id={'slide-' + jogo.id}>
                            <div className='divSliderContainer'>
                                <video poster={jogo.imgFundo} src={jogo.imgFundo} autoPlay loop />
                                <div className='divSliderGameDescricao'>
                                    <div className='boxShadowSlider' />
                                    <video poster={jogo.imgBackground} src={jogo.imgBackground} autoPlay loop />
                                    <label>{jogo.descricaoBreve}</label>
                                    <h5>{jogo.nome}</h5>
                                    <p>{jogo.descricaoLonga}</p>
                                    <button>TORNEIOS</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <h2 className="h2Nossa">NOSSA COLE��O DE JOGOS</h2>
            <div className='divGamesMainContainer'>
                {jogosAtual &&
                    jogosAtual.map((jogo) => (
                        <div key={jogo.id} className='divGamesSubContainer' id={jogo.id}>
                            <div className='divGamesContainer'>
                                <video poster={jogo.imgFundo} src={jogo.imgFundo} autoPlay loop />
                                <div className='divGameDescricao'>
                                    <h5>{jogo.nome}</h5>
                                    <p>{jogo.descricaoLonga}</p>
                                    <button>TORNEIOS</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
                {paginaAtual > 1 && (
                    <button onClick={() => setPaginaAtual(paginaAtual - 1)}>
                        P�gina Anterior
                    </button>
                )}

                {paginaAtual < Math.ceil(props.jogos.length / 9) && (
                    <button onClick={() => setPaginaAtual(paginaAtual + 1)}>
                        P�gina Seguinte
                    </button>
                )}

        </div>
    )
}