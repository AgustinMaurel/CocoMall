import { filterProducts, ordersProduct, filterStores } from '../Redux/actions/stores';

export function handleOnDiscount(filters, dispatch, id) {
    return () => {
        if (!filters.discount) {
            ++filters.discount;
            dispatch(filterProducts(id, filters));
        } else {
            --filters.discount;
            dispatch(filterProducts(id, filters));
        }
    };
}

export function handleOnOrder(dispatch) {
    return (e) => {
        e.preventDefault();
        dispatch(ordersProduct(e.target.value));
    };
}

export function handleOnChecked(checkType, setCheckType, filters, dispatch, id, check, setCheck) {
    return (e, position) => {
        const newChecked = [...checkType];
        if (e.target.checked) {
            newChecked.push(parseInt(e.target.value));
            setCheckType(newChecked);
            filters.type = [...newChecked];
            id && dispatch(filterProducts(id, filters));
            !id && dispatch(filterStores(filters));
        } else {
            setCheckType(newChecked.filter((el) => el !== parseInt(e.target.value)));
            filters.type = newChecked.filter((el) => el !== parseInt(e.target.value));
            id && dispatch(filterProducts(id, filters));
            !id && dispatch(filterStores(filters));
        }
        const updatedCheckState = check.map((item, index) => {
            return index === position ? !item : item;
        });
        setCheck(updatedCheckState);
    };
}

export function handleOnSubmit(filters, types, dispatch, id) {
    return (e) => {
        e.preventDefault();
        filters.type = [...types];
        if (
            filters.searchProduct ||
            filters.searchStore ||
            filters.searchState ||
            types.length ||
            filters.min ||
            filters.max ||
            filters.order
        ) {
            id && dispatch(filterProducts(id, filters));
            !id && dispatch(filterStores(filters));
        } else {
            id && dispatch(filterProducts(id, filters));
            !id && dispatch(filterStores(filters));
        }
    };
}

export function handleOnChange(setFilters) {
    return (e) => {
        setFilters((prevData) => {
            const state = {
                ...prevData,
                [e.target.name]: e.target.value,
            };
            if (state.searchProduct) {
                state.searchProduct =
                    state.searchProduct[0].toUpperCase() + state.searchProduct.substring(1);
            }
            if (state.searchStore) {
                state.searchStore =
                    state.searchStore[0].toUpperCase() + state.searchStore.substring(1);
            }
            if (state.searchState) {
                state.searchState =
                    state.searchState[0].toUpperCase() + state.searchState.substring(1);
            }
            if (state.discount) {
                state.discount = 1;
            }
            console.log('SOY STATE', state);
            return state;
        });
    };
}

export function handleOnTypes(dispatch, id, filters) {
    return (e) => {
        let val = parseInt(e.target.value);
        let aux = {
            type: [],
        };
        if (e.target.value !== 'All') {
            aux.type = [val];
            filters.type = [val];
            dispatch(filterProducts(id, aux));
        } else {
            filters.type = [];
            filters.subCategory = [];
            dispatch(filterProducts(id, aux));
        }
    };
}

export function handleOnCategories(dispatch, id, filters) {
    return (e) => {
        let val = parseInt(e.target.value);
        let aux = {
            type: [filters.type],
            subCategory: [],
        };
        if (e.target.value !== 'All') {
            aux.subCategory = [val];
            filters.subCategory = [val];
            dispatch(filterProducts(id, aux));
        } else {
            filters.subCategory = [];
            dispatch(filterProducts(id, aux));
        }
    };
}

export function handleOnChangeProduct(dispatch, id, filters) {
    return (e) => {
        if (e.target.value === 'ASC') {
            filters.order = 'ASC'
            dispatch(filterProducts(id, filters));
        }
        if (e.target.value === 'DESC') {
            filters.order = 'DESC'
            dispatch(filterProducts(id, filters));
        } else {
            filters.order = 'ALL';
            dispatch(filterProducts(id, filters));
        }
    };
}
