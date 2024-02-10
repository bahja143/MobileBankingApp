import { useFormikContext } from "formik";

import Button from "../Button";

export default function BtnForm({ margin, disabled, ...props }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      onPress={handleSubmit}
      disabled={disabled}
      margin={margin}
      {...props}
    />
  );
}
