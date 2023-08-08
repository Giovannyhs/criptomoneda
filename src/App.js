// Hoja de estilos
import { useEffect, useState } from "react";

import "./App.css";

//Componentes de la aplicación
import Header from "./Componentes/Header";
import CardPrincipal from "./Componentes/CardPrincipal";
import Card from "./Componentes/Card";
import Convert from "./Componentes/Convert";
import TableCoins from "./Componentes/TableCoins";

function App() {
  /*Estados de la api*/

  const [coins, setCoins] = useState();
  const [currency, setCurrency] = useState();
  const [selCur, setSelCur] = useState("usd");

  /*Consumo de la API */

  const getData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`
    );

    /*Arreglo de objetos tipo json */

    const json = await response.json();

    const response_cur = await fetch(
      `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
    );

    const cur = await response_cur.json();
    setCoins(json);
    setCurrency(cur);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [selCur]);

  return !coins ? (
    "Cargando..."
  ) : (
    <div className="App">
      <Header currencys={currency} fun={setSelCur} cur={selCur} />
      <main>
        <CardPrincipal json={coins[0]} cur={selCur} />

        <div className="cards_con">
          {coins.map(
            (
              {
                id,
                symbol,
                image,
                current_price,
                price_change_percentage_30d_in_currency,
              },
              index
            ) => {
              if (index != 0) {
                return (
                  <Card
                    key={index}
                    price={`${symbol} - ${current_price} ${selCur} `}
                    porcentaje={deleteDec(
                      price_change_percentage_30d_in_currency,
                      2
                    )}
                    img={image}
                    coinId={id}
                    cur={selCur}
                  />
                );
              }
            }
          )}
        </div>
      </main>
      <Convert />
      <TableCoins coins={coins} />
    </div>
  );
}

export default App;

// Función para formatear los decimales
export function deleteDec(val, decimal) {
  return val.toFixed(decimal);
}

export function colorDec(num) {
  return num > 0 ? "green" : "red";
}

// Función para separar los valores en miles
export const numberF = Intl.NumberFormat("es-ES");
