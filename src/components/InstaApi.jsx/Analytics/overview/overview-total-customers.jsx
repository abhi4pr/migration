import PropTypes from "prop-types";
import ArrowDownIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpIcon from "@mui/icons-material/ArrowUpward";
import ListBulletIcon from "@mui/icons-material/FormatListBulleted";
import UsersIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { AnalyticsContext } from "../AnalyticsContextAPIs";
import { useContext } from "react";
import { MapsHomeWork } from "@mui/icons-material";
import { useMemo } from "react";
import { InstaInterpretorContext } from "../../Interpretor/InterpretorContext";
import { useState } from "react";

export const OverviewTotalCustomers = (props) => {
  const { difference, positive = false, sx, value } = props;
  const { brandsobj } = useContext(InstaInterpretorContext);
  const { allpost, isLoadinganalytics } = useContext(AnalyticsContext);
  const [postcountpercent, setPostcountpercent] = useState(0);
  const [brand, setBrand] = useState(null);
  let maxcount = 0;
  let maxbrandId = null;
  // let postcountpercent = 0;
  let maxbrandName = null;
  const brandmemo = useMemo(() => {
    if (allpost.length === 0) {
      return { maxcount, maxbrandId, maxbrandName };
    }
    const map = new Map();

    for (let i = 0; i < allpost.length; i++) {
      if (allpost[i].todayComment != 0 && map.has(allpost[i].todayComment)) {
        const tempcount = map.get(allpost[i].todayComment) + 1;
        // console.log(tempcount);
        map.set(allpost[i].todayComment, tempcount);
        if (maxcount < tempcount) {
          maxcount = tempcount;
          maxbrandId = allpost[i].todayComment;
        }
      } else {
        map.set(allpost[i].todayComment, 1);
      }
    }
    // console.log(allpost.length, maxcount, postcountpercent, maxbrandId);
    maxbrandName = brandsobj.find((ele) => {
      return ele.instaBrandId == maxbrandId;
    });
    setPostcountpercent((maxcount / allpost.length) * 100);
    setBrand(maxbrandName);

    return { maxcount, maxbrandId, maxbrandName };
  }, [allpost]);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Leading Brand
            </Typography>
            <Stack direction="row" spacing={6}>
              <Typography variant="h4">
                {postcountpercent.toFixed()}%
              </Typography>
              <Typography variant="h6">
                {brand?.instaBrandName[0].toUpperCase() +
                  brand?.instaBrandName.slice(1)}
              </Typography>
            </Stack>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 46,
              width: 46,
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {/* {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <NorthIcon /> : <SouthIcon />}
              </SvgIcon>
              <Typography
                color={positive ? "success.main" : "error.main"}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              Since last month
            </Typography>
          </Stack>
        )} */}
        <Box sx={{ mt: 3 }}>
          <LinearProgress value={postcountpercent} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
