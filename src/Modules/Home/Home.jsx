import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography
}                                               from "@mui/material";
import {observer}                               from "mobx-react";
import React, {useEffect, useState}             from "react";
import {useStore}                               from "../../Hooks";
import {fetchAdditionalFakeData, fetchFakeData} from "../../Services";
import {NATIONALITY, PAYLOAD}                   from "../../Constants";
import DataGrid                                 from 'react-data-grid';
import CsvDownload                              from 'react-json-to-csv'
import "./Styles/Home.scss";
import {HelpModal}                              from "../../Modals";

export const Home = observer(() => {
  const [pageSize, setPageSize] = useState(1);
  const [payload, setPayload] = useState(PAYLOAD.DEFAULT);
  const fakeDataStore = useStore("fakeDataStore");
  const isDataLoading = fakeDataStore.isDataLoading();
  const data = fakeDataStore.getData();
  const handleSeedChanged = async (event) => {
    const currentPayload = {...payload};
    currentPayload.seed = event.target.value;
    currentPayload.page = 1;
    setPayload(currentPayload);
    setPageSize(1);
    await fetchFakeData(currentPayload);
  }
  const handleNationalityChanged = async (event) => {
    const currentPayload = {...payload};
    currentPayload.nationality = event.target.value;
    currentPayload.page = 1;
    setPayload(currentPayload);
    setPageSize(1);
    await fetchFakeData(currentPayload);
  }
  const handleErrorSliderChanged = async (event) => {
    console.log(event.target.value);
    const currentPayload = {...payload};
    currentPayload.errorRate = event.target.value;
    setPayload(currentPayload);
    setPageSize(1);
    await fetchFakeData(currentPayload);
  }
  const handleTableScroll = async (event) => {
    if (!isDataLoading && isScrollReachBottom(event)) {
      const currentPage = pageSize + 1;
      const currentPayload = {...payload};
      currentPayload.page = currentPage;
      setPageSize(pageSize + 1);
      setPayload(currentPayload);
      await fetchAdditionalFakeData(currentPayload);
    }
  };
  useEffect(() => {
    if (!isDataLoading && data.length === 0) {
      const fetchData = async () => {
        await fetchFakeData(payload);
      }
      fetchData().catch(err => console.error(err));
    }
  }, [data.length, payload]);
  return (
      <Box className="home">
        <Typography variant="h4" className="title-text">
          FAKE USER DATA <HelpModal />
        </Typography>
        <Stack spacing={2} direction="row" className="action-stack"
               alignItems="center">
          <TextField
              onBlur={handleSeedChanged}
              className="seed-text-field"
              label="Seed" variant="outlined"
              color="secondary"
          />
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="select-label">Nationality</InputLabel>
            <Select
                className="select-action"
                variant="outlined"
                label="Nationality"
                defaultValue=""
                onBlur={handleNationalityChanged}
                color="secondary"
                MenuProps={selectMenuProps}
            >
              {
                NATIONALITY.map(nat => (
                    <MenuItem key={nat.short} value={nat.short}>
                      {nat.long}
                    </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Typography variant="h5" sx={{width: '100%', textAlign: 'center'}}>
            ERROR RATE
            <Slider min={0}
                    max={1000}
                    step={0.25}
                    onBlur={handleErrorSliderChanged}
                    color="secondary"
                    valueLabelDisplay="auto"
            />
          </Typography>
        </Stack>
        <DataGrid
            rows={data}
            columns={columns}
            rowHeight={40}
            className={'data-grid rdg-light'}
            onScroll={handleTableScroll}
            cellNavigationMode={'changeRow'}
        />
        {
            isDataLoading &&
            <CircularProgress sx={{marginTop: '3vh'}} color="secondary" />
        }
        <CsvDownload children="Download as CSV"
                     className="csv-download-button"
                     data={data}
                     filename="fake_data.csv" />
      </Box>
  );
});

const columns = [
  {key: 'id', name: 'ID', width: '12%'},
  {key: 'person', name: 'Person', width: '15%'},
  {key: 'country', name: 'Country', width: '10%'},
  {key: 'city', name: 'Locality', width: '10%'},
  {key: 'street', name: 'Street', width: '15%'},
  {key: 'postcode', name: 'Postal Code', width: '10%'},
  {key: 'email', name: 'Email', width: '15%'},
  {key: 'phone', name: 'Phone', width: '15%'},
];

const isScrollReachBottom = ({currentTarget}) => {
  return currentTarget && currentTarget.scrollTop + 10
      >= currentTarget.scrollHeight - currentTarget.clientHeight;
};

const selectMenuProps = {
  PaperProps: {
    style: {
      maxHeight: '30vh',
    }
  }
};
