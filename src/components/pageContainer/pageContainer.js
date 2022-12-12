import React from 'react';
import { Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { pages } from '../../pages/pagesConfig';
import './pageContainer.scss';

function PageContainer({ children }) {

    const getConatinerClass = () => {
        const location = useLocation();
        let currentPath = location.pathname;
        let pageClass = 'route-error';

        Object.keys(pages).forEach(key => {
            const { children, path }  = pages[key];
            if(currentPath.indexOf(pages[key].path) > -1){
                pageClass = pages[key].bodyClass;
            } else if (children && children.length) {
                children.forEach(child => {
                    if(currentPath.indexOf(child.path) > -1){
                        pageClass = child.bodyClass;
                    }
                });
            }
        });
        
        return `page-container ${pageClass}`;
    };

    return (
        <Row className={getConatinerClass()}>
            <Col>
                {children}
            </Col>
        </Row>
    );
}

export default PageContainer;
