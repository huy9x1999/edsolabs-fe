import Home from './page/Home';
import Header from './Component/Header';
import Footer from './Component/Footer';



import './app.css';
import React, {
  useEffect,
  useState,
} from 'react';
import ModalCard from './Component/ModalCard';


function App() {

  const [data, setData] = useState([]);
  const [data3Day, setData3Day] = useState([]);
  const [dataSeach, setDataSeach] = useState([]);
  const [valueInput, setValueInput] = useState('');
  const [activeDataSeach, setActiveDataSeach] = useState(false)
  const [open, setOpen] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(value);
    console.log(open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDateSeach = async (value) => {
    const urlSeach = `http://api.weatherapi.com/v1/search.json?key=e9faed869c8c49d3b7845236210909&q=${value}`;
    const res = await fetch(urlSeach);
    const data = res.json();

    // const dataSearch1 = await data((res)=>{
    //   return res
    // })
    data.then((res) => {
      return res
    }).then((res) => {
      setDataSeach(res)
      if (res.length > 0) {
        setActiveDataSeach(true)
      }
    }).catch((err) => {
      setActiveDataSeach(false)
    });

  }

  const getData3Day = async (value) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=e9faed869c8c49d3b7845236210909&q=${value}&days=3&aqi=no&alerts=no`;
    const res3day = await fetch(url);
    const data3day = res3day.json();
    data3day.then((res) => {
      setData([res]);
      setData3Day(res.forecast.forecastday);
    });
    setActiveDataSeach(false)
  }

  // 

  // const [value, setValue] = useState('');

  const handleValueChange = (value) => {
    setValueInput(value);
    if (value.length > 3 || value !== '') {
      getDateSeach(value)
      if (dataSeach.length <= 0) {
        setActiveDataSeach(false)
      }
    }
  }
  const handleClickList = (value) => {
    if (value.length > 0 || value !== '') {
      getData3Day(value);
      setValueInput('');
    }
    
  }

  return (
    < div className="App" >
      <Header class="header" />
      <Home
        trangThaiBlockDataSeach={activeDataSeach}
        dataSearch={dataSeach}
        handleValueChange={handleValueChange}
        handleClickList={handleClickList}
        data={data}
        data3day={data3Day}
        valueInput={valueInput}
      />
      <Footer class="footer" handleOpen={handleOpen} />  <ModalCard open={open} handleClose={handleClose} />
    </div>
  );
}

export default App;