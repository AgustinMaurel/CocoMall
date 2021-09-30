import logoBicycleStore from '../Assets/images/logoBicycleStore.jpg';
import bannerCyclits from '../Assets/images/bannerCyclits.jpg';
import logoFashionStore from '../Assets/images/logoFashionStore.jpg';
import bannerFashion from '../Assets/images/bannerFashion.jpg';
import logoTechStore from '../Assets/images/logoTechStore.jpg';
import bannerTech from '../Assets/images/bannerTech.jpg';

const dataStores = () => ([
    {
        logo: logoBicycleStore,
        banner: bannerCyclits,
        title: "Store 01",
        mail: "store01@gmail.com",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        logo: logoFashionStore,
        banner: bannerFashion,
        title: "Store 02",
        mail: "store02@gmail.com",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        logo: logoTechStore,
        banner: bannerTech,
        title: "Store 03",
        mail: "store03@gmail.com",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    }
])

export default dataStores;
