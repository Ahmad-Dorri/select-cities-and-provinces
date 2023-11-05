import styles from './get-data.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { saveCities } from '../../store/slices/city-slice';
import { saveProvince } from '../../store/slices/province-slice';
import { Autocomplete, Button, TextField } from '@mui/material';

const FETCH_CITY_URL = 'http://rezayari.ir:5050/CityAndProvince/GetCity';
const FETCH_PROVINCE_URL =
  'http://rezayari.ir:5050/CityAndProvince/GetProvince';

const fetchData = async (token: string, url: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

const GetData = () => {
  const navigate = useNavigate();
  const cities = useSelector((state: RootState) => state.cities.value);
  const provinces = useSelector((state: RootState) => state.provinces.value);

  const dispatch = useDispatch();
  // #values for the province
  const [provinceValue, setProvinceValue] = useState({ name: '', id: 0 });
  const [provinceInputValue, setProvinceInputValue] = useState('');

  //# values for the cities
  const [cityValue, setCityValue] = useState({
    name: '',
    id: 0,
    provinceId: 0,
  });
  const [cityInputValue, setCityInputValue] = useState('');
  //# filtering cities base on the province Id

  const filteredCities = cities?.filter(
    (city) => city?.provinceId === provinceValue?.id
  );

  // #filtering province base on the city id
  const province = provinces?.filter(
    (province) => province?.id === cityValue?.provinceId
  );

  useEffect(() => {
    const token = window.sessionStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
    fetchData(token!, FETCH_CITY_URL).then((data) =>
      dispatch(saveCities(data))
    );
    fetchData(token!, FETCH_PROVINCE_URL).then((data) =>
      dispatch(saveProvince(data))
    );
  }, [navigate, dispatch]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(cityInputValue, provinceInputValue);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Autocomplete
        onChange={(
          event: React.SyntheticEvent<Element, Event>,
          newValue: { name: string; id: number }
        ) => {
          setProvinceValue(newValue);
        }}
        inputValue={province.length > 0 ? province[0].name : provinceInputValue}
        onInputChange={(
          event: React.SyntheticEvent<Element, Event>,
          newProvinceInputValue
        ) => {
          setProvinceInputValue(newProvinceInputValue);
        }}
        disablePortal
        id="get-province"
        options={provinces}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            autoFocus
            {...params}
            label="استان ها"
          />
        )}
      />

      <Autocomplete
        disablePortal
        onChange={(
          event: React.SyntheticEvent<Element, Event>,
          newValue: { name: string; id: number; provinceId: 0 }
        ) => {
          setCityValue(newValue);
        }}
        inputValue={cityInputValue}
        onInputChange={(
          event: React.SyntheticEvent<Element, Event>,
          newCityInputValue
        ) => {
          setCityInputValue(newCityInputValue);
        }}
        id="get-city"
        options={provinceInputValue ? filteredCities : cities}
        getOptionLabel={(option) => option.name}
        // isOptionEqualToValue={(o) => o.id === cityInputValue}
        renderOption={(props, option) => {
          return (
            <strong {...props} key={option.id}>
              {option.name}
            </strong>
          );
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField variant="outlined" {...params} label="شهر ها" />
        )}
      />

      <Button type="submit" variant="contained">
        درخواست
      </Button>
    </form>
  );
};

export default GetData;
