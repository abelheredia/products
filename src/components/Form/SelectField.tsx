import { Select, Typography } from 'antd';
import { Controller, type FieldValues } from 'react-hook-form';
const { Text } = Typography;

type SelectFieldProps = {
  hookForm: FieldValues;
  name: string;
  label: string;
  className?: string;
  options?: { label: string; value: string }[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  hookForm,
  name,
  label,
  className,
  options = []
}) => {
  const {
    formState: { errors }
  } = hookForm;

  return (
    <Controller
      name={name}
      control={hookForm.control}
      render={({ field }) => (
        <>
          <Text className="font-semibold">{label}</Text>
          <Select
            {...field}
            value={field.value}
            placeholder={label}
            variant="filled"
            className={className}
            options={options}
          />
          <Text style={{ fontSize: '10px' }} type="danger">
            {errors[name]?.message}
          </Text>
        </>
      )}
    />
  );
};
