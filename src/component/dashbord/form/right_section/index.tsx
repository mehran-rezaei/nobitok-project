import Left_checkBox from "./left_checkBox";
import Right_checkBoxs from "./right_checkBoxs";

function Right_section(props: any) {
  return (
    <>
      <Right_checkBoxs
        setdata={props.setdata}
        data={props.data}
        editform={props.editform}
      />
      <Left_checkBox
        setdata={props.setdata}
        data={props.data}
        editform={props.editform}
      />
    </>
  );
}

export default Right_section;
