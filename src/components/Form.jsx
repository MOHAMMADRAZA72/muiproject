import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Autocomplete,
  TextField,
  Button,
  Stack,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const countries = ["USA", "India"];
const getCities = (country) => {
  if (country === "USA") return ["New York", "Los Angeles", "Chicago"];
  if (country === "India") return ["Mumbai", "Delhi", "Bangalore"];
  return [];
};

function Form() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [cities, setCities] = useState([]);

  const watchCountry = watch("country");

  useEffect(() => {
    if (watchCountry) {
      setCities(getCities(watchCountry));
    }
  }, [watchCountry]);

  const onSubmit = (data) => {
    if (data) {
      alert("Your record saved successfully");
    }
  };
  
  return (
    <>
  <Grid>
    <Paper
      elevation={20}
      style={{ padding: "30px 20px", width: 300, margin: "20px auto" }}
    >
      <Grid>
        <Avatar style={{ backgroundColor: "blueviolet", margin: "auto" }}>
          <AccountCircleIcon />
        </Avatar>

        <h1 style={{ margin: 1 }}>Personal Details</h1>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Grid>
            <TextField
              fullWidth
              id="name"
              placeholder="Enter a Name"
              label="Name"
              variant="standard"
              {...register("name", { required: true, maxLength: 25 })}
            />
            {errors.name && (
              <span style={{ color: "red", fontSize: 12, margin: 0 }}>
                *Name is required
              </span>
            )}
          </Grid>
          <Grid style={{ paddingTop: 5 }}>
            <TextField
              fullWidth
              id="dob"
              type="date"
              placeholder="Enter a Date"
              variant="standard"
              {...register("dob", {
                required: true,
                validate: {
                  beforeYear2000: (value) => {
                    const selectedDate = new Date(value); 
                    const cutoffDate = new Date("2000-01-01"); 
                    return (
                      selectedDate < cutoffDate ||
                      "DOB must be before 01/01/2000"
                    );
                  },
                },
              })}
            />
            {errors.dob && (
              <span style={{ color: "red", fontSize: 12, margin: 0 }}>
                *DOB must be before 01/01/2000
              </span>
            )}
          </Grid>
          <Grid>
            <Controller
              fullWidth
              name="country"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={countries}
                  onChange={(e, value) => setValue("country", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="standard"
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid>
            <Controller
              fullWidth
              name="city"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={cities}
                  onChange={(e, value) => setValue("city", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      variant="standard"
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "blueviolet" }}
            >
              Submit
            </Button>
          </Grid>
        </Stack>
      </form>
    </Paper>
  </Grid>
  
    </>
  );
}

export default Form;
