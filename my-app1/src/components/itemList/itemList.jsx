import React from "react";

const ItemList = ({itemData}) => {
    return (
        <div className="Item-block">
            <a href={`/swap-menu/${itemData.id}`} className="Link-decoration">
                {itemData.image && (
                    <img
                        src={itemData.image}
                        className="Item-image"
                        alt={itemData.title}
                    />
                )}
                <div className="card-body">
                    <h5 className="Item-title">{itemData.title}</h5>
                    
                </div>
            </a>
        </div>
    );
};

export default ItemList;
