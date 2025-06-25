export const AppointmentFormSchema = (providerOptions: { label: string; value: string }[] = [], chargecodeOptions: { label: string; value: string }[] = [], setslotoptions: { label: string; value: string }[] = []
  , parentOptions: { label: string; value: string }[] = [], petOptions: { label: string; value: string }[] = []
) => ({
  title: "Appointment Form",
  fields: [
    {
      name: "date",
      label: "Appointment Date",
      type: "date",
      fieldType: "date",
      placeholder: "Select date",
      required: true,
    },
    {
      name: "veterinarianName",
      label: "Veterinarian Name",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Enter veterinarian's name",
      options: providerOptions,
      multiple: false,
      required: true,
    },
    {
      name: "type",
      label: "Appointment Type",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Select appointment type",
      required: true,
      multiple: false,
      options: [
        { label: "Tele Consult", value: "Tele Consult" },
        { label: "Home Visit", value: "Home Visit" },
        { label: "Walk In", value: "Walk In" },
      ],
    },
    {
      name: "slotTime",
      label: "Slot Time",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Select slot time",
      required: true,
      options: setslotoptions,
      multiple: false,
    },
    {
      name: "chargeCode",
      label: "Charge Code",
      type: "select",
      fieldType: "dropdown",
      options: chargecodeOptions,
      placeholder: "Enter charge code",
      required: true,
      multiple: false,
    },
    {
      name: "petParent",
      label: "Pet Parent",
      type: "select",
      fieldType: "dropdown",
      options: parentOptions,
      required: true,
      disabled: true,
      defaultValue: parentOptions.length > 0 ? parentOptions[0].value : undefined, // Use undefined instead of empty string
    },
    {
      name: "pet",
      label: "Pet",
      type: "select",
      fieldType: "dropdown",
      placeholder: "Enter pet name",
      options: petOptions,
      required: true,
    },
    {
      name: "consultReason",
      label: "Consultation Reason",
      type: "textarea",
      fieldType: "textarea",
      placeholder: "Describe reason for consultation",
      required: true,
    }
  ]
});
