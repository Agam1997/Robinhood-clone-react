import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Stats.css';
import StatsRow from './StatsRow'
import { db } from "./firebase";

const TOKEN = "ccji3fqad3i2ngrpll50ccji3fqad3i2ngrpll5g";
const BASE_URL = "https://finnhub.io/api/v1/quote"

function Stats() {
    
    const [stockData, setstockData] = useState([])
    const [myStocks, setmyStocks] = useState([])

    const getMyStocks = () => {
        db
        .collection('myStocks')
        .onSnapshot(snapshot => {
            console.log(snapshot.docs);
            let promises = [];
            let tempData = [];
            snapshot.docs.map(doc => {
                promises.push(getStockData(doc.data().ticker).then(res => {
                    tempData.push({
                        id: doc.id,
                        data: doc.data(),
                        info: res.data
                    })
                }))
                    
            })
            Promise.all(promises).then(() => {
                setmyStocks(tempData)
                // console.log(tempData);
            })
        })
    }
    const getStockData = (stock) => {
        // console.log("my stock : : ", stock);
        return axios
            .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
            .catch(error => {
                console.log("error", error.message);
            })
    }

    
    useEffect(() => {
        getMyStocks()
        let tempData = []
        const stocksList = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "JNJ", "META", "NVDA"];
        let promises = [];
        stocksList.map(stock => {
            promises.push(
                getStockData(stock)
                    .then(res => {
                        // console.log(res);
                        tempData.push({
                            name: stock,
                            ...res.data
                        })
                    })
            )
        })
        Promise.all(promises).then(() => {
            // console.log(tempData);
            setstockData(tempData)
        })

    }, [])
  return (
    <div className='stats'>
        <div className='stats__container'>
            <div className='stats__header'>
                <p>Stocks</p>
            </div>
            <div className='stats__content'>
                <div className='stats__rows'>
                {myStocks.map(stock => (
                        <StatsRow
                            key={stock.data.ticker}
                            name={stock.data.ticker}
                            openPrice={stock.info.o}
                            price={stock.info.c}
                            shares={stock.data.shares}
                        />
                    ))}
                </div>
            </div>
            <div className='stats__header stats__lists'>
                <p>Lists</p>
            </div>
            <div className='stats__content'>
                <div className='stats__rows'>
                    {stockData.map(stock => (
                        <StatsRow
                            key={stock.name}
                            name={stock.name}
                            openPrice={stock.o}
                            price={stock.c}
                        />
                    ))}
{/* stocks we can buy */}                    
                </div>
            </div>
        </div>
    </div>
  )
}
// ccji3fqad3i2ngrpll50ccji3fqad3i2ngrpll5g

export default Stats