import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../Assets/icons/loco_coco.png';
import axios from 'axios';
import ModelTable from '../Scripts/modelTable';
import NavBar from '../Components/NavBar/NavBar';
import { getProductsStore, getStores } from '../Redux/actions/stores';
import { IoArrowBack } from "react-icons/io5";
import ProductsCreate from '../Components/Forms/ProductsCreate';
import { GrAdd } from 'react-icons/gr'
import { sortFunction } from '../Scripts/sortFunction';

export default function StorePanel() {


    const products = useSelector((state) => state.stores.storeProducts)

    const [flag, setFlag] = useState(false)

    const [idActual, setIdActual] = useState("")

    const [product, setProduct] = useState()

    useEffect(() => {
        dispatch(getStores())
    }, [])

    useEffect(() => {
        dispatch(getProductsStore(idActual))
    }, [flag])

    const [selectStore, setSelectStore] = useState("Select Store")
    const [render, setRender] = useState("")
    const [types, setTypes] = useState([])
    const [editState, setEditState] = useState(true)
    const [renderSec, setRenderSec] = useState(false)
    const [finalProducts, setFinalProducts] = useState([])

    const stores = useSelector((state) => state.stores)
    const user = useSelector((state) => state.auth)
    const storesUser = stores.allStores.filter(el => el.UserId === user.uid)

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('http://localhost:3001/productType')
            .then((res) => setTypes(res.data))
    }, [dispatch])


    function handleStore(e) {
        if (e.target.value !== "All") {
            setSelectStore(e.target.value)
            const aux = stores.allStores.find(store => store.storeName === e.target.value)
            dispatch(getProductsStore(aux.id))
            setIdActual(aux.id)
        }
        return false
    }

    function handleRender(e) {
        setRender(e.target.value)
        setFlag(!flag)

    }

    const filterProduct = ["A-Z", "Z-A", "Price", "Type", "Stock"]

    const filterOrders = ["All", "Shipped", "Rejected", "Pending", "Completed"]

    const filtersNow = render === "Products" ? filterProduct : render === 'Orders' ? filterOrders : []


    return (
        <div className='grid grid-col-6   grid-rows-8  h-screen '>
            <div className=' col-span-6 row-span-1 row-end-1   border-b-2 border-gray-100   '>
                <NavBar />
            </div>
            <div className='flex w-64 flex-col col-span-1 row-span-full relative pl-10 border-r bg-gray-100 border-gray-200 p-5  '>
                <div className='flex flex-col items-center '>

                    <select name="selectStore" onChange={handleStore}>

                        <option selected="SelectStore" disabled={true} value="Select Store">Select Store</option>
                        {storesUser?.map(e => {
                            return <option key={e.id} value={e.storeName}>{e.storeName}</option>
                        })}
                    </select>

                    <img className="w-9/12" src={logo} alt="not found" />


                    <h1 className='text-start self-center p-5'>
                        Store Panel
                    </h1>

                    <div className='flex flex-col'>
                        <button name="Products" value="Products" onClick={handleRender} className='cursor-pointer' >
                            Products </button>
                        <button name="Orders" value="Orders" onClick={handleRender} className='cursor-pointer' >
                            Orders </button>
                    </div>


                </div>

            </div>

            {editState ?
                <div className=' col-start-2 col-end-6 row-span-full text-center justify-center items-center overflow-y-hidden p-4 '>
                    <IoArrowBack />
                    <div className='text-center justify-center items-center'>
                        {selectStore === "All" && <span>Select a Store</span>}


                        <div>


                            <h1 className='text-center items-center '>{render === "Products" ? "Products" : render ==="Orders" ? "Orders" : false}</h1>
                            <div className=' flex text-center justify-evenly items-center h-32 '>
                                {filtersNow.map((el) => (
                                    <label onClick={()=>{
                                        setFinalProducts(sortFunction(el, products))
                                        console.log(finalProducts)
                                    }}  key={el} className='border cursor-pointer bg-secondary-light border-gray-200 rounded-md px-5'>{el}</label>
                                ))}
                                <label onClick={() => dispatch(getProductsStore(idActual)) && !renderSec ? setRenderSec(true) : setRenderSec(false)} className='border cursor-pointer bg-secondary-light border-gray-200 rounded-md px-5 py-1'><GrAdd /></label>
                            </div>
                        </div>

                        {render === "Products" && selectStore !== "Select Store" && renderSec === false ?
                            <ModelTable info={products} setProduct={setProduct} setEditState={setEditState} idStore={idActual} types={types}
                                column_title={["Action", "Name", "Price", "Id", "Image", "Stock", "Type"]} />
                            : renderSec === true ? <ProductsCreate idStore={idActual} />: false}

                                {render === "Orders" && selectStore !== "All" && <ModelTable info={[]} 
                                     column_title={["Action", "State", "Payment", "Description",]} />}

                    </div>
                </div> :
                <div>
                    <IoArrowBack onClick={() => setEditState(true)} />
                    <ProductsCreate idStore={idActual} product={product} />
                </div>
            }
        </div>
    );
}
