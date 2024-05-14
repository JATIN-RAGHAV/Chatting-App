import Box from "@mui/material/Box";
import {
  DataGridPro,
} from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";

export default function ScrollPlayground() {

  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ height: 400 }}>
        <DataGridPro
          onCellClick={() => {}}
          hideFooter
          {...data}
        />
      </Box>
    </Box>
  );
}
