import PropTypes from "prop-types";
// import CurrencyRupeeIcon from '@heroicons/react/24/solid/CurrencyRupeeIcon';
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
import { useContext } from "react";
import { InstaInterpretorContext } from "../../Interpretor/InterpretorContext";
import { useState, useMemo } from "react";
import ListBulletIcon from "@mui/icons-material/FormatListBulleted";

export const OverviewTotalProfit = (props) => {
  const { value, sx } = props;
  const { brandsobj } = useContext(InstaInterpretorContext);
  // const { allpost, isLoadinganalytics } = useContext(AnalyticsContext);
  const [loading, setLoading] = useState(false);
  const [postcountpercent, setPostcountpercent] = useState(0);
  const [subcategory, setSubCategory] = useState(null);
  let maxcount = 0;
  let maxSubCategory = null;
  // let postcountpercent = 0;
  const map = new Map();

  const brandmemo = useMemo(() => {
    if (brandsobj.length === 0) {
      return { maxcount, maxSubCategory };
    }

    for (let i = 0; i < brandsobj.length; i++) {
      if (map.has(brandsobj[i].brandSubCategoryName)) {
        const tempcount = map.get(brandsobj[i].brandSubCategoryName);
        map.set(
          brandsobj[i].brandSubCategoryName,
          tempcount.add(brandsobj[i].instaBrandId)
        );

        if (tempcount.size > maxcount) {
          maxcount = tempcount.size;
          maxSubCategory = brandsobj[i].brandSubCategoryName;
        }
      } else {
        map.set(brandsobj[i].brandSubCategoryName, new Set());
      }
    }
    setPostcountpercent((maxcount / brandsobj.length) * 100);
    setSubCategory(maxSubCategory);
    setLoading(true);
    // console.log(brandsobj.length, maxcount, maxSubCategory, postcountpercent);
    return { maxcount, maxSubCategory };
  }, [brandsobj]);

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
              Leading SubCategory
            </Typography>
            <Stack direction="row" spacing={6}>
              <Typography variant="h4">
                {postcountpercent.toFixed()}%
              </Typography>
              <Typography variant="h6">{subcategory}</Typography>
            </Stack>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>{<ListBulletIcon />}</SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress value={postcountpercent} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
