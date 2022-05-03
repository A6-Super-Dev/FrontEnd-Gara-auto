import React from 'react';
import moment from 'moment';
import { Stepper, Step, StepLabel, StepContent, TextField } from '@mui/material';
import Select, { SingleValue } from 'react-select';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import clientService from '../../../../services/clientService';
import { ColorSchema, MuiButton } from '../../../../components/MuiStyling/MuiStyling';
import { ClientInfoAttributes } from '../../../../reduxToolKit-Saga/types/auth';

interface ProvinceDisplay {
  value: string;
  label: string;
}
type DistrictDisplay = ProvinceDisplay;
type WardDisplay = ProvinceDisplay;
type GenderDisplay = ProvinceDisplay;

interface ProfileProps {
  info: ClientInfoAttributes | undefined;
}

interface AdditionalInfo {
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  dateOfBirth: Date | null;
}

const genderOption: GenderDisplay[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const Profile: React.FC<ProfileProps> = ({ info }) => {
  console.log('info: ', info);
  const [province, setProvince] = React.useState<ProvinceDisplay[]>([]);
  const [district, setDistrict] = React.useState<DistrictDisplay[]>([]);
  const [ward, setWard] = React.useState<WardDisplay[]>([]);
  const [provinceSelect, setProvinceSelect] = React.useState<SingleValue<ProvinceDisplay>>();
  const [districtSelect, setDistrictSelect] = React.useState<SingleValue<DistrictDisplay>>();
  const [wardSelect, setWardSelect] = React.useState<SingleValue<WardDisplay>>();
  const [finalInfo, setFinalInfo] = React.useState<AdditionalInfo>({
    firstName: info !== undefined && info.firstName ? info.firstName : '',
    lastName: info !== undefined && info.lastName ? info.lastName : '',
    gender: info !== undefined && info.gender ? info.gender : '',
    dateOfBirth: info !== undefined && info.dob !== null ? moment(info?.dob).toDate() : null,
  });
  console.log('finalInfo: ', finalInfo);

  React.useEffect(() => {
    const fetchProvince = async () => {
      try {
        const result = await clientService.getListProvince();
        const converter: ProvinceDisplay[] = result.map((each) => ({
          value: each.province_id,
          label: each.province_name,
        }));
        setProvince(converter);
      } catch (error) {
        console.log('error');
      }
    };
    fetchProvince();
  }, []);

  React.useEffect(() => {
    setFinalInfo({
      firstName: info !== undefined && info.firstName ? info.firstName : '',
      lastName: info !== undefined && info.lastName ? info.lastName : '',
      gender: info !== undefined && info.gender ? info.gender : '',
      dateOfBirth: info !== undefined && info.dob !== null ? moment(info?.dob).toDate() : null,
    });
  }, [info]);

  React.useEffect(() => {
    const fetchDistrict = async (id: string) => {
      try {
        const result = await clientService.getListDistrict(id);
        const converter: ProvinceDisplay[] = result.map((each) => ({
          value: each.district_id,
          label: each.district_name,
        }));
        setDistrict(converter);
      } catch (error) {
        console.log('error');
      }
    };
    if (provinceSelect) {
      fetchDistrict(provinceSelect.value);
    }
  }, [provinceSelect]);

  React.useEffect(() => {
    const fetchDistrict = async (id: string) => {
      try {
        const result = await clientService.getListDistrict(id);
        const converter: DistrictDisplay[] = result.map((each) => ({
          value: each.district_id,
          label: each.district_name,
        }));
        setDistrict(converter);
      } catch (error) {
        console.log('error');
      }
    };
    if (provinceSelect) {
      fetchDistrict(provinceSelect.value);
    }
  }, [provinceSelect]);

  React.useEffect(() => {
    const fetchWard = async (id: string) => {
      try {
        const result = await clientService.getListWard(id);
        const converter: WardDisplay[] = result.map((each) => ({
          value: each.ward_id,
          label: each.ward_name,
        }));
        setWard(converter);
      } catch (error) {
        console.log('error');
      } finally {
        console.log('done');
      }
    };

    if (districtSelect) {
      fetchWard(districtSelect.value);
    }
  }, [districtSelect]);

  return (
    <>
      <p className="text-guild-line">profile</p>
      <div>
        <p className="text-support">Address</p>
        <Stepper orientation="vertical">
          <Step active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">Select your Province</p>
            </StepLabel>
            <StepContent>
              <Select
                defaultValue={provinceSelect}
                onChange={(newValue: SingleValue<ProvinceDisplay>) => setProvinceSelect(newValue)}
                options={province}
                placeholder="Province"
              />
            </StepContent>
          </Step>
          <Step active={provinceSelect ? true : false}>
            <StepLabel>
              <p className="font-semibold">Select your District</p>
            </StepLabel>
            <StepContent>
              <Select
                defaultValue={districtSelect}
                onChange={(newValue: SingleValue<DistrictDisplay>) => setDistrictSelect(newValue)}
                options={district}
                placeholder="District"
              />
            </StepContent>
          </Step>
          <Step active={districtSelect ? true : false}>
            <StepLabel>
              <p className="font-semibold">Select your Ward</p>
            </StepLabel>
            <StepContent>
              <Select
                defaultValue={wardSelect}
                onChange={(newValue: SingleValue<WardDisplay>) => setWardSelect(newValue)}
                options={ward}
                placeholder="Ward"
              />
            </StepContent>
          </Step>
          <Step active={wardSelect ? true : false}>
            <StepLabel>
              <p className="font-semibold">Input your detail address</p>
            </StepLabel>
            <StepContent>
              <TextField fullWidth sx={{ backgroundColor: '#ffffff' }} />
            </StepContent>
          </Step>
        </Stepper>
      </div>
      <div className="mt-8">
        <p className="text-support">Info</p>
        <Stepper orientation="vertical">
          <Step active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">Enter your first name</p>
            </StepLabel>
            <StepContent>
              <TextField
                fullWidth
                sx={{ backgroundColor: '#ffffff' }}
                value={finalInfo?.firstName}
                onChange={(e) => setFinalInfo({ ...finalInfo, firstName: e.target.value })}
              />
            </StepContent>
          </Step>
          <Step active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">Enter your last name</p>
            </StepLabel>
            <StepContent>
              <TextField
                fullWidth
                sx={{ backgroundColor: '#ffffff' }}
                value={finalInfo?.lastName}
                onChange={(e) => setFinalInfo({ ...finalInfo, lastName: e.target.value })}
              />
            </StepContent>
          </Step>
          <Step active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">What is your gender</p>
            </StepLabel>
            <StepContent>
              <Select
                defaultValue={
                  {
                    value: finalInfo.gender,
                    label: finalInfo.gender,
                  } as SingleValue<GenderDisplay>
                }
                onChange={(newValue: SingleValue<GenderDisplay>) =>
                  setFinalInfo({ ...finalInfo, gender: newValue?.value as string })
                }
                options={genderOption}
                placeholder="Gender"
              />
            </StepContent>
          </Step>
          <Step active={true}>
            <StepLabel color={ColorSchema.LightGreen}>
              <p className="font-semibold">Select your birthday</p>
            </StepLabel>
            <StepContent>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  value={finalInfo?.dateOfBirth}
                  onChange={(newValue) => {
                    setFinalInfo({ ...finalInfo, dateOfBirth: newValue });
                  }}
                  renderInput={(params) => <TextField fullWidth sx={{ backgroundColor: '#ffffff' }} {...params} />}
                />
              </LocalizationProvider>
            </StepContent>
          </Step>
        </Stepper>
      </div>

      <MuiButton sx={{ width: '100%', marginTop: '3rem' }}>Submit</MuiButton>
    </>
  );
};

export default Profile;
