import PropTypes from "prop-types";
import ListBulletIcon from "@mui/icons-material/FormatListBulleted";
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
import { useMemo } from "react";
import { useEffect } from "react";
import { InstaInterpretorContext } from "../../Interpretor/InterpretorContext";
import { useState } from "react";

export const AgencyAnalytics = (props) => {
  const { sx } = props;
  const { allcampaign, agency } = useContext(InstaInterpretorContext);
  // const { allpost, isLoadinganalytics } = useContext(AnalyticsContext);
  const [loading, setLoading] = useState(false);
  const [postcountpercent, setPostcountpercent] = useState(0);
  const [agencyname, setAgencyName] = useState(null);
  let maxcount = 0;
  let maxAgency = null;
  let maxagencyId = null;

  const map = new Map();
  const brandmemo = useMemo(() => {
    if (allcampaign.length === 0) {
      return { maxcount, maxagencyId };
    }
    for (let i = 0; i < allcampaign.length; i++) {
      if (map.has(allcampaign[i].agency_id)) {
        const tempcount = map.get(allcampaign[i].agency_id);

        map.set(
          allcampaign[i].agency_id,
          tempcount.add(allcampaign[i].instaBrandId)
        );
        if (tempcount.size > maxcount) {
          maxcount = tempcount.size;
          maxagencyId = allcampaign[i].agency_id;
        }
      } else {
        map.set(allcampaign[i].agency_id, new Set());
      }
    }

    setPostcountpercent((maxcount / allcampaign.length) * 100);
    maxAgency = agency.find((ele) => {
      return ele.agency_id == maxagencyId;
    });
    setAgencyName(maxAgency);
    setLoading(true);
    return { maxcount, maxagencyId };
  }, [allcampaign]);

  return (
    <Card sx={sx}>
      {loading && (
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Leading Agency
              </Typography>
              <Stack direction="row" spacing={6}>
                <Typography variant="h4">
                  {postcountpercent.toFixed()}%
                </Typography>
                <Typography variant="h6">{agencyname?.agency_name}</Typography>
              </Stack>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>{<ListBulletIcon />}</SvgIcon>
            </Avatar>
          </Stack>
          {/* {loading && (
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Stack alignItems="center" direction="row" spacing={0.5}>
                <SvgIcon
                  color={positive ? "success" : "error"}
                  fontSize="small"
                >
                  {positive ? <NorthIcon /> : <SouthIcon />}
                </SvgIcon>
                <Typography
                  color={positive ? "success.main" : "error.main"}
                  variant="body2"
                >
                  {10}%
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
      )}
    </Card>
  );
};

// MajorCatAnalytics.prototypes = {
//   sx: PropTypes.object,
// };
