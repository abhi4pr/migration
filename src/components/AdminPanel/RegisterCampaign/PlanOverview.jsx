import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const PlanOverview = () => {


    return (
        <div>
            <h1>Plan Overview</h1>
            <Link to="/admin/phase">
                <Button variant="contained" color="primary" >
                    Phase Creation
                </Button>
            </Link>
        </div>
    );
};

export default PlanOverview;
