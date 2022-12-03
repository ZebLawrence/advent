import React from 'react';
import { useLocation } from 'react-router-dom';
import { pages } from '../../pages/pagesConfig';
import './pageContainer.scss';

function PageContainer({ children }) {

    const getConatinerClass = () => {
        const location = useLocation();
        let currentPath = location.pathname;
        let pageClass = 'route-error';

        Object.keys(pages).forEach(key => {
            if(pages[key].path === currentPath){
                pageClass = pages[key].bodyClass;
            }
        });
        
        return `page-container ${pageClass}`;
    };

    return (
        <div className={getConatinerClass()}>
            {children}
        </div>
    );
}

export default PageContainer;
