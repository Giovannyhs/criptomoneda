import React from "react";
import "./CoinRow.css";
import { deleteDec, colorDec, numberF } from "../App";
import Graph from "./Graph";

export default function CoinRow({ coin, index }) {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="coin_image_container">
          <img src={coin.image} alt={coin.name} title={coin.name} />
        </div>
      </td>
      <td title="Precio">{numberF.format(coin.current_price)} US$</td>
      <td
        className={colorDec(coin.market_cap_change_percentage_24h)}
        title="24 h"
      >
        {deleteDec(coin.market_cap_change_percentage_24h, 2)}%
      </td>
      <td title="Vol. total">{numberF.format(coin.total_volume)}US$</td>
      <td title="Cap. mercado">{numberF.format(coin.market_cap)}US$</td>
      <td title="Últimos 7 días">
        <Graph
          coin={coin.id}
          days={7}
          color={colorDec(coin.market_cap_change_percentage_24h)}
        />
      </td>
    </tr>
  );
}
