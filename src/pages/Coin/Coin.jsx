import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../contex/CoinContext';
import LineChart from '../../Components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-4LHFLqDdMm1v9DScioHj66cM' },
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error('Failed to fetch coin data:', err);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-4LHFLqDdMm1v9DScioHj66cM' },
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options);
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error('Failed to fetch historical data:', err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]);

  if (coinData && historicalData) {
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image.large} alt={coinData.name} />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market cap</li>
          <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour high</li>
          <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour low</li>
          <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>

      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
