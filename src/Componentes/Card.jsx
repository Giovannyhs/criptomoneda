import "./Card.css";
import { colorDec } from "../App";
import Graph from "./Graph";

export default function Card({ price, porcentaje, img, coinId, cur }) {
  return (
    <div className="card">
      <div className="cripto-info">
        <img className="card-img" src={img} alt="" />

        <div className="cripto-title">
          <h2> {price} </h2>

          <h2 className={`porcentaje ${colorDec(porcentaje)}`}>
            {porcentaje}%
          </h2>
        </div>
      </div>

      <div className="graphic">
        <Graph coin={coinId} currency={cur} color={colorDec(porcentaje)} />
      </div>
    </div>
  );
}
