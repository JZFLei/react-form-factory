import {
  Box,
  CheckboxProps,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
  SwitchProps,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { get, has, isEqual, omit } from "lodash";

import React from "react";
import { nanoid } from "nanoid";

export type InputDefinitionType =
  | "TextField"
  | "Select"
  | "Toggle"
  | "Checkbox";

export type InputDefinitionMuiProps =
  | TextFieldProps
  | SelectProps
  | CheckboxProps
  | SwitchProps;

export type Watcher = (
  names?: string | string[] | ((data: any, options: any) => void)
) => unknown;

export interface InputDefinition {
  type: InputDefinitionType;
  inline: boolean;
  properties: InputDefinitionMuiProps;
  options?: {
    label: string;
    value: any;
  }[];
  validation?: RegisterOptions;
  watch?: {
    names: string[];
    values: any[];
  };
}

export default function InputFactory(
  definition: InputDefinition,
  control: Control,
  watch: Watcher
): JSX.Element {
  const name = definition.properties.name as string;

  // Determine visibility based on the values of watched inputs.
  // TODO: Extract function.
  if (definition.watch) {
    const matches = watch(definition.watch.names) as any[];

    let isHidden: boolean = false;

    definition.watch.names.forEach((name: string, index: number) => {
      if (definition.watch && isEqual(matches, definition.watch.values)) {
        isHidden = true;
        return;
      }
    });

    if (!isHidden) {
      return <React.Fragment key={nanoid()}></React.Fragment>;
    }
  }

  // Determine the type of input to return.
  // TODO: Make inputs components somewhat configurable... somehow.
  // TODO: Checkbox and Switch components.
  // TODO: Maybe a label component?
  switch (definition.type) {
    case "TextField": {
      const properties = definition.properties as TextFieldProps;

      return (
        <Box
          key={nanoid()}
          {...(definition.inline && {
            display: "inline-block",
          })}
          mt={2}
          mb={2}
          mr={4}
          component={"div"}
        >
          <Controller
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...omit(properties, "value", "defaultValue")}
                {...field}
                error={has(error, "message")}
                helperText={get(error, "message")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            control={control}
            rules={definition.validation}
            name={name}
            defaultValue={properties.defaultValue}
          />
        </Box>
      );
    }
    case "Select": {
      const properties = definition.properties as SelectProps;
      return (
        <Box
          key={nanoid()}
          {...(definition.inline && {
            display: "inline-block",
          })}
          mt={2}
          mb={2}
          mr={4}
          component={"div"}
        >
          <Controller
            render={({ field, fieldState: { error } }) => (
              <FormControl variant={properties.variant}>
                <InputLabel shrink={true} error={has(error, "message")}>
                  {properties.label}
                </InputLabel>
                <Select
                  {...omit(properties, "value", "defaultValue", "label")}
                  {...field}
                  error={has(error, "message")}
                  input={
                    <OutlinedInput
                      notched
                      name={properties.name}
                      labelWidth={
                        properties.label
                          ? (properties.label as string).length * 8
                          : 0
                      }
                    />
                  }
                >
                  {definition.options &&
                    definition.options.map((option) => {
                      return (
                        <MenuItem key={nanoid()} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    })}
                </Select>
                {has(error, "message") && (
                  <FormHelperText error={has(error, "message")}>
                    {error?.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
            control={control}
            rules={definition.validation}
            name={name}
            defaultValue={properties.defaultValue}
          />
        </Box>
      );
    }
    case "Toggle": {
      return <></>;
    }
    case "Checkbox": {
      return <></>;
    }
  }
}
