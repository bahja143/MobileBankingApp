import { useFormikContext } from "formik";

import Button1 from "../Button1";

export default function BtnForm1({ margin, ...props }) {
  const { handleSubmit } = useFormikContext();

  return <Button1 onPress={handleSubmit} margin={margin} {...props} />;
}
