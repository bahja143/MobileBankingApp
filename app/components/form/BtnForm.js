import { useFormikContext } from "formik";

import Button from "../Button";

export default function BtnForm({ margin, ...props }) {
  const { handleSubmit } = useFormikContext();

  return <Button onPress={handleSubmit} margin={margin} {...props} />;
}
