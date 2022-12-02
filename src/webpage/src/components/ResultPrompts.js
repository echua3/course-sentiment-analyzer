import { Result } from "antd";

const ResultPrompts = (props) => {
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

export default ResultPrompts;
