import React from 'react';
import { Link } from 'react-router-dom';

const PageBanner = ({ title, parent = 'Home', parentLink = '/' }) => {
  return (
    <div className="page-banner bread-p">
      <div className="container">
        <div className="breadcrumb">
          <Link to={parentLink}>{parent}</Link> / {title.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
