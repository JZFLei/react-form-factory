import { Box, Button, Paper } from "@material-ui/core";
import InputFactory, { InputDefinition } from "./InputFactory";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

export default function TestForm(): JSX.Element {
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const { control, handleSubmit, watch, trigger } = useForm();

  const definitions: InputDefinition[] = [
    {
      type: "TextField",
      inline: true,
      properties: {
        name: "eventName",
        label: "Event Name",
        variant: "outlined",
        type: "string",
        defaultValue: "",
      },
      validation: {
        required: {
          value: true,
          message: "This is required.",
        },
      },
    },
    {
      type: "TextField",
      inline: true,
      properties: {
        name: "maxAttendees",
        label: "Max Attendees",
        variant: "outlined",
        type: "number",
        defaultValue: 0,
      },
      validation: {
        required: {
          value: true,
          message: "This is required.",
        },
        min: {
          value: 1,
          message: "This is required.",
        },
      },
    },
    {
      type: "TextField",
      inline: false,
      properties: {
        name: "description",
        label: "Description",
        variant: "outlined",
        type: "string",
        multiline: true,
        rows: 5,
        defaultValue: "",
        fullWidth: true,
      },
      validation: {
        required: {
          value: true,
          message: "This is required.",
        },
      },
    },
    {
      type: "TextField",
      inline: true,
      properties: {
        name: "doe",
        label: "Date of Event",
        variant: "outlined",
        type: "date",
        defaultValue: new Date().toISOString().split("T")[0],
      },
      validation: {
        required: {
          value: true,
          message: "This is required.",
        },
      },
    },
    {
      type: "TextField",
      inline: true,
      properties: {
        name: "alarm",
        label: "Alarm Time",
        variant: "outlined",
        type: "time",
        defaultValue: new Date().toISOString().split("T")[1].split(".")[0],
      },
      validation: {
        required: {
          value: true,
          message: "This is required.",
        },
      },
    },
    {
      type: "Select",
      inline: true,
      properties: {
        name: "host",
        label: "Host",
        variant: "outlined",
        defaultValue: "",
        style: {
          minWidth: "192px",
        },
      },
      options: [
        { label: "Jason", value: "Jason" },
        { label: "Cyrus", value: "Cyrus" },
        { label: "Sebastian", value: "Sebastian" },
        { label: "Rod", value: "Rod" },
        { label: "Darryl", value: "Darryl" },
        { label: "Shubham", value: "Shubham" },
      ],
      validation: {
        required: {
          value: true,
          message: "This is required.",
        },
      },
    },
    {
      type: "Select",
      inline: true,
      properties: {
        name: "attendees",
        label: "Attendees",
        variant: "outlined",
        multiple: true,
        defaultValue: [],
        style: {
          minWidth: "192px",
        },
      },
      options: [
        { label: "Jason", value: "Jason" },
        { label: "Cyrus", value: "Cyrus" },
        { label: "Sebastian", value: "Sebastian" },
        { label: "Rod", value: "Rod" },
        { label: "Darryl", value: "Darryl" },
        { label: "Shubham", value: "Shubham" },
      ],
    },
    {
      type: "TextField",
      inline: false,
      properties: {
        name: "secrets",
        label: "Secrets",
        variant: "outlined",
        type: "string",
        multiline: true,
        fullWidth: true,
        rows: 3,
        defaultValue: "",
      },
      watch: {
        names: ["host", "attendees"],
        values: ["Jason", ["Cyrus", "Sebastian", "Rod"]],
      },
    },
    {
      type: "Switch",
      inline: false,
      properties: {
        name: "isAwesome",
        label: "Are attendees awesome?",
        color: "primary",
        defaultValue: true,
      },
    },
  ];

  async function onSubmit(data: Record<string, unknown>) {
    const valid = await trigger();

    if (valid) {
      if (isDraft) {
        console.log("Draft:", data);
      } else {
        console.log("Final:", data);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box component={Paper} pt={2} pb={2} pl={4}>
        {definitions.map((definition: InputDefinition) => {
          return InputFactory(definition, control, watch);
        })}
      </Box>
      <Box textAlign={"right"} mt={4}>
        <Box component={"span"} mr={2}>
          <Button
            type={"submit"}
            variant={"contained"}
            color={"primary"}
            onClick={() => setIsDraft(false)}
          >
            Issue Notice
          </Button>
        </Box>
        <Box component={"span"}>
          <Button
            type={"submit"}
            variant={"contained"}
            color={"default"}
            onClick={() => setIsDraft(true)}
          >
            Save as Draft
          </Button>
        </Box>
      </Box>
    </form>
  );
}
