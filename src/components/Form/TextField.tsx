import { Input, Typography } from 'antd';

import { Controller, type FieldValues } from 'react-hook-form';
const { Text } = Typography;

type TextFieldProps = {
  hookForm: FieldValues;
  name: string;
  label: string;
  className?: string;
  type?: string;
};

export const TextField: React.FC<TextFieldProps> = ({
  hookForm,
  name,
  label,
  className,
  type = 'text'
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
          <Input
            {...field}
            value={field.value}
            variant="filled"
            className={className}
            type={type}
          />
          <Text style={{ fontSize: '10px' }} type="danger">
            {errors[name]?.message}
          </Text>
        </>
      )}
    />
  );
};
