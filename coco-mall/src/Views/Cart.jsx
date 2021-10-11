import React, { useEffect,  } from 'react';
// import axios from 'axios';
import { useParams } from 'react-router';
import NavBar from '../Components/NavBar/NavBar';
// import { useSelector } from 'react-redux';
// import { SHOPPING_CART } from '../Scripts/constants';

const FORM_ID = 'payment-form';

export default function Cart() {
    // const user = useSelector((state) => state.auth.uid);
    // useEffect(() => {
    //     axios.post(SHOPPING_CART.GET_PRODUCTS, {idUser:user}).then(res => setCart(res.data))
    // }, [user]);

    const { id } = useParams();

    
    useEffect(() => {
        if (id) {
            // con el preferenceId en mano, inyectamos el script de mercadoPago
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';

            const form = document.getElementById(FORM_ID);
            script.setAttribute('data-preference-id', id);
            form.appendChild(script);
        }
    }, [id]);
    return (
        <div>
            <NavBar />
            <div>
               
                <form id={FORM_ID} method='GET' />
            </div>
        </div>
    );
}


// import { Image } from 'cloudinary-react';

// export default function Cart() {  
   
// //vamos a guardar los public_id en un estado (va a ser un array de ids)
//     const [imageIds, setImageIds] = useState();

//     //llamado al back para traer las imagenes
//     const loadImages = async () => {
//         try {
//             const res = await fetch('http://localhost:3001/images');
//             const data = await res.json();
//             setImageIds(data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

// //cargamos las imagenes apenas se monta el componente
//     useEffect(() => {
//         loadImages();
//     }, []);

   
//     return (            
//             <div>
               
//                 <div className='gallery'>
//                     {imageIds &&
//                         imageIds?.map((imageId) => (
//                             <Image  
//                                 key={imageId}
//                                 cloudName='cocomalls' 
//                                 publicId={imageId}
//                                 width="300"
//                                 crop="scale"
                                
//                             />
//                         ))}
//                 </div>
//             </div>
       
//     );
// }