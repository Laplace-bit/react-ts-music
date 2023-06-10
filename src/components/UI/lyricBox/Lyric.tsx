import "./lyric.css"
const LyricBox: React.FC = () => {
    return (
        <form action="" className="container">
            <div className="input-container">
                <div className="input-content">
                    <div className="input-dist">
                        <div className="input-type">
                            <input placeholder="..." required={true} type="text" className="input-is"></input>
                        </div>
                    </div>
                </div>
            </div>
        </form >
    );
};

export default LyricBox;