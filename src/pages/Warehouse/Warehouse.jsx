import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

import "./Warehouse.scss";
import sortIcon from "../../assets/icons/sort-24px.svg";
import Arrow from "../../assets/icons/chevron_right-24px.svg";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import { apiUrl } from "../../utilities/api";

export default function Warehouse() {
  const navigateTo = useNavigate();

  const [warehouseList, setWarehouseList] = useState();
  const location = useLocation();
  const updatedItem = location.state?.updatedItem;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/warehouses`)
      .then((response) => {
        setWarehouseList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [updatedItem]);

  if (!warehouseList) {
    return <span>Loading...</span>;
  }
  return (
    <section className="warehouse">
      <div className="warehouse__header-container">
        <h1 className="warehouse__title">Warehouses</h1>
        <div className="warehouse__search-container">
          <form className="warehouse__searchbar-form">
            <input
              type="text"
              className="warehouse__searchbar-input"
              id="searchbar"
              name="searchbar"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="warehouse__searchbar-icon"
            ></button>
          </form>
          <Link
            className="warehouse__add-warehouse-button"
            to={`/warehouse/add`}
          >
            + Add New Warehouse
          </Link>
        </div>
      </div>
      <div className="warehouse__headings-container">
        <div className="warehouse__headings">
          <div className="warehouse__titles warehouse__titles-warehouse">
            <h4 className="warehouse__heading warehouse__heading-warehouse">
              WAREHOUSE
            </h4>
            <img
              src={sortIcon}
              className="warehouse__heading-icon"
              alt="sorting icon"
            />
          </div>
          <div className="warehouse__titles warehouse__titles-address">
            <h4 className="warehouse__heading warehouse__heading-address">
              ADDRESS
            </h4>
            <img
              src={sortIcon}
              className="warehouse__heading-icon"
              alt="sorting icon"
            />
          </div>
          <div className="warehouse__titles warehouse__titles-contact-name">
            <h4 className="warehouse__heading warehouse__heading-contact-name">
              CONTACT NAME
            </h4>
            <img
              src={sortIcon}
              className="warehouse__heading-icon"
              alt="sorting icon"
            />
          </div>
          <div className="warehouse__titles warehouse__titles-contact-info">
            <h4 className="warehouse__heading warehouse__heading-contact-info">
              CONTACT INFORMATION
            </h4>
            <img
              src={sortIcon}
              className="warehouse__heading-icon"
              alt="sorting icon"
            />
          </div>
          <div className="warehouse__titles warehouse__titles-actions">
            <h4 className="warehouse__heading warehouse__heading-actions">
              ACTIONS
            </h4>
          </div>
        </div>
      </div>
      <WarehouseList warehouseList={warehouseList} />
    </section>
  );
}
