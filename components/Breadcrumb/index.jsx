const Breadcrumb = ({ breadcrumb }) => {
  return <div className="Breadcrumb">{breadcrumb.join('  >  ')}</div>;
};

export default Breadcrumb;
