import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useQueryParams() {
    const [queries, setQueries] = useState({});
    const { search } = useLocation();    
    
    
    const onDecodeParams = useCallback((params) => {
        const replaceFirstChar = params.replace('?', '');
        const splitString = replaceFirstChar.split('&');

        const formattedQueries = {};

        splitString.forEach((query) => {
            const [key, value] = query.split('=');
            Object.assign(formattedQueries, {
                [key]: value,
            });
        });

        setQueries(formattedQueries);
    }, []);

    useEffect(() => {
        if (search.trim()) {
            onDecodeParams(search);
        }
    }, [onDecodeParams, search]);

    return queries;
}
