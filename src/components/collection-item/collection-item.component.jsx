import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CustomButton from '../custom-button/custom-button.component'
import { addItem } from '../../redux/cart/cart.actions'

import './collection-item.style.scss'

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item
  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='name'>{price}</span>
      </div>
      <CustomButton inverted onClick={() => addItem(item)}>
        ADD to cart
      </CustomButton>
    </div>
  )
}

CollectionItem.propTypes = {}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
})

export default connect(null, mapDispatchToProps)(CollectionItem)
