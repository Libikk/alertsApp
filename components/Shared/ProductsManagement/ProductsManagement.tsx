import React, { useEffect, useState } from 'react'
import { getProductsForManagement } from '../../../dispatchers/productDispatchers';
import { useDispatch } from 'react-redux'
import MaterialTable from "material-table";
import { tableIcons } from '../WebsiteAndProductsManagement/TableConfigs';

interface Columns {
    title: string,
    field: string,
}

interface GetProductsForManagement {
    productId: string,
    websiteUrl: string,
    fullUrl: string,
    createdAt: string,
    tableData: {
        id: number,
        checked: boolean
    }
}
interface Actions {
    icon: any,
    tooltip: string,
    onClick: Function,
}

const columns:Columns[] = [
    { title: "ID", field: "productId" },
    { title: "Website", field: "websiteUrl" },
    { title: "productUrl", field: "fullUrl" },
    { title: "Created At", field: "createdAt" },
  ]

const ProductsManagement = (props) => {
    const dispatch = useDispatch()
    const [products, setProducts] = useState<GetProductsForManagement[]>([])
    const [isLoading, setIsLoading] = useState<boolean | null>(null)

    useEffect(() => {
        setIsLoading(true)
        dispatch(getProductsForManagement())
        .then(setProducts)
        .catch(console.error)
        .finally(() => setIsLoading(false))
    }, []);

    const actions: Actions[] = [
        {
          icon: tableIcons.Save ,
          tooltip: 'Activate products',
          onClick: (event: void, rowData:GetProductsForManagement[]) => {
              console.log('rowData: ', rowData);

          }
        },
      ];

    return <div>
        <MaterialTable
          paging={false}
          isLoading={isLoading}
          icons={tableIcons}
          columns={columns}
          data={products}
        //   editable={{
        //     onRowUpdate,
        //   }}
          options={{
            selection: true,
          }}
          actions={actions}
          title="Products management"
        />
    </div>
}

export default ProductsManagement