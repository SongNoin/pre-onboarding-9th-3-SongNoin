import { Dot } from 'recharts';

export const CustomDot = (props: any) => {
  console.log(props.payload.id);

  return (
    <>
      {props.selectedOptions.includes(props.payload.id) && <Dot {...props} />}
    </>
  );
};
