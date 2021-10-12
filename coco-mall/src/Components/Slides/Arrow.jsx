import React from 'react';

const Arrow = ({ className, style, onClick }) => {
    return (
        <div
            className={className}
            style={{ ...style, background: '#99DBDD', borderRadius: '100%' }}
            onClick={onClick}
        />
    );
};

export default Arrow;
