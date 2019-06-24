import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import 'resize-observer-polyfill';
import App from './components/App';
// import withAPICreateSvg from './views/bar-chart/withApiCreateSvg';
// import withAPICreateTable from './views/table/withApiCreateTable';
// import fetchOrderData from './fetchOrderData';

// var topSectionID = '#top_section';
// var bottomSectionID = '#bottom_section';
// var pageSectionID = '#page_type_data';
// var tableAllSectionID = '#all_section_data';

// var topSectionTitle = 'Top Section';
// var bottomSectionTitle = 'Bottom Section';
// var pageSectionTitle = 'Page Type Data';

// var topSectionJSONPath = fetchOrderData(2521420541, 'section', 'DESC', 3);
// var bottomSectionJSONPath = fetchOrderData(2521420541, 'section', 'ASC', 3);
// var pageSectionJSONPath = fetchOrderData(2480100899, 'cat_type', 'DESC', 10);
// var allSectionJSONPath = fetchOrderData(2521420541, 'section', 'DESC', 10);

// var orderOverAllPath = fetchOrderData(2521420541, 'order_overall', 'DESC', 10);
// var pageOrderOverAll = fetchOrderData(2480100899, 'order_overall', 'DESC', 10);

// var topLineID = 'overAllTop';
// var bottomLineID = 'overAllBottom';
// var pageLineID = 'pageOverAll';

// var svgTopSection = withAPICreateSvg(
//   topSectionID,
//   topSectionJSONPath,
//   topSectionTitle,
//   orderOverAllPath,
//   topLineID
// );
// var svgBottomSection = withAPICreateSvg(
//   bottomSectionID,
//   bottomSectionJSONPath,
//   bottomSectionTitle,
//   orderOverAllPath,
//   bottomLineID
// );
// var svgPageType = withAPICreateSvg(
//   pageSectionID,
//   pageSectionJSONPath,
//   pageSectionTitle,
//   orderOverAllPath,
//   pageLineID
// );

// var tableAllSection = withAPICreateTable(tableAllSectionID, allSectionJSONPath, orderOverAllPath);

ReactDOM.render(<App />, document.getElementById('react_app'));
