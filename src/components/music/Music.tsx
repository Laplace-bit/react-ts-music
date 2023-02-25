import React, { useEffect } from 'react';


const Music: React.FC = () => {

    useEffect(() => {
        console.log("wellcome to music!");
    })

    return (
        <div>
            listen some music
        </div>
    );
};

export default Music;
