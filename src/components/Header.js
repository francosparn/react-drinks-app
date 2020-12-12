import React from 'react';

const Header = () => {
    return ( 
        <header className="header bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center mt-5 caca">
                        <h1 className="mt-5">Drinks finder</h1>
                        <p>Your favorite alcoholic beverage app</p>
                    </div>
                    <div className="col-md-6">
                        <img className="my-4" src="assets/img/header.png" alt="Logo" />
                    </div>
                </div>
            </div>
        </header>
     );
}
 
export default Header;
