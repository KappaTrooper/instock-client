import React, { useState, useEffect } from "react";
import "./WarehouseDetails.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import arrow from "../../assets/icons/arrow_back-24px.svg";
import DeleteButton from "../../assets/icons/delete_outline-24px.svg";
import EditButton from "../../assets/icons/edit-24px.svg";
import { apiUrl } from "../../utilities/api";
import sortIcon from "../../assets/icons/sort-24px.svg";
import axios from "axios";
import arrowside from "../../assets/icons/chevron_right-24px.svg";
export default function WarehouseDetails({ warehouseList }) {
  const navigateTo = useNavigate();

  const [warehouseDetails, setWarehouseDetails] = useState();
  const [inventoryList, setInventoryList] = useState();
  const { id } = useParams(); // Retrieve the 'id' parameter from the URL

  // useEffect for Details component
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/warehouses/${id}`)
      .then((response) => {
        setWarehouseDetails(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, warehouseList]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/inventories/warehouse/${id}`)
      .then((response) => {
        setInventoryList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, warehouseList]);

  if (!warehouseDetails || !inventoryList) {
    return <span>Loading...</span>;
  }

  return (
    <div className="warehouse-details">
      <div className="warehouse-details__top">
        <div className="warehouse-details__top--name">
          <Link to={`/warehouse`} className="warehouse-details__back">
            <img src={arrow} alt="Arrow" />
          </Link>
          <h1>{warehouseDetails.warehouse_name}</h1>
        </div>
        <Link
          to={`/warehouse/edit/${id}`}
          className="warehouse-details__edit-icon--link"
        >
          <div className="warehouse-details__edit-icon--circle">
            <img
              src={EditButton}
              className="warehouse-details__edit-icon--img"
              alt="Edit"
            />
            <p className="warehouse-details__edit-icon--circle-text">Edit</p>
          </div>
        </Link>
      </div>

      {/* Contact info section */}

      <div className="warehouse-details__middle">
        <div className="warehouse-details__middle--top">
          <p className="warehouse-details__middle-address">WAREHOUSE ADDRESS</p>
          <p className="warehouse-details__middle-address-item">
            {warehouseDetails.address}
          </p>
          <p className="warehouse-details__middle-address-item">
            {warehouseDetails.city}
          </p>
        </div>
        <div className="warehouse-details__middle--container">
          <div className="warehouse-details__middle--container--contact-name">
            <p className="warehouse-details__middle-name">CONTACT NAME:</p>
            <p className="warehouse-details__middle-name-item">
              {warehouseDetails.contact_name}
            </p>
            <p className="warehouse-details__middle-name-item">
              {warehouseDetails.contact_position}
            </p>
          </div>
          <div className="warehouse-details__middle--container--contact">
            <p className="warehouse-details__middle-name">
              CONTACT INFORMATION:
            </p>
            <p className="warehouse-details__middle-name-item">
              {warehouseDetails.contact_phone}
            </p>
            <p className="warehouse-details__middle-name-item">
              {warehouseDetails.contact_email}
            </p>
          </div>
        </div>
      </div>

      {/* Inventory Section */}
      <div className="warehouse-details__inventory-section">
        <div className="inventory__headings-container">
          <div className="inventory__headings">
            <div className="inventory__titles inventory__titles-inventory-name">
              <h4 className="inventory__heading inventory__heading-inventory-name">
                INVENTORY NAME
              </h4>
              <img
                src={sortIcon}
                className="inventory__heading-icon"
                alt="sorting icon"
              />
            </div>
            <div className="inventory__titles inventory__titles-category">
              <h4 className="inventory__heading inventory__heading-category">
                CATEGORY
              </h4>
              <img
                src={sortIcon}
                className="inventory__heading-icon"
                alt="sorting icon"
              />
            </div>
            <div className="inventory__titles inventory__titles-status">
              <h4 className="inventory__heading inventory__heading-status">
                STATUS
              </h4>
              <img
                src={sortIcon}
                className="inventory__heading-icon"
                alt="sorting icon"
              />
            </div>
            <div className="inventory__titles inventory__titles-qty">
              <h4 className="inventory__heading inventory__heading-qty">
                QUANTITY
              </h4>
              <img
                src={sortIcon}
                className="inventory__heading-icon"
                alt="sorting icon"
              />
            </div>

            <div className="inventory__titles inventory__titles-actions">
              <h4 className="inventory__heading inventory__heading-actions">
                ACTIONS
              </h4>
            </div>
          </div>
        </div>

        {inventoryList.map((inventory) => {
          return (
            <div
              className="inventory-list__container"
              key={warehouseDetails.id}
            >
              <div className="inventory-list__content inventory-list__inventory-name-container">
                <h3 className="inventory-list__mobile-header">
                  INVENTORY ITEM
                </h3>
                <div className="inventory-list__item-box">
                  <p className="inventory-list__item-name">
                    {inventory.item_name}
                  </p>
                  <img src={arrowside} alt="arrow icon" />
                </div>
              </div>

              <div className="inventory-list__content inventory-list__category-container">
                <h3 className="inventory-list__mobile-header">CATEGORY</h3>
                <p className="inventory-list__item-name--category">
                  {inventory.category}
                </p>
              </div>

              <div className="inventory-list__content inventory-list__status-container">
                <div className="inventory-list__status-icon-container">
                  <h3 className="inventory-list__mobile-header">STATUS</h3>
                  <p
                    className={`inventory-list__status ${
                      inventory.status === "In Stock"
                        ? "inventory-list__status--in-stock"
                        : "inventory-list__status--out-of-stock"
                    }`}
                  >
                    {inventory.status}
                  </p>
                </div>
              </div>

              <div className="inventory-list__content inventory-list__quantity-container">
                <h3 className="inventory-list__mobile-header">QTY</h3>
                <p className="inventory-list__item-name">
                  {inventory.quantity}
                </p>
              </div>

              <div className="inventory-list__actions-container">
                <img
                  src={DeleteButton}
                  alt="delete icon"
                  className="inventory-list__icon inventory-list__icon--delete"
                />
                <Link
                  to={`/inventory/edit/${inventory.id}`}
                  className="inventory-list__link"
                >
                  <img
                    src={EditButton}
                    alt="edit icon"
                    className="inventory-list__icon"
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
