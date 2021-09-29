import React from 'react';

function NavBar(props) {
    //La Nav va a recibir props porque vamos a renderizar distintas cosas dependiendo
    //el tamaño de la pantalla.
    return (
        <nav className='flex flex-row justify-between   '>
            <p>LOGO</p>
            <p>MENU</p>
        </nav>
    );
}

export default NavBar;
