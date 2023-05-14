import { Button, Tooltip } from "antd";

const MainButtonWithTooltip = ({ onClick, disabled, loading, dealAdded }) => {
    return (
        <Tooltip title="Fill Job title field">
            <Button type="primary" onClick={onClick} disabled={disabled} loading={loading}>
                {dealAdded ? "Job created" : "Create a job"}
            </Button>
        </Tooltip>
    );
};

export default MainButtonWithTooltip;
