import React from "react"
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/Menu";
import {StyledTimeline} from "../src/components/Timeline";

function HomePage(){
    const styleHomePage = { 
        //backgroundColor: "blue" 
    }

    const [valorDoFiltro, setvalorDoFiltro] = React.useState("");


    return (
   <> 
        <CSSReset />
        <div style={styleHomePage}>
            <Menu valorDoFiltro={valorDoFiltro} setvalorDoFiltro={setvalorDoFiltro}/>
            <Header />
            <TimeLine searchValue={valorDoFiltro} playlists={config.playlists}>Conteudo</TimeLine>
        </div>
   </>
    );
}

export default HomePage

// function Menu(){
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {        
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
    background-image: url(${config.bg});
    height: 230px;
`
function Header(){
    return (       
        <StyledHeader>
             <StyledBanner>

            </StyledBanner>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function TimeLine({searchValue, ...propriedades}){
    //console.log("Dentro do componente",propriedades);
    const playlistNames = Object.keys(propriedades.playlists);
    return (
        <StyledTimeline>            
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);                
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) =>{
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            })
                            .map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
                
            })}
        </StyledTimeline>
    )
}