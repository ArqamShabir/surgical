import Link from 'next/link';

const PageBanner = ({ title, parent = 'Home', parentLink = '/' }) => {
  return (
    <div className="page-banner bread-p">
      <div className="container">
        <div className="breadcrumb">
          <Link href={parentLink}>{parent}</Link> / {title.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
