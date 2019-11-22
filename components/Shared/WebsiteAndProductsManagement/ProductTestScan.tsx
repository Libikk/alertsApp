import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import { tableIcons } from './TableConfigs';
import { testProductsScan } from '../../../dispatchers/scansDispatchers';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';

const ProductTestScan = (props) => {
    const dispatch = useDispatch()
    const [websitesSelectors, setWebsitesSelectors] = useState(props.testProductsData);
    const [isTesting, setIsTesting] = useState(false);

    const testProducts = () => {
        setIsTesting(true)
        console.log('props: ', websitesSelectors);
        return dispatch(testProductsScan(websitesSelectors))
            .then(e => {
                console.log('e: ', e);
                setIsTesting(false)
            })
            .catch(console.error)
    }

    const onRowUpdate = (newData) => {
        const updatedSelectors = websitesSelectors.map(selector => selector.id === newData.id ? newData : selector);
        setWebsitesSelectors(updatedSelectors);
        return Promise.resolve();
    }

    return <div>
        <MaterialTable
            isLoading={isTesting}
            icons={tableIcons}
            columns={[
                { title: "hostName", field: "hostName" },
                { title: "Discounted product url", field: "Discounted product url" },
                { title: "NOT discounted product url", field: "NOT discounted product url" },
            ]}
            data={websitesSelectors}
            editable={{
                onRowUpdate: onRowUpdate,
            }}
            options={{
                selection: true,
            }}
            title="Websites management"
            />
            <Button onClick={testProducts}>Test products</Button>
    </div>
}

export default ProductTestScan