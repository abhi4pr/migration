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

export const CampaignAnalytics = (props) => {
  const { sx } = props;
  const { allcampaign } = useContext(InstaInterpretorContext);
  const { allpost, isLoadinganalytics } = useContext(AnalyticsContext);
  const [postcountpercent, setPostcountpercent] = useState(0);
  const [campaignname, setCampaignName] = useState(null);
  let maxcount = 0;
  let maxcampaignId = null;
  //   let maxCampaignName = null;
  console.log(allpost);

  const brandmemo = useMemo(() => {
    if (allpost.length === 0) {
      return { maxcount, maxcampaignId };
    }
    const map = new Map();
    for (let i = 0; i < allpost.length; i++) {
      if (allpost[i].todayLike != 0 && map.has(allpost[i].todayLike)) {
        const tempcount = map.get(allpost[i].todayLike) + 1;

        map.set(allpost[i].todayLike, tempcount);
        if (maxcount < tempcount) {
          maxcount = tempcount;
          maxcampaignId = allpost[i].todayLike;
          //   maxCampaignName = allpost[i].campaign_name;
          console.log("reach here");
        }
      } else {
        map.set(allpost[i].todayLike, 1);
      }
    }
    setPostcountpercent((maxcount / allpost.length) * 100);
    setCampaignName(maxcampaignId);
    console.log(map);
    return { maxcount, maxcampaignId };
  }, [allpost]);

  console.log(campaignname);
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
              Leading Campaign
            </Typography>
            <Stack direction="row" spacing={6}>
              <Typography variant="h4">
                {postcountpercent.toFixed()}%
              </Typography>
              <Typography variant="h6">{campaignname}</Typography>
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

// OverviewTotalCustomers.propTypes = {
//   difference: PropTypes.number,
//   positive: PropTypes.bool,
//   value: PropTypes.string.isRequired,
//   sx: PropTypes.object,
// };
