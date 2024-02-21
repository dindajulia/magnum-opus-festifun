// DashboardPage.jsx
import React from "react";
import { traffic, chart, table } from "../../../assets/main";

function DashboardPage() {
    return (
        <div>

<div style={{ display: 'flex', marginLeft: '80px'  }}>
  <img src={traffic} alt="" style={{ marginRight: '10px', width: '45%', height: '50%' }} />
  <img src={chart} alt="" style={{ width: '45%', height: '50%' }} />
</div>

<div style={{marginBottom: '80px', marginLeft: '80px'}}>
  <img src={table} alt="" style={{ width: '90%', height: 'auto' }} />
</div>



        </div>
    );
}

export default DashboardPage;
