import { Button } from "antd";

const MainButton = ({ onClick, disabled, loading, dealAdded }) => {
    return (
        <Button type="primary" onClick={onClick} disabled={disabled} loading={loading}>
            {dealAdded ? "Job created" : "Create a job"}
        </Button>
    );
};

export default MainButton;
