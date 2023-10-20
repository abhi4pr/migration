import PropTypes from "prop-types";
// import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
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
import { InstaInterpretorContext } from "../../Interpretor/InterpretorContext";
import { useContext } from "react";
import { useState } from "react";
import { useMemo } from "react";

export const OverviewTasksProgress = (props) => {
  const { sx } = props;
  const { brandsobj } = useContext(InstaInterpretorContext);
  // const { allpost, isLoadinganalytics } = useContext(AnalyticsContext);
  const [loading, setLoading] = useState(false);
  const [postcountpercent, setPostcountpercent] = useState(0);
  const [category, setCategory] = useState(null);
  let maxcount = 0;
  let maxBrandCategory = null;
  // let postcountpercent = 0;
  const map = new Map();

  const brandmemo = useMemo(() => {
    if (brandsobj.length === 0) {
      return { maxcount, maxBrandCategory };
    }

    for (let i = 0; i < brandsobj.length; i++) {
      if (map.has(brandsobj[i].brandCategoryName)) {
        const tempcount = map.get(brandsobj[i].brandCategoryName);
        map.set(
          brandsobj[i].brandCategoryName,
          tempcount.add(brandsobj[i].instaBrandId)
        );

        if (tempcount.size > maxcount) {
          maxcount = tempcount.size;
          maxBrandCategory = brandsobj[i].brandCategoryName;
        }
      } else {
        map.set(brandsobj[i].brandCategoryName, new Set());
      }
    }
    setPostcountpercent((maxcount / brandsobj.length) * 100);
    setCategory(maxBrandCategory);
    setLoading(true);
    // console.log(brandsobj.length, maxcount, maxBrandCategory, postcountpercent);
    return { maxcount, maxBrandCategory };
  }, [brandsobj]);

  // console.log(brandmemo);

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
            <Typography color="text.secondary" gutterBottom variant="overline">
              Leading Category
            </Typography>
            <Stack direction="row" spacing={5}>
              <Typography variant="h4">
                {postcountpercent.toFixed()}%
              </Typography>
              <Typography variant="h6">{category}</Typography>
            </Stack>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress value={postcountpercent} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewTasksProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
