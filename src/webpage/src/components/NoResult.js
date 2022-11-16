// const { createRoot } = ReactDOM;
// const {  Button, Result  } = antd;
import { Result } from "antd";

const NoResult = (props) => {
//   <Result
//     title="No course found!"
//   />
    console.log('props')
    console.log(props)
    return (
        <Result
        status={props.status}
        title={props.title}
        subTitle={props.subTitle}
    />
);
}


export default NoResult;
