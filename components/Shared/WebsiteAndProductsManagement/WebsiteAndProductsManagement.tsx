import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialTable from "material-table";
import { tableIcons } from './TableConfigs';
import { getWebsitesSelectors, updateWebsiteSelector } from '../../../dispatchers/websitesDispatchers';
// // interface AuthObj {
// //   currentUser: {
// //     userName: string,
// //     userId: number,
// //     email: string
// //   }
// // }

// type MyProps = {
//   auth: AuthObj | null,
// };
const columns = [
  { title: "hostName", field: "hostName" },
  { title: "url", field: "url" },
  { title: "isDiscountSelector", field: "isDiscountSelector" },
  { title: "isDiscountSelectorRegex", field: "isDiscountSelectorRegex" },
  { title: "isClientSideCheck", field: "isClientSideCheck" },
  { title: "imageSelector",  field: "imageSelector" },
  { title: "productNameSelector", field: "productNameSelector" },
  { title: "productPriceSelector", field: "productPriceSelector" },
  { title: "productDiscountedPriceSelector", field: "productDiscountedPriceSelector" },
]

class WebsitesSelectorsManagement extends React.Component<MyProps> {
  state = {
    websitesSelectors: []
  }

  componentDidMount() {
    this.props.getWebsitesSelectors().then(selectorsData => this.setState({ websitesSelectors: selectorsData }))
  }

  onRowUpdate = (newData) => {
    return this.props.updateWebsiteSelector(newData)
      .then(() => {
        const updatedSelectors = this.state.websitesSelectors.map(selector => selector.id === newData.id ? newData : selector);
        return this.setState({ websitesSelectors: updatedSelectors });
      });
  };

    render() {
      console.log(this.props.websites.selectors)
      return (
        <div>
          <MaterialTable
            icons={tableIcons}
            columns={columns}
            data={this.state.websitesSelectors}
            editable={{
              onRowUpdate: this.onRowUpdate,
            }}
            title="Websites management"
          />
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getWebsitesSelectors: bindActionCreators(getWebsitesSelectors, dispatch),
  updateWebsiteSelector: bindActionCreators(updateWebsiteSelector, dispatch),
});

export default connect(state => state, mapDispatchToProps)(WebsitesSelectorsManagement)