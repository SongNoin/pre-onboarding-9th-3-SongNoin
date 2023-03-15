import { Dot } from 'recharts';

export const CustomDot = (props: any) => {
  return (
    <>
      {props.selectedOptions.includes(props.payload.id) && <Dot {...props} />}
    </>
  );
};
