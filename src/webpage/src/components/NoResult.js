// const { createRoot } = ReactDOM;
// const {  Button, Result  } = antd;
import { Result } from "antd";

const NoResult = () => (
//   <Result
//     title="No course found!"
//   />
    <Result
        status="error"
        title="Submission Failed"
        subTitle="Please check and modify the following information before resubmitting."
    />
);

export default NoResult;
