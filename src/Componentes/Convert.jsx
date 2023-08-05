import InputConvert from "./InputConvert";
import "./Convert.css";
import { FaExchangeAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Convert() {
  const [coin, setCoin] = useState([]);
  const [selCoin1, setSelCoin1] = useState("btc");
  const [selCoin2, setSelCoin2] = useState("eth");
  const [mainTxt, setMainTxt] = useState(0);
  const [res, setRes] = useState(0);

  const getData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );

    const json = await response.json();

    setCoin(json);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let a, b;
    coin.forEach(({ symbol, current_price }) => {
      if (symbol === selCoin1) {
        a = mainTxt * current_price;
      } else {
        b = current_price;
      }
    });

    a ? setRes(a / b) : setRes(0);
  }, [mainTxt, selCoin1, selCoin2]);

  return (
    <div className="contenedor">
      <h2>Comparación de Monedas</h2>

      <div className="input-convert">
        <InputConvert
          coin={coin}
          fun={setSelCoin1}
          other={selCoin2}
          text={setMainTxt}
          type={0}
        />

        <FaExchangeAlt className="icono" />

        <InputConvert
          coin={coin}
          sel="eth"
          fun={setSelCoin2}
          other={selCoin1}
          result={res}
        />
      </div>
    </div>
  );
}
