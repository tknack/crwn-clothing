import React from "react";
import PropTypes from "prop-types";


import './collection-item.style.scss'

const CollectionItem = ({ id, name, price, imageUrl }) => {
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="name">{price}</span>
      </div>
    </div>
  );
};

CollectionItem.propTypes = {};

export default CollectionItem;
