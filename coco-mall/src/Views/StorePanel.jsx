
import NavBar from '../Components/NavBar'
import { useEffect, useState } from 'react';
import ProductsCreate from '../Components/Forms/ProductsCreate';
import { useSelector } from 'react-redux';
import logo from '../Assets/icons/loco_coco.png';
import axios from 'axios';
import ModelTable from '../Scripts/modelTable';
import { data } from '../Scripts/jsonPrueba';


export default function StorePanel() {

    const [selectStore, setSelectStore] = useState("")
    const [productStore, setProductsStore] = useState([])
    const [render, setRender] = useState("")
    const [types, setTypes] = useState([])

    const stores = useSelector((state) => state.stores)
    const user = useSelector(state => state.auth)
    const storesUser = stores.allStores.filter(e => e.UserId === user.uid)

    useEffect(() => {
        axios.get('http://localhost:3001/productType')
            .then((res) => setTypes(res.data))
    }, [])

    function handleStore(e) {
        if (e.target.value !== "All") {
            setSelectStore(e.target.value)
            let aux = storesUser.find(store => store.storeName === e.target.value)
            axios.get(`http://localhost:3001/product/${aux.id}`)
                .then(res => setProductsStore(res.data))
        }
        return false
    }

    function handleRender(e) {
        setRender(e.target.value)
    }




    return (
        <div className='grid grid-col-6   grid-rows-8  h-screen '>
            <div className=' col-span-6 row-span-1 row-end-1 flex  h-14 pt-4 border-b-2 border-gray-100 px-20 pb-3 z-10  '>
                <NavBar />
            </div>
            <div className='flex w-64 flex-col col-span-1 row-span-full relative pl-10 border-r bg-gray-100 border-gray-200 p-5  '>
                <div className='flex flex-col items-center '>
                    <h1>Select Store</h1>
                    <select name="selectStore" onClick={handleStore}>
                        <option value="All">All</option>
                        {storesUser.map(e => {
                            return <option key={e.id} value={e.storeName}>{e.storeName}</option>
                        })}
                    </select>

                    <img className="w-9/12" src={logo} alt="not found" />


                    <h1 className='text-start self-center p-5'>
                        Store Panel
                    </h1>
                    <div>
                        <label htmlFor="Orders">
                            <input type="radio" name="render" id="Orders" value="Orders" onChange={handleRender} checked={null} />
                            Orders</label>
                    </div>
                    <div>
                        <label htmlFor="Products">
                            <input type="radio" name="render" id="Products" value="Products" onChange={handleRender} checked={null} />
                            Products</label>
                    </div>



                </div>

            </div>

            <div className=' col-start-2 col-end-6 row-span-full text-center justify-center items-center overflow-y-hidden p-4 '>
                <div className='text-center justify-center items-center'>
                    {selectStore === "All" && <span>Select a Store</span>}

                    {render === "Products" && selectStore !== "All" && <ModelTable info={productStore} types={types} title={"Products"}
                        filters={["A-Z", "Z-A", "Price", "Type", "Stock",]}
                        column_title={["Action", "Name", "Price", "Id", "Image", "Stock", "Type"]} />}

                    {render === "Orders" && selectStore !== "All" && <ModelTable info={[]} title={"Orders"}
                        filters={["All", "Shipped", "Rejected", "Pending", "Completed"]} column_title={["Action", "State", "Payment", "Description",]} />}

                </div>
            </div>
        </div>
    );
}
