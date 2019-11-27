import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import { tableIcons } from './TableConfigs';
import { getWebsitesSelectors, updateWebsiteSelector } from '../../../dispatchers/websitesDispatchers';
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { testProductsScan } from '../../../dispatchers/scansDispatchers';
import ProductTestedData from './ProductTestedData';
import '../../../styles/websitesSelectorsManagement.scss'


const columns = [
  { title: "url", field: "url" },
  { title: "isDiscountSelector", field: "isDiscountSelector" },
  { title: "isDiscountSelectorRegex", field: "isDiscountSelectorRegex" },
  { title: "isClientSideCheck", field: "isClientSideCheck" },
  { title: "imageSelector",  field: "imageSelector" },
  { title: "productNameSelector", field: "productNameSelector" },
  { title: "productPriceSelector", field: "productPriceSelector" },
  { title: "productDiscountedPriceSelector", field: "productDiscountedPriceSelector" },
  { title: "Discounted product url", field: "discountedProductUrl" },
  { title: "NOT discounted product url", field: "notDiscountedProductUrl" },
]

const testDataaa = [{"id":11,"isClientSideCheck":1,"isDiscountSelectorRegex":"rollback","isDiscountSelector":".pdp-main-details__promo-cntr","imageSelector":".s7staticimage img","productNameSelector":".pdp-main-details__title","productPriceSelector":".pdp-main-details__was-price","productDiscountedPriceSelector":".co-product__price.pdp-main-details__price","hostName":"groceries.asda.com","url":"https://groceries.asda.com","notDiscountedProductUrl":"https://groceries.asda.com/product/910000226861?origin=/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837","discountedProductUrl":"https://groceries.asda.com/product/1000123650031?origin=/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837","tableData":{"id":1,"checked":true},"fullUrl":"https://groceries.asda.com/product/1000123650031?origin=/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837","regex":"rollback","selectorString":".pdp-main-details__promo-cntr","isPromo":true,"imgUrl":"https://ui.assets-asda.com/dm/asdagroceries/5057172103461_T1?defaultImage=asdagroceries/noImage&resMode=sharp2&id=5yESd3&fmt=jpg&fit=constrain,1&wid=288&hei=288","productName":"ASDA Thick Sliced Oven Baked Dry Cured Ham","productPrice":"£4.50 /100g","productDiscountedPrice":"£4.00"},{"id":11,"isClientSideCheck":1,"isDiscountSelectorRegex":"rollback","isDiscountSelector":".pdp-main-details__promo-cntr","imageSelector":".s7staticimage img","productNameSelector":".pdp-main-details__title","productPriceSelector":".pdp-main-details__was-price","productDiscountedPriceSelector":".co-product__price.pdp-main-details__price","hostName":"groceries.asda.com","url":"https://groceries.asda.com","notDiscountedProductUrl":"https://groceries.asda.com/product/910000226861?origin=/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837","discountedProductUrl":"https://groceries.asda.com/product/1000123650031?origin=/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837","tableData":{"id":1,"checked":true},"fullUrl":"https://groceries.asda.com/product/910000226861?origin=/product/ham-pork-slices/asda-thick-dry-cured-ham-slices/910000226837","regex":"rollback","selectorString":".pdp-main-details__promo-cntr","isPromo":false,"imgUrl":"","productName":"ASDA Thick Sliced Breaded Dry Cured Ham Slices","productDiscountedPrice":"£3.00"}]
const WebsitesSelectorsManagement = () => {
  // const state = useSelector(state => state);
  const dispatch = useDispatch()

  const [websitesSelectors, setWebsitesSelectors] = useState([]);
  const [isTesting, setIsTesting] = useState(false);
  const [websitesSelectorsUnchanged, setWebsitesSelectorsUnchanged] = useState([]);
  const [testData, setTestData] = useState(testDataaa)
  console.log('testData: ', testData);

  useEffect(() => {
    dispatch(getWebsitesSelectors())
      .then(selectorsData => setWebsitesSelectors(selectorsData))
  }, [])

  const onSaveClick = (rowData) => {
    return rowData.map(singleRowData =>
      dispatch(updateWebsiteSelector(singleRowData))
        .then(() => {
          const updatedSelectors = websitesSelectors.map(selector => selector.id === singleRowData.id ? singleRowData : selector);
          return setWebsitesSelectorsUnchanged(updatedSelectors);
        })
        .catch(() => {
          alert(`${singleRowData.id} hasn't been updated`)
        })
    )
  }

  const testProducts = (rowData) => {
      setIsTesting(true)
      return dispatch(testProductsScan(rowData))
          .then(res => {
              setTestData(res);
              setIsTesting(false)
          })
          .catch(console.error)
  }

   const onRowUpdate = (newData) => {
        const updatedSelectors = websitesSelectors.map(selector => selector.id === newData.id ? newData : selector);
        setWebsitesSelectors(updatedSelectors);
        return Promise.resolve();
  };

  const onModalClose = () => setTestData([]);

  const actions = [
    {
      icon: tableIcons.Save,
      tooltip: 'Save Row',
      onClick: (event, rowData) => onSaveClick(rowData)
    },
    {
      icon: 'T',
      tooltip: 'Test selectors',
      onClick: (event, rowData) => testProducts(rowData)
    }
  ]

  return (
      <div className="website-products-management">
        <Modal
          className="website-products-management__modal-product-test"
          open={testData.length}
        >
          <Card>
              <ProductTestedData testData={testData} onModalClose={onModalClose}/>
          </Card>
        </Modal>
        <MaterialTable
          isLoading={isTesting}
          icons={tableIcons}
          columns={columns}
          data={websitesSelectors}
          editable={{
            onRowUpdate,
          }}
          options={{
            selection: true,
          }}
          actions={actions}
          title="Websites management"
        />
      </div>
  );
}

export default WebsitesSelectorsManagement