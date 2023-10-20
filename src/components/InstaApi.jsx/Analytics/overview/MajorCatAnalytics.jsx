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

export const MajorCatAnalytics = (props) => {
  const { sx } = props;
  const { majorCategory, brandsobj } = useContext(InstaInterpretorContext);
  // const { allpost, isLoadinganalytics } = useContext(AnalyticsContext);
  const [loading, setLoading] = useState(false);
  const [postcountpercent, setPostcountpercent] = useState(0);
  const [majorcat, setMajorcat] = useState(null);
  let maxcount = 0;
  let maxMajorCategory = null;

  const map = new Map();
  const brandmemo = useMemo(() => {
    if (brandsobj.length === 0) {
      return { maxcount, maxMajorCategory };
    }
    for (let i = 0; i < brandsobj.length; i++) {
      if (map.has(brandsobj[i].majorCategory)) {
        const tempcount = map.get(brandsobj[i].majorCategory);

        map.set(
          brandsobj[i].majorCategory,
          tempcount.add(brandsobj[i].instaBrandId)
        );
        if (tempcount.size + 1 > maxcount) {
          maxcount = tempcount.size + 1;
          maxMajorCategory = brandsobj[i].majorCategory;
        }
      } else {
        map.set(brandsobj[i].majorCategory, new Set());
      }
    }

    setPostcountpercent((maxcount / brandsobj.length) * 100);
    setMajorcat(maxMajorCategory);
    setLoading(true);
    return { maxcount, maxMajorCategory };
  }, [brandsobj]);

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
                Leading Major Category
              </Typography>
              <Stack direction="row" spacing={6}>
                <Typography variant="h4">
                  {postcountpercent.toFixed()}%
                </Typography>
                <Typography variant="h6">{majorcat}</Typography>
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
