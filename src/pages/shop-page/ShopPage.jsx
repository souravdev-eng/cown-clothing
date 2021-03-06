import React, { Component } from 'react';
import CollectionPreview from '../../components/collection-preview/CollectionPreview';
import './shop.style.scss';
import { SHOP_DATA } from '../shop-page/shop.data';

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: SHOP_DATA,
    };
  }
  render() {
    const { collections } = this.state;
    return (
      <div className='shop-page'>
        {collections.map(({ id, ...otherCollection }) => (
          <CollectionPreview key={id} {...otherCollection} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
