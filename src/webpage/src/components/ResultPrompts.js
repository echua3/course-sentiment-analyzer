import { Result } from "antd";

const ResultPrompts = (props) => {
    return (
        <Result
        status={props.status}
        title={props.title}
        subTitle={props.subTitle}
    />
);
}

export default ResultPrompts;
