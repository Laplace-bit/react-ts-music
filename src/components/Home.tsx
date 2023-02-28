import React, { useEffect } from 'react';

const Home: React.FC = () => {

    useEffect(() => {
        console.log("wellcome to music!");
    })

    return (
        <div>
            wellcome to home
        </div>
    );
};

export default Home;

